'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: any } }) => setLoggedIn(!!user))
  }, [])

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'white', borderBottom: '1px solid #E2E8F0', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #0070BA, #003087)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 16 }}>F</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#0F172A' }}>
            Forex<span style={{ color: '#0070BA' }}>School</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
          <Link href="/#modules" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem' }}>Modules</Link>
          <Link href="/#pricing" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem' }}>Tarifs</Link>
          {loggedIn ? (
            <>
              <Link href="/dashboard" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem' }}>Dashboard</Link>
              <Link href="/profile" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                👤 Profil
              </Link>
            </>
          ) : (
            <Link href="/login" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem' }}>Connexion</Link>
          )}
          <Link href="/payment" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>
            {loggedIn ? 'Passer Premium' : 'Commencer – 49 USDT'}
          </Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} className="mobile-menu-btn">
          <div style={{ width: 24, height: 2, background: '#334155', marginBottom: 5, borderRadius: 2 }}></div>
          <div style={{ width: 24, height: 2, background: '#334155', marginBottom: 5, borderRadius: 2 }}></div>
          <div style={{ width: 24, height: 2, background: '#334155', borderRadius: 2 }}></div>
        </button>
      </div>

      {menuOpen && (
        <div style={{ padding: '1rem 1.5rem 1.5rem', borderTop: '1px solid #E2E8F0', background: 'white' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/#modules" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }} onClick={() => setMenuOpen(false)}>Modules</Link>
            <Link href="/#pricing" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }} onClick={() => setMenuOpen(false)}>Tarifs</Link>
            {loggedIn ? (
              <>
                <Link href="/dashboard" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link href="/profile" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }} onClick={() => setMenuOpen(false)}>👤 Profil</Link>
              </>
            ) : (
              <Link href="/login" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }} onClick={() => setMenuOpen(false)}>Connexion</Link>
            )}
            <Link href="/payment" className="btn-primary" style={{ textAlign: 'center', fontSize: '0.9375rem' }} onClick={() => setMenuOpen(false)}>
              {loggedIn ? 'Passer Premium' : 'Commencer – 49 USDT'}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
