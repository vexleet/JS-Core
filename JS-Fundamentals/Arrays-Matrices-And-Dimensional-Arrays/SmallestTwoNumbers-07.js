function solve(array) {
    let result = [];

    for(let i = 0; i < 2; i++){
        let currentSmallest = Math.min.apply(null, array);
        let indexOfSmallestNumber = array.indexOf(currentSmallest);
        array.splice(indexOfSmallestNumber, 1);

        result.push(currentSmallest)
    }

    console.log(result.join(" "));
}

solve([30, 15, 50, 5]);