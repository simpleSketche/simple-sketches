import { readdir } from "node:fs/promises";
import path from "node:path";

import SketchSelector from "@/components/SketchSelector";

async function getSketchNames() {
  const sketchesDirectory = path.join(process.cwd(), "src", "sketches");
  const entries = await readdir(sketchesDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name))
    .map((entry) => entry.name.replace(/\.(tsx|ts|jsx|js)$/, ""))
    .sort((a, b) => a.localeCompare(b));
}

export default async function Home() {
  const sketchNames = await getSketchNames();

  return <SketchSelector sketchNames={sketchNames} />;
}
