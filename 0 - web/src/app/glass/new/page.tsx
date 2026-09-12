import GlassEditor from "@/components/glass/GlassEditor";
import { DEFAULT_GLASS_PARAMS, type GlassParams } from "@/glass/types";

// Mirrors /glass: keep this dynamic so a `from=<Name>` query always resolves against the
// current contents of src/glass/experiments rather than a build-time snapshot.
export const dynamic = "force-dynamic";

async function loadParamsFor(name: string | undefined): Promise<GlassParams> {
  // `from` is untrusted query input. Only the exact shape the server action can produce is
  // ever turned into a module specifier, so traversal segments can't reach another module.
  if (!name || !/^[A-Z][A-Za-z0-9]{1,40}$/.test(name)) return DEFAULT_GLASS_PARAMS;

  try {
    // `.tsx` suffix mirrors /glass: it keeps the bundler's context module scoped to *.tsx.
    const mod = (await import(`@/glass/experiments/${name}.tsx`)) as { params?: GlassParams };
    // A missing or failing experiment file falls back to defaults here instead of crashing -
    // equivalent to "redirect to /glass/new with defaults" since we're already on that route.
    return mod.params ?? DEFAULT_GLASS_PARAMS;
  } catch {
    return DEFAULT_GLASS_PARAMS;
  }
}

export default async function NewGlassPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const initialParams = await loadParamsFor(from);

  return <GlassEditor initialParams={initialParams} />;
}
