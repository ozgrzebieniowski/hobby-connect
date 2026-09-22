"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Uwaga: prawdziwym strażnikiem jest polityka RLS w Supabase
// ("Tylko administratorzy mogą dodawać kategorie") — to sprawdzenie
// tutaj to tylko wygodniejszy komunikat dla użytkownika.
export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name = (formData.get("name") as string)?.trim();

  if (!name) {
    redirect("/categories?error=Podaj+nazwę+kategorii.");
  }

  const { error } = await supabase.from("categories").insert({ name });

  if (error) {
    redirect(`/categories?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/categories");
}
