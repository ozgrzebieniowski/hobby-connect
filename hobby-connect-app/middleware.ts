import {
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";
// Ten middleware NIE blokuje dostępu do stron — Hobby Connect jest
// publicznie przeglądalny. Jego jedynym zadaniem jest odświeżanie
// wygasłej sesji przy każdym żądaniu, żeby użytkownik nie był
// niespodziewanie wylogowywany. Ochronę konkretnych stron (np.
// dodawania ogłoszenia) robimy osobno, w samej stronie / akcji.
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
  cookiesToSet: {
    name: string;
    value: string;
    options: CookieOptions;
  }[],
) {
        },
      },
    }
  );

  // getUser() (a nie getSession()) — weryfikuje token z serwerem Supabase.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
