"use client";

import { useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import BackdropFilterNotice from "@/components/glass/BackdropFilterNotice";
import GlassPanel from "@/components/glass/GlassPanel";
import { Slider } from "@/components/ui/slider";
import { createExperiment } from "@/glass/actions";
import { GLASS_BACKGROUND_PRESETS, GLASS_PARAM_RANGES, type GlassParams, type RibOrientation } from "@/glass/types";

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
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-muted/20 p-8">
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
              <SliderField
                label="Width"
                value={params.width}
                min={GLASS_PARAM_RANGES.width.min}
                max={GLASS_PARAM_RANGES.width.max}
                onChange={(v) => update("width", v)}
              />
              <SliderField
                label="Height"
                value={params.height}
                min={GLASS_PARAM_RANGES.height.min}
                max={GLASS_PARAM_RANGES.height.max}
                onChange={(v) => update("height", v)}
              />
              <SliderField
                label="Border radius"
                value={params.borderRadius}
                min={GLASS_PARAM_RANGES.borderRadius.min}
                max={GLASS_PARAM_RANGES.borderRadius.max}
                onChange={(v) => update("borderRadius", v)}
              />
            </ParamGroup>

            <ParamGroup title="Glass">
              <SliderField
                label="Frost"
                value={params.frost}
                min={GLASS_PARAM_RANGES.frost.min}
                max={GLASS_PARAM_RANGES.frost.max}
                onChange={(v) => update("frost", v)}
              />
              <SliderField
                label="Refraction"
                value={params.refraction}
                min={GLASS_PARAM_RANGES.refraction.min}
                max={GLASS_PARAM_RANGES.refraction.max}
                onChange={(v) => update("refraction", v)}
              />
              <SliderField
                label="Reflection"
                value={params.reflection}
                min={GLASS_PARAM_RANGES.reflection.min}
                max={GLASS_PARAM_RANGES.reflection.max}
                onChange={(v) => update("reflection", v)}
              />
              <SliderField
                label="Chromatic aberration"
                value={params.chromaticAberration}
                min={GLASS_PARAM_RANGES.chromaticAberration.min}
                max={GLASS_PARAM_RANGES.chromaticAberration.max}
                onChange={(v) => update("chromaticAberration", v)}
              />
            </ParamGroup>

            <ParamGroup title="Ribs">
              <SliderField
                label="Rib count"
                value={params.ribCount}
                min={GLASS_PARAM_RANGES.ribCount.min}
                max={GLASS_PARAM_RANGES.ribCount.max}
                onChange={(v) => update("ribCount", v)}
              />
              <div>
                <span className="mb-1 block text-sm">Orientation</span>
                <div className="flex gap-2">
                  {(["vertical", "horizontal"] satisfies RibOrientation[]).map((orientation) => (
                    <button
                      key={orientation}
                      type="button"
                      onClick={() => update("ribOrientation", orientation)}
                      className={`rounded-md border px-3 py-1.5 text-xs capitalize ${
                        params.ribOrientation === orientation ? "bg-primary text-primary-foreground" : "bg-background"
                      }`}
                    >
                      {orientation}
                    </button>
                  ))}
                </div>
              </div>
              <SliderField
                label="Rib refraction"
                value={params.ribRefraction}
                min={GLASS_PARAM_RANGES.ribRefraction.min}
                max={GLASS_PARAM_RANGES.ribRefraction.max}
                onChange={(v) => update("ribRefraction", v)}
              />
              <SliderField
                label="Rib reflection"
                value={params.ribReflection}
                min={GLASS_PARAM_RANGES.ribReflection.min}
                max={GLASS_PARAM_RANGES.ribReflection.max}
                onChange={(v) => update("ribReflection", v)}
              />
            </ParamGroup>

            <ParamGroup title="Light">
              <SliderField
                label="Azimuth"
                value={params.lightAzimuth}
                min={GLASS_PARAM_RANGES.lightAzimuth.min}
                max={GLASS_PARAM_RANGES.lightAzimuth.max}
                onChange={(v) => update("lightAzimuth", v)}
              />
              <SliderField
                label="Elevation"
                value={params.lightElevation}
                min={GLASS_PARAM_RANGES.lightElevation.min}
                max={GLASS_PARAM_RANGES.lightElevation.max}
                onChange={(v) => update("lightElevation", v)}
              />
              <SliderField
                label="Intensity"
                value={params.lightIntensity}
                min={GLASS_PARAM_RANGES.lightIntensity.min}
                max={GLASS_PARAM_RANGES.lightIntensity.max}
                onChange={(v) => update("lightIntensity", v)}
              />
            </ParamGroup>

            <ParamGroup title="Color">
              <div className="flex items-center gap-3">
                <label className="text-sm" htmlFor="tint-color">
                  Tint color
                </label>
                <input
                  id="tint-color"
                  type="color"
                  value={params.tintColor}
                  onChange={(event) => update("tintColor", event.target.value)}
                  className="h-8 w-12 rounded border bg-background"
                />
              </div>
              <SliderField
                label="Tint opacity"
                value={params.tintOpacity}
                min={GLASS_PARAM_RANGES.tintOpacity.min}
                max={GLASS_PARAM_RANGES.tintOpacity.max}
                onChange={(v) => update("tintOpacity", v)}
              />
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

function SliderField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={1} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}
