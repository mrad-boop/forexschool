'use client'
import { useState, useEffect } from 'react'

interface Section {
  id: string
  title: string
  duration: string
}

export default function ProgressSection({ sections, moduleId }: { sections: Section[], moduleId: string }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  useEffect(() => {
    const saved = localStorage.getItem(`progress_${moduleId}`)
    if (saved) setCompleted(new Set(JSON.parse(saved)))
  }, [moduleId])

  const toggle = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem(`progress_${moduleId}`, JSON.stringify([...next]))
      return next
    })
  }

  const pct = Math.round((completed.size / sections.length) * 100)

  return (
    <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
        <h4 style={{ fontWeight: 700, color: '#0F172A', margin: 0, fontSize: '0.9375rem' }}>📋 Sommaire du module</h4>
        <span style={{ background: pct === 100 ? '#D1FAE5' : '#E8F4FD', color: pct === 100 ? '#059669' : '#0070BA', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 700 }}>
          {pct}% complété
        </span>
      </div>

      <div style={{ height: 6, background: '#F1F5F9', borderRadius: 9999, marginBottom: '1rem', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? '#22C55E' : '#0070BA', borderRadius: 9999, transition: 'width 0.4s ease' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sections.map(s => (
          <div key={s.id} onClick={() => toggle(s.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.625rem 0.75rem', borderRadius: 10, cursor: 'pointer', background: completed.has(s.id) ? '#F0FDF4' : '#F8FAFC', border: `1px solid ${completed.has(s.id) ? '#BBF7D0' : '#E2E8F0'}`, transition: 'all 0.15s' }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${completed.has(s.id) ? '#22C55E' : '#CBD5E1'}`, background: completed.has(s.id) ? '#22C55E' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
              {completed.has(s.id) && <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ flex: 1, fontSize: '0.875rem', color: completed.has(s.id) ? '#166534' : '#334155', fontWeight: 500, textDecoration: completed.has(s.id) ? 'line-through' : 'none' }}>{s.title}</span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{s.duration}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
