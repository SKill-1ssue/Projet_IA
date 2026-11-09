// ============================================================
// 🌸 TASKFLOW — Application To-Do List
// US01-US05 : CRUD + consultation
// US06 : Date limite
// US13 : Thème clair / sombre (localStorage)
// US14 : Rappels avant deadline
// US15 : Visualisation de la progression
// + Sauvegarde localStorage
// ============================================================

// ===== DONNÉES =====
// Tableau qui stocke toutes les tâches
let tasks = [];

// Compteur pour générer un identifiant unique pour chaque tâche
let taskIdCounter = 0;

// ===== ÉLÉMENTS DU DOM =====
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDeadline = document.getElementById('task-deadline');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const taskCounter = document.getElementById('task-counter');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeIconMoon = document.getElementById('theme-icon-moon');
const progressSection = document.getElementById('progress-section');
const completedCountEl = document.getElementById('completed-count');
const remainingCountEl = document.getElementById('remaining-count');
const progressFill = document.getElementById('progress-fill');
const progressPercentage = document.getElementById('progress-percentage');
const remindersSection = document.getElementById('reminders-section');
const toastEl = document.getElementById('toast');

// ===== SAUVEGARDE LOCALSTORAGE =====

/**
 * Sauvegarde les tâches dans le localStorage
 */
function saveTasks() {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    localStorage.setItem('taskflow-taskIdCounter', String(taskIdCounter));
    showToast('💾 Sauvegardé');
}

/**
 * Charge les tâches depuis le localStorage
 */
function loadTasks() {
    var saved = localStorage.getItem('taskflow-tasks');
    var savedCounter = localStorage.getItem('taskflow-taskIdCounter');

    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (e) {
            tasks = [];
        }
    }

    if (savedCounter) {
        taskIdCounter = parseInt(savedCounter, 10);
        if (isNaN(taskIdCounter)) {
            taskIdCounter = 0;
        }
    }
}

// ===== US13 : THÈME CLAIR / SOMBRE =====

/**
 * Charge le thème depuis le localStorage ou détecte la préférence système
 */
function loadTheme() {
    var savedTheme = localStorage.getItem('taskflow-theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Détecter la préférence système
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    updateThemeIcon();
}

/**
 * Bascule entre le thème clair et sombre
 */
function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('taskflow-theme', next);
    updateThemeIcon();
    showToast(next === 'dark' ? '🌙 Thème sombre activé' : '☀️ Thème clair activé');
}

/**
 * Met à jour l'icône du toggle en fonction du thème actuel
 */
function updateThemeIcon() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeIcon.style.opacity = isDark ? '0.4' : '1';
    themeIconMoon.style.opacity = isDark ? '1' : '0.4';
}

// ===== US01 : CRÉER UNE TÂCHE =====

/**
 * Crée un nouvel objet tâche et l'ajoute au tableau
 * @param {string} text - Le texte de la tâche
 * @param {string} deadline - La date limite (optionnel, format YYYY-MM-DD)
 * @returns {object} - L'objet tâche créé
 */
function createTask(text, deadline) {
    var task = {
        id: taskIdCounter++,
        text: text,
        completed: false,
        deadline: deadline || null,
        createdAt: new Date().toISOString(),
        reminderDismissed: false
    };
    tasks.push(task);
    saveTasks();
    return task;
}

/**
 * Crée l'élément HTML (li) qui représente une tâche dans la liste
 * @param {object} task - L'objet tâche à afficher
 * @returns {HTMLElement} - L'élément li créé
 */
