"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SketchSelectorProps = {
  sketchNames: string[];
};

function toDisplayName(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .trim();
}

export default function SketchSelector({ sketchNames }: SketchSelectorProps) {
  const [selectedSketch, setSelectedSketch] = useState(sketchNames[0] ?? "");

  const SelectedSketch = useMemo(() => {
    if (!selectedSketch) return null;

    return dynamic(() => import(`@/sketches/${selectedSketch}`), {
      ssr: false,
      loading: () => <div className="grid h-screen w-screen place-items-center">Loading sketch...</div>,
    });
  }, [selectedSketch]);

  if (sketchNames.length === 0) {
    return <div className="grid h-screen w-screen place-items-center">No sketches found in `src/sketches`.</div>;
  }

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-4 left-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent"
            >
              {toDisplayName(selectedSketch)}
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {sketchNames.map((sketchName) => (
              <DropdownMenuItem key={sketchName} onSelect={() => setSelectedSketch(sketchName)}>
                {toDisplayName(sketchName)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {SelectedSketch ? <SelectedSketch key={selectedSketch} /> : null}
    </div>
  );
}
