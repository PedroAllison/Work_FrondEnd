const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 493;


const fetchPokemon = async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data;
    }
   
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    pokemonImage.innerHTML = ''

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']

        input.value = ''
        searchPokemon = data.id
    }else{
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = ''
        pokemonImage.style.display = 'none'
    }

    

}

form.addEventListener('submit',(event) =>{
  event.preventDefault();

  renderPokemon(input.value.toLowerCase())
  
})

buttonPrev.addEventListener('click',(event) =>{
  if(searchPokemon > 1){
    searchPokemon -=1
    renderPokemon(searchPokemon)
  }
    
})

buttonNext.addEventListener('click',(event) =>{
  
    searchPokemon +=1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)

