'use client'

interface VideoEmbedProps {
  // Legacy prop kept for compatibility; ignored for embedding
  videoId?: string
  title: string
  duration?: string
  description?: string
  // New: search query to find a relevant, always-available video
  searchQuery?: string
}

export default function VideoEmbed({ title, duration, description, searchQuery }: VideoEmbedProps) {
  // Build a YouTube search URL — always valid, never a dead embed
  const query = encodeURIComponent(searchQuery || title)
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${query}`

  return (
    <a
      href={youtubeSearchUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block', margin: '1.5rem 0' }}
    >
      <div style={{
        borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0',
        background: 'linear-gradient(135deg, #0F172A, #1E293B)',
        transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '1.25rem' }}>
          {/* Play icon */}
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,0,0,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 4px 16px rgba(255,0,0,0.3)'
          }}>
            <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid white', marginLeft: 4 }} />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'white', fontWeight: 700, margin: '0 0 4px', fontSize: '0.9375rem', lineHeight: 1.4 }}>{title}</p>
            {description && <p style={{ color: '#94A3B8', fontSize: '0.8125rem', margin: 0 }}>{description}</p>}
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {duration && (
                <span style={{ background: '#1E293B', color: '#94A3B8', padding: '0.125rem 0.5rem', borderRadius: 6, fontSize: '0.75rem' }}>⏱ {duration}</span>
              )}
              <span style={{ background: '#FF000020', color: '#FF4444', padding: '0.125rem 0.5rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600 }}>
                ▶ Voir sur YouTube
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ color: '#64748B', fontSize: 20, flexShrink: 0 }}>↗</div>
        </div>
      </div>
    </a>
  )
}
