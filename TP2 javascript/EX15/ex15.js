const themeToggle = document.getElementById('themeToggle');
const currentTheme = document.getElementById('currentTheme');
const themeIcon = document.querySelector('.theme-icon');
const themeText = document.querySelector('.theme-text');
const autoTheme = document.getElementById('autoTheme');
const animations = document.getElementById('animations');

// Charger le thème depuis localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedAutoTheme = localStorage.getItem('autoTheme') === 'true';
    const savedAnimations = localStorage.getItem('animations') !== 'false';
    
    // Appliquer le thème
    setTheme(savedTheme);
    
    // Appliquer les paramètres
    autoTheme.checked = savedAutoTheme;
    animations.checked = savedAnimations;
    
    // Activer/désactiver les animations
    document.documentElement.style.setProperty(
        '--transition-speed', 
        savedAnimations ? '0.3s' : '0s'
    );
    
    // Si auto-thème est activé, vérifier l'heure
    if (savedAutoTheme) {
        applyAutoTheme();
    }
}

// Sauvegarder le thème dans localStorage
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Sauvegarder les paramètres
function saveSettings() {
    localStorage.setItem('autoTheme', autoTheme.checked);
    localStorage.setItem('animations', animations.checked);
}

// Appliquer un thème
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Mode Clair';
        currentTheme.textContent = 'Sombre';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Mode Sombre';
        currentTheme.textContent = 'Clair';
    }
    
    saveTheme(theme);
}

// Basculer entre thème clair et sombre
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Appliquer le thème automatique selon l'heure
function applyAutoTheme() {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 7;
    const theme = isNight ? 'dark' : 'light';
    setTheme(theme);
}

// Événements
themeToggle.addEventListener('click', toggleTheme);

autoTheme.addEventListener('change', function() {
    saveSettings();
    if (this.checked) {
        applyAutoTheme();
        // Vérifier l'heure toutes les minutes
        setInterval(applyAutoTheme, 60000);
    }
});

animations.addEventListener('change', function() {
    saveSettings();
    document.documentElement.style.setProperty(
        '--transition-speed', 
        this.checked ? '0.3s' : '0s'
    );
});

// Initialisation
loadTheme();

// Si auto-thème est activé, vérifier périodiquement
if (autoTheme.checked) {
    setInterval(applyAutoTheme, 60000);
}