'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface UserRow {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string
  country: string
  status: string
  is_admin: boolean
  created_at: string
}

interface PaymentRow {
  id: string
  user_id: string
  amount: number
  currency: string
  transaction_hash: string
  status: string
  created_at: string
}

export default function AdminPanel() {
  const [authState, setAuthState] = useState<'checking' | 'denied' | 'granted'>('checking')
  const [users, setUsers] = useState<UserRow[]>([])
  const [payments, setPayments] = useState<PaymentRow[]>([])
  const [tab, setTab] = useState<'users' | 'payments'>('users')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setAuthState('denied'); return }
      const { data } = await supabase.from('users').select('is_admin').eq('id', user.id).single()
      if (data?.is_admin) {
        setAuthState('granted')
        loadData()
      } else {
        setAuthState('denied')
      }
    }
    check()
  }, [])

  const loadData = async () => {
    const { data: u } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    const { data: p } = await supabase.from('payments').select('*').order('created_at', { ascending: false })
    if (u) setUsers(u)
    if (p) setPayments(p)
  }

  const togglePremium = async (userId: string, current: string) => {
    const newStatus = current === 'premium' ? 'free' : 'premium'
    await supabase.from('users').update({ status: newStatus }).eq('id', userId)
    setMessage(`✅ Statut mis à jour : ${newStatus}`)
    loadData()
    setTimeout(() => setMessage(''), 3000)
  }

  // ============ ACCESS DENIED — looks like a 404 to hide the panel ============
  if (authState === 'checking') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #1E293B', borderTopColor: '#0070BA', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (authState === 'denied') {
    // Mimic a 404 page so the secret URL doesn't reveal an admin area exists
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', fontFamily: 'system-ui' }}>
        <h1 style={{ fontSize: '6rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>404</h1>
        <p style={{ color: '#64748B', fontSize: '1.125rem' }}>This page could not be found.</p>
        <button onClick={() => router.push('/')} style={{ marginTop: 16, background: '#0070BA', color: 'white', border: 'none', padding: '0.625rem 1.5rem', borderRadius: 9999, fontWeight: 600, cursor: 'pointer' }}>
          Retour à l'accueil
        </button>
      </div>
    )
  }

  // ============ ADMIN PANEL ============
  const filteredUsers = users.filter(u =>
    `${u.email} ${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: users.length,
    premium: users.filter(u => u.status === 'premium').length,
    revenue: payments.filter(p => p.status === 'confirmed').reduce((s, p) => s + Number(p.amount), 0),
    pending: payments.filter(p => p.status === 'pending').length,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', color: '#E2E8F0', fontFamily: 'system-ui' }}>
      {/* Header */}
      <div style={{ background: '#1E293B', borderBottom: '1px solid #334155', padding: '1rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #0070BA, #003087)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900 }}>F</span>
            </div>
            <div>
              <div style={{ fontWeight: 800, color: 'white' }}>ForexSchool Admin</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Panneau d'administration</div>
            </div>
          </div>
          <button onClick={() => { supabase.auth.signOut(); router.push('/') }} style={{ background: '#334155', color: '#E2E8F0', border: 'none', padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.875rem' }}>
            Déconnexion
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {message && <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22C55E', color: '#4ADE80', padding: '0.75rem 1rem', borderRadius: 10, marginBottom: '1.5rem' }}>{message}</div>}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Utilisateurs', value: stats.total, icon: '👥', color: '#0070BA' },
            { label: 'Membres Premium', value: stats.premium, icon: '⭐', color: '#F59E0B' },
            { label: 'Revenu total', value: `${stats.revenue} USDT`, icon: '💰', color: '#22C55E' },
            { label: 'Paiements en attente', value: stats.pending, icon: '⏳', color: '#EF4444' },
          ].map(s => (
            <div key={s.label} style={{ background: '#1E293B', borderRadius: 14, padding: '1.25rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
          {(['users', 'payments'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.625rem 1.25rem', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600,
              background: tab === t ? '#0070BA' : '#1E293B', color: tab === t ? 'white' : '#94A3B8'
            }}>
              {t === 'users' ? `👥 Utilisateurs (${users.length})` : `💳 Paiements (${payments.length})`}
            </button>
          ))}
        </div>

        {/* USERS TABLE */}
        {tab === 'users' && (
          <div style={{ background: '#1E293B', borderRadius: 14, border: '1px solid #334155', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #334155' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Rechercher par nom ou email..."
                style={{ width: '100%', padding: '0.625rem 1rem', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: 'white', fontSize: '0.875rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                <thead>
                  <tr style={{ background: '#0F172A' }}>
                    {['Nom', 'Email', 'Pays', 'Statut', 'Inscrit le', 'Action'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                        {u.first_name || u.last_name ? `${u.first_name || ''} ${u.last_name || ''}`.trim() : '—'}
                        {u.is_admin && <span style={{ marginLeft: 6, background: '#7C3AED', color: 'white', padding: '0.0625rem 0.375rem', borderRadius: 4, fontSize: '0.625rem' }}>ADMIN</span>}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#94A3B8' }}>{u.email}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#94A3B8' }}>{u.country || '—'}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ background: u.status === 'premium' ? 'rgba(245,158,11,0.2)' : 'rgba(100,116,139,0.2)', color: u.status === 'premium' ? '#FBBF24' : '#94A3B8', padding: '0.25rem 0.625rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700 }}>
                          {u.status === 'premium' ? '⭐ Premium' : 'Gratuit'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: '#64748B' }}>{new Date(u.created_at).toLocaleDateString('fr-FR')}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <button onClick={() => togglePremium(u.id, u.status)} style={{ background: u.status === 'premium' ? '#334155' : '#0070BA', color: 'white', border: 'none', padding: '0.375rem 0.75rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                          {u.status === 'premium' ? 'Retirer Premium' : 'Activer Premium'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>Aucun utilisateur trouvé.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENTS TABLE */}
        {tab === 'payments' && (
          <div style={{ background: '#1E293B', borderRadius: 14, border: '1px solid #334155', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                <thead>
                  <tr style={{ background: '#0F172A' }}>
                    {['Date', 'Montant', 'Devise', 'Adresse/Hash', 'Statut'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: '#94A3B8' }}>{new Date(p.created_at).toLocaleString('fr-FR')}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 700 }}>{p.amount}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{p.currency}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748B' }}>{p.transaction_hash?.substring(0, 24)}...</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ background: p.status === 'confirmed' ? 'rgba(34,197,94,0.2)' : p.status === 'pending' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)', color: p.status === 'confirmed' ? '#4ADE80' : p.status === 'pending' ? '#FBBF24' : '#F87171', padding: '0.25rem 0.625rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700 }}>
                          {p.status === 'confirmed' ? '✓ Confirmé' : p.status === 'pending' ? '⏳ En attente' : '✗ Échoué'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {payments.length === 0 && (
                    <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>Aucun paiement enregistré.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
