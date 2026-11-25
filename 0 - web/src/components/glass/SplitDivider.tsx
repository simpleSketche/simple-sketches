"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";

type SplitDividerProps = {
  /** Where the line sits across its parent: 0 at the left edge, 1 at the right. */
  value: number;
  onChange: (value: number) => void;
  /** Accessible name of what the line adjusts. */
  label: string;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * A vertical line across its positioned parent that can be dragged sideways, or moved with the
 * arrow keys. It only reports where it is; the parent decides what that reveals.
 */
export default function SplitDivider({ value, onChange, label }: SplitDividerProps) {
  // Distance from the pointer to the line when the drag began, so the line does not jump to it.
  const grab = useRef(0);

  const frameOf = (handle: HTMLElement) => handle.parentElement?.getBoundingClientRect();

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const frame = frameOf(event.currentTarget);
    if (event.button !== 0 || !frame) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    grab.current = event.clientX - (frame.left + value * frame.width);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const frame = frameOf(event.currentTarget);
    if (!event.currentTarget.hasPointerCapture(event.pointerId) || !frame) return;
    onChange(clamp((event.clientX - grab.current - frame.left) / frame.width));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = { ArrowLeft: value - 0.02, ArrowRight: value + 0.02, Home: 0, End: 1 }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    onChange(clamp(target));
  };

  return (
    // `touch-pan-y` leaves vertical swipes to the page, so a sheet of these still scrolls on a phone.
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      className="group absolute inset-y-0 w-8 -translate-x-1/2 cursor-ew-resize touch-pan-y select-none outline-none"
      style={{ left: `${value * 100}%` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
    >
      {/* The cut edge of the sheet: a light line with a dark one beside it. */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-px bg-white/60 shadow-[1px_0_0_rgb(0_0_0/0.16)]" />
      <div className="absolute left-1/2 top-1/2 h-8 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow ring-1 ring-black/15 group-focus-visible:ring-2 group-focus-visible:ring-sky-500" />
    </div>
  );
}
