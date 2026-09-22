export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-serif text-2xl font-semibold mb-6">Zaloguj się</h1>

      {params.error && (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {params.error}
        </p>
      )}

      <form action="/auth/login" method="post" className="space-y-4">
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
            className="input"
          />
        </div>
        <button type="submit" className="btn w-full text-center">
          Zaloguj się
        </button>
      </form>

      <p className="text-sm text-inkSoft mt-6">
        Nie masz konta?{" "}
        <a href="/signup" className="text-pineDeep underline">
          Zarejestruj się
        </a>
      </p>
    </div>
  );
}
