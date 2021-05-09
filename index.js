import utils from "./modules/utils.js";
import constants from "./modules/constants.js";
import pokemonList from "./modules/pokemon-list.js";

document.addEventListener("DOMContentLoaded", function () {
    utils.getData(constants.ITEMS_URL)
         .then(data => pokemonList.buildList(data.results));
});