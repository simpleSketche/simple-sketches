"use client";

import { useEffect, useState } from "react";

export type BackdropFilterSupport = "checking" | "supported" | "unsupported";

/**
 * Detects whether this browser can actually render `backdrop-filter: url(#svgFilter) ...`.
 * `CSS.supports` only confirms the syntax parses — some non-Chromium engines accept the
 * declaration but never rasterize an SVG-referenced filter through backdrop-filter, so we
 * additionally require a Chromium-family UA as a heuristic fallback.
 */
export function useBackdropFilterSupport(): BackdropFilterSupport {
  const [status, setStatus] = useState<BackdropFilterSupport>("checking");

  useEffect(() => {
    if (typeof window === "undefined" || typeof CSS === "undefined" || !CSS.supports) {
      setStatus("unsupported");
      return;
    }

    const declaresSupport =
      CSS.supports("backdrop-filter", "url(#a)") || CSS.supports("-webkit-backdrop-filter", "url(#a)");

    const ua = window.navigator.userAgent;
    const isChromium = /Chrome\/|Chromium\/|Edg\//.test(ua);

    setStatus(declaresSupport && isChromium ? "supported" : "unsupported");
  }, []);

  return status;
}
