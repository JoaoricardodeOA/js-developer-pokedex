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
                <span class="number">#${pokemon.number}</span>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
                <span>About</span>
                <span>${pokemon.type}</span>
                <span>${pokemon.weight}</span>
                <span>${pokemon.height}</span>
                <span>${pokemon.attack}</span>
                <span>${pokemon.defense}</span>
                <ol class="abilities">
                    ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                </ol>
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