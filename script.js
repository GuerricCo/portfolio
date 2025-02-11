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
let isScrolling = false;

// Fonction pour vérifier si le mode responsive est activé
function isResponsive() {
return window.innerWidth <= 767;
}

if (window.innerWidth >= 768) {
// Initialisation des sections à opacité 0 sauf la première
sections.forEach((section, index) => {
section.style.opacity = index === 0 ? "1" : "0";
section.style.transition = "opacity 0.5s ease";
});

// Fonction pour faire défiler jusqu'à une section avec effet de fondu
function scrollToSection(index) {
const currentSection = sections[currentSectionIndex];
const targetSection = sections[index];

// Réduit progressivement l'opacité de la section actuelle
currentSection.style.opacity = "0";

setTimeout(() => {
  targetSection.scrollIntoView({ behavior: "instant" });

  setTimeout(() => {
    targetSection.style.opacity = "1";
    currentSectionIndex = index;
    isScrolling = false;
  }, 500);
}, 500);
}





// Sélection des sections et initialisation de l'index actuel


// Fonction pour vérifier si le mode responsive est activé
function isResponsive() {
return window.innerWidth <= 767;
}

// Initialisation des sections à opacité 0 sauf la première
sections.forEach((section, index) => {
section.style.opacity = index === 0 ? "1" : "0";
section.style.transition = "opacity 0.5s ease";
});

// Fonction pour faire défiler jusqu'à une section avec effet de fondu
function scrollToSection(index) {
const currentSection = sections[currentSectionIndex];
const targetSection = sections[index];

// Réduit progressivement l'opacité de la section actuelle
currentSection.style.opacity = "0";

setTimeout(() => {
  targetSection.scrollIntoView({ behavior: "instant" });

  setTimeout(() => {
    targetSection.style.opacity = "1";
    currentSectionIndex = index;
    isScrolling = false;
  }, 500);
}, 500);
}

// Gestionnaire de l'événement de défilement
window.addEventListener("wheel", (event) => {
  if (isResponsive() || isScrolling) return;

  const currentSection = sections[currentSectionIndex];
  const sectionRect = currentSection.getBoundingClientRect();

  const atTop = sectionRect.top >= 0 && sectionRect.top <= window.innerHeight * 0.2;
  const atBottom = sectionRect.bottom <= window.innerHeight && sectionRect.bottom >= window.innerHeight * 0.8;

  // Si on est à la section supérieure et que l'utilisateur scroll vers le haut, ou à la section inférieure et qu'il scroll vers le bas
  if (atTop && event.deltaY < 0 && currentSectionIndex > 0) {
    event.preventDefault();
    scrollToSection(currentSectionIndex - 1);
    isScrolling = true;
  } else if (atBottom && event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
    event.preventDefault();
    scrollToSection(currentSectionIndex + 1);
    isScrolling = true;
  } else if (atBottom && currentSectionIndex === sections.length - 1) {
    currentSection.style.opacity = "1";
  }
}, { passive: false });
}

// Réinitialise l'index de la section actuelle lors du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
if (isResponsive()) {
  currentSectionIndex = 0;
}
});

// Fonction pour afficher la section ciblée au clic sur le logo ou les liens du menu
function handleNavigation(event) {
event.preventDefault();
const targetId = event.target.getAttribute("href").substring(1);
const targetSection = document.getElementById(targetId);

if (targetSection) {
  sections.forEach((section) => (section.style.opacity = "0"));
  targetSection.style.opacity = "1";
  targetSection.scrollIntoView({ behavior: "smooth" });
  currentSectionIndex = Array.from(sections).indexOf(targetSection);
}
}

// Gestion des clics sur le logo et les liens du menu
document.querySelectorAll("a[href^='#']").forEach((link) => {
link.addEventListener("click", handleNavigation);
});

// Rendre la première section visible au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
sections[0].style.opacity = "1";
currentSectionIndex = 0;
});

// Réinitialise l'index de la section actuelle lors du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
if (isResponsive()) {
  currentSectionIndex = 0;
}
});

// Fonction pour afficher la section ciblée au clic sur le logo ou les liens du menu
function handleNavigation(event) {
event.preventDefault();
const targetId = event.target.getAttribute("href").substring(1); 
const targetSection = document.getElementById(targetId);

if (targetSection) {
  sections.forEach((section) => (section.style.opacity = "0"));
  targetSection.style.opacity = "1";
  targetSection.scrollIntoView({ behavior: "smooth" });
  currentSectionIndex = Array.from(sections).indexOf(targetSection);
}
}

// Gestion des clics sur le logo et les liens du menu
document.querySelectorAll("a[href^='#']").forEach((link) => {
link.addEventListener("click", handleNavigation);
});

// Rendre la première section visible au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
sections[0].style.opacity = "1";
currentSectionIndex = 0;
})





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



