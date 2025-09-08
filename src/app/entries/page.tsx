// app/entries/page.tsx
import type { Metadata } from "next";

const RAW_JSON_URL =
  process.env.NEXT_PUBLIC_SPEAKZ_JSON_URL || "/speakz_entries.json";

type Entry = {
  term: string;
  slug: string;
  definition?: string;
  categories?: string[];
};

export const metadata: Metadata = {
  title: "Dictionnaire d’argot & verlan • Speakz",
  description:
    "Découvrez des centaines de mots d’argot et de verlan avec définitions claires. Navigation rapide et catégories.",
};

// On peut revalider toutes les 2 heures (évite le no-store qui casse parfois en prod)
export const revalidate = 7200;

async function safeLoad(): Promise<{ ok: boolean; entries: Entry[]; error?: string }> {
  try {
    const res = await fetch(RAW_JSON_URL, { next: { revalidate } });
    if (!res.ok) {
      return { ok: false, entries: [], error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as Entry[];
    if (!Array.isArray(data)) {
      return { ok: false, entries: [], error: "Format JSON inattendu (pas un tableau)" };
    }
    // petit nettoyage défensif
    const entries = data
      .filter(e => e && typeof e.slug === "string" && typeof e.term === "string")
      .map(e => ({
        term: e.term,
        slug: e.slug,
        definition: e.definition || "",
        categories: Array.isArray(e.categories) ? e.categories : [],
      }));
    return { ok: true, entries };
  } catch (err: any) {
    return { ok: false, entries: [], error: String(err?.message || err) };
  }
}

export default async function Page() {
  const { ok, entries, error } = await safeLoad();

  if (!ok) {
    // On n’explose pas le serveur : on affiche une explication simple
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Dictionnaire d’argot & verlan</h1>
        <p className="mt-4 text-red-600">
          Oups 😬 Impossible de charger le dictionnaire.
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          Vérifie que le fichier <code>/public/speakz_entries.json</code> existe bien
          et qu’il est accessible à l’URL <code>/speakz_entries.json</code>.
          <br />
          Détail technique : {error}
        </p>
      </main>
    );
  }

  const total = entries.length;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold">
        Dictionnaire d’argot & verlan
      </h1>
      <p className="mt-2 text-neutral-600">
        {total} mots recensés dans le dictionnaire Speakz.
      </p>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.map((e) => (
          <li key={e.slug} className="border rounded-lg p-3 hover:bg-neutral-50">
            <a href={`/mot/${encodeURIComponent(e.slug)}`} className="font-medium">
              {e.term}
            </a>
            {e.definition && (
              <p className="text-sm text-neutral-700 mt-1 line-clamp-2">
                {e.definition}
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
