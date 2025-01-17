import { projets_pages } from './data_projets.js';

function loadProject(slug) {
    const project = projets_pages.find((proj) => proj.slug === slug);

    if (project) {
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-content').innerHTML = project.content;

        // Vérifie si l'élément pour afficher le code CSS existe
        const codeElement = document.getElementById('project-code');
        if (codeElement) {
            codeElement.textContent = project.code; // Utilise textContent pour éviter d'exécuter du HTML/CSS
        }

    } else {
        console.error('Projet introuvable');
    }
}


// Charger un projet avec le slug "la-martiniere-monplaisir"
loadProject('la-martiniere-monplaisir');

document.addEventListener("DOMContentLoaded", () => {
    const div_tag_projets = document.getElementById("project-meta");
    const div_content = document.getElementById("project-content");
    const pathSegments = window.location.pathname.split("/");
    const projetslug = pathSegments[pathSegments.length - 1];
    const projets_page = projets_pages.find(a => a.slug === projetslug);

    if (projets_page) {
        // Mise à jour du titre et des métadonnées
        document.title = projets_page.title;
        document.getElementById("project-title-heading").innerText = projets_page.title;

        // Injection directe du contenu HTML depuis data_projets.js
        div_content.innerHTML = projets_page.content;

        // Gestionnaire d'événements pour le bouton activer l'iframe
        const activateIframeButton = document.getElementById("activate-iframe");
        if (activateIframeButton) {
            activateIframeButton.addEventListener("click", () => {
                const iframeWrapper = document.querySelector(".iframe-container");
                iframeWrapper.classList.add("active"); // Ajoute la classe active pour activer l'iframe
            });
        }

        // Auteur et date
        document.getElementById("project-author").innerText = projets_page.author;
        document.getElementById("project-date").innerText = new Date(projets_page.date).toLocaleDateString();

        // Mise à jour de la meta description pour le SEO
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute("content", projets_page.metaDescription);
        } else {
            const newMetaDescription = document.createElement("meta");
            newMetaDescription.setAttribute("name", "description");
            newMetaDescription.setAttribute("content", projets_page.metaDescription);
            document.head.appendChild(newMetaDescription);
        }

        // Ajout du tag dynamique
        const tag_projets = document.createElement("p");
        tag_projets.textContent = projets_page.tag;
        tag_projets.className = "tag_cards";
        tag_projets.style.width = "fit-content";
        tag_projets.style.padding = "10px";
        tag_projets.style.borderRadius = "5px";

        // Application de la couleur en fonction du tag
        switch (projets_page.tag) {
            case "HTML":
                tag_projets.style.backgroundColor = "purple";
                tag_projets.style.color = "white";
                break;
            case "JS":
                tag_projets.style.backgroundColor = "green";
                tag_projets.style.color = "white";
                break;
            case "PHP":
                tag_projets.style.backgroundColor = "#f0e10e";
                tag_projets.style.color = "black";
                break;
        }

        // Ajout du tag à un endroit spécifique et séparé
        if (div_tag_projets) {
            div_tag_projets.innerHTML = ''; // Vider le contenu de div_tag_projets pour éviter le mélange
            div_tag_projets.appendChild(tag_projets); // Ajouter le tag au bon endroit
        }
    } else {
        document.body.innerHTML = "<p>Projet non trouvé.</p>";
    }
});
