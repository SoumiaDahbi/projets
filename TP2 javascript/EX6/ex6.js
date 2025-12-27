const menuTitre = document.getElementById('menuTitre');
const menuContenu = document.getElementById('menuContenu');
const fleche = menuTitre.querySelector('.fleche');

menuTitre.addEventListener('click', function() {
    const estOuvert = menuContenu.classList.contains('ouvert');
    
    if (estOuvert) {
        // Fermer le menu
        menuContenu.classList.remove('ouvert');
        fleche.style.transform = 'rotate(0deg)';
    } else {
        // Ouvrir le menu
        menuContenu.classList.add('ouvert');
        fleche.style.transform = 'rotate(180deg)';
    }
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', function(event) {
    if (!menuTitre.contains(event.target) && !menuContenu.contains(event.target)) {
        menuContenu.classList.remove('ouvert');
        fleche.style.transform = 'rotate(0deg)';
    }
});