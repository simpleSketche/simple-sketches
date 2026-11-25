import {
  GLASS_SETTINGS,
  GLASS_TEXTURES,
  type GlassSetting,
  type GlassSettings,
  type GlassTexture,
  type GlassTextureId,
} from "@/glass/texturedGlass";

/**
 * What a sample sheet's copy button puts on the clipboard: one file for one glass as it is tuned,
 * to paste into another project or to hand to an AI agent. It holds notes on how the effect
 * works, the tuned settings as a commented block, and code that needs nothing from this project.
 *
 * The code sculpts the relief from its formula, as the sheet does, instead of carrying it as
 * image data. Those parts are cut from the text of texturedGlass.ts (its `#region`s and the
 * texture's own `height`), so a copy always does what the sheet does. The component and the
 * material around them are written out below: they mirror TexturedGlass.tsx and glassMaterial.ts
 * and have to follow them.
 */

/** The kind of code a copy holds: a React component drawn with CSS, or a three.js material. */
export type GlassCopy = "react" | "three";

let loading: Promise<string> | null = null;

/** The text of texturedGlass.ts, which copies are cut from. Fetched once. */
export function loadGlassSource(): Promise<string> {
  loading ??= fetch("/glass/source")
    .then((response) => {
      if (!response.ok) throw new Error(`Loading the glass source failed (${response.status}).`);
      return response.text();
    })
    .catch((cause) => {
      // So that asking again tries again.
      loading = null;
      throw cause;
    });
  return loading;
}

/** The lines of one `// #region` of the source, without their exports. */
function region(source: string, name: string): string {
  const found = new RegExp(`^// #region ${name}\\b.*\\n([\\s\\S]*?)\\n// #endregion`, "m").exec(source);
  if (!found) throw new Error(`texturedGlass.ts has no "${name}" region.`);
  return found[1].replace(/^export /gm, "");
}

/** The top-level declarations of a piece of source by name, each with the comment above it, in the order written. */
function declarations(source: string): Map<string, string> {
  const found = new Map<string, string>();
  let comment: string[] = [];
  let name = "";
  let lines: string[] = [];
  const close = () => {
    if (name) found.set(name, lines.join("\n").trimEnd());
    name = "";
  };
  for (const line of source.split("\n")) {
    const declared = /^(?:const|function) ([\w$]+)/.exec(line)?.[1];
    if (declared) {
      close();
      name = declared;
      lines = [...comment, line];
      comment = [];
    } else if (/^(?:\/\/|\/\*| \*)/.test(line)) {
      close();
      comment.push(line);
    } else if (name) {
      lines.push(line);
    } else {
      // A blank line: the comment above it belongs to nothing.
      comment = [];
    }
  }
  close();
  return found;
}

/** A texture's height function as it is written in the source, and the comment above it. */
function heightOf(source: string, id: GlassTextureId): { comment: string[]; code: string } {
  const lines = source.split("\n");
  const start = lines.indexOf(`  ${id}: {`);
  const first = start < 0 ? -1 : lines.findIndex((line, i) => i > start && line.startsWith("    height: "));
  if (first < 0) throw new Error(`texturedGlass.ts has no height for "${id}".`);

  // The function runs on to the texture's next property.
  let end = first + 1;
  while (end < lines.length && !/^ {4}\w+: /.test(lines[end])) end++;
  const code = lines.slice(first, end).join("\n").slice("    height: ".length).replace(/,$/, "").replace(/\n {4}/g, "\n");

  const comment: string[] = [];
  for (let i = first - 1; lines[i].startsWith("    // "); i--) comment.unshift(lines[i].slice("    // ".length));
  return { comment, code };
}

/** Lines of prose as a doc comment. */
const doc = (lines: string[]) => ["/**", ...lines.map((line) => (line ? ` * ${line}` : " *")), " */"].join("\n");

/**
 * What every copy of a glass with a relief starts from: the helpers its surface calls, the
 * surface itself, and the code that sculpts it.
 */
