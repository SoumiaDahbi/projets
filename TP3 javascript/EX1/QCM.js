// Réponses correctes
const correctAnswers = {
    q1: ['a', 'b', 'c'],  // HTML, CSS, JavaScript
    q2: ['b'],            // document.getElementById()
    q3: ['a', 'b', 'c'],  // innerHTML, getElementById(), querySelector()
    q4: ['b'],            // onclick
    q5: ['a', 'b', 'c', 'd'] // localStorage, sessionStorage, cookies, indexedDB
};

// Variables
let timeLeft = 15 * 60; // 15 minutes en secondes
let timerInterval;
let userAnswers = {
    q1: [],
    q2: [],
    q3: [],
    q4: [],
    q5: []
};

// Éléments DOM
const timerElement = document.getElementById('timer');
const progressFill = document.getElementById('progressFill');
const resetBtn = document.getElementById('resetBtn');
const showAnswersBtn = document.getElementById('showAnswersBtn');
const showResultBtn = document.getElementById('showResultBtn');
const answeredCountElement = document.getElementById('answeredCount');
const remainingTimeElement = document.getElementById('remainingTime');
const progressPercentElement = document.getElementById('progressPercent');
const resultModal = document.getElementById('resultModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Initialisation
function init() {
    startTimer();
    updateStats();
    setupEventListeners();
}

// Démarrer le timer
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        updateProgressBar();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000);
}

// Mettre à jour l'affichage du timer
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    timerElement.textContent = timeString;
    remainingTimeElement.textContent = timeString;
}

// Mettre à jour la barre de progression
function updateProgressBar() {
    const totalTime = 15 * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    progressFill.style.width = `${progress}%`;
}

// Mettre à jour les statistiques
function updateStats() {
    // Compter les questions répondues
    let answered = 0;
    for (let q in userAnswers) {
        if (userAnswers[q].length > 0) {
            answered++;
        }
    }
    
    answeredCountElement.textContent = `${answered}/5`;
    
    // Calculer le pourcentage de progression
    const progressPercent = Math.round((answered / 5) * 100);
    progressPercentElement.textContent = `${progressPercent}%`;
}

// Récupérer les réponses de l'utilisateur
function getUserAnswers() {
    const form = document.getElementById('qcmForm');
    const formData = new FormData(form);
    
    // Réinitialiser les réponses
    for (let q in userAnswers) {
        userAnswers[q] = [];
    }
    
    // Récupérer les cases cochées
    for (let pair of formData.entries()) {
        const [name, value] = pair;
        userAnswers[name].push(value);
    }
    
    updateStats();
    return userAnswers;
}

// Vérifier les réponses
function checkAnswers() {
    getUserAnswers();
    let score = 0;
    const results = [];
    
    for (let q in correctAnswers) {
        const userAnswer = userAnswers[q].sort().join('');
        const correctAnswer = correctAnswers[q].sort().join('');
        
        const isCorrect = userAnswer === correctAnswer;
        results.push({
            question: q,
            userAnswer: userAnswers[q],
            correctAnswer: correctAnswers[q],
            isCorrect: isCorrect
        });
        
        if (isCorrect) {
            score++;
        }
    }
    
    return { score, results };
}

