'use client'
import Link from 'next/link'
import { Module } from '@/lib/supabase/types'

interface ModuleCardProps {
  module: {
    id: string
    title: string
    description: string
    category: string
    level: number
    duration_hours: number
    type: string
    order_index: number
  }
  userStatus?: 'free' | 'premium' | null
}

export default function ModuleCard({ module, userStatus }: ModuleCardProps) {
  const isLocked = module.type === 'premium' && userStatus !== 'premium'
  const categoryColors: Record<string, string> = {
    'Forex & Crypto': '#0070BA',
    'Marché des Actions': '#7C3AED',
    'Gestion de Portefeuille': '#059669',
    'Analyste Financier': '#DC2626',
    'Annexes': '#D97706',
  }
  const color = categoryColors[module.category] || '#0070BA'

  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      {isLocked && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(2px)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          borderRadius: 16
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
          <p style={{ fontWeight: 700, color: '#334155', marginBottom: 12, textAlign: 'center', padding: '0 1rem' }}>
            Contenu Premium
          </p>
          <Link href="/payment" className="btn-primary" style={{ fontSize: '0.8125rem', padding: '0.5rem 1.25rem' }}>
            Débloquer – 49 USDT
          </Link>
        </div>
      )}

      <div style={{ filter: isLocked ? 'blur(1px)' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <span style={{ 
            background: `${color}15`, color, padding: '0.25rem 0.75rem',
            borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600
          }}>{module.category}</span>
          <span className={module.type === 'free' ? 'badge-free' : 'badge-premium'}>
            {module.type === 'free' ? '✓ Gratuit' : '⭐ Premium'}
          </span>
        </div>

        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1E293B', marginBottom: 8, lineHeight: 1.4 }}>
          {module.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: 16 }}>
          {module.description}
        </p>

        <div style={{ display: 'flex', gap: 16, fontSize: '0.8125rem', color: '#94A3B8', marginBottom: 16 }}>
          <span>📚 Niveau {module.level}</span>
          <span>⏱ {module.duration_hours}h</span>
        </div>

        {!isLocked && (
          <Link 
            href={`/module/${module.id}`}
            className="btn-secondary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', width: '100%', justifyContent: 'center' }}
          >
            Commencer le module →
          </Link>
        )}
      </div>
    </div>
  )
}