function reliefSource(source: string, id: GlassTextureId): string {
  const { comment, code } = heightOf(source, id);

  // Only the helpers the surface calls, directly or through other helpers, in the order written.
  const helpers = declarations(region(source, "helpers"));
  const used = new Set<string>();
  const visit = (text: string) => {
    for (const word of text.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").match(/[A-Za-z_$][\w$]*/g) ?? []) {
      const helper = helpers.get(word);
      if (helper !== undefined && !used.has(word)) {
        used.add(word);
        visit(helper);
      }
    }
  };
  visit(code);
  let taken = "";
  for (const [name, helper] of helpers) {
    if (!used.has(name)) continue;
    // One-liners sit together, as they do in the source.
    const apart = taken === "" ? "" : helper.includes("\n") || taken.endsWith("}") ? "\n\n" : "\n";
    taken += apart + helper;
  }

  const declaration = "const height: (u: number, v: number) => number =";
  const fits = code.includes("\n") || declaration.length + code.length + 2 <= 120;
  return [
    ...(taken ? [taken, ""] : []),
    doc([
      "The surface: its height in px at (u, v), each running from 0 to 1 across the tile. It wraps at",
      "the tile's edges, so the tile repeats without a seam. Real heights keep the slopes, and so the",
      "light, true to the relief.",
      ...(comment.length ? ["", ...comment] : []),
    ]),
    fits ? `${declaration} ${code};` : `${declaration}\n  ${code};`,
    "",
    region(source, "sculpting"),
  ].join("\n");
}

const SETTING_NOTES: Record<"tile" | "density" | GlassSetting, string> = {
  tile: "Side in px of the square tile that `height` covers. The relief is sculpted at this size.",
  density: "Sculpted pixels per px of tile: above 1 keeps fine detail crisp, below 1 is enough for smooth swells.",
  size: "Side in px the tile is drawn at. Unlike `tile`, it scales the whole pattern, slopes and light included.",
  refraction: "Sideways shift of the backdrop in px on the steepest slope of the surface.",
  blur: "Backdrop blur in px (Gaussian standard deviation).",
  haze: "Opacity (0-1) of the white veil that scattering leaves on the glass.",
  sheen: "Opacity (0-1) of the highlights and shadows.",
};

/** The glass's numbers as a commented block. Flat glass has no pattern to scale, to bend light or to catch it. */
function configSource(texture: GlassTexture, settings: GlassSettings): string {
  const values = { tile: texture.tile, density: texture.density, ...settings };
  const keys = texture.height ? (["tile", "density", ...GLASS_SETTINGS] as const) : (["blur", "haze"] as const);
  return [
    texture.height
      ? doc([
          "The glass as it was tuned on the sheet. `tile` and `density` belong to the relief: change them",
          "and the surface changes. The rest is free to change.",
        ])
      : "/** The glass as it was tuned on the sheet. */",
    "const GLASS = {",
    ...keys.flatMap((key) => [`  /** ${SETTING_NOTES[key]} */`, `  ${key}: ${values[key]},`]),
    "};",
  ].join("\n");
}

const SURFACE_NOTES = [
  "1. The surface is a height field. `height(u, v)` gives the height of the glass in px over one",
  "   square tile and wraps at the tile's edges, so the tile repeats without a seam. Everything",
  "   else is derived from it.",
  "2. Sculpting (`sculpt`) samples the tile on a grid of tile x density pixels. Central differences",
  "   give the slope in every pixel, kept as a fraction of the steepest slope on the tile, and a",
  "   light value. Glass is clear, so nothing is shaded the way a matte surface is: there is a",
  "   glint where the surface mirrors a light from the upper left to the viewer, a faint tint on",
  "   slopes that lean towards that light or away from it, white on sharp crests and dark in",
  "   sharp creases.",
];

const FLAT_NOTE = "This glass has a flat surface, so it has nothing to refract with and nothing to catch the light.";

