import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "name": "WarmLit",
  "width": 320,
  "height": 220,
  "borderRadius": 32,
  "frost": 10,
  "refraction": 40,
  "reflection": 65,
  "lightAzimuth": 45,
  "lightElevation": 70,
  "lightIntensity": 170,
  "ribCount": 0,
  "ribOrientation": "vertical",
  "ribRefraction": 0,
  "ribReflection": 0,
  "tintColor": "#ffe3b3",
  "tintOpacity": 10,
  "chromaticAberration": 3,
  "backgroundImage": "/glass/sunset.svg"
};

export default function WarmLit() {
  return <GlassPanel {...params} />;
}
