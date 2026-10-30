# PROMPT.md --- Historique commenté de notre conversation sur la To-Do List

> **Objet du document :** conserver l'historique de nos échanges sur la
> définition des User Stories d'une application To-Do List, avec les
> messages de l'utilisateur, les réponses de l'assistant et des
> commentaires expliquant pourquoi chaque étape a été réalisée.
>
> **Périmètre :** ce document reprend la conversation visible dans ce
> fil, depuis la question « c'est quoi un user stories » jusqu'à la
> demande de création de ce fichier. Il ne prétend pas récupérer
> d'éventuelles conversations distinctes qui ne figurent pas dans ce
> fil.

------------------------------------------------------------------------

## 1. Comprendre ce qu'est une User Story

### Message de l'utilisateur

> c'est quoi un user stories

### Réponse de l'assistant

Une **User Story** (ou *histoire utilisateur*) est une phrase qui décrit
une fonctionnalité d'un logiciel du point de vue de la personne qui va
l'utiliser.

Elle permet de répondre à trois questions : - **Qui ?** Qui utilise la
fonctionnalité ? - **Quoi ?** Que veut-il faire ? - **Pourquoi ?** Dans
quel but ?

Structure généralement utilisée :

> En tant que \[utilisateur\], je veux \[objet\] afin de
> \[objectif\].

Exemple :

> En tant qu'utilisateur, je veux pouvoir me connecter avec mon adresse
> e-mail et mon mot de passe afin d'accéder à mon compte personnel.

L'assistant a également expliqué la différence entre : - **User Story
:** le besoin de l'utilisateur. - **Tâche technique :** le travail à
réaliser par le développeur. - **Critères d'acceptation :** les
conditions qui permettent de vérifier que la fonctionnalité répond au
besoin.

### Commentaire --- Pourquoi cette étape ?

Avant de rédiger les besoins de l'application, il fallait comprendre ce
qu'est une User Story et à quoi elle sert. La structure « En tant que...
je veux... afin de... » permet de formuler les fonctionnalités du point
de vue de l'utilisateur, sans commencer directement par les choix de
code ou de technologie.

------------------------------------------------------------------------

## 2. Définir le rôle de l'assistant pour le projet

### Message de l'utilisateur

> ok donc tes un expert en outils ia et dévellopement de project ia

### Réponse de l'assistant

L'assistant a confirmé qu'il pouvait accompagner l'utilisateur sur
plusieurs domaines : 1. Les outils d'IA : ChatGPT, Claude, Gemini,
Cursor, GitHub Copilot, Make, n8n, etc. 2. Le développement IA :
applications intégrant de l'IA, API, automatisation et agents IA. 3. La
gestion de projet : cahier des charges, User Stories, fonctionnalités,
MVP et roadmap. 4. Le développement informatique : Go, Python,
JavaScript, bases de données, Git et architecture logicielle. 5.
L'optimisation : choix des outils, coûts, automatisation et
performances.

Il a proposé d'agir comme un chef de projet technique pour analyser une
idée, identifier les besoins, choisir les technologies et construire le
projet étape par étape.

### Commentaire --- Pourquoi cette étape ?

L'utilisateur précise le rôle attendu de l'assistant : l'aider à
réfléchir au projet et à le structurer, pas seulement répondre à des
questions de programmation. Cette posture est utile pour travailler
d'abord sur les besoins, puis sur la conception et enfin sur le
développement.

------------------------------------------------------------------------

## 3. Obtenir des exemples de User Stories pour une To-Do List

### Message de l'utilisateur

> donc maintenant je te demande de me donner des exemple de user story
> pour faire une too doo list

### Réponse de l'assistant

L'assistant a proposé des exemples répartis par familles de
fonctionnalités.

#### Gestion des tâches

-   **US01 :** En tant qu'utilisateur, je veux pouvoir créer une tâche
    afin de noter ce que je dois faire.
-   **US02 :** En tant qu'utilisateur, je veux pouvoir modifier une
    tâche afin de corriger ou actualiser ses informations.
-   **US03 :** En tant qu'utilisateur, je veux pouvoir supprimer une
    tâche afin de retirer celles qui ne sont plus utiles.
-   **US04 :** En tant qu'utilisateur, je veux pouvoir marquer une tâche
    comme terminée afin de suivre mon avancement.
