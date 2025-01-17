class Monstre {
    constructor(img, famille, element, nom, type, effetRenfor, effetNocif, lead) {
        this.img = img;
        this.famille = famille;
        this.element = element;
        this.nom = nom;
        this.type = type;
        this.effetRenfor = effetRenfor;
        this.effetNocif = effetNocif;
        this.lead = lead;
    }
}

const tableMonstre = [
    new Monstre("img/Verad_SW.avif", "dragon", "eau", "verad", "defense", "aucun", "geler", "augmente les pv"),
    new Monstre("img/Leo_SW.avif", "dragon", "feu", "ignir", "attaque", "deg constants, geler, aucun", "deg constants, geler", "augmente l'atk"),
    new Monstre("img/Laika_SW.avif", "dragon", "eau", "pegase", "defense", "aucun", "geler", "augmente les pv"),
];

document.addEventListener("DOMContentLoaded", function () {
    random();

    const tagInput = document.getElementById("tagInput");
    const buttonValidate = document.getElementById("btnValidate");
    const buttonStart = document.getElementById("btnStart");
    const suggestionsContainer = document.getElementById("suggestions");
    tagInput.addEventListener("input", function () {
        const query = tagInput.value.toLowerCase();
        if (query) {
            const filteredMonsters = tableMonstre.filter(monstre =>
                monstre.nom.toLowerCase().includes(query)
            );

            displaySuggestions(filteredMonsters);
        } else {
            suggestionsContainer.style.display = "none";
        }
    });

    function displaySuggestions(monsters) {
        suggestionsContainer.innerHTML = "";
        if (monsters.length > 0) {
            suggestionsContainer.style.display = "block";
            monsters.forEach(monstre => {
                const suggestionItem = document.createElement("div");
                suggestionItem.classList.add("suggestion-item");
                suggestionItem.innerHTML = `
                    <img src="${monstre.img}" alt="${monstre.nom}">
                    <span>${monstre.nom}</span>
                `;
                suggestionItem.addEventListener("click", function () {
                    tagInput.value = monstre.nom; // Remplir l'input avec le nom du monstre
                    suggestionsContainer.style.display = "none"; // Cacher les suggestions
                    recupSaisie(); // Récupérer la saisie du nom du monstre
                    creationTableau(); // Créer le tableau avec le monstre trouvé
                    verifierEtColorerLigne(monstreSelectionne); // Vérifier et colorer la ligne
                    validate();
                    emptyInput();

                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        } else {
            suggestionsContainer.style.display = "none";
        }
    }

    function emptyInput() {
        tagInput.value = "";  // Vide l'input
        suggestionsContainer.style.display = "none"; // Cache les suggestions
    }
    

    buttonValidate.addEventListener("click", function () {
        recupSaisie();
        creationTableau();
        verifierEtColorerLigne(monstreSelectionne);
        validate();
        emptyInput();
    });

    buttonStart.addEventListener("click", function () {
        resetTableau();
        random();
        buttonStart.style.display = "none";
        buttonValidate.style.display = "inline-block";
    });

    function random() {
        let nbrMonstre = Math.floor(Math.random() * tableMonstre.length);
        monstreSelectionne = tableMonstre[nbrMonstre];
        console.log(monstreSelectionne);
    }

    function recupSaisie() {
        nameWritten = tagInput.value;
        console.log(nameWritten);
    }

    function validate() {
        if (nameWritten.toLowerCase() === monstreSelectionne.nom.toLowerCase()) {
            console.log("Bravo !");
            buttonStart.style.display = "inline-block";
            buttonValidate.style.display = "none";
        } else {
            console.log("Tu as faux !");
            buttonStart.style.display = "none";
            buttonValidate.style.display = "inline-block";
        }
    }

    function creationTableau() {
        const monstreTrouve = tableMonstre.find(
            (monstre) => monstre.nom.toLowerCase() === nameWritten.toLowerCase()
        );

        if (monstreTrouve) {
            const monstreInfoBody = document.getElementById("monstreInfoBody");

            const existe = Array.from(monstreInfoBody.getElementsByClassName("monstreInfoRow")).some((row) => {
                return row.querySelector(".monstreInfoCell.background").style.backgroundImage.includes(monstreTrouve.img);
            });

            if (existe) {
                console.log("Monstre déjà présent !");
                return;
            }

            const nouvelleRow = document.createElement("div");
            nouvelleRow.className = "monstreInfoRow";

            const proprieteMonstre = [
                { key: "img", isImage: true },
                { key: "famille", isImage: false },
                { key: "element", isImage: false },
                { key: "type", isImage: false },
                { key: "effetRenfor", isImage: false },
                { key: "effetNocif", isImage: false },
                { key: "lead", isImage: false },
            ];

            proprieteMonstre.forEach((prop) => {
                const cell = document.createElement("div");
                cell.className = "monstreInfoCell";

                if (prop.isImage) {
                    cell.classList.add("background");
                    cell.style.backgroundImage = `url(${monstreTrouve[prop.key]})`;

                    const overlay = document.createElement("div");
                    overlay.className = "overlay";
                    overlay.textContent = monstreTrouve.nom;
                    cell.appendChild(overlay);
                } else {
                    cell.textContent = monstreTrouve[prop.key];
                }

                nouvelleRow.appendChild(cell);
            });

            monstreInfoBody.appendChild(nouvelleRow);
        } else {
            console.log("Le nom du monstre n'existe pas.");
        }
    }

    function verifierEtColorerLigne(monstreCherche) {
        const lignesMonstre = document.getElementsByClassName("monstreInfoRow");
    
        Array.from(lignesMonstre).forEach((ligne) => {
            const cellules = ligne.getElementsByClassName("monstreInfoCell");
    
            const proprieteMonstre = [
                monstreCherche.img,
                monstreCherche.famille,
                monstreCherche.element,
                monstreCherche.type,
                monstreCherche.effetRenfor,
                monstreCherche.effetNocif,
                monstreCherche.lead,
            ];
    
            Array.from(cellules).forEach((cell, index) => {
                if (index === 0) {
                    // Comparer le background-image pour l'image
                    const backgroundImage = cell.style.backgroundImage;
                    if (backgroundImage.includes(monstreCherche.img)) {
                        cell.style.backgroundColor = "green";
                    } else {
                        cell.style.backgroundColor = "red";
                    }
                } else if (index === 4 || index === 5) {
                    // Gestion des colonnes effetRenfor et effetNocif (avec correspondance partielle ou totale)
                    const effetsCherches = proprieteMonstre[index].toLowerCase().split(",").map(effet => effet.trim());
                    const effetsCell = cell.textContent.toLowerCase().split(",").map(effet => effet.trim());
    
                    const effetsCommuns = effetsCherches.filter(effet => effetsCell.includes(effet));
    
                    if (effetsCommuns.length === effetsCherches.length && effetsCherches.length === effetsCell.length) {
                        cell.style.backgroundColor = "green"; // Correspondance totale
                    } else if (effetsCommuns.length > 0) {
                        cell.style.backgroundColor = "orange"; // Correspondance partielle
                    } else {
                        cell.style.backgroundColor = "red"; // Pas de correspondance
                    }
                } else {
                    // Comparer les autres propriétés textuelles
                    if (cell.textContent.trim().toLowerCase() === proprieteMonstre[index].toLowerCase()) {
                        cell.style.backgroundColor = "green";
                    } else {
                        cell.style.backgroundColor = "red";
                    }
                }
            });
        });
    }
    
    
    function resetTableau() {
        const monstreInfoBody = document.getElementById("monstreInfoBody");
        monstreInfoBody.innerHTML = "";
    }
});
