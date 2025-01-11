import { projets_pages } from './data_projets.js';

document.addEventListener("DOMContentLoaded", () => {
    const div_tag_projets = document.getElementById("article-meta");
    const pathSegments = window.location.pathname.split("/");
    const projetslug = pathSegments[pathSegments.length - 1];
    const projets_page = projets_pages.find(a => a.slug === projetslug);
    const div_image_principal = document.getElementById('div_image_principal');  // Utilisation de querySelector pour obtenir l'élément <main>

    if (projets_page) {
        document.title = projets_page.title;
        document.getElementById("article-title-heading").innerText = projets_page.title;

        const img_projets = document.createElement("img");
        img_projets.src = projets_page.image;
        div_image_principal.appendChild(img_projets);

        document.getElementById("article-content").innerHTML = projets_page.content;

        document.getElementById("article-author").innerText = projets_page.author;
        document.getElementById("article-date").innerText = new Date(projets_page.date).toLocaleDateString();
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute("content", projets_page.metaDescription);
        } else {
            const newMetaDescription = document.createElement("meta");
            newMetaDescription.setAttribute("name", "description");
            newMetaDescription.setAttribute("content", projets_page.metaDescription);
            document.head.appendChild(newMetaDescription);
        }

        const tag_projets = document.createElement("p");
        tag_projets.textContent = projets_page.tag;
        console.log(projets_page.tag)
        tag_projets.className = "tag_cards";
        tag_projets.style.width = "fit-content";
        tag_projets.style.padding = "10px";
        tag_projets.style.borderRadius = "5px";

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
    } else {
        document.body.innerHTML = "<p>Article not found.</p>";
    }
});