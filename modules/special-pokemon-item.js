import PokemonItem from "./pokemon-item.js";
import utils from "./utils.js";

class SpecialPokemonItem extends PokemonItem {
    constructor(url, name, className) {
        super(url, name, className)
    }

    create () {
        return super.create().then((item) => {
            let btnContainer = document.createElement("div");
            btnContainer.classList.add("buttonsContainer")

            let powers = this.data.types;
            powers.forEach(item => {
                let btn = document.createElement("button");
                btn.innerHTML = utils.capitalizeFirstLetter(item.type.name);

                btnContainer.appendChild(btn);
            })

            item.appendChild(btnContainer);

            return item;
        });
    }
}

export default SpecialPokemonItem;