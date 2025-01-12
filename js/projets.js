import { projets_pages } from './data_projets.js';

document.addEventListener("DOMContentLoaded", () => {
    const div_tag_projets = document.getElementById("project-meta");
    const div_image_principal = document.getElementById('div_image_principal');
    const div_content = document.getElementById("project-content");
    const pathSegments = window.location.pathname.split("/");
    const projetslug = pathSegments[pathSegments.length - 1];
    const projets_page = projets_pages.find(a => a.slug === projetslug);

    if (projets_page) {
        document.title = projets_page.title;
        document.getElementById("project-title-heading").innerText = projets_page.title;
        document.getElementById("project-subtitle").innerText = projets_page.subtitle; // Ajout du sous-titre

        // Ajout de l'image principale du projet
        const img_projets = document.createElement("img");
        img_projets.src = projets_page.image;
        img_projets.alt = `${projets_page.title} - Image`;
        div_image_principal.appendChild(img_projets);

        // Injection du contenu dynamique
        div_content.innerHTML = projets_page.content;

        // Ajout des informations de l'auteur et de la date
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

        // Tag dynamique (par exemple : FULL HTML, JS, etc.)
        const tag_projets = document.createElement("p");
        tag_projets.textContent = projets_page.tag;
        tag_projets.className = "tag_cards";
        tag_projets.style.width = "fit-content";
        tag_projets.style.padding = "10px";
        tag_projets.style.borderRadius = "5px";

        // Application de la couleur en fonction du tag
        switch (projets_page.tag) {
            case "FULL HTML":
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
        div_tag_projets.appendChild(tag_projets);

        // Section Contexte
        const div_contexte = document.createElement("section");
        const contexteTitle = document.createElement("h3");
        contexteTitle.textContent = "Contexte";
        const contexteContent = document.createElement("p");
        contexteContent.textContent = projets_page.contexte;
        div_contexte.appendChild(contexteTitle);
        div_contexte.appendChild(contexteContent);
        div_content.appendChild(div_contexte);

        // Section Mission
        const div_mission = document.createElement("section");
        const missionTitle = document.createElement("h3");
        missionTitle.textContent = "Mission";
        const missionContent = document.createElement("p");
        missionContent.textContent = projets_page.mission;
        div_mission.appendChild(missionTitle);
        div_mission.appendChild(missionContent);
        div_content.appendChild(div_mission);

        // Section Résultat avec iframe
        const div_resultat = document.createElement("section");
        const resultatTitle = document.createElement("h3");
        resultatTitle.textContent = "Résultat";
        const iframe = document.createElement("iframe");
        iframe.src = projets_page.iframeSrc;
        iframe.width = "100%";
        iframe.height = "600px";
        div_resultat.appendChild(resultatTitle);
        div_resultat.appendChild(iframe);
        div_content.appendChild(div_resultat);
    } else {
        document.body.innerHTML = "<p>Projet non trouvé.</p>";
    }
});