function reactSource(name: string, title: string, config: string, relief: string | null, css: string | null): string {
  const usage = [
    "Give the element a size and lay it over other content. Whatever is behind it shows through",
    `the glass. Needs ${relief ? "React 18 or later" : "React"} and nothing else.`,
    "",
    '  <div style={{ position: "relative" }}>',
    '    <img src="/photo.jpg" alt="" />',
    `    <${name} style={{ position: "absolute", inset: 0 }} />`,
    "  </div>",
  ];
  const props = `type ${name}Props = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};`;

  if (!relief) {
    return `${doc([
      `${title}, as a React component.`,
      "A pane of evenly frosted glass made with CSS, copied from the Glass Samples sheet with the",
      "settings it was tuned to there: see GLASS.",
      "",
      ...usage,
      "",
      "HOW IT WORKS, for whoever rebuilds or changes it, human or AI",
      "",
      FLAT_NOTE,
      "It is a blur of whatever is behind the element (`backdrop-filter: blur()`) under a veil of",
      "white (a `background-color` at low opacity). Every current browser draws it.",
      "",
      "The children of the element are drawn on top of the glass, not seen through it.",
    ])}
import type { CSSProperties, ReactNode } from "react";

${config}

${props}

export default function ${name}({ className, style, children }: ${name}Props) {
  const backdropFilter = \`blur(\${GLASS.blur}px)\`;

  return (
    <div
      className={className}
      style={{
        backgroundColor: \`rgb(255 255 255 / \${GLASS.haze})\`,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
`;
  }

  return `${doc([
    `${title}, as a React component.`,
    'A pane of textured ("obscure") glass made with CSS, copied from the Glass Samples sheet with the',
    "settings it was tuned to there: see GLASS.",
    "",
    ...usage,
    "",
    "HOW IT WORKS, for whoever rebuilds or changes it, human or AI",
    "",
    ...SURFACE_NOTES,
    "3. Baking (`rasterize`) draws that as two small PNGs, once, in the browser. The map holds the",
    "   slope: red is x, green is y, mid-grey is flat. The shade holds the light: white or black at",
    "   an opacity of light x sheen.",
    "4. Refraction is an SVG filter, run over what is behind the element by",
    "   `backdrop-filter: url(#id)`. feImage and feTile repeat the map across the pane,",
    "   feGaussianBlur frosts the backdrop when `blur` is above zero, and feDisplacementMap moves",
    "   every pixel of it along the slope. It shifts by scale x (channel - 0.5), so a scale of",
    "   2 x refraction is `refraction` px on the steepest slope.",
    "5. The light lies on top as plain CSS: the shade as a tiled background-image, the haze as a",
    "   white background-color at low opacity.",
    "",
    "GOOD TO KNOW",
    "",
    "- Only Chromium paints an SVG filter in backdrop-filter. Safari and Firefox show a plain blur",
    "  of blur + refraction / 4 px under the same highlights, and so does Chromium until the bake",
    "  has run.",
    "- Chrome runs the filter again for every pane on every frame the page produces, even while",
    "  nothing moves, so the map has to stay small: keep tile x density at or under about 192. In a",
    "  test of 36 panes, a 128 px tile with a 128 px map held 60 fps where a 256 px tile with a",
    "  384 px map fell to 12.",
    "- The children of the element are drawn on top of the glass, not seen through it.",
    "- To change the look, change the numbers in GLASS. To change the glass itself, change `height`.",
  ])}
"use client";

import { useEffect, useId, useState, type CSSProperties, type ReactNode } from "react";

${config}

${relief}

${css}

// Sculpting and baking take from a few ms to a few tens of ms and give the same result every
// time, so every pane shares one bake.
let baked: BakedGlass | null = null;

${props}

