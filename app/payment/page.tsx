'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import QRCode from 'qrcode'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Step = 'intro' | 'paying' | 'success'

export default function PaymentPage() {
  const [step, setStep] = useState<Step>('intro')
  const [user, setUser] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [payment, setPayment] = useState<{ address: string; btcAmount: string; btcPrice: number } | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [status, setStatus] = useState<'pending' | 'detected' | 'confirmed'>('pending')
  const [timeLeft, setTimeLeft] = useState(900) // 15 min
  const [copied, setCopied] = useState(false)
  const pollRef = useRef<NodeJS.Timeout | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: any } }) => { setUser(user); setAuthChecked(true) })
  }, [])

  // Countdown timer
  useEffect(() => {
    if (step !== 'paying' || timeLeft <= 0) return
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [step, timeLeft])

  // Poll payment status
  useEffect(() => {
    if (step !== 'paying' || !payment) return

    const poll = async () => {
      try {
        const res = await fetch(`/api/payment/status?address=${payment.address}`)
        const data = await res.json()
        if (data.status === 'detected' && status === 'pending') {
          setStatus('detected')
        }
        if (data.status === 'confirmed') {
          setStatus('confirmed')
          await activatePremium()
          setStep('success')
          if (pollRef.current) clearInterval(pollRef.current)
        }
      } catch {}
    }

    pollRef.current = setInterval(poll, 8000)
    poll()
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [step, payment, status])

  const activatePremium = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user && payment) {
      await supabase.from('payments').insert({
        user_id: user.id, amount: 49, currency: 'BTC',
        transaction_hash: payment.address, status: 'confirmed'
      })
      await supabase.from('users').update({ status: 'premium' }).eq('id', user.id)
    }
  }

  const isEmailVerified = !!(user?.email_confirmed_at || user?.confirmed_at)

  const resendVerification = async () => {
    if (!user?.email) return
    setLoading(true); setError('')
    const { error } = await supabase.auth.resend({ type: 'signup', email: user.email })
    if (error) setError(error.message)
    else setError('')
    setLoading(false)
  }

  const recheckAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const startPayment = async () => {
    if (!user) { setError('Vous devez être connecté pour effectuer un paiement.'); return }
    if (!isEmailVerified) { setError('Veuillez confirmer votre adresse email avant de payer. Vérifiez votre boîte de réception.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, email: user?.email })
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }

      setPayment({ address: data.address, btcAmount: data.btcAmount, btcPrice: data.btcPrice })

      // Generate QR code (BIP21 URI with amount)
      const uri = `bitcoin:${data.address}?amount=${data.btcAmount}`
      const qr = await QRCode.toDataURL(uri, { width: 280, margin: 1, color: { dark: '#0F172A', light: '#FFFFFF' } })
      setQrDataUrl(qr)

      setStep('paying')
    } catch (e: any) {
      setError('Erreur de connexion au système de paiement.')
    }
    setLoading(false)
  }

  const copyAddress = () => {
    if (payment) {
      navigator.clipboard.writeText(payment.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#F8FAFC', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>

          {/* ============ INTRO ============ */}
          {step === 'intro' && (
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
                <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: 700, color: '#0F172A', marginBottom: 10, fontSize: '0.9375rem' }}>✅ Votre accès inclut :</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {['12 modules complets', '150+ heures', 'Outils interactifs', 'Graphiques animés', 'Quiz & certificats', 'Mises à jour à vie', 'Accès PWA mobile', 'Support'].map(item => (
                      <div key={item} style={{ fontSize: '0.8125rem', color: '#475569', display: 'flex', gap: 6 }}>
                        <span style={{ color: '#059669' }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                </div>

                {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}

                {/* Not logged in */}
                {authChecked && !user && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ background: '#FEF3C7', color: '#92400E', padding: '1rem', borderRadius: 12, fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                      🔒 <strong>Connexion requise.</strong><br />
                      Vous devez être connecté et avoir vérifié votre email pour effectuer un paiement sécurisé.
                    </div>
                    <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}>
                      Se connecter / S'inscrire
                    </Link>
                  </div>
                )}

                {/* Logged in but email not verified */}
                {authChecked && user && !isEmailVerified && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ background: '#FEF3C7', color: '#92400E', padding: '1rem', borderRadius: 12, fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                      📧 <strong>Vérifiez votre email.</strong><br />
                      Un lien de confirmation a été envoyé à <strong>{user.email}</strong>. Cliquez dessus avant de payer.
                    </div>
                    <button onClick={resendVerification} disabled={loading} style={{ width: '100%', padding: '0.875rem', borderRadius: 9999, border: '2px solid #0070BA', background: 'white', color: '#0070BA', fontWeight: 600, cursor: 'pointer', fontSize: '0.9375rem', marginBottom: 8 }}>
                      {loading ? '⏳ Envoi...' : '📨 Renvoyer l\'email de vérification'}
                    </button>
                    <button onClick={recheckAuth} style={{ width: '100%', padding: '0.625rem', borderRadius: 9999, border: 'none', background: 'transparent', color: '#64748B', fontWeight: 600, cursor: 'pointer', fontSize: '0.8125rem' }}>
                      ↻ J'ai déjà vérifié — Rafraîchir
                    </button>
                  </div>
                )}

                {/* Logged in + verified */}
                {authChecked && user && isEmailVerified && (
                  <button onClick={startPayment} disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', opacity: loading ? 0.6 : 1 }}>
                    {loading ? '⏳ Génération de l\'adresse...' : '₿ Payer en Bitcoin'}
                  </button>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: '1rem', justifyContent: 'center' }}>
                  <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Paiement sécurisé via</span>
                  <span style={{ color: '#0070BA', fontWeight: 700, fontSize: '0.8125rem' }}>Blockonomics</span>
                </div>
              </div>
            </>
          )}

          {/* ============ PAYING ============ */}
          {step === 'paying' && payment && (
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>

              {/* Status banner */}
              <div style={{
                background: status === 'detected' ? '#FEF3C7' : status === 'confirmed' ? '#D1FAE5' : '#E8F4FD',
                borderRadius: 12, padding: '1rem', marginBottom: '1.5rem', textAlign: 'center'
              }}>
                {status === 'pending' && (
                  <div style={{ color: '#0369A1' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0070BA', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                      <strong>En attente de votre paiement...</strong>
                    </div>
                  </div>
                )}
                {status === 'detected' && (
                  <div style={{ color: '#92400E' }}>
                    🔍 <strong>Transaction détectée !</strong> En attente de confirmation blockchain...
                  </div>
                )}
                {status === 'confirmed' && (
                  <div style={{ color: '#059669' }}>✅ <strong>Paiement confirmé !</strong></div>
                )}
              </div>

              {/* Timer */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ color: '#64748B', fontSize: '0.8125rem' }}>Cours valable encore</div>
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: timeLeft < 120 ? '#DC2626' : '#0F172A', fontFamily: 'monospace' }}>
                  {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                </div>
              </div>

              {/* QR Code */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: 'white', borderRadius: 16, border: '2px solid #E2E8F0' }}>
                  {qrDataUrl && <img src={qrDataUrl} alt="QR Code paiement" style={{ width: 220, height: 220, display: 'block' }} />}
                </div>
              </div>

              {/* Amount */}
              <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#64748B', fontSize: '0.8125rem', marginBottom: 4 }}>Montant exact à envoyer</div>
                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#0F172A', fontFamily: 'monospace' }}>{payment.btcAmount} BTC</div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>≈ 49 USD · 1 BTC = ${payment.btcPrice.toLocaleString()}</div>
              </div>

              {/* Address */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8125rem', color: '#374151', marginBottom: 6 }}>Adresse Bitcoin (unique à votre commande)</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '0.75rem', wordBreak: 'break-all', fontSize: '0.8125rem', fontFamily: 'monospace', color: '#1E293B' }}>
                    {payment.address}
                  </div>
                  <button onClick={copyAddress} style={{ background: copied ? '#22C55E' : '#0070BA', color: 'white', border: 'none', padding: '0 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                    {copied ? '✓ Copié' : 'Copier'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '0.875rem', fontSize: '0.8125rem', color: '#1E40AF', lineHeight: 1.5 }}>
                ℹ️ Scannez le QR code avec votre wallet Bitcoin ou copiez l'adresse. La détection est <strong>automatique</strong> — votre accès s'activera dès confirmation. Aucune action manuelle requise.
              </div>

              <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.75rem', marginTop: '1rem' }}>
                🔒 Cette page se met à jour automatiquement toutes les 8 secondes
              </p>
            </div>
          )}

          {/* ============ SUCCESS ============ */}
          {step === 'success' && (
            <div style={{ background: 'white', borderRadius: 20, padding: '3rem 2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: 8 }}>Paiement confirmé !</h2>
              <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '2rem' }}>
                Félicitations ! Votre accès Premium est maintenant <strong>activé</strong>. Vous avez accès à l'intégralité de la formation.
              </p>
              <Link href="/dashboard" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                Accéder à ma formation →
              </Link>
            </div>
          )}

        </div>
      </main>
      <Footer />
      <style>{`@keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.3 } }`}</style>
    </>
  )
}
