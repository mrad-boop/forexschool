'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PaymentPage() {
  const [user, setUser] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [usdtAddress, setUsdtAddress] = useState('')
  const [priceUsdt, setPriceUsdt] = useState('49')
  const [priceOriginal, setPriceOriginal] = useState('499')
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user); setAuthChecked(true)
      const { data: st } = await supabase.from('fs_settings').select('key,value').in('key', ['usdt_bep20_address', 'price_usdt', 'price_original'])
      if (st) {
        st.forEach((r: any) => {
          if (r.key === 'usdt_bep20_address') setUsdtAddress(r.value || '')
          if (r.key === 'price_usdt') setPriceUsdt(r.value || '49')
          if (r.key === 'price_original') setPriceOriginal(r.value || '499')
        })
      }
    }
    init()
  }, [])

  const isEmailVerified = !!(user?.email_confirmed_at || user?.confirmed_at)

  const resendVerification = async () => {
    if (!user?.email) return
    setLoading(true); setError('')
    await supabase.auth.resend({ type: 'signup', email: user.email })
    setLoading(false)
    setError('📨 Email de vérification renvoyé.')
  }

  const recheckAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(usdtAddress)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    if (!txHash || txHash.length < 20) { setError('Veuillez entrer un hash de transaction valide.'); return }
    setLoading(true); setError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('payments').insert({
        user_id: user.id, amount: Number(priceUsdt), currency: 'USDT (BEP-20)',
        transaction_hash: txHash, status: 'pending'
      })
      setSubmitted(true)
    }
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#F8FAFC', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          {!submitted ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#0F172A', marginBottom: 8 }}>
                  Débloquer l'accès complet
                </h1>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FEF3C7', padding: '0.5rem 1.25rem', borderRadius: 9999 }}>
                  <span style={{ fontWeight: 700, color: '#92400E', fontSize: '1.125rem' }}>{priceUsdt} USDT</span>
                  <span style={{ color: '#D97706', fontSize: '0.875rem', textDecoration: 'line-through' }}>{priceOriginal} USDT</span>
                  <span style={{ background: '#F59E0B', color: 'white', padding: '0.125rem 0.5rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700 }}>-90%</span>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
                {error && <div style={{ background: error.startsWith('📨') ? '#D1FAE5' : '#FEE2E2', color: error.startsWith('📨') ? '#059669' : '#DC2626', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}

                {/* Not logged in */}
                {authChecked && !user && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ background: '#FEF3C7', color: '#92400E', padding: '1rem', borderRadius: 12, fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                      🔒 <strong>Connexion requise</strong><br />Connectez-vous et vérifiez votre email avant de payer.
                    </div>
                    <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>Se connecter / S'inscrire</Link>
                  </div>
                )}

                {/* Email not verified */}
                {authChecked && user && !isEmailVerified && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ background: '#FEF3C7', color: '#92400E', padding: '1rem', borderRadius: 12, fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                      📧 <strong>Vérifiez votre email</strong><br />Un lien a été envoyé à <strong>{user.email}</strong>.
                    </div>
                    <button onClick={resendVerification} disabled={loading} style={{ width: '100%', padding: '0.875rem', borderRadius: 9999, border: '2px solid #0070BA', background: 'white', color: '#0070BA', fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>
                      {loading ? '⏳' : '📨 Renvoyer l\'email'}
                    </button>
                    <button onClick={recheckAuth} style={{ width: '100%', padding: '0.625rem', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.8125rem' }}>↻ J'ai vérifié — Rafraîchir</button>
                  </div>
                )}

                {/* Verified — show payment */}
                {authChecked && user && isEmailVerified && (
                  <>
                    <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
                      <p style={{ fontWeight: 700, color: '#0F172A', marginBottom: 10, fontSize: '0.9375rem' }}>✅ Votre accès inclut :</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {['12 modules complets', '150+ heures', 'Outils interactifs', 'Quiz & certificats', 'Mises à jour à vie', 'Accès mobile'].map(item => (
                          <div key={item} style={{ fontSize: '0.8125rem', color: '#475569', display: 'flex', gap: 6 }}><span style={{ color: '#059669' }}>✓</span> {item}</div>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
                      <p style={{ fontWeight: 700, color: '#92400E', fontSize: '0.875rem', marginBottom: 4 }}>⚠️ Réseau BEP-20 (BNB Smart Chain)</p>
                      <p style={{ color: '#92400E', fontSize: '0.8125rem', margin: 0 }}>Envoyez exactement <strong>{priceUsdt} USDT</strong> via le réseau <strong>BEP-20 uniquement</strong>. Tout autre réseau entraînera une perte des fonds.</p>
                    </div>

                    {/* Address */}
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8125rem', color: '#374151', marginBottom: 6 }}>Adresse de réception USDT (BEP-20)</label>
                    {usdtAddress ? (
                      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
                        <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '0.75rem', wordBreak: 'break-all', fontSize: '0.8125rem', fontFamily: 'monospace', color: '#1E293B' }}>{usdtAddress}</div>
                        <button onClick={copyAddress} style={{ background: copied ? '#22C55E' : '#0070BA', color: 'white', border: 'none', padding: '0 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>{copied ? '✓' : 'Copier'}</button>
                      </div>
                    ) : (
                      <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
                        ⚠️ L'adresse de paiement n'est pas encore configurée. Contactez l'administrateur.
                      </div>
                    )}

                    {/* TX Hash */}
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8125rem', color: '#374151', marginBottom: 6 }}>Hash de transaction (après envoi)</label>
                    <input value={txHash} onChange={e => setTxHash(e.target.value)} placeholder="0x... collez le TxID de votre transaction"
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.8125rem', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', marginBottom: '1.5rem' }} />

                    <button onClick={handleSubmit} disabled={loading || !usdtAddress} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', opacity: (loading || !usdtAddress) ? 0.6 : 1 }}>
                      {loading ? '⏳ Envoi...' : '✅ J\'ai payé — Confirmer'}
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
                      🔒 Votre paiement sera vérifié manuellement sous 2-24h
                    </p>
                  </>
                )}
              </div>
            </>
          ) : (
            <div style={{ background: 'white', borderRadius: 20, padding: '3rem 2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: 8 }}>Paiement soumis !</h2>
              <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '2rem' }}>
                Votre transaction est en cours de vérification. Votre accès Premium sera activé sous 2-24h après confirmation. Vous recevrez une notification.
              </p>
              <Link href="/dashboard" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>Retour au tableau de bord →</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
