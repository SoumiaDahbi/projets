// Utilisation d'images de Unsplash (garanties de fonctionner)
const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Montagnes
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", // 
        // Lac
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",  // Paysage
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000"   // Coucher de soleil
];

// Redimensionner les images pour un chargement plus rapide
const imagesAvecDimensions = images.map(img => `${img}?w=800&h=450&fit=crop`);

let indexActuel = 0;
const imageActive = document.getElementById('imageActive');
const imageIndex = document.getElementById('imageIndex');
const precedent = document.getElementById('precedent');
const suivant = document.getElementById('suivant');

// Titres pour les images
const titresImages = [
    "Montagnes enneigées",
    "Forêt mystérieuse",
    "Lac tranquille",
    "Paysage naturel",
    "Coucher de soleil"
];

function mettreAJourCarousel() {
    imageActive.src = imagesAvecDimensions[indexActuel];
    imageActive.alt = titresImages[indexActuel];
    imageIndex.textContent = `${indexActuel + 1} / ${images.length}`;
    
    // Désactiver les boutons si nécessaire
    precedent.disabled = indexActuel === 0;
    suivant.disabled = indexActuel === images.length - 1;
    
    // Afficher le titre de l'image dans la console (optionnel)
    console.log(`Image ${indexActuel + 1}: ${titresImages[indexActuel]}`);
}

suivant.addEventListener('click', function() {
    if (indexActuel < images.length - 1) {
        indexActuel++;
        mettreAJourCarousel();
    }
});

precedent.addEventListener('click', function() {
    if (indexActuel > 0) {
        indexActuel--;
        mettreAJourCarousel();
    }
});

// Navigation au clavier
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        suivant.click();
    } else if (event.key === 'ArrowLeft') {
        precedent.click();
    }
});

// Préchargement des images pour éviter les délais
function prechargerImages() {
    imagesAvecDimensions.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialisation
prechargerImages();
mettreAJourCarousel();