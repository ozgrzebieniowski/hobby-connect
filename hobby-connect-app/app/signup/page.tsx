export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-serif text-2xl font-semibold mb-6">
        Załóż konto
      </h1>

      {params.error && (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {params.error}
        </p>
      )}

      {params.success ? (
        <p className="text-sm text-pineDeep bg-pine/10 border border-pine/30 rounded px-3 py-2">
          Sprawdź swoją skrzynkę e-mail i kliknij link potwierdzający, żeby
          dokończyć rejestrację.
        </p>
      ) : (
        <>
          <form action="/auth/signup" method="post" className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                Hasło
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="input"
              />
            </div>
            <button type="submit" className="btn w-full text-center">
              Zarejestruj się
            </button>
          </form>

          <p className="text-sm text-inkSoft mt-6">
            Masz już konto?{" "}
            <a href="/login" className="text-pineDeep underline">
              Zaloguj się
            </a>
          </p>
        </>
      )}
    </div>
  );
}
