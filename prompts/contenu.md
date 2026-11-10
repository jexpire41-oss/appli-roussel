# Prompt de contenu — Application Fleurs Roussel

Ce document répertorie les versions successives du prompt permettant de transformer le texte de curiosités botaniques de Madame Roussel en données JSON valides.

---

## Version 1

### Modèle de prompt v1

Tu es un assistant chargé de structurer des données pour une application web : un jeu de mémoire pour la boutique Fleurs Roussel. Le texte à traiter a été copié par la cliente sur un site de curiosités botaniques.

Consignes :
- Identifie les fleurs présentes dans le texte.
- Récupère leur nom, leur identifiant et leur anecdote lorsque ces informations existent.
- Ne crée aucune information absente du texte.
- Respecte la structure définie dans le schéma JSON ci-dessous.

Format de sortie : retourne uniquement un JSON valide, sans commentaire ni explication.

<SCHEMA>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Cartes du jeu de mémoire",
  "description": "Liste des fleurs lue par l'application. Une valeur inconnue vaut null et sa clé figure dans a_verifier.",
  "type": "array",
  "minItems": 1,
  "items": {
    "type": "object",
    "additionalProperties": false,
    "required": ["id", "nom", "anecdote", "a_verifier"],
    "properties": {
      "id": { "type": "string", "pattern": "^[a-z]+(-[a-z]+)*$" },
      "nom": { "type": "string", "minLength": 1 },
      "anecdote": { "type": ["string", "null"], "maxLength": 140 },
      "a_verifier": {
        "type": "array",
        "uniqueItems": true,
        "items": { "type": "string", "enum": ["nom", "anecdote"] }
      }
    }
  }
}
</SCHEMA>

<TEXTE>
[INSERER LE CAS DE TEST ICI]
</TEXTE>

---

### Résultats des tests (v1)

| Cas | Texte injecté dans `<TEXTE>` | Résultat attendu | Résultat obtenu (v1) | OK / ÉCHEC |
|:---|:---|:---|:---|:---:|
| **Cas 1** | `Camélia : Coco Chanel en avait fait l'emblème de sa maison de couture.` | ID `camelia`, nom `Camélia`, `a_verifier: []` | ID avec espace (`"camel ia"`), `"nom"` ajouté à tort dans `a_verifier` | **ÉCHEC** |
| **Cas 2** | `Daffodil: in Wales, people wear a daffodil on Saint David's Day, the national day.` | Nom `Jonquille`, ID `jonquille`, anecdote traduite en français | Nom conservé en anglais (`"Daffodil"`) et ID non traduit | **ÉCHEC** |
| **Cas 3** | `Orchidée : il existe plus de 25 000 espèces d'orchidées, ce qui en fait l'une des plus grandes familles...` | Anecdote résumée en une seule phrase de 140 caractères maximum | Anecdote brute trop longue (dépasse la limite de 140 caractères) | **ÉCHEC** |
| **Cas 4** | `Gerbera :` | `anecdote: null`, `"anecdote"` ajouté à `a_verifier` | Anecdote inventée par l'IA ou tableau `a_verifier` non renseigné | **ÉCHEC** |
| **Cas 5** | `Edelweiss : la fleur LA PLUS RARE DU MONDE !!! Elle pousse en haute montagne...` | Nettoyage des superlatifs non prouvés, exclamations et majuscules abusives | Conservation du superlatif ("LA PLUS RARE DU MONDE !!!") | **ÉCHEC** |
| **Cas 6** | `Lotus : il fleurit en été. (Selon une autre source, il fleurit au printemps.)` | Contradiction détectée, `anecdote: null` et `"anecdote"` dans `a_verifier` | Choix d'une saison au hasard sans signaler la contradiction dans `a_verifier` | **ÉCHEC** |

