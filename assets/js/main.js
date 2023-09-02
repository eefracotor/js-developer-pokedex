
const pokemonsList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMoreButton')
const contentPokeList = document.getElementById('contentPokeList')
const cardPokemon = document.getElementById('cardPokemon')
const btnBack = document.getElementById('btn-back')

const maxRecords = 386
const limit = 12
let offset = 0;

cardPokemon.style.display = 'none'

function backtoIni () {
    cardPokemon.style.display = 'none'
    cardPokemon.innerHTML =''
    contentPokeList.style.display = 'block'
    console.log("back....")
}



function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <button id="detailsPokemon${pokemon.number}" type=button class="detailsPokemon" onClick='loadCardPokemon(${pokemon.number},"${pokemon.name}","${pokemon.type}","${pokemon.types}","${pokemon.photo}","${pokemon.ph1}","${pokemon.ph2}","${pokemon.ph3}","${pokemon}")'>
                <div class="title">
                    <span class="name">${pokemon.name}</span>
                    <div class="starNumber">
                        <span class="number">#${pokemon.number}</span>
                    </div>
                </div>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                    
                </div>

            </button>
        </li>
    `
}



function loadCardPokemon(numb, name, type, types, photo, ph1, ph2, ph3, pokemon) {
   
    const typesArray = types.split(',');

    contentPokeList.style.display = 'none'
    cardPokemon.style.display = 'block'

    cardPokemon.innerHTML += `
    <button type="button" id="btn-back" class="btnBack" onClick='backtoIni()'>
            <img src="./assets/IMG/back.svg" alt="back">
    </button>
    <section class="cardPk ${type}">
                    
                <section class="imgTop">
                    <img class="imgPrincipal" src="${photo}" alt="${name}">
                    <div class="othersImg">
                        <img class="imgExtras" src="${ph1}" alt="${name}">
                        <img class="imgExtras" src="${ph2}" alt="${name}">
                        <img class="imgExtras" src="${ph3}" alt="${name}">
                    </div>
                    
                </section>
                <section class="cardDetail">

                        <div class="nameTitle">
                            <div class="starNumber ${type}">
                                <span class="number">#${numb}</span>
                            </div>
                            <span class="name">${name}</span>
                        </div>

                        <ol class="types">
                            ${typesArray.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </section>

            </section>
    `
}

function showCardPokemon () {

}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml=  pokemonList.map(convertPokemonToLi).join('')
        pokemonsList.innerHTML += newHtml
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