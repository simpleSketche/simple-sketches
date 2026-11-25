"use client";

import { useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import BackdropFilterNotice from "@/components/glass/BackdropFilterNotice";
import GlassPanel from "@/components/glass/GlassPanel";
import { Slider } from "@/components/ui/slider";
import { createExperiment } from "@/glass/actions";
import {
  GLASS_BACKGROUND_PRESETS,
  GLASS_PARAM_RANGES,
  NOISE_TYPES,
  RIB_ORIENTATIONS,
  type GlassNumericParam,
  type GlassParams,
} from "@/glass/types";

type GlassEditorProps = {
  initialParams: GlassParams;
};

export default function GlassEditor({ initialParams }: GlassEditorProps) {
  const router = useRouter();
  const [params, setParams] = useState<GlassParams>(initialParams);
  const [customUrl, setCustomUrl] = useState("");
  const [panning, setPanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function update<K extends keyof GlassParams>(key: K, value: GlassParams[K]) {
    setParams((prev) => ({ ...prev, [key]: value }));
  }

  function handleDispatch() {
    if (!params.name.trim()) {
      setError("Name is required.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await createExperiment(params.name, params);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/glass");
      router.refresh();
    });
  }

  /** Slider bound to a numeric param, using that param's declared range/step. */
  function slider(label: string, field: GlassNumericParam) {
    const { min, max, step = 1 } = GLASS_PARAM_RANGES[field];
    const decimals = (String(step).split(".")[1] ?? "").length;
    const value = params[field];
    return (
      <div key={field}>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span>{label}</span>
          <span className="text-muted-foreground">{value.toFixed(decimals)}</span>
        </div>
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={([next]) => update(field, next)}
        />
      </div>
    );
  }

  /** Colour swatch bound to a hex param. */
  function color(label: string, field: "tintColor" | "lightColor" | "edgeColor") {
    return (
      <div className="flex items-center gap-3" key={field}>
        <label className="text-sm" htmlFor={field}>
          {label}
        </label>
        <input
          id={field}
          type="color"
          value={params[field]}
          onChange={(event) => update(field, event.target.value)}
          className="h-8 w-12 rounded border bg-background"
        />
        <span className="text-xs text-muted-foreground">{params[field]}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pt-16">
      <div className="mx-auto max-w-6xl">
        <BackdropFilterNotice />

        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">New Glass Experiment</h1>
          <Link href="/glass" className="text-sm text-muted-foreground hover:underline">
            Back to Glass
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-muted/20 p-8 lg:sticky lg:top-8 lg:self-start">
            <GlassPanel {...params} animateBackground={panning} />
            <button
              type="button"
              onClick={() => setPanning((value) => !value)}
              className="rounded-md border bg-background px-3 py-1.5 text-xs hover:bg-accent"
            >
              {panning ? "Pause background pan" : "Resume background pan"}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="glass-name">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                id="glass-name"
                required
                value={params.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="e.g. FrostedRibbed"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>

            <ParamGroup title="Geometry">
              {slider("Width", "width")}
              {slider("Height", "height")}
              {slider("Border radius", "borderRadius")}
              {slider("Scene padding", "scenePadding")}
            </ParamGroup>

            <ParamGroup title="Glass">
              {slider("Frost (blur px)", "frost")}
              {slider("Refraction (displacement px)", "refraction")}
              {slider("Chromatic aberration (px)", "chromaticAberration")}
              <EnumField
                label="Noise type"
                options={NOISE_TYPES}
                value={params.noiseType}
                onChange={(value) => update("noiseType", value)}
              />
              {slider("Noise frequency", "noiseFrequency")}
              {slider("Noise octaves", "noiseOctaves")}
              {slider("Noise seed", "noiseSeed")}
              {slider("Surface scale (bump height)", "surfaceScale")}
            </ParamGroup>

            <ParamGroup title="Ribs">
              {slider("Rib count", "ribCount")}
              <EnumField
                label="Orientation"
                options={RIB_ORIENTATIONS}
                value={params.ribOrientation}
                onChange={(value) => update("ribOrientation", value)}
              />
              {slider("Rib depth (%)", "ribDepth")}
              {slider("Rib refraction (px)", "ribRefraction")}
              {slider("Rib reflection (slope x100)", "ribReflection")}
            </ParamGroup>

            <ParamGroup title="Light">
              {slider("Azimuth", "lightAzimuth")}
              {slider("Elevation", "lightElevation")}
              {slider("Intensity (specular x100)", "lightIntensity")}
              {slider("Sharpness (specular exponent)", "lightSharpness")}
              {color("Light color", "lightColor")}
              {slider("Reflection (slope x100)", "reflection")}
            </ParamGroup>

            <ParamGroup title="Color">
              {color("Tint color", "tintColor")}
              {slider("Tint opacity (%)", "tintOpacity")}
              {color("Edge color", "edgeColor")}
              {slider("Edge opacity (%)", "edgeOpacity")}
              {slider("Edge width (px)", "edgeWidth")}
            </ParamGroup>

            <ParamGroup title="Background">
              <div className="grid grid-cols-3 gap-2">
                {GLASS_BACKGROUND_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => update("backgroundImage", preset)}
                    className={`aspect-video overflow-hidden rounded-md border ${
                      params.backgroundImage === preset ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preset} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <div>
                <label className="mb-1 block text-sm" htmlFor="bg-url">
                  Custom URL
                </label>
                <div className="flex gap-2">
                  <input
                    id="bg-url"
                    value={customUrl}
                    onChange={(event) => setCustomUrl(event.target.value)}
                    placeholder="https://..."
                    className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => customUrl && update("backgroundImage", customUrl)}
                    className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
                  >
                    Use
                  </button>
                </div>
              </div>
              {slider("Background scale (%)", "backgroundScale")}
            </ParamGroup>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <button
              type="button"
              onClick={handleDispatch}
              disabled={isPending}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? "Dispatching..." : "Dispatch"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParamGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-lg border p-4">
      <legend className="px-1 text-sm font-medium">{title}</legend>
      <div className="flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}

function EnumField<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <span className="mb-1 block text-sm">{label}</span>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-md border px-3 py-1.5 text-xs ${
              value === option ? "bg-primary text-primary-foreground" : "bg-background"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
