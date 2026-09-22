import { createClient } from "@/lib/supabase/server";
import { createCategory } from "./actions";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.is_admin ?? false;
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="font-serif text-2xl font-semibold mb-6">Kategorie</h1>

      <ul className="mb-10 divide-y divide-ink/10">
        {categories?.map((c) => (
          <li key={c.id} className="py-2 text-ink">
            {c.name}
          </li>
        ))}
      </ul>

      {isAdmin ? (
        <div className="border-t border-ink/10 pt-6">
          <h2 className="font-serif text-lg font-semibold mb-3">
            Dodaj kategorię
          </h2>
          {params.error && (
            <p className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
              {params.error}
            </p>
          )}
          <form action={createCategory} className="flex gap-3">
            <input
              name="name"
              type="text"
              required
              placeholder="np. Wędkarstwo"
              className="input"
            />
            <button type="submit" className="btn shrink-0">
              Dodaj
            </button>
          </form>
        </div>
      ) : user ? (
        <p className="text-sm text-inkSoft border-t border-ink/10 pt-6">
          Dodawanie kategorii jest dostępne tylko dla administratorów.
        </p>
      ) : (
        <p className="text-sm text-inkSoft border-t border-ink/10 pt-6">
          <a href="/login" className="text-pineDeep underline">
            Zaloguj się
          </a>
          , żeby zobaczyć więcej opcji.
        </p>
      )}
    </div>
  );
}
