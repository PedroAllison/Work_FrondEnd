const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type');
const pokemonType2 = document.querySelector('.pokemon__type2');
const pokemonAbility = document.querySelector('.pokemon__ability');
const pokemonStatsHP = document.querySelector('.pokemon__hp');
const pokemonStatsAttack = document.querySelector('.pokemon__attack');
const pokemonStatsDefense = document.querySelector('.pokemon__defense');
const pokemonStatsSpecialA = document.querySelector('.pokemon__specialA');
const pokemonStatsSpecialD = document.querySelector('.pokemon__specialD');
const pokemonStatsSpeed = document.querySelector('.pokemon__speed');


const pokemonFlavorText = document.getElementById('pokemonFlavorText');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.button_shiny'); 

let isShiny = false;
let searchPokemon = 25;
let currentPokemonData = null; 

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

async function fetchFlavorText() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/2/');
      const data = await response.json();
       // Procura pelo texto em português na lista de flavor text entries
    const flavorText = data.flavor_text_entries.find(entry => entry.language.name === 'pt');

    // Exibe o flavor text no elemento HTML, caso seja encontrado
    if (flavorText) {
      pokemonFlavorText.innerHTML = flavorText.flavor_text;
    } else {
      pokemonFlavorText.innerHTML = 'Texto em português não encontrado.';
    }
  } catch (error) {
    console.error('Erro ao buscar o flavor text:', error);
    pokemonFlavorText.innerHTML = 'Erro ao buscar o flavor text.';
  }
}



const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    currentPokemonData = data; 

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
         // Verifica se o Pokémon tem um ou dois tipos
         pokemonType.innerHTML = data['types'][0]['type']['name'];
         if (data['types'].length > 1) {
             pokemonType2.innerHTML = data['types'][1]['type']['name'];
             pokemonType2.style.display = 'inline'; // Exibe o segundo tipo se disponível
         } else {
             pokemonType2.innerHTML = ''; // Limpa o conteúdo do segundo tipo
             pokemonType2.style.display = 'none'; // Oculta o segundo tipo se não existir
         }
         //IMAGE
        if(data.id < 921){
            pokemonImage.src = data['sprites']['other']['showdown']['front_default']
        } else{
            pokemonImage.src = data['sprites']['front_default'];
        }
       
        
        //IMAGEM ABAIXO É DA 2D
        //['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        //STATS
        pokemonAbility.innerHTML = data['abilities']['0']['ability']['name']
        pokemonStatsHP.innerHTML = data['stats']['0']['base_stat']
        pokemonStatsAttack.innerHTML = data['stats']['1']['base_stat']
        pokemonStatsDefense.innerHTML = data['stats']['2']['base_stat']
        pokemonStatsSpecialA.innerHTML = data['stats']['3']['base_stat']
        pokemonStatsSpecialD.innerHTML = data['stats']['4']['base_stat']
        pokemonStatsSpeed.innerHTML = data['stats']['5']['base_stat']
        pokemonSpecie.innerHTML = data2['flavor_text']

        input.value = '';
        searchPokemon = data.id;
        isShiny = false; 
    } else {
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttonShiny.addEventListener('click', () => {
    if (currentPokemonData) {
        if (isShiny) {
            // Volta para a imagem normal
            pokemonImage.src = currentPokemonData['sprites']['other']['showdown']['front_default']
        } else {
            // Mostra a imagem shiny
            pokemonImage.src = currentPokemonData['sprites']['other']['showdown']['front_shiny']
        }
        isShiny = !isShiny;
    }
});

function capitalizeText(element) {
    const text = element.textContent;
    if (text) {
        element.textContent = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
}

// Seleciona os elementos de tipo de Pokémon
const typeElement1 = document.querySelector('.pokemon__type')
const typeElement2 = document.querySelector('.pokemon__type2')
const ability = document.querySelector('.pokemon__ability')


if (typeElement1) capitalizeText(typeElement1)
if (typeElement2) capitalizeText(typeElement2)
if (ability) capitalizeText(ability)


const observer = new MutationObserver(() => {
    capitalizeText(typeElement1)
    capitalizeText(typeElement2)
    capitalizeText(ability)
});

observer.observe(typeElement1, { childList: true });
observer.observe(typeElement2, { childList: true });
observer.observe(ability, { childList: true });

fetchFlavorText();
renderPokemon(searchPokemon);
