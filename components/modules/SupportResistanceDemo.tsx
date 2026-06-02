'use client'
import { useState } from 'react'

const priceData = [
  102, 106, 110, 108, 112, 115, 112, 110, 113, 116,
  119, 117, 120, 118, 115, 112, 110, 108, 110, 112,
  115, 118, 121, 119, 122, 125, 122, 120, 118, 121,
  124, 126, 123, 120, 118, 115, 112, 115, 118, 120
]

const SUPPORT = 112
const RESISTANCE = 120
const W = 400
const H = 180

export default function SupportResistanceDemo() {
  const [showSupport, setShowSupport] = useState(true)
  const [showResist, setShowResist] = useState(true)
  const [hovered, setHovered] = useState<number | null>(null)

  const minP = Math.min(...priceData) - 2
  const maxP = Math.max(...priceData) + 2
  const range = maxP - minP
  const toY = (p: number) => H - ((p - minP) / range) * H
  const toX = (i: number) => (i / (priceData.length - 1)) * W

  const points = priceData.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')

  return (
    <div style={{ background: '#0F172A', borderRadius: 16, padding: '1.5rem', border: '1px solid #1E293B' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 8 }}>
        <h4 style={{ color: 'white', fontWeight: 700, margin: 0 }}>📊 Support & Résistance — Demo Interactive</h4>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowSupport(!showSupport)}
            style={{ padding: '0.375rem 0.875rem', borderRadius: 8, border: `2px solid ${showSupport ? '#22C55E' : '#334155'}`, background: showSupport ? 'rgba(34,197,94,0.15)' : 'transparent', color: showSupport ? '#22C55E' : '#64748B', fontSize: '0.8125rem', cursor: 'pointer', fontWeight: 600 }}>
            Support
          </button>
          <button onClick={() => setShowResist(!showResist)}
            style={{ padding: '0.375rem 0.875rem', borderRadius: 8, border: `2px solid ${showResist ? '#EF4444' : '#334155'}`, background: showResist ? 'rgba(239,68,68,0.15)' : 'transparent', color: showResist ? '#EF4444' : '#64748B', fontSize: '0.8125rem', cursor: 'pointer', fontWeight: 600 }}>
            Résistance
          </button>
        </div>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H + 10}`} style={{ overflow: 'visible' }}>
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map(p => (
          <line key={p} x1="0" y1={p * H} x2={W} y2={p * H} stroke="#1E293B" strokeWidth="1" />
        ))}

        {/* Support line */}
        {showSupport && (
          <>
            <line x1="0" y1={toY(SUPPORT)} x2={W} y2={toY(SUPPORT)}
              stroke="#22C55E" strokeWidth="2" strokeDasharray="6,4" />
            <rect x={W - 80} y={toY(SUPPORT) - 12} width={78} height={20} rx={4} fill="rgba(34,197,94,0.15)" />
            <text x={W - 40} y={toY(SUPPORT) + 2} textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">SUPPORT {SUPPORT}</text>
          </>
        )}

        {/* Resistance line */}
        {showResist && (
          <>
            <line x1="0" y1={toY(RESISTANCE)} x2={W} y2={toY(RESISTANCE)}
              stroke="#EF4444" strokeWidth="2" strokeDasharray="6,4" />
            <rect x={W - 92} y={toY(RESISTANCE) - 12} width={90} height={20} rx={4} fill="rgba(239,68,68,0.15)" />
            <text x={W - 47} y={toY(RESISTANCE) + 2} textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">RÉSISTANCE {RESISTANCE}</text>
          </>
        )}

        {/* Price line */}
        <polyline points={points} fill="none" stroke="#0070BA" strokeWidth="2" />
        <polyline points={`${points} ${W},${H} 0,${H}`} fill="url(#grad)" stroke="none" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0070BA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0070BA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Bounce indicators */}
        {priceData.map((p, i) => {
          const atSupport = Math.abs(p - SUPPORT) < 1.5
          const atResistance = Math.abs(p - RESISTANCE) < 1.5
          if (!atSupport && !atResistance) return null
          return (
            <circle key={i} cx={toX(i)} cy={toY(p)} r={5}
              fill={atSupport ? '#22C55E' : '#EF4444'}
              opacity={0.9} />
          )
        })}

        {/* Hover dots */}
        {hovered !== null && (
          <>
            <line x1={toX(hovered)} y1={0} x2={toX(hovered)} y2={H} stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
            <circle cx={toX(hovered)} cy={toY(priceData[hovered])} r={5} fill="#0070BA" />
            <rect x={toX(hovered) - 28} y={toY(priceData[hovered]) - 24} width={56} height={18} rx={4} fill="#1E293B" />
            <text x={toX(hovered)} y={toY(priceData[hovered]) - 11} textAnchor="middle" fill="white" fontSize="10">{priceData[hovered].toFixed(0)}</text>
          </>
        )}

        {/* Invisible hover zones */}
        {priceData.map((_, i) => (
          <rect key={i} x={toX(i) - 8} y={0} width={16} height={H}
            fill="transparent" style={{ cursor: 'crosshair' }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
        ))}
      </svg>

      <div style={{ display: 'flex', gap: 16, marginTop: '0.75rem', fontSize: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#22C55E' }}>● Rebonds sur support</span>
        <span style={{ color: '#EF4444' }}>● Rejets sur résistance</span>
        <span style={{ color: '#64748B' }}>Survolez le graphique pour voir les prix</span>
      </div>
    </div>
  )
}
