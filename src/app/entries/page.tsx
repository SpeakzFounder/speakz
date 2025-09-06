import Link from 'next/link';
import { getAllEntries, slugify } from '@/lib/entries.server';

export const revalidate = 86400; // ISR: 24h

export default async function EntriesPage() {
  const entries = await getAllEntries();

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
        Lexique d’argot – Entries
      </h1>

      <p style={{ marginBottom: '1rem' }}>
        <span style={{ fontWeight: 700 }}>{entries.length}</span> mots chargés
      </p>

      <ul style={{ display: 'grid', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
        {entries.map((e) => {
          const slug = e.slug || slugify(e.term);
          return (
            <li key={slug} style={{ padding: '0.5rem 0.75rem', border: '1px solid #eee', borderRadius: 8 }}>
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
