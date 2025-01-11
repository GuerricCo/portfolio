const projets = [
    {
        "description": "Projet réalisé lors d'une semaine de partiel à My-Digital-School",
        "url": "projets/site-ecole",
        "src": "/img/earthsurface.jpg",
        "alt": "earthsurface",
        "title": "Site collège",
        "title2": "",
        "tags": ["FULL HTML"],
    }
]

const projets_actu = [
    {
        "description": "L'html a toujours fasciné l'humanité. Alors que les missions lunaires et martiennes ont fait naître des rêves d'aventure interplanétaire...",
        "url": "projets/site-ecole",
        "src": "/img/earthsurface.jpg",
        "alt": "earthsurface",
        "title": "Voyage entre la Terre et la planète b2seomds",
        "title2": "",
        "tags": ["FULL HTML"],
    }
]

document.addEventListener("DOMContentLoaded", () => {

    const filter_cards = document.getElementById("filter_cards");
    const filter_cards_actu = document.getElementById("filter_cards_actu");
    const tags_input = document.querySelectorAll(".input_filter_tags");
    const all_input = document.getElementById("input_filter_all");
    let checked = new Set();

    if (filter_cards) {
        create_cards(projets, filter_cards);
    } else if (filter_cards_actu) {
        create_cards(projets_actu, filter_cards_actu);
    }

    function create_cards(projets, filter_cards) {
        projets.forEach(article => {
            let cards = document.createElement("li");
            cards.className = "cards";

            let link = document.createElement("a");
            link.href = article.url;
            cards.appendChild(link);

            let img_cards = document.createElement("img");
            img_cards.src = article.src;
            img_cards.alt = article.alt;
            if (article.forme === "portrait") {
                img_cards.style.aspectRatio = "9/16";
                img_cards.style.objectFit = "contain";
                img_cards.style.height = "300px";
            }
            if (article.forme === "paysage") {
                img_cards.style.objectFit = "fill";
            }
            link.appendChild(img_cards);

            let infos_cards = document.createElement("div");
            infos_cards.className = "infos_cards";
            link.appendChild(infos_cards);

            let content = document.createElement("div");
            content.className = "content";
            infos_cards.appendChild(content);

            let title_cards = document.createElement("h2");
            title_cards.textContent = article.title;
            content.appendChild(title_cards);

            let title2_cards = document.createElement("h4");
            title2_cards.textContent = article.title2;
            title2_cards.style.marginBottom = 0;
            content.appendChild(title2_cards);

            let desc_cards = document.createElement("p");
            desc_cards.textContent = article.description;
            content.appendChild(desc_cards);

            let infos_tags = document.createElement("div");
            infos_tags.className = "infos_tags";
            infos_cards.appendChild(infos_tags);

            article.tags.forEach(tag => {
                let tag_cards = document.createElement("p");
                tag_cards.textContent = tag;
                tag_cards.className = "tags_cards";
                tag_cards.style.padding = "10px";
                tag_cards.style.borderRadius = "5px";

                switch (tag) {
                    case "FULL HTML":
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