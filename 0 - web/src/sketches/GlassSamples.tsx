"use client";

import { useState } from "react";

import BackdropFilterNotice from "@/components/glass/BackdropFilterNotice";
import GlassControls from "@/components/glass/GlassControls";
import SplitDivider from "@/components/glass/SplitDivider";
import TexturedGlass from "@/components/glass/TexturedGlass";
import { GLASS_TEXTURES, type GlassSettings, type GlassTexture, type GlassTextureId } from "@/glass/texturedGlass";
import { useGlassSettings } from "@/glass/useGlassSettings";

/** How much of a sample starts out behind the glass. */
const INITIAL_SPLIT = 0.56;

type SampleProps = {
  id: GlassTextureId;
  texture: GlassTexture;
  settings: GlassSettings;
  onChange: (settings: GlassSettings) => void;
};

/** One texture over the left of the still life, up to a line that can be dragged across it. */
function Sample({ id, texture, settings, onChange }: SampleProps) {
  const [split, setSplit] = useState(INITIAL_SPLIT);

  return (
    <figure>
      {/* The transparent border keeps a 1px ring of the picture around the pane. A pane
          edge that falls between device pixels refracts the row next to it into view,
          which would otherwise be the page behind the sample. */}
      <div
        className="relative h-[210px] border border-transparent bg-cover bg-center bg-origin-border"
        style={{ backgroundImage: "url(/glass/vase.svg)" }}
      >
        <TexturedGlass
          texture={texture}
          settings={settings}
          className="absolute inset-y-0 left-0"
          style={{ width: `${split * 100}%` }}
        />
        <SplitDivider label={`${texture.name} glass coverage`} value={split} onChange={setSplit} />
      </div>
      <GlassControls id={id} texture={texture} settings={settings} onChange={onChange} copies="react" />
    </figure>
  );
}

/**
 * A glazier's sample sheet: every texture covers the left of the same still life, so the
 * glasses can be compared like for like against the clear right half.
 */
export default function GlassSamples() {
  const [settings, setSettings] = useGlassSettings();

  return (
    <div className="h-screen overflow-y-auto bg-background px-8 pb-12 pt-20 text-foreground">
      <div className="mx-auto max-w-[1192px]">
        <BackdropFilterNotice />
        <h1 className="mb-6 text-2xl font-semibold">Glass Samples</h1>

        <div className="grid grid-cols-[repeat(auto-fill,280px)] gap-x-6 gap-y-5">
          {(Object.keys(GLASS_TEXTURES) as GlassTextureId[]).map((id) => (
            <Sample
              key={id}
              id={id}
              texture={GLASS_TEXTURES[id]}
              settings={settings[id]}
              onChange={(next) => setSettings(id, next)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
