const contenedorPokemones = document.getElementById("lista-pokemon");
const pokemonDetalle = document.getElementById("pokemon-detalle");
const btnFavoritos = document.getElementById("btn-mostar-fav");
const paginacion = document.getElementById("paginacion");
let pokemones = [];
let mostrarFavoritos = false;
let paginaActual = 1;
const pokemonesPorPagina = 10;

document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar() {
    pokemones = await fetchPokemones();
    renderizarPokemones(); 

    paginacion.addEventListener('page-change', (e) => {
        paginaActual = e.detail.page;
        renderizarPokemones();
    });

    btnFavoritos.addEventListener("click", alternarLista);

    document.addEventListener('pokemon-seleccionado', async (e) => {
        const pokemon = await fetchPokemonDetalles(e.detail.pokemonId);
        pokemonDetalle.cargar(pokemon);
    });   

    document.addEventListener('favoritos-actualizados', () => {
        if (mostrarFavoritos) renderizarPokemones();
    });
}

function alternarLista() {
    mostrarFavoritos = !mostrarFavoritos;
    btnFavoritos.textContent = mostrarFavoritos 
        ? 'Mostrar todos' 
        : 'Mostrar favoritos ❤️';
    paginaActual = 1;
    renderizarPokemones();
}

async function fetchPokemones(){
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await respuesta.json(); 
    return data.results.map((pokemon, index) => ({
        id: index + 1,
        nombre: pokemon.name,
        foto: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        url: pokemon.url
    }))
}
async function fetchPokemonDetalles(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

    return {
        id: data.id,
        name: data.name,
        sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default,
            front_shiny: data.sprites.front_shiny
        },
        stats: data.stats,
        base_experience: data.base_experience,
        height: data.height,
        types: data.types
    }
}
function renderizarPokemones(){
    contenedorPokemones.innerHTML = "";
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    let pokemonesPorMostrar = mostrarFavoritos 
        ? pokemones.filter(p => favoritos.includes(p.id))
        : pokemones;
    
    // Paginacion
    const startIndex = (paginaActual - 1) * pokemonesPorPagina;
    const endIndex = startIndex + pokemonesPorPagina;
    const pokemonesPaginados = pokemonesPorMostrar.slice(startIndex, endIndex);

    for(pokemon of pokemonesPaginados){
        const elementoPokemon = document.createElement("pokemon-elemento");
        elementoPokemon.cargar(pokemon);
        contenedorPokemones.appendChild(elementoPokemon);
    }

    const totalPaginas = Math.ceil(pokemonesPorMostrar.length / pokemonesPorPagina);
    paginacion.paginacion = {
        paginaActual,
        totalPaginas
    };
}