// src/app/entries/page.tsx
import Link from 'next/link';
import { getAllEntries, slugify } from '@/lib/entries.server';

// ⛔️ Pas de cache, pas d'ISR (temporaire pour vérifier)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EntriesPage() {
  let entries = await getAllEntries();

  // Tri optionnel pour stabilité (alpha)
  entries = entries.sort((a, b) => a.term.localeCompare(b.term, 'fr'));

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
        Lexique d’argot – Entries
      </h1>

      <p style={{ marginBottom: '1rem' }}>
        <strong>{entries.length}</strong> mots chargés
      </p>

      <ul style={{ display: 'grid', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
        {entries.map((e) => {
          const slug = e.slug || slugify(e.term);
          return (
            <li
              key={slug}
              style={{ padding: '0.5rem 0.75rem', border: '1px solid #eee', borderRadius: 8 }}
            >
              <Link href={`/mot/${slug}`} style={{ fontWeight: 600, textDecoration: 'none' }}>
                {e.term}
              </Link>
              {e.definition && <> – <span>{e.definition}</span></>}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

