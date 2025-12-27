const bouton = document.getElementById('boutonMasquer');
const texte = document.getElementById('monTexte');

bouton.addEventListener('click', function() {
    if (texte.style.display === 'none') {
        texte.style.display = 'block';
        bouton.textContent = 'Masquer';
    } else {
        texte.style.display = 'none';
        bouton.textContent = 'Afficher';
    }
});