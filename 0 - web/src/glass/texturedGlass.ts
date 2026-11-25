/**
 * Textured ("obscure") architectural glass, as materials for CSS and for WebGL.
 *
 * Each texture describes the glass surface as a height field that repeats seamlessly. Baking it
 * once yields a small tiling relief: the surface slope, which refracts whatever is behind the
 * glass, and highlights and shadows lit from the same surface.
 *
 * For CSS (`bakeGlassTexture`) those are two bitmaps:
 *  - `map`: the slope, read by feDisplacementMap (R = x slope, G = y slope).
 *  - `shade`: the light, drawn as a plain CSS background, so the texture still reads in browsers
 *    that cannot refract. It costs nothing per frame.
 *
 * The map is what costs there. Chrome pays for the tile and its bitmap again for every pane on
 * every frame the page produces, even while the glass and its backdrop sit still, so both are
 * kept small. In a stress test of 36 panes, a 128 px tile with a 128 px map held 60 fps where a
 * 256 px tile with a 384 px map fell to 12.
 *
 * For WebGL (`packGlassRelief`) slope and light share one texture that stays on the GPU.
 */

export type GlassTexture = {
  name: string;
  /** Side of the repeating square tile in CSS px. Keep it at or under ~128 unless the relief is broad. */
  tile: number;
  /**
   * Side the tile is drawn at in CSS px, when the pattern should be larger or smaller than it
   * was sculpted. The whole relief is scaled, so it keeps its slopes and its lighting. Defaults
   * to `tile`.
   */
  size?: number;
  /**
   * Baked pixels per CSS px: above 1 keeps fine detail crisp on dense screens, below 1 is
   * enough for smooth swells. Keep `tile * density` at or under ~192.
   */
  density: number;
  /**
   * Surface height in px at (u, v) in [0, 1) across the tile; must wrap seamlessly. Real
   * heights keep the slopes, and so the baked lighting, true to the relief. `null` is flat glass.
   */
  height: ((u: number, v: number) => number) | null;
  /** Sideways shift of the backdrop in px on the steepest slope of the surface. */
  refraction: number;
  /** Backdrop blur in px (Gaussian standard deviation). */
  blur: number;
  /** Opacity (0-1) of the white veil that scattering leaves on the glass. */
  haze: number;
  /** Opacity (0-1) of the baked highlights and shadows. */
  sheen: number;
};

/** What can be tuned on a glass while it is on screen. None of it changes the relief itself. */
export type GlassSettings = Required<Pick<GlassTexture, "size" | "refraction" | "blur" | "haze" | "sheen">>;
export type GlassSetting = keyof GlassSettings;

/**
 * Min/max/step for every setting. Drives the sliders, and clamps what the browser has stored
 * and what the dev-only save writes back into this file.
 */
export const GLASS_SETTING_RANGES: Record<GlassSetting, { min: number; max: number; step?: number }> = {
  size: { min: 8, max: 320 },
  refraction: { min: 0, max: 40, step: 0.5 },
  blur: { min: 0, max: 30, step: 0.1 },
  haze: { min: 0, max: 1, step: 0.01 },
  sheen: { min: 0, max: 1, step: 0.05 },
};

export const GLASS_SETTINGS = Object.keys(GLASS_SETTING_RANGES) as GlassSetting[];

/** The settings a texture was designed with. */
export function glassSettings({ tile, size = tile, refraction, blur, haze, sheen }: GlassTexture): GlassSettings {
  return { size, refraction, blur, haze, sheen };
}

// #region helpers: what a texture's height function may call. Copied code takes along the ones it uses.
const TAU = Math.PI * 2;

