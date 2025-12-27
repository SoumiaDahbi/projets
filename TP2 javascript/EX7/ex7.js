let secondes = 0;
let minutes = 0;
let heures = 0;
let timerInterval;
let enCours = true;

const timerElement = document.getElementById('timer');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function formaterTemps(temps) {
    return temps < 10 ? `0${temps}` : temps;
}

function mettreAJourTimer() {
    secondes++;
    
    if (secondes === 60) {
        secondes = 0;
        minutes++;
    }
    
    if (minutes === 60) {
        minutes = 0;
        heures++;
    }
    
    timerElement.textContent = 
        `${formaterTemps(heures)}:${formaterTemps(minutes)}:${formaterTemps(secondes)}`;
}

// Démarrer le timer
timerInterval = setInterval(mettreAJourTimer, 1000);

pauseBtn.addEventListener('click', function() {
    if (enCours) {
        clearInterval(timerInterval);
        pauseBtn.textContent = 'Reprendre';
        enCours = false;
    } else {
        timerInterval = setInterval(mettreAJourTimer, 1000);
        pauseBtn.textContent = 'Pause';
        enCours = true;
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    secondes = 0;
    minutes = 0;
    heures = 0;
    timerElement.textContent = '00:00:00';
    
    if (enCours) {
        timerInterval = setInterval(mettreAJourTimer, 1000);
    }
    
    pauseBtn.textContent = 'Pause';
    enCours = true;
});