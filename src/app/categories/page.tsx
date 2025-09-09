// src/app/categories/page.tsx
import path from "path";
import { promises as fs } from "fs";

// Empêche l’Edge runtime (qui n’a pas fs) et force l’exécution côté Node
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Entry = {
  term: string;
  slug: string;
  definition?: string;
  categories?: string[];
};

async function getEntries(): Promise<Entry[]> {
  // Lecture directe du fichier dans /public
  const filePath = path.join(process.cwd(), "public", "speakz_entries.json");
  const raw = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? (data as Entry[]) : [];
}

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