function createTaskElement(task) {
    // Créer le <li>
    var li = document.createElement('li');
    li.classList.add('task-item');
    li.setAttribute('data-id', task.id);

    // Checkbox pour marquer comme terminée (US04)
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
        toggleTask(task.id);
    });

    // Créer le texte de la tâche
    var span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = task.text;

    // Si la tâche est terminée, barrer le texte
    if (task.completed) {
        li.classList.add('completed');
    }

    // Afficher la date limite si elle existe (US06)
    var deadlineEl = null;
    if (task.deadline) {
        deadlineEl = document.createElement('span');
        deadlineEl.classList.add('task-deadline-display');

        var deadlineDate = new Date(task.deadline + 'T23:59:59');
        var now = new Date();
        var diffMs = deadlineDate.getTime() - now.getTime();
        var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        // Formater la date en français
        var options = { day: 'numeric', month: 'short' };
        var formattedDate = deadlineDate.toLocaleDateString('fr-FR', options);

        if (diffDays < 0 && !task.completed) {
            deadlineEl.classList.add('overdue');
            deadlineEl.textContent = '⚠️ ' + formattedDate + ' (en retard)';
        } else if (diffDays <= 2 && !task.completed) {
            deadlineEl.classList.add('upcoming');
            if (diffDays === 0) {
                deadlineEl.textContent = '🔔 Aujourd\'hui';
            } else if (diffDays === 1) {
                deadlineEl.textContent = '🔔 Demain';
            } else {
                deadlineEl.textContent = '🔔 ' + formattedDate;
            }
        } else {
            deadlineEl.classList.add('normal');
            deadlineEl.textContent = '📅 ' + formattedDate;
        }
    }

    // Créer le conteneur des boutons d'action
    var actions = document.createElement('div');
    actions.classList.add('task-actions');

    // Bouton Modifier (US02)
    var editBtn = document.createElement('button');
    editBtn.textContent = '✏️ Modifier';
    editBtn.classList.add('btn-edit');
    editBtn.addEventListener('click', function() {
        startEditTask(task.id);
    });

    // Bouton Supprimer (US03)
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️ Supprimer';
    deleteBtn.classList.add('btn-delete');
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    // Assembler le tout
    li.appendChild(checkbox);
    li.appendChild(span);
    if (deadlineEl) {
        li.appendChild(deadlineEl);
    }
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
        var li = createTaskElement(task);
        taskList.appendChild(li);
    });

    // Afficher ou masquer le message "liste vide"
    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        taskCounter.style.display = 'none';
        progressSection.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        taskCounter.style.display = 'block';
        progressSection.style.display = 'block';

        // Compter les tâches terminées et restantes
        var completedCount = tasks.filter(function(t) { return t.completed; }).length;
        var remainingCount = tasks.length - completedCount;
        taskCounter.textContent = remainingCount + ' tâche(s) restante(s) | ' + completedCount + ' terminée(s) sur ' + tasks.length;
    }

    // Mettre à jour la progression (US15)
    updateProgress();

    // Mettre à jour les rappels (US14)
    updateReminders();
}

// ===== US15 : VISUALISER LA PROGRESSION =====

/**
 * Met à jour la barre de progression et les compteurs
 */
function updateProgress() {
    if (tasks.length === 0) {
        return;
    }

    var completedCount = tasks.filter(function(t) { return t.completed; }).length;
    var remainingCount = tasks.length - completedCount;
    var percentage = Math.round((completedCount / tasks.length) * 100);

    // Mettre à jour les compteurs
    completedCountEl.textContent = completedCount;
    remainingCountEl.textContent = remainingCount;

    // Mettre à jour la barre de progression
    progressFill.style.width = percentage + '%';
    progressPercentage.textContent = percentage + ' %';

    // Message spécial si tout est terminé
    if (percentage === 100) {
        progressPercentage.textContent = '🎉 100 % — Bravo, tout est terminé !';
    }
}

// ===== US14 : RAPPELS AVANT DEADLINE =====

/**
 * Vérifie les deadlines et affiche les rappels
 */
function updateReminders() {
    remindersSection.innerHTML = '';

    var now = new Date();
    var reminders = [];

    tasks.forEach(function(task) {
        // Ignorer les tâches terminées ou sans deadline ou déjà masquées
        if (task.completed || !task.deadline || task.reminderDismissed) {
            return;
        }

        var deadlineDate = new Date(task.deadline + 'T23:59:59');
        var diffMs = deadlineDate.getTime() - now.getTime();
        var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            // En retard
            reminders.push({
                task: task,
                type: 'urgent',
                icon: '🚨',
                message: '« ' + task.text + ' » est en retard ! (échéance dépassée de ' + Math.abs(diffDays) + ' jour(s))'
            });
        } else if (diffDays === 0) {
            // Aujourd'hui
            reminders.push({
                task: task,
                type: 'urgent',
                icon: '⏰',
                message: '« ' + task.text + ' » arrive à échéance aujourd\'hui !'
            });
        } else if (diffDays === 1) {
            // Demain
            reminders.push({
                task: task,
                type: 'warning',
                icon: '🔔',
                message: '« ' + task.text + ' » arrive à échéance demain.'
            });
        } else if (diffDays <= 3) {
            // Dans 2-3 jours
            reminders.push({
                task: task,
                type: 'warning',
                icon: '📋',
                message: '« ' + task.text + ' » arrive à échéance dans ' + diffDays + ' jours.'
            });
        }
    });

    // Trier : urgents d'abord
    reminders.sort(function(a, b) {
        if (a.type === 'urgent' && b.type !== 'urgent') return -1;
        if (a.type !== 'urgent' && b.type === 'urgent') return 1;
        return 0;
    });

    // Créer les éléments DOM
    reminders.forEach(function(reminder) {
        var div = document.createElement('div');
        div.classList.add('reminder-item', reminder.type);

        var iconSpan = document.createElement('span');
        iconSpan.classList.add('reminder-icon');
        iconSpan.textContent = reminder.icon;

        var textSpan = document.createElement('span');
        textSpan.classList.add('reminder-text');
        textSpan.textContent = reminder.message;

        var dismissBtn = document.createElement('button');
        dismissBtn.classList.add('reminder-dismiss');
        dismissBtn.textContent = '✕';
        dismissBtn.title = 'Masquer ce rappel';
        dismissBtn.addEventListener('click', function() {
            reminder.task.reminderDismissed = true;
            saveTasks();
            updateReminders();
        });

        div.appendChild(iconSpan);
        div.appendChild(textSpan);
        div.appendChild(dismissBtn);
        remindersSection.appendChild(div);
    });
}