-   **US05 :** En tant qu'utilisateur, je veux pouvoir consulter toutes
    mes tâches afin de connaître ce qu'il me reste à faire.

#### Organisation des tâches

-   **US06 :** En tant qu'utilisateur, je veux pouvoir attribuer une
    date limite à une tâche afin de respecter mes échéances.
-   **US07 :** En tant qu'utilisateur, je veux pouvoir définir une
    priorité afin d'identifier les tâches importantes.
-   **US08 :** En tant qu'utilisateur, je veux pouvoir classer mes
    tâches par catégorie afin de mieux les organiser.
-   **US09 :** En tant qu'utilisateur, je veux pouvoir trier mes tâches
    par date afin de visualiser les prochaines échéances.

#### Recherche et filtrage

-   **US10 :** En tant qu'utilisateur, je veux pouvoir rechercher une
    tâche par son nom afin de la retrouver rapidement.
-   **US11 :** En tant qu'utilisateur, je veux pouvoir afficher
    uniquement les tâches terminées afin de consulter mon historique.
-   **US12 :** En tant qu'utilisateur, je veux pouvoir afficher
    uniquement les tâches non terminées afin de me concentrer sur ce
    qu'il me reste à faire.

#### Personnalisation et confort

-   **US13 :** En tant qu'utilisateur, je veux pouvoir choisir un thème
    clair ou sombre afin d'adapter l'application à mes préférences.
-   **US14 :** En tant qu'utilisateur, je veux recevoir un rappel avant
    la date limite d'une tâche afin de ne pas oublier une échéance.
-   **US15 :** En tant qu'utilisateur, je veux visualiser le nombre de
    tâches terminées afin de suivre ma progression.

L'assistant a aussi expliqué qu'une User Story pouvait être complétée
par des critères d'acceptation et a donné un exemple pour la création
d'une tâche.

### Commentaire --- Pourquoi cette étape ?

Il fallait partir d'un ensemble assez large d'idées pour découvrir les
fonctionnalités possibles d'une To-Do List. Cette liste était une base
de réflexion, pas une liste définitive : l'utilisateur pouvait
sélectionner les fonctionnalités utiles à son projet et écarter celles
qui n'étaient pas nécessaires.

------------------------------------------------------------------------

## 4. Sélectionner les User Stories à conserver

### Message de l'utilisateur

> donc j'ai choisie c'est user stories : ID User Story Priorité US06 En
> tant qu'utilisateur, je veux pouvoir attribuer une date limite à une
> tâche afin de respecter mes échéances.
>
> 1.  US09 En tant qu'utilisateur, je veux pouvoir trier mes tâches par
>     date afin de visualiser les prochaines échéances.
> 2.  ID User Story Priorité US01 En tant qu'utilisateur, je veux
>     pouvoir créer une tâche afin de noter ce que je dois faire. Haute
>     US02 En tant qu'utilisateur, je veux pouvoir modifier une tâche
>     afin de corriger ou actualiser ses informations. Haute US03 En
>     tant qu'utilisateur, je veux pouvoir supprimer une tâche afin de
>     retirer celles qui ne sont plus utiles. Haute US04 En tant
>     qu'utilisateur, je veux pouvoir marquer une tâche comme terminée
>     afin de suivre mon avancement. Haute US05 En tant qu'utilisateur,
>     je veux pouvoir consulter toutes mes tâches afin de connaître ce
>     qu'il me reste à faire. Haute.

### Réponse de l'assistant

L'assistant a remis les User Stories dans l'ordre et présenté cette
sélection :

  ID     Fonctionnalité                     Priorité
  ------ ---------------------------------- -----------
  US01   Créer une tâche                    Haute
  US02   Modifier une tâche                 Haute
  US03   Supprimer une tâche                Haute
  US04   Marquer une tâche comme terminée   Haute
  US05   Consulter toutes les tâches        Haute
  US06   Attribuer une date limite          À définir
  US09   Trier les tâches par date          À définir

Il a proposé de travailler sur chaque User Story pour préciser : 1. Sa
formulation. 2. Les règles métier. 3. Les critères d'acceptation. 4. Les
cas particuliers. 5. Les priorités.

### Commentaire --- Pourquoi cette étape ?

