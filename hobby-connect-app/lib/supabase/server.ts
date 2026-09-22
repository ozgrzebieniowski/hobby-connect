import {
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";
// Tworzymy nowego klienta przy KAŻDYM wywołaniu (nigdy na poziomie modułu),
// żeby uniknąć serwowania nieaktualnych ciasteczek sesji.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
       setAll(
  cookiesToSet: {
    name: string;
    value: string;
    options: CookieOptions;
  }[],
) {
            // setAll wywołane z Server Component, gdzie nie można ustawiać
            // ciasteczek — middleware.ts i tak odświeży sesję.
          }
        },
      },
    }
  );
}
