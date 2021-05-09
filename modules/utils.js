const Utils = {
    getData: async function (url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    },

    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export default Utils;