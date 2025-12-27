// Récupérer les éléments
const monCarre = document.getElementById('monCarre');
const bouton = document.getElementById('changerCouleur');
const infoCouleur = document.querySelector('#infoCouleur span');

// Liste de couleurs (format hexadécimal)
const couleurs = [
    '#3498db', // bleu
    '#e74c3c', // rouge
    '#2ecc71', // vert
    '#f39c12', // orange
    '#9b59b6', // violet
    '#1abc9c', // turquoise
    '#34495e', // bleu foncé
    '#e67e22', // orange foncé
    '#16a085', // vert foncé
    '#8e44ad'  // violet foncé
];

// Index pour suivre la couleur actuelle
let index = 0;

// Fonction pour changer la couleur
function changerCouleur() {
    // Passer à la couleur suivante
    index = (index + 1) % couleurs.length;
    
    // Appliquer la nouvelle couleur au carré
    monCarre.style.backgroundColor = couleurs[index];
    
    // Mettre à jour l'affichage de la couleur
    infoCouleur.textContent = couleurs[index];
}

// Ajouter l'événement au bouton
bouton.addEventListener('click', changerCouleur);

// Initialiser l'affichage de la couleur
infoCouleur.textContent = couleurs[0];