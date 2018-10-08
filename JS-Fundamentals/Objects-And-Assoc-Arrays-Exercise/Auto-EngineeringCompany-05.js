function solve(input) {
    let cars = new Map();

    for(let i = 0; i < input.length; i++){
        let [carBrand, carModel, producedCars] = input[i].split(" | ");

        if(!cars.has(carBrand)){
            cars.set(carBrand, new Map());
            cars.get(carBrand).set(carModel, Number(producedCars));
        }
        else{
            if(cars.get(carBrand).has(carModel)){
                cars.get(carBrand).set(carModel, cars.get(carBrand).get(carModel) + Number(producedCars));
            }
            else{
                cars.get(carBrand).set(carModel, Number(producedCars));
            }
        }
    }

    cars.forEach((value, key) => {
        console.log(key);

        value.forEach((producedCars, carModel) => {
            console.log(`###${carModel} -> ${producedCars}`);
        })
    })
}

solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
)