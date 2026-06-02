import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ModuleCard from '@/components/ModuleCard'
import { modulesData } from '@/lib/modules-data'

export default function Home() {
  const freeModules = modulesData.slice(0, 4)
  const stats = [
    { value: '150+', label: 'Heures de formation' },
    { value: '12', label: 'Modules complets' },
    { value: '4', label: 'Domaines financiers' },
    { value: '49$', label: 'Accès à vie (au lieu de 499$)' },
  ]

  const features = [
    { icon: '📈', title: 'Forex & Cryptomonnaies', desc: '5 niveaux progressifs couvrant toutes les stratégies de trading, de débutant à expert.' },
    { icon: '🏦', title: 'Marché des Actions', desc: '80h de contenu sur la bourse, l\'analyse fondamentale et technique des actions.' },
    { icon: '💼', title: 'Gestion de Portefeuille', desc: 'Construisez et optimisez votre portefeuille avec les méthodes des professionnels.' },
    { icon: '📊', title: 'Analyste Financier', desc: 'Modélisation Excel, DCF, valorisation d\'entreprises comme en banque d\'investissement.' },
    { icon: '🎓', title: 'Certification PDF', desc: 'Obtenez votre certificat de réussite après chaque module avec quiz validé.' },
    { icon: '🔄', title: 'Mises à jour incluses', desc: 'Le contenu est régulièrement mis à jour pour refléter les évolutions des marchés.' },
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section style={{
          background: 'linear-gradient(135deg, #003087 0%, #0070BA 50%, #00A3E0 100%)',
          color: 'white', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', padding: '0.5rem 1.25rem', borderRadius: 9999, marginBottom: '1.5rem', backdropFilter: 'blur(8px)' }}>
              <span style={{ fontSize: 14 }}>🔥</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Offre limitée : 49 USDT au lieu de 499 USDT</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Maîtrisez les Marchés<br />
              <span style={{ color: '#7DD3FC' }}>Financiers Mondiaux</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.9, lineHeight: 1.7, maxWidth: 640, margin: '0 auto 2.5rem' }}>
              Formation complète en Forex, Cryptomonnaies, Actions et Gestion de Portefeuille. 
              150+ heures de contenu expert. Accès à vie pour un paiement unique.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/payment" style={{
                background: 'white', color: '#0070BA', padding: '1rem 2rem',
                borderRadius: 9999, fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)', transition: 'all 0.2s'
              }}>
                🚀 Débloquer tout pour 49 USDT
              </Link>
              <Link href="/#modules" style={{
                background: 'rgba(255,255,255,0.15)', color: 'white', padding: '1rem 2rem',
                borderRadius: 9999, fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                Voir les modules gratuits
              </Link>
            </div>

            <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', opacity: 0.75 }}>
              ✓ Paiement unique &nbsp;·&nbsp; ✓ Accès à vie &nbsp;·&nbsp; ✓ Certificat inclus &nbsp;·&nbsp; ✓ Mises à jour gratuites
            </p>
          </div>
        </section>

        {/* STATS */}
        <section style={{ background: '#F8FAFC', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {stats.map(s => (
              <div key={s.value} style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0070BA', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FREE MODULES PREVIEW */}
        <section id="modules" style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ background: '#E8F4FD', color: '#0070BA', padding: '0.35rem 1rem', borderRadius: 9999, fontSize: '0.875rem', fontWeight: 600 }}>
                Aperçu gratuit
              </span>
              <h2 className="section-title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                Commencez à apprendre gratuitement
              </h2>
              <p className="section-subtitle">
                Accédez immédiatement à nos modules d'introduction. Aucune inscription requise.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {freeModules.map(m => (
                <ModuleCard key={m.id} module={m} userStatus={null} />
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #E8F4FD, #F0F9FF)',
                border: '2px solid #0070BA', borderRadius: 20,
                padding: '2.5rem', maxWidth: 600, margin: '0 auto'
              }}>
                <div style={{ fontSize: 48, marginBottom: '1rem' }}>🔓</div>
                <h3 style={{ fontWeight: 800, fontSize: '1.375rem', color: '#0F172A', marginBottom: 8 }}>
                  Débloquez tout le contenu
                </h3>
                <p style={{ color: '#64748B', marginBottom: '0.5rem', lineHeight: 1.6 }}>
                  12 modules complets · 150+ heures · 4 domaines · Certificats PDF
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '1.5rem 0' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: '#0070BA' }}>49 USDT</span>
                  <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.25rem 0.75rem', borderRadius: 9999, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'line-through' }}>499 USDT</span>
                </div>
                <Link href="/payment" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                  Accès immédiat pour 49 USDT →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ background: '#F8FAFC', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>
                Tout ce dont vous avez besoin pour réussir
              </h2>
              <p className="section-subtitle">
                Une formation structurée, du débutant au niveau professionnel.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {features.map(f => (
                <div key={f.title} className="card" style={{ padding: '2rem' }}>
                  <div style={{ fontSize: 36, marginBottom: '1rem' }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', color: '#1E293B', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: '#64748B', fontSize: '0.9375rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Un seul paiement. Un accès à vie.
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
              Pas d'abonnement, pas de frais cachés. Payez une fois et accédez à tout pour toujours.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {/* Free Plan */}
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 8 }}>Accès Gratuit</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A', margin: '1rem 0' }}>0 $</div>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['4 modules d\'introduction', 'Glossaire financier', 'Aperçu de chaque section', 'Sans inscription requise'].map(item => (
                    <li key={item} style={{ fontSize: '0.9375rem', color: '#475569', display: 'flex', gap: 8 }}>
                      <span style={{ color: '#00A859' }}>✓</span> {item}
                    </li>
                  ))}
                  {['Quiz et certifications', 'Modules avancés', 'Stratégies professionnelles'].map(item => (
                    <li key={item} style={{ fontSize: '0.9375rem', color: '#CBD5E1', display: 'flex', gap: 8 }}>
                      <span>✗</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Commencer gratuitement
                </Link>
              </div>

              {/* Premium Plan */}
              <div style={{
                background: 'linear-gradient(135deg, #003087, #0070BA)',
                borderRadius: 16, padding: '2rem', color: 'white', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 16, right: 16, background: '#F59E0B', color: '#7C2D12', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700 }}>
                  🔥 -90%
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 8, color: 'white' }}>Accès Complet</h3>
                <div style={{ margin: '1rem 0' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>49 USDT</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7, textDecoration: 'line-through' }}>au lieu de 499 USDT</div>
                </div>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    '12 modules complets', '150+ heures de contenu', 'Quiz interactifs', 
                    'Certificats PDF personnalisés', 'Mises à jour gratuites à vie',
                    'Accès mobile PWA', 'Support communautaire'
                  ].map(item => (
                    <li key={item} style={{ fontSize: '0.9375rem', display: 'flex', gap: 8, color: 'rgba(255,255,255,0.9)' }}>
                      <span style={{ color: '#86EFAC' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/payment" style={{
                  background: 'white', color: '#0070BA', padding: '0.875rem 1.5rem',
                  borderRadius: 9999, fontWeight: 700, textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: '0.9375rem'
                }}>
                  Débloquer maintenant →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ background: '#F8FAFC', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-title" style={{ marginBottom: '3rem' }}>
              Ce que disent nos étudiants
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { name: 'Ahmed B.', country: '🇹🇳 Tunis', text: 'Formation excellente ! En 3 mois, j\'ai compris les marchés financiers mieux qu\'en 2 ans de lecture autonome. Le module sur le SMC est un chef-d\'œuvre.', stars: 5 },
                { name: 'Fatima K.', country: '🇲🇦 Casablanca', text: 'J\'ai passé ma certification et décroché un stage en gestion de fonds. Le rapport qualité/prix est imbattable. Sérieusement, 49$ pour ce contenu c\'est cadeau.', stars: 5 },
                { name: 'Karim D.', country: '🇩🇿 Alger', text: 'La modélisation financière Excel m\'a ouvert les portes du secteur bancaire. Contenu clair, structuré et applicable immédiatement en situation réelle.', stars: 5 },
              ].map(t => (
                <div key={t.name} className="card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <div style={{ color: '#F59E0B', fontSize: '1.125rem', marginBottom: 12 }}>{'★'.repeat(t.stars)}</div>
                  <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0070BA, #003087)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1E293B' }}>{t.name}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{t.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section style={{ background: 'linear-gradient(135deg, #003087, #0070BA)', padding: '5rem 1.5rem', textAlign: 'center', color: 'white' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
              Commencez votre transformation financière aujourd'hui
            </h2>
            <p style={{ fontSize: '1.125rem', opacity: 0.85, marginBottom: '2rem', lineHeight: 1.6 }}>
              Rejoignez des milliers d'étudiants qui ont maîtrisé les marchés financiers avec ForexSchool.
            </p>
            <Link href="/payment" style={{
              background: 'white', color: '#0070BA', padding: '1rem 2.5rem',
              borderRadius: 9999, fontWeight: 700, fontSize: '1.0625rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              🎓 Accès complet pour 49 USDT
            </Link>
            <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', opacity: 0.7 }}>
              ⚡ Accès instantané après confirmation du paiement
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
