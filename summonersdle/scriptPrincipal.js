class Monstre {
    constructor(famille, element, nom, type, effetRenfor, effetNocif, lead) {
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


    new Monstre("Anges jumeaux", "feu", "Karuel et Lanoah", "support", "augmente ATQ, immunité", "baisse def", "speed"),
    new Monstre("Anges jumeaux", "vent", "Sadiel et Zeryah", "support", "immunité", "baisse def", "speed"),
    new Monstre("Anges jumeaux", "lumière", "Miruel et Graciah", "support", "augmente ATQ, augmente DEF", "baisse ATK", "atk"),
    new Monstre("Anges jumeaux", "ténèbre", "Jaduel et Aepiah", "support", "immunité", "baisse def", "DEF"),

];

document.addEventListener("DOMContentLoaded", function () {
    random();

    /***recup du html */
    const tagInput = document.getElementById("tagInput");
    const buttonValidate = document.getElementById("btnValidate");
    const buttonStart = document.getElementById("btnStart")

    /** button */
    buttonValidate.addEventListener("click", function () {
        recupSaisie();
        creationTableau(); // Ajouter les informations du monstre au tableau
        verifierEtColorerLigne(monstreSelectionne); // Vérifier et colorer les cellules par rapport à monstreSelectionne
        validate();
    });

    buttonStart.addEventListener("click", function () {
        resetTableau(); // Réinitialiser le tableau avant de commencer
        random();
        buttonStart.style.display = 'none';
        buttonValidate.style.display = 'inline-block';
    })

    /***function **/

    function random() {
        let nbrMonstre = Math.floor(Math.random() * tableMonstre.length);
        monstreSelectionne = tableMonstre[nbrMonstre];
        console.log(monstreSelectionne);
        console.log(monstreSelectionne.nom)
    }

    function recupSaisie() {
        nameWritten = tagInput.value;
        console.log(nameWritten);
        console.log()
    }

    function validate() {
        if (nameWritten.toLowerCase() === monstreSelectionne.nom.toLowerCase()) {
            console.log("bravo");
            buttonStart.style.display = 'inline-block';
            buttonValidate.style.display = 'none';
        } else {
            console.log("tu as faux");
            buttonStart.style.display = 'none';
            buttonValidate.style.display = 'inline-block';
        }
    }

    function creationTableau() {
        // Chercher le monstre correspondant dans le tableau
        const monstreTrouve = tableMonstre.find(monstre => monstre.nom.toLowerCase() === nameWritten.toLowerCase());

        if (monstreTrouve) {
            console.log("Monstre trouvé !");

            // Récupérer le corps du conteneur de monstres
            const monstreInfoBody = document.getElementById("monstreInfoBody");

            // Vérifier si le monstre est déjà présent dans le tableau
            const cellulesExistantes = monstreInfoBody.getElementsByClassName("monstreInfoCell");
            for (let i = 0; i < cellulesExistantes.length; i += 7) { // 7 car il y a 7 cellules par ligne
                if (cellulesExistantes[i].textContent.toLowerCase() === monstreTrouve.nom.toLowerCase()) {
                    console.log("Monstre déjà présent !");
                    return; // Sortir de la fonction si le monstre est déjà présent
                }
            }

            // Créer une nouvelle ligne pour ce monstre
            const nouvelleRow = document.createElement("div");
            nouvelleRow.className = "monstreInfoRow"; // Ajouter la classe pour le style

            // Créer les cellules et les remplir avec les informations du monstre
            const cellNom = document.createElement("div");
            const cellFamille = document.createElement("div");
            const cellElement = document.createElement("div");
            const cellType = document.createElement("div");
            const cellEffetRenfor = document.createElement("div");
            const cellEffetNocif = document.createElement("div");
            const cellLead = document.createElement("div");

            cellNom.textContent = monstreTrouve.nom;
            cellFamille.textContent = monstreTrouve.famille;
            cellElement.textContent = monstreTrouve.element;
            cellType.textContent = monstreTrouve.type;
            cellEffetRenfor.textContent = monstreTrouve.effetRenfor;
            cellEffetNocif.textContent = monstreTrouve.effetNocif;
            cellLead.textContent = monstreTrouve.lead;

            // Ajout de classe pour cell
            cellNom.className = "monstreInfoCell";
            cellFamille.className = "monstreInfoCell";
            cellElement.className = "monstreInfoCell";
            cellType.className = "monstreInfoCell";
            cellEffetRenfor.className = "monstreInfoCell";
            cellEffetNocif.className = "monstreInfoCell";
            cellLead.className = "monstreInfoCell";

            // Ajouter les cellules à la nouvelle ligne
            nouvelleRow.appendChild(cellNom);
            nouvelleRow.appendChild(cellFamille);
            nouvelleRow.appendChild(cellElement);
            nouvelleRow.appendChild(cellType);
            nouvelleRow.appendChild(cellEffetRenfor);
            nouvelleRow.appendChild(cellEffetNocif);
            nouvelleRow.appendChild(cellLead);

            // Ajouter la nouvelle ligne au corps du conteneur
            monstreInfoBody.appendChild(nouvelleRow);
        } else {
            console.log("Le nom du monstre n'existe pas.");
        }
    }

    function verifierEtColorerLigne(monstreCherche) {
        const lignesMonstre = document.getElementsByClassName("monstreInfoRow");

        for (let i = 0; i < lignesMonstre.length; i++) {
            const cellules = lignesMonstre[i].getElementsByClassName("monstreInfoCell");

            // Comparer les informations de chaque cellule avec les propriétés du monstre sélectionné
            // Nom
            cellules[0].style.backgroundColor = (cellules[0].textContent.toLowerCase() === monstreCherche.nom.toLowerCase()) ? "green" : "red";

            // Famille
            cellules[1].style.backgroundColor = (cellules[1].textContent.toLowerCase() === monstreCherche.famille.toLowerCase()) ? "green" : "red";

            // Élément
            cellules[2].style.backgroundColor = (cellules[2].textContent.toLowerCase() === monstreCherche.element.toLowerCase()) ? "green" : "red";

            // Type
            cellules[3].style.backgroundColor = (cellules[3].textContent.toLowerCase() === monstreCherche.type.toLowerCase()) ? "green" : "red";

            // Effet Renfor - comparer les effets individuellement
            const effetsRenforCherche = monstreCherche.effetRenfor.toLowerCase().split(", ").map(effet => effet.trim());
            const effetsRenforPropose = cellules[4].textContent.toLowerCase().split(", ").map(effet => effet.trim());

            const effetsRenforCommuns = effetsRenforCherche.filter(effet => effetsRenforPropose.includes(effet));

            if (effetsRenforCommuns.length === effetsRenforCherche.length && effetsRenforCherche.length === effetsRenforPropose.length) {
                cellules[4].style.backgroundColor = "green"; // Correspondance exacte
            } else if (effetsRenforCommuns.length > 0) {
                cellules[4].style.backgroundColor = "orange"; // Correspondance partielle (certains effets sont bons)
            } else {
                cellules[4].style.backgroundColor = "red"; // Aucun effet ne correspond
            }

            // Effet Nocif - même logique que pour effetRenfor
            const effetsNocifCherche = monstreCherche.effetNocif ? monstreCherche.effetNocif.toLowerCase().split(", ").map(effet => effet.trim()) : [];
            const effetsNocifPropose = cellules[5].textContent ? cellules[5].textContent.toLowerCase().split(", ").map(effet => effet.trim()) : [];

            const effetsNocifCommuns = effetsNocifCherche.filter(effet => effetsNocifPropose.includes(effet));

            if (effetsNocifCommuns.length === effetsNocifCherche.length && effetsNocifCherche.length === effetsNocifPropose.length) {
                cellules[5].style.backgroundColor = "green"; // Correspondance exacte
            } else if (effetsNocifCommuns.length > 0) {
                cellules[5].style.backgroundColor = "orange"; // Correspondance partielle
            } else {
                cellules[5].style.backgroundColor = "red"; // Aucun effet ne correspond
            }

            // Lead (s'il y a une comparaison pour cette propriété)
            cellules[6].style.backgroundColor = (cellules[6].textContent.toLowerCase() === monstreCherche.lead?.toLowerCase()) ? "green" : "red";
        }
    }





    // Fonction pour réinitialiser le tableau
    function resetTableau() {
        const monstreInfoBody = document.getElementById("monstreInfoBody");
        // Vider le corps du tableau
        monstreInfoBody.innerHTML = ""; // Cela supprime toutes les lignes
    }


})