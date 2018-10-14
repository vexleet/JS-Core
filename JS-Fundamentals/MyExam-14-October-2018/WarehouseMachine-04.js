function solve(input) {
    let products = new Map();

    for (let i = 0; i < input.length; i++) {
        let [command, brand, name, expireDate, quantity] = input[i].split(", ");
        quantity = Number(quantity);
        switch (command) {
            case "IN":
                if (!products.has(brand)) {
                    products.set(brand, new Map());
                }
                if (!products.get(brand).has(name)) {
                    products.get(brand).set(name, new Map());
                    products.get(brand).get(name).set(expireDate, quantity);
                }

                else {
                    let compareDates = products.get(brand).get(name).keys().next().value.localeCompare(expireDate);
                    if (compareDates === 0) {
                        products.get(brand).get(name).set(expireDate, products.get(brand).get(name).get(expireDate) + quantity);
                    }
                    else if (compareDates === -1) {
                        products.get(brand).get(name).delete(products.get(brand).get(name).keys().next().value);
                        products.get(brand).get(name).set(expireDate, quantity);
                    }

                }
                break;
            case "OUT":
                if (products.has(brand)) {
                    if (products.get(brand).has(name)) {
                        products.get(brand).get(name).forEach((value, key) => {
                            let expires = key.localeCompare(expireDate);
                            if (key.localeCompare(expireDate) === 1) {
                                let getDateOfProduct = products.get(brand).get(name).keys().next().value;

                                if(products.get(brand).get(name).get(getDateOfProduct) > quantity){
                                    products.get(brand).get(name).set(getDateOfProduct, products.get(brand).get(name).get(getDateOfProduct) - quantity);
                                }
                            }
                        });
                    }
                }
                break;
            case "REPORT":
                console.log(">>>>> REPORT! <<<<<");
                products.forEach((value, key) => {
                    console.log(`Brand: ${key}:`);

                    value.forEach((date, coffee) => {
                        date.forEach((values, keys) => {
                            console.log(`-> ${coffee} -> ${keys} -> ${values}.`)
                        })
                    })
                });
                break;
            case "INSPECTION":
                let mapAsc = new Map([...products.entries()].sort((a, b) => {
                    return a[0].localeCompare(b[0]);
                }));

                console.log(">>>>> INSPECTION! <<<<<");

                mapAsc.forEach((value, key) => {
                    console.log(`Brand: ${key}:`);

                    let sortCoffee = new Map([...value.entries()].sort((a, b) => {
                        return Object.values(b)[1].values().next().value - Object.values(a)[1].values().next().value;
                    }));

                    sortCoffee.forEach((date, coffee) => {
                        date.forEach((values, keys) => {
                            console.log(`-> ${coffee} -> ${keys} -> ${values}.`)
                        })
                    })
                });
                break;
        }
    }

}