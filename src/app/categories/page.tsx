// src/app/categories/page.tsx
export default function CategoriesPage() {
  return (
    <main style={{maxWidth: 700, margin: "2rem auto", padding: "1rem"}}>
      <h1 style={{fontSize: 28, fontWeight: 700}}>TEST CATEGORIES OK ✅</h1>
      <p style={{marginTop: 8}}>Si tu vois ce texte, le fichier <code>src/app/categories/page.tsx</code> est bien celui utilisé par le site.</p>
      <p style={{marginTop: 8}}>Si tu ne le vois pas, c’est qu’on n’édite pas le bon chemin.</p>
      <p style={{marginTop: 16}}><a href="/speakz_entries.json">Vérifier le JSON</a></p>
    </main>
  );
}
