import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client singleton.
 * Reads credentials from .env (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[HelpDesk] Missing env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
