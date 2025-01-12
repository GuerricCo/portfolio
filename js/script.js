/**text letter by letter */
document.querySelectorAll('.letter-by-letter').forEach(function(element) {
    var text = element.innerText;
    element.innerHTML = '';

    text.split('').forEach(function(letter) {
        var span = document.createElement('span');
        span.innerText = letter;
        element.appendChild(span);
    });
});


// Sélection des sections et initialisation de l'index actuel
const sections = document.querySelectorAll("section");
let currentSectionIndex = 0;
let isScrolling = false; // Pour éviter plusieurs défilements à la fois

// Fonction pour vérifier si le mode responsive est activé
function isResponsive() {
  return window.innerWidth <= 767; // Tu peux ajuster cette valeur selon ton design
}

// Gestionnaire de l'événement de défilement
window.addEventListener("wheel", (event) => {
  if (isResponsive()) return; // Désactiver le défilement par section en mode responsive
  if (isScrolling) return; // Empêche le traitement si un défilement est déjà en cours

  const direction = event.deltaY > 0 ? 1 : -1; // 1 pour descendre, -1 pour monter
  const currentSection = sections[currentSectionIndex];

  // Vérifie si on atteint les limites de la section
  const sectionRect = currentSection.getBoundingClientRect();
  const isAtBottom = direction === 1 && sectionRect.bottom <= window.innerHeight;
  const isAtTop = direction === -1 && sectionRect.top >= 0;

  if ((direction === 1 && isAtBottom) || (direction === -1 && isAtTop)) {
    const nextIndex = currentSectionIndex + direction;

    if (nextIndex >= 0 && nextIndex < sections.length) {
      isScrolling = true;
      currentSectionIndex = nextIndex;
      scrollToSection(currentSectionIndex);
    }
  }
});

// Fonction pour faire défiler jusqu'à une section
function scrollToSection(index) {
  const targetSection = sections[index];
  targetSection.scrollIntoView({ behavior: "smooth" });

  // Réinitialise le verrouillage après le défilement
  setTimeout(() => {
    isScrolling = false;
  }, 100); // Ajustez le délai en fonction de la durée de l'animation
}

// Réinitialise l'index de la section actuelle lors du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  if (isResponsive()) {
    currentSectionIndex = 0; // Reset si nécessaire
  }
});



/****contact ***/
function validateForm() {
    let form = document.getElementById("contact-form");
    let name = form.name.value;
    let email = form.email.value;
    let message = form.message.value;
    let isValid = true;

    if (name === "") {
        showError("name", "Veuillez entrer votre nom");
        isValid = false;
    } else {
        hideError("name");
    }

    if (email === "") {
        showError("email", "Veuillez entrer une adresse email valide");
        isValid = false;
    } else if (!validateEmail(email)) {
        showError("email", "L'adresse email n'est pas valide");
        isValid = false;
    } else {
        hideError("email");
    }

    if (message === "") {
        showError("message", "Veuillez entrer votre message");
        isValid = false;
    } else {
        hideError("message");
    }

    return isValid;
}


function showError(field, message) {
    let fieldGroup = document.querySelector(`#contact-form .form-group.${field}`);
    let errorMessage = fieldGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}


function hideError(field) {
    let fieldGroup = document.querySelector(`#contact-form .form-group.${field}`);
    let errorMessage = fieldGroup.querySelector('.error-message');
    errorMessage.style.display = 'none';
}

function validateEmail(email) {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

