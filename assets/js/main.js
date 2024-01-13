const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.querySelector(".pagination")


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li onclick="MyFunction('${pokemon.number}')" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function detailedPokemon(pokemon) {
    return `
                <div class="${pokemon.type} character">
                <div class="number-container">
                    <span class="">#${pokemon.number}</span>
                </div>
                <ol class="detail-type">
                    ${pokemon.types.map((type) => `<li class="types detailed-type">${type}</li>`).join('')}
                </ol>
                <img class="background-pokemon" src="${pokemon.photo}"
                alt="${pokemon.name}">
                </div>
                <div class="about">
                <div class="margin-about-title ">
                 <span class="about-title ${pokemon.type}">About</span>
                </div>
                <div class="about-elements">
                <span>Weigth: ${pokemon.weight}</span>
                <span>Height: ${pokemon.height}</span>
                <span>Attack: ${pokemon.attack}</span>
                <span>Defense: ${pokemon.defense}</span>
                <div class="abilities">
                <span class="abilities-wrap">Abilities:</span>
                <div class="about-abilities">
                ${pokemon.abilities.map((ability) => `<li class="ability about-ability">${ability}</li>`).join('')}
                </div>
                </div>
                <div class="reload-button">
                    <button onClick="window.location.reload()">Return to the list</button>
                </div>
                </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    } else {
        loadPokemonItens(offset, limit)
    }
})

function MyFunction(pokemon) {
    console.log(pokemon)
    var node = document.getElementById("pokemonList");
    loadMoreButton.parentElement.removeChild(loadMoreButton)
    node.parentNode.removeChild(node)
    var tag = document.querySelector("h1")
    let pokeDetailed = pokeApi.getPokemon(pokemon)
    pokeDetailed.then((pokemon) => {
        tag.textContent = pokemon.name
        const newHtml = detailedPokemon(pokemon)
        content.innerHTML += newHtml
    })
}