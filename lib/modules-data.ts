export const modulesData = [
  {
    id: "forex-1",
    title: "Introduction au Forex",
    description: "Découvrez les bases du marché des changes, le plus grand marché financier au monde avec 6,6 trillions de dollars échangés quotidiennement.",
    category: "Forex & Crypto",
    level: 1,
    duration_hours: 4,
    type: "free",
    order_index: 1,
    preview: `
## Qu'est-ce que le Forex ?

Le marché des changes (Forex ou Foreign Exchange) est le marché mondial décentralisé sur lequel les devises sont achetées et vendues. Avec un volume quotidien dépassant **6,6 trillions de dollars**, il est de loin le marché financier le plus vaste et le plus liquide au monde — plus grand que tous les marchés boursiers réunis.

Contrairement aux bourses traditionnelles comme le NYSE ou Euronext, le Forex n'a pas de lieu physique central. Il opère via un réseau électronique mondial de banques, d'institutions financières, de courtiers et de traders particuliers, actif **24 heures sur 24, 5 jours sur 7**.

Le marché Forex structure le commerce international : chaque fois qu'une entreprise française importe des produits américains, elle doit convertir des euros en dollars. Chaque voyage à l'étranger, chaque transfert international — tout passe par le Forex.
    `,
    content: `
## Qu'est-ce que le Forex ?

Le marché des changes (Forex ou Foreign Exchange) est le marché mondial décentralisé sur lequel les devises sont achetées et vendues. Avec un volume quotidien dépassant **6,6 trillions de dollars**, il est de loin le marché financier le plus vaste et le plus liquide au monde — plus grand que tous les marchés boursiers réunis.

Contrairement aux bourses traditionnelles comme le NYSE ou Euronext, le Forex n'a pas de lieu physique central. Il opère via un réseau électronique mondial de banques, d'institutions financières, de courtiers et de traders particuliers, actif **24 heures sur 24, 5 jours sur 7**.

Le marché Forex structure le commerce international : chaque fois qu'une entreprise française importe des produits américains, elle doit convertir des euros en dollars. Chaque voyage à l'étranger, chaque transfert international — tout passe par le Forex.

## Les participants du marché Forex

Le Forex réunit plusieurs catégories d'acteurs aux motivations très différentes :

- **Les banques centrales** (BCE, Fed, Banque du Japon) : elles interviennent pour stabiliser leur devise nationale ou mettre en œuvre leur politique monétaire. Leur impact est colossal — une simple déclaration peut faire bouger le marché de plusieurs centaines de pips.
- **Les banques commerciales** : elles représentent la majorité des volumes échangés. Elles tradent pour leurs propres comptes (proprietary trading) ou pour le compte de leurs clients.
- **Les hedge funds et gestionnaires d'actifs** : ils spéculent sur les variations de change pour générer des rendements.
- **Les entreprises multinationales** : elles hedgent (couvrent) leur exposition aux devises étrangères pour sécuriser leurs marges.
- **Les traders particuliers** : grâce à l'essor des plateformes en ligne et du trading au détail depuis les années 2000, les particuliers peuvent accéder au marché Forex avec des capitaux relativement modestes.

## Les paires de devises

Le Forex fonctionne toujours par **paires de devises**. On achète une devise en vendant simultanément une autre. Chaque paire est composée d'une devise de base (à gauche) et d'une devise cotée (à droite).

**Paires majeures** — les plus liquides et les moins coûteuses à trader :
- **EUR/USD** : Euro / Dollar américain — la paire la plus tradée au monde (~28% des volumes)
- **GBP/USD** : Livre sterling / Dollar américain — surnommée "le câble"
- **USD/JPY** : Dollar américain / Yen japonais — très sensible aux décisions de la Banque du Japon
- **USD/CHF** : Dollar américain / Franc suisse — valeur refuge lors des crises
- **AUD/USD** : Dollar australien / Dollar américain — corrélé aux matières premières
- **USD/CAD** : Dollar américain / Dollar canadien — corrélé au pétrole

**Paires mineures** — sans le dollar américain :
- EUR/GBP, EUR/JPY, GBP/JPY (surnommée "la bête" pour sa volatilité)

**Paires exotiques** — une devise majeure + une devise d'économie émergente :
- USD/TRY (Livre turque), EUR/PLN (Zloty polonais), USD/ZAR (Rand sud-africain)

## Les sessions de trading

Le marché Forex est ouvert 24h/24 du dimanche soir (ouverture de Sydney) au vendredi soir (fermeture de New York). Il se divise en **quatre grandes sessions** :

- **Session de Sydney** (22h–07h CET) : faibles volumes, marché calme
- **Session de Tokyo** (00h–09h CET) : activité sur les paires JPY et AUD
- **Session de Londres** (08h–17h CET) : la plus volumineuse, ~35% des échanges mondiaux
- **Session de New York** (13h–22h CET) : très active, particulièrement pendant le chevauchement avec Londres (13h–17h CET)

Le **chevauchement Londres / New York** (13h–17h CET) est la période la plus liquide et la plus volatile de la journée — idéale pour trader les paires USD et EUR.

## Les concepts fondamentaux

**Le Pip (Percentage in Point)**
Le pip est la plus petite unité de variation de prix standard pour une paire de devises. Pour la plupart des paires, 1 pip = 0,0001 (4ème décimale). Pour les paires en JPY, 1 pip = 0,01 (2ème décimale).

Exemple : si EUR/USD passe de 1,0850 à 1,0855, il a gagné **5 pips**.

**Le Spread**
Le spread est la différence entre le prix d'achat (ask) et le prix de vente (bid). C'est la rémunération principale du courtier. Un spread de 1-2 pips sur EUR/USD est excellent ; un spread de 20+ pips sur une paire exotique est normal.

**Le Levier financier**
Le levier permet de contrôler une position plus grande que son capital réel. Avec un levier de 1:100, un dépôt de 1 000 € permet de trader une position de 100 000 €. C'est une arme à double tranchant : il amplifie les gains comme les pertes.

**Les Lots**
Les transactions Forex se mesurent en "lots" :
- **Lot standard** : 100 000 unités de la devise de base
- **Mini-lot** : 10 000 unités
- **Micro-lot** : 1 000 unités

**La Marge**
La marge est le capital minimum requis pour ouvrir une position avec levier. Avec un levier de 1:50 et une position de 100 000 €, la marge requise est de 2 000 €.

## Les ordres de base

- **Ordre au marché** : exécuté immédiatement au meilleur prix disponible
- **Ordre limite** : exécuté uniquement si le prix atteint un niveau défini
- **Stop Loss** : ferme automatiquement une position à perte définie pour limiter le risque
- **Take Profit** : ferme automatiquement une position en gain à un niveau cible

## Comment choisir un broker Forex ?

Voici les critères essentiels :
1. **Régulation** : cherchez des brokers régulés par l'AMF (France), FCA (UK), CySEC ou ASIC
2. **Spreads et commissions** : comparez les coûts réels de trading
3. **Plateforme** : MetaTrader 4/5, cTrader — fiabilité et fonctionnalités
4. **Dépôt minimum** : adapté à votre capital de départ
5. **Service client** : support en français, réactif
6. **Ressources éducatives** : un bon broker forme ses clients

## Conclusion

Le Forex est un marché fascinant qui offre des opportunités exceptionnelles — mais aussi des risques réels. La majorité des traders particuliers perdent de l'argent, non pas par manque d'intelligence, mais par manque de formation, de discipline et de gestion du risque. Ce cours est conçu pour changer cela. Dans les modules suivants, vous apprendrez l'analyse technique, la gestion du risque et les stratégies utilisées par les professionnels.
    `
  },
  {
    id: "forex-2",
    title: "Analyse Technique – Les Bases",
    description: "Maîtrisez les outils fondamentaux de l'analyse technique : chandeliers japonais, niveaux de support/résistance et indicateurs clés.",
    category: "Forex & Crypto",
    level: 1,
    duration_hours: 6,
    type: "free",
    order_index: 2,
    preview: `
## Qu'est-ce que l'analyse technique ?

L'analyse technique est l'étude des mouvements de prix passés pour anticiper les mouvements futurs. Elle repose sur une conviction fondamentale : **le prix intègre tout**. Les informations économiques, les sentiments des traders, les événements géopolitiques — tout se reflète déjà dans le prix affiché sur le graphique.

Contrairement à l'analyse fondamentale qui s'intéresse aux données économiques (PIB, taux d'intérêt, bénéfices d'entreprises), l'analyse technique s'intéresse uniquement aux graphiques de prix et aux volumes. Elle est utilisée par des millions de traders à travers le monde, des day traders aux gestionnaires de hedge funds.

Les trois piliers de l'analyse technique sont : (1) le marché intègre toute l'information, (2) les prix évoluent en tendances, (3) l'histoire se répète.
    `,
    content: `
## Qu'est-ce que l'analyse technique ?

L'analyse technique est l'étude des mouvements de prix passés pour anticiper les mouvements futurs. Elle repose sur une conviction fondamentale : **le prix intègre tout**. Les informations économiques, les sentiments des traders, les événements géopolitiques — tout se reflète déjà dans le prix affiché sur le graphique.

Contrairement à l'analyse fondamentale qui s'intéresse aux données économiques (PIB, taux d'intérêt, bénéfices d'entreprises), l'analyse technique s'intéresse uniquement aux graphiques de prix et aux volumes.

## Les chandeliers japonais (Candlesticks)

Inventés au Japon au XVIIIe siècle pour trader le riz, les chandeliers japonais sont aujourd'hui la représentation graphique la plus utilisée au monde. Chaque chandelier encode **4 informations** sur une période donnée : l'Ouverture (O), le Haut (H), le Bas (L), et la Clôture (C).

**Structure d'un chandelier :**
- Le **corps** (rectangle) représente la différence entre l'ouverture et la clôture
- Les **mèches** (lignes fines) représentent les extrêmes atteints pendant la période
- Chandelier **vert/blanc** : la clôture est au-dessus de l'ouverture (période haussière)
- Chandelier **rouge/noir** : la clôture est en-dessous de l'ouverture (période baissière)

**Patterns de retournement majeurs :**
- **Doji** : corps très petit, mèches longues des deux côtés. Signale une hésitation parfaite entre acheteurs et vendeurs — retournement potentiel imminent
- **Marteau (Hammer)** : corps petit en haut, longue mèche inférieure. Signal haussier après une tendance baissière — les vendeurs ont poussé le prix bas mais les acheteurs ont repris le contrôle
- **Étoile filante (Shooting Star)** : corps petit en bas, longue mèche supérieure. Signal baissier après une tendance haussière
- **Engulfing haussier** : un grand chandelier vert qui "avale" entièrement le chandelier rouge précédent — fort signal d'inversion
- **Engulfing baissier** : l'inverse, fort signal de retournement à la baisse
- **Morning Star** : pattern en 3 chandeliers signalant un retournement haussier
- **Evening Star** : pattern en 3 chandeliers signalant un retournement baissier

## Supports et Résistances

Les supports et résistances sont les concepts les plus fondamentaux de l'analyse technique.

**Support** : niveau de prix où la demande est suffisamment forte pour arrêter une baisse. Le marché a "rebondi" à ce niveau plusieurs fois dans le passé. Plus un support est testé et tient, plus il est solide.

**Résistance** : niveau de prix où l'offre est suffisamment forte pour arrêter une hausse. Le marché s'est "heurté" à ce plafond plusieurs fois.

**La règle du pivot** : quand un support est cassé, il devient résistance — et vice versa. Ce phénomène est crucial et se produit sur tous les marchés et tous les timeframes.

**Types de supports/résistances :**
- Niveaux psychologiques ronds (1.1000, 1.2000, etc.)
- Anciens plus hauts / plus bas (swing highs / swing lows)
- Niveaux de Fibonacci (38.2%, 50%, 61.8%)
- Moyennes mobiles (agissent comme supports/résistances dynamiques)

## Les tendances

**"The trend is your friend"** — le dicton le plus célèbre du trading.

- **Tendance haussière** : série de plus hauts et de plus bas croissants (Higher Highs, Higher Lows)
- **Tendance baissière** : série de plus bas et de plus hauts décroissants (Lower Lows, Lower Highs)
- **Range / Consolidation** : le prix oscille horizontalement entre un support et une résistance

**Les droites de tendance** : tracez une ligne reliant au moins 3 points bas (tendance haussière) ou 3 points hauts (tendance baissière). La cassure de cette droite est un signal fort de retournement.

## Les indicateurs techniques essentiels

**Moyennes mobiles (Moving Averages)**
La moyenne mobile lisse les données de prix pour identifier la tendance. Les deux types principaux :
- **SMA (Simple Moving Average)** : moyenne arithmétique sur N périodes
- **EMA (Exponential Moving Average)** : donne plus de poids aux prix récents, plus réactive

Les combinaisons classiques : MA 20/50/200 périodes. Quand la MA50 croise la MA200 à la hausse, c'est le fameux **Golden Cross** — signal haussier majeur. Le croisement inverse s'appelle le **Death Cross**.

**RSI (Relative Strength Index)**
Oscillateur entre 0 et 100, développé par Welles Wilder. Il mesure la vitesse et la magnitude des mouvements de prix.
- RSI > 70 : marché **suracheté** — possible correction imminente
- RSI < 30 : marché **survendu** — possible rebond imminent
- Les **divergences RSI** (prix fait un nouveau high mais RSI non) sont des signaux très puissants

**MACD (Moving Average Convergence Divergence)**
Composé de deux lignes (MACD et Signal) et d'un histogramme. Les signaux principaux :
- Croisement MACD / Signal : signal d'achat ou de vente
- Croisement de la ligne zéro : changement de momentum
- Divergences : très fiables pour anticiper les retournements

**Bandes de Bollinger**
Trois lignes : une MA20 centrale, et deux bandes à ±2 écarts-types. Quand les bandes se resserrent (squeeze), une forte volatilité est imminente. Quand le prix touche la bande supérieure, il est statistiquement suracheté.

## Les figures chartistes classiques

- **Tête et épaules** : figure de retournement baissier très fiable
- **Double top / Double bottom** : retournement après deux tentatives infructueuses
- **Triangle ascendant / descendant** : continuation de tendance
- **Drapeau et fanion** : consolidation avant continuation
- **Biseau** : figure de retournement ou continuation selon le contexte

## Les timeframes

L'analyse multi-timeframes est essentielle :
- **Monthly/Weekly** : tendance long terme, grandes structures
- **Daily (D1)** : tendance moyen terme, niveaux clés
- **H4 / H1** : tendance court terme, contexte de trade
- **M15 / M5** : entrée précise en position

La règle : toujours analyser du timeframe supérieur vers l'inférieur. Ne jamais entrer en trade contre la tendance du timeframe supérieur.
    `
  },
  {
    id: "forex-3",
    title: "Gestion du Risque et Money Management",
    description: "La discipline qui sépare les traders professionnels des amateurs. Apprenez à protéger votre capital et à maximiser vos gains à long terme.",
    category: "Forex & Crypto",
    level: 2,
    duration_hours: 5,
    type: "premium",
    order_index: 3,
    preview: `
## Pourquoi la gestion du risque est la compétence n°1 du trader

Voici une vérité que la plupart des débutants refusent d'entendre : **le trading est avant tout une gestion du risque**. Un trader qui gagne 60% de ses trades mais perd 3× plus qu'il ne gagne sur chaque trade perdant sera ruiné à long terme. À l'inverse, un trader qui ne gagne que 40% de ses trades mais applique rigoureusement un ratio risque/récompense de 1:3 sera massivement profitable.

Les statistiques sont sans appel : 70 à 80% des traders particuliers perdent de l'argent. La cause principale n'est pas le manque de stratégie — c'est le manque de discipline dans la gestion du risque. Ce module vous donnera les outils pour faire partie des 20%.
    `,
    content: `## Contenu premium — débloquez l'accès complet pour 49 USDT.`
  },
  {
    id: "forex-4",
    title: "Stratégies de Trading Avancées",
    description: "Price Action, Smart Money Concepts (SMC), ICT et stratégies institutionnelles pour trader comme les professionnels.",
    category: "Forex & Crypto",
    level: 3,
    duration_hours: 8,
    type: "premium",
    order_index: 4,
    preview: `
## Au-delà des indicateurs : trader comme une institution

Les stratégies avancées partent d'une observation fondamentale : les marchés sont dominés par les **grandes institutions** — banques, hedge funds, banques centrales. Ces acteurs représentent plus de 85% des volumes. Comprendre comment ils pensent et opèrent est la clé pour trader dans leur sens plutôt que contre eux.

Le Price Action pur, les Smart Money Concepts (SMC) et la méthodologie ICT sont des approches qui cherchent à lire les "empreintes" laissées par les institutionnels dans les graphiques de prix — des patterns que les indicateurs classiques ne savent pas détecter.
    `,
    content: `## Contenu premium — débloquez l'accès complet pour 49 USDT.`
  },
  {
    id: "forex-5",
    title: "Trading Psychologique et Discipline",
    description: "80% du trading est mental. Maîtrisez vos émotions, éliminez la FOMO et développez la mentalité d'un trader professionnel.",
    category: "Forex & Crypto",
    level: 3,
    duration_hours: 4,
    type: "premium",
    order_index: 5,
    preview: `
## Le facteur humain : votre plus grand ennemi en trading

Vous pouvez avoir la meilleure stratégie du monde — si votre psychologie n'est pas maîtrisée, vous perdrez de l'argent. C'est une certitude. Des études montrent que même des traders dotés d'une stratégie profitable statistiquement finissent par perdre, uniquement à cause de leurs biais émotionnels et cognitifs.

La peur, l'avidité, l'ego, l'impatience, la revanche — ces émotions primitives sabotent systématiquement les meilleures intentions. Ce module vous donne les outils concrets pour les identifier, les contrôler et construire une discipline de fer.
    `,
    content: `## Contenu premium — débloquez l'accès complet pour 49 USDT.`
  },
  {
    id: "crypto-1",
    title: "Introduction aux Cryptomonnaies",
    description: "Bitcoin, Ethereum, DeFi, NFT et Web3 : comprenez l'écosystème crypto et ses opportunités d'investissement.",
    category: "Forex & Crypto",
    level: 1,
    duration_hours: 5,
    type: "free",
    order_index: 6,
    preview: `
## La révolution monétaire du XXIe siècle

En 2009, un mystérieux développeur ou groupe de développeurs sous le pseudonyme **Satoshi Nakamoto** publiait un document de 9 pages intitulé *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. Ce whitepaper posait les bases d'une technologie qui allait remettre en question des siècles de système financier centralisé.

L'idée centrale était radicale : **créer une monnaie numérique qui n'a besoin d'aucune banque, d'aucun gouvernement, d'aucun intermédiaire**. Des transactions directes, de pair à pair, vérifiées par un réseau décentralisé de milliers d'ordinateurs à travers le monde.

Quinze ans plus tard, la capitalisation totale du marché crypto a dépassé les **2 500 milliards de dollars**. Une nouvelle classe d'actifs est née.
    `,
    content: `
## La révolution monétaire du XXIe siècle

En 2009, un mystérieux développeur ou groupe de développeurs sous le pseudonyme **Satoshi Nakamoto** publiait un document de 9 pages intitulé *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. Ce whitepaper posait les bases d'une technologie qui allait remettre en question des siècles de système financier centralisé.

L'idée centrale était radicale : **créer une monnaie numérique qui n'a besoin d'aucune banque, d'aucun gouvernement, d'aucun intermédiaire**. Des transactions directes, de pair à pair, vérifiées par un réseau décentralisé de milliers d'ordinateurs à travers le monde.

## La Blockchain : le registre immuable

La blockchain est la technologie sous-jacente de Bitcoin et de la plupart des cryptomonnaies. C'est un **registre distribué** — une base de données partagée entre des milliers de participants (nœuds) du réseau, sans autorité centrale.

Chaque "bloc" contient un ensemble de transactions validées. Une fois ajouté à la chaîne, il est **cryptographiquement lié** au bloc précédent via un hash. Modifier un bloc pasé nécessiterait de recalculer tous les blocs suivants sur la majorité des nœuds du réseau — une tâche pratiquement impossible, rendant la blockchain **immuable**.

**Le mécanisme de consensus** : comment le réseau se met-il d'accord sans autorité centrale ?
- **Proof of Work (PoW)** : Bitcoin — les mineurs résolvent des problèmes mathématiques complexes pour valider les transactions (consomme beaucoup d'énergie)
- **Proof of Stake (PoS)** : Ethereum — les validateurs misent des cryptos en garantie, plus économe en énergie

## Bitcoin (BTC) — L'or numérique

Bitcoin est la première et la plus importante cryptomonnaie. Ses caractéristiques uniques :

- **Offre limitée** : il n'existera jamais plus de **21 millions de BTC** — une rareté programmée dans le code
- **Décentralisation** : aucune entité ne contrôle Bitcoin, ni Satoshi lui-même
- **Le Halving** : tous les ~4 ans, la récompense des mineurs est divisée par 2, réduisant l'émission de nouveaux BTC. Les halvings (2012, 2016, 2020, 2024) ont historiquement précédé des bull markets majeurs
- **Réserve de valeur** : de plus en plus d'institutions (BlackRock, Fidelity, MicroStrategy) et d'États détiennent du Bitcoin comme réserve

## Ethereum (ETH) — La plateforme des applications décentralisées

Lancé en 2015 par **Vitalik Buterin**, Ethereum va bien au-delà d'une simple cryptomonnaie. C'est une plateforme programmable qui permet de déployer des **smart contracts** — des programmes autonomes qui s'exécutent automatiquement selon des conditions prédéfinies, sans intermédiaire.

Les smart contracts ont rendu possible l'explosion de :
- **La DeFi (Finance Décentralisée)** : protocoles de prêt, emprunt, échange décentralisés (Uniswap, Aave, Compound)
- **Les NFT (Non-Fungible Tokens)** : titres de propriété numériques uniques
- **Les DAOs** : organisations autonomes décentralisées gouvernées par leurs membres

## L'écosystème crypto en 2024

**Stablecoins** : cryptos arrimées à une monnaie fiat (USDT, USDC). Capitalisées à plus de 150 milliards $, elles servent de pont entre la crypto et le monde traditionnel.

**Altcoins majeurs** :
- **BNB** : token de Binance, utilisé pour payer les frais
- **Solana (SOL)** : blockchain ultra-rapide et peu coûteuse
- **Cardano (ADA)** : blockchain PoS académique
- **Avalanche (AVAX)** : plateforme DeFi haute performance
- **Polkadot (DOT)** : interopérabilité entre blockchains

**Les cycles de marché crypto** : le marché crypto suit des cycles de 4 ans liés au halving de Bitcoin. Bull market (hausse explosive) → Bear market (baisse de 80%+) → Accumulation → Nouveau bull market.

## Comment stocker ses cryptos en sécurité

- **Exchanges centralisés** (Binance, Coinbase, Kraken) : pratiques mais risqués (hack, faillite — souvenez-vous de FTX)
- **Hot wallets** (MetaMask, Trust Wallet) : logiciels connectés à internet, pratiques pour la DeFi
- **Cold wallets / Hardware wallets** (Ledger, Trezor) : stockage hors ligne — la méthode la plus sécurisée pour les grandes sommes

**La règle d'or** : *"Not your keys, not your coins"*. Si vous ne contrôlez pas vos clés privées, vous ne contrôlez pas vraiment vos cryptos.
    `
  },
  {
    id: "crypto-2",
    title: "Analyse On-Chain et Sentiment de Marché",
    description: "Utilisez les données blockchain, l'indice Fear & Greed et les métriques on-chain pour anticiper les mouvements du marché crypto.",
    category: "Forex & Crypto",
    level: 2,
    duration_hours: 6,
    type: "premium",
    order_index: 7,
    preview: `
## Lire les données invisibles de la blockchain

Le marché crypto présente un avantage unique par rapport aux marchés traditionnels : **toutes les transactions sont publiques et vérifiables en temps réel**. Chaque mouvement de Bitcoin, chaque dépôt sur un exchange, chaque accumulation d'une baleine — tout est enregistré sur la blockchain, lisible par quiconque sait où chercher.

L'analyse on-chain consiste à exploiter ces données pour obtenir un avantage informationnel. C'est comme pouvoir voir le carnet d'ordres de l'ensemble du marché, les mouvements des plus grands détenteurs, et la santé globale du réseau — des informations auxquelles les traders traditionnels n'ont pas accès.
    `,
    content: `## Contenu premium — débloquez l'accès complet pour 49 USDT.`
  },
  {
    id: "actions-1",
    title: "Introduction aux Marchés d'Actions",
    description: "Comprenez le fonctionnement des bourses mondiales (NYSE, NASDAQ, Euronext), les indices boursiers et les différents types de titres financiers.",
    category: "Marché des Actions",
    level: 1,
    duration_hours: 6,
    type: "free",
    order_index: 8,
    preview: `
## Qu'est-ce qu'une action ?

Quand vous achetez une action d'Apple, vous devenez littéralement **copropriétaire d'Apple**. Pas symboliquement — légalement. Vous détenez une fraction du capital de l'entreprise, avec les droits qui y sont associés : droit de vote aux assemblées générales, droit aux dividendes, droit à une part de l'actif en cas de liquidation.

Le marché boursier est le mécanisme qui permet à des entreprises de lever des capitaux auprès du public (introduction en bourse — IPO) et aux investisseurs d'échanger ces titres de propriété de manière liquide, transparente et réglementée. C'est l'une des plus grandes inventions du capitalisme moderne.

Avec plus de **80 000 milliards de dollars** de capitalisation boursière mondiale, les marchés d'actions représentent le moteur de financement de l'économie mondiale.
    `,
    content: `
## Qu'est-ce qu'une action ?

Quand vous achetez une action d'Apple, vous devenez littéralement **copropriétaire d'Apple**. Pas symboliquement — légalement. Vous détenez une fraction du capital de l'entreprise.

## Les grandes bourses mondiales

- **NYSE (New York Stock Exchange)** : la plus grande bourse du monde par capitalisation (~25 000 milliards $). Apple, Microsoft, Berkshire Hathaway y sont cotées.
- **NASDAQ** : spécialisée dans les valeurs technologiques. Amazon, Google, Meta, Tesla.
- **Euronext** : principale bourse européenne multinationale (Paris, Amsterdam, Bruxelles, Lisbonne). LVMH, TotalEnergies, Airbus.
- **LSE (London Stock Exchange)** : place financière historique de Londres.
- **TSE (Tokyo Stock Exchange)** : première bourse asiatique.
- **SSE/SZSE** : bourses de Shanghai et Shenzhen — marché chinois colossal mais partiellement fermé aux étrangers.

## Les indices boursiers

Un indice boursier est un **panier d'actions** représentatif d'un marché ou d'un secteur. Il permet de mesurer la performance globale du marché.

**Indices américains :**
- **S&P 500** : les 500 plus grandes entreprises américaines cotées. C'est l'indice de référence mondial — le benchmark contre lequel se mesurent tous les gérants.
- **Dow Jones Industrial Average (DJIA)** : 30 grandes entreprises industrielles américaines. Historique (créé en 1896) mais moins représentatif que le S&P 500.
- **NASDAQ 100** : les 100 plus grandes entreprises non-financières du NASDAQ. Très concentré en tech.
- **Russell 2000** : 2000 petites capitalisations américaines. Indicateur de la santé de l'économie réelle.

**Indices européens :**
- **CAC 40** : les 40 plus grandes capitalisations françaises (LVMH, TotalEnergies, Hermès, Airbus...)
- **DAX 40** : les 40 leaders allemands (SAP, Siemens, Volkswagen, BASF...)
- **FTSE 100** : les 100 plus grandes capitalisations britanniques
- **EuroStoxx 50** : les 50 leaders de la zone euro

**Indices asiatiques :**
- **Nikkei 225** : Japon — Toyota, Sony, SoftBank
- **Hang Seng** : Hong Kong — Alibaba, HSBC, Tencent
- **CSI 300** : les 300 plus grandes actions chinoises

## Les types d'actions

**Actions ordinaires (Common Shares)** : donnent droit de vote et aux dividendes. Les plus courantes.

**Actions privilégiées (Preferred Shares)** : prioritaires pour les dividendes et en cas de liquidation, mais souvent sans droit de vote.

**Selon la capitalisation :**
- **Large Caps** : capitalisation > 10 Mds$ — stabilité, dividendes, liquidité
- **Mid Caps** : 2 à 10 Mds$ — bon rapport croissance/risque
- **Small Caps** : < 2 Mds$ — fort potentiel de croissance, mais plus volatiles et moins liquides

**Selon le style :**
- **Actions de croissance (Growth)** : entreprises qui réinvestissent tous leurs bénéfices. Ex : Amazon (pas de dividende pendant 20 ans). Valorisations élevées, fort potentiel.
- **Actions de valeur (Value)** : entreprises sous-évaluées par rapport à leurs fondamentaux. L'approche de Warren Buffett.
- **Actions à dividendes (Dividend)** : versent des dividendes réguliers et croissants. Recherchées par les investisseurs revenus.

## Comment fonctionne une séance boursière ?

**Le carnet d'ordres** : chaque action a un carnet d'ordres qui liste toutes les offres d'achat (bid) et de vente (ask). Le prix d'une action est le dernier prix auquel une transaction a eu lieu.

**Types d'ordres :**
- **Ordre au marché** : exécuté immédiatement au meilleur prix disponible
- **Ordre limite** : exécuté uniquement si le prix atteint votre niveau défini
- **Ordre stop** : déclenché quand le prix dépasse un seuil (stop loss)

**Les séances :**
- NYSE/NASDAQ : 9h30–16h00 heure de New York (15h30–22h00 CET)
- Euronext Paris : 9h00–17h35 CET
- Pre-market et after-hours : trading étendu avec liquidité réduite

## Les dividendes

Le dividende est la part des bénéfices distribuée aux actionnaires. Concepts clés :
- **Dividend yield** : dividende annuel / prix de l'action. Ex : 3% yield
- **Ex-dividend date** : il faut détenir l'action AVANT cette date pour recevoir le dividende
- **Payout ratio** : % des bénéfices distribués en dividendes

Les **Dividend Aristocrats** (S&P 500) sont des entreprises qui ont augmenté leur dividende chaque année depuis au moins 25 ans consécutifs — un signe de solidité et de fiabilité exceptionnelles.

## Introduction aux ETF (Exchange-Traded Funds)

Un ETF est un fonds indiciel **coté en bourse** qui réplique la performance d'un indice. Acheter un ETF S&P 500 (comme le SPY ou le VUSA), c'est acheter instantanément 500 entreprises dans les mêmes proportions que l'indice.

**Avantages des ETF :**
- Diversification instantanée à faible coût
- Frais de gestion très bas (0,03% à 0,5%/an)
- Liquidité importante
- Fiscalité simple

**Pour un investisseur débutant**, une stratégie d'investissement régulier en ETF monde ou S&P 500 (Dollar Cost Averaging) sur le long terme est statistiquement plus performante que 90% des gérants actifs.
    `
  },
  {
    id: "portfolio-1",
    title: "Gestion de Portefeuille – Fondamentaux",
    description: "Construisez un portefeuille diversifié, apprenez la théorie moderne du portefeuille (MPT) et optimisez le ratio risque/rendement.",
    category: "Gestion de Portefeuille",
    level: 2,
    duration_hours: 8,
    type: "premium",
    order_index: 9,
    preview: `
## De l'investisseur amateur au gestionnaire de portefeuille professionnel

Beaucoup d'investisseurs débutants achètent des actions "au hasard" selon les conseils entendus, les tendances du moment ou l'intuition. Résultat : un portefeuille incohérent, surexposé à certains risques, sous-diversifié, sans vision claire.

La gestion de portefeuille professionnelle est une discipline scientifique. Elle repose sur des modèles mathématiques, une analyse rigoureuse du risque, et une stratégie d'allocation d'actifs construite en fonction de vos objectifs précis et de votre horizon d'investissement. Ce module vous enseigne ces méthodes — les mêmes utilisées par les gérants de fonds qui supervisent des milliards.
    `,
    content: `## Contenu premium — débloquez l'accès complet pour 49 USDT.`
  },
  {
    id: "portfolio-2",
    title: "Analyse Fondamentale Avancée",
    description: "Maîtrisez l'analyse des états financiers, les ratios de valorisation (P/E, P/B, DCF) et l'évaluation intrinsèque des entreprises.",
    category: "Analyste Financier",
    level: 3,
    duration_hours: 10,
    type: "premium",
    order_index: 10,
    preview: `
## Lire les entreprises comme un livre ouvert

Warren Buffett a dit : *"Le prix est ce que vous payez. La valeur est ce que vous obtenez."* L'analyse fondamentale est l'art de trouver la différence entre les deux — identifier les entreprises dont la valeur intrinsèque est supérieure au prix de marché.

Pour maîtriser l'analyse fondamentale, vous devez apprendre à lire les trois états financiers d'une entreprise comme un comptable, à calculer les ratios de valorisation comme un analyste sell-side, et à modéliser les flux de trésorerie futurs comme un banquier d'investissement. Ce module couvre tout cela de manière progressive et pratique.
    `,
    content: `## Contenu premium — débloquez l'accès complet pour 49 USDT.`
  },
  {
    id: "analyst-1",
    title: "Modélisation Financière Excel",
    description: "Créez des modèles financiers professionnels : projections, valorisations DCF, LBO, et présentations d'investissement comme un analyste de banque.",
    category: "Analyste Financier",
    level: 3,
    duration_hours: 12,
    type: "premium",
    order_index: 11,
    preview: `
## La compétence la plus demandée en finance

Dans chaque banque d'investissement, chaque fonds de private equity, chaque cabinet de conseil en stratégie — la modélisation financière Excel est **la compétence technique n°1** recherchée chez les juniors. Les analystes qui maîtrisent cette discipline facturent leurs services 150 à 400€/heure en freelance.

Un modèle financier bien construit permet de valoriser une entreprise, tester l'impact de différents scénarios économiques, structurer une acquisition par effet de levier (LBO), ou préparer une levée de fonds. C'est à la fois un outil d'analyse et un outil de conviction.
    `,
    content: `## Contenu premium — débloquez l'accès complet pour 49 USDT.`
  },
  {
    id: "annexes-1",
    title: "Glossaire Financier Complet",
    description: "Plus de 300 termes financiers définis clairement : du vocabulaire de base aux concepts avancés de la finance de marché.",
    category: "Annexes",
    level: 1,
    duration_hours: 2,
    type: "free",
    order_index: 12,
    preview: `
## Votre dictionnaire de la finance de marché

Maîtriser le vocabulaire financier est la première étape pour comprendre les marchés, lire les analyses et communiquer avec les professionnels. Ce glossaire rassemble plus de 300 termes essentiels — des bases du trading aux concepts avancés de la finance institutionnelle.

Chaque définition est rédigée en français clair, avec des exemples concrets. Utilisez ce glossaire comme référence tout au long de votre formation.
    `,
    content: `
## Votre dictionnaire de la finance de marché

Maîtriser le vocabulaire financier est la première étape pour comprendre les marchés, lire les analyses et communiquer avec les professionnels.

## A

**Actif** : Tout bien ayant une valeur économique (actions, obligations, immobilier, cryptomonnaies...). Les actifs financiers sont des instruments représentant des droits économiques futurs.

**Action** : Titre représentant une fraction du capital d'une entreprise. Le détenteur est copropriétaire et bénéficie des droits de vote et aux dividendes.

**Alpha (α)** : Mesure de la surperformance d'un investissement par rapport à son indice de référence (benchmark). Un alpha positif indique une valeur ajoutée par le gestionnaire.

**Analyse fondamentale** : Méthode d'évaluation basée sur les données économiques et financières intrinsèques d'une entreprise ou d'un actif.

**Analyse technique** : Méthode d'analyse basée sur l'étude des graphiques de prix et des volumes pour anticiper les mouvements futurs.

**Arbitrage** : Stratégie consistant à exploiter des écarts de prix d'un même actif sur différents marchés pour réaliser un profit sans risque.

**Ask (cours vendeur)** : Prix auquel un vendeur est prêt à vendre un actif. Voir aussi : Spread.

## B

**Bear Market (marché baissier)** : Période de baisse soutenue des marchés financiers de plus de 20% depuis un sommet récent.

**Beta (β)** : Mesure de la sensibilité d'un actif aux mouvements du marché global. Un bêta > 1 signifie plus volatil que le marché.

**Bid (cours acheteur)** : Prix auquel un acheteur est prêt à acheter un actif.

**Blue Chip** : Action d'une grande entreprise réputée, financièrement solide et à la capitalisation importante. Ex : Apple, LVMH, Nestlé.

**Bond (Obligation)** : Titre de créance émis par une entreprise ou un État pour lever des fonds. L'émetteur s'engage à rembourser le capital et à verser des intérêts (coupon).

**Broker (Courtier)** : Intermédiaire qui exécute les ordres d'achat et de vente pour le compte de clients, en échange d'une commission ou d'un spread.

**Bull Market (marché haussier)** : Période de hausse soutenue des marchés financiers de plus de 20%.

## C

**CAC 40** : Indice boursier des 40 plus grandes capitalisations boursières françaises cotées sur Euronext Paris.

**Call** : Option d'achat. Donne le droit (non l'obligation) d'acheter un actif à un prix fixé (strike) avant une date d'expiration.

**Capitalisation boursière** : Valeur totale de marché d'une entreprise cotée. Calcul : nombre d'actions × cours de l'action.

**Carry Trade** : Stratégie Forex consistant à emprunter dans une devise à faible taux d'intérêt pour investir dans une devise à taux plus élevé.

**CFD (Contract for Difference)** : Instrument dérivé permettant de spéculer sur la variation du prix d'un actif sans le posséder réellement. Implique un effet de levier.

**Correction** : Baisse de 10 à 20% d'un actif ou d'un indice depuis son plus haut récent. Moins sévère qu'un bear market.

**Couverture (Hedging)** : Stratégie visant à réduire le risque d'un portefeuille en prenant des positions compensatrices.

## D

**Day Trading** : Style de trading où toutes les positions sont ouvertes et fermées dans la même journée.

**DCF (Discounted Cash Flow)** : Méthode de valorisation qui actualise les flux de trésorerie futurs d'une entreprise pour estimer sa valeur intrinsèque.

**Défaut** : Incapacité d'un émetteur (entreprise ou État) à honorer ses obligations de paiement d'intérêts ou de remboursement.

**Dérivé** : Instrument financier dont la valeur dépend d'un actif sous-jacent (action, devise, taux, matière première). Ex : options, futures, CFD.

**Diversification** : Stratégie de gestion du risque consistant à répartir les investissements sur différents actifs, secteurs et zones géographiques.

**Dividende** : Part des bénéfices distribuée aux actionnaires d'une entreprise.

## E

**EBITDA** : Earnings Before Interest, Taxes, Depreciation and Amortization. Bénéfice avant intérêts, impôts, dépréciation et amortissement. Mesure de la rentabilité opérationnelle.

**EMA (Exponential Moving Average)** : Moyenne mobile qui donne plus de poids aux données récentes. Plus réactive qu'une SMA.

**ETF (Exchange-Traded Fund)** : Fonds indiciel coté en bourse qui réplique la performance d'un indice. Combine la diversification des fonds avec la liquidité des actions.

**Effet de levier** : Mécanisme permettant de contrôler une position de valeur supérieure au capital investi. Amplifie les gains et les pertes.

## F

**FOMO (Fear Of Missing Out)** : Peur de rater une opportunité qui pousse à prendre des décisions irrationnelles basées sur l'émotion.

**Free Float** : Pourcentage du capital d'une entreprise librement négociable en bourse (excluant les parts des fondateurs, de l'État, etc.).

**Futures (Contrats à terme)** : Contrats standardisés d'achat/vente d'un actif à un prix et une date futurs prédéfinis.

## G

**Gap (Écart de cours)** : Différence entre le cours de clôture d'une séance et le cours d'ouverture de la séance suivante. Peut signaler une nouvelle importante.

**Gearing** : Ratio d'endettement d'une entreprise. Dettes nettes / fonds propres.

**Growth Stock** : Action d'une entreprise à forte croissance des revenus et bénéfices, généralement valorisée avec un P/E élevé.

## H

**Halving** : Événement Bitcoin qui divise par deux la récompense des mineurs toutes les ~210 000 blocs (~4 ans). Réduit l'offre de nouveaux BTC.

**Hedge Fund** : Fonds d'investissement alternatif utilisant des stratégies complexes (vente à découvert, levier, dérivés) pour générer des rendements absolus.

## I

**Indice boursier** : Indicateur statistique mesurant la performance d'un panier d'actions représentatif d'un marché ou d'un secteur.

**IPO (Initial Public Offering)** : Introduction en Bourse. Première mise en vente d'actions d'une entreprise au grand public.

## L-M

**Liquidité** : Facilité avec laquelle un actif peut être acheté ou vendu rapidement sans affecter significativement son prix.

**Lot** : Unité standard de transaction en Forex. 1 lot standard = 100 000 unités de la devise de base.

**MACD** : Indicateur technique mesurant la convergence/divergence de deux moyennes mobiles exponentielles.

**Marge** : Capital minimum requis pour ouvrir une position avec levier.

**Momentum** : Force et vitesse d'un mouvement de prix. Mesurée par des indicateurs comme le RSI ou le MACD.

## P

**P/E (Price-to-Earnings)** : Ratio cours/bénéfices. Prix de l'action divisé par le bénéfice par action. Mesure combien les investisseurs paient pour 1€ de bénéfice.

**Pip** : Plus petite variation standard d'une paire de devises (0,0001 pour la plupart des paires).

**Portfolio** : Ensemble des investissements détenus par un investisseur ou un fonds.

**Put** : Option de vente. Donne le droit de vendre un actif à un prix fixé avant une date d'expiration.

## R-S

**RSI (Relative Strength Index)** : Oscillateur technique entre 0 et 100 mesurant la vitesse et l'amplitude des mouvements de prix.

**Short Selling (Vente à découvert)** : Vente d'un actif qu'on ne possède pas, avec l'intention de le racheter moins cher pour profiter d'une baisse.

**Spread** : Différence entre le prix d'achat (ask) et le prix de vente (bid). Principal coût de transaction en Forex.

**Stop Loss** : Ordre automatique de clôture d'une position à perte limitée, pour protéger le capital.

## T-V

**Take Profit** : Ordre automatique de clôture d'une position en gain, à un niveau cible prédéfini.

**Trend (Tendance)** : Direction générale du mouvement de prix sur une période donnée : haussière, baissière ou latérale.

**Valeur intrinsèque** : Valeur réelle d'un actif basée sur ses fondamentaux, indépendamment du prix de marché.

**Volatilité** : Mesure de l'amplitude des variations de prix d'un actif. Une volatilité élevée = mouvement de prix importants.

**Volume** : Nombre d'unités d'un actif échangées sur une période donnée. Confirme ou infirme la validité d'un mouvement de prix.
    `
  }
]
