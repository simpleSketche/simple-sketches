import { DataTexture, LinearFilter, LinearMipmapLinearFilter, RepeatWrapping, type Texture } from "three";
import {
  abs,
  clamp,
  mix,
  positionLocal,
  sRGBTransferEOTF,
  sRGBTransferOETF,
  step,
  texture,
  uniform,
  vec2,
  vec3,
} from "three/tsl";
import { MeshBasicNodeMaterial, type Node, type TextureNode } from "three/webgpu";

import {
  GLASS_LIGHT_RANGE,
  packGlassRelief,
  type GlassSetting,
  type GlassSettings,
  type GlassTexture,
} from "@/glass/texturedGlass";

/**
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
   * both for a render target or `screenUV`, where three.js puts v = 0 at the top.
   */
  uvPerPx: Node;
  /** Backdrop texels per px of glass. */
  texelsPerPx: Node;
};

/** A hexagon of taps, one blur radius out from the centre one. */
const RING = Array.from({ length: 6 }, (_, i) => [Math.cos((i * Math.PI) / 3), Math.sin((i * Math.PI) / 3)]);

/** Uploads a texture's relief once: slope in R and G, baked light in B. `null` for flat glass. */
export function createGlassRelief(glass: GlassTexture): DataTexture | null {
  const packed = packGlassRelief(glass);
  if (!packed) return null;

  const relief = new DataTexture(packed.data, packed.size, packed.size);
  relief.wrapS = RepeatWrapping;
  relief.wrapT = RepeatWrapping;
  relief.magFilter = LinearFilter;
  relief.minFilter = LinearMipmapLinearFilter;
  relief.generateMipmaps = true;
  relief.needsUpdate = true;
  return relief;
}

export type GlassMaterial = {
  material: MeshBasicNodeMaterial;
  /** The glass's settings on the GPU: assign `.value` to change one without rebuilding the material. */
  uniforms: Record<GlassSetting, { value: number }>;
  /**
   * Whether the shader has its frost taps. A material made with `blur` at zero reads the
   * backdrop once and cannot blur, so going between clear and frosted takes a new material.
   */
  frosted: boolean;
};

/**
 * The WebGL counterpart of `TexturedGlass`: a material for a mesh whose geometry is in px (x
 * right, y up), showing `backdrop` refracted, frosted and lit like the CSS glass.
 */
export function createGlassMaterial(
  settings: GlassSettings,
  relief: DataTexture | null,
  backdrop: GlassBackdrop
): GlassMaterial {
  const size = uniform(settings.size);
  const refraction = uniform(settings.refraction);
  const blur = uniform(settings.blur);
  const haze = uniform(settings.haze);
  const sheen = uniform(settings.sheen);
  const frosted = settings.blur > 0;

  // Position on the pane in px with y down, the way the relief was baked.
  const surface = vec2(positionLocal.x, positionLocal.y.negate());
  const bump = relief ? texture(relief, surface.div(size)) : null;

  // Refraction: look up the slope, by `refraction` px on the steepest one.
  const uv = bump ? backdrop.uv.add(bump.rg.sub(0.5).mul(2).mul(refraction).mul(backdrop.uvPerPx)) : backdrop.uv;

  let color: Node;
  if (frosted) {
    // Frost: seven taps of a mip level that is already averaged over about the blur radius
    // approximate a Gaussian of `blur` px, whatever its size.
    const level = backdrop.texelsPerPx.mul(blur).log2().add(0.5).max(0);
    const reach = backdrop.uvPerPx.mul(blur);
    color = texture(backdrop.texture, uv, level).rgb;
    for (const [x, y] of RING) {
      color = color.add(texture(backdrop.texture, uv.add(reach.mul(vec2(x, y))), level).rgb);
    }
    color = color.div(RING.length + 1);
  } else {
    // An explicit level: the jumps in a refracted UV would otherwise pick blurry mips along every crease.
    color = texture(backdrop.texture, uv, 0).rgb;
  }

  // The veil and the baked light were tuned as CSS overlays, which blend in display space.
  let display = mix(sRGBTransferOETF(color), vec3(1), haze);
  if (bump) {
    const light = clamp(bump.b.sub(0.5).mul(2 * GLASS_LIGHT_RANGE).mul(sheen), -1, 1);
    display = mix(display, vec3(step(0, light)), abs(light));
  }

  const material = new MeshBasicNodeMaterial();
  material.colorNode = sRGBTransferEOTF(display);
  return { material, uniforms: { size, refraction, blur, haze, sheen }, frosted };
}
