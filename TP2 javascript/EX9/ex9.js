let taches = [];
let filtreActuel = 'toutes';

const inputTache = document.getElementById('inputTache');
const ajouterBtn = document.getElementById('ajouterBtn');
const listeTaches = document.getElementById('listeTaches');
const compteurTaches = document.getElementById('compteurTaches');
const filtresBtns = document.querySelectorAll('.filtre-btn');

// Charger les tâches depuis localStorage
function chargerTaches() {
    const tachesSauvegardees = localStorage.getItem('taches');
    if (tachesSauvegardees) {
        taches = JSON.parse(tachesSauvegardees);
    }
    mettreAJourListe();
}

// Sauvegarder les tâches dans localStorage
function sauvegarderTaches() {
    localStorage.setItem('taches', JSON.stringify(taches));
}

// Ajouter une nouvelle tâche
ajouterBtn.addEventListener('click', function() {
    const texte = inputTache.value.trim();
    if (texte) {
        const nouvelleTache = {
            id: Date.now(),
            texte: texte,
            terminee: false
        };
        taches.push(nouvelleTache);
        inputTache.value = '';
        sauvegarderTaches();
        mettreAJourListe();
    }
});

// Ajouter avec la touche Enter
inputTache.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        ajouterBtn.click();
    }
});

// Marquer une tâche comme terminée
function basculerTerminee(id) {
    const tache = taches.find(t => t.id === id);
    if (tache) {
        tache.terminee = !tache.terminee;
        sauvegarderTaches();
        mettreAJourListe();
    }
}

// Supprimer une tâche
function supprimerTache(id) {
    taches = taches.filter(t => t.id !== id);
    sauvegarderTaches();
    mettreAJourListe();
}

// Mettre à jour l'affichage de la liste
function mettreAJourListe() {
    // Filtrer selon le filtre actuel
    let tachesFiltrees;
    switch(filtreActuel) {
        case 'actives':
            tachesFiltrees = taches.filter(t => !t.terminee);
            break;
        case 'terminees':
            tachesFiltrees = taches.filter(t => t.terminee);
            break;
        default:
            tachesFiltrees = taches;
    }
    
    // Vider la liste
    listeTaches.innerHTML = '';
    
    // Ajouter chaque tâche
    tachesFiltrees.forEach(tache => {
        const li = document.createElement('li');
        li.className = `tache-item ${tache.terminee ? 'terminee' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="tache-checkbox" ${tache.terminee ? 'checked' : ''}>
            <span class="tache-texte">${tache.texte}</span>
            <button class="btn-supprimer" onclick="supprimerTache(${tache.id})">Supprimer</button>
        `;
        
        li.querySelector('.tache-checkbox').addEventListener('click', () => {
            basculerTerminee(tache.id);
        });
        
        listeTaches.appendChild(li);
    });
    
    // Mettre à jour le compteur
    const tachesActives = taches.filter(t => !t.terminee).length;
    compteurTaches.textContent = tachesActives;
}

// Gérer les filtres
filtresBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Retirer la classe active de tous les boutons
        filtresBtns.forEach(b => b.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        this.classList.add('active');
        // Changer le filtre actuel
        filtreActuel = this.getAttribute('data-filtre');
        mettreAJourListe();
    });
});

// Initialisation
chargerTaches();