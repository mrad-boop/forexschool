'use client'
import { useState, useEffect } from 'react'

const candles = [
  { o: 1.0820, h: 1.0870, l: 1.0800, c: 1.0855, label: 'Lun' },
  { o: 1.0855, h: 1.0890, l: 1.0840, c: 1.0843, label: 'Mar' },
  { o: 1.0843, h: 1.0860, l: 1.0810, c: 1.0815, label: 'Mer' },
  { o: 1.0815, h: 1.0850, l: 1.0790, c: 1.0845, label: 'Jeu' },
  { o: 1.0845, h: 1.0910, l: 1.0835, c: 1.0900, label: 'Ven' },
  { o: 1.0900, h: 1.0925, l: 1.0875, c: 1.0882, label: 'Lun' },
  { o: 1.0882, h: 1.0895, l: 1.0845, c: 1.0852, label: 'Mar' },
  { o: 1.0852, h: 1.0870, l: 1.0820, c: 1.0865, label: 'Mer' },
]

export default function InteractiveCandlestick() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(v => v < candles.length ? v + 1 : v)
    }, 300)
    return () => clearInterval(t)
  }, [])

  const minPrice = Math.min(...candles.map(c => c.l)) - 0.001
  const maxPrice = Math.max(...candles.map(c => c.h)) + 0.001
  const range = maxPrice - minPrice
  const H = 200

  const toY = (price: number) => ((maxPrice - price) / range) * H

  const hov = hovered !== null ? candles[hovered] : null

  return (
    <div style={{ background: '#0F172A', borderRadius: 16, padding: '1.5rem', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ color: '#94A3B8', fontSize: '0.8125rem', fontWeight: 600 }}>EUR/USD · 1D</span>
        {hov && (
          <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem' }}>
            <span style={{ color: '#64748B' }}>O: <span style={{ color: '#E2E8F0' }}>{hov.o.toFixed(4)}</span></span>
            <span style={{ color: '#64748B' }}>H: <span style={{ color: '#22C55E' }}>{hov.h.toFixed(4)}</span></span>
            <span style={{ color: '#64748B' }}>L: <span style={{ color: '#EF4444' }}>{hov.l.toFixed(4)}</span></span>
            <span style={{ color: '#64748B' }}>C: <span style={{ color: hov.c >= hov.o ? '#22C55E' : '#EF4444' }}>{hov.c.toFixed(4)}</span></span>
          </div>
        )}
      </div>

      <svg width="100%" viewBox={`0 0 ${candles.length * 60} ${H + 30}`} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(p => (
          <line key={p} x1="0" y1={p * H} x2={candles.length * 60} y2={p * H}
            stroke="#1E293B" strokeWidth="1" />
        ))}

        {candles.slice(0, visible).map((c, i) => {
          const bull = c.c >= c.o
          const color = bull ? '#22C55E' : '#EF4444'
          const bodyTop = toY(Math.max(c.o, c.c))
          const bodyBot = toY(Math.min(c.o, c.c))
          const bodyH = Math.max(bodyBot - bodyTop, 2)
          const x = i * 60 + 30
          const isHov = hovered === i

          return (
            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer', opacity: isHov ? 1 : hovered !== null ? 0.6 : 1, transition: 'opacity 0.15s' }}>
              {/* Hover bg */}
              {isHov && <rect x={x - 22} y={0} width={44} height={H} fill="rgba(255,255,255,0.04)" rx={4} />}
              {/* Wick */}
              <line x1={x} y1={toY(c.h)} x2={x} y2={toY(c.l)} stroke={color} strokeWidth={2} />
              {/* Body */}
              <rect x={x - 14} y={bodyTop} width={28} height={bodyH} fill={bull ? color : 'none'}
                stroke={color} strokeWidth={2} rx={2}
                style={{ transition: 'all 0.3s' }} />
              {/* Label */}
              <text x={x} y={H + 20} textAnchor="middle" fill="#475569" fontSize="10">{c.label}</text>
            </g>
          )
        })}
      </svg>

      <div style={{ display: 'flex', gap: 16, marginTop: '0.75rem', fontSize: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 14, height: 14, background: '#22C55E', borderRadius: 2 }} />
          <span style={{ color: '#64748B' }}>Chandelier haussier (clôture &gt; ouverture)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 14, height: 14, border: '2px solid #EF4444', borderRadius: 2 }} />
          <span style={{ color: '#64748B' }}>Chandelier baissier (clôture &lt; ouverture)</span>
        </div>
      </div>
    </div>
  )
}
