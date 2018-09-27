function solve(array) {
    let k = array[0];

    let firstNumbers = "";
    let lastNumbers = "";

    for(let i = 1; i < k + 1; i++){
        firstNumbers += array[i] + " ";
    }

    for(let i = array.length - k; i < array.length; i++){
        lastNumbers += array[i] + " ";
    }

    console.log(firstNumbers);
    console.log(lastNumbers);
}

solve([2,
    7, 8, 9]
);
solve([3,
    6, 7, 8, 9]
);