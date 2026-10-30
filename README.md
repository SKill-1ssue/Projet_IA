# Projet_I

# TO DO LIST – User Stories

## Présentation du projet

Application de gestion de tâches (TO DO LIST) développée en HTML, CSS et JavaScript natif, sans framework.

## User Stories

### US01 – Créer une tâche
- **En tant que :** utilisateur.
- **Je veux :** pouvoir créer une tâche en renseignant obligatoirement un titre et éventuellement une description.
- **Afin de :** enregistrer les actions que je dois accomplir.

### US02 – Modifier une tâche
- **En tant que :** utilisateur.
- **Je veux :** pouvoir modifier le titre et la description d'une tâche existante.
- **Afin de :** corriger ou actualiser ses informations.

### US03 – Supprimer une tâche
- **En tant que :** utilisateur.
- **Je veux :** pouvoir supprimer une tâche après confirmation.
- **Afin de :** retirer définitivement les tâches qui ne sont plus nécessaires et éviter les suppressions accidentelles.

### US04 – Terminer une tâche
- **En tant que :** utilisateur.
- **Je veux :** pouvoir marquer une tâche comme terminée ou annuler son état terminé.
- **Afin de :** suivre mon avancement et garder le contrôle sur mes tâches.

### US05 – Consulter les tâches
- **En tant que :** utilisateur.
- **Je veux :** pouvoir consulter l'ensemble de mes tâches en distinguant celles qui sont terminées de celles qui restent à faire.
- **Afin de :** avoir une vision claire de mon travail.

### US06 – Attribuer une date limite
- **En tant que :** utilisateur.
- **Je veux :** pouvoir attribuer ou modifier une date limite à une tâche, tout en ayant la possibilité de ne pas en définir une.
- **Afin de :** mieux organiser mon temps et respecter mes échéances.

### US07 – Trier les tâches par date
- **En tant que :** utilisateur.
- **Je veux :** pouvoir trier mes tâches selon leur date limite, de la plus proche à la plus éloignée ou inversement.
- **Afin de :** identifier rapidement les tâches à traiter en priorité.

### US08 – Rechercher une tâche
- **En tant que :** utilisateur.
- **Je veux :** pouvoir rechercher une tâche à partir de son titre.
- **Afin de :** la retrouver rapidement sans devoir parcourir toute ma liste.

---

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Objectif

Développer une application simple et fonctionnelle permettant de créer, organiser, modifier, supprimer et suivre des tâches quotidiennes.

# TaskFlow – To Do List

## 1. Présentation

TaskFlow est un projet de To Do List réalisé dans le cadre de notre formation en développement web.

L'objectif est de créer une application permettant de gérer simplement ses tâches quotidiennes.

## 2. Architecture du projet

Nous avons mis en place une architecture de fichiers afin d'organiser correctement le projet et de séparer les différents langages utilisés.

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
├── README.md
│
└── PROMPTS.md
```

## 3. Organisation des fichiers

- **index.html** : contient la structure de la page web.
- **css/style.css** : contient les éléments visuels et la mise en forme.
- **js/app.js** : contient le JavaScript et les fonctionnalités de l'application.
- **assets/images/** : permet de stocker les images du projet.
- **assets/icons/** : permet de stocker les icônes.
- **README.md** : présente le projet et son organisation.
- **PROMPTS.md** : permet de conserver les prompts utilisés avec l'intelligence artificielle.

## 4. Objectif de cette organisation

Cette architecture permet de :
- Séparer le HTML, le CSS et le JavaScript.
- Faciliter la lecture et la compréhension du code.
- Retrouver rapidement les différents fichiers.
- Travailler plus facilement à plusieurs.
- Pouvoir faire évoluer le projet par la suite.