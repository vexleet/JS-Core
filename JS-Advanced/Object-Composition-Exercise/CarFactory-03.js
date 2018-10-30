function solve(car) {
    let carInDetails = {
        model: car.model,
    };

    let smallEngine = {
        power: 90,
        volume: 1800,

    };

    let normalEngine = {
        power: 120,
        volume: 2400,

    };

    let monsterEngine = {
        power: 200,
        volume: 3500,

    };

    let testEngines = [Math.abs(smallEngine.power - car.power),
        Math.abs(normalEngine.power - car.power), Math.abs(monsterEngine.power - car.power)];
    let smallestEngine = Math.min(...testEngines);

    if (testEngines.indexOf(smallestEngine) === 0) {
        carInDetails["engine"] = smallEngine;
    }
    else if (testEngines.indexOf(smallestEngine) === 1) {
        carInDetails["engine"] = normalEngine;
    }
    else if (testEngines.indexOf(smallestEngine) === 2) {
        carInDetails["engine"] = monsterEngine;
    }

    carInDetails["carriage"] = {
        type: car.carriage,
        color: car.color,
    };

    if(car.wheelsize % 2 === 0){
        car.wheelsize -= 1;
    }

    carInDetails["wheels"] = Array.apply(null, Array(4)).map(Number.prototype.valueOf, car.wheelsize);

    return carInDetails;
}

let input = {
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
};

let output = solve(input);
console.log(output);