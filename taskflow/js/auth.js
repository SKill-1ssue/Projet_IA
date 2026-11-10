// ============================================================
// 🌸 TASKFLOW — auth.js (100% client, sans Node.js)
// Hachage : PBKDF2 via Web Crypto API (natif navigateur)
// Stockage : localStorage
// Sessions : sessionStorage
// ============================================================
'use strict';

// ===== CONSTANTES =====
var STORAGE_KEY   = 'taskflow-users';
var SESSION_KEY   = 'taskflow-session';
var RATE_KEY      = 'taskflow-rate';
var PBKDF2_ITER   = 100000;
var PBKDF2_HASH   = 'SHA-256';
var MAX_LOGIN     = 5;
var LOCKOUT_LOGIN = 15 * 60 * 1000; // 15 min
var MAX_RECOVER   = 3;
var LOCKOUT_REC   = 30 * 60 * 1000; // 30 min

// ===== DÉTECTION PAGE =====
var isAuthPage  = !!document.getElementById('form-login');
var isIndexPage = !!document.getElementById('task-form');

// ============================================================
// CRYPTO — PBKDF2
// ============================================================

/** Génère un salt aléatoire (hex string) */
function generateSalt() {
    var arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(function(b) { return b.toString(16).padStart(2,'0'); }).join('');
}

/** Génère un token de session aléatoire */
function generateToken() {
    var arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(function(b) { return b.toString(16).padStart(2,'0'); }).join('');
}

/** Hash PBKDF2 — retourne hex string */
async function pbkdf2Hash(password, salt) {
    var enc     = new TextEncoder();
    var keyMat  = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
    var bits    = await crypto.subtle.deriveBits({
        name: 'PBKDF2', salt: enc.encode(salt),
        iterations: PBKDF2_ITER, hash: PBKDF2_HASH
    }, keyMat, 256);
    return Array.from(new Uint8Array(bits)).map(function(b) { return b.toString(16).padStart(2,'0'); }).join('');
}

/** Compare password + salt avec hash stocké */
async function pbkdf2Verify(password, salt, storedHash) {
    var hash = await pbkdf2Hash(password, salt);
    return hash === storedHash;
}

// ============================================================
// STOCKAGE USERS (localStorage)
// Structure : [{ id, username, pwHash, pwSalt, secHash, secSalt }]
// ============================================================

function loadUsers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch(e) { return []; }
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function findUser(username) {
    return loadUsers().find(function(u) { return u.username === username.toLowerCase(); });
}

// ============================================================
// SESSION (sessionStorage — invalidée à la fermeture de l'onglet)
// ============================================================

function saveSession(username) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: username, token: generateToken() }));
}

function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
    catch(e) { return null; }
}

function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}

// ============================================================
// RATE LIMITING (localStorage)
// ============================================================

function getRateStore() {
    try { return JSON.parse(localStorage.getItem(RATE_KEY)) || {}; }
    catch(e) { return {}; }
}

function saveRateStore(store) {
    localStorage.setItem(RATE_KEY, JSON.stringify(store));
}

function checkRate(key, max, lockoutMs) {
    var store = getRateStore();
    var entry = store[key];
    var now   = Date.now();
    if (!entry) return { blocked: false };
    if (now - entry.first >= lockoutMs) { delete store[key]; saveRateStore(store); return { blocked: false }; }
    if (entry.count >= max) {
        var rem = Math.ceil((lockoutMs - (now - entry.first)) / 60000);
        return { blocked: true, minutes: rem };
    }
    return { blocked: false };
}

function recordFail(key) {
    var store = getRateStore();
    var now   = Date.now();
    if (!store[key]) store[key] = { count: 1, first: now };
    else store[key].count++;
    saveRateStore(store);
}

function clearRate(key) {
    var store = getRateStore();
    delete store[key];
    saveRateStore(store);
}

// ============================================================
// VALIDATION
// ============================================================

function validUsername(u) { return /^[a-zA-Z0-9_]{3,20}$/.test(u); }

function validPassword(p) {
    return p.length >= 12 && /[A-Z]/.test(p) && /[a-z]/.test(p) &&
           /[0-9]/.test(p) && /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?/]/.test(p);
}

// ============================================================
// PAGE : index.html — protection + bandeau
// ============================================================

if (isIndexPage) {
    var sess = getSession();
    if (!sess) {
        window.location.href = 'auth.html';
    } else {
        // Injecter bandeau dans header-bar
        var headerBar = document.querySelector('.header-bar');
        if (headerBar) {
            var placeholder = headerBar.querySelector('div:first-child');
            if (placeholder) {
                placeholder.innerHTML =
                    '<div class="auth-bar">' +
                    '<span class="auth-bar-username">👤 ' + escHtml(sess.username) + '</span>' +
                    '<button class="btn-logout" id="btn-logout">Déconnexion</button>' +
                    '</div>';
                document.getElementById('btn-logout').addEventListener('click', function() {
                    clearSession();
                    window.location.href = 'auth.html';
                });
            }
        }
    }
}

