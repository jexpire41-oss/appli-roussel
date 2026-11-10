# Journal de bord - Projet Jeu de Mémoire

## Test d'efficacité du fichier AGENTS.md (Étape 4)
* **Question posée à l'IA :** "Écris-moi une fonction pour mélanger les cartes et gère l'accessibilité."

### 1. Résultat SANS le fichier AGENTS.md :
/**
* Mélange un tableau de manière aléatoire (Algorithme de Fisher-Yates)
* @param {Array} array - Le tableau à mélanger
* @returns {Array} Le tableau mélangé
  */
  function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
  }

/**
* Crée un élément de carte accessible et interactif
* @param {Object} fleur - Données de la fleur (id, nom, anecdote)
* @returns {HTMLButtonElement} L'élément bouton de la carte
  */
  function createCardElement(fleur) {
  // Utilisation d'un <button> pour une accessibilité native optimale
  const card = document.createElement('button');

  // Attributs d'accessibilité
  card.setAttribute('type', 'button');
  card.setAttribute('aria-label', `Carte cachée, ${fleur.nom}`);
  card.setAttribute('aria-pressed', 'false');
  card.dataset.id = fleur.id;
  card.dataset.name = fleur.nom;

  // Classes Tailwind pour le style et le focus au clavier
  card.className = "card aspect-square bg-slate-800 rounded-lg flex items-center justify-center p-2 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 shadow-md";

  // Contenu interne (Image de la fleur, cachée au départ)
  const img = document.createElement('img');
  img.src = `img/fleurs/${fleur.id}.svg`;
  img.alt = `Illustration de la fleur : ${fleur.nom}`;
  img.className = "w-4/5 h-4/5 object-contain hidden pointer-events-none";

  card.appendChild(img);

  // Gestion des événements (Clic souris + Clavier Entrée/Espace)
  card.addEventListener('click', () => handleCardClick(card));
  card.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
  e.preventDefault(); // Empêche le comportement par défaut de l'espace (scroll)
  handleCardClick(card);
  }
  });

  return card;
  }

// Exemple de gestionnaire de clic/action
function handleCardClick(cardElement) {
// Empêcher de cliquer sur une carte déjà retournée ou validée
if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
return;
}

    // Retourner la carte visuellement
    cardElement.classList.remove('bg-slate-800');
    cardElement.classList.add('bg-slate-200', 'flipped');
    cardElement.setAttribute('aria-pressed', 'true');
    cardElement.setAttribute('aria-label', `Carte de ${cardElement.dataset.name}`);
    
    const img = cardElement.querySelector('img');
    img.classList.remove('hidden');

    // Ici, vous appellerez ensuite votre logique de vérification de paire...
}



