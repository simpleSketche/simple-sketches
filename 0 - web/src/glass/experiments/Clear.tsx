import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "name": "Clear",
  "width": 300,
  "height": 200,
  "borderRadius": 24,
  "frost": 2,
  "refraction": 15,
  "reflection": 20,
  "lightAzimuth": 135,
  "lightElevation": 55,
  "lightIntensity": 90,
  "ribCount": 0,
  "ribOrientation": "vertical",
  "ribRefraction": 0,
  "ribReflection": 0,
  "tintColor": "#ffffff",
  "tintOpacity": 4,
  "chromaticAberration": 1,
  "backgroundImage": "/glass/aurora.svg"
};

export default function Clear() {
  return <GlassPanel {...params} />;
}
