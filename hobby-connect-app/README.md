# Hobby Connect — jak uruchomić

To jest kompletna, działająca aplikacja: rejestracja i logowanie,
publiczna lista ogłoszeń, dodawanie ogłoszeń przez zalogowanych
użytkowników i dodawanie kategorii przez administratora. Działa jako
zwykła strona w przeglądarce i da się „zainstalować" na telefonie jak
aplikacja (PWA).

Nic tu nie jest jeszcze uruchomione — musisz przejść przez 3 kroki
poniżej. Każdy krok robi się przez stronę internetową (klikanie), bez
pisania kodu. Zajmie to około 30–40 minut za pierwszym razem.

## Czego będziesz potrzebować

- Konta (wszystkie darmowe na start): [supabase.com](https://supabase.com),
  [github.com](https://github.com), [vercel.com](https://vercel.com)

## Krok 1 — baza danych (Supabase)

1. Załóż konto na supabase.com i kliknij **New project**.
2. Nadaj projektowi nazwę (np. „hobby-connect") i hasło do bazy danych
   (zapisz je gdzieś — nie będzie Ci ono potrzebne w normalnym
   korzystaniu z aplikacji, ale zachowaj je na wszelki wypadek).
3. Poczekaj, aż projekt się utworzy (1–2 minuty).
4. Wejdź w zakładkę **SQL Editor** (po lewej stronie) -> **New query**.
5. Otwórz plik `supabase/schema.sql` z tego projektu, skopiuj całą
   jego zawartość, wklej do edytora SQL w Supabase i kliknij **Run**.
   To utworzy wszystkie potrzebne tabele i zasady bezpieczeństwa.
6. Wejdź w **Settings -> API**. Będą Ci potrzebne dwie wartości z tej
   strony w kolejnym kroku: **Project URL** oraz klucz **anon public**.

## Krok 2 — wrzuć kod na GitHub

1. Załóż konto na github.com (jeśli jeszcze nie masz).
2. Kliknij **New repository**, nadaj nazwę np. „hobby-connect", zostaw
   je jako **Private** lub **Public** (bez znaczenia), nie zaznaczaj
   żadnych dodatkowych opcji, kliknij **Create repository**.
3. Na stronie repozytorium kliknij link **uploading an existing file**.
4. Przeciągnij tam **całą zawartość** tego folderu projektu (wszystkie
   pliki i podfoldery) i kliknij **Commit changes**.

   Wskazówka: jeśli przeciąganie całego folderu nie zadziała w Twojej
   przeglądarce, spróbuj w Chrome — tam działa to najpewniej.

## Krok 3 — publikacja (Vercel)

1. Załóż konto na vercel.com, logując się przez GitHub (najprostsza
   opcja — jednym kliknięciem połączy Twoje konta).
2. Kliknij **Add New -> Project**, wybierz repozytorium
   „hobby-connect", które przed chwilą utworzyłeś, kliknij **Import**.
3. W sekcji **Environment Variables** dodaj dwie zmienne (wartości z
   kroku 1, Supabase -> Settings -> API):
   - `NEXT_PUBLIC_SUPABASE_URL` = Twój Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Twój klucz anon public
4. Kliknij **Deploy** i poczekaj 1–2 minuty.
5. Gotowe — dostaniesz adres w stylu `hobby-connect.vercel.app`. To
   już jest prawdziwa, działająca strona, dostępna dla każdego.

## Jak zostać administratorem (żeby dodawać kategorie)

1. Wejdź na swoją nową stronę i zarejestruj się normalnie (jako zwykły
   użytkownik) — potwierdź e-mail linkiem, który przyjdzie na skrzynkę.
2. W Supabase wejdź w **Table Editor -> profiles**, znajdź wiersz ze
   swoim adresem e-mail i ustaw kolumnę `is_admin` na `true`.
3. Zaloguj się ponownie na stronie — na `/categories` pojawi Ci się
   formularz dodawania kategorii.

## „Instalowanie" na telefonie

Po wejściu na stronę w Chrome (Android) lub Safari (iPhone) pojawi się
opcja „Dodaj do ekranu głównego" / „Zainstaluj aplikację". Strona
otworzy się wtedy jak zwykła aplikacja, bez paska adresu.

## Droga do prawdziwej appki w App Store / Google Play

Gdy strona już będzie gotowa i przetestowana, najprostszym mostem do
sklepów z aplikacjami (bez pisania osobnego kodu na iOS/Android) jest
darmowe narzędzie **PWABuilder** (pwabuilder.com, zrobione przez
Microsoft): wklejasz tam adres swojej strony, a ono generuje gotowe
paczki do wysłania do Google Play i App Store. Wciąż będziesz musiał
samodzielnie założyć konto Apple Developer (99 USD/rok) i Google Play
Developer (25 USD jednorazowo) oraz przejść przez proces publikacji —
tego kroku nie da się ominąć, wymagają tego same sklepy. Chętnie
przeprowadzę Cię przez to, gdy będziesz gotów.

## Co dalej

Ten kod celowo skupia się na działaniu, nie na wyglądzie — wróćmy
teraz do szaty graficznej i dopracujmy detale. Warto też pomyśleć o
kolejnych funkcjach: wiadomości między użytkownikami, edycja/usuwanie
własnych ogłoszeń z poziomu strony, wyszukiwanie i filtrowanie.