const fract = (n: number) => n - Math.floor(n);
const mod = (n: number, m: number) => ((n % m) + m) % m;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smoothstep = (a: number, b: number, n: number) => {
  const t = clamp01((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Integer lattice hash to [0, 1). */
function hash(ix: number, iy: number, seed: number): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iy, 0x165667b1) ^ Math.imul(seed, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const GRADIENT_X = Array.from({ length: 16 }, (_, i) => Math.cos((i / 16) * TAU));
const GRADIENT_Y = Array.from({ length: 16 }, (_, i) => Math.sin((i / 16) * TAU));

/** A lattice point's random unit gradient, dotted with the offset from that point. */
function gradient(ix: number, iy: number, seed: number, dx: number, dy: number): number {
  const g = (hash(ix, iy, seed) * 16) | 0;
  return GRADIENT_X[g] * dx + GRADIENT_Y[g] * dy;
}

/**
 * Perlin noise that repeats every `fx` x `fy` lattice cells, so `noise(u, v, fx, fy)` wraps
 * seamlessly over the unit tile with `fx` x `fy` features across it. Returns roughly [-1, 1].
 */
function noise(u: number, v: number, fx: number, fy: number, seed: number): number {
  const x = u * fx;
  const y = v * fy;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const dx = x - x0;
  const dy = y - y0;
  const left = mod(x0, fx);
  const right = (left + 1) % fx;
  const top = mod(y0, fy);
  const bottom = (top + 1) % fy;
  const sx = dx * dx * dx * (dx * (dx * 6 - 15) + 10);
  const sy = dy * dy * dy * (dy * (dy * 6 - 15) + 10);
  const above = mix(gradient(left, top, seed, dx, dy), gradient(right, top, seed, dx - 1, dy), sx);
  const below = mix(gradient(left, bottom, seed, dx, dy - 1), gradient(right, bottom, seed, dx - 1, dy - 1), sx);
  return mix(above, below, sy) * 1.41;
}

/** Octaves of `noise`, each twice as fine and `gain` times as tall as the last. */
function fbm(u: number, v: number, fx: number, fy: number, octaves: number, seed: number, gain = 0.5): number {
  let sum = 0;
  let amplitude = 1;
  let total = 0;
  for (let octave = 0; octave < octaves; octave++) {
    sum += amplitude * noise(u, v, fx << octave, fy << octave, seed + octave * 17);
    total += amplitude;
    amplitude *= gain;
  }
  return sum / total;
}

/** Convex flute profile across one period: 0 at the edges, 1 on the crest. */
const flute = (t: number) => 1 - (2 * t - 1) ** 2;

/**
 * Air bubbles ("seeds"): a smooth dome in `share` of the cells of a `cellsX` x `cellsY` grid.
 * A grid with fewer rows than columns draws them out vertically, as a drawn sheet does.
 */
function seeds(u: number, v: number, cellsX: number, cellsY: number, seed: number, share: number): number {
  const x = u * cellsX;
  const y = v * cellsY;
  const cx = Math.floor(x);
  const cy = Math.floor(y);
  if (hash(cx, cy, seed) > share) return 0;
  // Radius up to 0.18 of a cell and jitter up to 0.3 keep every bubble inside its own cell.
  const radius = 0.05 + 0.13 * hash(cx, cy, seed + 1);
  const dx = x - cx - 0.5 - 0.6 * (hash(cx, cy, seed + 2) - 0.5);
  const dy = y - cy - 0.5 - 0.6 * (hash(cx, cy, seed + 3) - 0.5);
  const rho = (dx * dx + dy * dy) / (radius * radius);
  return rho < 1 ? (1 - rho) ** 2 : 0;
}

/**
 * Pressed daisies: one flower per cell of a jittered `cells` x `cells` grid that wraps. Petals
 * radiate from the flower's centre and fade out where the neighbouring flower takes over.
 */
function daisies(u: number, v: number, cells: number, seed: number): number {
  const x = u * cells;
  const y = v * cells;
  const cx = Math.floor(x);
  const cy = Math.floor(y);
  let nearest = Infinity;
  let second = Infinity;
  let dx = 0;
  let dy = 0;
  let ownerX = 0;
  let ownerY = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      const wx = mod(cx + i, cells);
      const wy = mod(cy + j, cells);
      const ox = x - (cx + i + hash(wx, wy, seed));
      const oy = y - (cy + j + hash(wx, wy, seed + 1));
      const distance = ox * ox + oy * oy;
      if (distance < nearest) {
        second = nearest;
        nearest = distance;
        dx = ox;
        dy = oy;
        ownerX = wx;
        ownerY = wy;
      } else if (distance < second) {
        second = distance;
      }
    }
  }
  nearest = Math.sqrt(nearest);
  second = Math.sqrt(second);
  const petals = 10 + Math.floor(hash(ownerX, ownerY, seed + 2) * 7);
  const ridge = 0.5 + 0.5 * Math.cos(Math.atan2(dy, dx) * petals + hash(ownerX, ownerY, seed + 3) * TAU);
  const bloom = smoothstep(0.05, 0.18, nearest) * smoothstep(0, 0.22, second - nearest);
  return 1.2 * ridge * bloom + 0.8 * (1 - smoothstep(0, 0.09, nearest));
}
// #endregion

/** The 17 samples, in the order of the reference sheet. */
export const GLASS_TEXTURES = {
  acidEtch: {
    name: "Acid Etch",
    tile: 256,
    density: 1,
    height: null,
    refraction: 0,
    blur: 14,
    haze: 0.16,
    sheen: 0,
  },
  aquatex: {
    name: "Aquatex",
    tile: 128,
    density: 1,
    // Pillowy lumps: folding the noise leaves soft domes split by creases.
    height: (u, v) => 3 * Math.abs(noise(u, v, 7, 7, 11)) + Math.abs(noise(u, v, 14, 14, 12)),
    refraction: 18,
    blur: 0,
    haze: 0.04,
    sheen: 0.3,
  },
  austral: {
    name: "Austral",
    tile: 16,
    density: 4,
    // A grid of raised square pillows, each a small lens, with flat channels between them: one
    // pillow per tile.
    height: (u, v) => {
      const pillow = (t: number) => flute(clamp01((t - 0.08) / 0.84));
      return 3 * pillow(u) * pillow(v);
    },
    refraction: 22,
    blur: 0,
    haze: 0.03,
    sheen: 0.4,
  },
  florentine: {
    name: "Florentine",
    tile: 128,
    density: 1.5,
    height: (u, v) => daisies(u, v, 5, 31),
    refraction: 12,
    blur: 0,
    haze: 0.06,
    sheen: 0.5,
  },
  frosted: {
    name: "Frosted",
    tile: 128,
    density: 2,
    // Sandblasted: too fine a grain to refract, so it only shows as a tooth over a heavy blur.
    height: (u, v) => 0.6 * fbm(u, v, 48, 48, 2, 51, 0.7),
    refraction: 0,
    blur: 24,
    haze: 0.34,
    sheen: 0.2,
  },
  glueChip: {
    name: "Glue Chip",
    tile: 128,
    density: 1.5,
    // Chipped frost: sharp, curling ridges from warped, folded noise.
    height: (u, v) => {
      const wx = fbm(u, v, 3, 3, 2, 41);
      const wy = fbm(u, v, 3, 3, 2, 42);
      const ridge = 1 - Math.abs(fbm(u + 0.12 * wx, v + 0.12 * wy, 8, 8, 4, 43, 0.55));
      return 2.2 * ridge * ridge * ridge;
    },
    refraction: 16,
    blur: 0,
    haze: 0.05,
    sheen: 0.4,
  },
  industrex: {
    name: "Industrex",
    tile: 32,
    density: 2,
    // A fine, regular grid of dimples.
    height: (u, v) => 0.3 * (Math.cos(TAU * 8 * u) + Math.cos(TAU * 8 * v)) + 0.1 * noise(u, v, 10, 10, 55),
    refraction: 3.5,
    blur: 2.5,
    haze: 0.1,
    sheen: 0.25,
  },
  machineReamy: {
    name: "Machine Reamy",
    tile: 128,
    density: 1,
    // Long vertical cords drawn into the sheet, with the odd stretched seed.
    height: (u, v) => 3 * fbm(u, v, 7, 1, 3, 61) + 2 * noise(u, v, 2, 1, 62) + 0.8 * seeds(u, v, 12, 2, 63, 0.3),
    refraction: 15,
    blur: 0,
    haze: 0.02,
    sheen: 0.3,
  },
  nouveau: {
    name: "Nouveau",
    tile: 192,
    density: 0.5,
    // Nearly clear, with a slow gentle ripple.
    height: (u, v) => 2 * fbm(u, v, 4, 4, 2, 71),
    refraction: 9,
    blur: 0,
    haze: 0.01,
    sheen: 0.3,
  },
  pattern62: {
    name: "Pattern 62",
    tile: 128,
    density: 1,
    // A dense random pebble that dissolves the view.
    height: (u, v) => 0.8 * fbm(u, v, 32, 32, 2, 81, 0.6),
    refraction: 12,
    blur: 0.8,
    haze: 0.08,
    sheen: 0.3,
  },
  rain: {
    name: "Rain",
    tile: 128,
    density: 1,
    // Runnels: folded noise stretched tall, wandering slightly sideways.
    height: (u, v) => {
      const ridge = 1 - Math.abs(fbm(u + 0.04 * noise(u, v, 2, 3, 91), v, 12, 3, 3, 92, 0.6));
      return 3.5 * ridge * ridge;
    },
    refraction: 16,
    blur: 0,
    haze: 0.04,
    sheen: 0.6,
  },
  reeded: {
    name: "Reeded",
    tile: 20,
    density: 4,
    // Wide convex flutes, each a cylindrical lens: one flute per tile.
    height: (u) => 3.5 * flute(u),
    refraction: 18,
    blur: 0,
    haze: 0.02,
    sheen: 0.4,
  },
  restoration: {
    name: "Restoration 1600-1700",
    tile: 192,
    density: 0.75,
    // Hand-blown: broad uneven waves and the odd seed.
    height: (u, v) => 5 * fbm(u, v, 2, 2, 2, 101) + 1.5 * noise(u, v, 7, 7, 103) + 0.8 * seeds(u, v, 5, 4, 102, 0.35),
    refraction: 12,
    blur: 0,
    haze: 0.01,
    sheen: 0.3,
  },
  ribbed: {
    name: "Ribbed",
    tile: 16,
    density: 4,
    // Narrow flutes over a satin finish.
    height: (u) => 0.8 * flute(fract(u * 4)),
    refraction: 6,
    blur: 3,
    haze: 0.1,
    sheen: 0.5,
  },
  seedy: {
    name: "Seedy",
    tile: 128,
    density: 1.5,
    // Clear glass full of small air bubbles.
    height: (u, v) => 5 * fbm(u, v, 2, 2, 2, 111) + seeds(u, v, 13, 9, 112, 0.7),
    refraction: 10,
    blur: 0,
    haze: 0.01,
    sheen: 0.6,
  },
  taffeta: {
    name: "Taffeta",
    tile: 192,
    density: 0.75,
    // Close parallel folds swept into swirls, like watered silk. The sweeps need the wider tile.
    height: (u, v) => Math.sin(TAU * (6 * u + 12 * v + 10.5 * fbm(u, v, 2, 2, 2, 121))),
    refraction: 14,
    blur: 0,
    haze: 0.03,
    sheen: 0.5,
  },
  waterGlass: {
    name: "Water Glass",
    tile: 192,
    density: 0.5,
    // Big smooth swells, like a rippled water surface.
    height: (u, v) => 7 * fbm(u, v, 4, 4, 2, 131, 0.3),
    refraction: 30,
    blur: 0,
    haze: 0.01,
    sheen: 0.3,
  },
} satisfies Record<string, GlassTexture>;

export type GlassTextureId = keyof typeof GLASS_TEXTURES;

// #region sculpting: from a height field to its slopes and its light. Copied code takes this along as it is.
// Unit vector towards the light (upper left, in front of the glass) and the halfway vector
// between it and the viewer, which is where a mirror-like surface glints.
const LIGHT = unit(-0.5, -0.7, 0.55);
const HALFWAY = unit(LIGHT[0], LIGHT[1], LIGHT[2] + 1);
const SHININESS = 24;
const FLAT_GLINT = HALFWAY[2] ** SHININESS;
/** Sharp crests scatter light and read white; sharp creases read dark. */
const CREST = 0.3;

function unit(x: number, y: number, z: number): [number, number, number] {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
}

type Relief = {
  /** Side of the square relief in px. */
  size: number;
  /** Per pixel, the x and y slope as a fraction (-1 to 1) of the steepest slope on the tile. */
  slopeX: Float32Array;
  slopeY: Float32Array;
  /**
   * Per pixel, the light at full sheen: above zero a white highlight, below zero a black shadow.
   * Its size times `sheen` is the opacity, which stops at 1.
   */
  light: Float32Array;
};

/**
 * Samples a height field over a tile of `tile` px, `density` pixels to the px, and derives its
 * slopes and its lighting.
 */
function sculpt(height: (u: number, v: number) => number, tile: number, density: number): Relief {
  const size = Math.round(tile * density);

  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      heights[y * size + x] = height((x + 0.5) / size, (y + 0.5) / size);
    }
  }

  // Slope (px of height per px) and curvature by finite differences, wrapping at the tile edge
  // so the relief tiles seamlessly.
  const slopeX = new Float32Array(size * size);
  const slopeY = new Float32Array(size * size);
  const light = new Float32Array(size * size);
  let steepest = 1e-6;
  for (let y = 0; y < size; y++) {
    const row = y * size;
    const up = ((y + size - 1) % size) * size;
    const down = ((y + 1) % size) * size;
    for (let x = 0; x < size; x++) {
      const i = row + x;
      const left = heights[row + ((x + size - 1) % size)];
      const right = heights[row + ((x + 1) % size)];
      const sx = ((right - left) * density) / 2;
      const sy = ((heights[down + x] - heights[up + x]) * density) / 2;
      const curve = (left + right + heights[up + x] + heights[down + x] - 4 * heights[i]) * density ** 2;
      slopeX[i] = sx;
      slopeY[i] = sy;
      steepest = Math.max(steepest, Math.abs(sx), Math.abs(sy));

      // Glass is clear, so there is no matte shading: steep slopes that catch the light glint and
      // steep slopes that face away pick up a little grey. Squaring keeps gentle swells invisible.
      const length = Math.hypot(sx, sy, 1);
      const nx = -sx / length;
      const ny = -sy / length;
      const nz = 1 / length;
      const facing = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2] - LIGHT[2];
      const glint = Math.max(0, nx * HALFWAY[0] + ny * HALFWAY[1] + nz * HALFWAY[2]) ** SHININESS - FLAT_GLINT;
      light[i] = 1.4 * Math.max(0, glint) + (facing > 0 ? 1 : 1.2) * facing * Math.abs(facing) - CREST * curve;
    }
  }

  // Glass bends the view towards its thicker side, i.e. up the slope. Slopes are stored as a
  // fraction of the steepest one, so the consumer shifts the backdrop by slope x `refraction`.
  for (let i = 0; i < size * size; i++) {
    slopeX[i] /= steepest;
    slopeY[i] /= steepest;
  }
  return { size, slopeX, slopeY, light };
}
// #endregion

