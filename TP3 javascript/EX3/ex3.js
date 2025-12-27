document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('number-input');
    const addBtn = document.getElementById('add-btn');
    const clearBtn = document.getElementById('clear-btn');
    const generateBtn = document.getElementById('generate-btn');
    const sortBtn = document.getElementById('sort-btn');
    const numbersContainer = document.getElementById('numbers-container');
    const resultContainer = document.getElementById('result-container');
    const countElement = document.getElementById('count');
    const sumElement = document.getElementById('sum');
    
    let numbers = [];
    
    // Fonction pour ajouter un nombre à la liste
    function ajouterNombre() {
        const valeur = numberInput.value.trim();
        
        if (valeur === '') {
            alert('Veuillez entrer un nombre');
            return;
        }
        
        const nombre = parseFloat(valeur);
        
        if (isNaN(nombre)) {
            alert('Veuillez entrer un nombre valide');
            return;
        }
        
        numbers.push(nombre);
        afficherListe();
        mettreAJourInfos();
        numberInput.value = '';
        numberInput.focus();
    }
    
    // Fonction pour afficher la liste de nombres
    function afficherListe() {
        // Supprimer le message vide s'il existe
        const emptyMsg = numbersContainer.querySelector('.empty-message');
        if (emptyMsg) {
            numbersContainer.removeChild(emptyMsg);
        }
        
        // Effacer le contenu actuel
        numbersContainer.innerHTML = '';
        
        // Ajouter chaque nombre
        numbers.forEach((nombre, index) => {
            const numberElement = document.createElement('div');
            numberElement.className = 'number-item';
            numberElement.innerHTML = `
                ${nombre}
                <button class="remove-btn" data-index="${index}">×</button>
            `;
            numbersContainer.appendChild(numberElement);
        });
    }
    
    // Fonction pour mettre à jour les informations (nombre d'éléments et somme)
    function mettreAJourInfos() {
        countElement.textContent = numbers.length;
        
        const somme = numbers.reduce((total, nombre) => total + nombre, 0);
        sumElement.textContent = somme.toFixed(2);
    }
    
    // Fonction pour effacer toute la liste
    function effacerListe() {
        numbers = [];
        afficherListe();
        mettreAJourInfos();
        
        // Réinitialiser le résultat
        resultContainer.innerHTML = '<p class="placeholder">La liste triée s\'affichera ici</p>';
        resultContainer.classList.remove('sorted');
    }
    
    // Fonction pour générer des nombres aléatoires
    function genererNombresAleatoires() {
        numbers = [];
        
        for (let i = 0; i < 10; i++) {
            // Générer un nombre aléatoire entre 1 et 100
            const nombreAleatoire = Math.floor(Math.random() * 100) + 1;
            numbers.push(nombreAleatoire);
        }
        
        afficherListe();
        mettreAJourInfos();
        
        // Effacer le résultat précédent
        resultContainer.innerHTML = '<p class="placeholder">La liste triée s\'affichera ici</p>';
        resultContainer.classList.remove('sorted');
    }
    
    // Fonction de tri (tri à bulles)
    function trier(liste) {
        // Créer une copie de la liste pour ne pas modifier l'originale
        const listeTriee = [...liste];
        
        // Algorithme de tri à bulles
        for (let i = 0; i < listeTriee.length - 1; i++) {
            for (let j = 0; j < listeTriee.length - i - 1; j++) {
                if (listeTriee[j] > listeTriee[j + 1]) {
                    // Échanger les éléments
                    const temp = listeTriee[j];
                    listeTriee[j] = listeTriee[j + 1];
                    listeTriee[j + 1] = temp;
                }
            }
        }
        
        return listeTriee;
    }
    
    // Fonction pour trier et afficher le résultat
    function trierEtAfficher() {
        if (numbers.length === 0) {
            alert('La liste est vide. Ajoutez des nombres ou générez une liste aléatoire.');
            return;
        }
        
        // Utiliser la fonction trier()
        const listeTriee = trier(numbers);
        
        // Afficher le résultat
        afficherResultat(listeTriee);
    }
    
    // Fonction pour afficher le résultat du tri
    function afficherResultat(listeTriee) {
        // Supprimer le placeholder s'il existe
        const placeholder = resultContainer.querySelector('.placeholder');
        if (placeholder) {
            resultContainer.removeChild(placeholder);
        }
        
        // Effacer le contenu actuel
        resultContainer.innerHTML = '';
        
        // Ajouter chaque nombre trié avec une animation progressive
        listeTriee.forEach((nombre, index) => {
            setTimeout(() => {
                const numberElement = document.createElement('div');
                numberElement.className = 'sorted-number';
                numberElement.textContent = nombre;
                resultContainer.appendChild(numberElement);
                
                // Ajouter une classe pour le style une fois que tous les éléments sont ajoutés
                if (index === listeTriee.length - 1) {
                    setTimeout(() => {
                        resultContainer.classList.add('sorted');
                    }, 300);
                }
            }, index * 100); // Délai pour l'animation
        });
    }
    
    // Gestionnaire d'événements pour le bouton d'ajout
    addBtn.addEventListener('click', ajouterNombre);
    
    // Gestionnaire d'événements pour la touche Entrée
    numberInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            ajouterNombre();
        }
    });
    
    // Gestionnaire d'événements pour le bouton d'effacement
    clearBtn.addEventListener('click', effacerListe);
    
    // Gestionnaire d'événements pour le bouton de génération
    generateBtn.addEventListener('click', genererNombresAleatoires);
    
    // Gestionnaire d'événements pour le bouton de tri
    sortBtn.addEventListener('click', trierEtAfficher);
    
    // Gestionnaire d'événements pour la suppression d'un nombre (délégué)
    numbersContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            numbers.splice(index, 1);
            afficherListe();
            mettreAJourInfos();
            
            // Réinitialiser le résultat
            resultContainer.innerHTML = '<p class="placeholder">La liste triée s\'affichera ici</p>';
            resultContainer.classList.remove('sorted');
        }
    });
});