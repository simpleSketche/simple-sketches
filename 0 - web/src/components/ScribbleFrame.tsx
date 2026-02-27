"use client";

import { cn } from "@/lib/utils";

type ScribbleFrameProps = {
  className?: string;
  stroke?: string;
  secondaryStroke?: string;
  size?: number;
  strokeWidth?: number;
};

const scribblePathB =
  "M 438 258 C 526 240, 624 248, 710 260 C 758 266, 810 264, 858 252 C 876 320, 880 386, 874 468 C 868 548, 870 614, 878 682 C 808 700, 738 702, 664 694 C 582 684, 510 688, 436 698 C 418 630, 414 566, 422 490 C 430 410, 428 336, 438 258 Z";

export default function ScribbleFrame({
  className,
  stroke = "#111111",
  size = 1,
  strokeWidth = 3.4,
}: ScribbleFrameProps) {
  const clampedSize = Math.max(0.2, size);
  const widthScale = 1;
  const scaleX = clampedSize * widthScale;
  const scaleY = clampedSize;
  const centeredScale = `translate(${640 - 640 * scaleX} ${480 - 480 * scaleY}) scale(${scaleX} ${scaleY})`;
  const variableWidthSegments = [
    { width: strokeWidth * 2.18, dash: "430 1220", offset: 0, opacity: 0.76 },
    { width: strokeWidth * 0.74, dash: "360 1290", offset: -250, opacity: 0.84 },
    { width: strokeWidth * 1.34, dash: "300 1350", offset: -720, opacity: 0.68 },
    { width: strokeWidth * 0.58, dash: "240 1410", offset: -1080, opacity: 0.82 },
  ];

  return (
    <>
      <svg
        className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
        viewBox="0 0 1280 960"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <g transform={centeredScale}>
          <path
            d={scribblePathB}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
            style={{
              strokeDasharray: 3500,
              strokeDashoffset: 3500,
              animation:
                "scribble-frame-draw 2.4s ease-out forwards, scribble-frame-wiggle 7s ease-in-out 2.4s infinite",
            }}
          />
          {variableWidthSegments.map((segment, index) => (
            <path
              key={`var-width-${index}`}
              d={scribblePathB}
              fill="none"
              stroke={stroke}
              strokeWidth={segment.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={segment.opacity}
              style={{
                strokeDasharray: segment.dash,
                strokeDashoffset: segment.offset,
                animation: "scribble-frame-draw 1.4s ease-out forwards, scribble-frame-wiggle 7s ease-in-out 2.4s infinite",
              }}
            />
          ))}
        </g>
      </svg>
      <style jsx>{`
        @keyframes scribble-frame-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes scribble-frame-wiggle {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(0.8px, -0.5px) rotate(-0.15deg);
          }
          50% {
            transform: translate(-0.6px, 0.4px) rotate(0.1deg);
          }
          75% {
            transform: translate(0.4px, 0.7px) rotate(-0.08deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
        }
      `}</style>
    </>
  );
}
