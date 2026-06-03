'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useModuleVideo(moduleId: string) {
  const [video, setVideo] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('modules').select('video_url, video_title').eq('id', moduleId).single()
      .then(({ data }: { data: any }) => {
        if (data?.video_url) setVideo({ url: data.video_url, title: data.video_title || '' })
      })
  }, [moduleId])

  return video
}
