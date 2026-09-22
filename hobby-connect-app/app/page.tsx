import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: listings } = await supabase
    .from("listings")
    .select("id, title, description, location, when_text, created_at, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12 max-w-xl">
        <h1 className="font-serif text-4xl font-semibold leading-tight mb-4">
          Rower, ogród, warsztat — Twoje pasje mają wreszcie jedno miejsce.
        </h1>
        <p className="text-inkSoft mb-6">
          Publikuj ogłoszenie, znajdź kogoś w okolicy i zamieńcie wspólne
          zainteresowanie w realne spotkanie.
        </p>
        <Link href="/listings/new" className="btn">
          Dodaj ogłoszenie
        </Link>
      </header>

      <h2 className="font-serif text-2xl font-semibold mb-6">
        Ogłoszenia
      </h2>

      {!listings || listings.length === 0 ? (
        <p className="text-inkSoft">
          Nie ma jeszcze żadnych ogłoszeń. Bądź pierwszą osobą, która je doda.
        </p>
      ) : (
        <div className="divide-y divide-ink/10">
          {listings.map((listing) => (
            <article key={listing.id} className="py-6">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                {listing.categories && (
                  <span className="text-xs font-medium text-pineDeep">
                    {(listing.categories as unknown as { name: string }).name}
                  </span>
                )}
                <h3 className="font-serif text-lg font-semibold">
                  {listing.title}
                </h3>
              </div>
              <p className="text-inkSoft text-sm mb-2 max-w-xl">
                {listing.description}
              </p>
              <p className="text-xs text-inkSoft">
                {listing.location}, {listing.when_text}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
