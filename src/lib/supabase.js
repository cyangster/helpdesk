import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client — lazy-initialized only when env vars are present.
 * Avoids crashing the app on load when VITE_* vars are missing (e.g. Vercel build without env).
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let client = null

/** Returns the Supabase client, or null if env vars are not set */
export function getSupabase() {
  if (!isSupabaseConfigured) return null
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return client
}
