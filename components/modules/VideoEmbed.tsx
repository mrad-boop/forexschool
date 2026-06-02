'use client'
import { useState } from 'react'

interface VideoEmbedProps {
  videoId: string
  title: string
  duration?: string
  description?: string
}

export default function VideoEmbed({ videoId, title, duration, description }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0', margin: '1.5rem 0', background: '#0F172A' }}>
      <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#0F172A' }}>
        {!loaded ? (
          <div
            onClick={() => setLoaded(true)}
            style={{
              position: 'absolute', inset: 0, cursor: 'pointer',
              backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
            <div style={{
              position: 'relative', width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(255,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5)', transition: 'transform 0.2s'
            }}>
              <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '22px solid white', marginLeft: 4 }} />
            </div>
          </div>
        ) : (
          <iframe
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div style={{ padding: '1rem', background: '#0F172A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <p style={{ color: 'white', fontWeight: 700, margin: '0 0 4px', fontSize: '0.9375rem' }}>{title}</p>
            {description && <p style={{ color: '#64748B', fontSize: '0.8125rem', margin: 0 }}>{description}</p>}
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            {duration && (
              <span style={{ background: '#1E293B', color: '#94A3B8', padding: '0.25rem 0.625rem', borderRadius: 6, fontSize: '0.75rem' }}>
                ⏱ {duration}
              </span>
            )}
            <span style={{ background: '#FF000020', color: '#FF4444', padding: '0.25rem 0.625rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600 }}>
              ▶ YouTube
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
