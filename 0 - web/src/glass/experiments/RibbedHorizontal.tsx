import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "name": "RibbedHorizontal",
  "width": 300,
  "height": 220,
  "borderRadius": 16,
  "frost": 6,
  "refraction": 35,
  "reflection": 40,
  "lightAzimuth": 225,
  "lightElevation": 50,
  "lightIntensity": 120,
  "ribCount": 12,
  "ribOrientation": "horizontal",
  "ribRefraction": 65,
  "ribReflection": 55,
  "tintColor": "#ffffff",
  "tintOpacity": 6,
  "chromaticAberration": 5,
  "backgroundImage": "/glass/dots.svg"
};

export default function RibbedHorizontal() {
  return <GlassPanel {...params} />;
}
