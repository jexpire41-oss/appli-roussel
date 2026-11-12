# Relecture du code par l'intelligence artificielle

**Projet :** Memory Fleurs Roussel

**Assistant IA :** ChatGPT

## 1. Objectif

Demander à une intelligence artificielle de relire le code de notre application Memory Fleurs Roussel afin de détecter les erreurs, les problèmes de fonctionnement et les améliorations possibles.

La relecture doit respecter les règles définies dans `AGENTS.md`, les fonctionnalités décrites dans `fonctionnalites.md` et les cas de test définis dans `tests.md`.

L'IA doit analyser le code sans le modifier directement.

## 2. Prompt de relecture

Tu es un développeur web expérimenté chargé de relire le code de notre application Memory Fleurs Roussel.

Le projet est un jeu de mémoire développé en HTML, Tailwind CSS et JavaScript natif.

Avant de commencer, prends connaissance des fichiers suivants :
- `AGENTS.md` : règles et contraintes du projet.
- `fonctionnalites.md` : fonctionnalités attendues.
- `tests.md` : scénarios de test.
- Les fichiers HTML, CSS et JavaScript de l'application.

Respecte les consignes suivantes :

1. Vérifie que le code respecte les règles de `AGENTS.md`.
2. Vérifie que les fonctionnalités demandées sont correctement implémentées.
3. Vérifie la lisibilité et l'organisation du code JavaScript.
4. Vérifie l'accessibilité au clavier et la navigation entre les cartes.
5. Vérifie l'affichage responsive, notamment sur un écran de 375 px.
6. Recherche les erreurs potentielles dans le code et les problèmes pouvant apparaître dans la console du navigateur.
7. Vérifie la cohérence entre le code et les tests définis dans `tests.md`.

Pour chaque problème identifié, indique :
- Le fichier concerné.
- Le problème constaté.
- Pourquoi cela pose problème.
- Une amélioration possible.
- La règle ou le test concerné.

Ne modifie pas directement les fichiers du projet.

Ne prétends pas avoir exécuté des tests que tu n'as pas réellement effectués.

Ne propose pas de nouvelles fonctionnalités qui ne sont pas demandées.

Présente tes remarques de manière claire et compréhensible, en français.

## 3. Grille de relecture

| Point à vérifier | Questions à se poser |
|---|---|
| Fonctionnement du jeu | Les fonctionnalités F1 à F6 respectent-elles les exigences ? |
| Code JavaScript | Le code est-il lisible, organisé et compréhensible ? |
| Respect de AGENTS.md | Les règles du projet sont-elles respectées ? |
| Accessibilité | Peut-on utiliser le jeu au clavier ? |
| Responsive | L'application fonctionne-t-elle correctement à 375 px ? |
| Console | Existe-t-il des erreurs JavaScript ou de chargement ? |
| Tests | Le code correspond-il aux scénarios de tests de `tests.md` ? |

## 4. Traitement des remarques de l'IA

Après la relecture :

1. Lire chaque remarque proposée par l'IA.
2. Vérifier si le problème existe réellement dans le code.
3. Décider d'accepter, de refuser ou de corriger la remarque.
4. Justifier chaque décision.
5. Noter dans `journal.md` les propositions de l'IA qui ont été refusées ou corrigées, ainsi que les consignes ajoutées au prompt.

Les modifications du code doivent être réalisées et vérifiées par l'équipe.

## 5. Objectif final

Obtenir un code fonctionnel, lisible, accessible et responsive, qui respecte les règles du projet et les scénarios de test définis par l'équipe.