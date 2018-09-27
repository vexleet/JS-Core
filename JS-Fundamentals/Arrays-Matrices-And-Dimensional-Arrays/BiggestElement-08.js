function solve(array) {
    let biggestElement = Number.MIN_SAFE_INTEGER;

    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array[i].length; j++){
            if(array[i][j] >= biggestElement){
                biggestElement = array[i][j];
            }
        }
    }

    console.log(biggestElement);
}

solve([[-3, -5, -7, -12],
    [-1, -4, -33, -2],
    [-8, -3, 0, -4]]

);