// The relief sculpted last. Dragging a sheen slider re-bakes one texture over and over, and
// sculpting is the slow part; keeping every texture's relief would hold several MB for good.
let sculpted: { texture: GlassTexture; relief: Relief | null } | null = null;

function reliefOf(texture: GlassTexture): Relief | null {
  if (sculpted?.texture !== texture) {
    const relief = texture.height ? sculpt(texture.height, texture.tile, texture.density) : null;
    sculpted = { texture, relief };
  }
  return sculpted.relief;
}

const baked = new WeakMap<GlassTexture, { sheen: number; glass: BakedGlass }>();

/**
 * Rasterises a texture into its displacement map and its highlight layer for CSS, with the
 * highlights at `sheen`. Takes a few ms to a few tens of ms depending on the texture, so the
 * result is kept per texture, and only the highlight layer is redone for another sheen.
 * Browser only.
 */
export function bakeGlassTexture(texture: GlassTexture, sheen = texture.sheen): BakedGlass {
  const kept = baked.get(texture);
  if (kept?.sheen === sheen) return kept.glass;

  const glass = rasterize(reliefOf(texture), sheen, kept?.glass.map ?? null);
  baked.set(texture, { sheen, glass });
  return glass;
}

// #region css: a relief as the two bitmaps CSS glass is made of. Copied React code takes this along as it is.
export type BakedGlass = {
  /** PNG data URI of the displacement map, or null when the glass is flat. */
  map: string | null;
  /** PNG data URI of the highlight/shadow layer, or null when there is no relief or no sheen to light it. */
  shade: string | null;
};

