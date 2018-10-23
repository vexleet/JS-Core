() => {
    let microelements = {
        "protein": 0,
        "carbohydrate": 0,
        "fat": 0,
        "flavour": 0
    };

    return function (input) {
        let splitInput = input.split(" ");
        let command = splitInput[0];
        let output = "";

        function prepare(q, pr, carb, fat, flav) {
            if (pr > 0) {
                if (pr * q > microelements.protein) {
                    return "Error: not enough protein in stock";
                }
                pr *= q;
            }
            if (carb > 0) {
                if (carb * q > microelements.carbohydrate) {
                    return "Error: not enough carbohydrate in stock";
                }
                carb *= q;
            }
            if (fat > 0) {
                if (fat * q > microelements.fat) {
                    return "Error: not enough fat in stock";
                }
                fat *= q;
            }
            if (flav > 0) {
                if (flav * q > microelements.flavour) {
                    return "Error: not enough flavour in stock";
                }
                flav *= q;
            }
            microelements.flavour -= flav;
            microelements.carbohydrate -= carb;
            microelements.protein -= pr;
            microelements.fat -= fat;

            return "Success";
        }

        switch (command) {
            case "restock":
                let microelement = splitInput[1];
                let quantityForMicroElement = splitInput[2];

                microelements[microelement] += +quantityForMicroElement;
                return "Success";
            case "prepare":
                let recipe = splitInput[1];
                let quantityForRecipe = Number(splitInput[2]);

                if (recipe === "apple") {
                    output = prepare(quantityForRecipe, 0, 1, 0, 2);
                }
                else if (recipe === "coke") {
                    output = prepare(quantityForRecipe, 0, 10, 0, 20);
                }
                else if (recipe === "burger") {
                    output = prepare(quantityForRecipe, 0, 5, 7, 3);
                }
                else if (recipe === "omelet") {
                    output = prepare(quantityForRecipe, 5, 0, 1, 1);
                }
                else if (recipe === "cheverme") {
                    output = prepare(quantityForRecipe, 10, 10, 10, 10);
                }
                return output;
            case "report":
                let str = "";
                for (let microelementsKey in microelements) {
                    str += `${microelementsKey}=${microelements[microelementsKey]} `;
                }
                return str.trim();
        }
    }
}