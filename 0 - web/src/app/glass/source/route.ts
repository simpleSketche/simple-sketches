import { readFile } from "node:fs/promises";
import path from "node:path";

// Read once, when the site is built: a deployed site does not have its own source to hand.
export const dynamic = "force-static";

/**
 * The text of the glass textures' source. The copy buttons on the sample sheets cut the code
 * they hand out from it (see glassSource.ts), so that it has the formulas as they are written.
 */
export async function GET() {
  const source = await readFile(path.join(process.cwd(), "src", "glass", "texturedGlass.ts"), "utf8");
  return new Response(source, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
