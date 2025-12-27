document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const validateBtn = document.getElementById('validate-btn');
    const resultDiv = document.getElementById('result');
    
    // Fonction de validation d'email
    function validerEmail(email) {
        // Vérifier si l'email contient @
        if (email.indexOf('@') === -1) {
            return { valide: false, message: "L'email doit contenir le caractère @" };
        }
        
        const parties = email.split('@');
        const avantArobase = parties[0];
        const apresArobase = parties[1];
        
        // Vérifier s'il y a au moins un caractère (lettre ou chiffre) avant @
        if (avantArobase.length === 0 || !/^[a-zA-Z0-9]+/.test(avantArobase)) {
            return { valide: false, message: "Il doit y avoir au moins un caractère (lettre ou chiffre) avant le @" };
        }
        
        // Vérifier s'il y a un point après @
        if (apresArobase.indexOf('.') === -1) {
            return { valide: false, message: "Il doit y avoir un point après le @" };
        }
        
        // Vérifier qu'il y a au moins un caractère après le point
        const partiesApresArobase = apresArobase.split('.');
        if (partiesApresArobase.length < 2 || partiesApresArobase[1].length === 0) {
            return { valide: false, message: "Il doit y avoir au moins un caractère après le point" };
        }
        
        return { valide: true, message: "L'email est valide !" };
    }
    
    // Gestionnaire d'événement pour le bouton de validation
    validateBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        // Vérifier si l'email est vide
        if (email === '') {
            afficherResultat(false, "Veuillez entrer une adresse email");
            return;
        }
        
        // Valider l'email
        const resultatValidation = validerEmail(email);
        afficherResultat(resultatValidation.valide, resultatValidation.message);
    });
    
    // Gestionnaire d'événement pour la touche Entrée
    emailInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            validateBtn.click();
        }
    });
    
    // Fonction pour afficher le résultat
    function afficherResultat(valide, message) {
        // Supprimer le placeholder s'il existe
        const placeholder = resultDiv.querySelector('.placeholder');
        if (placeholder) {
            resultDiv.removeChild(placeholder);
        }
        
        // Mettre à jour le contenu et les styles
        resultDiv.textContent = message;
        resultDiv.className = 'result'; // Réinitialiser les classes
        
        if (valide) {
            resultDiv.classList.add('valid');
        } else {
            resultDiv.classList.add('invalid');
        }
        
        // Ajouter une animation
        resultDiv.style.transform = 'scale(1.05)';
        setTimeout(() => {
            resultDiv.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Exemples pré-remplis pour tester
    const exemples = [
        "test@example.com",
        "utilisateur123@domaine.fr",
        "email.invalide",
        "@domaine.com",
        "test@domaine"
    ];
    
    // Ajouter un sélecteur d'exemples
    const exempleDiv = document.createElement('div');
    exempleDiv.className = 'exemples';
    exempleDiv.innerHTML = `
        <h4>Exemples à tester :</h4>
        <div class="exemple-btns">
            ${exemples.map(email => `<button class="exemple-btn" data-email="${email}">${email}</button>`).join('')}
        </div>
    `;
    
    document.querySelector('.rules').after(exempleDiv);
    
    // Gestionnaire d'événement pour les boutons d'exemple
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('exemple-btn')) {
            const email = e.target.getAttribute('data-email');
            emailInput.value = email;
            validateBtn.click();
        }
    });
});