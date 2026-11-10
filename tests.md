# Cas de test de l'application : jeu de mémoire

## F1 : Plateau de 16 cartes

| ID | Action | Résultat attendu | Résultat obtenu | OK ? |
|----|--------|------------------|-----------------|------|
| F1-1 | Ouvrir l'appli | 16 cartes sont affichées, toutes faces cachées | | |
| F1-2 | Retourner toutes les cartes une par une (en dehors d'une partie, ou en les comptant) | Chacune des 8 fleurs apparaît exactement 2 fois | | |
| F1-3 | Recharger la page 3 fois | L'ordre des cartes est différent à chaque fois | | |

## F2 : Retourner une carte

| ID | Action | Résultat attendu | Résultat obtenu | OK ? |
|----|--------|------------------|-----------------|------|
| F2-1 | Cliquer sur une carte | L'image et le nom de la fleur apparaissent | | |
| F2-2 | Aller sur une carte avec Tab, puis appuyer sur Entrée | Même résultat qu'avec le clic | | |
| F2-3 | Aller sur une carte avec Tab, puis appuyer sur Espace | Même résultat qu'avec le clic | | |

## F3 : Paire ou pas paire

| ID | Action | Résultat attendu | Résultat obtenu | OK ? |
|----|--------|------------------|-----------------|------|
| F3-1 | Retourner deux cartes identiques | Elles restent visibles et l'anecdote de la fleur s'affiche | | |
| F3-2 | Retourner deux cartes différentes | Après un court instant, elles se recachent | | |
| F3-3 | Cliquer sur une carte d'une paire déjà trouvée | Rien ne se passe | | |

## F4 : Pas plus de deux cartes en attente

| ID | Action | Résultat attendu | Résultat obtenu | OK ? |
|----|--------|------------------|-----------------|------|
| F4-1 | Retourner deux cartes différentes, puis cliquer vite sur une 3e avant qu'elles se recachent | Le clic est ignoré, la 3e carte ne se retourne pas | | |
| F4-2 | Même test au clavier (Entrée sur une 3e carte) | La touche est ignorée | | |
| F4-3 | Cliquer deux fois sur la même carte | Ce n'est pas compté comme une paire, la carte reste retournée une seule fois | | |

## F5 : Compteur de coups

| ID | Action | Résultat attendu | Résultat obtenu | OK ? |
|----|--------|------------------|-----------------|------|
| F5-1 | Ouvrir l'appli | Le compteur affiche 0 | | |
| F5-2 | Retourner une seule carte | Le compteur reste à 0 | | |
| F5-3 | Retourner une deuxième carte | Le compteur passe à 1 | | |

## F6 : Fin de partie et rejouer

| ID | Action | Résultat attendu | Résultat obtenu | OK ? |
|----|--------|------------------|-----------------|------|
| F6-1 | Trouver la dernière paire | Un message de fin s'affiche avec le nombre de coups | | |
| F6-2 | Cliquer sur Rejouer | Les cartes sont remélangées et cachées, le compteur repasse à 0 | | |
| F6-3 | Accéder au bouton Rejouer avec Tab, puis Entrée | La partie recommence | | |

## Tests transversaux

| ID | Action | Résultat attendu | Résultat obtenu | OK ? |
|----|--------|------------------|-----------------|------|
| T-1 | Afficher la page à 375 px de large | Aucun défilement horizontal, tout est lisible et cliquable | | |
| T-2 | Faire une partie entière avec le clavier seul | Tout est utilisable sans souris, le focus est visible | | |
| T-3 | Ouvrir la console du navigateur pendant une partie | Aucune erreur affichée | | |
| T-4 | Regarder toutes les fleurs et anecdotes affichées | Seul le contenu de la cliente apparaît, rien d'inventé | | |