'use client'
import Link from 'next/link'

export default function PremiumGate({ hours }: { hours?: number }) {
  return (
    <div style={{ position: 'relative', marginTop: '1rem' }}>
      {/* Fade overlay teasing more content */}
      <div style={{
        height: 80, marginTop: -80, position: 'relative',
        background: 'linear-gradient(to bottom, rgba(248,250,252,0), #F8FAFC)',
        pointerEvents: 'none'
      }} />

      <div style={{
        background: 'linear-gradient(135deg, #003087 0%, #0070BA 100%)',
        borderRadius: 20, padding: '2.5rem 2rem', textAlign: 'center', color: 'white',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ fontSize: 48, marginBottom: '1rem' }}>🔒</div>
        <h3 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: 10 }}>
          Abonnez-vous pour voir tout le contenu
        </h3>
        <p style={{ opacity: 0.9, lineHeight: 1.7, marginBottom: '0.5rem', maxWidth: 500, margin: '0 auto 1.25rem' }}>
          Vous venez de voir l'aperçu gratuit. Débloquez l'intégralité de la formation :
          {hours ? <strong> {hours}h de contenu approfondi</strong> : ' tout le contenu'}, outils interactifs,
          calculateurs, graphiques animés, quiz et certification PDF.
        </p>

        {/* Benefits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', maxWidth: 440, margin: '0 auto 1.5rem', textAlign: 'left' }}>
          {[
            '12 modules complets', '150+ heures de contenu',
            'Outils & calculateurs interactifs', 'Graphiques animés',
            'Quiz de certification', 'Certificats PDF',
            'Mises à jour à vie', 'Accès mobile PWA'
          ].map(b => (
            <div key={b} style={{ display: 'flex', gap: 6, fontSize: '0.8125rem', alignItems: 'center' }}>
              <span style={{ color: '#86EFAC' }}>✓</span>
              <span style={{ opacity: 0.92 }}>{b}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '1.25rem 0' }}>
          <span style={{ fontSize: '2.25rem', fontWeight: 900 }}>49 USDT</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.125rem 0.5rem', borderRadius: 9999, textDecoration: 'line-through', fontSize: '0.8125rem', opacity: 0.8 }}>499 USDT</div>
            <div style={{ color: '#FCD34D', fontSize: '0.75rem', fontWeight: 700, marginTop: 2 }}>-90% aujourd'hui</div>
          </div>
        </div>

        <Link href="/payment" style={{
          background: 'white', color: '#0070BA', padding: '1rem 2.5rem',
          borderRadius: 9999, fontWeight: 700, textDecoration: 'none', fontSize: '1.0625rem',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          🚀 Abonnez-vous maintenant
        </Link>

        <p style={{ marginTop: '1.25rem', fontSize: '0.8125rem', opacity: 0.7 }}>
          ✓ Paiement unique · ✓ Accès à vie · ✓ Sans abonnement récurrent
        </p>
      </div>
    </div>
  )
}