export default function ${name}({ className, style, children }: ${name}Props) {
  const { size, refraction, blur, haze } = GLASS;
  const filterId = \`textured-glass-\${useId().replace(/[^a-zA-Z0-9]/g, "")}\`;
  // The bake, and whether this browser can refract with it. Until the effect below has run, and
  // on the server, the glass is its fallback: a plain blur.
  const [glass, setGlass] = useState<(BakedGlass & { refracts: boolean }) | null>(null);

  useEffect(() => {
    // A task of its own, so that the page can paint before the bake holds it up.
    const timer = setTimeout(() => {
      baked ??= rasterize(sculpt(height, GLASS.tile, GLASS.density), GLASS.sheen);
      // Only Chromium paints an SVG filter in backdrop-filter. Other engines may accept the
      // syntax and then draw nothing, hence the look at the user agent.
      const chromium = /Chrome\\/|Chromium\\/|Edg\\//.test(navigator.userAgent);
      setGlass({ ...baked, refracts: chromium && CSS.supports("backdrop-filter", "url(#a)") });
    });
    return () => clearTimeout(timer);
  }, []);

  const map = glass?.refracts && refraction > 0 ? glass.map : null;
  // Without refraction, extra blur stands in for the scatter the relief would have caused.
  const backdropFilter = map ? \`url(#\${filterId})\` : \`blur(\${blur + refraction / 4}px)\`;

  return (
    <div
      className={className}
      style={{
        backgroundColor: \`rgb(255 255 255 / \${haze})\`,
        backgroundImage: glass?.shade ? \`url(\${glass.shade})\` : undefined,
        backgroundSize: \`\${size}px \${size}px\`,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        ...style,
      }}
    >
      {map ? (
        <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
          {/* sRGB keeps the map's bytes linear in displacement: mid-grey must stay exactly "no shift". */}
          <filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            {/* One tile of the map, repeated across the pane so the glass can be any size. */}
            <feImage href={map} x="0" y="0" width={size} height={size} preserveAspectRatio="none" result="tile" />
            <feTile in="tile" result="map" />
            {blur > 0 ? <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="soft" /> : null}
            <feDisplacementMap
              in={blur > 0 ? "soft" : "SourceGraphic"}
              in2="map"
              scale={refraction * 2}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      ) : null}
      {children}
    </div>
  );
}
`;
}