/**
 * Draws a relief as its displacement map and as its highlight layer at `sheen`. `map` is the
 * displacement map from an earlier call for the same relief, which sheen does not change.
 * Browser only.
 */
function rasterize(relief: Relief | null, sheen: number, map: string | null = null): BakedGlass {
  const context = relief ? document.createElement("canvas").getContext("2d") : null;
  if (!relief || !context) return { map: null, shade: null };
  const { size } = relief;
  context.canvas.width = size;
  context.canvas.height = size;

  const image = context.createImageData(size, size);
  const toUri = (paint: (i: number, o: number) => void) => {
    for (let i = 0; i < size * size; i++) paint(i, i * 4);
    context.putImageData(image, 0, 0);
    return context.canvas.toDataURL("image/png");
  };

  // Mid-grey is "no shift" and the steepest slope uses the full range, so feDisplacementMap's
  // scale is 2 x refraction.
  map ??= toUri((i, o) => {
    image.data[o] = Math.round(127.5 + 127.5 * relief.slopeX[i]);
    image.data[o + 1] = Math.round(127.5 + 127.5 * relief.slopeY[i]);
    image.data[o + 2] = 128;
    image.data[o + 3] = 255;
  });

  const shade =
    sheen > 0
      ? toUri((i, o) => {
          const value = relief.light[i] > 0 ? 255 : 0;
          image.data[o] = value;
          image.data[o + 1] = value;
          image.data[o + 2] = value;
          image.data[o + 3] = Math.round(255 * Math.min(1, Math.abs(relief.light[i]) * sheen));
        })
      : null;
  return { map, shade };
}
// #endregion

