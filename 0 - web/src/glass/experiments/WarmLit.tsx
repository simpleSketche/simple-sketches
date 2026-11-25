import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "width": 320,
  "height": 220,
  "borderRadius": 40,
  "scenePadding": 64,
  "frost": 4,
  "refraction": 26,
  "chromaticAberration": 7,
  "noiseFrequency": 0.02,
  "noiseOctaves": 3,
  "noiseSeed": 42,
  "surfaceScale": 14,
  "ribCount": 0,
  "ribDepth": 70,
  "ribRefraction": 30,
  "ribReflection": 50,
  "lightAzimuth": 40,
  "lightElevation": 22,
  "lightIntensity": 170,
  "lightSharpness": 10,
  "reflection": 90,
  "tintOpacity": 8,
  "edgeOpacity": 45,
  "edgeWidth": 2,
  "backgroundScale": 160,
  "tintColor": "#ffe6c4",
  "lightColor": "#ffcb8a",
  "edgeColor": "#ffdcb0",
  "name": "WarmLit",
  "ribOrientation": "vertical",
  "noiseType": "fractalNoise",
  "backgroundImage": "/glass/sunset.svg"
};

export default function WarmLit() {
  return <GlassPanel {...params} />;
}
