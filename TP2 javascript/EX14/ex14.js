const sourceZone = document.getElementById('sourceZone');
const destinationZone = document.getElementById('destinationZone');
const placeholder = document.getElementById('placeholder');
const sourceCount = document.getElementById('sourceCount');
const destCount = document.getElementById('destCount');
const resetBtn = document.getElementById('resetBtn');
const logs = document.getElementById('logs');

let draggedElement = null;
let draggedElementParent = null;

// Éléments initiaux dans la zone source
const initialElements = [
    { id: '1', icon: '📁', text: 'Document' },
    { id: '2', icon: '📊', text: 'Graphique' },
    { id: '3', icon: '📋', text: 'Liste' },
    { id: '4', icon: '📌', text: 'Note' },
    { id: '5', icon: '📎', text: 'Fichier' }
];

// Journal des actions
function logAction(message, type = 'info') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logs.appendChild(logEntry);
    logs.scrollTop = logs.scrollHeight;
}

// Mettre à jour les compteurs
function updateCounters() {
    const sourceElements = sourceZone.querySelectorAll('.element').length;
    const destElements = destinationZone.querySelectorAll('.element').length;
    
    sourceCount.textContent = sourceElements;
    destCount.textContent = destElements;
    
    // Afficher/masquer le placeholder
    if (destElements > 0) {
        placeholder.style.display = 'none';
    } else {
        placeholder.style.display = 'block';
    }
}

// Créer un élément drag & drop
function createElement(data) {
    const element = document.createElement('div');
    element.className = 'element';
    element.draggable = true;
    element.dataset.id = data.id;
    
    element.innerHTML = `
        <div class="element-icon">${data.icon}</div>
        <div class="element-text">${data.text}</div>
    `;
    
    // Événements de drag & drop
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
    
    return element;
}

// Initialiser les éléments
function initializeElements() {
    sourceZone.innerHTML = '<h2>Source</h2>';
    destinationZone.innerHTML = '<h2>Destination</h2>';
    
    // Ajouter le placeholder à la destination
    const placeholderClone = placeholder.cloneNode(true);
    placeholderClone.id = 'placeholder';
    destinationZone.appendChild(placeholderClone);
    
    // Créer et ajouter les éléments initiaux
    initialElements.forEach(data => {
        const element = createElement(data);
        sourceZone.appendChild(element);
    });
    
    updateCounters();
}

// Gérer le début du drag
function handleDragStart(e) {
    draggedElement = this;
    draggedElementParent = this.parentElement;
    
    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', this.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    
    logAction(`Début du drag: ${this.querySelector('.element-text').textContent}`);
}

// Gérer la fin du drag
function handleDragEnd() {
    this.classList.remove('dragging');
    draggedElement = null;
    draggedElementParent = null;
}

// Gérer le drag over
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    this.classList.add('drag-over');
    
    if (this === destinationZone && placeholder.style.display !== 'none') {
        placeholder.classList.add('highlight');
    }
}

// Gérer le drag leave
function handleDragLeave() {
    this.classList.remove('drag-over');
    placeholder.classList.remove('highlight');
}

// Gérer le drop
function handleDrop(e) {
    e.preventDefault();
    
    this.classList.remove('drag-over');
    placeholder.classList.remove('highlight');
    
    if (draggedElement) {
        // Vérifier si l'élément vient de la source et va vers la destination
        const isMovingToDestination = (this === destinationZone && draggedElementParent === sourceZone);
        // Vérifier si l'élément vient de la destination et va vers la source
        const isMovingToSource = (this === sourceZone && draggedElementParent === destinationZone);
        
        if (isMovingToDestination || isMovingToSource) {
            this.appendChild(draggedElement);
            updateCounters();
            
            const elementName = draggedElement.querySelector('.element-text').textContent;
            const fromZone = draggedElementParent === sourceZone ? 'Source' : 'Destination';
            const toZone = this === sourceZone ? 'Source' : 'Destination';
            
            logAction(`${elementName} déplacé de ${fromZone} vers ${toZone}`, 'success');
        }
    }
}

// Événements pour les zones
sourceZone.addEventListener('dragover', handleDragOver);
sourceZone.addEventListener('dragleave', handleDragLeave);
sourceZone.addEventListener('drop', handleDrop);

destinationZone.addEventListener('dragover', handleDragOver);
destinationZone.addEventListener('dragleave', handleDragLeave);
destinationZone.addEventListener('drop', handleDrop);

// Réinitialiser
resetBtn.addEventListener('click', function() {
    initializeElements();
    logs.innerHTML = '<h3>Journal des actions:</h3>';
    logAction('Système réinitialisé', 'info');
});

// Initialisation
initializeElements();