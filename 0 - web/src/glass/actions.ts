"use server";

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { DEFAULT_GLASS_PARAMS, GLASS_PARAM_RANGES, RIB_ORIENTATIONS, type GlassParams } from "./types";

export type CreateExperimentResult = { ok: true; name: string } | { ok: false; error: string };

const EXPERIMENTS_DIR = path.join(process.cwd(), "src", "glass", "experiments");
const NAME_PATTERN = /^[A-Z][A-Za-z0-9]{1,40}$/;
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

function toPascalCase(input: string): string {
  const words = input.trim().match(/[A-Za-z0-9]+/g) ?? [];
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const num = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, num));
}

function sanitizeBackgroundImage(value: unknown): string {
  if (typeof value !== "string" || value.length === 0) return DEFAULT_GLASS_PARAMS.backgroundImage;
  // GlassPanel interpolates this into `background-image: url("<value>")`, which React
  // serializes verbatim into a `style="..."` attribute during SSR. Reject any character
  // that could close the url() token or open a new CSS declaration.
  if (/["'()\\;\s]/.test(value)) return DEFAULT_GLASS_PARAMS.backgroundImage;
  if (value.startsWith("/glass/") || /^https?:\/\//.test(value)) return value;
  return DEFAULT_GLASS_PARAMS.backgroundImage;
}

/** Validates and clamps every field to its declared range/enum. Never trusts caller input. */
function sanitizeParams(input: Partial<GlassParams>, name: string): GlassParams {
  return {
    name,
    width: clampNumber(input.width, GLASS_PARAM_RANGES.width.min, GLASS_PARAM_RANGES.width.max, DEFAULT_GLASS_PARAMS.width),
    height: clampNumber(input.height, GLASS_PARAM_RANGES.height.min, GLASS_PARAM_RANGES.height.max, DEFAULT_GLASS_PARAMS.height),
    borderRadius: clampNumber(
      input.borderRadius,
      GLASS_PARAM_RANGES.borderRadius.min,
      GLASS_PARAM_RANGES.borderRadius.max,
      DEFAULT_GLASS_PARAMS.borderRadius
    ),
    frost: clampNumber(input.frost, GLASS_PARAM_RANGES.frost.min, GLASS_PARAM_RANGES.frost.max, DEFAULT_GLASS_PARAMS.frost),
    refraction: clampNumber(
      input.refraction,
      GLASS_PARAM_RANGES.refraction.min,
      GLASS_PARAM_RANGES.refraction.max,
      DEFAULT_GLASS_PARAMS.refraction
    ),
    reflection: clampNumber(
      input.reflection,
      GLASS_PARAM_RANGES.reflection.min,
      GLASS_PARAM_RANGES.reflection.max,
      DEFAULT_GLASS_PARAMS.reflection
    ),
    lightAzimuth: clampNumber(
      input.lightAzimuth,
      GLASS_PARAM_RANGES.lightAzimuth.min,
      GLASS_PARAM_RANGES.lightAzimuth.max,
      DEFAULT_GLASS_PARAMS.lightAzimuth
    ),
    lightElevation: clampNumber(
      input.lightElevation,
      GLASS_PARAM_RANGES.lightElevation.min,
      GLASS_PARAM_RANGES.lightElevation.max,
      DEFAULT_GLASS_PARAMS.lightElevation
    ),
    lightIntensity: clampNumber(
      input.lightIntensity,
      GLASS_PARAM_RANGES.lightIntensity.min,
      GLASS_PARAM_RANGES.lightIntensity.max,
      DEFAULT_GLASS_PARAMS.lightIntensity
    ),
    ribCount: clampNumber(input.ribCount, GLASS_PARAM_RANGES.ribCount.min, GLASS_PARAM_RANGES.ribCount.max, DEFAULT_GLASS_PARAMS.ribCount),
    ribOrientation: RIB_ORIENTATIONS.includes(input.ribOrientation as (typeof RIB_ORIENTATIONS)[number])
      ? (input.ribOrientation as GlassParams["ribOrientation"])
      : DEFAULT_GLASS_PARAMS.ribOrientation,
    ribRefraction: clampNumber(
      input.ribRefraction,
      GLASS_PARAM_RANGES.ribRefraction.min,
      GLASS_PARAM_RANGES.ribRefraction.max,
      DEFAULT_GLASS_PARAMS.ribRefraction
    ),
    ribReflection: clampNumber(
      input.ribReflection,
      GLASS_PARAM_RANGES.ribReflection.min,
      GLASS_PARAM_RANGES.ribReflection.max,
      DEFAULT_GLASS_PARAMS.ribReflection
    ),
    tintColor: typeof input.tintColor === "string" && HEX_COLOR_PATTERN.test(input.tintColor) ? input.tintColor : DEFAULT_GLASS_PARAMS.tintColor,
    tintOpacity: clampNumber(
      input.tintOpacity,
      GLASS_PARAM_RANGES.tintOpacity.min,
      GLASS_PARAM_RANGES.tintOpacity.max,
      DEFAULT_GLASS_PARAMS.tintOpacity
    ),
    chromaticAberration: clampNumber(
      input.chromaticAberration,
      GLASS_PARAM_RANGES.chromaticAberration.min,
      GLASS_PARAM_RANGES.chromaticAberration.max,
      DEFAULT_GLASS_PARAMS.chromaticAberration
    ),
    backgroundImage: sanitizeBackgroundImage(input.backgroundImage),
  };
}

/**
 * Dev-only: writes src/glass/experiments/<Name>.tsx as a thin GlassPanel wrapper.
 * Always creates a new file - never overwrites. The file path is built only from the
 * regex-validated PascalCase name; every param is clamped/validated and then written
 * via JSON.stringify so no caller-supplied string can inject code into the generated file.
 */
export async function createExperiment(rawName: string, rawParams: Partial<GlassParams>): Promise<CreateExperimentResult> {
  if (process.env.NODE_ENV !== "development") {
    return { ok: false, error: "Creating experiments is available in dev only." };
  }

  const pascalName = toPascalCase(rawName ?? "");

  if (!NAME_PATTERN.test(pascalName)) {
    return {
      ok: false,
      error: "Name must contain letters/digits and start with a letter (2-41 characters after formatting).",
    };
  }

  const filePath = path.join(EXPERIMENTS_DIR, `${pascalName}.tsx`);

  if (existsSync(filePath)) {
    return { ok: false, error: `An experiment named "${pascalName}" already exists.` };
  }

  const params = sanitizeParams(rawParams, pascalName);
  const fileContents = `import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = ${JSON.stringify(params, null, 2)};

export default function ${pascalName}() {
  return <GlassPanel {...params} />;
}
`;

  await writeFile(filePath, fileContents, "utf8");

  return { ok: true, name: pascalName };
}
