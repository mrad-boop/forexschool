'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function usePremium() {
  const [status, setStatus] = useState<'loading' | 'free' | 'premium'>('loading')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }: { data: { user: any } }) => {
      if (user) {
        const { data } = await supabase.from('users').select('status').eq('id', user.id).single()
        setStatus(data?.status === 'premium' ? 'premium' : 'free')
      } else {
        setStatus('free')
      }
    })
  }, [])

  return status
}
