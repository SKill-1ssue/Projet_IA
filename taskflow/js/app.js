// ============================================================
// 🌸 TASKFLOW — Application To-Do List
// US01-US05 : CRUD + consultation
// US06 : Date limite
// US07 : Priorité
// US08 : Catégorie
// US09 : Tri par date
// US10 : Recherche par nom
// US11 : Filtrer tâches terminées
// US12 : Filtrer tâches non terminées
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

// Catégories par défaut + catégories personnalisées
var defaultCategories = [
    { id: 'travail', name: 'Travail', emoji: '💼' },
    { id: 'personnel', name: 'Personnel', emoji: '🏠' },
    { id: 'études', name: 'Études', emoji: '📚' },
    { id: 'sport', name: 'Sport', emoji: '🏃' },
    { id: 'courses', name: 'Courses', emoji: '🛒' },
    { id: 'autre', name: 'Autre', emoji: '📌' }
];

let customCategories = [];

// ===== ÉLÉMENTS DU DOM =====
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDeadline = document.getElementById('task-deadline');
const taskPriority = document.getElementById('task-priority');
const taskCategory = document.getElementById('task-category');
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
const searchInput = document.getElementById('search-input');
const filterStatus = document.getElementById('filter-status');
const filterPriority = document.getElementById('filter-priority');
const filterCategory = document.getElementById('filter-category');
const sortOrder = document.getElementById('sort-order');
const toolbar = document.getElementById('toolbar');
const btnManageCategories = document.getElementById('btn-manage-categories');
const categoryModal = document.getElementById('category-modal');
const modalClose = document.getElementById('modal-close');
const newCategoryName = document.getElementById('new-category-name');
const newCategoryEmoji = document.getElementById('new-category-emoji');
const btnAddCategory = document.getElementById('btn-add-category');
const categoryListEl = document.getElementById('category-list');

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
 * @param {string} priority - La priorité (optionnel : haute, moyenne, basse)
 * @param {string} category - La catégorie (optionnel)
 * @returns {object} - L'objet tâche créé
 */
function createTask(text, deadline, priority, category) {
    var task = {
        id: taskIdCounter++,
        text: text,
        completed: false,
        deadline: deadline || null,
        priority: priority || null,
        category: category || null,
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

    // Ajouter une classe de priorité si elle existe (US07)
    if (task.priority) {
        li.classList.add('priority-' + task.priority);
    }

    // Checkbox pour marquer comme terminée (US04)
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
        toggleTask(task.id);
    });

    // Créer le contenu principal (texte + badges)
    var contentDiv = document.createElement('div');
    contentDiv.classList.add('task-content');

    // Créer le texte de la tâche
    var span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = task.text;

    contentDiv.appendChild(span);

    // Ligne de badges (priorité, catégorie, deadline)
    var badgesDiv = document.createElement('div');
    badgesDiv.classList.add('task-badges');

    // Badge de priorité (US07)
    if (task.priority) {
        var priorityBadge = document.createElement('span');
        priorityBadge.classList.add('badge', 'badge-priority', 'badge-priority-' + task.priority);
        var priorityLabels = { haute: '🔴 Haute', moyenne: '🟠 Moyenne', basse: '🟢 Basse' };
        priorityBadge.textContent = priorityLabels[task.priority] || task.priority;
        badgesDiv.appendChild(priorityBadge);
    }

    // Badge de catégorie (US08)
    if (task.category) {
        var categoryBadge = document.createElement('span');
        categoryBadge.classList.add('badge', 'badge-category');
        var categoryLabels = {
            travail: '💼 Travail',
            personnel: '🏠 Personnel',
            'études': '📚 Études',
            sport: '🏃 Sport',
            courses: '🛒 Courses',
            autre: '📌 Autre'
        };
        categoryBadge.textContent = categoryLabels[task.category] || task.category;
        badgesDiv.appendChild(categoryBadge);
    }

    // Afficher la date limite si elle existe (US06)
    if (task.deadline) {
        var deadlineEl = document.createElement('span');
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

        badgesDiv.appendChild(deadlineEl);
    }

    // N'ajouter la ligne de badges que si elle contient quelque chose
    if (badgesDiv.children.length > 0) {
        contentDiv.appendChild(badgesDiv);
    }

    // Si la tâche est terminée, barrer le texte
    if (task.completed) {
        li.classList.add('completed');
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
    li.appendChild(contentDiv);
    li.appendChild(actions);

    return li;
}

