import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "width": 320,
  "height": 210,
  "borderRadius": 28,
  "scenePadding": 64,
  "frost": 1,
  "refraction": 22,
  "chromaticAberration": 2,
  "noiseFrequency": 0.006,
  "noiseOctaves": 2,
  "noiseSeed": 3,
  "surfaceScale": 4,
  "ribCount": 0,
  "ribDepth": 70,
  "ribRefraction": 30,
  "ribReflection": 50,
  "lightAzimuth": 135,
  "lightElevation": 55,
  "lightIntensity": 70,
  "lightSharpness": 30,
  "reflection": 18,
  "tintOpacity": 5,
  "edgeOpacity": 40,
  "edgeWidth": 1,
  "backgroundScale": 160,
  "tintColor": "#ffffff",
  "lightColor": "#ffffff",
  "edgeColor": "#ffffff",
  "name": "Clear",
  "ribOrientation": "vertical",
  "noiseType": "fractalNoise",
  "backgroundImage": "/glass/aurora.svg"
};

export default function Clear() {
  return <GlassPanel {...params} />;
}
