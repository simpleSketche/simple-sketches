import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "name": "RibbedVertical",
  "width": 280,
  "height": 240,
  "borderRadius": 16,
  "frost": 6,
  "refraction": 35,
  "reflection": 40,
  "lightAzimuth": 135,
  "lightElevation": 50,
  "lightIntensity": 120,
  "ribCount": 14,
  "ribOrientation": "vertical",
  "ribRefraction": 65,
  "ribReflection": 55,
  "tintColor": "#ffffff",
  "tintOpacity": 6,
  "chromaticAberration": 5,
  "backgroundImage": "/glass/grid.svg"
};

export default function RibbedVertical() {
  return <GlassPanel {...params} />;
}