// Afficher les réponses correctes
function showCorrectAnswers() {
    const answersWindow = window.open('', 'Réponses du QCM', 'width=800,height=600,scrollbars=yes');
    
    let content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Réponses Correctes - QCM</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; }
                h1 { color: #2c3e50; text-align: center; }
                .question { background: white; padding: 20px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                .question-title { font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
                .correct { color: #2ecc71; font-weight: bold; text-decoration: underline; }
                .answer { margin: 5px 0; padding: 5px; border-radius: 5px; }
            </style>
        </head>
        <body>
            <h1>📚 Réponses Correctes du QCM</h1>
    `;
    
    // Questions et réponses avec les bonnes réponses en vert
    const questions = [
        {
            text: "Question 1: Quels sont les langages côté client pour le développement web ?",
            answers: ["HTML", "CSS", "JavaScript", "PHP"],
            correct: [0, 1, 2]
        },
        {
            text: "Question 2: Quelle méthode JavaScript permet de sélectionner un élément par son ID ?",
            answers: ["document.querySelector()", "document.getElementById()", "document.getElementsByClassName()", "document.getElementsByTagName()"],
            correct: [1]
        },
        {
            text: "Question 3: Quelles sont les méthodes pour manipuler le DOM en JavaScript ?",
            answers: ["innerHTML", "getElementById()", "querySelector()", "console.log()"],
            correct: [0, 1, 2]
        },
        {
            text: "Question 4: Quel événement se déclenche quand un utilisateur clique sur un élément ?",
            answers: ["onmouseover", "onclick", "onkeydown", "onload"],
            correct: [1]
        },
        {
            text: "Question 5: Quels sont les types de stockage local en JavaScript ?",
            answers: ["localStorage", "sessionStorage", "cookies", "indexedDB"],
            correct: [0, 1, 2, 3]
        }
    ];
    
    questions.forEach((q, index) => {
        content += `
            <div class="question">
                <div class="question-title">${q.text}</div>
        `;
        
        q.answers.forEach((answer, i) => {
            const isCorrect = q.correct.includes(i);
            const className = isCorrect ? 'correct' : '';
            content += `
                <div class="answer ${className}">
                    ${isCorrect ? '✓ ' : ''}${answer}
                </div>
            `;
        });
        
        content += `</div>`;
    });
    
    content += `
            <div style="text-align: center; margin-top: 30px;">
                <p><strong>Note:</strong> Les réponses correctes sont en vert et soulignées.</p>
            </div>
        </body>
        </html>
    `;
    
    answersWindow.document.write(content);
    answersWindow.document.close();
    answersWindow.focus();
}

// Afficher le résultat
function showResult() {
    const { score, results } = checkAnswers();
    
    let content = `
        <div class="score-display">
            <h2>📊 Résultat du QCM</h2>
            <div class="score-value">${score}/5</div>
            <p>${score === 5 ? 'Excellent ! 🎉' : score >= 3 ? 'Bon travail ! 👍' : 'Continuez à pratiquer ! 💪'}</p>
        </div>
        
        <h3>Détail des réponses:</h3>
    `;
    
    results.forEach((result, index) => {
        const questionNumber = index + 1;
        const isCorrect = result.isCorrect;
        
        content += `
            <div class="result-item ${isCorrect ? 'result-correct' : 'result-incorrect'}">
                <strong>Question ${questionNumber}:</strong><br>
                ${isCorrect ? '✅ Correcte' : '❌ Incorrecte'}<br>
        `;
        
        if (!isCorrect) {
            content += `
                <small>Votre réponse: ${result.userAnswer.length > 0 ? result.userAnswer.join(', ') : 'Aucune réponse'}</small><br>
                <small>Réponse correcte: ${result.correctAnswer.join(', ')}</small>
            `;
        }
        
        content += `</div>`;
    });
    
    // Afficher dans la modal
    modalContent.innerHTML = content;
    resultModal.style.display = 'flex';
    
    // Ajuster la taille de la fenêtre
    setTimeout(() => {
        const modalHeight = resultModal.offsetHeight;
        const modalWidth = resultModal.offsetWidth;
        console.log(`Taille recommandée: ${modalWidth}x${modalHeight}`);
    }, 100);
}

// Réinitialiser le QCM
function resetQCM() {
    // Réinitialiser les réponses
    const form = document.getElementById('qcmForm');
    form.reset();
    
    // Réinitialiser le timer
    timeLeft = 15 * 60;
    updateTimerDisplay();
    updateProgressBar();
    
    // Réinitialiser les statistiques
    for (let q in userAnswers) {
        userAnswers[q] = [];
    }
    
    updateStats();
    
    // Redémarrer le timer
    startTimer();
    
    // Message de confirmation
    alert("Le QCM a été réinitialisé ! Le chronomètre recommence à 15:00.");
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
    // Écouter les changements dans le formulaire
    const form = document.getElementById('qcmForm');
    form.addEventListener('change', getUserAnswers);
    
    // Bouton de réinitialisation
    resetBtn.addEventListener('click', resetQCM);
    
    // Bouton pour voir les réponses
    showAnswersBtn.addEventListener('click', showCorrectAnswers);
    
    // Bouton pour voir le résultat
    showResultBtn.addEventListener('click', showResult);
    
    // Fermer la modal
    closeModal.addEventListener('click', () => {
        resultModal.style.display = 'none';
    });
    
    // Fermer la modal en cliquant en dehors
    window.addEventListener('click', (event) => {
        if (event.target === resultModal) {
            resultModal.style.display = 'none';
        }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && resultModal.style.display === 'flex') {
            resultModal.style.display = 'none';
        }
        if (event.key === 'r' || event.key === 'R') {
            if (event.ctrlKey) resetQCM();
        }
    });
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', init);