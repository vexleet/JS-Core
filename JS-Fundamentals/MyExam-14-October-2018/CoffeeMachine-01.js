function solve(input) {
    let income = 0;

    for (let i = 0; i < input.length; i++) {
        let currentOrder = input[i].split(", ");
        let coinsInserted = Number(currentOrder[0]);
        let typeOfDrink = currentOrder[1];
        let price = 0;

        if (typeOfDrink === "coffee") {
            let typeOfCoffee = currentOrder[2];
            let typeOfCoffeePrice = 0;
            if (typeOfCoffee === "caffeine") {
                typeOfCoffeePrice = 0.80;
            }
            else if (typeOfCoffee === "decaf") {
                typeOfCoffeePrice = 0.90;
            }
            let milkCost = 0;
            if (currentOrder[3] === "milk") {
                milkCost = Math.round( (typeOfCoffeePrice * 0.1) * 10 ) / 10;
            }
            price += (typeOfCoffeePrice + milkCost);


            if(!isNaN(Number(currentOrder[currentOrder.length - 1]))) {
                let sugar = Number(currentOrder[currentOrder.length - 1]);
                let sugarPrice = 0;
                if (sugar > 0 && sugar <= 5) {
                    sugarPrice = 0.10;
                }
                price += sugarPrice;
            }

            if (price <= coinsInserted) {
                let change = coinsInserted - price;
                income += price;
                console.log(`You ordered coffee. Price: ${price.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
            }
            else {
                let moneyNeeded = price - coinsInserted;
                console.log(`Not enough money for coffee. Need ${moneyNeeded.toFixed(2)}$ more.`)
            }
        }
        else {
            let milkCost = 0;
            let teaPrice = 0.80;
            if (currentOrder[2] === "milk") {
                milkCost = Math.round( (teaPrice * 0.1) * 10 ) / 10;
            }

            price += (teaPrice + milkCost);

            if(!isNaN(Number(currentOrder[currentOrder.length - 1]))) {
                let sugar = Number(currentOrder[currentOrder.length - 1]);
                let sugarPrice = 0;
                if (sugar > 0 && sugar <= 5) {
                    sugarPrice = 0.10;
                }
                price += sugarPrice;
            }

            if (price <= coinsInserted) {
                let change = coinsInserted - price;
                income += price;
                console.log(`You ordered tea. Price: ${price.toFixed(2)}$ Change: ${change.toFixed(2)}$`)
            }
            else {
                let moneyNeeded = price - coinsInserted;
                console.log(`Not enough money for tea. Need ${moneyNeeded.toFixed(2)}$ more.`)
            }
        }
    }

    console.log(`Income Report: ${income.toFixed(2)}$`)
}

// solve(['8.00, coffee, decaf, 4',
//     '1.00, tea, 2']
//
// )