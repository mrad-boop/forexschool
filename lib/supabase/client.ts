import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    // Return a mock client during build/SSR without env vars
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ error: { message: 'Not configured' } }),
        signUp: async () => ({ error: { message: 'Not configured' } }),
        signOut: async () => ({})
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
        insert: async () => ({ error: null }),
        upsert: async () => ({ error: null }),
      })
    } as any
  }
  
  return createBrowserClient(url, key)
}
