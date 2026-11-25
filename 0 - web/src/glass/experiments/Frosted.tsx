import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "width": 300,
  "height": 220,
  "borderRadius": 32,
  "scenePadding": 64,
  "frost": 10,
  "refraction": 30,
  "chromaticAberration": 2,
  "noiseFrequency": 0.05,
  "noiseOctaves": 3,
  "noiseSeed": 21,
  "surfaceScale": 8,
  "ribCount": 0,
  "ribDepth": 70,
  "ribRefraction": 30,
  "ribReflection": 50,
  "lightAzimuth": 135,
  "lightElevation": 40,
  "lightIntensity": 90,
  "lightSharpness": 8,
  "reflection": 45,
  "tintOpacity": 14,
  "edgeOpacity": 20,
  "edgeWidth": 1,
  "backgroundScale": 160,
  "tintColor": "#ffffff",
  "lightColor": "#ffffff",
  "edgeColor": "#ffffff",
  "name": "Frosted",
  "ribOrientation": "vertical",
  "noiseType": "fractalNoise",
  "backgroundImage": "/glass/noise.svg"
};

export default function Frosted() {
  return <GlassPanel {...params} />;
}
