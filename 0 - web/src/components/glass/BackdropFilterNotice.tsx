"use client";

import { useState } from "react";

import { useBackdropFilterSupport } from "@/glass/useBackdropFilterSupport";

export default function BackdropFilterNotice() {
  const support = useBackdropFilterSupport();
  const [dismissed, setDismissed] = useState(false);

  if (support !== "unsupported" || dismissed) return null;

  return (
    <div className="relative z-30 mb-6 flex items-start justify-between gap-4 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm text-amber-900 dark:text-amber-200">
      <span>
        Refraction, ribs, and lighting are rendered with an SVG backdrop-filter that only Chromium
        browsers (Chrome, Edge, Opera) paint correctly. This browser will show a flat, unrefracted
        glass panel.
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="shrink-0 rounded px-1.5 leading-none hover:bg-amber-500/20"
      >
        ×
      </button>
    </div>
  );
}
