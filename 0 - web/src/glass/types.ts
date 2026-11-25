export type RibOrientation = "vertical" | "horizontal";
export type NoiseType = "fractalNoise" | "turbulence";

/**
 * Every value that affects how a glass renders. There are no hidden constants in
 * GlassPanel: each field below maps directly onto an SVG filter attribute or a CSS
 * declaration, with no derived multipliers between the slider and the output.
 */
export type GlassParams = {
  name: string;

  // Geometry (CSS)
  /** Glass width in px. */
  width: number;
  /** Glass height in px. */
  height: number;
  /** CSS border-radius in px. */
  borderRadius: number;
  /** Background margin around the glass, px per side, so refraction has something to bend. */
  scenePadding: number;

  // Glass body
  /** CSS backdrop-filter blur() radius in px. */
  frost: number;
  /** feDisplacementMap scale in px (green channel / centre channel). */
  refraction: number;
  /** Extra px added to the red channel's displacement and subtracted from the blue channel's. */
  chromaticAberration: number;

  // Refraction surface (feTurbulence)
  /** feTurbulence type. */
  noiseType: NoiseType;
  /** feTurbulence baseFrequency. */
  noiseFrequency: number;
  /** feTurbulence numOctaves. */
  noiseOctaves: number;
  /** feTurbulence seed. */
  noiseSeed: number;
  /** feSpecularLighting surfaceScale (bump height). Independent of refraction. */
  surfaceScale: number;

  // Ribs
  /** Number of ribs; 0 disables the rib map entirely. */
  ribCount: number;
  ribOrientation: RibOrientation;
  /** Rib bump amplitude as a percentage of the full 0-255 displacement-map range. */
  ribDepth: number;
  /** px added to the displacement scale when ribs are present. */
  ribRefraction: number;
  /** Rib highlight feFuncA slope x 100 (100 = slope 1). */
  ribReflection: number;

  // Light
  /** feDistantLight azimuth in degrees. */
  lightAzimuth: number;
  /** feDistantLight elevation in degrees. */
  lightElevation: number;
  /** feSpecularLighting specularConstant x 100 (100 = 1.0). */
  lightIntensity: number;
  /** feSpecularLighting specularExponent. Higher = tighter highlight. */
  lightSharpness: number;
  /** feSpecularLighting lightingColor. */
  lightColor: string;
  /** Body highlight feFuncA slope x 100 (100 = slope 1). */
  reflection: number;

  // Color (CSS)
  tintColor: string;
  /** Tint alpha as a percentage. */
  tintOpacity: number;
  edgeColor: string;
  /** Border alpha as a percentage. */
  edgeOpacity: number;
  /** Border width in px. */
  edgeWidth: number;

  // Background (CSS)
  backgroundImage: string;
  /** CSS background-size as a percentage of the scene. */
  backgroundScale: number;
};

export const RIB_ORIENTATIONS: RibOrientation[] = ["vertical", "horizontal"];
export const NOISE_TYPES: NoiseType[] = ["fractalNoise", "turbulence"];

/** Fields validated by hex-colour pattern rather than by a numeric range. */
export const GLASS_COLOR_PARAMS = ["tintColor", "lightColor", "edgeColor"] as const;

export type GlassNumericParam = Exclude<
  keyof GlassParams,
  "name" | "ribOrientation" | "noiseType" | "backgroundImage" | (typeof GLASS_COLOR_PARAMS)[number]
>;

/** Min/max/step for every numeric GlassParams field. Drives the editor sliders and the server action's clamping. */
export const GLASS_PARAM_RANGES: Record<GlassNumericParam, { min: number; max: number; step?: number }> = {
  width: { min: 120, max: 800 },
  height: { min: 120, max: 600 },
  borderRadius: { min: 0, max: 200 },
  scenePadding: { min: 0, max: 200 },
  frost: { min: 0, max: 40 },
  refraction: { min: 0, max: 100 },
  chromaticAberration: { min: 0, max: 20 },
  noiseFrequency: { min: 0.001, max: 0.2, step: 0.001 },
  noiseOctaves: { min: 1, max: 6 },
  noiseSeed: { min: 0, max: 100 },
  surfaceScale: { min: 0, max: 30, step: 0.5 },
  ribCount: { min: 0, max: 40 },
  ribDepth: { min: 0, max: 100 },
  ribRefraction: { min: 0, max: 100 },
  ribReflection: { min: 0, max: 200 },
  lightAzimuth: { min: 0, max: 360 },
  lightElevation: { min: 0, max: 90 },
  lightIntensity: { min: 0, max: 200 },
  lightSharpness: { min: 1, max: 60 },
  reflection: { min: 0, max: 200 },
  tintOpacity: { min: 0, max: 100 },
  edgeOpacity: { min: 0, max: 100 },
  edgeWidth: { min: 0, max: 8 },
  backgroundScale: { min: 100, max: 400 },
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

export const DEFAULT_GLASS_PARAMS: GlassParams = {
  name: "Untitled",
  width: 320,
  height: 220,
  borderRadius: 24,
  scenePadding: 64,
  frost: 8,
  refraction: 24,
  chromaticAberration: 4,
  noiseType: "fractalNoise",
  noiseFrequency: 0.015,
  noiseOctaves: 2,
  noiseSeed: 7,
  surfaceScale: 6,
  ribCount: 0,
  ribOrientation: "vertical",
  ribDepth: 70,
  ribRefraction: 30,
  ribReflection: 50,
  lightAzimuth: 135,
  lightElevation: 45,
  lightIntensity: 110,
  lightSharpness: 14,
  lightColor: "#ffffff",
  reflection: 50,
  tintColor: "#ffffff",
  tintOpacity: 10,
  edgeColor: "#ffffff",
  edgeOpacity: 25,
  edgeWidth: 1,
  backgroundImage: GLASS_BACKGROUND_PRESETS[0],
  backgroundScale: 160,
};
