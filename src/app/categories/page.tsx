// src/app/categories/page.tsx
"use client";

import { useEffect, useState } from "react";

type Entry = {
  term: string;
  slug: string;
  definition?: string;
  categories?: string[];
};

type Row = { category: string; count: number };

function buildCategoryIndex(items: Entry[]): Row[] {
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
  const [rows, setRows] = useState<Row[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/speakz_entries.json")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((data: Entry[]) => {
        if (!Array.isArray(data)) throw new Error("Format JSON inattendu");
        setTotal(data.length);
        setRows(buildCategoryIndex(data));
      })
      .catch((e) => setErr(String(e)));
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold">Catégories</h1>

      {!rows && !err && <p className="mt-2 text-neutral-600">Chargement…</p>}
      {err && (
        <p className="mt-2 text-red-600">
          Oups 😬 Impossible de charger les catégories ({err})
        </p>
      )}

      {rows && (
        <>
          <p className="mt-2 text-neutral-600">
            {rows.length} catégories, {total} mots au total.
          </p>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rows.map(({ category, count }) => (
              <li key={category} className="border rounded-lg p-3 hover:bg-neutral-50">
                <a href={`/categorie/${encodeURIComponent(category)}`} className="font-medium">
                  #{category}
                </a>
                <span className="ml-2 text-sm text-neutral-600">({count})</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
