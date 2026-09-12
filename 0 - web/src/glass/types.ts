export type RibOrientation = "vertical" | "horizontal";

export type GlassParams = {
  name: string;
  width: number;
  height: number;
  borderRadius: number;
  frost: number;
  refraction: number;
  reflection: number;
  lightAzimuth: number;
  lightElevation: number;
  lightIntensity: number;
  ribCount: number;
  ribOrientation: RibOrientation;
  ribRefraction: number;
  ribReflection: number;
  tintColor: string;
  tintOpacity: number;
  chromaticAberration: number;
  backgroundImage: string;
};

export const RIB_ORIENTATIONS: RibOrientation[] = ["vertical", "horizontal"];

/** Min/max bounds for every numeric GlassParams field, used by the editor sliders and by the server action to clamp untrusted input. */
export const GLASS_PARAM_RANGES: Record<
  Exclude<keyof GlassParams, "name" | "ribOrientation" | "tintColor" | "backgroundImage">,
  { min: number; max: number }
> = {
  width: { min: 120, max: 800 },
  height: { min: 120, max: 600 },
  borderRadius: { min: 0, max: 200 },
  frost: { min: 0, max: 40 },
  refraction: { min: 0, max: 100 },
  reflection: { min: 0, max: 100 },
  lightAzimuth: { min: 0, max: 360 },
  lightElevation: { min: 0, max: 90 },
  lightIntensity: { min: 0, max: 200 },
  ribCount: { min: 0, max: 40 },
  ribRefraction: { min: 0, max: 100 },
  ribReflection: { min: 0, max: 100 },
  tintOpacity: { min: 0, max: 100 },
  chromaticAberration: { min: 0, max: 20 },
};

/** Bundled background presets shipped under public/glass/. */
export const GLASS_BACKGROUND_PRESETS = [
  "/glass/aurora.svg",
  "/glass/sunset.svg",
  "/glass/grid.svg",
  "/glass/dots.svg",
  "/glass/waves.svg",
  "/glass/noise.svg",
];

/** Extra margin (px, each side) rendered around the glass element so its refraction/reflection has background to distort. Shared by GlassPanel (scene sizing) and GlassCard (uniform scale-to-fit math). */
export const GLASS_SCENE_PADDING = 64;

export const DEFAULT_GLASS_PARAMS: GlassParams = {
  name: "Untitled",
  width: 320,
  height: 220,
  borderRadius: 24,
  frost: 8,
  refraction: 40,
  reflection: 30,
  lightAzimuth: 135,
  lightElevation: 45,
  lightIntensity: 100,
  ribCount: 0,
  ribOrientation: "vertical",
  ribRefraction: 40,
  ribReflection: 30,
  tintColor: "#ffffff",
  tintOpacity: 10,
  chromaticAberration: 4,
  backgroundImage: GLASS_BACKGROUND_PRESETS[0],
};
