document.getElementById('monFormulaire').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const erreurNom = document.getElementById('erreurNom');
    const erreurEmail = document.getElementById('erreurEmail');
    const messageSucces = document.getElementById('messageSucces');
    
    // Réinitialiser les messages d'erreur
    erreurNom.textContent = '';
    erreurEmail.textContent = '';
    messageSucces.style.display = 'none';
    
    let isValid = true;
    
    // Validation du nom
    if (nom === '') {
        erreurNom.textContent = 'Le nom est requis';
        isValid = false;
    }
    
    // Validation de l'email
    if (email === '') {
        erreurEmail.textContent = 'L\'email est requis';
        isValid = false;
    } else if (!isValidEmail(email)) {
        erreurEmail.textContent = 'Email invalide';
        isValid = false;
    }
    
    if (isValid) {
        messageSucces.textContent = 'Formulaire soumis avec succès!';
        messageSucces.style.display = 'block';
        // Ici, normalement, on enverrait les données au serveur
        // this.reset(); // Pour vider le formulaire
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}