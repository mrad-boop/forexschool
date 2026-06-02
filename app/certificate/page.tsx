'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'

export default function CertificatePage() {
  const [user, setUser] = useState<any>(null)
  const [date] = useState(new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }))
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  const handlePrint = () => window.print()

  const studentName = user?.email?.split('@')[0] || 'Étudiant'

  return (
    <>
      <Navbar />
      <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <button onClick={handlePrint} style={{ background: '#0070BA', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 9999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.9375rem' }}>
              🖨️ Télécharger / Imprimer le certificat
            </button>
          </div>

          {/* Certificate */}
          <div id="certificate" style={{
            background: 'white', borderRadius: 20, padding: '4rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            border: '8px solid #0070BA',
            position: 'relative', overflow: 'hidden', textAlign: 'center'
          }}>
            {/* Decorative corners */}
            <div style={{ position: 'absolute', top: 20, left: 20, width: 60, height: 60, border: '3px solid #E8F4FD', borderRight: 'none', borderBottom: 'none' }}></div>
            <div style={{ position: 'absolute', top: 20, right: 20, width: 60, height: 60, border: '3px solid #E8F4FD', borderLeft: 'none', borderBottom: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: 20, left: 20, width: 60, height: 60, border: '3px solid #E8F4FD', borderRight: 'none', borderTop: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: 20, right: 20, width: 60, height: 60, border: '3px solid #E8F4FD', borderLeft: 'none', borderTop: 'none' }}></div>

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '2rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #0070BA, #003087)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: 24 }}>F</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A' }}>Forex<span style={{ color: '#0070BA' }}>School</span></span>
            </div>

            <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94A3B8', marginBottom: '1.5rem', fontWeight: 600 }}>
              Certificat de Formation
            </p>

            <p style={{ fontSize: '1rem', color: '#64748B', marginBottom: '1rem' }}>Ce certificat est décerné à</p>

            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#003087', marginBottom: '0.5rem', fontStyle: 'italic' }}>
              {studentName}
            </h2>

            <div style={{ width: 120, height: 3, background: 'linear-gradient(90deg, #0070BA, #003087)', margin: '1rem auto 1.5rem', borderRadius: 2 }}></div>

            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 1.5rem' }}>
              Pour avoir complété avec succès le programme de formation en<br />
              <strong style={{ color: '#0F172A' }}>Forex, Cryptomonnaies & Marchés Financiers</strong>
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', margin: '2rem 0', flexWrap: 'wrap' }}>
              {[
                { label: 'Modules validés', value: '12/12' },
                { label: 'Score moyen', value: '85%' },
                { label: 'Durée', value: '150h' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0070BA' }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Date d'émission</p>
                <p style={{ fontWeight: 700, color: '#1E293B' }}>{date}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, border: '2px solid #0070BA', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <span style={{ fontSize: 32 }}>🎓</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Numéro de certificat</p>
                <p style={{ fontWeight: 700, color: '#1E293B', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  FS-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media print {
            nav, button { display: none !important; }
            #certificate { border-radius: 0; box-shadow: none; }
            body { background: white; }
          }
        `}</style>
      </div>
    </>
  )
}
