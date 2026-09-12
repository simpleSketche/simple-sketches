import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "name": "Tinted",
  "width": 300,
  "height": 220,
  "borderRadius": 24,
  "frost": 12,
  "refraction": 30,
  "reflection": 30,
  "lightAzimuth": 150,
  "lightElevation": 45,
  "lightIntensity": 100,
  "ribCount": 0,
  "ribOrientation": "vertical",
  "ribRefraction": 0,
  "ribReflection": 0,
  "tintColor": "#7ee0c9",
  "tintOpacity": 35,
  "chromaticAberration": 2,
  "backgroundImage": "/glass/noise.svg"
};

export default function Tinted() {
  return <GlassPanel {...params} />;
}
