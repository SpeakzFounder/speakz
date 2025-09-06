import { promises as fs } from 'node:fs';
import path from 'node:path';

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

async function readJsonRaw(): Promise<any> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'speakz_entries.json');
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    // Pas de fichier ou JSON invalide → on retourne un tableau vide
    return [];
  }
}

export async function getAllEntries(): Promise<Entry[]> {
  const data = await readJsonRaw();
  const arr: any[] = Array.isArray(data) ? data : Array.isArray(data?.entries) ? data.entries : [];
  return arr.map((item) => {
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
  return (
    list.find((e) => e.slug === slug) ||
    list.find((e) => slugify(e.term) === slug) ||
    null
  );
}
