'use client'
import { useState, useEffect } from 'react'

const sessions = [
  { name: 'Sydney', open: 22, close: 7, color: '#8B5CF6', emoji: '🦘', utcOffset: 11 },
  { name: 'Tokyo', open: 0, close: 9, color: '#F59E0B', emoji: '🗼', utcOffset: 9 },
  { name: 'Londres', open: 8, close: 17, color: '#0070BA', emoji: '🎡', utcOffset: 1 },
  { name: 'New York', open: 13, close: 22, color: '#22C55E', emoji: '🗽', utcOffset: -5 },
]

function isSessionOpen(session: typeof sessions[0], hourCET: number): boolean {
  const { open, close } = session
  if (open < close) return hourCET >= open && hourCET < close
  return hourCET >= open || hourCET < close // crosses midnight
}

export default function ForexSessionsClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const hourCET = (time.getUTCHours() + 1) % 24 // CET = UTC+1

  return (
    <div style={{ background: '#0F172A', borderRadius: 16, padding: '1.5rem', border: '1px solid #1E293B' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h4 style={{ color: 'white', fontWeight: 700, margin: 0 }}>🕐 Horaires des Sessions Forex</h4>
        <div style={{ color: '#64748B', fontSize: '0.8125rem', fontFamily: 'monospace' }}>
          {time.toUTCString().substring(17, 25)} UTC
        </div>
      </div>

      {/* Timeline bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          {[0, 4, 8, 12, 16, 20, 24].map(h => (
            <span key={h} style={{ color: '#334155', fontSize: '0.7rem' }}>{h}h</span>
          ))}
        </div>
        <div style={{ position: 'relative', height: 40, background: '#1E293B', borderRadius: 8, overflow: 'hidden' }}>
          {sessions.map(s => {
            const startPct = (s.open / 24) * 100
            const endPct = (s.close / 24) * 100
            const width = s.close > s.open ? endPct - startPct : (100 - startPct) + endPct
            return (
              <div key={s.name} style={{
                position: 'absolute', left: `${startPct}%`, width: `${Math.min(width, 100 - startPct)}%`,
                height: '100%', background: `${s.color}40`, borderLeft: `2px solid ${s.color}`,
                display: 'flex', alignItems: 'center', paddingLeft: 6
              }}>
                <span style={{ fontSize: '0.7rem', color: s.color, fontWeight: 700, whiteSpace: 'nowrap' }}>{s.name}</span>
              </div>
            )
          })}
          {/* Current time cursor */}
          <div style={{
            position: 'absolute', left: `${(hourCET / 24) * 100}%`, top: 0, bottom: 0,
            width: 2, background: 'white', boxShadow: '0 0 6px white'
          }} />
        </div>
      </div>

      {/* Session cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
        {sessions.map(s => {
          const open = isSessionOpen(s, hourCET)
          return (
            <div key={s.name} style={{
              background: open ? `${s.color}18` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${open ? s.color + '60' : '#1E293B'}`,
              borderRadius: 10, padding: '0.875rem',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ color: open ? 'white' : '#64748B', fontWeight: 700, fontSize: '0.9375rem' }}>
                  {s.emoji} {s.name}
                </span>
                <span style={{
                  background: open ? s.color : '#334155',
                  color: 'white', padding: '0.125rem 0.5rem', borderRadius: 9999,
                  fontSize: '0.6875rem', fontWeight: 700
                }}>
                  {open ? '● OUVERT' : '○ FERMÉ'}
                </span>
              </div>
              <div style={{ color: '#64748B', fontSize: '0.75rem' }}>
                {s.open}h00 – {s.close}h00 CET
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '1rem', background: 'rgba(0,112,186,0.12)', border: '1px solid rgba(0,112,186,0.25)', borderRadius: 10, padding: '0.75rem' }}>
        <p style={{ color: '#7DD3FC', fontSize: '0.8125rem', margin: 0 }}>
          💡 <strong>Meilleure période :</strong> Chevauchement Londres / New York (13h–17h CET) — liquidité maximale, spreads les plus bas, meilleures opportunités de trading.
        </p>
      </div>
    </div>
  )
}
