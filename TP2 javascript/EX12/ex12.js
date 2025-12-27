// Éléments DOM
const screenWidthElement = document.getElementById('screenWidth');
const screenModeElement = document.getElementById('screenMode');
const visibleItemsElement = document.getElementById('visibleItems');
const toggleSidebarBtn = document.getElementById('toggleSidebar');
const changeLayoutBtn = document.getElementById('changeLayout');
const addItemBtn = document.getElementById('addItem');
const removeItemBtn = document.getElementById('removeItem');
const responsiveMessage = document.getElementById('responsiveMessage');
const itemsContainer = document.getElementById('itemsContainer');
const dynamicItems = document.getElementById('dynamicItems');
const sidebar = document.getElementById('sidebar');

// Variables
let itemCounter = 1;
let dynamicItemCounter = 1;
let layoutMode = 'desktop';
let sidebarVisible = true;

// Définir les breakpoints
const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1025
};

// Messages selon la taille d'écran
const MESSAGES = {
    MOBILE: "📱 Mode Mobile: Interface simplifiée pour petits écrans",
    TABLET: "📟 Mode Tablette: Interface adaptée pour écrans moyens",
    DESKTOP: "💻 Mode Desktop: Interface complète pour grands écrans"
};

// Couleurs pour les éléments
const COLORS = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
    '#1abc9c', '#34495e', '#e67e22', '#16a085', '#8e44ad'
];

// Initialiser les éléments
function initializeItems() {
    // Créer 6 éléments initiaux
    for (let i = 0; i < 6; i++) {
        createGridItem();
    }
    
    // Créer 4 éléments dynamiques
    for (let i = 0; i < 4; i++) {
        createDynamicItem();
    }
}

// Créer un élément de grille
function createGridItem() {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.innerHTML = `
        <div class="item-icon">📦</div>
        <h4>Élément ${itemCounter}</h4>
        <p>Créé dynamiquement</p>
        <div class="item-size">Taille: ${getSizeLabel()}</div>
    `;
    
    // Appliquer une couleur aléatoire
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    item.style.borderLeft = `4px solid ${color}`;
    
    itemsContainer.appendChild(item);
    itemCounter++;
}

// Créer un élément dynamique
function createDynamicItem() {
    const item = document.createElement('div');
    item.className = 'dynamic-item';
    item.innerHTML = `
        <div class="item-number">${dynamicItemCounter}</div>
        <div class="item-label">Item</div>
    `;
    
    // Appliquer une couleur de fond
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    item.style.backgroundColor = `${color}20`; // Couleur avec transparence
    item.style.color = color;
    
    dynamicItems.appendChild(item);
    dynamicItemCounter++;
}

// Obtenir le label de taille
function getSizeLabel() {
    const width = window.innerWidth;
    if (width < BREAKPOINTS.MOBILE) return 'Petit';
    if (width < BREAKPOINTS.TABLET) return 'Moyen';
    return 'Grand';
}

// Détecter et mettre à jour le mode d'écran
function updateScreenInfo() {
    const width = window.innerWidth;
    let mode;
    
    if (width < BREAKPOINTS.MOBILE) {
        mode = 'mobile';
        responsiveMessage.textContent = MESSAGES.MOBILE;
    } else if (width < BREAKPOINTS.TABLET) {
        mode = 'tablette';
        responsiveMessage.textContent = MESSAGES.TABLET;
    } else {
        mode = 'desktop';
        responsiveMessage.textContent = MESSAGES.DESKTOP;
    }
    
    // Mettre à jour l'affichage
    screenWidthElement.textContent = width;
    screenModeElement.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    
    // Appliquer les changements de layout
    applyResponsiveChanges(mode);
    
    // Mettre à jour le compteur d'éléments visibles
    const visibleItems = document.querySelectorAll('.grid-item').length;
    visibleItemsElement.textContent = visibleItems;
}

// Appliquer les changements selon le mode
function applyResponsiveChanges(mode) {
    // Enregistrer le mode actuel
    layoutMode = mode;
    
    // Appliquer des classes CSS selon le mode
    document.body.className = '';
    document.body.classList.add(`${mode}-mode`);
    
    // Changer la grille selon la taille
    if (mode === 'mobile') {
        itemsContainer.style.gridTemplateColumns = '1fr';
        sidebar.classList.add('mobile-hidden');
        sidebarVisible = false;
    } else if (mode === 'tablette') {
        itemsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        sidebar.classList.remove('mobile-hidden');
        sidebarVisible = true;
    } else {
        itemsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        sidebar.classList.remove('mobile-hidden');
        sidebarVisible = true;
    }
    
    // Ajuster le contenu du message
    responsiveMessage.className = '';
    if (mode === 'mobile') {
        responsiveMessage.classList.add('highlight');
    }
}

// Gérer les boutons
toggleSidebarBtn.addEventListener('click', function() {
    if (sidebarVisible) {
        sidebar.style.display = 'none';
        sidebarVisible = false;
    } else {
        sidebar.style.display = 'block';
        sidebarVisible = true;
    }
});

changeLayoutBtn.addEventListener('click', function() {
    // Alterner entre différents layouts
    const layouts = ['default', 'compact', 'spacious'];
    const currentLayout = itemsContainer.classList[0] || 'default';
    const nextIndex = (layouts.indexOf(currentLayout) + 1) % layouts.length;
    
    // Retirer toutes les classes de layout
    itemsContainer.classList.remove(...layouts);
    
    // Appliquer le nouveau layout
    itemsContainer.classList.add(layouts[nextIndex]);
    
    // Ajuster le style
    if (layouts[nextIndex] === 'compact') {
        itemsContainer.style.gap = '8px';
        document.querySelectorAll('.grid-item').forEach(item => {
            item.style.padding = '10px';
            item.style.fontSize = '0.9rem';
        });
    } else if (layouts[nextIndex] === 'spacious') {
        itemsContainer.style.gap = '25px';
        document.querySelectorAll('.grid-item').forEach(item => {
            item.style.padding = '25px';
            item.style.fontSize = '1.1rem';
        });
    } else {
        itemsContainer.style.gap = '15px';
        document.querySelectorAll('.grid-item').forEach(item => {
            item.style.padding = '20px';
            item.style.fontSize = '1rem';
        });
    }
});

addItemBtn.addEventListener('click', function() {
    createGridItem();
    createDynamicItem();
    updateScreenInfo();
});

removeItemBtn.addEventListener('click', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const dynamicItemsList = document.querySelectorAll('.dynamic-item');
    
    if (gridItems.length > 1) {
        gridItems[gridItems.length - 1].remove();
    }
    
    if (dynamicItemsList.length > 1) {
        dynamicItemsList[dynamicItemsList.length - 1].remove();
    }
    
    updateScreenInfo();
});

// Écouter le redimensionnement de la fenêtre
window.addEventListener('resize', updateScreenInfo);

// Écouter le chargement de la page
window.addEventListener('load', function() {
    initializeItems();
    updateScreenInfo();
});

// Initialisation
updateScreenInfo();