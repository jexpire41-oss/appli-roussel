# Documentation des Tests — Jeu de Mémoire Fleurs Roussel

Ce document recense les cas de test d'extraction de données, fonctionnels et d'accessibilité pour l'application du jeu de mémoire.

---

## 1. Tests d'Extraction de Données (Prompting)

Les tests ci-dessous ont été exécutés sur le prompt de contenu (`prompts/contenu.md`) avec un taux de réussite final de **6/6 (100%)** en v2/v3.

| Identifiant | Scénario de test | Entrée injectée | Attendu | Statut |
|:---|:---|:---|:---|:---:|
| **TEST-DATA-01** | Normalisation de l'ID | `Camélia : Coco Chanel...` | ID en minuscules sans accent (`camelia`), `a_verifier: []` | **PASS** |
| **TEST-DATA-02** | Traduction & ID | `Daffodil: in Wales...` | Nom `Jonquille`, ID `jonquille` | **PASS** |
| **TEST-DATA-03** | Longueur d'anecdote | `Orchidée : il existe 25 000...` | Anecdote résumée <= 140 caractères | **PASS** |
| **TEST-DATA-04** | Information manquante | `Gerbera :` | `anecdote: null`, `"anecdote"` dans `a_verifier` | **PASS** |
| **TEST-DATA-05** | Nettoyage de bruit | `Edelweiss : LA PLUS RARE !!!` | Suppression des superlatifs et exclamations | **PASS** |
| **TEST-DATA-06** | Contradiction | `Lotus : fleurit en été (or printemps)` | `anecdote: null`, `"anecdote"` dans `a_verifier` | **PASS** |

---

## 2. Tests Fonctionnels de l'Application Web

| Identifiant | Composant | Action | Résultat attendu | Statut |
|:---|:---|:---|:---|:---:|
| **TEST-UI-01** | Chargement | Ouverture de la page | Les 16 cartes sont générées dynamiquement depuis `data/donnees.json` | **PASS** |
| **TEST-UI-02** | Mécanique de jeu | Clic sur 2 cartes identiques | Les 2 cartes restent retournées et l'anecdote s'affiche | **PASS** |
| **TEST-UI-03** | Mécanique de jeu | Clic sur 2 cartes différentes | Les cartes se masquent à nouveau après 1 seconde | **PASS** |
| **TEST-UI-04** | Fin de partie | 8 paires trouvées | Affichage du message de victoire et du bouton « Rejouer » | **PASS** |

---

## 3. Tests d'Accessibilité Clavier & RGAA

| Identifiant | Composant | Action | Résultat attendu | Statut |
|:---|:---|:---|:---|:---:|
| **TEST-A11Y-01** | Navigation clavier | Appui sur la touche `Tab` | Déplacement du focus visible d'une carte à l'autre dans l'ordre de la grille | **PASS** |
| **TEST-A11Y-02** | Activation clavier | Appui sur `Entrée` ou `Espace` | Retournement de la carte sélectionnée et vérification de paire | **PASS** |
| **TEST-A11Y-03** | Gestion du focus | Carte déjà validée (`disabled`) | La carte trouvée n'est plus activable et le focus passe au bouton « Rejouer » en fin de partie | **PASS** |
