# WeFund Dashboard SI

Dashboard public du POC **WeFund** permettant de visualiser quelques indicateurs métier autour des campagnes et des contributions.  
Ce projet correspond à la partie **Projet 4 : Dashboard SI / Gestion de projet** du cahier des charges WeFund.

## Objectif

Afficher des métriques et graphiques de suivi pour le POC WeFund, notamment :

- campagnes actives
- contributions totales
- montant collecté
- taux de succès
- contribution moyenne

## Architecture

Le projet suit une structure simple avec **`app/`** pour les pages et routes API Next.js, **`components/`** pour les composants d’interface et les graphiques, et **`lib/`** pour la logique métier, la configuration et les données du POC.  
Le dashboard principal se trouve dans **`app/dashboard/page.tsx`**, tandis que les routes API internes sont définies dans des fichiers **`route.ts`**, par exemple pour exposer les métriques.  
Les graphiques sont regroupés dans **`components/charts/`**.

## Stack

- **Next.js**
- **React**
- **TypeScript**
- données mockées en mémoire pour le POC

## Lancement local

Le projet est prévu pour tourner sur le port **3003**.

```bash
PORT=3003 npm run dev
# Dashboard: http://localhost:3003/dashboard