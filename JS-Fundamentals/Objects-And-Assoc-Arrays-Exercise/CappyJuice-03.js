function solve(input) {
    let juice = new Map();
    let juicesWithBottles = new Map();

    for (let i = 0; i < input.length; i++) {
        let [juiceName, juiceQuantity] = input[i].split(" => ");

        if(!juice.has(juiceName)){
            juice.set(juiceName, Number(juiceQuantity));
        }
        else{
            juice.set(juiceName, juice.get(juiceName) + Number(juiceQuantity));
        }

        let checkForBottle = Math.floor(juice.get(juiceName) / 1000);

        if(checkForBottle > 0){
            if(!juicesWithBottles.has(juiceName)){
                juicesWithBottles.set(juiceName, checkForBottle);
                juice.set(juiceName, juice.get(juiceName) - 1000 * checkForBottle);
            }
            else{
                juicesWithBottles.set(juiceName, juicesWithBottles.get(juiceName) + checkForBottle);
                juice.set(juiceName, juice.get(juiceName) - 1000 * checkForBottle);
            }
        }

    }

    juicesWithBottles.forEach((value, key) => {
        console.log(`${key} => ${value}`)
    })
}

solve(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']


)