L'utilisateur a choisi les fonctionnalités qu'il souhaitait réellement
développer. La sélection réduit le périmètre du projet et évite
d'ajouter des fonctions simplement parce qu'elles sont possibles.
L'assistant a remis la liste en ordre pour la rendre plus lisible.

**Point à retenir :** à ce stade, l'utilisateur avait choisi US01 à US06
ainsi que le tri par date, initialement numéroté US09. La numérotation a
ensuite été harmonisée dans la liste finale en US07.

------------------------------------------------------------------------

## 5. Affiner les besoins de création d'une tâche

### Message de l'utilisateur

> Tu es un développeur web qui aide\
> des étudiants de 1re année.\
> Nous créons une TO DO LIST, une app de\
> tâches en HTML, CSS et JavaScript\
> sans framework. Je tes Proposer 8 user\
> stories au format « En tant que...\
> je veux... afin de... ». Pas de code.\
> Réponds sous forme de liste.\
> et afine chaque USER STORIES

### Réponse de l'assistant

L'assistant a reformulé les besoins dans le contexte d'une application
web réalisée en HTML, CSS et JavaScript natif, sans framework.

Il a proposé les formulations suivantes :

1.  **US01 -- Créer une tâche**\
    En tant qu'utilisateur, je veux pouvoir créer une tâche en
    renseignant son titre et éventuellement une description afin
    d'enregistrer les choses que je dois accomplir.

2.  **US02 -- Modifier une tâche**\
    En tant qu'utilisateur, je veux pouvoir modifier le titre, la
    description et les informations d'une tâche existante afin de
    corriger une erreur ou d'actualiser son contenu.

3.  **US03 -- Supprimer une tâche**\
    En tant qu'utilisateur, je veux pouvoir supprimer une tâche de ma
    liste afin de retirer les tâches qui ne sont plus nécessaires.

4.  **US04 -- Terminer une tâche**\
    En tant qu'utilisateur, je veux pouvoir marquer une tâche comme
    terminée et pouvoir annuler cette action afin de suivre mon
    avancement.

5.  **US05 -- Consulter les tâches**\
    En tant qu'utilisateur, je veux pouvoir consulter toutes mes tâches
    et distinguer celles qui sont terminées de celles qui restent à
    faire afin d'avoir une vue d'ensemble de mon travail.

6.  **US06 -- Attribuer une date limite**\
    En tant qu'utilisateur, je veux pouvoir définir ou modifier une date
    limite pour chaque tâche afin de planifier mon travail et de
    respecter mes échéances.

7.  **US07 -- Trier les tâches par date**\
    En tant qu'utilisateur, je veux pouvoir trier mes tâches par date
    limite, de la plus proche à la plus éloignée ou inversement, afin
    d'identifier les tâches à effectuer en priorité.

8.  **US08 -- Rechercher une tâche**\
    En tant qu'utilisateur, je veux pouvoir rechercher une tâche à
    partir de son titre afin de la retrouver rapidement sans parcourir
    toute ma liste.

L'assistant a ajouté des précisions fonctionnelles, notamment le
caractère obligatoire du titre, la possibilité d'une description
facultative, la confirmation avant suppression et le comportement des
tâches sans date limite.

### Commentaire --- Pourquoi cette étape ?

L'utilisateur a précisé le contexte technique et pédagogique : une
application web sans framework, destinée à un travail de première année.
Il a demandé huit User Stories affinées, sans code. L'assistant a donc
reformulé les besoins et ajouté la recherche comme huitième
fonctionnalité afin d'obtenir une liste de huit éléments.

**Point à retenir :** la fonctionnalité de recherche a été ajoutée par
l'assistant. Elle n'était pas dans la sélection initiale de
l'utilisateur ; elle doit donc être considérée comme une proposition
tant que l'utilisateur ne l'a pas validée explicitement.

------------------------------------------------------------------------

## 6. Présenter chaque User Story en trois points

### Message de l'utilisateur

> Je tes Proposer 8 user\
> stories que je veux que tu mettent au format « En tant que...\
> je veux... afin de... ». Pas de code.\
> Réponds sous forme de liste.\
> et affine chaque user stories

### Réponse de l'assistant

L'assistant a présenté les huit User Stories sous une forme structurée :

