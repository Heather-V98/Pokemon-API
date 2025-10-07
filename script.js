const pokemonListEl = document.getElementById('pokemon-list');
const pokemonNameEl = document.getElementById('pokemon-name');
const pokemonImageEl = document.getElementById('pokemon-image');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let allPokemon = [];
let currentIndex = 0;

// Fetch all Pokémon (limit to 200)
async function fetchPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
  const data = await response.json();
  allPokemon = data.results;

  // Display the list of names
  allPokemon.forEach((pokemon, index) => {
    const li = document.createElement('li');
    li.textContent = pokemon.name;
    li.addEventListener('click', () => showPokemonDetails(pokemon.name, index));
    pokemonListEl.appendChild(li);
  });

  // Show the first Pokémon
  showPokemonDetails(allPokemon[0].name, 0);
}

// Fetch and display one Pokémon’s details
async function showPokemonDetails(pokemonName, index) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();

  pokemonNameEl.textContent = data.name.toUpperCase();
  pokemonImageEl.src = data.sprites.front_default || '';
  currentIndex = index;
}

// Handle navigation buttons
nextBtn.addEventListener('click', () => {
  if (currentIndex < allPokemon.length - 1) {
    currentIndex++;
    showPokemonDetails(allPokemon[currentIndex].name, currentIndex);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    showPokemonDetails(allPokemon[currentIndex].name, currentIndex);
  }
});

// Initialize
fetchPokemonList();