// ===== US02 : MODIFIER UNE TÂCHE =====

/**
 * Active le mode édition pour une tâche
 * @param {number} id - L'identifiant de la tâche à modifier
 */
function startEditTask(id) {
    // Trouver l'élément li correspondant
    var li = document.querySelector('[data-id="' + id + '"]');
    // Trouver la tâche dans le tableau
    var task = tasks.find(function(t) { return t.id === id; });

    if (!li || !task) return;

    // Récupérer le span du texte et le conteneur d'actions
    var span = li.querySelector('.task-text');
    var actions = li.querySelector('.task-actions');

    // Remplacer le span par un champ de saisie
    var input = document.createElement('input');
    input.type = 'text';
    input.classList.add('task-edit-input');
    input.value = task.text;
    span.replaceWith(input);

    // Remplacer les boutons par Sauvegarder et Annuler
    actions.innerHTML = '';

    var saveBtn = document.createElement('button');
    saveBtn.textContent = '💾 Sauvegarder';
    saveBtn.classList.add('btn-save');
    saveBtn.addEventListener('click', function() {
        saveEditTask(id, input.value);
    });

    var cancelBtn = document.createElement('button');
    cancelBtn.textContent = '↩️ Annuler';
    cancelBtn.classList.add('btn-cancel');
    cancelBtn.addEventListener('click', function() {
        renderTasks();
    });

    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);

    // Sauvegarder aussi avec la touche Entrée
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEditTask(id, input.value);
        }
        if (e.key === 'Escape') {
            renderTasks();
        }
    });

    // Mettre le focus sur le champ
    input.focus();
    input.select();
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

    // Sauvegarder et rafraîchir l'affichage
    saveTasks();
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

    // Réinitialiser le masquage du rappel si on décoche
    if (!task.completed) {
        task.reminderDismissed = false;
    }

    // Sauvegarder et rafraîchir l'affichage
    saveTasks();
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

    var confirmed = confirm('Voulez-vous vraiment supprimer la tâche « ' + task.text + ' » ?');
    if (!confirmed) return;

    // Animation de suppression
    var li = document.querySelector('[data-id="' + id + '"]');
    if (li) {
        li.classList.add('removing');
        setTimeout(function() {
            // Retirer la tâche du tableau
            tasks = tasks.filter(function(t) { return t.id !== id; });

            // Sauvegarder et rafraîchir l'affichage
            saveTasks();
            renderTasks();
        }, 350);
    } else {
        tasks = tasks.filter(function(t) { return t.id !== id; });
        saveTasks();
        renderTasks();
    }
}

// ===== TOAST NOTIFICATION =====

/**
 * Affiche un petit message toast en bas de l'écran
 * @param {string} message - Le message à afficher
 */
var toastTimeout = null;
function showToast(message) {
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    toastEl.textContent = message;
    toastEl.classList.add('show');

    toastTimeout = setTimeout(function() {
        toastEl.classList.remove('show');
        toastTimeout = null;
    }, 1800);
}

// ===== ÉCOUTEURS D'ÉVÉNEMENTS =====

// Écouter la soumission du formulaire pour créer une tâche
taskForm.addEventListener('submit', function(event) {
    // Empêcher le rechargement de la page
    event.preventDefault();

    // Récupérer le texte saisi et enlever les espaces inutiles
    var text = taskInput.value.trim();
    var deadline = taskDeadline.value || null;

    // Vérifier que le champ n'est pas vide
    if (text === '') {
        return;
    }

    // Créer la tâche
    createTask(text, deadline);

    // Mettre à jour l'affichage
    renderTasks();

    // Vider les champs de saisie
    taskInput.value = '';
    taskDeadline.value = '';

    // Remettre le focus sur le champ
    taskInput.focus();
});

// Toggle thème (US13)
themeToggle.addEventListener('click', function() {
    toggleTheme();
});

// ===== INITIALISATION =====

/**
 * Initialise l'application au chargement de la page
 */
function init() {
    // Charger le thème (US13)
    loadTheme();

    // Charger les tâches sauvegardées (localStorage)
    loadTasks();

    // Afficher les tâches
    renderTasks();
}

// Lancer l'application
init();

// Vérifier les rappels toutes les minutes (US14)
setInterval(function() {
    updateReminders();
}, 60000);