1.  **US01 -- Créer une tâche**\
    En tant qu'utilisateur, je veux pouvoir créer une tâche en
    renseignant obligatoirement un titre et éventuellement une
    description afin d'enregistrer les actions que je dois accomplir.

2.  **US02 -- Modifier une tâche**\
    En tant qu'utilisateur, je veux pouvoir modifier le titre, la
    description et les informations d'une tâche existante afin de
    corriger ou actualiser ses informations.

3.  **US03 -- Supprimer une tâche**\
    En tant qu'utilisateur, je veux pouvoir supprimer une tâche après
    confirmation afin de retirer définitivement les tâches qui ne sont
    plus nécessaires et éviter les suppressions accidentelles.

4.  **US04 -- Terminer une tâche**\
    En tant qu'utilisateur, je veux pouvoir marquer une tâche comme
    terminée ou annuler son état terminé afin de suivre mon avancement
    et de garder le contrôle sur mes tâches.

5.  **US05 -- Consulter les tâches**\
    En tant qu'utilisateur, je veux pouvoir consulter l'ensemble de mes
    tâches en distinguant celles qui sont terminées de celles qui
    restent à faire afin d'avoir une vision claire de mon travail.

6.  **US06 -- Attribuer une date limite**\
    En tant qu'utilisateur, je veux pouvoir attribuer ou modifier une
    date limite à une tâche, tout en ayant la possibilité de ne pas en
    définir une, afin de mieux organiser mon temps et respecter mes
    échéances.

7.  **US07 -- Trier les tâches par date**\
    En tant qu'utilisateur, je veux pouvoir trier mes tâches selon leur
    date limite, de la plus proche à la plus éloignée ou inversement,
    afin d'identifier rapidement les tâches à traiter en priorité.

8.  **US08 -- Rechercher une tâche**\
    En tant qu'utilisateur, je veux pouvoir rechercher une tâche à
    partir de son titre afin de la retrouver rapidement sans devoir
    parcourir toute ma liste.

### Commentaire --- Pourquoi cette étape ?

L'objectif était de conserver la formulation standard des User Stories
tout en rendant chaque besoin plus précis. Les formulations indiquent
l'utilisateur concerné, l'action souhaitée et la raison de cette action.

------------------------------------------------------------------------

## 7. Séparer « En tant que », « Je veux » et « Afin de »

### Message de l'utilisateur

> ok maintenant met chaque en tant que je veux et afin de tu les met
> sous forme de point

### Réponse de l'assistant

L'assistant a conservé les huit User Stories et a séparé chacune en
trois points :

### US01 -- Créer une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir créer une tâche en renseignant obligatoirement
    un titre et éventuellement une description.
-   **Afin de :** enregistrer les actions que je dois accomplir.

### US02 -- Modifier une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir modifier le titre et la description d'une
    tâche existante.
-   **Afin de :** corriger ou actualiser ses informations.

### US03 -- Supprimer une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir supprimer une tâche après confirmation.
-   **Afin de :** retirer définitivement les tâches qui ne sont plus
    nécessaires et éviter les suppressions accidentelles.

### US04 -- Terminer une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir marquer une tâche comme terminée ou annuler
    son état terminé.
-   **Afin de :** suivre mon avancement et garder le contrôle sur mes
    tâches.

### US05 -- Consulter les tâches

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir consulter l'ensemble de mes tâches en
    distinguant celles qui sont terminées de celles qui restent à faire.
-   **Afin de :** avoir une vision claire de mon travail.

### US06 -- Attribuer une date limite

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir attribuer ou modifier une date limite à une
    tâche, tout en ayant la possibilité de ne pas en définir une.
-   **Afin de :** mieux organiser mon temps et respecter mes échéances.

### US07 -- Trier les tâches par date

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir trier mes tâches selon leur date limite, de la
    plus proche à la plus éloignée ou inversement.
-   **Afin de :** identifier rapidement les tâches à traiter en
    priorité.

### US08 -- Rechercher une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir rechercher une tâche à partir de son titre.
-   **Afin de :** la retrouver rapidement sans devoir parcourir toute ma
    liste.

### Commentaire --- Pourquoi cette étape ?

L'utilisateur souhaitait une présentation plus lisible, dans laquelle
les trois parties de chaque User Story sont clairement identifiables.
Cette mise en forme facilite la relecture, la validation et la reprise
des besoins dans un document de projet.