function threeSource(name: string, title: string, config: string, relief: string | null, webgl: string | null): string {
  const usage = [
    "Written with TSL for WebGPURenderer in three r182, which falls back to WebGL 2 by itself.",
    "",
    "USAGE",
    "",
    "  const w = 280, h = 210, dpr = Math.min(window.devicePixelRatio, 2);",
    "",
    "  // What is behind the glass goes into a texture first. Frost reads its mipmaps, and half",
    "  // floats keep its linear colours from banding.",
    "  const behind = new RenderTarget(w * dpr, h * dpr, {",
    "    type: HalfFloatType,",
    "    generateMipmaps: true,",
    "    minFilter: LinearMipmapLinearFilter,",
    "  });",
    "",
    "  // The pane's geometry is in px from its top-left corner, x to the right and y up. Here the",
    "  // texture shows exactly what the pane covers, so a place on the pane is a place in the texture.",
    "  const at = vec2(positionLocal.x, positionLocal.y.negate());",
    `  const material = create${name}({`,
    "    texture: behind.texture,",
    "    uv: at.div(vec2(w, h)),",
    "    uvPerPx: vec2(1 / w, 1 / h),",
    "    texelsPerPx: float(dpr),",
    "  });",
    "  const pane = new Mesh(new PlaneGeometry(w, h).translate(w / 2, -h / 2, 0), material);",
    "",
    "  // Every frame: the scene behind the glass into the texture, then the scene with the pane.",
    "  renderer.setRenderTarget(behind);",
    "  renderer.render(sceneBehind, cameraBehind);",
    "  renderer.setRenderTarget(null);",
    "  renderer.render(sceneWithPane, camera);",
  ];
  const backdropNote = (step: number) => [
    `${step}. The backdrop. A shader cannot read what is already on screen, so the scene behind the glass`,
    "   is rendered into a texture first, and the glass draws that texture again, changed.",
  ];
  const frostNote = (step: number) => [
    `${step}. Frost: when \`blur\` is above zero, seven taps, the middle one and a hexagon one blur radius`,
    "   out, of the mip level that is already averaged over about that radius. Together they come",
    "   close to a Gaussian blur of `blur` px at any size.",
  ];
  const goodToKnow = [
    "- The texture behind the glass needs mipmaps for frost: generateMipmaps and",
    "  LinearMipmapLinearFilter, as above.",
    "- Let that texture show a little more than the pane covers, so that glass at its edge has",
    "  something to bring into view. The sheet renders 32 px past each pane: with such a bleed,",
    "  uvPerPx is 1 / (pane size + 2 x bleed) and uv is (at + bleed) x uvPerPx.",
    "- The numbers in GLASS are compiled into the shader as constants. To animate one, make it a",
    "  `TSL.uniform()`. `blur` also picks between two shaders, clear and frosted, when the",
    "  material is made.",
  ];
  const backdrop = `/**
 * What a pane sees through itself. WebGL cannot read the page, so this has to be a texture of
 * the scene behind the glass, such as a render target that scene was drawn into.
 */
export type GlassBackdrop = {
  /** The scene behind the glass. Blurred glass reads its mipmaps. */
  texture: Texture | TextureNode;
  /** Where in that texture the fragment being shaded sits. */
  uv: Node;
  /**
   * Backdrop UV covered by one px of glass on each axis, with y counted downwards: positive on
   * both for a render target, where three.js puts v = 0 at the top.
   */
  uvPerPx: Node;
  /** Backdrop texels per px of glass. */
  texelsPerPx: Node;
};

/** A hexagon of taps, one blur radius out from the middle one. */
const RING = Array.from({ length: 6 }, (_, i) => [Math.cos((i * Math.PI) / 3), Math.sin((i * Math.PI) / 3)]);`;
  const frost = (clear: string) => `  let color: Node;
  if (blur > 0) {
    // Frost: seven taps of a mip level that is already averaged over about the blur radius
    // approximate a Gaussian of \`blur\` px, whatever its size.
    const level = backdrop.texelsPerPx.mul(blur).log2().add(0.5).max(0);
    const reach = backdrop.uvPerPx.mul(blur);
    color = TSL.texture(backdrop.texture, uv, level).rgb;
    for (const [x, y] of RING) {
      color = color.add(TSL.texture(backdrop.texture, uv.add(reach.mul(TSL.vec2(x, y))), level).rgb);
    }
    color = color.div(RING.length + 1);
  } else {
    // ${clear}
    color = TSL.texture(backdrop.texture, uv, 0).rgb;
  }`;

  if (!relief) {
    return `${doc([
      `${title} for three.js.`,
      "A material that shows what is behind it through evenly frosted glass, copied from the Glass",
      "Samples sheet with the settings it was tuned to there: see GLASS.",
      "",
      ...usage,
      "",
      "HOW IT WORKS, for whoever rebuilds or changes it, human or AI",
      "",
      FLAT_NOTE,
      "",
      ...backdropNote(1),
      ...frostNote(2),
      "3. Haze: the colour goes to display (sRGB) space, is mixed towards white by `haze`, and goes",
      "   back. CSS overlays blend in display space, and this glass was tuned to look like its CSS",
      "   twin.",
      "",
      "GOOD TO KNOW",
      "",
      ...goodToKnow,
    ])}
import type { Texture } from "three";
import * as TSL from "three/tsl";
import { MeshBasicNodeMaterial, type Node, type TextureNode } from "three/webgpu";

${config}

${backdrop}

/** Makes the glass material. */
export function create${name}(backdrop: GlassBackdrop): MeshBasicNodeMaterial {
  const { blur, haze } = GLASS;
  const { uv } = backdrop;

${frost("An explicit level, so that the backdrop is read at its sharpest.")}

  // The veil was tuned as a CSS overlay, which blends in display space.
  const display = TSL.mix(TSL.sRGBTransferOETF(color), TSL.vec3(1), haze);

  const material = new MeshBasicNodeMaterial();
  material.colorNode = TSL.sRGBTransferEOTF(display);
  return material;
}
`;
  }

  return `${doc([
    `${title} for three.js.`,
    'A material that shows what is behind it through textured ("obscure") glass, copied from the',
    "Glass Samples sheet with the settings it was tuned to there: see GLASS.",
    "",
    ...usage,
    "",
    "HOW IT WORKS, for whoever rebuilds or changes it, human or AI",
    "",
    ...SURFACE_NOTES,
    "3. Packing (`pack`) puts both into one small repeating texture: R and G hold the x and y slope",
    "   (mid-grey is flat), B holds the light at full sheen (mid-grey is none).",
    ...backdropNote(4),
    "5. Refraction: the backdrop is read slope x `refraction` px away from where the fragment sits.",
    ...frostNote(6),
    "7. Light: the colour goes to display (sRGB) space, is mixed towards white by `haze`, then",
    "   towards white or black by light x sheen, and goes back. CSS overlays blend in display",
    "   space, and this glass was tuned to look like its CSS twin.",
    "",
    "GOOD TO KNOW",
    "",
    "- The mesh's geometry has to be in px, x to the right and y up: the relief tiles from the",
    "  geometry's origin, every `size` px.",
    ...goodToKnow,
  ])}
import { DataTexture, LinearFilter, LinearMipmapLinearFilter, RepeatWrapping, type Texture } from "three";
import * as TSL from "three/tsl";
import { MeshBasicNodeMaterial, type Node, type TextureNode } from "three/webgpu";

${config}

${backdrop}

${relief}

${webgl}

// Sculpting takes from a few ms to a few tens of ms and gives the same result every time, so
// every material shares one relief texture. It is small, and it is never disposed of.
let packed: DataTexture | null = null;

/** The surface as a repeating texture: its slope in R and G, its light in B. */
function reliefTexture(): DataTexture {
  if (!packed) {
    const sculpted = sculpt(height, GLASS.tile, GLASS.density);
    packed = new DataTexture(pack(sculpted), sculpted.size, sculpted.size);
    packed.wrapS = RepeatWrapping;
    packed.wrapT = RepeatWrapping;
    packed.magFilter = LinearFilter;
    packed.minFilter = LinearMipmapLinearFilter;
    packed.generateMipmaps = true;
    packed.needsUpdate = true;
  }
  return packed;
}

/** Makes the glass material, for a mesh whose geometry is in px (x right, y up). */
export function create${name}(backdrop: GlassBackdrop): MeshBasicNodeMaterial {
  const { size, refraction, blur, haze, sheen } = GLASS;

  // Position on the pane in px with y down, the way the relief was sculpted.
  const surface = TSL.vec2(TSL.positionLocal.x, TSL.positionLocal.y.negate());
  const bump = TSL.texture(reliefTexture(), surface.div(size));

  // Refraction: look up the slope, by \`refraction\` px on the steepest one.
  const uv = backdrop.uv.add(bump.rg.sub(0.5).mul(2).mul(refraction).mul(backdrop.uvPerPx));

${frost("An explicit level: the jumps in a refracted UV would otherwise pick blurry mips along every crease.")}

  // The veil and the light were tuned as CSS overlays, which blend in display space.
  let display = TSL.mix(TSL.sRGBTransferOETF(color), TSL.vec3(1), haze);
  const light = TSL.clamp(bump.b.sub(0.5).mul(2 * GLASS_LIGHT_RANGE).mul(sheen), -1, 1);
  display = TSL.mix(display, TSL.vec3(TSL.step(0, light)), TSL.abs(light));

  const material = new MeshBasicNodeMaterial();
  material.colorNode = TSL.sRGBTransferEOTF(display);
  return material;
}
`;
}

/** The file for one glass as it is tuned now. `source` is what `loadGlassSource` gave. */
export function glassSource(source: string, kind: GlassCopy, id: GlassTextureId, settings: GlassSettings): string {
  const texture: GlassTexture = GLASS_TEXTURES[id];
  // "Restoration 1600-1700" becomes "Restoration16001700Glass": a name the copy can export.
  const words = texture.name.match(/[A-Za-z0-9]+/g) ?? [];
  const pascal = words.map((word) => word[0].toUpperCase() + word.slice(1)).join("");
  const name = pascal.endsWith("Glass") ? pascal : `${pascal}Glass`;
  const title = texture.name.endsWith("Glass") ? texture.name : `${texture.name} glass`;

  const config = configSource(texture, settings);
  const relief = texture.height ? reliefSource(source, id) : null;
  return kind === "react"
    ? reactSource(name, title, config, relief, relief && region(source, "css"))
    : threeSource(name, title, config, relief, relief && region(source, "webgl"));
}
