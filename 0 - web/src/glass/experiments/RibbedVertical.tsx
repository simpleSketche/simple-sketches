import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "width": 300,
  "height": 240,
  "borderRadius": 16,
  "scenePadding": 64,
  "frost": 1,
  "refraction": 4,
  "chromaticAberration": 4,
  "noiseFrequency": 0.003,
  "noiseOctaves": 1,
  "noiseSeed": 11,
  "surfaceScale": 6,
  "ribCount": 12,
  "ribDepth": 60,
  "ribRefraction": 60,
  "ribReflection": 70,
  "lightAzimuth": 150,
  "lightElevation": 35,
  "lightIntensity": 110,
  "lightSharpness": 20,
  "reflection": 12,
  "tintOpacity": 5,
  "edgeOpacity": 30,
  "edgeWidth": 1,
  "backgroundScale": 160,
  "tintColor": "#ffffff",
  "lightColor": "#ffffff",
  "edgeColor": "#ffffff",
  "name": "RibbedVertical",
  "ribOrientation": "vertical",
  "noiseType": "fractalNoise",
  "backgroundImage": "/glass/grid.svg"
};

export default function RibbedVertical() {
  return <GlassPanel {...params} />;
}