------------------------------------------------------------------------

## 8. Mettre les User Stories dans un README.md

### Message de l'utilisateur

> peut tu me le mettre en format read me

### Réponse de l'assistant

L'assistant a créé un contenu Markdown destiné à un fichier `README.md`.
Il contenait : - Le titre « TO DO LIST -- User Stories ». - Une courte
présentation du projet. - Les huit User Stories avec les trois points. -
Les technologies utilisées : HTML5, CSS3 et JavaScript natif. -
L'objectif général de l'application.

### Commentaire --- Pourquoi cette étape ?

Le format Markdown permet de conserver une présentation structurée dans
le dépôt du projet, notamment sur GitHub. Le README sert à présenter le
projet et à permettre à une personne qui découvre le dépôt de comprendre
rapidement son objectif et ses fonctionnalités.

------------------------------------------------------------------------

## 9. Demander un document qui reprend la conversation

### Message de l'utilisateur

> recupere moi toutes notre conversation et fait en un prompt.md

### Réponse de l'assistant

L'assistant a d'abord proposé un document de contexte de projet intitulé
`PROMPT.md`, comprenant notamment : - La présentation de TaskFlow. - Les
objectifs. - Les technologies. - Les User Stories. - Des règles
fonctionnelles. - Une architecture de fichiers proposée. - Des consignes
pour une IA.

### Commentaire --- Pourquoi cette réponse ne correspondait pas à la demande ?

L'utilisateur ne demandait pas seulement un prompt récapitulatif du
projet. Il voulait conserver l'historique des échanges : ses propres
messages, les réponses de l'assistant et les raisons des décisions
prises. Le document proposé était donc trop orienté vers une description
générale du projet et ne reprenait pas la conversation
chronologiquement.

------------------------------------------------------------------------

## 10. Clarifier le contenu attendu

### Message de l'utilisateur

> non pas ça

### Réponse de l'assistant

L'assistant a reconnu le malentendu et a demandé si l'utilisateur
souhaitait : - L'échange sur la définition des User Stories. - Les
exemples proposés. - Les huit User Stories sélectionnées. - Les
modifications et affinements. - La formulation finale en trois points. -
Les explications et corrections de la conversation.

Il a demandé si l'utilisateur souhaitait aussi conserver les questions
et explications, ou uniquement les décisions et résultats.

### Commentaire --- Pourquoi cette étape ?

La demande initiale pouvait être comprise comme la création d'un prompt
de contexte ou comme la création d'une transcription. Il fallait
clarifier le résultat attendu plutôt que continuer à produire un
document qui ne correspondait pas au besoin.

------------------------------------------------------------------------

## 11. Demande finale : conserver toute la conversation et la commenter

### Message de l'utilisateur

> je veux que tu créer le fichier prompt.md avec toutes notre
> conversation donc mes message puis tes réponse et aussi les commenter
> de pouquoi on a fait ça

### Commentaire --- Objectif de ce fichier

La demande finale est de conserver une trace chronologique du travail
réalisé, avec : - Les messages de l'utilisateur. - Les réponses de
l'assistant. - Les formulations proposées. - Les choix effectués. - Les
modifications entre les versions. - Des commentaires qui expliquent
pourquoi chaque étape a été réalisée. - Les points qui restent à
confirmer.

Ce document sert de mémoire de travail pour reprendre le projet sans
perdre le raisonnement qui a conduit aux choix actuels.

------------------------------------------------------------------------

# 12. État actuel du travail

## User Stories actuellement rédigées

Les huit User Stories présentées dans la dernière version sont :

### US01 --- Créer une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir créer une tâche en renseignant obligatoirement
    un titre et éventuellement une description.
-   **Afin de :** enregistrer les actions que je dois accomplir.

### US02 --- Modifier une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir modifier le titre et la description d'une
    tâche existante.
-   **Afin de :** corriger ou actualiser ses informations.

### US03 --- Supprimer une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir supprimer une tâche après confirmation.
-   **Afin de :** retirer définitivement les tâches qui ne sont plus
    nécessaires et éviter les suppressions accidentelles.

### US04 --- Terminer une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir marquer une tâche comme terminée ou annuler
    son état terminé.
