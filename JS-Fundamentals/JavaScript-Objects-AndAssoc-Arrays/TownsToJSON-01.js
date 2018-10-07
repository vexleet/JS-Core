function solve(input) {
    let result = [];

    for (let i = 1; i < input.length; i++) {
        let splitTown = input[i].split("|").filter(n => n !== "");
        result.push({Town: splitTown[0].trim(), Latitude: Number(splitTown[1].trim()), Longitude: Number(splitTown[2].trim())});
    }

    let obj = JSON.stringify(result);

    console.log(obj);
}

solve(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
)