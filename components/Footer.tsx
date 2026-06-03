import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '3rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #0070BA, #003087)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: 16 }}>F</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'white' }}>ForexSchool</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              La référence francophone pour la formation en trading et finance de marché.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>Formations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/dashboard" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>Forex & Crypto</Link>
              <Link href="/dashboard" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>Marché des Actions</Link>
              <Link href="/dashboard" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>Gestion de Portefeuille</Link>
              <Link href="/dashboard" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>Analyse Financière</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>Compte</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/login" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>Connexion</Link>
              <Link href="/login?tab=signup" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>Inscription gratuite</Link>
              <Link href="/payment" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>Accès Premium</Link>
              <Link href="/dashboard" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>Mon tableau de bord</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>Paiement sécurisé</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['₮ USDT (BEP-20)'].map(c => (
                <span key={c} style={{ background: '#1E293B', padding: '0.35rem 0.75rem', borderRadius: 8, fontSize: '0.8125rem', color: '#CBD5E1' }}>{c}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.8125rem', marginTop: '1rem', lineHeight: 1.5 }}>
              Paiement unique · Accès à vie · 100% sécurisé
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1E293B', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.8125rem' }}>© 2026 ForexSchool. Tous droits réservés.</p>
          <p style={{ fontSize: '0.8125rem' }}>⚠️ Le trading comporte des risques. Les performances passées ne garantissent pas les résultats futurs.</p>
        </div>
      </div>
    </footer>
  )
}
