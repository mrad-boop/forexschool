'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type AuthState = 'checking' | 'denied' | 'need_passcode' | 'granted'

export default function AdminPanel() {
  const [authState, setAuthState] = useState<AuthState>('checking')
  const [passcode, setPasscode] = useState('')
  const [passError, setPassError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [currentUserId, setCurrentUserId] = useState('')

  const [users, setUsers] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [modules, setModules] = useState<any[]>([])
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [tab, setTab] = useState<'users' | 'modules' | 'payments' | 'settings'>('users')
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
        setCurrentUserId(user.id)
        // Admin user — but still requires passcode (session check)
        const sessionOk = sessionStorage.getItem('fs_admin_ok')
        if (sessionOk === user.id) {
          setAuthState('granted')
          loadData()
        } else {
          setAuthState('need_passcode')
        }
      } else {
        // Premium or free member → denied (fake 404)
        setAuthState('denied')
      }
    }
    check()
  }, [])

  const verifyPasscode = async () => {
    setVerifying(true); setPassError('')
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      })
      const data = await res.json()
      if (data.ok) {
        sessionStorage.setItem('fs_admin_ok', currentUserId)
        setAuthState('granted')
        loadData()
      } else {
        setPassError(data.error || 'Code incorrect')
      }
    } catch {
      setPassError('Erreur de vérification')
    }
    setVerifying(false)
  }

  const loadData = async () => {
    const { data: u } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    const { data: p } = await supabase.from('payments').select('*').order('created_at', { ascending: false })
    const { data: m } = await supabase.from('modules').select('*').order('order_index', { ascending: true })
    const { data: st } = await supabase.from('fs_settings').select('*')
    if (u) setUsers(u)
    if (p) setPayments(p)
    if (m) setModules(m)
    if (st) { const obj: Record<string,string> = {}; st.forEach((r:any) => obj[r.key] = r.value); setSettings(obj) }
  }

  const togglePremium = async (userId: string, current: string) => {
    const newStatus = current === 'premium' ? 'free' : 'premium'
    await supabase.from('users').update({ status: newStatus }).eq('id', userId)
    setMessage(`✅ Statut mis à jour : ${newStatus}`); loadData(); setTimeout(() => setMessage(''), 3000)
  }
  const saveModule = async (mod: any) => {
    await supabase.from('modules').update({ title: mod.title, description: mod.description, type: mod.type, category: mod.category, level: mod.level, duration_hours: mod.duration_hours }).eq('id', mod.id)
    setMessage('✅ Module enregistré'); setTimeout(() => setMessage(''), 3000)
  }
  const updateModuleField = (id: string, field: string, value: any) => setModules(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
  const saveSetting = async (key: string, value: string) => {
    await supabase.from('fs_settings').upsert({ key, value, updated_at: new Date().toISOString() })
    setMessage('✅ Paramètre enregistré'); setTimeout(() => setMessage(''), 3000)
  }
  const updateSettingField = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }))

  const logoutAdmin = () => {
    sessionStorage.removeItem('fs_admin_ok')
    router.push('/')
  }

  // ===== LOADING =====
  if (authState === 'checking') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: '#0070BA', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  // ===== DENIED → fake 404 (premium members & strangers see this) =====
  if (authState === 'denied') {
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

  // ===== ADMIN LOGIN (passcode) — site theme =====
  if (authState === 'need_passcode') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '1.5rem' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #0070BA, #003087)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: 24 }}>F</span>
            </div>
            <h1 style={{ fontWeight: 800, fontSize: '1.375rem', color: '#0F172A' }}>Espace Administration</h1>
            <p style={{ color: '#64748B', marginTop: 4, fontSize: '0.9375rem' }}>Accès réservé — code administrateur requis</p>
          </div>
          <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
            {passError && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.875rem', marginBottom: '1rem' }}>{passError}</div>}
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Code administrateur</label>
            <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)}
              placeholder="••••••••" autoFocus
              onKeyDown={e => e.key === 'Enter' && verifyPasscode()}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.9375rem', outline: 'none', boxSizing: 'border-box', marginBottom: '1rem' }} />
            <button onClick={verifyPasscode} disabled={verifying || !passcode} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', opacity: (verifying || !passcode) ? 0.6 : 1 }}>
              {verifying ? '⏳ Vérification...' : 'Accéder au panneau'}
            </button>
            <button onClick={() => router.push('/')} style={{ width: '100%', marginTop: 10, padding: '0.625rem', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.875rem' }}>
              Retour au site
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ===== ADMIN PANEL (granted) — site theme (light) =====
  const filteredUsers = users.filter(u => `${u.email} ${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase()))
  const stats = {
    total: users.length,
    premium: users.filter(u => u.status === 'premium').length,
    revenue: payments.filter(p => p.status === 'confirmed').reduce((s, p) => s + Number(p.amount), 0),
    pending: payments.filter(p => p.status === 'pending').length,
  }

  const inputStyle = { width: '100%', padding: '0.5rem 0.75rem', background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 8, color: '#1E293B', fontSize: '0.875rem', boxSizing: 'border-box' as const }
  const labelStyle = { fontSize: '0.75rem', color: '#64748B', display: 'block', marginBottom: 4, fontWeight: 600 }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', system-ui" }}>
      {/* Header — site theme */}
      <div style={{ background: 'linear-gradient(135deg, #003087, #0070BA)', padding: '1rem 1.5rem', color: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900 }}>F</span>
            </div>
            <div>
              <div style={{ fontWeight: 800 }}>ForexSchool — Administration</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Panneau de gestion</div>
            </div>
          </div>
          <button onClick={logoutAdmin} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1rem', borderRadius: 9999, cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>
            Quitter l'admin
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {message && <div style={{ background: '#D1FAE5', border: '1px solid #6EE7B7', color: '#059669', padding: '0.75rem 1rem', borderRadius: 10, marginBottom: '1.5rem', fontWeight: 500 }}>{message}</div>}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Utilisateurs', value: stats.total, icon: '👥', color: '#0070BA' },
            { label: 'Membres Premium', value: stats.premium, icon: '⭐', color: '#F59E0B' },
            { label: 'Revenu total', value: `${stats.revenue} USDT`, icon: '💰', color: '#059669' },
            { label: 'Paiements en attente', value: stats.pending, icon: '⏳', color: '#DC2626' },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {([
            ['users', `👥 Utilisateurs (${users.length})`],
            ['modules', `📚 Modules (${modules.length})`],
            ['payments', `💳 Paiements (${payments.length})`],
            ['settings', `⚙️ Paramètres`],
          ] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t as any)} style={{
              padding: '0.625rem 1.25rem', borderRadius: 10, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap',
              background: tab === t ? '#0070BA' : 'white', color: tab === t ? 'white' : '#475569', borderColor: tab === t ? '#0070BA' : '#E2E8F0'
            }}>{label}</button>
          ))}
        </div>

        {/* USERS */}
        {tab === 'users' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Rechercher par nom ou email..." style={{ ...inputStyle, padding: '0.625rem 1rem' }} />
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                <thead><tr style={{ background: '#F8FAFC' }}>
                  {['Nom', 'Email', 'Pays', 'Statut', 'Inscrit', 'Action'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#1E293B' }}>{u.first_name || u.last_name ? `${u.first_name||''} ${u.last_name||''}`.trim() : '—'}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#64748B' }}>{u.email}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#64748B' }}>{u.country || '—'}</td>
                      <td style={{ padding: '0.75rem 1rem' }}><span className={u.status === 'premium' ? 'badge-premium' : 'badge-free'}>{u.status === 'premium' ? '⭐ Premium' : 'Gratuit'}</span></td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: '#94A3B8' }}>{new Date(u.created_at).toLocaleDateString('fr-FR')}</td>
                      <td style={{ padding: '0.75rem 1rem' }}><button onClick={() => togglePremium(u.id, u.status)} style={{ background: u.status === 'premium' ? '#F1F5F9' : '#0070BA', color: u.status === 'premium' ? '#475569' : 'white', border: 'none', padding: '0.375rem 0.75rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>{u.status === 'premium' ? 'Retirer' : 'Activer Premium'}</button></td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8' }}>Aucun utilisateur.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULES */}
        {tab === 'modules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {modules.map(m => (
              <div key={m.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#94A3B8' }}>{m.id}</span>
                  <button onClick={() => saveModule(m)} className="btn-primary" style={{ padding: '0.375rem 1rem', fontSize: '0.8125rem' }}>💾 Enregistrer</button>
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div><label style={labelStyle}>Titre</label><input value={m.title} onChange={e => updateModuleField(m.id, 'title', e.target.value)} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Description</label><textarea value={m.description} onChange={e => updateModuleField(m.id, 'description', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10 }}>
                    <div><label style={labelStyle}>Type</label><select value={m.type} onChange={e => updateModuleField(m.id, 'type', e.target.value)} style={inputStyle}><option value="free">Gratuit</option><option value="premium">Premium</option></select></div>
                    <div><label style={labelStyle}>Catégorie</label><input value={m.category} onChange={e => updateModuleField(m.id, 'category', e.target.value)} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Niveau</label><input type="number" value={m.level} onChange={e => updateModuleField(m.id, 'level', Number(e.target.value))} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Heures</label><input type="number" value={m.duration_hours} onChange={e => updateModuleField(m.id, 'duration_hours', Number(e.target.value))} style={inputStyle} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAYMENTS */}
        {tab === 'payments' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                <thead><tr style={{ background: '#F8FAFC' }}>{['Date', 'Montant', 'Devise', 'Réf', 'Statut'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: '#64748B' }}>{new Date(p.created_at).toLocaleString('fr-FR')}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>{p.amount}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#475569' }}>{p.currency}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#94A3B8' }}>{p.transaction_hash?.substring(0, 20)}...</td>
                      <td style={{ padding: '0.75rem 1rem' }}><span className={p.status === 'confirmed' ? 'badge-free' : 'badge-premium'}>{p.status === 'confirmed' ? '✓ Confirmé' : p.status === 'pending' ? '⏳ Attente' : '✗ Échoué'}</span></td>
                    </tr>
                  ))}
                  {payments.length === 0 && <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8' }}>Aucun paiement.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { key: 'price_usdt', label: 'Prix actuel (USDT)', type: 'text' },
              { key: 'price_original', label: 'Prix barré (USDT)', type: 'text' },
              { key: 'hero_title', label: 'Titre principal (accueil)', type: 'text' },
              { key: 'hero_subtitle', label: 'Sous-titre (accueil)', type: 'textarea' },
              { key: 'btc_address', label: 'Adresse Bitcoin (réception)', type: 'text' },
              { key: 'usdt_address', label: 'Adresse USDT TRC-20', type: 'text' },
              { key: 'blockonomics_key', label: 'Clé API Blockonomics', type: 'text' },
              { key: 'admin_passcode', label: '🔑 Code administrateur', type: 'text' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: '0.8125rem', color: '#374151', display: 'block', marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {f.type === 'textarea'
                    ? <textarea value={settings[f.key] || ''} onChange={e => updateSettingField(f.key, e.target.value)} rows={2} style={{ ...inputStyle, padding: '0.625rem 0.875rem', resize: 'vertical', fontFamily: 'inherit' }} />
                    : <input value={settings[f.key] || ''} onChange={e => updateSettingField(f.key, e.target.value)} style={{ ...inputStyle, padding: '0.625rem 0.875rem' }} />}
                  <button onClick={() => saveSetting(f.key, settings[f.key] || '')} className="btn-primary" style={{ padding: '0 1rem', fontSize: '0.8125rem' }}>💾</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
