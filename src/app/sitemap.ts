import { getAllEntries, slugify } from '@/lib/entries.server';

export default async function sitemap() {
  const base = 'https://speakz.fr';
  const entries = await getAllEntries().catch(() => [] as any[]);
  const now = new Date();

  const staticPages = ['', '/entries'].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: p === '' ? 1.0 : 0.8
  }));

  const terms = entries.map((e: any) => {
    const slug = e.slug || slugify(e.term);
    return {
      url: `${base}/mot/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7
    };
  });

  return [...staticPages, ...terms];
}
