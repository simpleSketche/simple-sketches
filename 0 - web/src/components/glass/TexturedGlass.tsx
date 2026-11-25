"use client";

import { useEffect, useId, useState, type CSSProperties, type ReactNode } from "react";

import {
  bakeGlassTexture,
  glassSettings,
  type BakedGlass,
  type GlassSettings,
  type GlassTexture,
} from "@/glass/texturedGlass";
import { useBackdropFilterSupport } from "@/glass/useBackdropFilterSupport";

type TexturedGlassProps = {
  texture: GlassTexture;
  /** How the glass should look, when that differs from what the texture was designed with. */
  settings?: GlassSettings;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * A glass surface: whatever is behind this element is seen through `texture`.
 *
 * Refraction needs an SVG filter in `backdrop-filter`, which only Chromium paints. Elsewhere,
 * and until the texture has been baked, the glass is a plain blur under the same highlights.
 */
export default function TexturedGlass({ texture, settings, className, style, children }: TexturedGlassProps) {
  const { size, refraction, blur, haze, sheen } = settings ?? glassSettings(texture);
  const filterId = `textured-glass-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const canRefract = useBackdropFilterSupport() === "supported";
  // A bake at an earlier sheen stays up until the new one lands, so the glass never drops back
  // to its fallback while a slider is being dragged.
  const [bake, setBake] = useState<{ texture: GlassTexture; baked: BakedGlass } | null>(null);
  const baked = bake?.texture === texture ? bake.baked : null;

  useEffect(() => {
    // Baking blocks for up to tens of ms; a task of its own lets a page full of panes paint between bakes.
    const timer = setTimeout(() => setBake({ texture, baked: bakeGlassTexture(texture, sheen) }));
    return () => clearTimeout(timer);
  }, [texture, sheen]);

  const map = canRefract && refraction > 0 ? baked?.map : null;
  // Without refraction, extra blur stands in for the scatter the relief would have caused.
  const backdropFilter = map ? `url(#${filterId})` : `blur(${blur + refraction / 4}px)`;

  return (
    <div
      className={className}
      style={{
        backgroundColor: `rgb(255 255 255 / ${haze})`,
        backgroundImage: baked?.shade ? `url(${baked.shade})` : undefined,
        backgroundSize: `${size}px ${size}px`,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        ...style,
      }}
    >
      {map ? (
        <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
          {/* sRGB keeps the map's bytes linear in displacement: mid-grey must stay exactly "no shift". */}
          <filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            {/* One tile of the map, repeated across the pane so the glass can be any size. */}
            <feImage href={map} x="0" y="0" width={size} height={size} preserveAspectRatio="none" result="tile" />
            <feTile in="tile" result="map" />
            {blur > 0 ? <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="soft" /> : null}
            <feDisplacementMap
              in={blur > 0 ? "soft" : "SourceGraphic"}
              in2="map"
              scale={refraction * 2}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      ) : null}
      {children}
    </div>
  );
}
