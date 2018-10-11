function solve(input) {
    let cherriesKg = 0;
    let plumsKg = 0;
    let peachesKg = 0;
    let fruitsForRakia = 0;

    for(let i = 0; i < input.length; i++){
        let [fruit, weightInKg] = input[i].split(/\s+/gm);

        switch (fruit) {
            case "cherry":
                cherriesKg += Number(weightInKg);
                break;
            case "plum":
                plumsKg += Number(weightInKg);
                break;
            case "peach":
                peachesKg += Number(weightInKg);
                break;
            default:
                fruitsForRakia += Number(weightInKg);
                break;
        }
    }

    let cherriesKompots = Math.floor((((cherriesKg * 1000) / 9) / 25));
    let plumsKompots = Math.floor((((plumsKg * 1000) / 20) / 10));
    let peachesKompots = Math.floor((((peachesKg * 1000) / 140) / 2.5));

    console.log(`Cherry kompots: ${cherriesKompots}`);
    console.log(`Peach kompots: ${peachesKompots}`);
    console.log(`Plum kompots: ${plumsKompots}`);
    if(fruitsForRakia !== 0) {
        let rakia = fruitsForRakia * 0.200;
        console.log(`Rakiya liters: ${rakia.toFixed(2)}`)
    }

}

solve([   'apple 6',
        'peach 25.158',
        'strawberry 0.200',
        'peach 0.1',
        'banana 1.55',
        'cherry 20.5',
        'banana 16.8',
        'grapes 205.65'
        ,'watermelon 20.54'
    ]

)