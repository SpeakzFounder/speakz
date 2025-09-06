import { getAllEntries, getEntryBySlug } from "@/lib/entries.server";
import { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) {
    return { title: "Mot non trouvé - Speakz" };
  }
  return {
    title: `${entry.term} - Définition d'argot | Speakz`,
    description: entry.definition
      ? `Découvrez la signification de "${entry.term}" : ${entry.definition}. Lexique d’argot français sur Speakz.`
      : `Découvrez la signification de "${entry.term}" dans le lexique d’argot français sur Speakz.`,
  };
}

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.map((e) => ({ slug: e.slug || "" }));
}

export default async function Page({ params }: Props) {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) return <div>Mot non trouvé</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{entry.term}</h1>
      <p>{entry.definition}</p>
      {entry.category && <p><strong>Catégorie :</strong> {entry.category}</p>}
    </div>
  );
}
