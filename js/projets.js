import { projets_pages } from './data_projets.js';

document.addEventListener("DOMContentLoaded", () => {
    const divTagProjets = document.getElementById("project-meta");
    const divContent = document.getElementById("project-content");

    // Extraction du slug depuis l'URL
    const pathSegments = window.location.pathname.split("/");
    const projetSlug = pathSegments[pathSegments.length - 1].replace(".html", ""); // Supprime l'extension si elle existe
    const projetPage = projets_pages.find(project => project.slug === projetSlug);

    if (projetPage) {
        // Mise à jour du titre de la page
        document.title = projetPage.title;
        document.getElementById("project-title-heading").innerText = projetPage.title;

        // Injection du contenu du projet
        divContent.innerHTML = projetPage.content;

        // Affichage du code CSS si présent
        if (projetPage.code) {
            const codeElement = document.getElementById("project-code");
            if (codeElement) {
                codeElement.textContent = projetPage.code; // Utilisation de textContent pour éviter les failles XSS
            }
        }

        // Gestion des tags
        if (projetPage.tag) {
            const tags = Array.isArray(projetPage.tag) ? projetPage.tag : [projetPage.tag];
            divTagProjets.innerHTML = ''; // Vide le contenu précédent pour éviter les doublons
            tags.forEach(tag => {
                const tagElement = document.createElement("p");
                tagElement.textContent = tag;
                tagElement.className = "tag_cards";
                tagElement.style.width = "fit-content";
                tagElement.style.padding = "10px";
                tagElement.style.borderRadius = "5px";

                // Couleur en fonction du tag
                switch (tag) {
                    case "HTML":
                        tagElement.style.backgroundColor = "purple";
                        tagElement.style.color = "white";
                        break;
                    case "JS":
                        tagElement.style.backgroundColor = "green";
                        tagElement.style.color = "white";
                        break;
                    case "PHP":
                        tagElement.style.backgroundColor = "#f0e10e";
                        tagElement.style.color = "black";
                        break;
                    default:
                        tagElement.style.backgroundColor = "gray";
                        tagElement.style.color = "white";
                        break;
                }
                divTagProjets.appendChild(tagElement);
            });
        }

        // Auteur et date
        document.getElementById("project-author").innerText = projetPage.author;
        document.getElementById("project-date").innerText = new Date(projetPage.date).toLocaleDateString();

        // Meta description pour le SEO
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute("content", projetPage.metaDescription);
        } else {
            const newMetaDescription = document.createElement("meta");
            newMetaDescription.setAttribute("name", "description");
            newMetaDescription.setAttribute("content", projetPage.metaDescription);
            document.head.appendChild(newMetaDescription);
        }

        // Gestionnaire d'événements pour l'activation de l'iframe
        const activateIframeButton = document.getElementById("activate-iframe");
        if (activateIframeButton) {
            activateIframeButton.addEventListener("click", () => {
                const iframeWrapper = document.querySelector(".iframe-container");
                iframeWrapper.classList.add("active"); // Ajoute une classe pour activer l'iframe
            });
        }
    } else {
        // Message si le projet n'est pas trouvé
        document.body.innerHTML = "<p>Projet non trouvé.</p>";
    }
});
