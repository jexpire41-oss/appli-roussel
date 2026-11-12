// Application Fleurs Roussel.
// Les données viennent de data/donnees.json, produites par le prompt de contenu.
// Règles de code : voir AGENTS.md et les conventions d'intégration de l'agence.

// Éléments du DOM
const gridEl = document.getElementById('grid');
const scoreEl = document.getElementById('score');
const anecdoteBoxEl = document.getElementById('anecdote-box');
const restartBtnEl = document.getElementById('restart-btn');

// Variables d'état du jeu
let fleursData = [];
let cartesRetournees = [];
let pairesTrouvees = 0;
let coups = 0;
let verrouillagePlateau = false;

// 1. Chargement des données depuis data/donnees.json
async function chargerDonnees() {
    try {
        const reponse = await fetch('data/donnees.json');
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        fleursData = await reponse.json();
        initialiserJeu();
    } catch (erreur) {
        console.error('Impossible de charger les données :', erreur);
        gridEl.innerHTML = '<p class="col-span-4 text-red-600 text-sm">Erreur de chargement des cartes.</p>';
    }
}

// 2. Mélange de Fisher-Yates
function melanger(tableau) {
    const copie = [...tableau];
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
}

// 3. Initialisation / Réinitialisation de la partie
function initialiserJeu() {
    cartesRetournees = [];
    pairesTrouvees = 0;
    coups = 0;
    verrouillagePlateau = false;

    scoreEl.textContent = coups;
    anecdoteBoxEl.classList.add('hidden');
    anecdoteBoxEl.textContent = '';
    restartBtnEl.classList.add('hidden');
    gridEl.innerHTML = '';

    // Création des 8 paires (16 cartes) et mélange
    const deck = melanger([...fleursData, ...fleursData]);

    deck.forEach((fleur, index) => {
        const boutonCarte = document.createElement('button');
        boutonCarte.type = 'button';
        boutonCarte.dataset.id = fleur.id;
        boutonCarte.dataset.nom = fleur.nom;
        boutonCarte.dataset.anecdote = fleur.anecdote || '';
        boutonCarte.dataset.index = index + 1;

        // Accessibilité clavier & lecteurs d'écran
        boutonCarte.setAttribute('aria-label', `Carte ${index + 1}, face cachée`);
        boutonCarte.setAttribute('aria-pressed', 'false');

        // Styles Tailwind (Mobile-first 375px + focus clavier visible)
        boutonCarte.className =
            'aspect-square w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 ' +
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ' +
            'text-white font-semibold text-xs sm:text-sm flex items-center justify-center ' +
            'p-1 shadow transition duration-200 cursor-pointer select-none';

        boutonCarte.textContent = '?';

        // L'événement click sur un <button> gère nativement la souris, Entrée et Espace
        boutonCarte.addEventListener('click', () => retournerCarte(boutonCarte));

        gridEl.appendChild(boutonCarte);
    });
}

// 4. Logique de retournement d'une carte
function retournerCarte(carte) {
    if (verrouillagePlateau) return;
    if (carte.dataset.trouvee === 'true') return;
    if (cartesRetournees.includes(carte)) return;

    // Révéler la carte
    const index = carte.dataset.index;
    const nom = carte.dataset.nom;

    carte.textContent = nom;
    carte.setAttribute('aria-label', `Carte ${index}, ${nom}`);
    carte.setAttribute('aria-pressed', 'true');
    carte.classList.remove('bg-emerald-600', 'hover:bg-emerald-700', 'text-white');
    carte.classList.add('bg-emerald-50', 'text-emerald-900', 'border-2', 'border-emerald-500');

    cartesRetournees.push(carte);

    if (cartesRetournees.length === 2) {
        coups++;
        scoreEl.textContent = coups;
        verifierPaire();
    }
}

// 5. Vérification de correspondance entre les 2 cartes
function verifierPaire() {
    verrouillagePlateau = true;
    const [carte1, carte2] = cartesRetournees;

    if (carte1.dataset.id === carte2.dataset.id) {
        // Paire trouvée
        [carte1, carte2].forEach((carte) => {
            carte.dataset.trouvee = 'true';
            carte.disabled = true;
            carte.setAttribute('aria-label', `Carte ${carte.dataset.index}, ${carte.dataset.nom}, paire trouvée`);
            carte.classList.remove('bg-emerald-50', 'border-emerald-500', 'cursor-pointer');
            carte.classList.add('bg-emerald-200', 'text-emerald-950', 'border-emerald-600', 'opacity-90', 'cursor-default');
        });

        afficherAnecdote(carte1.dataset.nom, carte1.dataset.anecdote);
        pairesTrouvees++;
        cartesRetournees = [];
        verrouillagePlateau = false;

        if (pairesTrouvees === fleursData.length) {
            terminerPartie();
        }
    } else {
        // Pas de correspondance : masquer après 1 seconde
        setTimeout(() => {
            [carte1, carte2].forEach((carte) => {
                carte.textContent = '?';
                carte.setAttribute('aria-label', `Carte ${carte.dataset.index}, face cachée`);
                carte.setAttribute('aria-pressed', 'false');
                carte.classList.remove('bg-emerald-50', 'text-emerald-900', 'border-2', 'border-emerald-500');
                carte.classList.add('bg-emerald-600', 'hover:bg-emerald-700', 'text-white');
            });

            cartesRetournees = [];
            verrouillagePlateau = false;
        }, 1000);
    }
}

// 6. Affichage de l'anecdote botanique
function afficherAnecdote(nom, anecdote) {
    anecdoteBoxEl.classList.remove('hidden');
    if (anecdote) {
        anecdoteBoxEl.innerHTML = `<strong>${nom} :</strong> ${anecdote}`;
    } else {
        anecdoteBoxEl.innerHTML = `<strong>${nom} :</strong> Paire trouvée !`;
    }
}

// 7. Fin de partie
function terminerPartie() {
    anecdoteBoxEl.classList.remove('hidden');
    anecdoteBoxEl.innerHTML = `<strong>Bravo !</strong> Vous avez retrouvé les ${fleursData.length} paires en <strong>${coups} coups</strong>.`;
    restartBtnEl.classList.remove('hidden');
    restartBtnEl.focus();
}

// Écouteur sur le bouton Rejouer
restartBtnEl.addEventListener('click', initialiserJeu);

// Lancement au chargement
chargerDonnees();
