// Éléments DOM
const progressFill = document.getElementById('progressFill');
const percentageElement = document.getElementById('percentage');
const currentProgressElement = document.getElementById('currentProgress');
const elapsedTimeElement = document.getElementById('elapsedTime');
const historyLog = document.getElementById('historyLog');
const progressSteps = document.getElementById('progressSteps');

// Boutons
const add5Btn = document.getElementById('add5');
const add10Btn = document.getElementById('add10');
const add25Btn = document.getElementById('add25');
const remove5Btn = document.getElementById('remove5');
const remove10Btn = document.getElementById('remove10');
const remove25Btn = document.getElementById('remove25');
const startAutoBtn = document.getElementById('startAuto');
const pauseAutoBtn = document.getElementById('pauseAuto');
const resetBtn = document.getElementById('reset');
const stepButtons = document.querySelectorAll('.step-btn');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// Variables
let progress = 0;
let elapsedTime = 0;
let autoInterval = null;
let isAutoRunning = false;
let animationSpeed = 5; // 1 = lent, 10 = rapide

// Objectif
const TARGET = 100;

// Historique des actions
let history = [];

// Initialiser les étapes de progression
function initializeSteps() {
    const steps = [0, 25, 50, 75, 100];
    
    steps.forEach(step => {
        const stepMarker = document.createElement('div');
        stepMarker.className = 'step-marker';
        stepMarker.setAttribute('data-value', `${step}%`);
        stepMarker.style.left = `${step}%`;
        progressSteps.appendChild(stepMarker);
    });
}

// Mettre à jour la progression
function updateProgress(value, action = 'Manuel') {
    // Limiter la progression entre 0 et 100
    progress = Math.max(0, Math.min(TARGET, value));
    
    // Mettre à jour l'affichage
    progressFill.style.width = `${progress}%`;
    percentageElement.textContent = `${progress}%`;
    currentProgressElement.textContent = progress;
    
    // Changer la couleur selon la progression
    updateProgressColor();
    
    // Ajouter à l'historique
    addToHistory(action, progress);
}

// Mettre à jour la couleur de la barre
function updateProgressColor() {
    let colorStart, colorEnd;
    
    if (progress < 25) {
        colorStart = '#e74c3c'; // Rouge
        colorEnd = '#f39c12';   // Orange
    } else if (progress < 50) {
        colorStart = '#f39c12'; // Orange
        colorEnd = '#f1c40f';   // Jaune
    } else if (progress < 75) {
        colorStart = '#f1c40f'; // Jaune
        colorEnd = '#2ecc71';   // Vert clair
    } else {
        colorStart = '#2ecc71'; // Vert clair
        colorEnd = '#27ae60';   // Vert foncé
    }
    
    progressFill.style.background = `linear-gradient(90deg, ${colorStart}, ${colorEnd})`;
}

// Mettre à jour le temps écoulé
function updateElapsedTime() {
    elapsedTime++;
    elapsedTimeElement.textContent = elapsedTime;
}

// Ajouter une entrée à l'historique
function addToHistory(action, value) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    
    // Déterminer le type de message
    let type = 'info';
    if (action.includes('+')) type = 'success';
    if (action.includes('-')) type = 'warning';
    if (action.includes('Réinitial')) type = 'error';
    
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${timestamp}] ${action}: ${value}%`;
    
    // Ajouter en haut de l'historique
    historyLog.insertBefore(logEntry, historyLog.firstChild);
    
    // Limiter l'historique à 10 entrées
    if (historyLog.children.length > 10) {
        historyLog.removeChild(historyLog.lastChild);
    }
    
    // Ajouter à l'array historique
    history.push({ action, value, timestamp, type });
}

// Démarrer la progression automatique
function startAutoProgress() {
    if (isAutoRunning) return;
    
    isAutoRunning = true;
    startAutoBtn.disabled = true;
    pauseAutoBtn.disabled = false;
    
    autoInterval = setInterval(() => {
        if (progress < TARGET) {
            const increment = Math.min(animationSpeed / 2, TARGET - progress);
            updateProgress(progress + increment, 'Auto-progression');
        } else {
            stopAutoProgress();
        }
    }, 500); // Mettre à jour toutes les 500ms
    
    // Mettre à jour le temps toutes les secondes
    const timeInterval = setInterval(updateElapsedTime, 1000);
    
    // Nettoyer l'intervalle de temps quand l'auto-progression s'arrête
    autoInterval.cleanup = () => clearInterval(timeInterval);
}

// Arrêter la progression automatique
function stopAutoProgress() {
    if (!isAutoRunning) return;
    
    isAutoRunning = false;
    startAutoBtn.disabled = false;
    pauseAutoBtn.disabled = true;
    
    if (autoInterval) {
        clearInterval(autoInterval);
        if (autoInterval.cleanup) autoInterval.cleanup();
    }
}

// Réinitialiser la progression
function resetProgress() {
    stopAutoProgress();
    progress = 0;
    elapsedTime = 0;
    updateProgress(0, 'Réinitialisation');
    elapsedTimeElement.textContent = '0';
    
    // Vider l'historique
    historyLog.innerHTML = '';
    history = [];
    
    // Ajouter un message de réinitialisation
    addToHistory('Système réinitialisé', 0);
}

// Événements pour les boutons d'ajout
add5Btn.addEventListener('click', () => updateProgress(progress + 5, 'Ajout +5%'));
add10Btn.addEventListener('click', () => updateProgress(progress + 10, 'Ajout +10%'));
add25Btn.addEventListener('click', () => updateProgress(progress + 25, 'Ajout +25%'));

// Événements pour les boutons de retrait
remove5Btn.addEventListener('click', () => updateProgress(progress - 5, 'Retrait -5%'));
remove10Btn.addEventListener('click', () => updateProgress(progress - 10, 'Retrait -10%'));
remove25Btn.addEventListener('click', () => updateProgress(progress - 25, 'Retrait -25%'));

// Événements pour les boutons de contrôle
startAutoBtn.addEventListener('click', startAutoProgress);
pauseAutoBtn.addEventListener('click', stopAutoProgress);
resetBtn.addEventListener('click', resetProgress);

// Événements pour les boutons d'étape
stepButtons.forEach(button => {
    button.addEventListener('click', () => {
        const stepValue = parseInt(button.getAttribute('data-step'));
        updateProgress(stepValue, `Aller à ${stepValue}%`);
    });
});

// Événement pour le slider de vitesse
speedSlider.addEventListener('input', function() {
    animationSpeed = parseInt(this.value);
    speedValue.textContent = animationSpeed;
    
    // Si l'auto-progression est en cours, redémarrer avec la nouvelle vitesse
    if (isAutoRunning) {
        stopAutoProgress();
        startAutoProgress();
    }
});

// Navigation au clavier
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case '+':
            updateProgress(progress + 10, 'Ajout clavier +10%');
            break;
        case '-':
            updateProgress(progress - 10, 'Retrait clavier -10%');
            break;
        case ' ':
            if (isAutoRunning) {
                stopAutoProgress();
            } else {
                startAutoProgress();
            }
            break;
        case 'r':
        case 'R':
            resetProgress();
            break;
    }
});

// Initialisation
initializeSteps();
updateProgress(0, 'Initialisation');

// Ajouter un message de bienvenue
addToHistory('Système initialisé', 0);