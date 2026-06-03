'use client'
import { useState } from 'react'

interface VideoEmbedProps {
  videoId?: string
  videoUrl?: string        // direct YouTube URL set by admin
  title: string
  duration?: string
  description?: string
  searchQuery?: string     // fallback: search YouTube
}

// Extract YouTube video ID from any YouTube URL format
function extractYouTubeId(url: string): string | null {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  // Maybe they pasted just the ID
  if (/^[A-Za-z0-9_-]{11}$/.test(url.trim())) return url.trim()
  return null
}

export default function VideoEmbed({ videoUrl, title, duration, description, searchQuery }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const ytId = videoUrl ? extractYouTubeId(videoUrl) : null

  // ===== If admin set a valid YouTube URL → embed it =====
  if (ytId) {
    return (
      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0', margin: '1.5rem 0', background: '#0F172A' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
          {!loaded ? (
            <div onClick={() => setLoaded(true)} style={{
              position: 'absolute', inset: 0, cursor: 'pointer',
              backgroundImage: `url(https://img.youtube.com/vi/${ytId}/hqdefault.jpg)`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
              <div style={{ position: 'relative', width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
                <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '20px solid white', marginLeft: 4 }} />
              </div>
            </div>
          ) : (
            <iframe
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
              title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
            />
          )}
        </div>
        <div style={{ padding: '1rem' }}>
          <p style={{ color: 'white', fontWeight: 700, margin: '0 0 4px', fontSize: '0.9375rem' }}>{title}</p>
          {description && <p style={{ color: '#94A3B8', fontSize: '0.8125rem', margin: 0 }}>{description}</p>}
          {duration && <span style={{ display: 'inline-block', marginTop: 8, background: '#1E293B', color: '#94A3B8', padding: '0.125rem 0.5rem', borderRadius: 6, fontSize: '0.75rem' }}>⏱ {duration}</span>}
        </div>
      </div>
    )
  }

  // ===== Otherwise → safe YouTube search link =====
  const query = encodeURIComponent(searchQuery || title)
  const searchUrl = `https://www.youtube.com/results?search_query=${query}`
  return (
    <a href={searchUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', margin: '1.5rem 0' }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0', background: 'linear-gradient(135deg, #0F172A, #1E293B)', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '1.25rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid white', marginLeft: 4 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'white', fontWeight: 700, margin: '0 0 4px', fontSize: '0.9375rem' }}>{title}</p>
            {description && <p style={{ color: '#94A3B8', fontSize: '0.8125rem', margin: 0 }}>{description}</p>}
            <span style={{ display: 'inline-block', marginTop: 8, background: '#FF000020', color: '#FF4444', padding: '0.125rem 0.5rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600 }}>▶ Voir sur YouTube</span>
          </div>
          <div style={{ color: '#64748B', fontSize: 20, flexShrink: 0 }}>↗</div>
        </div>
      </div>
    </a>
  )
}
