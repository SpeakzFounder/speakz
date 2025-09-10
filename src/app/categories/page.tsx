// src/app/categories/page.tsx
"use client";
import React, { useEffect, useState } from "react";

type Entry = { term: string; slug: string; categories?: string[] };
type Row = { category: string; count: number };

function buildIndex(items: Entry[]): Row[] {
  const counts: Record<string, number> = {};
  for (const e of items) {
    const cats = Array.isArray(e.categories) ? e.categories : [];
    for (const c of cats) {
      if (!c) continue;
      counts[c] = (counts[c] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => (b.count - a.count) || a.category.localeCompare(b.category));
}

export default function CategoriesPage() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/speakz_entries.json", { cache: "no-store" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = (await res.json()) as unknown;
        if (!Array.isArray(data)) throw new Error("Format JSON inattendu");
        const entries = data as Entry[];
        setTotal(entries.length);
        setRows(buildIndex(entries));
      } catch (e: any) {
        setErr(e?.message ?? String(e));
      }
    }
    load();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold">Catégories</h1>

      {!rows && !err && <p className="mt-2 text-neutral-600">Chargement…</p>}
      {err && <p className="mt-2 text-red-600">Erreur : {err}</p>}

      {rows && (
        <>
          <p className="mt-2 text-neutral-600">
            {rows.length} catégories, {total} mots au total.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rows.map(({ category, count }) => (
              <li key={category} className="border rounded-lg p-3 hover:bg-neutral-50">
                <a
                  href={`/categorie/${encodeURIComponent(category)}`}
                  className="font-medium"
                >
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
