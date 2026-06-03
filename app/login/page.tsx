'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0',
    borderRadius: 10, fontSize: '0.9375rem', outline: 'none',
    transition: 'border-color 0.2s', boxSizing: 'border-box' as const
  }

  const handleLogin = async () => {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
  }

  const handleSignup = async () => {
    setError(''); setSuccess('')

    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      setError('Veuillez renseigner votre nom et prénom.'); return
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.'); return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.'); return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { first_name: firstName.trim(), last_name: lastName.trim() }
      }
    })
    if (error) { setError(error.message); setLoading(false); return }
    setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription.')
    setLoading(false)
  }

  const passwordMatch = confirmPassword.length > 0 && password === confirmPassword
  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: 480 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #0070BA, #003087)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: 24 }}>F</span>
            </div>
            <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A' }}>ForexSchool</h1>
            <p style={{ color: '#64748B', marginTop: 4 }}>
              {tab === 'login' ? 'Connectez-vous à votre compte' : 'Créez votre compte gratuit'}
            </p>
          </div>

          <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 12, padding: 4, marginBottom: '1.5rem' }}>
              {(['login', 'signup'] as const).map(t => (
                <button key={t} onClick={() => { setTab(t); setError(''); setSuccess('') }}
                  style={{
                    flex: 1, padding: '0.625rem', border: 'none', cursor: 'pointer', borderRadius: 10,
                    fontWeight: 600, fontSize: '0.9375rem', transition: 'all 0.2s',
                    background: tab === t ? 'white' : 'transparent',
                    color: tab === t ? '#0070BA' : '#64748B',
                    boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
                  }}>
                  {t === 'login' ? 'Connexion' : 'Inscription'}
                </button>
              ))}
            </div>

            {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ background: '#D1FAE5', color: '#059669', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.875rem', marginBottom: '1rem' }}>{success}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* SIGNUP: First + Last name */}
              {tab === 'signup' && (
                <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Prénom</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Mohamed"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#0070BA')}
                      onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Nom</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Ben Ali"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#0070BA')}
                      onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#0070BA')}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Mot de passe</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#0070BA')}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                  onKeyDown={e => tab === 'login' && e.key === 'Enter' && handleLogin()} />
                {tab === 'signup' && password.length > 0 && password.length < 6 && (
                  <p style={{ color: '#F59E0B', fontSize: '0.75rem', marginTop: 4 }}>⚠️ Minimum 6 caractères</p>
                )}
              </div>

              {/* SIGNUP: Confirm password */}
              {tab === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Confirmer le mot de passe</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••"
                    style={{ ...inputStyle, borderColor: passwordMismatch ? '#EF4444' : passwordMatch ? '#22C55E' : '#E2E8F0' }}
                    onKeyDown={e => e.key === 'Enter' && handleSignup()} />
                  {passwordMismatch && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: 4 }}>✗ Les mots de passe ne correspondent pas</p>}
                  {passwordMatch && <p style={{ color: '#22C55E', fontSize: '0.75rem', marginTop: 4 }}>✓ Les mots de passe correspondent</p>}
                </div>
              )}

              <button
                onClick={tab === 'login' ? handleLogin : handleSignup}
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}
              >
                {loading ? '⏳ Chargement...' : tab === 'login' ? 'Se connecter' : 'Créer mon compte gratuit'}
              </button>
            </div>

            {tab === 'login' ? (
              <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: '#64748B' }}>
                Pas encore de compte ?{' '}
                <button onClick={() => setTab('signup')} style={{ color: '#0070BA', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  S'inscrire gratuitement
                </button>
              </p>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: '#64748B' }}>
                Déjà inscrit ?{' '}
                <button onClick={() => setTab('login')} style={{ color: '#0070BA', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  Se connecter
                </button>
              </p>
            )}
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: '#94A3B8', lineHeight: 1.6 }}>
            En vous inscrivant, vous acceptez nos{' '}
            <Link href="#" style={{ color: '#0070BA' }}>conditions d'utilisation</Link>.
          </p>
        </div>
      </main>
    </>
  )
}
