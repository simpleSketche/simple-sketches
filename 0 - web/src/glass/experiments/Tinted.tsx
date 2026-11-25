import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "width": 300,
  "height": 260,
  "borderRadius": 150,
  "scenePadding": 64,
  "frost": 6,
  "refraction": 34,
  "chromaticAberration": 10,
  "noiseFrequency": 0.012,
  "noiseOctaves": 2,
  "noiseSeed": 64,
  "surfaceScale": 7,
  "ribCount": 0,
  "ribDepth": 70,
  "ribRefraction": 30,
  "ribReflection": 50,
  "lightAzimuth": 220,
  "lightElevation": 60,
  "lightIntensity": 80,
  "lightSharpness": 30,
  "reflection": 30,
  "tintOpacity": 24,
  "edgeOpacity": 50,
  "edgeWidth": 2,
  "backgroundScale": 220,
  "tintColor": "#3fb9d8",
  "lightColor": "#d8f4ff",
  "edgeColor": "#9fe6ff",
  "name": "Tinted",
  "ribOrientation": "vertical",
  "noiseType": "turbulence",
  "backgroundImage": "/glass/dots.svg"
};

export default function Tinted() {
  return <GlassPanel {...params} />;
}
