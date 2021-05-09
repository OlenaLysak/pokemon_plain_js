import utils from "./utils.js";
import constants from "./constants.js";
import PokemonList from "./pokemon-list.js";

class PokemonItem {
    constructor(url, name, className) {
        this.url = url;
        this.name = name;
        this.data = null;
        this.className = className;
    }

    create() {
        let cardElement = document.createElement("div");
        cardElement.classList.add(this.className);
        // listElement.appendChild(cardElement);

        let imgSection = document.createElement("div");
        imgSection.classList.add("imageSection");
        cardElement.appendChild(imgSection);

        let pokemonImg = document.createElement("img");
        pokemonImg.classList.add("image");
        return utils.getData(this.url)
            .then(data => {
                this.data = data;
                pokemonImg.src = constants.POKEMON_IMG_URL + data.id + ".png";
                cardElement.addEventListener('click', () => {
                    PokemonList.prototype.createSelectedItem(data);
                });
            })
            .then(() => {
                imgSection.appendChild(pokemonImg);
                let nameElement = document.createElement("div");
                nameElement.innerHTML = utils.capitalizeFirstLetter(this.name);
                cardElement.appendChild(nameElement);

                return cardElement;
            })
            .catch((err) => utils.errorHandler(err));


    }
}

export default PokemonItem;