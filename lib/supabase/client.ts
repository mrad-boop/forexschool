import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ error: { message: 'Configuration Supabase manquante' } }),
        signUp: async () => ({ error: { message: 'Configuration Supabase manquante' } }),
        signOut: async () => ({ error: null }),
        updateUser: async () => ({ error: { message: 'Configuration Supabase manquante' } }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
        insert: async () => ({ error: null }),
        update: () => ({ eq: async () => ({ error: null }) }),
        upsert: async () => ({ error: null }),
      })
    } as any
  }

  return createBrowserClient(url, key)
}
