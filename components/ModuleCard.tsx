'use client'
import Link from 'next/link'

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
  const isPremiumUser = userStatus === 'premium'

  const categoryColors: Record<string, string> = {
    'Forex & Crypto': '#0070BA',
    'Marché des Actions': '#7C3AED',
    'Gestion de Portefeuille': '#059669',
    'Analyste Financier': '#DC2626',
    'Annexes': '#D97706',
  }
  const color = categoryColors[module.category] || '#0070BA'

  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {/* Header — always visible */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{
          background: `${color}15`, color,
          padding: '0.25rem 0.75rem', borderRadius: 9999,
          fontSize: '0.75rem', fontWeight: 600
        }}>
          {module.category}
        </span>
        {isPremiumUser ? (
          <span className="badge-premium">⭐ Débloqué</span>
        ) : (
          <span className="badge-free">👁 Aperçu</span>
        )}
      </div>

      <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1E293B', marginBottom: 10, lineHeight: 1.4 }}>
        {module.title}
      </h3>

      <div style={{ display: 'flex', gap: 16, fontSize: '0.8125rem', color: '#94A3B8', marginBottom: 14 }}>
        <span>📚 Niveau {module.level}</span>
        <span>⏱ {module.duration_hours}h de contenu</span>
      </div>

      <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
        {module.description}
      </p>

      {/* Button */}
      {isPremiumUser ? (
        <Link
          href={`/module/${module.id}`}
          className="btn-secondary"
          style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', width: '100%', justifyContent: 'center' }}
        >
          Accéder au module →
        </Link>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link
            href={`/module/${module.id}`}
            className="btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 1.25rem', width: '100%', justifyContent: 'center' }}
          >
            👁 Voir l'aperçu gratuit
          </Link>
          <Link
            href="/payment"
            className="btn-primary"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 1.25rem', width: '100%', justifyContent: 'center' }}
          >
            🔓 Abonnez-vous – 49 USDT
          </Link>
        </div>
      )}
    </div>
  )
}
