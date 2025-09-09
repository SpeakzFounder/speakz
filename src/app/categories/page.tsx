// src/app/categories/page.tsx
export const dynamic = "force-dynamic"; // ❌ pas de prerender

export default function CategoriesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold">Catégories</h1>
      <p className="mt-2 text-neutral-600">
        Cette page est en cours de mise en place.
      </p>
    </main>
  );
}