/**
 * Retourne les tâches filtrées, recherchées et triées (US09, US10, US11, US12)
 * @returns {Array} - Tableau de tâches filtrées et triées
 */
function getFilteredTasks() {
    var filtered = tasks.slice(); // copie

    // US10 : Recherche par nom
    var searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm !== '') {
        filtered = filtered.filter(function(t) {
            return t.text.toLowerCase().indexOf(searchTerm) !== -1;
        });
    }

    // US11 / US12 : Filtrage par statut
    var statusFilter = filterStatus.value;
    if (statusFilter === 'en-cours') {
        filtered = filtered.filter(function(t) { return !t.completed; });
    } else if (statusFilter === 'terminees') {
        filtered = filtered.filter(function(t) { return t.completed; });
    }

    // Filtrage par priorité
    var priorityFilter = filterPriority.value;
    if (priorityFilter !== '') {
        filtered = filtered.filter(function(t) { return t.priority === priorityFilter; });
    }

    // Filtrage par catégorie
    var categoryFilter = filterCategory.value;
    if (categoryFilter !== '') {
        filtered = filtered.filter(function(t) { return t.category === categoryFilter; });
    }

    // US09 : Tri
    var sort = sortOrder.value;
    if (sort === 'date-asc') {
        // Échéance croissante (les tâches sans deadline à la fin)
        filtered.sort(function(a, b) {
            if (!a.deadline && !b.deadline) return 0;
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;
            return a.deadline.localeCompare(b.deadline);
        });
    } else if (sort === 'date-desc') {
        // Échéance décroissante
        filtered.sort(function(a, b) {
            if (!a.deadline && !b.deadline) return 0;
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;
            return b.deadline.localeCompare(a.deadline);
        });
    } else if (sort === 'priority') {
        // Tri par priorité (haute > moyenne > basse > sans)
        var priorityOrder = { haute: 0, moyenne: 1, basse: 2 };
        filtered.sort(function(a, b) {
            var pa = a.priority ? priorityOrder[a.priority] : 3;
            var pb = b.priority ? priorityOrder[b.priority] : 3;
            return pa - pb;
        });
    }
    // 'creation' = ordre par défaut (ordre du tableau)

    return filtered;
}

/**
 * Affiche toutes les tâches dans le DOM (US05)
 */
function renderTasks() {
    // Vider la liste actuelle
    taskList.innerHTML = '';

    // Afficher ou masquer la toolbar
    if (tasks.length === 0) {
        toolbar.style.display = 'none';
    } else {
        toolbar.style.display = 'block';
    }

    // Récupérer les tâches filtrées et triées
    var filteredTasks = getFilteredTasks();

    // Ajouter chaque tâche
    filteredTasks.forEach(function(task) {
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

        // Afficher un message si le filtre ne donne aucun résultat
        if (filteredTasks.length === 0) {
            var noResultMsg = document.createElement('li');
            noResultMsg.classList.add('no-result-message');
            noResultMsg.textContent = '🔍 Aucune tâche ne correspond aux filtres sélectionnés.';
            taskList.appendChild(noResultMsg);
        }
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
    var priority = taskPriority.value || null;
    var category = taskCategory.value || null;

    // Vérifier que le champ n'est pas vide
    if (text === '') {
        return;
    }

    // Créer la tâche (US01 + US06 + US07 + US08)
    createTask(text, deadline, priority, category);

    // Mettre à jour l'affichage
    renderTasks();

    // Vider les champs de saisie
    taskInput.value = '';
    taskDeadline.value = '';
    taskPriority.value = '';
    taskCategory.value = '';

    // Remettre le focus sur le champ
    taskInput.focus();
});

// Toggle thème (US13)
themeToggle.addEventListener('click', function() {
    toggleTheme();
});

// ===== ÉCOUTEURS TOOLBAR (US09, US10, US11, US12) =====

// US10 : Recherche en temps réel
searchInput.addEventListener('input', function() {
    renderTasks();
});

// US11 / US12 : Filtrage par statut
filterStatus.addEventListener('change', function() {
    renderTasks();
});

// Filtrage par priorité
filterPriority.addEventListener('change', function() {
    renderTasks();
});

// Filtrage par catégorie
filterCategory.addEventListener('change', function() {
    renderTasks();
});

// US09 : Tri
sortOrder.addEventListener('change', function() {
    renderTasks();
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
