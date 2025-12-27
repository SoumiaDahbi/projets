const modal = document.getElementById('maModal');
const ouvrirModalBtn = document.getElementById('ouvrirModalBtn');
const fermerModalBtn = document.getElementById('fermerModalBtn');
const fermerModalX = document.querySelector('.modal-fermer');

// Ouvrir la modal
ouvrirModalBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
});

// Fermer la modal avec le bouton X
fermerModalX.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fermer la modal avec le bouton "Fermer"
fermerModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fermer la modal en cliquant en dehors
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fermer la modal avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});