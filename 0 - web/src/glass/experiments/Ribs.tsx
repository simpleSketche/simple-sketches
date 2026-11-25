import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "width": 320,
  "height": 220,
  "borderRadius": 40,
  "scenePadding": 50,
  "frost": 3,
  "refraction": 23,
  "chromaticAberration": 19,
  "noiseFrequency": 0.012,
  "noiseOctaves": 2,
  "noiseSeed": 43,
  "surfaceScale": 4.5,
  "ribCount": 26,
  "ribDepth": 50,
  "ribRefraction": 98,
  "ribReflection": 92,
  "lightAzimuth": 18,
  "lightElevation": 0,
  "lightIntensity": 105,
  "lightSharpness": 60,
  "reflection": 80,
  "tintOpacity": 11,
  "edgeOpacity": 23,
  "edgeWidth": 1,
  "backgroundScale": 160,
  "tintColor": "#ffe6c4",
  "lightColor": "#ffcb8a",
  "edgeColor": "#ffdcb0",
  "name": "Ribs",
  "ribOrientation": "vertical",
  "noiseType": "fractalNoise",
  "backgroundImage": "/glass/sunset.svg"
};

export default function Ribs() {
  return <GlassPanel {...params} />;
}
