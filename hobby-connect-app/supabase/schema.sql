-- Hobby Connect — schemat bazy danych
-- Wklej całą zawartość tego pliku do Supabase Dashboard -> SQL Editor -> uruchom (Run)

-- ============================================================
-- PROFILES (rozszerza wbudowaną tabelę auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profile widoczne dla wszystkich"
  on public.profiles for select
  using (true);

create policy "Użytkownik może edytować własny profil"
  on public.profiles for update
  using (auth.uid() = id);

-- Automatycznie tworzy wiersz w profiles przy rejestracji nowego użytkownika
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- CATEGORIES
-- ============================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Kategorie widoczne dla wszystkich"
  on public.categories for select
  using (true);

create policy "Tylko administratorzy mogą dodawać kategorie"
  on public.categories for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create policy "Tylko administratorzy mogą usuwać kategorie"
  on public.categories for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- ============================================================
-- LISTINGS (ogłoszenia)
-- ============================================================
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text not null,
  location text not null,
  when_text text not null,
  created_at timestamptz not null default now()
);

alter table public.listings enable row level security;

create policy "Ogłoszenia widoczne dla wszystkich"
  on public.listings for select
  using (true);

create policy "Zalogowani użytkownicy mogą dodawać własne ogłoszenia"
  on public.listings for insert
  with check (auth.uid() = user_id);

create policy "Użytkownik może edytować własne ogłoszenia"
  on public.listings for update
  using (auth.uid() = user_id);

create policy "Użytkownik może usuwać własne ogłoszenia"
  on public.listings for delete
  using (auth.uid() = user_id);

-- ============================================================
-- Przykładowe kategorie startowe
-- ============================================================
insert into public.categories (name) values
  ('Rower'), ('Ogrodnictwo'), ('Motoryzacja'), ('Fotografia'),
  ('Muzyka'), ('Kulinaria'), ('Wspinaczka'), ('Majsterkowanie');

-- ============================================================
-- WAŻNE — jak zostać pierwszym administratorem:
-- 1. Zarejestruj się w swojej aplikacji jak zwykły użytkownik.
-- 2. W Supabase Dashboard -> Table Editor -> profiles znajdź swój wiersz.
-- 3. Ustaw kolumnę is_admin na true.
-- Od teraz Twoje konto będzie mogło dodawać/usuwać kategorie.
-- ============================================================