// #region webgl: a relief as the bytes of one texture. Copied three.js code takes this along as it is.
/** The most light a relief texture can carry in its B channel, in either direction. */
export const GLASS_LIGHT_RANGE = 2;

/**
 * A relief as RGBA bytes for a WebGL texture, rows from the top: R and G hold the x and y slope
 * (mid-grey is flat, y pointing down), B holds the light at full sheen as a fraction of
 * `GLASS_LIGHT_RANGE` (mid-grey is none, brighter a highlight, darker a shadow), so the shader
 * can apply any sheen.
 */
function pack(relief: Relief): Uint8Array {
  const data = new Uint8Array(relief.size * relief.size * 4);
  for (let i = 0; i < relief.size * relief.size; i++) {
    const o = i * 4;
    data[o] = Math.round(127.5 + 127.5 * relief.slopeX[i]);
    data[o + 1] = Math.round(127.5 + 127.5 * relief.slopeY[i]);
    data[o + 2] = Math.round(127.5 + 127.5 * Math.max(-1, Math.min(1, relief.light[i] / GLASS_LIGHT_RANGE)));
    data[o + 3] = 255;
  }
  return data;
}
// #endregion

/** A texture's relief for WebGL, packed as `pack` describes. `null` for flat glass. */
export function packGlassRelief(texture: GlassTexture): { size: number; data: Uint8Array } | null {
  const relief = reliefOf(texture);
  return relief && { size: relief.size, data: pack(relief) };
}
