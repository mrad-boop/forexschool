'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SupportPage() {
  const [user, setUser] = useState<any>(null)
  const [tickets, setTickets] = useState<any[]>([])
  const [activeTicket, setActiveTicket] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'list' | 'new' | 'chat'>('list')
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('general')
  const [firstMsg, setFirstMsg] = useState('')
  const [reply, setReply] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      await loadTickets(user.id)
      setLoading(false)
    }
    load()
  }, [])

  const loadTickets = async (uid: string) => {
    const { data } = await supabase.from('fs_tickets').select('*').eq('user_id', uid).order('updated_at', { ascending: false })
    if (data) setTickets(data)
  }

  const openTicket = async (ticket: any) => {
    setActiveTicket(ticket); setView('chat')
    const { data } = await supabase.from('fs_ticket_messages').select('*').eq('ticket_id', ticket.id).order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  const createTicket = async () => {
    if (!subject.trim() || !firstMsg.trim()) return
    const { data: ticket } = await supabase.from('fs_tickets').insert({
      user_id: user.id, email: user.email, subject: subject.trim(), category, status: 'open'
    }).select().single()
    if (ticket) {
      await supabase.from('fs_ticket_messages').insert({ ticket_id: ticket.id, sender: 'user', message: firstMsg.trim() })
      setSubject(''); setFirstMsg(''); setCategory('general')
      await loadTickets(user.id)
      openTicket(ticket)
    }
  }

  const sendReply = async () => {
    if (!reply.trim() || !activeTicket) return
    await supabase.from('fs_ticket_messages').insert({ ticket_id: activeTicket.id, sender: 'user', message: reply.trim() })
    await supabase.from('fs_tickets').update({ status: 'open', updated_at: new Date().toISOString() }).eq('id', activeTicket.id)
    setReply('')
    const { data } = await supabase.from('fs_ticket_messages').select('*').eq('ticket_id', activeTicket.id).order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  const statusBadge = (s: string) => {
    const map: Record<string, { bg: string; c: string; l: string }> = {
      open: { bg: '#DBEAFE', c: '#1E40AF', l: '🔵 Ouvert' },
      pending: { bg: '#FEF3C7', c: '#92400E', l: '🟡 En cours' },
      closed: { bg: '#F1F5F9', c: '#64748B', l: '⚪ Fermé' },
    }
    const m = map[s] || map.open
    return <span style={{ background: m.bg, color: m.c, padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700 }}>{m.l}</span>
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: '#0070BA', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#F8FAFC' }}>
        <div style={{ background: 'linear-gradient(135deg, #003087, #0070BA)', padding: '2rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', marginBottom: 4 }}>🎫 Support & Assistance</h1>
            <p style={{ opacity: 0.85, fontSize: '0.9375rem' }}>Une question ? Un problème ? Notre équipe vous répond.</p>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {/* LIST VIEW */}
          {view === 'list' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 12 }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0F172A', margin: 0 }}>Mes tickets ({tickets.length})</h2>
                <button onClick={() => setView('new')} className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}>+ Nouveau ticket</button>
              </div>

              {tickets.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                  <div style={{ fontSize: 48, marginBottom: '1rem' }}>📭</div>
                  <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>Vous n'avez aucun ticket pour le moment.</p>
                  <button onClick={() => setView('new')} className="btn-primary">Créer mon premier ticket</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {tickets.map(t => (
                    <div key={t.id} onClick={() => openTicket(t)} className="card" style={{ cursor: 'pointer', padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <h3 style={{ fontWeight: 700, color: '#0F172A', margin: '0 0 4px', fontSize: '0.9375rem' }}>{t.subject}</h3>
                          <p style={{ color: '#94A3B8', fontSize: '0.8125rem', margin: 0 }}>{new Date(t.created_at).toLocaleString('fr-FR')}</p>
                        </div>
                        {statusBadge(t.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* NEW TICKET */}
          {view === 'new' && (
            <div className="card" style={{ padding: '2rem' }}>
              <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#0070BA', cursor: 'pointer', fontWeight: 600, marginBottom: '1.5rem', padding: 0 }}>← Retour</button>
              <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0F172A', marginBottom: '1.5rem' }}>Nouveau ticket</h2>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Catégorie</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.9375rem', boxSizing: 'border-box' }}>
                  <option value="general">Question générale</option>
                  <option value="payment">Problème de paiement</option>
                  <option value="access">Accès / Compte</option>
                  <option value="content">Contenu / Formation</option>
                  <option value="technical">Problème technique</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Sujet</label>
                <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Résumé de votre demande"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.9375rem', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: 6 }}>Message</label>
                <textarea value={firstMsg} onChange={e => setFirstMsg(e.target.value)} rows={5} placeholder="Décrivez votre demande en détail..."
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.9375rem', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              <button onClick={createTicket} disabled={!subject.trim() || !firstMsg.trim()} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', opacity: (!subject.trim() || !firstMsg.trim()) ? 0.5 : 1 }}>
                Envoyer le ticket
              </button>
            </div>
          )}

          {/* CHAT VIEW */}
          {view === 'chat' && activeTicket && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <button onClick={() => { setView('list'); loadTickets(user.id) }} style={{ background: 'none', border: 'none', color: '#0070BA', cursor: 'pointer', fontWeight: 600, padding: 0, fontSize: '0.8125rem', marginBottom: 4 }}>← Tickets</button>
                  <h3 style={{ fontWeight: 700, color: '#0F172A', margin: 0, fontSize: '1rem' }}>{activeTicket.subject}</h3>
                </div>
                {statusBadge(activeTicket.status)}
              </div>

              <div style={{ padding: '1.25rem', maxHeight: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, background: '#F8FAFC' }}>
                {messages.map(m => (
                  <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '80%', background: m.sender === 'user' ? '#0070BA' : 'white', color: m.sender === 'user' ? 'white' : '#1E293B', padding: '0.75rem 1rem', borderRadius: 14, border: m.sender === 'user' ? 'none' : '1px solid #E2E8F0', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.6875rem', opacity: 0.7, marginBottom: 4 }}>{m.sender === 'user' ? 'Vous' : '🎧 Support'}</div>
                      {m.message}
                    </div>
                  </div>
                ))}
              </div>

              {activeTicket.status !== 'closed' && (
                <div style={{ padding: '1rem', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 8 }}>
                  <input value={reply} onChange={e => setReply(e.target.value)} placeholder="Votre réponse..." onKeyDown={e => e.key === 'Enter' && sendReply()}
                    style={{ flex: 1, padding: '0.75rem 1rem', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.9375rem', boxSizing: 'border-box' }} />
                  <button onClick={sendReply} disabled={!reply.trim()} className="btn-primary" style={{ padding: '0 1.25rem', opacity: !reply.trim() ? 0.5 : 1 }}>Envoyer</button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
