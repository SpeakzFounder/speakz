// app/entries/page.tsx
import type { Metadata } from "next";

const RAW_JSON_URL = "/speakz_entries.json"; // ton fichier JSON dans /public

type Entry = {
  term: string;
  slug: string;
  definition?: string;
  categories?: string[];
};

async function getEntries(): Promise<Entry[]> {
  const res = await fetch(RAW_JSON_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Impossible de charger le dictionnaire");
  return (await res.json()) as Entry[];
}

export const metadata: Metadata = {
  title: "Dictionnaire d’argot & verlan • Speakz",
  description:
    "Découvrez plus de 800 mots d’argot, verlan et expressions françaises. Définitions claires et navigation rapide.",
};

export default async function Page() {
  const entries = await getEntries();
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
            <a href={`/mot/${e.slug}`} className="font-medium">
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
