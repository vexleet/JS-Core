function solve(array) {
    let products = [];
    let productPrices = 0;

    for(let i = 0; i < array.length; i++){
        if(i % 2 === 0) {
            products.push(array[i]);
        }
        else{
            productPrices += Number(array[i]);
        }
    }

    console.log(`You purchased ${products.join(', ')} for a total sum of ${productPrices}`)
}

solve(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69'])