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
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  function checkSections() {
      const triggerBottom = window.innerHeight * 0.75;

      sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top;

          if (sectionTop < triggerBottom) {
              section.classList.add("show");
          }
      });
  }

  window.addEventListener("scroll", checkSections);
  checkSections();
});

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".menu-burger");
  const nav = document.querySelector("nav");

  burger.addEventListener("click", () => {
      nav.classList.toggle("active");
  });
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



