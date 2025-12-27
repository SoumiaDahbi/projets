const zoneInteraction = document.getElementById('zoneInteraction');
const compteurEntrees = document.getElementById('compteurEntrees');
const compteurSorties = document.getElementById('compteurSorties');

let entrees = 0;
let sorties = 0;

const couleurs = [
    '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', 
    '#E91E63', '#00BCD4', '#8BC34A', '#FF5722'
];

zoneInteraction.addEventListener('mouseenter', function() {
    entrees++;
    compteurEntrees.textContent = entrees;
    
    // Changer la couleur de fond
    const couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
    this.style.backgroundColor = couleurAleatoire;
    
    // Animation
    this.style.transform = 'scale(1.1) rotate(2deg)';
});

zoneInteraction.addEventListener('mouseleave', function() {
    sorties++;
    compteurSorties.textContent = sorties;
    
    // Revenir à la couleur originale
    this.style.backgroundColor = '#4CAF50';
    
    // Animation
    this.style.transform = 'scale(1) rotate(0deg)';
});