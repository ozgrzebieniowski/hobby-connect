import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Nav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-ink/10 bg-paper/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-serif text-lg font-semibold text-ink">
          Hobby Connect
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/categories" className="hover:text-pineDeep">
            Kategorie
          </Link>
          {user ? (
            <>
              <Link href="/listings/new" className="hover:text-pineDeep">
                Dodaj ogłoszenie
              </Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className="hover:text-pineDeep">
                  Wyloguj ({user.email})
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-pineDeep">
                Zaloguj się
              </Link>
              <Link href="/signup" className="btn !px-4 !py-2">
                Zarejestruj się
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
