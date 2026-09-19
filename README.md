# Toolègba — Site web (page d'accueil)

Base Next.js 14 (App Router) + Tailwind CSS pour le site de Toolègba, agence
marketing 360° / BTL.

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Ce qui est fait dans cette première étape

- **Header** (`components/Header.tsx`) : logo Toolègba (version blanche) fixe
  en haut à gauche, navigation à droite (Services, Réalisations, Agence,
  Contact).
- **HeroStack** (`components/HeroStack.tsx`) : la section héros, sous forme
  d'empilement de 6 slides plein écran — une par service — qui se recouvrent
  au scroll (technique `position: sticky` + `z-index` croissant, sans
  JavaScript). Chaque slide affiche un mot/titre en très grand (League
  Spartan), une légende courte (Poppins), et pour BTL/ATL le sigle est défini
  ("Below The Line" / "Above The Line").
- **BottomBar** (`components/BottomBar.tsx`) : contact et indicateur de scroll
  fixes, par-dessus les slides — comme sur la page de référence fournie.
- La dernière slide est recouverte par une section de clôture (`app/page.tsx`)
  qui annonce la suite du site (réalisations, présence Afrique, agence,
  contact) — c'est là que la suite du travail viendra s'ancrer.

## Images

Les visuels de fond sont pour l'instant des images de substitution
(`picsum.photos`, générées à partir d'un identifiant fixe par slide donc
stables). À remplacer par vos propres visuels dans
`components/HeroStack.tsx` (tableau `SLIDES`, champ `seed` → remplacer par
`src="/images/....jpg"` une fois les visuels choisis et déposés dans
`public/images/`).

## Polices et couleurs

- Polices auto-hébergées dans `public/fonts/` (League Spartan, Poppins) —
  pas de dépendance à Google Fonts au chargement.
- Couleurs de la charte graphique déclarées dans `tailwind.config.ts`
  (`petrole`, `corail`, `bordeaux`, `orange`, `rougevif`, `sarcelle`,
  `ivoire`).

## Prochaines étapes suggérées

1. Valider/ajuster les 6 mots-clés et légendes des slides avec l'agence.
2. Fournir les visuels définitifs pour chaque slide.
3. Construire les sections suivantes de la page d'accueil : réalisations,
   présence dans les 6 pays, agence, contact.
