// Application Fleurs Roussel.
// Les données viennent de data/donnees.json, produites par le prompt de contenu.
// Règles de code : voir AGENTS.md et les conventions d'intégration de l'agence.

const gridEl = document.getElementById('grid');
const scoreEl = document.getElementById('score');
const anecdoteBoxEl = document.getElementById('anecdote-box');
const restartBtnEl = document.getElementById('restart-btn');

let fleursData = [];
let cartesRetournees = [];
let pairesTrouvees = 0;
let coups = 0;
let verrouillagePlateau = false;

// Charge les données des fleurs depuis le fichier JSON local
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
        const msgErreur = document.createElement('p');
        msgErreur.className = 'col-span-4 text-roussel-rose text-sm font-medium';
        msgErreur.textContent = 'Erreur de chargement des cartes.';
        gridEl.replaceChildren(msgErreur);
    }
}

// Mélange un tableau de façon aléatoire selon l'algorithme de Fisher-Yates
function melanger(tableau) {
    const copie = [...tableau];
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
}

// Prépare la grille de 16 cartes et réinitialise les compteurs de la partie
function initialiserJeu() {
    cartesRetournees = [];
    pairesTrouvees = 0;
    coups = 0;
    verrouillagePlateau = false;

    scoreEl.textContent = coups;
    anecdoteBoxEl.classList.add('hidden');
    anecdoteBoxEl.replaceChildren();
    restartBtnEl.classList.add('hidden');
    gridEl.replaceChildren();

    const deck = melanger([...fleursData, ...fleursData]);

    deck.forEach((fleur, index) => {
        const boutonCarte = document.createElement('button');
        boutonCarte.type = 'button';
        boutonCarte.dataset.id = fleur.id;
        boutonCarte.dataset.nom = fleur.nom;
        boutonCarte.dataset.anecdote = fleur.anecdote || '';
        boutonCarte.dataset.index = index + 1;

        boutonCarte.setAttribute('aria-label', `Carte ${index + 1}, face cachée`);
        boutonCarte.setAttribute('aria-pressed', 'false');

        boutonCarte.className =
            'aspect-square w-full rounded-lg bg-roussel-vert hover:opacity-90 ' +
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-roussel-rose ' +
            'text-white font-bold text-sm flex flex-col items-center justify-center ' +
            'p-1.5 shadow transition duration-200 cursor-pointer select-none';

        const dosCarte = document.createElement('span');
        dosCarte.dataset.role = 'dos';
        dosCarte.textContent = '?';

        const illustration = document.createElement('img');
        illustration.src = `img/fleurs/${fleur.id}.svg`;
        illustration.alt = '';
        illustration.className = 'hidden w-9 h-9 object-contain pointer-events-none';

        const etiquette = document.createElement('span');
        etiquette.dataset.role = 'nom';
        etiquette.textContent = fleur.nom;
        etiquette.className = 'hidden text-[10px] leading-tight font-semibold text-roussel-texte mt-1 truncate max-w-full';

        boutonCarte.append(dosCarte, illustration, etiquette);
        boutonCarte.addEventListener('click', () => retournerCarte(boutonCarte));

        gridEl.appendChild(boutonCarte);
    });
}

// Bascule l'affichage visuel et accessible d'une carte entre face cachée et face visible
function basculerVisuelCarte(carte, estVisible) {
    const dosCarte = carte.querySelector('[data-role="dos"]');
    const illustration = carte.querySelector('img');
    const etiquette = carte.querySelector('[data-role="nom"]');

    if (estVisible) {
        dosCarte.classList.add('hidden');
        illustration.classList.remove('hidden');
        etiquette.classList.remove('hidden');
        carte.classList.remove('bg-roussel-vert', 'hover:opacity-90', 'text-white');
        carte.classList.add('bg-white', 'text-roussel-texte', 'border-2', 'border-roussel-vert');
    } else {
        dosCarte.classList.remove('hidden');
        illustration.classList.add('hidden');
        etiquette.classList.add('hidden');
        carte.classList.remove('bg-white', 'text-roussel-texte', 'border-2', 'border-roussel-vert');
        carte.classList.add('bg-roussel-vert', 'hover:opacity-90', 'text-white');
    }
}

// Retourne une carte au clic ou au clavier et déclenche la vérification si deux sont ouvertes
function retournerCarte(carte) {
    if (verrouillagePlateau) return;
    if (carte.dataset.trouvee === 'true') return;
    if (cartesRetournees.includes(carte)) return;

    const index = carte.dataset.index;
    const nom = carte.dataset.nom;

    basculerVisuelCarte(carte, true);
    carte.setAttribute('aria-label', `Carte ${index}, ${nom}`);
    carte.setAttribute('aria-pressed', 'true');

    cartesRetournees.push(carte);

    if (cartesRetournees.length === 2) {
        coups++;
        scoreEl.textContent = coups;
        verifierPaire();
    }
}

// Compare les deux cartes retournées et valide la paire ou les retourne après une seconde
function verifierPaire() {
    verrouillagePlateau = true;
    const [carte1, carte2] = cartesRetournees;

    if (carte1.dataset.id === carte2.dataset.id) {
        [carte1, carte2].forEach((carte) => {
            carte.dataset.trouvee = 'true';
            carte.disabled = true;
            carte.setAttribute('aria-label', `Carte ${carte.dataset.index}, ${carte.dataset.nom}, paire trouvée`);
            carte.classList.remove('bg-white', 'border-roussel-vert', 'cursor-pointer');
            carte.classList.add('bg-roussel-vert-clair', 'border-roussel-rose', 'opacity-90', 'cursor-default');
        });

        afficherAnecdote(carte1.dataset.nom, carte1.dataset.anecdote);
        pairesTrouvees++;
        cartesRetournees = [];
        verrouillagePlateau = false;

        if (pairesTrouvees === fleursData.length) {
            terminerPartie();
        }
    } else {
        setTimeout(() => {
            [carte1, carte2].forEach((carte) => {
                basculerVisuelCarte(carte, false);
                carte.setAttribute('aria-label', `Carte ${carte.dataset.index}, face cachée`);
                carte.setAttribute('aria-pressed', 'false');
            });

            cartesRetournees = [];
            verrouillagePlateau = false;
        }, 1000);
    }
}

// Affiche l'anecdote botanique de la paire trouvée en utilisant uniquement textContent
function afficherAnecdote(nom, anecdote) {
    anecdoteBoxEl.classList.remove('hidden');

    const titreFleur = document.createElement('strong');
    titreFleur.className = 'text-roussel-vert';
    titreFleur.textContent = `${nom} : `;

    const texteAnecdote = document.createTextNode(anecdote || 'Paire trouvée !');

    anecdoteBoxEl.replaceChildren(titreFleur, texteAnecdote);
}

// Affiche le message de victoire final et place le focus sur le bouton Rejouer
function terminerPartie() {
    anecdoteBoxEl.classList.remove('hidden');

    const bravo = document.createElement('strong');
    bravo.className = 'text-roussel-rose';
    bravo.textContent = 'Bravo ! ';

    const message = document.createTextNode(
        `Vous avez retrouvé les ${fleursData.length} paires en ${coups} coups.`
    );

    anecdoteBoxEl.replaceChildren(bravo, message);
    restartBtnEl.classList.remove('hidden');
    restartBtnEl.focus();
}

restartBtnEl.addEventListener('click', initialiserJeu);

chargerDonnees();
