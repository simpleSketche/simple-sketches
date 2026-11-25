"use client";

import { useEffect, useState, useTransition } from "react";
import { Check, Copy, SlidersHorizontal } from "lucide-react";

import { Slider } from "@/components/ui/slider";
import { glassSource, loadGlassSource, type GlassCopy } from "@/glass/glassSource";
import {
  GLASS_SETTING_RANGES,
  GLASS_SETTINGS,
  glassSettings,
  type GlassSetting,
  type GlassSettings,
  type GlassTexture,
  type GlassTextureId,
} from "@/glass/texturedGlass";
import { saveGlassDefaults } from "@/glass/textureActions";

const LABELS: Record<GlassSetting, string> = {
  size: "Pattern size (px)",
  refraction: "Refraction (px)",
  blur: "Frost (blur px)",
  haze: "Haze (opacity)",
  sheen: "Sheen (opacity)",
};

/** All that flat glass can vary: with no relief there is no pattern to scale, bend light or catch it. */
const FLAT_SETTINGS: GlassSetting[] = ["blur", "haze"];

type GlassControlsProps = {
  id: GlassTextureId;
  texture: GlassTexture;
  settings: GlassSettings;
  onChange: (settings: GlassSettings) => void;
  /** The kind of code the copy button hands out: the kind the sheet itself is made of. */
  copies: GlassCopy;
};

/**
 * A sample's caption, with a button that copies that glass as code and the sliders that tune it
 * folded away behind another.
 */
export default function GlassControls({ id, texture, settings, onChange, copies }: GlassControlsProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSaving, startSaving] = useTransition();
  const designed = glassSettings(texture);
  const fields = texture.height ? GLASS_SETTINGS : FLAT_SETTINGS;
  const tuned = fields.some((field) => settings[field] !== designed[field]);

  /** Dev-only: writes the tuned settings into the source, where hot reload turns them into the defaults. */
  function saveAsDefault() {
    setError(null);
    startSaving(async () => {
      const result = await saveGlassDefaults(id, settings);
      if (!result.ok) setError(result.error);
    });
  }

  // Fetched ahead of the click: a browser may only let a click write to the clipboard at once.
  useEffect(() => {
    loadGlassSource().catch(() => {});
  }, []);

  /** Puts this glass on the clipboard as it is tuned now: notes, settings and code in one file. */
  async function copy() {
    setError(null);
    try {
      if (!navigator.clipboard) throw new Error("The page has to be on https or on localhost.");
      await navigator.clipboard.writeText(glassSource(await loadGlassSource(), copies, id, settings));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (cause) {
      setError(`Could not copy the code. ${cause instanceof Error ? cause.message : ""}`);
    }
  }

  return (
    <figcaption className="pt-1.5 text-sm">
      <div className="relative text-center">
        {texture.name}
        <button
          type="button"
          aria-label={copied ? "Copied" : `Copy ${texture.name} as code`}
          title="Copy code, settings and notes"
          onClick={copy}
          className="absolute right-8 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-accent"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`Adjust ${texture.name}`}
          onClick={() => setOpen((value) => !value)}
          className={`absolute right-0 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md hover:bg-accent ${
            tuned ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      {error ? <p className="mt-1 text-center text-xs text-destructive">{error}</p> : null}

      {open ? (
        <div className="mt-2 flex flex-col gap-3 rounded-md border p-3">
          {fields.map((field) => {
            const { min, max, step = 1 } = GLASS_SETTING_RANGES[field];
            const decimals = (String(step).split(".")[1] ?? "").length;
            return (
              <div key={field}>
                <div className="mb-1 flex items-center justify-between">
                  <span>{LABELS[field]}</span>
                  <span className="text-muted-foreground">{settings[field].toFixed(decimals)}</span>
                </div>
                <Slider
                  aria-label={LABELS[field]}
                  value={[settings[field]]}
                  min={min}
                  max={max}
                  step={step}
                  onValueChange={([next]) => onChange({ ...settings, [field]: next })}
                />
              </div>
            );
          })}

          <div className="flex justify-end gap-2">
            {process.env.NODE_ENV === "development" ? (
              <button
                type="button"
                disabled={!tuned || isSaving}
                onClick={saveAsDefault}
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save as default"}
              </button>
            ) : null}
            <button
              type="button"
              disabled={!tuned}
              onClick={() => onChange(designed)}
              className="rounded-md border bg-background px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>
      ) : null}
    </figcaption>
  );
}
