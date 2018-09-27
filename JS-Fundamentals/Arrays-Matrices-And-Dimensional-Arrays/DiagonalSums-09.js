function solve(array) {
    let firstDiagonalSum = 0;
    let secondDiagonalSum = 0;

    for(let i = 0; i < array.length; i++){
        firstDiagonalSum += array[i][i];
    }

    for(let i = 0; i < array.length; i++){
        secondDiagonalSum += array[i][array.length - i - 1];
    }

    console.log(firstDiagonalSum + " " + secondDiagonalSum);
}

solve([[3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]]
);
solve([[20, 40],
    [10, 60]]
);