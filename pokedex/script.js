let allPokemon = [];

async function loadPokemonList() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await response.json();
        allPokemon = data.results;
    } catch (error) {
        console.error("Erreur lors du chargement des noms de Pokémon :", error);
    }
}

async function getPokemonImage(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.sprites.front_default;
    } catch (error) {
        console.error("Erreur lors du chargement de l'image :", error);
        return "";
    }
}

async function showSuggestions() {
    const input = document.getElementById("pokemonInput").value.toLowerCase();
    const suggestionsBox = document.getElementById("suggestions");

    suggestionsBox.innerHTML = "";

    if (input.length === 0) {
        suggestionsBox.classList.add("hidden");
        return;
    }

    const filteredPokemon = allPokemon
        .filter(pokemon => pokemon.name.startsWith(input))
        .slice(0, 10);

    for (const pokemon of filteredPokemon) {
        const li = document.createElement("li");
        li.textContent = pokemon.name;

        const img = document.createElement("img");
        img.src = await getPokemonImage(pokemon.url);
        img.alt = pokemon.name;

        li.prepend(img);
        li.onclick = () => {
            document.getElementById("pokemonInput").value = pokemon.name;
            suggestionsBox.classList.add("hidden");
        };

        suggestionsBox.appendChild(li);
    }

    suggestionsBox.classList.remove("hidden");
}

async function fetchPokemon() {
    const input = document.getElementById('pokemonInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Pokémon non trouvé');

        const data = await response.json();

        document.getElementById('pokemonName').textContent = data.name.toUpperCase();
        document.getElementById('pokemonImage').src = data.sprites.front_default;
        document.getElementById('pokemonType').textContent = `Type: ${data.types.map(t => t.type.name).join(', ')}`;
        document.getElementById('pokemonStats').textContent = `Stats: ${data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}`;

        document.getElementById('pokemonData').classList.remove('hidden');
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById("searchButton").addEventListener("click", fetchPokemon);
document.getElementById("pokemonInput").addEventListener("keyup", showSuggestions);


loadPokemonList();