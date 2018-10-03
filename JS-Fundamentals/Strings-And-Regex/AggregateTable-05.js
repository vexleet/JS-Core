function solve(inputArray) {
    let sum = 0;
    let towns = [];

    for(let i = 0; i < inputArray.length; i++){
        let splitArray = inputArray[i].split('|');

        towns.push(splitArray[1].trim());
        sum += Number(splitArray[2]);
    }

    console.log(towns.join(', '));
    console.log(sum);
}

solve(['| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
);