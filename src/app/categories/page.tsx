// src/app/categories/page.tsx
export const revalidate = 3600; // revalidation côté serveur (1h)

type Entry = {
  term: string;
  slug: string;
  definition?: string;
  categories?: string[];
};

const JSON_URL = "/speakz_entries.json"; // ton fichier JSON dans /public

async function getEntries(): Promise<Entry[]> {
  const res = await fetch(JSON_URL, { next: { revalidate } });
  if (!res.ok) return [];
  const data = (await res.json()) as Entry[];
  return Array.isArray(data) ? data : [];
}

function buildCategoryIndex(entries: Entry[]) {
  const map = new Map<string, { count: number }>();
  for (const e of entries) {
    const cats = Array.isArray(e.categories) ? e.categories : [];
    for (const c of cats) {
      if (!c) continue;
      map.set(c, { count: (map.get(c)?.count ?? 0) + 1 });
    }
  }
  return Array.from(map.entries())
    .map(([category, { count }]) => ({ category, count }))
    .sort((a, b) => (b.count - a.count) || a.category.localeCompare(b.category));
}

export default async function CategoriesPage() {
  const entries = await getEntries();
  const index = buildCategoryIndex(entries);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold">Catégories</h1>
      <p className="mt-2 text-neutral-600">
        {index.length} catégories, {entries.length} mots au total.
      </p>

      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {index.map(({ category, count }) => (
          <li key={category} className="border rounded-lg p-3 hover:bg-neutral-50">
            <a href={`/categorie/${encodeURIComponent(category)}`} className="font-medium">
              #{category}
            </a>
            <span className="ml-2 text-sm text-neutral-600">({count})</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

