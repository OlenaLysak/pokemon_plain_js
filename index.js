import utils from "./modules/utils.js";
import constants from "./modules/constants.js";
import PokemonList from "./modules/pokemon-list.js";

document.addEventListener("DOMContentLoaded", function () {
    utils.getData(constants.ITEMS_URL)
         .then(data => {
             const pokemonList = new PokemonList();
             pokemonList.buildList(data.results);
         })
         .catch((err) => utils.errorHandler(err));
});