# ForexSchool 🎓

Plateforme éducative de formation en trading et marchés financiers.

## Stack technique

- **Frontend** : Next.js 15 (App Router) + TypeScript
- **Backend** : Supabase (Auth + PostgreSQL + Storage)
- **Hébergement** : Vercel
- **Sécurité DNS/SSL** : Cloudflare
- **Paiement** : Blockonomics (USDT/BTC)
- **PWA** : Support installable sur mobile

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil + aperçus gratuits |
| `/login` | Connexion / Inscription |
| `/dashboard` | Tableau de bord étudiant |
| `/module/[id]` | Contenu d'un module |
| `/payment` | Page de paiement crypto |
| `/certificate` | Génération certificat PDF |

## Démarrage local

```bash
npm install
cp .env.example .env.local
# Remplir les variables d'environnement
npm run dev
```

## Variables d'environnement requises

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
BLOCKONOMICS_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

## Base de données Supabase

Exécutez le script `supabase/schema.sql` dans votre projet Supabase.

## Contenu pédagogique

- 🔑 **Forex & Crypto** : 5 niveaux (L1-L5)
- 📈 **Marché des Actions** : 80h de contenu
- 💼 **Gestion de Portefeuille** : 40h
- 📊 **Analyste Financier** : 40h
- 📚 **Annexes** : Glossaire, ressources, exercices

## Modèle économique

- Accès gratuit : 4 modules introductifs
- Accès premium : **49 USDT** (paiement unique, au lieu de 499 USDT)
- Paiement via Blockonomics (USDT TRC-20 ou Bitcoin)

---
© 2026 ForexSchool. Formation financière professionnelle.
