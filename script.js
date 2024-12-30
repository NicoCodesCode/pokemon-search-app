const searchButton = document.getElementById("search-button");
const pokemonDataElements = document.querySelectorAll(".pokemon-data");
const endpoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

async function searchPokemon() {
  let pokemon = document.getElementById("search-input").value;

  if (!parseInt(pokemon)) {
    pokemon = formatName(pokemon);
  }

  const pokemonData = await getPokemonData(pokemon);

  if (pokemonData) {
    displayData(pokemonData);
    displayImage(pokemonData);
  } else {
    alert("Pokémon not found");
  }
}

function formatName(pokemonName) {
  return pokemonName
    .toLowerCase()
    .trim()
    .split(" ")
    .join("-")
    .replace(/[^A-Za-z0-9-]/g, "");
}

async function getPokemonData(pokemonNameOrId) {
  try {
    const response = await fetch(`${endpoint}/${pokemonNameOrId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return 0;
  }
}

function displayData(pokemonData) {
  const { name, id, weight, height, types, stats } = pokemonData;

  const data = {
    "pokemon-name": name.toUpperCase(),
    "pokemon-id": `#${id}`,
    weight,
    height,
    types,
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    "special-attack": stats[3].base_stat,
    "special-defense": stats[4].base_stat,
    speed: stats[5].base_stat,
  };

  pokemonDataElements.forEach((el) => {
    if (el.id === "types") {
      el.innerHTML = "";
      data[el.id].forEach((type) => {
        el.innerHTML += `<p>${type.type.name.toUpperCase()}</p>`;
      });
    } else {
      el.innerHTML = `<span>${el.id
        .toUpperCase()
        .split("-")
        .join(" ")}: </span>${data[el.id]}`;
    }
  });

  document
    .querySelectorAll(".hidden")
    .forEach((el) => el.classList.remove("hidden"));
}

function displayImage(pokemonData) {
  const { sprites } = pokemonData;

  if (document.getElementById("sprite")) {
    document.getElementById("sprite").remove();
  }

  const pokemonImage = document.createElement("img");

  pokemonImage.id = "sprite";
  pokemonImage.src = sprites.front_default;
  pokemonImage.classList.add("pokemon-image");

  document.body.appendChild(pokemonImage);
}

searchButton.addEventListener("click", searchPokemon);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon();
  }
});
