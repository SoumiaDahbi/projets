// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les événements
    document.getElementById('calculateBtn').addEventListener('click', calculateTotal);
    document.getElementById('clearBtn').addEventListener('click', clearAll);
    
    // Mettre en place la mise à jour automatique
    setupAutoUpdate();
    
    // Calculer automatiquement au chargement de la page avec les valeurs par défaut
    calculateTotal();
});

// Fonction pour calculer la somme des temps
function calculateTotal() {
    // Récupérer toutes les valeurs des trois temps
    const temps1 = getTimeValues('h1', 'm1', 's1');
    const temps2 = getTimeValues('h2', 'm2', 's2');
    const temps3 = getTimeValues('h3', 'm3', 's3');
    
    // Calculer la somme totale en secondes
    const totalSeconds = convertToSeconds(temps1) + 
                         convertToSeconds(temps2) + 
                         convertToSeconds(temps3);
    
    // Convertir le total en jours, heures, minutes, secondes
    const result = convertSecondsToDHMS(totalSeconds);
    
    // Afficher le résultat
    displayResult(result);
}

// Fonction pour récupérer les valeurs d'un temps
function getTimeValues(hId, mId, sId) {
    return {
        heures: parseInt(document.getElementById(hId).value) || 0,
        minutes: parseInt(document.getElementById(mId).value) || 0,
        secondes: parseInt(document.getElementById(sId).value) || 0
    };
}

// Fonction pour convertir un temps en secondes
function convertToSeconds(time) {
    return (time.heures * 3600) + (time.minutes * 60) + time.secondes;
}

// Fonction pour convertir des secondes en jours, heures, minutes, secondes
function convertSecondsToDHMS(totalSeconds) {
    const jours = Math.floor(totalSeconds / 86400);
    let reste = totalSeconds % 86400;
    
    const heures = Math.floor(reste / 3600);
    reste = reste % 3600;
    
    const minutes = Math.floor(reste / 60);
    const secondes = reste % 60;
    
    return {
        jours: jours,
        heures: heures,
        minutes: minutes,
        secondes: secondes
    };
}

// Fonction pour afficher le résultat avec les secondes au-dessous
function displayResult(result) {
    const resultDiv = document.getElementById('result');
    
    // Créer un tableau avec les résultats
    resultDiv.innerHTML = `
        <div class="result-container">
            <div class="time-block">
                <div class="time-label">Jour(s)</div>
                <div class="time-value">${result.jours}</div>
            </div>
            <div class="time-block">
                <div class="time-label">Heure(s)</div>
                <div class="time-value">${result.heures}</div>
            </div>
            <div class="time-block">
                <div class="time-label">Minute(s)</div>
                <div class="time-value">${result.minutes}</div>
            </div>
            <div class="time-block">
                <div class="time-label">Seconde(s)</div>
                <div class="time-value">${result.secondes}</div>
            </div>
        </div>
        
        <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Total en secondes: ${(result.jours * 86400) + (result.heures * 3600) + (result.minutes * 60) + result.secondes} secondes
        </p>
    `;
}

// Fonction pour effacer tous les champs
function clearAll() {
    // Réinitialiser tous les champs d'entrée
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Effacer le résultat
    document.getElementById('result').innerHTML = '<p style="color: #999;">Veuillez entrer des valeurs et cliquer sur "Somme"</p>';
    
    // Donner le focus au premier champ
    document.getElementById('h1').focus();
}

// Fonction pour mettre à jour automatiquement le résultat quand on tape
function setupAutoUpdate() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });
}