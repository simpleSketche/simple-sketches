"use client";

import { useCallback, useEffect, useState } from "react";

import {
  GLASS_SETTING_RANGES,
  GLASS_SETTINGS,
  GLASS_TEXTURES,
  glassSettings,
  type GlassSettings,
  type GlassTextureId,
} from "@/glass/texturedGlass";

export type GlassSettingsById = Record<GlassTextureId, GlassSettings>;

const STORAGE_KEY = "glass-settings";
const IDS = Object.keys(GLASS_TEXTURES) as GlassTextureId[];

/** Every texture's settings: as designed, with whatever was tuned in this browser on top. */
function load(): GlassSettingsById {
  let stored: Partial<Record<string, Partial<Record<string, unknown>>>> = {};
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") ?? {};
  } catch {
    // No storage, or nothing readable in it: the designed settings stand.
  }

  const all = {} as GlassSettingsById;
  for (const id of IDS) {
    const settings = glassSettings(GLASS_TEXTURES[id]);
    for (const key of GLASS_SETTINGS) {
      const value = stored[id]?.[key];
      const { min, max } = GLASS_SETTING_RANGES[key];
      if (typeof value === "number" && Number.isFinite(value)) settings[key] = Math.min(max, Math.max(min, value));
    }
    all[id] = settings;
  }
  return all;
}

/** Stores only what differs from the design, so a texture retuned in code is not masked by an old copy. */
function save(all: GlassSettingsById) {
  const tuned: Partial<Record<GlassTextureId, Partial<GlassSettings>>> = {};
  for (const id of IDS) {
    const designed = glassSettings(GLASS_TEXTURES[id]);
    for (const key of GLASS_SETTINGS) {
      if (all[id][key] !== designed[key]) (tuned[id] ??= {})[key] = all[id][key];
    }
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tuned));
  } catch {
    // Tuning still works for this visit.
  }
}

/**
 * The tunable settings of every glass texture, kept in this browser so that a glass tuned on
 * one sample sheet looks the same on the other and after a reload.
 */
export function useGlassSettings() {
  const [all, setAll] = useState(load);
  useEffect(() => save(all), [all]);

  const set = useCallback(
    (id: GlassTextureId, settings: GlassSettings) => setAll((current) => ({ ...current, [id]: settings })),
    []
  );
  return [all, set] as const;
}
