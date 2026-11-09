// ===== DONNÉES =====
// Tableau qui stocke toutes les tâches
let tasks = [];

// Compteur pour générer un identifiant unique pour chaque tâche
let taskIdCounter = 0;

// ===== ÉLÉMENTS DU DOM =====
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const taskCounter = document.getElementById('task-counter');

// ===== US01 : CRÉER UNE TÂCHE =====

/**
 * Crée un nouvel objet tâche et l'ajoute au tableau
 * @param {string} text - Le texte de la tâche
 * @returns {object} - L'objet tâche créé
 */
function createTask(text) {
    const task = {
        id: taskIdCounter++,
        text: text,
        completed: false
    };
    tasks.push(task);
    return task;
}

/**
 * Crée l'élément HTML (li) qui représente une tâche dans la liste
 * @param {object} task - L'objet tâche à afficher
 * @returns {HTMLElement} - L'élément li créé
 */
function createTaskElement(task) {
    // Créer le <li>
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.setAttribute('data-id', task.id);

    // Checkbox pour marquer comme terminée (US04)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
        toggleTask(task.id);
    });

    // Créer le texte de la tâche
    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = task.text;

    // Si la tâche est terminée, barrer le texte
    if (task.completed) {
        li.classList.add('completed');
    }

    // Créer le conteneur des boutons d'action
    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    // Bouton Modifier (US02)
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Modifier';
    editBtn.classList.add('btn-edit');
    editBtn.addEventListener('click', function() {
        startEditTask(task.id);
    });

    // Bouton Supprimer (US03)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.classList.add('btn-delete');
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    // Assembler le tout
    li.appendChild(span);
    li.appendChild(checkbox);
    li.appendChild(actions);

    return li;
}

/**
 * Affiche toutes les tâches dans le DOM (US05)
 */
function renderTasks() {
    // Vider la liste actuelle
    taskList.innerHTML = '';

    // Ajouter chaque tâche
    tasks.forEach(function(task) {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });

    // Afficher ou masquer le message "liste vide"
    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        taskCounter.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        taskCounter.style.display = 'block';

        // Compter les tâches terminées et restantes
        var completedCount = tasks.filter(function(t) { return t.completed; }).length;
        var remainingCount = tasks.length - completedCount;
        taskCounter.textContent = remainingCount + ' tâche(s) restante(s) | ' + completedCount + ' terminée(s) sur ' + tasks.length;
    }
}

// ===== US02 : MODIFIER UNE TÂCHE =====

/**
 * Active le mode édition pour une tâche
 * @param {number} id - L'identifiant de la tâche à modifier
 */
function startEditTask(id) {
    // Trouver l'élément li correspondant
    const li = document.querySelector('[data-id="' + id + '"]');
    // Trouver la tâche dans le tableau
    const task = tasks.find(function(t) { return t.id === id; });

    if (!li || !task) return;

    // Récupérer le span du texte et le conteneur d'actions
    const span = li.querySelector('.task-text');
    const actions = li.querySelector('.task-actions');

    // Remplacer le span par un champ de saisie
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('task-edit-input');
    input.value = task.text;
    span.replaceWith(input);

    // Remplacer les boutons par Sauvegarder et Annuler
    actions.innerHTML = '';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Sauvegarder';
    saveBtn.classList.add('btn-save');
    saveBtn.addEventListener('click', function() {
        saveEditTask(id, input.value);
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Annuler';
    cancelBtn.classList.add('btn-cancel');
    cancelBtn.addEventListener('click', function() {
        renderTasks();
    });

    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);

    // Mettre le focus sur le champ
    input.focus();
}

/**
 * Sauvegarde la modification d'une tâche
 * @param {number} id - L'identifiant de la tâche
 * @param {string} newText - Le nouveau texte de la tâche
 */
function saveEditTask(id, newText) {
    // Enlever les espaces inutiles
    var text = newText.trim();

    // Vérifier que le texte n'est pas vide
    if (text === '') {
        alert('Le texte de la tâche ne peut pas être vide.');
        return;
    }

    // Mettre à jour la tâche dans le tableau
    var task = tasks.find(function(t) { return t.id === id; });
    if (task) {
        task.text = text;
    }

    // Rafraîchir l'affichage
    renderTasks();
}

// ===== US04 : MARQUER UNE TÂCHE COMME TERMINÉE =====

/**
 * Bascule l'état terminé/non terminé d'une tâche
 * @param {number} id - L'identifiant de la tâche
 */
function toggleTask(id) {
    var task = tasks.find(function(t) { return t.id === id; });
    if (!task) return;

    // Inverser l'état
    task.completed = !task.completed;

    // Rafraîchir l'affichage
    renderTasks();
}

// ===== US03 : SUPPRIMER UNE TÂCHE =====

/**
 * Supprime une tâche du tableau et rafraîchit l'affichage
 * @param {number} id - L'identifiant de la tâche à supprimer
 */
function deleteTask(id) {
    // Demander confirmation avant de supprimer
    var task = tasks.find(function(t) { return t.id === id; });
    if (!task) return;

    var confirmed = confirm('Voulez-vous vraiment supprimer la tâche "' + task.text + '" ?');
    if (!confirmed) return;

    // Retirer la tâche du tableau
    tasks = tasks.filter(function(t) { return t.id !== id; });

    // Rafraîchir l'affichage
    renderTasks();
}

// ===== ÉCOUTEURS D'ÉVÉNEMENTS =====

// Écouter la soumission du formulaire pour créer une tâche
taskForm.addEventListener('submit', function(event) {
    // Empêcher le rechargement de la page
    event.preventDefault();

    // Récupérer le texte saisi et enlever les espaces inutiles
    const text = taskInput.value.trim();

    // Vérifier que le champ n'est pas vide
    if (text === '') {
        return;
    }

    // Créer la tâche
    createTask(text);

    // Mettre à jour l'affichage
    renderTasks();

    // Vider le champ de saisie
    taskInput.value = '';

    // Remettre le focus sur le champ
    taskInput.focus();
});
