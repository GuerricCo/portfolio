const projets = [
    {
        "description": "Proposition de refonte du site web du lycée La Martiniere Monplaisir",
        "url": "projets/la-martiniere-monplaisir",
        "src": "img/la_martiniere.png",
        "alt": "La Martiniere Monplaisir",
        "title": "La Martinière Monplaisir",
        "title2": "Projet de Partiel B1",
        "tags": ["HTML"],
    },
    {
        "description": "Developpement d'un jeu sur summoners wars",
        "url": "projets/summonersdle",
        "src": "img/summonersdle.png",
        "alt": "Summonersdle",
        "title": "Summonersdle",
        "title2": "Projet personnel",
        "tags": ["JS"],
    },
    {
        "description": "Formulaire d'inscription php",
        "url": "projets/galact-x",
        "src": "img/galact-x.png",
        "alt": "Galact-X",
        "title": "Galact-X",
        "title2": "Projet de Partiel B1",
        "tags": ["PHP"],
    },
    {
        "description": "Utilisation d'une API",
        "url": "projets/pokedex",
        "src": "img/pokedex.png",
        "alt": "Pokedex",
        "title": "Pokedex",
        "title2": "Decouverte API",
        "tags": ["JS"],
    },
    {
        "description": "Création de facture",
        "url": "projets/invoice",
        "src": "img/invoice.png",
        "alt": "Invoice",
        "title": "Invoice",
        "title2": "Decouverte Next.js",
        "tags": ["Next-Js"],
    },
    {
        "description": "Site Carthage",
        "url": "projets/carthage",
        "src": "img/carthage.png",
        "alt": "Carthage",
        "title": "Carthage",
        "title2": "Site client",
        "tags": ["React"],
    }
]

const projets_actu = [
    {
        "description": "Refonte du site web d'un lycée",
        "url": "projets/la-martiniere-monplaisir",
        "src": "img/la_martiniere.png",
        "alt": "La Martiniere Monplaisir",
        "title": "La Martinière Monplaisir",
        "title2": "Projet de Partiel B1",
        "tags": ["HTML"],
    },
    {
        "description": "Developpement d'un jeu sur summoners wars",
        "url": "projets/summonersdle",
        "src": "img/summonersdle.png",
        "alt": "Summonersdle",
        "title": "Summonersdle",
        "title2": "Projet personnel",
        "tags": ["JS"],
    },
    {
        "description": "Formulaire d'inscription php",
        "url": "projets/galact-x",
        "src": "img/galact-x.png",
        "alt": "Galact-X",
        "title": "Galact-X",
        "title2": "Projet de Partiel B1",
        "tags": ["PHP"],
    }
]

document.addEventListener("DOMContentLoaded", () => {

    const filter_cards = document.getElementById("filter_cards");
    const filter_cards_project = document.getElementById("filter_cards_project");
    const tags_input = document.querySelectorAll(".input_filter_tags");
    const all_input = document.getElementById("input_filter_all");
    let checked = new Set();

    if (filter_cards) {
        create_cards(projets, filter_cards);
    } else if (filter_cards_project) {
        create_cards(projets_actu, filter_cards_project);
    }

    function create_cards(projets, filter_cards) {
        projets.forEach(project => {
            let cards = document.createElement("li");
            cards.className = "cards";

            let link = document.createElement("a");
            link.href = project.url;
            cards.appendChild(link);

            let img_cards = document.createElement("img");
            img_cards.src = project.src;
            img_cards.alt = project.alt;
            if (project.forme === "portrait") {
                img_cards.style.aspectRatio = "9/16";
                img_cards.style.objectFit = "contain";
                img_cards.style.height = "300px";
            }
            if (project.forme === "paysage") {
                img_cards.style.objectFit = "fill";
            }
            link.appendChild(img_cards);

            let infos_cards = document.createElement("div");
            infos_cards.className = "infos_cards";
            link.appendChild(infos_cards);

            let content = document.createElement("div");
            content.className = "content";
            infos_cards.appendChild(content);

            let title_cards = document.createElement("h3");
            title_cards.textContent = project.title;
            content.appendChild(title_cards);

            let title2_cards = document.createElement("h4");
            title2_cards.textContent = project.title2;
            title2_cards.style.marginBottom = 0;
            content.appendChild(title2_cards);

            let desc_cards = document.createElement("p");
            desc_cards.textContent = project.description;
            content.appendChild(desc_cards);

            let infos_tags = document.createElement("div");
            infos_tags.className = "infos_tags";
            infos_cards.appendChild(infos_tags);

            project.tags.forEach(tag => {
                let tag_cards = document.createElement("p");
                tag_cards.textContent = tag;
                tag_cards.className = "tags_cards";
                tag_cards.style.padding = "10px";
                tag_cards.style.borderRadius = "5px";

                switch (tag) {
                    case "HTML":
                        tag_cards.style.backgroundColor = "purple";
                        tag_cards.style.color = "white";
                        break;
                    case "JS":
                        tag_cards.style.backgroundColor = "green";
                        tag_cards.style.color = "white";
                        break;
                    case "PHP":
                        tag_cards.style.backgroundColor = "#f0e10e";
                        tag_cards.style.color = "black";
                        break;
                    case "Next-Js":
                        tag_cards.style.backgroundColor = "#ff5733";
                        tag_cards.style.color = "white";
                        break;
                    case "React":
                        tag_cards.style.backgroundColor = "#3371ff";
                        tag_cards.style.color = "white";
                        break;
                    case "WordPress":
                        tag_cards.style.backgroundColor = "#33ffaf";
                        tag_cards.style.color = "white";
                        break;
                }

                infos_tags.appendChild(tag_cards);
            });

            filter_cards.appendChild(cards)
        });
        set_input();
    };

    if (all_input) {
        all_input.addEventListener("click", () => {
            document.querySelectorAll(".cards").forEach(card => {
                card.style.display = "block";
            });
            tags_input.forEach(tag_input => {
                let custom_button = tag_input.closest(".custom-button");
                custom_button.classList.remove("inactive_input");
                tag_input.checked = true
                checked.add(tag_input.value)
            });
        });
    }

    function set_input() {
        tags_input.forEach(tag_input => {
            tag_input.checked = true
            checked.add(tag_input.value)

            tag_input.addEventListener("change", () => {
                let custom_button = tag_input.closest(".custom-button");

                if (tag_input.checked) {
                    custom_button.classList.remove("inactive_input");
                    checked.add(tag_input.value);
                } else {
                    custom_button.classList.add("inactive_input");
                    checked.delete(tag_input.value);
                }
                console.log(checked);
                check_tags();
            });
        });
    };

    function check_tags() {

        document.querySelectorAll(".cards").forEach(card => {
            let tags_of_card = Array.from(card.querySelectorAll(".tags_cards")).map(tag => tag.textContent);
            let shouldDisplay = tags_of_card.every(tag => checked.has(tag));

            if (shouldDisplay) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

});