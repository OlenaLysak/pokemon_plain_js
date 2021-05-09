import utils from "./utils.js";
import constants from "./constants.js";

const pokemonList = {
    buildList: buildList,
}

function buildList(pokemonData) {
    const listElement = document.createElement("div");
    listElement.classList.add("list");

    pokemonData.map(item => {
        let cardElement = document.createElement("div");
        cardElement.classList.add("item");
        listElement.appendChild(cardElement);

        let imgSection = document.createElement("div");
        imgSection.classList.add("imageSection");
        cardElement.appendChild(imgSection);

        let pokemonImg = document.createElement("img");
        pokemonImg.classList.add("image");
        utils.getData(item.url)
            .then(data => {
                pokemonImg.src = constants.POKEMON_IMG_URL + data.id + ".png";
                cardElement.addEventListener('click', function () {
                    createSelectedItem(data);
                }, false);
            })

        imgSection.appendChild(pokemonImg);

        let nameElement = document.createElement("div");
        nameElement.innerHTML = utils.capitalizeFirstLetter(item.name);
        cardElement.appendChild(nameElement);
    })

    const listContainer = document.getElementById("listContainer");
    listContainer.appendChild(listElement)
}

function createSelectedItem(data) {
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

export default pokemonList;