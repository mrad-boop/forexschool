'use client'
import { useState } from 'react'

const phases = [
  { name: 'Accumulation', angle: 0, color: '#3B82F6', desc: 'Les investisseurs institutionnels achètent discrètement. Prix bas, volume faible. Médias indifférents.', emoji: '🐋', sentiment: 20 },
  { name: 'Bull Market', angle: 90, color: '#22C55E', desc: 'Hausse explosive. FOMO généralisé. Médias enthousiastes. Nouveaux entrants en masse.', emoji: '🚀', sentiment: 90 },
  { name: 'Distribution', angle: 180, color: '#F59E0B', desc: 'Les institutionnels vendent progressivement aux nouveaux entrants. Prix au sommet, euphorie totale.', emoji: '⚠️', sentiment: 95 },
  { name: 'Bear Market', angle: 270, color: '#EF4444', desc: 'Chute -80% ou plus. Capitulation. Médias déclarent la mort de la crypto. Panic selling.', emoji: '🐻', sentiment: 5 },
]

export default function CryptoMarketCycle() {
  const [active, setActive] = useState(0)
  const phase = phases[active]

  return (
    <div style={{ background: '#0F172A', borderRadius: 16, padding: '1.5rem', border: '1px solid #1E293B' }}>
      <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem' }}>🔄 Cycle de Marché Crypto — Le cycle de 4 ans</h4>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        {/* Cycle wheel */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
          <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {phases.map((p, i) => {
              const angle = (i * 90 - 45) * (Math.PI / 180)
              const nextAngle = ((i + 1) * 90 - 45) * (Math.PI / 180)
              const r = 80
              const cx = 100, cy = 100
              const x1 = cx + r * Math.cos(angle)
              const y1 = cy + r * Math.sin(angle)
              const x2 = cx + r * Math.cos(nextAngle)
              const y2 = cy + r * Math.sin(nextAngle)
              const midAngle = (angle + nextAngle) / 2
              const tx = cx + 55 * Math.cos(midAngle)
              const ty = cy + 55 * Math.sin(midAngle)

              return (
                <g key={i} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
                  <path
                    d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
                    fill={active === i ? p.color : p.color + '40'}
                    stroke={active === i ? p.color : '#1E293B'}
                    strokeWidth={active === i ? 2 : 1}
                    style={{ transition: 'all 0.2s' }}
                  />
                  <text x={tx} y={ty - 6} textAnchor="middle" fontSize="18">{p.emoji}</text>
                  <text x={tx} y={ty + 10} textAnchor="middle" fontSize="9" fill="white" fontWeight={active === i ? 'bold' : 'normal'}>
                    {p.name}
                  </text>
                </g>
              )
            })}
            <circle cx="100" cy="100" r="28" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
            <text x="100" y="96" textAnchor="middle" fontSize="9" fill="#64748B">Halving</text>
            <text x="100" y="108" textAnchor="middle" fontSize="9" fill="#64748B">~4 ans</text>
          </svg>
        </div>

        {/* Info panel */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.875rem' }}>
            <span style={{ fontSize: 28 }}>{phase.emoji}</span>
            <div>
              <div style={{ color: phase.color, fontWeight: 800, fontSize: '1.125rem' }}>{phase.name}</div>
              <div style={{ color: '#64748B', fontSize: '0.75rem' }}>Phase {active + 1}/4</div>
            </div>
          </div>
          <p style={{ color: '#CBD5E1', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>{phase.desc}</p>

          {/* Sentiment gauge */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.75rem', marginBottom: 4 }}>
              <span>😱 Fear</span>
              <span>Sentiment du marché</span>
              <span>🤑 Greed</span>
            </div>
            <div style={{ height: 12, background: '#1E293B', borderRadius: 9999, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${phase.sentiment}%`,
                background: `linear-gradient(90deg, #EF4444, #F59E0B, #22C55E)`,
                borderRadius: 9999, transition: 'width 0.5s ease'
              }} />
            </div>
            <div style={{ textAlign: 'right', color: phase.color, fontSize: '0.75rem', marginTop: 4, fontWeight: 700 }}>
              {phase.sentiment}/100
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: '1rem', flexWrap: 'wrap' }}>
            {phases.map((p, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ padding: '0.375rem 0.75rem', borderRadius: 8, border: `1px solid ${i === active ? p.color : '#334155'}`, background: i === active ? `${p.color}20` : 'transparent', color: i === active ? p.color : '#64748B', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                {p.emoji} {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
