"use client";

import { useId, useMemo } from "react";

import { GLASS_SCENE_PADDING, type GlassParams, type RibOrientation } from "@/glass/types";

type GlassPanelProps = GlassParams & {
  /** Editor-only: slowly pan the background image. Never part of GlassParams/persisted params. */
  animateBackground?: boolean;
};

/**
 * Generates a small SVG "normal map" data URI used as the feImage bump source for ribs.
 * The map is mid-gray (128,128,128 = no displacement) everywhere except a periodic band
 * that sweeps one channel (R for vertical ribs, G for horizontal ribs) from low to high and
 * back, which feDisplacementMap reads as a left-right (or up-down) lens curvature per rib.
 */
function buildRibDataUri(width: number, height: number, ribCount: number, orientation: RibOrientation): string {
  const vertical = orientation === "vertical";
  const tileSize = Math.max(1, (vertical ? width : height) / ribCount);
  const gradient = vertical
    ? `<linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgb(40,128,128)" />
        <stop offset="50%" stop-color="rgb(216,128,128)" />
        <stop offset="100%" stop-color="rgb(40,128,128)" />
      </linearGradient>`
    : `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgb(128,40,128)" />
        <stop offset="50%" stop-color="rgb(128,216,128)" />
        <stop offset="100%" stop-color="rgb(128,40,128)" />
      </linearGradient>`;
  const patternWidth = vertical ? tileSize : width;
  const patternHeight = vertical ? height : tileSize;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      ${gradient}
      <pattern id="p" x="0" y="0" width="${patternWidth}" height="${patternHeight}" patternUnits="userSpaceOnUse">
        <rect width="${patternWidth}" height="${patternHeight}" fill="url(#g)" />
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="rgb(128,128,128)" />
    <rect width="${width}" height="${height}" fill="url(#p)" />
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function hexToRgba(hex: string, alpha: number): string {
  const match = /^#([0-9a-fA-F]{6})$/.exec(hex);
  if (!match) return `rgba(255,255,255,${alpha})`;
  const value = match[1];
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function GlassPanel({
  width,
  height,
  borderRadius,
  frost,
  refraction,
  reflection,
  lightAzimuth,
  lightElevation,
  lightIntensity,
  ribCount,
  ribOrientation,
  ribRefraction,
  ribReflection,
  tintColor,
  tintOpacity,
  chromaticAberration,
  backgroundImage,
  animateBackground = false,
}: GlassPanelProps) {
  const reactId = useId();
  const filterId = useMemo(() => `glass-filter-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`, [reactId]);

  const hasRibs = ribCount > 0;
  const ribDataUri = useMemo(
    () => (hasRibs ? buildRibDataUri(width, height, ribCount, ribOrientation) : null),
    [hasRibs, width, height, ribCount, ribOrientation]
  );

  // Displacement magnitude: base refraction plus, when ribs are present, their own contribution.
  const baseScale = (refraction / 100) * 60;
  const ribScale = hasRibs ? (ribRefraction / 100) * 40 : 0;
  const dispScale = baseScale + ribScale;
  const scaleR = dispScale + chromaticAberration;
  const scaleG = dispScale;
  const scaleB = Math.max(dispScale - chromaticAberration, 0);

  // Lighting: surfaceScale/specularConstant derive from refraction (bump height) and lightIntensity.
  const surfaceScale = 2 + (refraction / 100) * 8;
  const specularConstant = 0.2 + (lightIntensity / 200) * 1.8;
  const reflectionSlope = (reflection / 100) * 1.6;
  const ribReflectionSlope = hasRibs ? (ribReflection / 100) * 1.4 : 0;

  const sceneWidth = width + GLASS_SCENE_PADDING * 2;
  const sceneHeight = height + GLASS_SCENE_PADDING * 2;

  const backdropFilterValue = `url(#${filterId}) blur(${frost}px)`;

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-black/5"
      style={{ width: sceneWidth, height: sceneHeight }}
    >
      {/* Scene container: the background the glass will refract. */}
      <div
        className={animateBackground ? "glass-pan-bg absolute inset-0" : "absolute inset-0"}
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "160% 160%",
          backgroundPosition: "0% 50%",
          animationPlayState: animateBackground ? "running" : "paused",
        }}
      />

      {/* Hidden filter definition. `filterId` is unique per mounted GlassPanel (React useId). */}
      <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            {/* Base irregular refraction surface. */}
            <feTurbulence type="fractalNoise" baseFrequency={0.015} numOctaves={2} seed={7} result="noise" />

            {ribDataUri ? <feImage href={ribDataUri} x="0" y="0" width={width} height={height} result="ribs" /> : null}

            {/* Combined bump map used for both displacement and lighting. */}
            <feBlend in={ribDataUri ? "ribs" : "noise"} in2="noise" mode="screen" result="bump" />

            {/* Light source. */}
            <feSpecularLighting
              in="bump"
              surfaceScale={surfaceScale}
              specularConstant={specularConstant}
              specularExponent={14}
              lightingColor="#ffffff"
              result="lightRaw"
            >
              <feDistantLight azimuth={lightAzimuth} elevation={lightElevation} />
            </feSpecularLighting>
            <feComposite in="lightRaw" in2="SourceAlpha" operator="in" result="light" />
            <feComponentTransfer in="light" result="highlight">
              <feFuncA type="linear" slope={reflectionSlope} intercept={0} />
            </feComponentTransfer>

            {ribDataUri ? (
              <>
                {/* Ribs get their own highlight pass so ribReflection is independent of overall reflection. */}
                <feSpecularLighting
                  in="ribs"
                  surfaceScale={surfaceScale}
                  specularConstant={specularConstant}
                  specularExponent={14}
                  lightingColor="#ffffff"
                  result="ribLightRaw"
                >
                  <feDistantLight azimuth={lightAzimuth} elevation={lightElevation} />
                </feSpecularLighting>
                <feComposite in="ribLightRaw" in2="SourceAlpha" operator="in" result="ribLight" />
                <feComponentTransfer in="ribLight" result="ribHighlight">
                  <feFuncA type="linear" slope={ribReflectionSlope} intercept={0} />
                </feComponentTransfer>
              </>
            ) : null}

            {/* Chromatic aberration: each color channel is displaced by a slightly different scale. */}
            <feDisplacementMap in="SourceGraphic" in2="bump" scale={scaleR} xChannelSelector="R" yChannelSelector="G" result="dispR" />
            <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1" result="chR" />
            <feDisplacementMap in="SourceGraphic" in2="bump" scale={scaleG} xChannelSelector="R" yChannelSelector="G" result="dispG" />
            <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1" result="chG" />
            <feDisplacementMap in="SourceGraphic" in2="bump" scale={scaleB} xChannelSelector="R" yChannelSelector="G" result="dispB" />
            <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0 1" result="chB" />
            {/* Recombine the isolated channels with "screen" (a+b-a*b): each channel/alpha stays
                in [0,1] since only one of the three layers is ever non-zero per channel. */}
            <feBlend in="chR" in2="chG" mode="screen" result="chRG" />
            <feBlend in="chRG" in2="chB" mode="screen" result="refracted" />

            <feMerge>
              <feMergeNode in="refracted" />
              <feMergeNode in="highlight" />
              {ribDataUri ? <feMergeNode in="ribHighlight" /> : null}
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* The glass surface. */}
      <div
        className="absolute border border-white/25"
        style={{
          left: GLASS_SCENE_PADDING,
          top: GLASS_SCENE_PADDING,
          width,
          height,
          borderRadius,
          backgroundColor: hexToRgba(tintColor, tintOpacity / 100),
          backdropFilter: backdropFilterValue,
          WebkitBackdropFilter: backdropFilterValue,
        }}
      />
    </div>
  );
}
