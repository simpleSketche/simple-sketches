"use server";

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import {
  DEFAULT_GLASS_PARAMS,
  GLASS_COLOR_PARAMS,
  GLASS_PARAM_RANGES,
  NOISE_TYPES,
  RIB_ORIENTATIONS,
  type GlassNumericParam,
  type GlassParams,
} from "./types";

export type CreateExperimentResult = { ok: true; name: string } | { ok: false; error: string };

const EXPERIMENTS_DIR = path.join(process.cwd(), "src", "glass", "experiments");
const NAME_PATTERN = /^[A-Z][A-Za-z0-9]{1,40}$/;
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

function toPascalCase(input: string): string {
  const words = input.trim().match(/[A-Za-z0-9]+/g) ?? [];
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

/** Clamps to [min,max] and snaps to the field's slider step, so no value can land off-grid. */
function clampNumber(value: unknown, min: number, max: number, step: number, fallback: number): number {
  const num = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  const clamped = Math.min(max, Math.max(min, num));
  const snapped = Math.round(clamped / step) * step;
  const decimals = (String(step).split(".")[1] ?? "").length;
  return Number(Math.min(max, Math.max(min, snapped)).toFixed(decimals));
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

/**
 * Validates and clamps every field to its declared range/enum. Never trusts caller input.
 * Numeric fields are driven by GLASS_PARAM_RANGES, so a parameter added to the type and the
 * editor is clamped here automatically rather than silently passing through unvalidated.
 */
function sanitizeParams(input: Partial<GlassParams>, name: string): GlassParams {
  const numeric = {} as Record<GlassNumericParam, number>;
  for (const key of Object.keys(GLASS_PARAM_RANGES) as GlassNumericParam[]) {
    const { min, max, step = 1 } = GLASS_PARAM_RANGES[key];
    numeric[key] = clampNumber(input[key], min, max, step, DEFAULT_GLASS_PARAMS[key]);
  }

  const colors = {} as Record<(typeof GLASS_COLOR_PARAMS)[number], string>;
  for (const key of GLASS_COLOR_PARAMS) {
    const value = input[key];
    colors[key] = typeof value === "string" && HEX_COLOR_PATTERN.test(value) ? value : DEFAULT_GLASS_PARAMS[key];
  }

  return {
    ...numeric,
    ...colors,
    name,
    ribOrientation: RIB_ORIENTATIONS.includes(input.ribOrientation as GlassParams["ribOrientation"])
      ? (input.ribOrientation as GlassParams["ribOrientation"])
      : DEFAULT_GLASS_PARAMS.ribOrientation,
    noiseType: NOISE_TYPES.includes(input.noiseType as GlassParams["noiseType"])
      ? (input.noiseType as GlassParams["noiseType"])
      : DEFAULT_GLASS_PARAMS.noiseType,
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