function escHtml(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
}

// ============================================================
// PAGE : auth.html
// ============================================================

if (isAuthPage) {
    // Déjà connecté → app
    if (getSession()) window.location.href = 'index.html';
    initAuthPage();
}

function initAuthPage() {

    // ===== ONGLETS =====
    var tabs   = document.querySelectorAll('.auth-tab');
    var panels = document.querySelectorAll('.auth-panel');

    function showTab(id) {
        tabs.forEach(function(t) {
            var on = t.getAttribute('aria-controls') === id;
            t.classList.toggle('active', on);
            t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        panels.forEach(function(p) {
            p.style.display = p.id === id ? 'block' : 'none';
        });
        hideAlert();
    }

    tabs.forEach(function(t) {
        t.addEventListener('click', function() { showTab(t.getAttribute('aria-controls')); });
    });

    var linkRecover = document.getElementById('link-to-recover');
    if (linkRecover) linkRecover.addEventListener('click', function(e) {
        e.preventDefault(); showTab('panel-recover');
    });

    // ===== AFFICHER/MASQUER MDP =====
    document.querySelectorAll('.btn-toggle-pw').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var inp = document.getElementById(btn.getAttribute('data-target'));
            if (!inp) return;
            inp.type = inp.type === 'password' ? 'text' : 'password';
            btn.style.opacity = inp.type === 'text' ? '1' : '0.6';
        });
    });

    // ===== INDICATEUR DE FORCE =====
    var regPw = document.getElementById('reg-password');
    if (regPw) regPw.addEventListener('input', function() {
        evalStrength(regPw.value, 'strength-fill', 'strength-label', true);
    });

    var resetPw = document.getElementById('reset-password');
    if (resetPw) resetPw.addEventListener('input', function() {
        evalStrength(resetPw.value, 'reset-strength-fill', 'reset-strength-label', false);
    });

    // ===== CONNEXION =====
    document.getElementById('form-login').addEventListener('submit', async function(e) {
        e.preventDefault();
        hideAlert();
        var username = document.getElementById('login-username').value.trim().toLowerCase();
        var password = document.getElementById('login-password').value;
        var btn      = document.getElementById('btn-login');

        var rl = checkRate('login', MAX_LOGIN, LOCKOUT_LOGIN);
        if (rl.blocked) { showAlert('Trop de tentatives. Réessayez dans ' + rl.minutes + ' min.', 'error'); return; }

        if (!username || !password) { showAlert('Champs manquants.', 'error'); return; }

        setLoading(btn, true);
        var user = findUser(username);
        var ok   = false;

        if (user) {
            ok = await pbkdf2Verify(password, user.pwSalt, user.pwHash);
        } else {
            // Délai uniforme anti-énumération
            await pbkdf2Hash(password, generateSalt());
        }

        if (!ok) {
            recordFail('login');
            showAlert('Identifiants incorrects.', 'error');
            setLoading(btn, false);
            return;
        }

        clearRate('login');
        saveSession(user.username);
        window.location.href = 'index.html';
    });

    // ===== INSCRIPTION =====
    document.getElementById('form-register').addEventListener('submit', async function(e) {
        e.preventDefault();
        hideAlert();
        var username = document.getElementById('reg-username').value.trim().toLowerCase();
        var password = document.getElementById('reg-password').value;
        var confirm  = document.getElementById('reg-confirm').value;
        var secret   = document.getElementById('reg-secret').value.trim();
        var btn      = document.getElementById('btn-register');

        if (!validUsername(username)) { showAlert('Username invalide (3-20 car. alphanumériques ou _).', 'error'); return; }
        if (!validPassword(password)) { showAlert('Mot de passe trop faible.', 'error'); return; }
        if (password !== confirm)     { showAlert('Les mots de passe ne correspondent pas.', 'error'); return; }
        if (secret.length < 3)        { showAlert('Mot secret trop court.', 'error'); return; }
        if (findUser(username))       { showAlert('Ce nom d\'utilisateur est déjà pris.', 'error'); return; }

        setLoading(btn, true);

        var pwSalt  = generateSalt();
        var pwHash  = await pbkdf2Hash(password, pwSalt);
        var secSalt = generateSalt();
        var secHash = await pbkdf2Hash(secret, secSalt);

        var users = loadUsers();
        users.push({ id: generateToken(), username, pwHash, pwSalt, secHash, secSalt });
        saveUsers(users);

        saveSession(username);
        window.location.href = 'index.html';
    });

    // ===== RÉCUPÉRATION — étape 1 =====
    var recoverToken = null;
    var recoverUser  = null;

    document.getElementById('form-recover').addEventListener('submit', async function(e) {
        e.preventDefault();
        hideAlert();
        var username = document.getElementById('rec-username').value.trim().toLowerCase();
        var secret   = document.getElementById('rec-secret').value.trim();
        var btn      = document.getElementById('btn-recover');

        var rl = checkRate('recover', MAX_RECOVER, LOCKOUT_REC);
        if (rl.blocked) { showAlert('Trop de tentatives. Réessayez dans ' + rl.minutes + ' min.', 'error'); return; }

        if (!username || !secret) { showAlert('Champs manquants.', 'error'); return; }

        setLoading(btn, true);
        var user = findUser(username);
        var ok   = false;

        if (user) {
            ok = await pbkdf2Verify(secret, user.secSalt, user.secHash);
        } else {
            await pbkdf2Hash(secret, generateSalt());
        }

        if (!ok) {
            recordFail('recover');
            showAlert('Informations incorrectes.', 'error');
            setLoading(btn, false);
            return;
        }

        clearRate('recover');
        recoverUser  = user.username;
        recoverToken = generateToken(); // token local temporaire

        document.getElementById('form-recover').style.display  = 'none';
        document.getElementById('form-reset').style.display    = 'block';
        setLoading(btn, false);
    });

    // ===== RÉINITIALISATION — étape 2 =====
    document.getElementById('form-reset').addEventListener('submit', async function(e) {
        e.preventDefault();
        hideAlert();
        var newPw   = document.getElementById('reset-password').value;
        var confirm = document.getElementById('reset-confirm').value;
        var btn     = document.getElementById('btn-reset');

        if (!validPassword(newPw))  { showAlert('Mot de passe trop faible.', 'error'); return; }
        if (newPw !== confirm)      { showAlert('Les mots de passe ne correspondent pas.', 'error'); return; }
        if (!recoverToken || !recoverUser) { showAlert('Session expirée. Recommencez.', 'error'); return; }

        setLoading(btn, true);

        var users   = loadUsers();
        var idx     = users.findIndex(function(u) { return u.username === recoverUser; });

        if (idx === -1) { showAlert('Utilisateur introuvable.', 'error'); setLoading(btn, false); return; }

        var newSalt = generateSalt();
        var newHash = await pbkdf2Hash(newPw, newSalt);
        users[idx].pwHash = newHash;
        users[idx].pwSalt = newSalt;
        saveUsers(users);

        // Invalider la session courante
        clearSession();
        recoverToken = null;
        recoverUser  = null;

        showAlert('✅ Mot de passe modifié ! Redirection…', 'success');
        setTimeout(function() {
            document.getElementById('form-reset').style.display   = 'none';
            document.getElementById('form-recover').style.display = 'block';
            document.getElementById('form-recover').reset();
            showTab('panel-login');
            hideAlert();
        }, 2000);

        setLoading(btn, false);
    });
}

