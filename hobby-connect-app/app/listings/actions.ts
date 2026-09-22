"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createListing(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=Zaloguj+się,+żeby+dodać+ogłoszenie.");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const when_text = formData.get("when_text") as string;
  const category_id = formData.get("category_id") as string;

  if (!title || !description || !location || !when_text) {
    redirect("/listings/new?error=Uzupełnij+wszystkie+pola.");
  }

  const { error } = await supabase.from("listings").insert({
    user_id: user.id,
    category_id: category_id || null,
    title,
    description,
    location,
    when_text,
  });

  if (error) {
    redirect(`/listings/new?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/");
}
