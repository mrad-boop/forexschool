'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Profile {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  city: string
  bio: string
  experience_level: string
  goal: string
  status: string
}

const emptyProfile: Profile = {
  first_name: '', last_name: '', email: '', phone: '',
  country: '', city: '', bio: '', experience_level: 'debutant', goal: '', status: 'free'
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUserId(user.id)
      const { data } = await supabase.from('users').select('*').eq('id', user.id).single()
      if (data) {
        setProfile({ ...emptyProfile, ...data, email: user.email || data.email })
      } else {
        setProfile({ ...emptyProfile, email: user.email || '' })
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true); setMessage('')
    const { error } = await supabase.from('users').update({
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
      country: profile.country,
      city: profile.city,
      bio: profile.bio,
      experience_level: profile.experience_level,
      goal: profile.goal,
      updated_at: new Date().toISOString()
    }).eq('id', userId)

    if (error) { setMessage('❌ Erreur : ' + error.message) }
    else { setMessage('✅ Profil mis à jour avec succès !') }
    setSaving(false)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const set = (field: keyof Profile, value: string) => setProfile(p => ({ ...p, [field]: value }))

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0',
    borderRadius: 10, fontSize: '0.9375rem', outline: 'none', boxSizing: 'border-box' as const
  }
  const labelStyle = { display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 48, height: 48, border: '4px solid #E2E8F0', borderTopColor: '#0070BA', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  const initials = `${profile.first_name[0] || ''}${profile.last_name[0] || ''}`.toUpperCase() || profile.email[0]?.toUpperCase() || '?'

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#F8FAFC' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #003087, #0070BA)', padding: '2.5rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, border: '3px solid rgba(255,255,255,0.3)' }}>
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h1 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: 4 }}>
                {profile.first_name || profile.last_name ? `${profile.first_name} ${profile.last_name}`.trim() : 'Mon Profil'}
              </h1>
              <p style={{ opacity: 0.85, fontSize: '0.9375rem' }}>{profile.email}</p>
              <span style={{ display: 'inline-block', marginTop: 8, background: profile.status === 'premium' ? '#F59E0B' : 'rgba(255,255,255,0.2)', padding: '0.25rem 0.875rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 700 }}>
                {profile.status === 'premium' ? '⭐ Membre Premium' : '🎓 Compte Gratuit'}
              </span>
            </div>
            {profile.status !== 'premium' && (
              <Link href="/payment" style={{ background: 'white', color: '#0070BA', padding: '0.625rem 1.25rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none', fontSize: '0.875rem' }}>
                🔓 Passer Premium
              </Link>
            )}
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {message && (
            <div style={{ background: message.startsWith('✅') ? '#D1FAE5' : '#FEE2E2', color: message.startsWith('✅') ? '#059669' : '#DC2626', padding: '0.875rem 1.25rem', borderRadius: 12, marginBottom: '1.5rem', fontWeight: 500 }}>
              {message}
            </div>
          )}

          <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0F172A', marginBottom: '1.5rem' }}>👤 Informations personnelles</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Prénom</label>
                  <input style={inputStyle} value={profile.first_name} onChange={e => set('first_name', e.target.value)} placeholder="Mohamed" />
                </div>
                <div>
                  <label style={labelStyle}>Nom</label>
                  <input style={inputStyle} value={profile.last_name} onChange={e => set('last_name', e.target.value)} placeholder="Ben Ali" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input style={{ ...inputStyle, background: '#F8FAFC', color: '#94A3B8' }} value={profile.email} disabled />
                <p style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: 4 }}>L'email ne peut pas être modifié</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Téléphone</label>
                  <input style={inputStyle} value={profile.phone} onChange={e => set('phone', e.target.value)} placeholder="+216 XX XXX XXX" />
                </div>
                <div>
                  <label style={labelStyle}>Pays</label>
                  <input style={inputStyle} value={profile.country} onChange={e => set('country', e.target.value)} placeholder="Tunisie" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Ville</label>
                <input style={inputStyle} value={profile.city} onChange={e => set('city', e.target.value)} placeholder="Tunis" />
              </div>
            </div>
          </div>

          {/* Trading profile */}
          <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0F172A', marginBottom: '1.5rem' }}>📈 Profil de trader</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Niveau d'expérience</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8 }}>
                  {[
                    { v: 'debutant', l: '🌱 Débutant' },
                    { v: 'intermediaire', l: '📊 Intermédiaire' },
                    { v: 'avance', l: '🎯 Avancé' },
                    { v: 'expert', l: '🏆 Expert' },
                  ].map(opt => (
                    <button key={opt.v} onClick={() => set('experience_level', opt.v)}
                      style={{
                        padding: '0.625rem', borderRadius: 10, border: '2px solid',
                        cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem', transition: 'all 0.15s',
                        background: profile.experience_level === opt.v ? '#E8F4FD' : 'white',
                        borderColor: profile.experience_level === opt.v ? '#0070BA' : '#E2E8F0',
                        color: profile.experience_level === opt.v ? '#0070BA' : '#64748B'
                      }}>
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Objectif principal</label>
                <input style={inputStyle} value={profile.goal} onChange={e => set('goal', e.target.value)} placeholder="Ex: Devenir trader à temps plein, générer un revenu complémentaire..." />
              </div>

              <div>
                <label style={labelStyle}>Bio / À propos de moi</label>
                <textarea
                  value={profile.bio} onChange={e => set('bio', e.target.value)}
                  placeholder="Parlez-nous de votre parcours et de vos motivations..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 1, minWidth: 180, justifyContent: 'center', padding: '0.875rem', opacity: saving ? 0.6 : 1 }}>
              {saving ? '⏳ Enregistrement...' : '💾 Enregistrer les modifications'}
            </button>
            <button onClick={handleLogout} style={{ padding: '0.875rem 1.5rem', borderRadius: 9999, border: '2px solid #FECACA', background: 'white', color: '#DC2626', fontWeight: 600, cursor: 'pointer', fontSize: '0.9375rem' }}>
              Se déconnecter
            </button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
