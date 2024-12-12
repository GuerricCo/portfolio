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


/**defilement */
let sections = document.querySelectorAll('section');
let currentSectionIndex = 0;
let isScrolling = false;
let navLinks = document.querySelectorAll('header nav ul li a');

function updateActiveLink() {
    let index = -1;

    sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            index = i;
        }
    });

    navLinks.forEach((link, i) => {
        link.classList.toggle("active", i === index);
    });
}

function showSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true;
    currentSectionIndex = index;

    sections[index].scrollIntoView({ behavior: 'smooth' });

    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    setTimeout(() => {
        isScrolling = false;
    }, 600);
}

let scrollTimeout;
window.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0) {
            showSection(currentSectionIndex + 1);
        } else if (event.deltaY < 0) {
            showSection(currentSectionIndex - 1);
        }
    }, 100);
});


window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

showSection(0);



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

