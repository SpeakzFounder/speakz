import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllEntries, getEntryBySlug, slugify } from '@/lib/entries.server';

export const revalidate = 86400; // ISR: 24h

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.map((e) => ({ slug: e.slug || slugify(e.term) }));
}

export default async function WordPage({ params }: { params: { slug: string } }) {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) notFound();

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
      <nav style={{ marginBottom: '1rem', fontSize: 14 }}>
        <Link href="/entries" style={{ textDecoration: 'none' }}>← Retour à la liste</Link>
      </nav>

      <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{entry.term}</h1>
      {entry.category && <p>Catégorie : <strong>{entry.category}</strong></p>}

      {entry.definition ? (
        <p style={{ marginTop: '1rem', lineHeight: 1.6 }}>{entry.definition}</p>
      ) : (
        <p style={{ marginTop: '1rem', opacity: 0.7 }}>Pas de définition disponible.</p>
      )}
    </main>
  );
}
