'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import ModuleCard from '@/components/ModuleCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { modulesData } from '@/lib/modules-data'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userStatus, setUserStatus] = useState<'free' | 'premium'>('free')
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      const { data: profile } = await supabase.from('users').select('status').eq('id', user.id).single()
      if (profile) setUserStatus(profile.status)
      setLoading(false)
    }
    getUser()
  }, [])

  const categories = ['Tous', ...Array.from(new Set(modulesData.map(m => m.category)))]
  const filtered = activeCategory === 'Tous' ? modulesData : modulesData.filter(m => m.category === activeCategory)
  const completedCount = 0
  const totalModules = modulesData.length
  const freeModules = modulesData.filter(m => m.type === 'free').length

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '4px solid #E2E8F0', borderTopColor: '#0070BA', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
        <p style={{ color: '#64748B' }}>Chargement...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  )

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#F8FAFC' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #003087, #0070BA)', padding: '2.5rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ opacity: 0.75, fontSize: '0.875rem', marginBottom: 4 }}>Bienvenue,</p>
                <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', marginBottom: 8 }}>
                  {user?.email?.split('@')[0]}
                </h1>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ 
                    background: userStatus === 'premium' ? '#F59E0B' : 'rgba(255,255,255,0.2)',
                    padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 700
                  }}>
                    {userStatus === 'premium' ? '⭐ Premium' : '🎓 Gratuit'}
                  </span>
                </div>
              </div>

              {userStatus === 'free' && (
                <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '1.25rem 1.5rem', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', maxWidth: 320 }}>
                  <p style={{ fontWeight: 700, marginBottom: 4 }}>🔓 Débloquez tout le contenu</p>
                  <p style={{ fontSize: '0.875rem', opacity: 0.85, marginBottom: 12 }}>Accès complet pour seulement 49 USDT</p>
                  <Link href="/payment" style={{ background: 'white', color: '#0070BA', padding: '0.5rem 1.25rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block' }}>
                    Débloquer maintenant →
                  </Link>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.875rem' }}>
                <span>Progression globale</span>
                <span style={{ fontWeight: 700 }}>{completedCount}/{totalModules} modules</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${(completedCount / totalModules) * 100}%`, background: '#86EFAC', borderRadius: 4, transition: 'width 0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
          {/* Category filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1rem', borderRadius: 9999, fontWeight: 600, fontSize: '0.875rem',
                  border: '1.5px solid', cursor: 'pointer', transition: 'all 0.15s',
                  background: activeCategory === cat ? '#0070BA' : 'white',
                  color: activeCategory === cat ? 'white' : '#475569',
                  borderColor: activeCategory === cat ? '#0070BA' : '#E2E8F0',
                }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(m => (
              <ModuleCard key={m.id} module={m} userStatus={userStatus} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
