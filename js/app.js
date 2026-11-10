// Application Fleurs Roussel.
// Les données viennent de data/donnees.json, produites par le prompt de contenu.
// Règles de code : voir AGENTS.md et les conventions d'intégration de l'agence.

// Éléments du DOM
const gridContainer = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const anecdoteBox = document.getElementById('anecdote-box');
const restartBtn = document.getElementById('restart-btn');

// État du jeu
let cartes = [];
let cartesSelectionnees = [];
let cartesVerrouillees = false;
let coups = 0;
let pairesTrouvees = 0;

// 1. Charger les données du fichier JSON
async function chargerDonnees() {
    try {
        const response = await fetch('./data/donnees.json');
        const fleurs = await response.json();
        initialiserJeu(fleurs);
    } catch (erreur) {
        console.error("Erreur de chargement du JSON :", erreur);
        gridContainer.innerHTML = `<p class="col-span-4 text-red-500 text-sm">Impossible de charger les cartes.</p>`;
    }
}

// 2. Initialiser le plateau de jeu
function initialiserJeu(fleurs) {
    // Réinitialisation des variables d'état
    coups = 0;
    pairesTrouvees = 0;
    cartesSelectionnees = [];
    cartesVerrouillees = false;
    scoreElement.textContent = coups;

    anecdoteBox.classList.add('hidden');
    anecdoteBox.textContent = '';
    restartBtn.classList.add('hidden');

    // Doubler les 8 fleurs pour faire 16 cartes (8 paires)
    const jeu = [...fleurs, ...fleurs].map((fleur, index) => ({
        ...fleur,
        uniqueId: `${fleur.id}-${index}`
    }));

    // Mélanger le jeu
    cartes = jeu.sort(() => Math.random() - 0.5);

    afficherGrille();
}

// 3. Générer les cartes dans le DOM
function afficherGrille() {
    gridContainer.innerHTML = '';

    cartes.forEach(carte => {
        const carteEl = document.createElement('div');
        carteEl.className = 'carte aspect-square bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xl font-bold cursor-pointer select-none shadow transition-transform duration-200 hover:scale-105';
        carteEl.dataset.uniqueId = carte.uniqueId;
        carteEl.dataset.id = carte.id;
        carteEl.textContent = '?';

        carteEl.addEventListener('click', () => retournerCarte(carteEl, carte));
        gridContainer.appendChild(carteEl);
    });
}

// 4. Logique de retournement d'une carte
function retournerCarte(carteEl, carte) {
    // Anti-triche : ignorer si plateau verrouillé, carte déjà retournée ou même carte cliquée 2 fois
    if (cartesVerrouillees || carteEl.classList.contains('retournee')) return;

    // Afficher la face avant de la carte
    carteEl.classList.remove('bg-emerald-600');
    carteEl.classList.add('bg-slate-200', 'text-slate-800', 'retournee', 'border-2', 'border-emerald-500');
    carteEl.textContent = carte.nom;

    cartesSelectionnees.push({ element: carteEl, donnees: carte });

    if (cartesSelectionnees.length === 2) {
        verifierPaire();
    }
}

// 5. Comparer les deux cartes sélectionnées
function verifierPaire() {
    cartesVerrouillees = true;
    coups++;
    scoreElement.textContent = coups;

    const [carte1, carte2] = cartesSelectionnees;
    const estIdentique = carte1.donnees.id === carte2.donnees.id;

    if (estIdentique) {
        // Paire trouvée
        pairesTrouvees++;
        cartesSelectionnees = [];
        cartesVerrouillees = false;

        // Afficher l'anecdote si présente
        if (carte1.donnees.anecdote) {
            anecdoteBox.textContent = `💡 ${carte1.donnees.nom} : ${carte1.donnees.anecdote}`;
            anecdoteBox.classList.remove('hidden');
        }

        // Vérifier condition de victoire (8 paires)
        if (pairesTrouvees === 8) {
            terminerPartie();
        }
    } else {
        // Pas une paire : masquer à nouveau après un délai
        setTimeout(() => {
            [carte1, carte2].forEach(c => {
                c.element.classList.remove('bg-slate-200', 'text-slate-800', 'retournee', 'border-2', 'border-emerald-500');
                c.element.classList.add('bg-emerald-600');
                c.element.textContent = '?';
            });

            cartesSelectionnees = [];
            cartesVerrouillees = false;
        }, 1000);
    }
}

// 6. Fin de partie
function terminerPartie() {
    anecdoteBox.textContent = `🎉 Bravo ! Bravo vous avez gagné en ${coups} coups !`;
    anecdoteBox.classList.remove('hidden');
    restartBtn.classList.remove('hidden');
}

// Événement sur le bouton Rejouer
restartBtn.addEventListener('click', chargerDonnees);

// Lancement au démarrage de la page
chargerDonnees();
