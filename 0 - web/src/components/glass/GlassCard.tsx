import Link from "next/link";

import GlassPanel from "@/components/glass/GlassPanel";
import type { GlassParams } from "@/glass/types";

const CARD_WIDTH = 280;
const CARD_HEIGHT = 200;

type GlassCardProps = {
  name: string;
  params: GlassParams;
};

export default function GlassCard({ name, params }: GlassCardProps) {
  const sceneWidth = params.width + params.scenePadding * 2;
  const sceneHeight = params.height + params.scenePadding * 2;
  // Uniform scale-to-fit: never stretches, so the glass keeps its true width/height ratio.
  const scale = Math.min(CARD_WIDTH / sceneWidth, CARD_HEIGHT / sceneHeight, 1);

  return (
    <Link
      href={`/glass/new?from=${encodeURIComponent(name)}`}
      className="flex flex-col overflow-hidden rounded-lg border bg-card transition hover:shadow-md"
      style={{ width: CARD_WIDTH }}
    >
      <div className="flex items-center justify-center overflow-hidden bg-muted/30" style={{ height: CARD_HEIGHT }}>
        <div style={{ transform: `scale(${scale})` }}>
          <GlassPanel {...params} />
        </div>
      </div>
      <div className="border-t px-4 py-3">
        <p className="truncate text-sm font-medium">{name}</p>
      </div>
    </Link>
  );
}
