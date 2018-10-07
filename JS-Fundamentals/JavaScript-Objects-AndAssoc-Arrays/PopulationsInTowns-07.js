function solve(input) {
    let result = new Map();

    for (let i = 0; i < input.length; i++) {
        let [townName, townPopulation] = input[i].split(" <-> ");

        if(!result.has(townName)){
            result.set(townName, Number(townPopulation));
        }
        else{
            result.set(townName, result.get(townName) + Number(townPopulation));
        }
    }

    result.forEach((value, key) => console.log(`${key} : ${value}`))
}

solve(["Istanbul <-> 100000",
        "Honk Kong <-> 2100004",
"Jerusalem <-> 2352344",
"Mexico City <-> 23401925",
"Istanbul <-> 1000"]
)