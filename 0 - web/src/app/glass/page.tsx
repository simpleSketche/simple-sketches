import { readdir } from "node:fs/promises";
import path from "node:path";

import Link from "next/link";

import BackdropFilterNotice from "@/components/glass/BackdropFilterNotice";
import GlassCard from "@/components/glass/GlassCard";
import type { GlassParams } from "@/glass/types";

// New experiments are written to disk by the dev-only server action outside of Next's
// static-generation knowledge. Force this page dynamic so `router.refresh()` after a
// successful dispatch always re-runs `loadExperiments` instead of serving a stale RSC payload.
export const dynamic = "force-dynamic";

type ExperimentEntry =
  | { status: "ok"; name: string; params: GlassParams }
  | { status: "error"; name: string; message: string };

async function loadExperiments(): Promise<ExperimentEntry[]> {
  const dir = path.join(process.cwd(), "src", "glass", "experiments");

  let fileNames: string[];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    fileNames = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
      .map((entry) => entry.name.replace(/\.tsx$/, ""))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }

  return Promise.all(
    fileNames.map(async (name): Promise<ExperimentEntry> => {
      try {
        // The `.tsx` suffix is load-bearing: it narrows the bundler's generated context
        // module to *.tsx, so a stray non-module file in this directory (notes.md, a .bak,
        // an editor swap file) cannot fail the whole module graph and 500 the route.
        const mod = (await import(`@/glass/experiments/${name}.tsx`)) as { params?: GlassParams };
        if (!mod.params || typeof mod.params !== "object") throw new Error("Module has no valid `params` export");
        return { status: "ok", name, params: mod.params };
      } catch (error) {
        return {
          status: "error",
          name,
          message: error instanceof Error ? error.message : "Failed to load experiment",
        };
      }
    })
  );
}

export default async function GlassPage() {
  const experiments = await loadExperiments();
  const canCreate = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen p-8 pt-16">
      <div className="mx-auto max-w-6xl">
        <BackdropFilterNotice />

        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Glass Experiments</h1>
          {!canCreate ? (
            <p className="text-sm text-muted-foreground">Creating experiments is available in dev only.</p>
          ) : null}
        </div>

        {experiments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No glass experiments yet.{canCreate ? " Click the + button to create one." : ""}
          </p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {experiments.map((experiment) =>
              experiment.status === "ok" ? (
                <GlassCard key={experiment.name} name={experiment.name} params={experiment.params} />
              ) : (
                <div
                  key={experiment.name}
                  className="flex h-[200px] w-[280px] flex-col items-center justify-center rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-center text-sm text-destructive"
                >
                  <p className="font-medium">{experiment.name}</p>
                  <p className="mt-1 text-xs">Failed to load: {experiment.message}</p>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {canCreate ? (
        <Link
          href="/glass/new"
          aria-label="New glass experiment"
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border bg-primary text-xl text-primary-foreground shadow-lg hover:opacity-90"
        >
          +
        </Link>
      ) : null}
    </div>
  );
}
