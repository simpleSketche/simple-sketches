"use client";

import { useId, useMemo } from "react";

import type { GlassParams, RibOrientation } from "@/glass/types";

type GlassPanelProps = GlassParams & {
  /** Editor-only: slowly pan the background image. Never part of GlassParams/persisted params. */
  animateBackground?: boolean;
};

/**
 * Generates a small SVG "normal map" data URI used as the feImage bump source for ribs.
 * The map is mid-gray (128,128,128 = no displacement) everywhere except a periodic band
 * that sweeps one channel (R for vertical ribs, G for horizontal ribs) from low to high and
 * back, which feDisplacementMap reads as a left-right (or up-down) lens curvature per rib.
 * `depth` is the sweep amplitude as a percentage of the full 0-255 range.
 */
function buildRibDataUri(
  width: number,
  height: number,
  ribCount: number,
  orientation: RibOrientation,
  depth: number
): string {
  const vertical = orientation === "vertical";
  const tileSize = Math.max(1, (vertical ? width : height) / ribCount);
  const amplitude = Math.round((depth / 100) * 127);
  const low = 128 - amplitude;
  const high = 128 + amplitude;
  const gradient = vertical
    ? `<linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgb(${low},128,128)" />
        <stop offset="50%" stop-color="rgb(${high},128,128)" />
        <stop offset="100%" stop-color="rgb(${low},128,128)" />
      </linearGradient>`
    : `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgb(128,${low},128)" />
        <stop offset="50%" stop-color="rgb(128,${high},128)" />
        <stop offset="100%" stop-color="rgb(128,${low},128)" />
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
  scenePadding,
  frost,
  refraction,
  chromaticAberration,
  noiseType,
  noiseFrequency,
  noiseOctaves,
  noiseSeed,
  surfaceScale,
  ribCount,
  ribOrientation,
  ribDepth,
  ribRefraction,
  ribReflection,
  lightAzimuth,
  lightElevation,
  lightIntensity,
  lightSharpness,
  lightColor,
  reflection,
  tintColor,
  tintOpacity,
  edgeColor,
  edgeOpacity,
  edgeWidth,
  backgroundImage,
  backgroundScale,
  animateBackground = false,
}: GlassPanelProps) {
  const reactId = useId();
  const filterId = useMemo(() => `glass-filter-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`, [reactId]);

  const hasRibs = ribCount > 0;
  const ribDataUri = useMemo(
    () => (hasRibs ? buildRibDataUri(width, height, ribCount, ribOrientation, ribDepth) : null),
    [hasRibs, width, height, ribCount, ribOrientation, ribDepth]
  );

  // Displacement is in px: `refraction` is the centre (green) channel, and the ribs add their
  // own px on top when present. Chromatic aberration offsets the red/blue channels either side.
  const dispScale = refraction + (hasRibs ? ribRefraction : 0);
  const scaleR = dispScale + chromaticAberration;
  const scaleG = dispScale;
  const scaleB = Math.max(dispScale - chromaticAberration, 0);

  // Lighting attributes map straight through; the x100 params are percentages of 1.0.
  const specularConstant = lightIntensity / 100;
  const reflectionSlope = reflection / 100;
  const ribReflectionSlope = hasRibs ? ribReflection / 100 : 0;

  // Filter region: not a look dial - it is sized from the largest displacement plus the frost
  // blur radius so neither clips at the glass edge.
  const bleed = Math.max(scaleR, scaleG, scaleB) + frost * 3;
  const regionX = Math.ceil((bleed / Math.max(width, 1)) * 100) + 10;
  const regionY = Math.ceil((bleed / Math.max(height, 1)) * 100) + 10;

  const sceneWidth = width + scenePadding * 2;
  const sceneHeight = height + scenePadding * 2;

  // Chromium renders the SVG reference filter's output away when a CSS blur() shares the
  // backdrop-filter list with it (ribs and refraction vanish), so `frost` is applied as an
  // feGaussianBlur inside the chain below and this list holds the reference filter alone.
  const backdropFilterValue = `url(#${filterId})`;

  // The rib and noise maps are combined as a weighted mean, weighted by each one's share of the
  // total displacement. That way a single feDisplacementMap scale of refraction + ribRefraction
  // delivers exactly `refraction` px from the noise and exactly `ribRefraction` px from the ribs,
  // instead of each being silently halved by a plain average.
  const ribWeight = dispScale > 0 ? ribRefraction / dispScale : 0;
  const noiseWeight = dispScale > 0 ? refraction / dispScale : 1;
  // With no ribs the displacement map is the noise alone.
  const bumpRef = hasRibs ? "bump" : "noise";

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
          backgroundSize: `${backgroundScale}% ${backgroundScale}%`,
          backgroundPosition: "0% 50%",
          animationPlayState: animateBackground ? "running" : "paused",
        }}
      />

      {/* Hidden filter definition. `filterId` is unique per mounted GlassPanel (React useId). */}
      <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter
            id={filterId}
            x={`${-regionX}%`}
            y={`${-regionY}%`}
            width={`${100 + regionX * 2}%`}
            height={`${100 + regionY * 2}%`}
            colorInterpolationFilters="sRGB"
          >
            {/* Base refraction surface. */}
            <feTurbulence
              type={noiseType}
              baseFrequency={noiseFrequency}
              numOctaves={noiseOctaves}
              seed={noiseSeed}
              result="noiseRaw"
            />
            {/* feTurbulence emits a varying alpha; force it opaque so feDisplacementMap reads the
                colour channels directly instead of through premultiplied alpha. */}
            <feColorMatrix
              in="noiseRaw"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1"
              result="noise"
            />

            {ribDataUri ? <feImage href={ribDataUri} x="0" y="0" width={width} height={height} result="ribs" /> : null}

            {/* Combined bump map used for both displacement and lighting: the mean of the two maps.
                A weighted mean keeps it centred on the 128 neutral so displacement bends
                symmetrically - a screen blend biases every channel upwards and turns refraction
                into a one-way shift. */}
            {ribDataUri ? (
              <feComposite
                in="ribs"
                in2="noise"
                operator="arithmetic"
                k1={0}
                k2={ribWeight}
                k3={noiseWeight}
                k4={0}
                result="bump"
              />
            ) : null}

            {/* feSpecularLighting reads its height field from the ALPHA channel, so project the
                displacement channels into alpha first. Lighting an opaque map leaves the surface
                flat and the "light" becomes a uniform wash over the whole glass. */}
            <feColorMatrix
              in={bumpRef}
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0.5 0 0 0"
              result="bumpHeight"
            />

            {/* Light source. Both specular passes share surfaceScale/lightSharpness/lightColor;
                only their alpha slope (reflection vs ribReflection) differs. */}
            <feSpecularLighting
              in="bumpHeight"
              surfaceScale={surfaceScale}
              specularConstant={specularConstant}
              specularExponent={lightSharpness}
              lightingColor={lightColor}
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
                <feColorMatrix
                  in="ribs"
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0.5 0 0 0"
                  result="ribHeight"
                />
                <feSpecularLighting
                  in="ribHeight"
                  surfaceScale={surfaceScale}
                  specularConstant={specularConstant}
                  specularExponent={lightSharpness}
                  lightingColor={lightColor}
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

            {/* Frost. CSS blur() cannot be used alongside this filter (see backdropFilterValue),
                so it runs here; `frost` is the Gaussian standard deviation, as blur() would be. */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={frost} result="frosted" />

            {/* Chromatic aberration: each color channel is displaced by a slightly different scale. */}
            <feDisplacementMap in="frosted" in2={bumpRef} scale={scaleR} xChannelSelector="R" yChannelSelector="G" result="dispR" />
            <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1" result="chR" />
            <feDisplacementMap in="frosted" in2={bumpRef} scale={scaleG} xChannelSelector="R" yChannelSelector="G" result="dispG" />
            <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1" result="chG" />
            <feDisplacementMap in="frosted" in2={bumpRef} scale={scaleB} xChannelSelector="R" yChannelSelector="G" result="dispB" />
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
        className="absolute"
        style={{
          left: scenePadding,
          top: scenePadding,
          width,
          height,
          borderRadius,
          borderStyle: "solid",
          borderWidth: edgeWidth,
          borderColor: hexToRgba(edgeColor, edgeOpacity / 100),
          backgroundColor: hexToRgba(tintColor, tintOpacity / 100),
          backdropFilter: backdropFilterValue,
          WebkitBackdropFilter: backdropFilterValue,
        }}
      />
    </div>
  );
}
