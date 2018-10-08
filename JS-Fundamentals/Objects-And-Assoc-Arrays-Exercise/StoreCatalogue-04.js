function solve(input){
    let catalogue = new Map();

    for(let i = 0; i < input.length; i++){
        let currentProduct = input[i].split(" : ");

        let productName = currentProduct[0];
        let productPrice = Number(currentProduct[1]);
        let productFirstLetter = productName[0];

        if(!catalogue.has(productFirstLetter)){
            catalogue.set(productFirstLetter, new Map());
        }

        catalogue.get(productFirstLetter).set(productName, productPrice);
    }

    let mapAsc = new Map([...catalogue.entries()].sort());

    mapAsc.forEach((value, key) => {
        console.log(key);

        let sortProducts = new Map([...value.entries()].sort());

        sortProducts.forEach((productPrice, productName) => {
            console.log(`  ${productName}: ${productPrice}`)
        })
    })
}

solve(['Banana : 2',
    "Rubic's Cube : 5",
'Raspberry P : 4999',
    'Rolex : 100000',
    'Rollon : 10',
    'Rali Car : 2000000',
    'Pesho : 0.000001',
    'Barrel : 10']



)