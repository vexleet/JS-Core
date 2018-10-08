function solve(input){
    let heroData = [];

    for (let i = 0; i < input.length; i++) {
        let [heroName, heroLevel, items] = input[i].split(" / ");

        let heroItems = [];

        if(items != undefined){
            heroItems = items.split(", ");
        }

        heroData.push({name: heroName, level: Number(heroLevel), items: heroItems});
    }

    let stringify = JSON.stringify(heroData);
    console.log(stringify);
}

solve(['Isacc / 25',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']
)