-   **Afin de :** suivre mon avancement et garder le contrôle sur mes
    tâches.

### US05 --- Consulter les tâches

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir consulter l'ensemble de mes tâches en
    distinguant celles qui sont terminées de celles qui restent à faire.
-   **Afin de :** avoir une vision claire de mon travail.

### US06 --- Attribuer une date limite

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir attribuer ou modifier une date limite à une
    tâche, tout en ayant la possibilité de ne pas en définir une.
-   **Afin de :** mieux organiser mon temps et respecter mes échéances.

### US07 --- Trier les tâches par date

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir trier mes tâches selon leur date limite, de la
    plus proche à la plus éloignée ou inversement.
-   **Afin de :** identifier rapidement les tâches à traiter en
    priorité.

### US08 --- Rechercher une tâche

-   **En tant que :** utilisateur.
-   **Je veux :** pouvoir rechercher une tâche à partir de son titre.
-   **Afin de :** la retrouver rapidement sans devoir parcourir toute ma
    liste.

## Points à confirmer avant le développement

Les éléments suivants ont été proposés dans les réponses, mais ne
doivent pas être considérés automatiquement comme des décisions
définitives :

1.  **US08 -- Recherche :** cette fonctionnalité a été ajoutée par
    l'assistant pour arriver à huit User Stories. L'utilisateur doit
    confirmer qu'il souhaite la conserver.
2.  **Priorités :** les cinq premières User Stories ont été indiquées
    comme prioritaires dans la sélection initiale. Les priorités de
    US06, US07 et US08 restent à confirmer.
3.  **Description facultative :** cette règle a été proposée pour la
    création d'une tâche.
4.  **Confirmation de suppression :** cette règle a été proposée pour
    éviter les suppressions accidentelles.
5.  **Tâches sans date :** leur position à part ou en fin de tri a été
    proposée, mais le comportement exact reste à décider.
6.  **Persistance des données :** la conversation n'a pas encore défini
    si les tâches doivent être conservées après fermeture ou
    actualisation de la page.

## Prochaine étape recommandée

Continuer à affiner chaque User Story en définissant ses critères
d'acceptation. Ensuite, préciser les règles métier, le modèle de données
et l'architecture avant de commencer l'implémentation.

# PROMPTS.md – Historique des échanges avec ChatGPT

## Échange 1 – Définition de l'architecture du projet

**Demande :**

Demander à ChatGPT de proposer une architecture et une structure de fichiers adaptées à un projet de To Do List réalisé par des étudiants de première année.

**Réponse apportée :**

Une première architecture simple a été proposée :

```text
taskflow/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

**Pourquoi cet échange ?**

Nous souhaitions avoir une organisation claire dès le début du projet afin de savoir où placer chaque fichier et éviter de mélanger le HTML, le CSS et le JavaScript.

---

## Échange 2 – Création du README.md

**Demande :**

Demander à ChatGPT de rédiger un README présentant le travail réalisé sur l'architecture du projet.

**Réponse apportée :**

Un README a été créé avec :
- La présentation de TaskFlow.
- L'architecture du projet.
- L'explication du rôle de chaque fichier.
- Les objectifs de cette organisation.

**Pourquoi cet échange ?**

Nous souhaitions garder une trace écrite de notre organisation et expliquer les choix réalisés afin que chaque membre de l'équipe puisse comprendre la structure du projet.

---

## Échange 3 – Intégration du Prompt 3 de Gemini

**Demande :**

Ajouter au README le Prompt 3 utilisé avec Gemini, concernant le modèle de données JSON et la structure des fichiers.

**Réponse apportée :**

Le prompt et son résultat ont été intégrés dans une section dédiée.

Le modèle JSON proposé était :

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

**Pourquoi cet échange ?**

Nous souhaitions conserver une trace de la proposition de Gemini et montrer comment l'intelligence artificielle nous a aidés à réfléchir à la représentation des tâches.

---

## Échange 4 – Clarification entre README.md et PROMPTS.md

**Demande :**

Clarifier si le contenu du fichier PROMPTS.md avait été remplacé ou intégré au README.md.

**Réponse apportée :**

Il a été expliqué que le contenu du prompt avait simplement été ajouté au README, sans supprimer le fichier PROMPTS.md dans la proposition initiale.

Nous avons ensuite demandé de retirer
