// src/app/categories/page.tsx
import ClientCategories from "./ClientCategories";

export default function CategoriesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold">Catégories</h1>
      <ClientCategories />
    </main>
  );
}
