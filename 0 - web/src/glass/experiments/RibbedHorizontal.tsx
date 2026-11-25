import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "width": 340,
  "height": 200,
  "borderRadius": 12,
  "scenePadding": 64,
  "frost": 1,
  "refraction": 4,
  "chromaticAberration": 3,
  "noiseFrequency": 0.003,
  "noiseOctaves": 1,
  "noiseSeed": 11,
  "surfaceScale": 6,
  "ribCount": 8,
  "ribDepth": 65,
  "ribRefraction": 55,
  "ribReflection": 65,
  "lightAzimuth": 90,
  "lightElevation": 30,
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
  "name": "RibbedHorizontal",
  "ribOrientation": "horizontal",
  "noiseType": "fractalNoise",
  "backgroundImage": "/glass/waves.svg"
};

export default function RibbedHorizontal() {
  return <GlassPanel {...params} />;
}
