function solve(array) {
    let sumsOfRows = [];
    let sumOfCols = [];

    for (let i = 0; i < array.length; i++) {
        let currentRowSum = 0;

        for (let j = 0; j < array[i].length; j++) {
            currentRowSum += array[i][j];
        }

        sumsOfRows.push(currentRowSum);
    }

    for (let i = 0; i < array.length; i++) {
        let currentColsSum = 0;

        for (let j = 0; j < array.length; j++) {
            currentColsSum += array[j][i];
        }

        sumOfCols.push(currentColsSum);
    }

    let uniqueRows = sumsOfRows.filter(function (item, pos) {
        return sumsOfRows.indexOf(item) === pos;
    });

    let uniqueCols = sumOfCols.filter(function (item, pos) {
        return sumOfCols.indexOf(item) === pos;
    });

    if (uniqueRows.length === 1 && uniqueCols.length === 1 && uniqueRows[0] === uniqueCols[0]) {
        console.log(true);
    }
    else {
        console.log(false);
    }
}

solve([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]],
);

solve([[11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]]
);