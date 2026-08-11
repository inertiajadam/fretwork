import { createClient } from "@supabase/supabase-js";

/* Browser Supabase client, created only when the public env vars are present.
   The whole account layer is optional: with no keys, getSupabase() returns null
   and the site stays fully functional in local-first mode. Both values are
   publishable (safe in the client bundle); the secret service key is never used
   here (row-level security + the anon key are enough). */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anon);

let client = null;

export function getSupabase() {
  if (!isSupabaseConfigured) return null;
  if (typeof window === "undefined") return null;
  if (!client) {
    client = createClient(url, anon, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}
