function solve(input) {
    let destinations = new Map();

    for(let i = 0; i < input.length; i++){
        let [country, town, cost] = input[i].split(" > ");
        cost = Number(cost);
        town = capitalize(town);

        if(!destinations.has(country)){
            destinations.set(country, new Map());
        }

        if(destinations.get(country).has(town)){
            destinations.get(country).set(town, Math.min(destinations.get(country).get(town), cost));
        }
        else{
            destinations.get(country).set(town, cost);
        }
    }

    let mapAsc = new Map([...destinations.entries()].sort((a, b) => {
        return a[0].localeCompare(b[0]);
    }));

    mapAsc.forEach((value, key) => {
        let sortTowns = new Map([...value.entries()].sort((a, b) => {
            return a[1] - b[1];
        }));

        let townsArray = [];

        sortTowns.forEach((cost, town) => {
            townsArray.push(`${town} -> ${cost}`);
        });

        console.log(`${key} -> ${townsArray.join(" ")}`);
    });

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
    }
}

solve(["Bulgaria > Sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > Tirana > 1000",
    "Bulgaria > Sofia > 200" ]

)