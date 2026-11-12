
# Journal des décisions concernant l'utilisation de l'IA

**Projet :** Memory Fleurs Roussel  
**Assistant IA utilisé :** ChatGPT et Gemini

## Objectif du journal

Ce journal permet de suivre les propositions de ChatGPT
qui ont été refusées ou corrigées par l'équipe, les raisons
de ces décisions et les consignes ajoutées aux prompts
pour éviter que les mêmes problèmes se reproduisent.

---

## Décision n°1 — Amélioration des scénarios de test de F1

| Élément | Description |
|---|---|
| Assistant IA | Gemini |
| Fonctionnalité concernée | F1 — Chargement et affichage de la grille initiale |
| Proposition initiale de l'IA | Gemini a proposé trois tests : vérifier les 16 cartes, le mélange à chaque rechargement et l'état initial des cartes cachées. |
| Problème identifié | La proposition ne vérifiait pas explicitement la présence de 8 fleurs différentes en double exact et ne respectait pas précisément la règle des trois rechargements successifs. |
| Décision de l'équipe | Demander une correction et compléter les scénarios de test. |
| Justification | Les tests doivent couvrir toutes les exigences définies pour la fonctionnalité F1. |
| Consigne ajoutée au prompt | Fournir les exigences exactes de F1 dans le prompt et demander un scénario de test pour chaque exigence, sans ajouter de contraintes supplémentaires ni inventer le chemin du fichier JSON. |
| Résultat de la correction | Gemini a fourni quatre scénarios couvrant les 16 cartes, les 8 fleurs en double, le mélange sur trois rechargements et l'état initial des cartes cachées. |
