const produits = [
    {
        id: 1,
        nom: "Ordinateur Portable",
        description: "PC portable haute performance avec processeur i7 et 16GB RAM",
        categorie: "Informatique",
        prix: 1299,
        icon: "💻"
    },
    {
        id: 2,
        nom: "Smartphone",
        description: "Smartphone Android avec écran OLED et triple appareil photo",
        categorie: "Téléphonie",
        prix: 899,
        icon: "📱"
    },
    {
        id: 3,
        nom: "Casque Audio",
        description: "Casque sans fil avec réduction de bruit active",
        categorie: "Audio",
        prix: 299,
        icon: "🎧"
    },
    {
        id: 4,
        nom: "Écran LED",
        description: "Écran 4K 27 pouces avec HDR et 144Hz",
        categorie: "Informatique",
        prix: 599,
        icon: "🖥️"
    },
    {
        id: 5,
        nom: "Clavier Mécanique",
        description: "Clavier gaming mécanique RGB avec switches Cherry MX",
        categorie: "Informatique",
        prix: 149,
        icon: "⌨️"
    },
    {
        id: 6,
        nom: "Souris Sans Fil",
        description: "Souris ergonomique sans fil avec capteur haute précision",
        categorie: "Informatique",
        prix: 79,
        icon: "🖱️"
    }
];

const listeProduits = document.getElementById('listeProduits');
const rechercheInput = document.getElementById('rechercheInput');
const compteurProduits = document.getElementById('compteurProduits');
const messageVide = document.getElementById('messageVide');
const reinitialiserBtn = document.getElementById('reinitialiserBtn');

// Afficher les produits
function afficherProduits(produitsAAfficher) {
    listeProduits.innerHTML = '';
    
    produitsAAfficher.forEach(produit => {
        const produitCard = document.createElement('div');
        produitCard.className = 'produit-card';
        produitCard.innerHTML = `
            <div class="produit-icon">${produit.icon}</div>
            <div class="produit-nom">${produit.nom}</div>
            <div class="produit-description">${produit.description}</div>
            <div class="produit-prix">${produit.prix}€</div>
            <span class="produit-categorie">${produit.categorie}</span>
        `;
        listeProduits.appendChild(produitCard);
    });
    
    // Mettre à jour le compteur
    compteurProduits.textContent = produitsAAfficher.length;
    
    // Afficher ou masquer le message vide
    if (produitsAAfficher.length === 0) {
        messageVide.style.display = 'block';
    } else {
        messageVide.style.display = 'none';
    }
}

// Filtrer les produits
function filtrerProduits() {
    const recherche = rechercheInput.value.toLowerCase().trim();
    
    if (recherche === '') {
        return produits;
    }
    
    return produits.filter(produit => {
        return produit.nom.toLowerCase().includes(recherche) ||
               produit.description.toLowerCase().includes(recherche) ||
               produit.categorie.toLowerCase().includes(recherche);
    });
}

// Écouter les changements dans le champ de recherche
rechercheInput.addEventListener('input', function() {
    const produitsFiltres = filtrerProduits();
    afficherProduits(produitsFiltres);
});

// Réinitialiser la recherche
reinitialiserBtn.addEventListener('click', function() {
    rechercheInput.value = '';
    afficherProduits(produits);
});

// Initialisation
afficherProduits(produits);