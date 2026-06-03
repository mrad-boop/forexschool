import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zixbpwwjweonianynvsq.supabase.co'
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppeGJwd3dqd2VvbmlhbnludnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTYyOTQsImV4cCI6MjA5NTgzMjI5NH0.5ndkLhjM5v8xtW-BfenVwPEdQlQs_a6DWXXffCRD0N8'

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json()
    if (!passcode) {
      return NextResponse.json({ ok: false, error: 'Code requis' }, { status: 400 })
    }

    // fs_settings has a public-read RLS policy, so anon key can read the passcode
    const supabase = createClient(SUPABASE_URL, ANON_KEY)
    const { data: setting, error } = await supabase
      .from('fs_settings').select('value').eq('key', 'admin_passcode').single()

    if (error || !setting) {
      return NextResponse.json({ ok: false, error: 'Configuration introuvable' }, { status: 500 })
    }

    if (setting.value !== passcode) {
      return NextResponse.json({ ok: false, error: 'Code administrateur incorrect' }, { status: 401 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
