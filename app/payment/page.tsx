'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const USDT_ADDRESS = 'TYourUSDTAddressHere'
const BTC_ADDRESS = 'YourBTCAddressHere'
const AMOUNT_USDT = 49
const AMOUNT_USD = 49

export default function PaymentPage() {
  const [user, setUser] = useState<any>(null)
  const [step, setStep] = useState<'select' | 'pay' | 'confirm'>('select')
  const [currency, setCurrency] = useState<'USDT' | 'BTC'>('USDT')
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  const handleSubmitPayment = async () => {
    if (!txHash || txHash.length < 20) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase.from('payments').insert({
        user_id: user.id, amount: AMOUNT_USDT, currency,
        transaction_hash: txHash, status: 'pending'
      })
      await supabase.from('users').upsert({ id: user.id, email: user.email, status: 'premium' })
      setSubmitted(true)
    } else {
      localStorage.setItem('pending_payment', JSON.stringify({ txHash, currency, amount: AMOUNT_USDT }))
      setSubmitted(true)
    }
    setLoading(false)
  }

  const address = currency === 'USDT' ? USDT_ADDRESS : BTC_ADDRESS

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
                  <span style={{ fontWeight: 700, color: '#92400E', fontSize: '1.125rem' }}>49 USDT</span>
                  <span style={{ color: '#D97706', fontSize: '0.875rem', textDecoration: 'line-through' }}>499 USDT</span>
                  <span style={{ background: '#F59E0B', color: 'white', padding: '0.125rem 0.5rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700 }}>-90%</span>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
                {/* What's included */}
                <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: 700, color: '#0F172A', marginBottom: 10, fontSize: '0.9375rem' }}>✅ Votre accès inclut :</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {['12 modules complets', '150+ heures', 'Forex & Crypto (5 niveaux)', 'Marché des Actions (80h)', 'Gestion de Portefeuille', 'Analyste Financier', 'Quiz interactifs', 'Certificats PDF', 'Mises à jour à vie', 'Accès PWA mobile'].map(item => (
                      <div key={item} style={{ fontSize: '0.8125rem', color: '#475569', display: 'flex', gap: 6 }}>
                        <span style={{ color: '#059669' }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Currency selector */}
                <p style={{ fontWeight: 600, marginBottom: 10, color: '#374151' }}>Choisissez votre cryptomonnaie :</p>
                <div style={{ display: 'flex', gap: 10, marginBottom: '1.5rem' }}>
                  {(['USDT', 'BTC'] as const).map(c => (
                    <button key={c} onClick={() => setCurrency(c)}
                      style={{
                        flex: 1, padding: '0.875rem', border: '2px solid', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '1rem', transition: 'all 0.2s',
                        background: currency === c ? '#0070BA' : 'white',
                        color: currency === c ? 'white' : '#475569',
                        borderColor: currency === c ? '#0070BA' : '#E2E8F0'
                      }}>
                      {c === 'USDT' ? '₮ USDT (TRC-20)' : '₿ Bitcoin'}
                    </button>
                  ))}
                </div>

                {/* Address display */}
                <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>
                      Envoyez {currency === 'USDT' ? '49 USDT' : '~0.00075 BTC'} à cette adresse :
                    </p>
                    <button onClick={() => navigator.clipboard.writeText(address)}
                      style={{ background: '#E8F4FD', color: '#0070BA', border: 'none', padding: '0.25rem 0.75rem', borderRadius: 8, fontSize: '0.8125rem', cursor: 'pointer', fontWeight: 600 }}>
                      Copier
                    </button>
                  </div>
                  <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 8, padding: '0.75rem', wordBreak: 'break-all', fontSize: '0.8125rem', fontFamily: 'monospace', color: '#1E293B' }}>
                    {address}
                  </div>
                  {currency === 'USDT' && (
                    <p style={{ fontSize: '0.75rem', color: '#F59E0B', marginTop: 8 }}>
                      ⚠️ Réseau TRC-20 (TRON) uniquement. N'utilisez pas ERC-20.
                    </p>
                  )}
                </div>

                {/* TX Hash input */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 8 }}>
                    Hash de transaction (après envoi) :
                  </label>
                  <input
                    value={txHash} onChange={e => setTxHash(e.target.value)}
                    placeholder="Collez ici le hash/TxID de votre transaction"
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.875rem', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = '#0070BA')}
                    onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>

                <button
                  onClick={handleSubmitPayment}
                  disabled={loading || txHash.length < 20}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', opacity: (loading || txHash.length < 20) ? 0.6 : 1, cursor: (loading || txHash.length < 20) ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? '⏳ Traitement...' : '✅ Confirmer mon paiement'}
                </button>

                {!user && (
                  <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: '#64748B' }}>
                    Vous n'êtes pas connecté.{' '}
                    <Link href="/login" style={{ color: '#0070BA', fontWeight: 600 }}>Connectez-vous</Link>
                    {' '}pour que l'accès soit appliqué automatiquement.
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: '1.5rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1rem 1.25rem' }}>
                <span style={{ fontSize: 20 }}>🔒</span>
                <div style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5 }}>
                  <strong style={{ color: '#374151' }}>Paiement 100% sécurisé.</strong>{' '}
                  La vérification manuelle se fait dans un délai de 2-24h. L'accès est activé dès confirmation de la transaction sur la blockchain.
                </div>
              </div>
            </>
          ) : (
            <div style={{ background: 'white', borderRadius: 20, padding: '3rem 2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: 8 }}>
                Paiement soumis avec succès !
              </h2>
              <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '2rem' }}>
                Votre transaction est en cours de vérification. Vous recevrez un email de confirmation et votre accès sera activé sous 2-24 heures.
              </p>
              <div style={{ background: '#D1FAE5', border: '1px solid #A7F3D0', borderRadius: 12, padding: '1rem', marginBottom: '2rem', fontSize: '0.875rem', color: '#065F46' }}>
                <strong>Transaction enregistrée :</strong> {txHash.substring(0, 20)}...
              </div>
              <Link href="/dashboard" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                Accéder à mon tableau de bord →
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
