import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

export const params: GlassParams = {
  "name": "Frosted",
  "width": 320,
  "height": 220,
  "borderRadius": 28,
  "frost": 22,
  "refraction": 55,
  "reflection": 35,
  "lightAzimuth": 120,
  "lightElevation": 50,
  "lightIntensity": 110,
  "ribCount": 0,
  "ribOrientation": "vertical",
  "ribRefraction": 0,
  "ribReflection": 0,
  "tintColor": "#eaf2ff",
  "tintOpacity": 12,
  "chromaticAberration": 2,
  "backgroundImage": "/glass/waves.svg"
};

export default function Frosted() {
  return <GlassPanel {...params} />;
}
