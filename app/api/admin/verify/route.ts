import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zixbpwwjweonianynvsq.supabase.co'
// Service role key needed to read the admin passcode securely (bypasses RLS server-side only)
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function POST(req: NextRequest) {
  try {
    const { userId, passcode } = await req.json()
    if (!userId || !passcode) {
      return NextResponse.json({ ok: false, error: 'Champs manquants' }, { status: 400 })
    }

    // Use service role if available, else anon (RLS allows reading settings)
    const key = SERVICE_KEY || (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppeGJwd3dqd2VvbmlhbnludnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTYyOTQsImV4cCI6MjA5NTgzMjI5NH0.5ndkLhjM5v8xtW-BfenVwPEdQlQs_a6DWXXffCRD0N8')
    const supabase = createClient(SUPABASE_URL, key)

    // 1. Verify the user is actually an admin
    const { data: userRow } = await supabase.from('users').select('is_admin').eq('id', userId).single()
    if (!userRow?.is_admin) {
      return NextResponse.json({ ok: false, error: 'Accès refusé' }, { status: 403 })
    }

    // 2. Verify the admin passcode
    const { data: setting } = await supabase.from('fs_settings').select('value').eq('key', 'admin_passcode').single()
    if (!setting || setting.value !== passcode) {
      return NextResponse.json({ ok: false, error: 'Code administrateur incorrect' }, { status: 401 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
