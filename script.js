let sections = document.querySelectorAll('section');
let currentSectionIndex = 0;
let isScrolling = false;
let navLinks = document.querySelectorAll('header nav a');

// Fonction pour mettre à jour les liens actifs
function updateActiveLink() {
    sections.forEach((section, index) => {
        let rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
}

// Fonction pour afficher la section et activer l'animation
function showSection(index) {
    // Vérifie que l'index est dans les limites et qu'un défilement n'est pas déjà en cours
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true;
    currentSectionIndex = index;

    // Défile vers la section cible de manière fluide
    sections[index].scrollIntoView({ behavior: 'smooth' });

    // Ajoute la classe active uniquement à la section en cours
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.add('active'); // Ajoute `.active` à la section courante
        } else {
            section.classList.remove('active'); // Retire `.active` des autres sections
        }
    });

    // Réinitialise `isScrolling` après la fin du défilement
    setTimeout(() => {
        isScrolling = false;
    }, 600); // Ajuste ce délai pour qu'il corresponde à la durée de l'animation de défilement
}

// Gestion du défilement de la molette
let scrollTimeout;
window.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    // Démarre un timer pour éviter les appels successifs
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0) {
            showSection(currentSectionIndex + 1); // Défiler vers le bas
        } else if (event.deltaY < 0) {
            showSection(currentSectionIndex - 1); // Défiler vers le haut
        }
    }, 100); // Ce délai court permet d'ignorer les défilements excessifs
});

// Ajout de la gestion du clic sur les liens du header
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        showSection(index); // Affiche la section correspondante
    });
});

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // Pour définir l'état au chargement

// Initialise en affichant la première section
showSection(0);
