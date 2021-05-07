(function () {
    const ITEMS_URL = "https://pokeapi.co/api/v2/pokemon/?limit=12";

    //api
    async function getData(url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    document.addEventListener("DOMContentLoaded", function(){
        getData(ITEMS_URL).then(data => buildList(data.results));
    });

    function buildList(pokemonData) {
        const listElement = document.createElement("div");
        listElement.classList.add("list");

        pokemonData.map( item => {
            let cardElement = document.createElement("div");
            cardElement.classList.add("item");
            listElement.appendChild(cardElement);

            let imgSection = document.createElement("div");
            imgSection.classList.add("imageSection");
            cardElement.appendChild(imgSection);

            let pokemonImg = document.createElement("img");
            pokemonImg.classList.add("image");
            getData(item.url)
            .then(data => {
                pokemonImg.src = "https://pokeres.bastionbot.org/images/pokemon/" + data.id + ".png";
            })

             imgSection.appendChild(pokemonImg);

        })

        const listContainer = document.getElementById("listContainer");
        listContainer.appendChild(listElement)
    }
})();