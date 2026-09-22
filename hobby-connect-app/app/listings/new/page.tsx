import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createListing } from "../actions";

export default async function NewListingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=Zaloguj+się,+żeby+dodać+ogłoszenie.");
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="font-serif text-2xl font-semibold mb-6">
        Dodaj ogłoszenie
      </h1>

      {params.error && (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {params.error}
        </p>
      )}

      <form action={createListing} className="space-y-4">
        <div>
          <label htmlFor="title" className="label">
            Tytuł
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="np. Wyjazd rowerowy w Bieszczady"
            className="input"
          />
        </div>

        <div>
          <label htmlFor="category_id" className="label">
            Kategoria
          </label>
          <select id="category_id" name="category_id" className="input">
            <option value="">— wybierz —</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="label">
            Opis
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            placeholder="Kilka zdań — czego szukasz, kogo zapraszasz."
            className="input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="label">
              Miejsce
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              placeholder="np. Kraków"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="when_text" className="label">
              Kiedy
            </label>
            <input
              id="when_text"
              name="when_text"
              type="text"
              required
              placeholder="np. za dwa tygodnie"
              className="input"
            />
          </div>
        </div>

        <button type="submit" className="btn w-full text-center">
          Opublikuj ogłoszenie
        </button>
      </form>
    </div>
  );
}
