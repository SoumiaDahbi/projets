// Première calculatrice (avec champs de saisie)
const number1Input = document.getElementById('number1');
const number2Input = document.getElementById('number2');
const result1Display = document.getElementById('result1');
const operationButtons = document.querySelectorAll('.operation-btn');

// Fonction pour effectuer les calculs de la première calculatrice
function calculate(operation) {
    const num1 = parseFloat(number1Input.value);
    const num2 = parseFloat(number2Input.value);
    
    // Validation des entrées
    if (isNaN(num1) || isNaN(num2)) {
        result1Display.textContent = "Veuillez entrer deux nombres valides";
        result1Display.style.color = "#e74c3c";
        return;
    }
    
    let result;
    let operationSymbol;
    
    switch(operation) {
        case 'add':
            result = num1 + num2;
            operationSymbol = '+';
            break;
        case 'subtract':
            result = num1 - num2;
            operationSymbol = '-';
            break;
        case 'multiply':
            result = num1 * num2;
            operationSymbol = '×';
            break;
        case 'divide':
            if (num2 === 0) {
                result1Display.textContent = "Erreur: Division par zéro";
                result1Display.style.color = "#e74c3c";
                return;
            }
            result = num1 / num2;
            operationSymbol = '÷';
            break;
        default:
            result1Display.textContent = "Opération non valide";
            result1Display.style.color = "#e74c3c";
            return;
    }
    
    // Afficher le résultat avec l'opération
    result1Display.textContent = `${num1} ${operationSymbol} ${num2} = ${result}`;
    result1Display.style.color = "#2c3e50";
}

// Ajouter les événements aux boutons d'opération de la première calculatrice
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operation = button.getAttribute('data-operation');
        calculate(operation);
    });
});

// Deuxième calculatrice (avec pavé numérique)
const previousOperationDisplay = document.getElementById('previous-operation');
const currentOperationDisplay = document.getElementById('current-operation');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

// Mettre à jour l'affichage
function updateDisplay() {
    currentOperationDisplay.textContent = currentInput;
    
    if (operation != null) {
        previousOperationDisplay.textContent = `${previousInput} ${getOperationSymbol(operation)}`;
    } else {
        previousOperationDisplay.textContent = '';
    }
}

// Obtenir le symbole d'opération
function getOperationSymbol(op) {
    switch(op) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
        default: return '';
    }
}

// Ajouter un chiffre
function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
}

// Ajouter une virgule décimale
function appendDecimal() {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        return;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

// Choisir une opération
function chooseOperation(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculateResult();
    }
    
    operation = op;
    previousInput = currentInput;
    resetScreen = true;
}

// Effectuer le calcul
function calculateResult() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch(operation) {
        case 'add':
            computation = prev + current;
            break;
        case 'subtract':
            computation = prev - current;
            break;
        case 'multiply':
            computation = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                alert("Erreur: Division par zéro!");
                clearCalculator();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = computation.toString();
    operation = null;
    previousInput = '';
}

// Effacer la calculatrice
function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
}

// Événements pour les boutons de la deuxième calculatrice

// Boutons chiffres
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.getAttribute('data-number'));
        updateDisplay();
    });
});

// Boutons opérateurs
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.getAttribute('data-operation'));
        updateDisplay();
    });
});

// Bouton égal
equalsButton.addEventListener('click', () => {
    calculateResult();
    updateDisplay();
});

// Bouton C (effacer)
clearButton.addEventListener('click', () => {
    clearCalculator();
    updateDisplay();
});

// Bouton virgule
decimalButton.addEventListener('click', () => {
    appendDecimal();
    updateDisplay();
});

// Gestion du clavier
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
        updateDisplay();
    } else if (event.key === '.') {
        appendDecimal();
        updateDisplay();
    } else if (event.key === '+' || event.key === '-') {
        chooseOperation(event.key === '+' ? 'add' : 'subtract');
        updateDisplay();
    } else if (event.key === '*' || event.key === 'x') {
        chooseOperation('multiply');
        updateDisplay();
    } else if (event.key === '/') {
        chooseOperation('divide');
        updateDisplay();
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculateResult();
        updateDisplay();
    } else if (event.key === 'Escape' || event.key === 'Delete') {
        clearCalculator();
        updateDisplay();
    }
});

// Initialiser les affichages
updateDisplay();