// ============================================================
// UTILITAIRES UI
// ============================================================

function showAlert(msg, type) {
    var el = document.getElementById('auth-alert');
    if (!el) return;
    el.textContent = msg;
    el.className = 'auth-alert ' + type;
    el.style.display = 'block';
}

function hideAlert() {
    var el = document.getElementById('auth-alert');
    if (el) { el.style.display = 'none'; el.className = 'auth-alert'; }
}

function setLoading(btn, on) {
    if (!btn) return;
    btn.disabled = on;
    btn.classList.toggle('loading', on);
}

function evalStrength(pw, fillId, labelId, showCriteria) {
    var rules = {
        length:  pw.length >= 12,
        upper:   /[A-Z]/.test(pw),
        lower:   /[a-z]/.test(pw),
        digit:   /[0-9]/.test(pw),
        special: /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?/]/.test(pw)
    };
    var score = Object.values(rules).filter(Boolean).length;
    var level = !pw.length ? '' : score < 3 ? 'weak' : score === 3 ? 'fair' : score === 4 ? 'good' : 'strong';
    var labels = { '':'', weak:'🔴 Faible', fair:'🟠 Moyen', good:'🟡 Bon', strong:'🟢 Fort' };

    var fill  = document.getElementById(fillId);
    var label = document.getElementById(labelId);
    if (fill)  fill.className  = 'strength-fill'  + (level ? ' ' + level : '');
    if (label) { label.className = 'strength-label' + (level ? ' ' + level : ''); label.textContent = labels[level] || ''; }

    if (showCriteria) {
        var map = { 'crit-length': rules.length, 'crit-upper': rules.upper,
                    'crit-lower': rules.lower,   'crit-digit': rules.digit, 'crit-special': rules.special };
        var txt = { 'crit-length':'12 caractères minimum', 'crit-upper':'Une majuscule',
                    'crit-lower':'Une minuscule', 'crit-digit':'Un chiffre', 'crit-special':'Un caractère spécial (!@#$…)' };
        Object.keys(map).forEach(function(id) {
            var el = document.getElementById(id);
            if (!el) return;
            el.textContent = (map[id] ? '✓ ' : '✗ ') + txt[id];
            el.classList.toggle('ok', map[id]);
        });
    }
}
