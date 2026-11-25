"use server";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { GLASS_SETTING_RANGES, GLASS_SETTINGS, GLASS_TEXTURES, type GlassSettings, type GlassTextureId } from "./texturedGlass";

export type SaveGlassDefaultsResult = { ok: true } | { ok: false; error: string };

const SOURCE = path.join(process.cwd(), "src", "glass", "texturedGlass.ts");

/**
 * Dev-only: makes `settings` the defaults of one texture by rewriting its numbers in
 * src/glass/texturedGlass.ts, so that a glass tuned on a sample sheet stays that way.
 *
 * Only lines inside that texture's own block change. The id is checked against the known
 * textures, and every value is clamped to its range, snapped to its slider step and written as
 * a number, so nothing a caller sends can put code into the file.
 */
export async function saveGlassDefaults(
  id: string,
  rawSettings: Partial<Record<string, unknown>>
): Promise<SaveGlassDefaultsResult> {
  if (process.env.NODE_ENV !== "development") {
    return { ok: false, error: "Saving defaults is available in dev only." };
  }
  if (!Object.hasOwn(GLASS_TEXTURES, id)) {
    return { ok: false, error: `There is no glass called "${id}".` };
  }

  const settings = {} as GlassSettings;
  for (const key of GLASS_SETTINGS) {
    const value = rawSettings?.[key];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return { ok: false, error: `"${key}" has to be a number.` };
    }
    const { min, max, step = 1 } = GLASS_SETTING_RANGES[key];
    const decimals = (String(step).split(".")[1] ?? "").length;
    const snapped = Math.round(Math.min(max, Math.max(min, value)) / step) * step;
    settings[key] = Number(Math.min(max, Math.max(min, snapped)).toFixed(decimals));
  }

  // Every texture is a block of its own, with each number on a line of its own.
  const lines = (await readFile(SOURCE, "utf8")).split("\n");
  const start = lines.indexOf(`  ${id}: {`);
  const end = start < 0 ? -1 : lines.indexOf("  },", start);
  const lineOf = (key: string) => {
    for (let i = start + 1; i < end; i++) if (lines[i].startsWith(`    ${key}: `)) return i;
    return -1;
  };
  const tileAt = lineOf("tile");
  const written = (["refraction", "blur", "haze", "sheen"] as const).map((key) => ({ key, at: lineOf(key) }));
  if (end < 0 || tileAt < 0 || written.some(({ at }) => at < 0)) {
    return { ok: false, error: `Could not find the settings of "${id}" in texturedGlass.ts.` };
  }

  for (const { key, at } of written) lines[at] = `    ${key}: ${settings[key]},`;

  // `size` is only spelled out when the pattern is drawn at another size than it was sculpted.
  const sizeAt = lineOf("size");
  if (settings.size === GLASS_TEXTURES[id as GlassTextureId].tile) {
    if (sizeAt >= 0) lines.splice(sizeAt, 1);
  } else if (sizeAt >= 0) {
    lines[sizeAt] = `    size: ${settings.size},`;
  } else {
    lines.splice(tileAt + 1, 0, `    size: ${settings.size},`);
  }

  await writeFile(SOURCE, lines.join("\n"), "utf8");
  return { ok: true };
}
