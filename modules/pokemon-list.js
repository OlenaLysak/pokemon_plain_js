import utils from "./utils.js";
import constants from "./constants.js";
import PokemonItem from "./pokemon-item.js";
import SpecialPokemonItem from "./special-pokemon-item.js";

class PokemonList {
    constructor() {
    }

    buildList(pokemonData) {
        const listElement = document.createElement("div");
        listElement.classList.add("list");

        pokemonData.map((item, index) => {
            if (index % 2 === 0) {
                const pokemonItem = new PokemonItem(item.url, item.name, "item");
                    pokemonItem.create()
                        .then((item) => {
                            listElement.appendChild(item)
                        });
            } else {
                const pokemonItem = new SpecialPokemonItem(item.url, item.name, "specialItem");
                    pokemonItem.create()
                        .then((item) => {
                            listElement.appendChild(item)
                        });
            }

        })

        const listContainer = document.getElementById("listContainer");
        listContainer.appendChild(listElement)
    }

    createSelectedItem(data) {
        const selectedSection = document.getElementById("selectedSection");
        selectedSection.innerHTML = '';

        let selectedItem = document.createElement("div");
        selectedItem.classList.add("selectedItem");
        selectedSection.appendChild(selectedItem);

        let imgSection = document.createElement("div");
        imgSection.classList.add("imageSelectedItem");
        selectedItem.appendChild(imgSection);

        let pokemonImg = document.createElement("img");
        pokemonImg.classList.add("selectedImage");
        pokemonImg.src = constants.POKEMON_IMG_URL + data.id + ".png";
        imgSection.appendChild(pokemonImg);

        let nameElement = document.createElement("div");
        nameElement.innerHTML = utils.capitalizeFirstLetter(data.name);
        nameElement.classList.add("selectedTitle");
        selectedItem.appendChild(nameElement);

        let listOfAbilities = document.createElement("table");
        listOfAbilities.classList.add("tableOfAbilities");
        selectedItem.appendChild(listOfAbilities);
        listOfAbilities.setAttribute("border", 1);

        let listBody = document.createElement("tbody");
        listOfAbilities.appendChild(listBody);

        data.stats.forEach( item => {
            let abilityItem = document.createElement("tr");
            abilityItem.innerHTML = `<td class="ability">${utils.capitalizeFirstLetter(item.stat.name)}</td>
                                 <td class="abilityValue">${item.base_stat}</td>`;
            listBody.appendChild(abilityItem);
        })

        let removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn");
        removeBtn.innerHTML = "Hide";
        selectedItem.appendChild(removeBtn);
        removeBtn.addEventListener('click', function () {
            selectedSection.innerHTML = '';
        }, false);
    }
}

export default PokemonList;