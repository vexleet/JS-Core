function solve(array) {
    let firstDiagonalSum = 0;
    let secondDiagonalSum = 0;

    function printArray(array){
        for(let i = 0; i < array.length; i++){
            console.log(array[i]);
        }
    }

    for(let i = 0; i < array.length; i++){
        let splitArray = array[i].split(' ');

        firstDiagonalSum += Number(splitArray[i]);
    }

    for(let i = 0; i < array.length; i++){
        let splitArray = array[i].split(' ');

        secondDiagonalSum += Number(splitArray[splitArray.length - 1 - i]);
    }

    if(firstDiagonalSum === secondDiagonalSum){
        for(let i = 0; i < array.length; i++){
            let splitArray = array[i].split(' ');

            for(let j = 0; j < splitArray.length; j++){
                if(j === i || j === splitArray.length - 1 - i){
                    continue;
                }

                splitArray[j] = firstDiagonalSum;
            }

            array[i] = splitArray.join(" ");
        }

        printArray(array);
    }
    else {
        printArray(array);
    }
}

solve(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
);

solve(['1 1 1',
    '1 1 1',
    '1 1 0']
);
