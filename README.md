# TaskFlow – To Do List

## 1. Présentation du projet

TaskFlow est un projet de To Do List réalisé dans le cadre de notre formation en développement web.

L'objectif est de créer une application permettant de gérer simplement ses tâches quotidiennes.

L'application doit permettre de retrouver, organiser et suivre ses tâches grâce à différentes fonctionnalités.

---

## 2. Architecture du projet

Nous avons choisi une architecture simple afin de séparer les différents langages et de faciliter l'organisation du projet.

### Architecture retenue

```text
taskflow/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── assets/
│   ├── images/
│   └── icons/
│
└── README.md
```

### Pourquoi conserver cette architecture ?

- **index.html :** conservé car il représente le point d'entrée de l'application et contient la structure de la page.
- **css/ :** conservé pour séparer le design du contenu HTML. Cela permet de modifier l'apparence sans toucher à la structure.
- **js/ :** conservé pour regrouper le fonctionnement de l'application et les interactions avec l'utilisateur.
- **assets/ :** conservé pour centraliser les ressources visuelles du projet.
- **images/ :** conservé pour stocker les images qui pourraient être utilisées dans l'application.
- **icons/ :** conservé pour stocker les icônes et améliorer la présentation de l'interface.
- **README.md :** conservé pour documenter le projet, expliquer son fonctionnement et présenter les choix réalisés.

### Pourquoi ne pas ajouter d'autres dossiers ?

Nous avons choisi de ne pas multiplier les dossiers et les fichiers pour le moment.

Le projet étant réalisé sans framework ni outil de compilation, une architecture plus complexe ne serait pas nécessaire à ce stade.

Nous pourrons ajouter de nouveaux fichiers si le développement de l'application le demande.

---

## 3. Structure des fichiers

Chaque fichier possède un rôle précis dans le projet.

| Fichier | Rôle |
|---|---|
| index.html | Structure de la page web |
| css/style.css | Mise en forme et design |
| js/app.js | Fonctionnalités JavaScript |
| assets/images/ | Stockage des images |
| assets/icons/ | Stockage des icônes |
| README.md | Documentation du projet |

### Pourquoi conserver cette organisation ?

Cette organisation permet de :

- Retrouver facilement les fichiers.
- Éviter de mélanger les différents langages.
- Faciliter le travail en équipe.
- Simplifier la maintenance du projet.
- Faire évoluer l'application progressivement.

Nous avons préféré garder un seul fichier JavaScript au départ plutôt que de séparer chaque fonctionnalité dans un fichier différent. Cela permet de faciliter la compréhension du code pendant notre apprentissage.

---

## 4. Modèle de données JSON

Pour représenter une tâche dans TaskFlow, nous avons choisi d'utiliser un objet JSON.

Cet objet permet de regrouper toutes les informations nécessaires à la gestion d'une tâche.

### Modèle JSON proposé

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
```

### Explication et choix des différents champs

| Champ | Utilité | Choix |
|---|---|---|
| id | Identifie chaque tâche de manière unique. | Conservé |
| titre | Donne un nom à la tâche. | Conservé |
| description | Apporte des précisions sur la tâche. | Conservé |
| priorite | Permet de définir l'importance de la tâche. | Conservé |
| echeance | Indique la date limite de réalisation. | Conservé |
| statut | Indique si la tâche est à faire ou terminée. | Conservé |
| categorie | Permet de classer les tâches par type. | Conservé |

### Pourquoi conserver ces éléments ?

- **id :** indispensable pour différencier les tâches, notamment lorsqu'elles possèdent le même titre.
- **titre :** indispensable pour identifier rapidement une tâche.
- **description :** utile pour ajouter des informations complémentaires sans rendre le titre trop long.
- **priorite :** permet de mieux organiser son travail et de savoir quelles tâches traiter en premier.
- **echeance :** permet de connaître les dates limites et de mieux gérer son temps.
- **statut :** permet de différencier les tâches terminées de celles qui restent à faire.
- **categorie :** permet de classer les tâches, par exemple entre les cours, les projets et les activités personnelles.

### Pourquoi ne pas supprimer de champs ?

Nous avons décidé de conserver les sept champs proposés, car chacun apporte une information différente.

Même si certains champs peuvent sembler secondaires au début, ils permettent d'envisager davantage de fonctionnalités par la suite.

Par exemple, la catégorie et la priorité pourront servir à filtrer ou à trier les tâches.

---

## 5. Choix techniques du projet

Nous avons choisi de partir sur des technologies web classiques :

- **HTML :** pour construire la structure de l'application.
- **CSS :** pour gérer l'apparence et la mise en page.
- **JavaScript :** pour rendre l'application interactive.
- **JSON :** pour représenter et organiser les données des tâches.

Nous avons décidé de ne pas utiliser de framework ni de build tool afin de travailler directement avec les bases du développement web et de mieux comprendre le fonctionnement de chaque langage.

---

## 6. Prompts utilisés

### Prompt 3 — Modèle de données JSON et Structure de fichiers (Gemini)

**Prompt :**

> Propose un modèle d'objet JSON représentant une tâche dans TaskFlow, ainsi que la structure de fichiers du projet.
>
> Contraintes :
> - Le JSON doit inclure les champs pour le socle commun (id, titre, description, priorité, date, statut) et pour la filière Informatique (catégorie).
> - La structure de fichiers doit être minimale, sans framework ni build tool.
> - Fournis le JSON et l'arborescence dans deux blocs de code distincts.

**Résultat obtenu :**

Le modèle JSON et l'arborescence proposés ont servi de base à notre réflexion pour organiser le projet et définir les informations nécessaires à chaque tâche.

---

## 7. Conclusion

Pour TaskFlow, nous avons privilégié une organisation simple, lisible et évolutive.

L'objectif est de construire une application fonctionnelle en comprenant les bases du développement web, plutôt que d'utiliser des outils complexes dès le départ.

Les choix d'architecture et de modèle de données pourront évoluer en fonction des besoins et des fonctionnalités que nous ajouterons au projet.
