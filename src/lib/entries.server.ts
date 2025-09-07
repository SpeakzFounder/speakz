// src/lib/entries.server.ts

// 👉 tu peux surcharger l’URL via une var d’env si besoin
const RAW_URL =
  process.env.SPEAKZ_RAW_URL ||
  'https://raw.githubusercontent.com/SpeakzFounder/Speakz/main/public/speakz_entries.json';

export type Entry = {
  term: string;
  definition?: string;
  category?: string;
  slug?: string;
};

export function slugify(input: string) {
  return (input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function fetchJson(): Promise<any[]> {
  const res = await fetch(RAW_URL, {
    // ⏱ rafraîchi côté serveur sans rebuild (tu peux mettre 300s si tu veux)
    next: { revalidate: 60 }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : Array.isArray((data as any).entries) ? (data as any).entries : [];
}

export async function getAllEntries(): Promise<Entry[]> {
  const arr = await fetchJson();
  return arr.map((item: any) => {
    const term = String(item?.term ?? item?.mot ?? '').trim();
    const slug = item?.slug ? String(item.slug) : slugify(term);
    return {
      term,
      definition: item?.definition ?? item?.def ?? '',
      category: item?.category ?? item?.categorie ?? '',
      slug
    } as Entry;
  });
}

export async function getEntryBySlug(slug: string): Promise<Entry | null> {
  const list = await getAllEntries();
  return list.find((e) => e.slug === slug || slugify(e.term) === slug) ?? null;
}
