export const projets_pages = [
    {
        "title": "La Martiniere Monplaisir",
        "author": "Guerric COCHELIN",
        "date": "2024-12-03",
        "content": 
"<h2>Projet de partiel B1</h2>\n" +
"<div class='section-line'></div>\n" +
"<section>\n" +
"<h3>Contexte</h3>\n" +
"<p>Lors de ma première année à My-Digital-School, dans le cadre du premier partiel sur une semaine, nous avons reçu pour mission de choisir un lycée et de travailler sur plusieurs aspects de sa communication. Cela incluait la refonte complète de sa charte graphique, l’élaboration d’une nouvelle stratégie de communication, ainsi que la réalisation d’un site web moderne. Nous avions la liberté de choisir entre une implémentation via WordPress ou un développement entièrement codé à la main.</p>\n" +
"<p>Dans notre groupe, j’occupais le rôle de développeur. À partir d’une maquette conçue par un collègue, j’ai pris en charge la réalisation technique du site web en HTML et CSS.</p>\n" +
"</section>\n" +
"<div class='section-line'></div>\n" +
"<section>\n" +
"<h3>Ce que j'ai appris</h3>\n" +
"<div class='text-and-code'>\n" +
"<p>Dans ce projet, j'ai appris à utiliser la propriété CSS <strong>z-index</strong> en combinaison avec <strong>position: absolute;</strong> pour gérer la superposition d'éléments. Par exemple, dans le header du site, un logo devait être positionné en plein milieu tout en restant au-dessus d'autres éléments comme des bandes de couleur ou des ronds décoratifs. Grâce à <code>position: absolute;</code>, j'ai pu placer le logo exactement où je voulais sur la page, tandis que <code>z-index</code> m'a permis de contrôler l'ordre d'affichage des éléments, en veillant à ce que le logo soit toujours visible, même si d'autres éléments se superposaient sous lui.</p>\n" +
"<pre><code class='language-css'>\n" + 
"#menu-image img {\n" +
"    width: 230px;\n" +
"    height: 176px;\n" +
"    border-radius: 20px;\n" +
"    object-fit: cover;\n" +
"    position: absolute;\n" +
"    z-index: 999;\n" +
"    top: 30px;\n" +
"    left: 50%;\n" +
"    transform: translateX(-50%);\n" +
"}</code></pre>\n" + 
"</div>\n" +
"</section>\n" +
"<div class='section-line'></div>\n" +
"<section>\n" +
"<h3>Résultat</h3>\n" +
"<p>En activant le contenu, vous pouvez voir le rendu final. Il y a trois pages accessibles : la page Lycée, Formation et Vie scolaire.</p>\n" +
"<div class='iframe-container'>\n" +
"    <iframe id='result-iframe' src='../la-martiniere-monplaisir/page1.html' title='Site XYZ'></iframe>\n" +
"    <button id='activate-iframe' class='iframe-button'>Activer le contenu</button>\n" +
"</div>\n" +
"</section>\n",
        "slug": "la-martiniere-monplaisir",
        "metaDescription": ""
    },
    {
        "title": "Summonersdle",
        "author": "Guerric COCHELIN",
        "date": "2024-12-03",
        "tag": ["HTML", "JS"],
        "content": 
        "<h2>Jeu de quiz Summoners wars</h2>\n" +
"<div class='section-line'></div>\n" +
"<section>\n" +
"<h3>Contexte</h3>\n" +
"<p>Le projet *Summonersdle* est un jeu de quiz inspiré du jeu mobile *Summoners War*, créé avec un ami. L'objectif du jeu est de deviner un personnage en utilisant des indices. À chaque tentative, le jeu fournit un retour sur les points communs entre le personnage proposé et celui à deviner, permettant au joueur d'affiner sa recherche.</p>\n" +
"<p>Ce projet met en œuvre la programmation orientée objet (POO) pour gérer la logique du jeu, rendant le processus de développement plus structuré et modulaire.</p>\n" +
"</section>\n" +
"<div class='section-line'></div>\n" +
"<section>\n" +
"<h3>Ce que j'ai appris</h3>\n" +
"<div class='text-and-code'>\n" +
"<p>Cela m'a permis de comprendre comment utiliser la méthode filter() pour filtrer des éléments d'un tableau en fonction de critères donnés, ici, rechercher un monstre dont le nom contient une chaîne de caractères saisie par l'utilisateur.</p>\n" +
"<pre><code class='language-css'>\n" + 
"const filteredMonsters = tableMonstre.filter(monstre =>\n" +
"    monstre.nom.toLowerCase().includes(query)\n" +
");\n" + 
"</code></pre>\n"+
"</div>\n" +
"</section>\n" +
"<div class='section-line'></div>\n" +
"<section>\n" +
"<h3>Résultat</h3>\n" +
"<p>En activant le contenu, vous pouvez voir le rendu final. Commencez à taper un nom et des personnages vous seront proposés. Bon jeu !</p>\n" +
        "<div class='iframe-container'>\n" +
        "    <iframe id='result-iframe' src='../summonersdle/summoners.html' title='Site XYZ'></iframe>\n" +
        "    <button id='activate-iframe' class='iframe-button'>Activer le contenu</button>\n" +
        "</div>\n" +
        "</section>\n",
        "slug": "summonersdle",
        "metaDescription": ""
    },
    {
        "title": "Galact-X",
        "author": "Guerric COCHELIN",
        "date": "2024-12-03",
        "tag": ["PHP"],
        "content": "<h2>Projet Galact-X</h2>\n" +
        "<div class='section-line'></div>\n" +
        "<section>\n" +
        "<h3>Contexte</h3>\n" +
        "<p>Lors de mon second partiel en B1, j'ai été impliqué dans un projet simulant une agence spatiale dont le but est d'envoyer des humains habiter sur d'autres planètes. En tant que membre de l'équipe de développement, ma mission était de concevoir et de développer le site web de l'agence, avec un focus particulier sur la création d'un formulaire en PHP.</p>\n" +
        "</section>\n" +
        "<div class='section-line'></div>\n" +
        "<section>\n" +
        "<h3>Ce que j'ai appris</h3>\n" +
        "<div class='text-and-code'>\n" +
        "<p>Ce projet m'a permis d'acquérir des compétences essentielles en gestion de bases de données, en particulier en PHP et MySQL. J'ai appris à créer une base de données, à y insérer des données et à les récupérer pour les afficher sur des pages dynamiques. En développant une page dédiée à l'affichage des informations stockées dans la base, j'ai approfondi ma compréhension des requêtes SQL et de l'interaction entre le front-end et le back-end.</p>\n" +
        "<p>J'ai également appris à créer un formulaire d'inscription et de connexion relié à la base de données, en veillant à assurer la sécurité des informations sensibles. Cela m'a permis de mieux comprendre les principes fondamentaux de la gestion des utilisateurs sur le web, notamment la validation des données et l'authentification.</p>\n" +
        "</div>\n" +
        "</section>\n" +
        "<div class='section-line'></div>\n" +
        "<section>\n" +
        "<h3>Résultat</h3>\n" +
        "<p>En lançant la vidéo, vous pouvez voir le formulaire opérationnel en action, permettant aux utilisateurs de s'inscrire ou de se connecter à notre plateforme. Vous pourrez observer comment les données sont envoyées à la base de données et comment les utilisateurs sont authentifiés de manière sécurisée</p>\n" +
        "    <video id='result-video' controls>\n" +
        "        <source src='../mp4/galact-x.mp4' type='video/mp4'>\n" +
        "        Votre navigateur ne prend pas en charge la balise vidéo.\n" +
        "    </video>\n" +
        "</section>\n",
        "slug": "galact-x",
        "metaDescription": ""
    }
    
];

