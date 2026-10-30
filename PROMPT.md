# Journal des Prompts — TaskFlow

**Projet :** TaskFlow — Application web de gestion de tâches (Vanilla HTML/CSS/JS)
**Binôme :** Filière Informatique  
**Outils utilisés :** Claude 3.5 Sonnet / ChatGPT  

---

## Prompt 1 — Cadrage général et User Stories de base (Claude)

**Prompt :**
> Tu es un développeur web sénior qui accompagne des étudiants de 1re année en informatique. Nous créons TaskFlow, une application de gestion de tâches en HTML, CSS et JavaScript pur (sans framework), sauvegardée dans le localStorage.  
> Propose 6 User Stories de base couvrant la création, l'affichage, la modification, la suppression et le changement d'état d'une tâche.  
> Respecte le format : « En tant que [rôle], je veux [action] afin de [bénéfice] ». Ne génère aucun code HTML/JS pour l'instant.

**Résultat :**
1. **En tant qu'utilisateur**, je veux ajouter une tâche avec un titre, une priorité et une date d'échéance afin de planifier mon travail à venir.
2. **En tant qu'utilisateur**, je veux voir la liste de toutes mes tâches enregistrées afin d'avoir une vue d'ensemble de mes activités.
3. **En tant qu'utilisateur**, je veux modifier les informations d'une tâche existante afin de corriger une erreur ou adapter une échéance.
4. **En tant qu'utilisateur**, je veux cocher une tâche terminée afin de la distinguer visuellement des tâches restant à faire.
5. **En tant qu'utilisateur**, je veux supprimer une tâche via un bouton corbeille afin de la retirer définitivement de ma liste.
6. **En tant qu'utilisateur**, je veux que mes tâches restent enregistrées dans mon navigateur grâce au localStorage afin de les retrouver après avoir fermé la page.

**Gardé :**
Les 6 User Stories du socle fonctionnel et de la persistance local.

**Rejeté / Modifié :**
Les propositions d'API de rappel ou de synchronisation cloud multi-appareils.

**Pourquoi :**
Le projet interdit les serveurs et bases de données distants, l'application devant être 100% autonome en local.

---

## Prompt 2 — Spécification des User Stories Filière Informatique (ChatGPT)

**Prompt :**
> Dans le cadre de TaskFlow (projet HTML/CSS/JS sans framework), nous devons ajouter la fonctionnalité propre à la filière Informatique.  
> Ajoute 3 User Stories rédigées au format standard (« En tant que... je veux... afin de... ») pour couvrir :  
> 1. Le tri des tâches par priorité ou par date d'échéance.  
> 2. L'attribution de catégories colorées (cours, perso, projet).  
> 3. La recherche de tâches par mot-clé.  
> Format attendu : Liste à puces uniquement.

**Résultat :**
* **En tant qu'étudiant**, je veux trier mes tâches par ordre de priorité ou par date d'échéance afin d'identifier rapidement les éléments les plus urgents.
* **En tant qu'étudiant**, je veux attribuer une catégorie (cours, perso, projet) associée à une couleur spécifique à chaque tâche afin de structurer visuellement ma liste.
* **En tant qu'étudiant**, je veux rechercher des tâches par mot-clé via une barre de recherche afin de retrouver une tâche spécifique instantanément.

**Gardé :**
Les 3 User Stories adaptées aux exigences de la filière Informatique.

**Rejeté / Modifié :**
La création dynamique de sous-catégories personnalisables avec sélecteur de couleurs custom.

**Pourquoi :**
Trois catégories prédéfinies (`cours`, `perso`, `projet`) couvrent le besoin sans alourdir inutilement la logique JS vanilla.

---

## Prompt 3 — Modèle de données JSON et Structure de fichiers (Gemini)

**Prompt :**
> Propose un modèle d'objet JSON représentant une tâche dans TaskFlow, ainsi que la structure de fichiers du projet.  
> Contraintes :  
> - Le JSON doit inclure les champs pour le socle commun (id, titre, description, priorité, date, statut) et pour la filière Informatique (catégorie).  
> - La structure de fichiers doit être minimale, sans framework ni build tool.  
> Fournis le JSON et l'arborescence dans deux blocs de code distincts.

**Résultat :**
```json
{
  "id": 1,
  "titre": "Réviser le CSS",
  "description": "Flexbox",
  "priorite": "haute",
  "echeance": "2026-11-15",
  "statut": "a_faire",
  "categorie": "cours"
}