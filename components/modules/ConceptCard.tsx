'use client'
import { useState } from 'react'

interface Concept {
  term: string
  definition: string
  example?: string
  icon?: string
}

export default function ConceptCard({ concepts }: { concepts: Concept[] }) {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <p style={{ color: '#64748B', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>
        🃏 Flashcards — Cliquez pour révéler la définition
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.875rem' }}>
        {concepts.map((c, i) => (
          <div
            key={i}
            onClick={() => setFlipped(flipped === i ? null : i)}
            style={{
              cursor: 'pointer', borderRadius: 14, padding: '1.25rem',
              background: flipped === i ? 'linear-gradient(135deg, #003087, #0070BA)' : 'white',
              border: `2px solid ${flipped === i ? '#0070BA' : '#E2E8F0'}`,
              transition: 'all 0.25s', minHeight: 110,
              boxShadow: flipped === i ? '0 4px 20px rgba(0,112,186,0.25)' : '0 1px 4px rgba(0,0,0,0.05)',
              transform: flipped === i ? 'translateY(-2px)' : 'none'
            }}>
            {flipped !== i ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon || '📖'}</div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>{c.term}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: 'auto', paddingTop: 8 }}>Cliquez pour la définition →</div>
              </div>
            ) : (
              <div>
                <div style={{ fontWeight: 800, color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginBottom: 6, textTransform: 'uppercase' }}>{c.term}</div>
                <div style={{ color: 'white', fontSize: '0.875rem', lineHeight: 1.6 }}>{c.definition}</div>
                {c.example && (
                  <div style={{ marginTop: 8, padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: 8, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                    Ex: {c.example}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
