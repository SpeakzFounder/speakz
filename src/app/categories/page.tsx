// src/app/categories/page.tsx

type Entry = {
  term: string;
  slug: string;
  definition?: string;
  categories?: string[];
};

// ✅ Import statique du JSON (zéro fetch, compatible export statique)
//    Chemin relatif : on part de src/app/categories/page.tsx → remonte à la racine (../../..)
//    puis va dans public/speakz_entries.json
import entriesData from "../../../public/speakz_entries.json";
const entries = (entriesData as Entry[]) ?? [];

function buildCategoryIndex(items: Entry[]) {
  const map = new Map<string, number>();
  for (const e of items) {
    const cats = Array.isArray(e.categories) ? e.categories : [];
    for (const c of cats) {
      if (!c) continue;
      map.set(c, (map.get(c) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => (b.count - a.count) || a.category.localeCompare(b.category));
}

export default function CategoriesPage() {
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
