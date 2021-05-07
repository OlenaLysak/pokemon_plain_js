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
                cardElement.addEventListener('click', function(){
                    createSelectedItem(data);
                }, false);
            })

             imgSection.appendChild(pokemonImg);

            let nameElement = document.createElement("div");
            nameElement.innerHTML = capitalizeFirstLetter(item.name);
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
        pokemonImg.src = "https://pokeres.bastionbot.org/images/pokemon/" + data.id + ".png";
        imgSection.appendChild(pokemonImg);

        let nameElement = document.createElement("div");
        nameElement.innerHTML = capitalizeFirstLetter(data.name);
        nameElement.classList.add("selectedTitle");
        selectedItem.appendChild(nameElement);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
})();