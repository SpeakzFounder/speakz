// src/app/categories/page.tsx
"use client";

import { useEffect, useState } from "react";

type Entry = { term: string; slug: string; categories?: string[] };

type Row = { category: string; count: number };

function buildIndex(items: Entry[]): Row[] {
  const map = new Map<string, number>();
  for (const e of items) {
    const cats = Array.isArray(e.categories) ? e.categories : [];
    for (const c of cats) {
      if (!c) continue;
      map.set(c, (map.get(c) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => (b.count - a.count) || a.category.localeCompare(b.category));
}

export default function CategoriesPage() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<string>("init");
  const [detail, setDetail] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setStatus("fetching");
        const url1 = "/speakz_entries.json";
        const r1 = await fetch(url1, { cache: "no-store" });
        if (!r1.ok) throw new Error(`HTTP ${r1.status} sur ${url1}`);
        const data1 = await r1.json();
        if (!Array.isArray(data1)) throw new Error("Format JSON inattendu (pas un tableau)");
        const entries = data1 as Entry[];
        setTotal(entries.length);
        setRows(buildIndex(entries));
        setStatus("ok");
        setDetail(`chargé via ${url1}`);
      } catch (e1: any) {
        try {
          const url2 = `${location.origin}/speakz_entries.json`;
          const r2 = await fetch(url2, { cache: "no-store" });
          if (!r2.ok) throw new Error(`HTTP ${r2.status} sur ${url2}`);
          const data2 = await r2.json();
          if (!Array.isArray(data2)) throw new Error("Format JSON inattendu (fallback)");
          const entries = data2 as Entry[];
          setTotal(entries.length);
          setRows(buildIndex(entries));
          setStatus("ok");
          setDetail(`chargé via ${url2}`);
        } catch (e2: any) {
          setStatus("error");
          setDetail(String(e2?.message || e2));
        }
      }
    })();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold">Catégories</h1>

      {/* état/diagnostic toujours visible */}
      <p className="mt-2 text-sm text-neutral-500">
        état: <b>{status}</b> {detail ? `— ${detail}` : ""}
      </p>
      <p className="mt-1 text-xs">
        Test rapide du JSON:{" "}
        <a className="underline" href="/speakz_entries.json" target="_blank">
          /speakz_entries.json
        </a>
      </p>

      {status === "fetching" && <p className="mt-4 text-neutral-600">Chargement…</p>}

      {status === "error" && (
        <p className="mt-4 text-red-600">
          Oups 😬 Impossible de charger le dictionnaire. <br />
          <span className="text-xs">Détail : {detail}</span>
        </p>
      )}

      {rows && (
        <>
          <p className="mt-4 text-neutral-700">
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
