function solve(rows, cols) {
    let arrayResult = [...Array(rows)].map(e => Array(cols).fill(0));

    let number = 1;
    let minCol = 0;
    let maxCol = cols - 1;
    let minRow = 0;
    let maxRow = rows - 1;

    while (number <= rows * cols) {
        for (let i = minCol; i <= maxCol; i++) {
            arrayResult[minRow][i] = number;
            number++;
        }

        for (let i = minRow + 1; i <= maxRow; i++) {
            arrayResult[i][maxCol] = number;
            number++;
        }

        for (let i = maxCol - 1; i >= minCol; i--) {
            arrayResult[maxRow][i] = number;
            number++;
        }

        for (let i = maxRow - 1; i >= minRow + 1; i--) {
            arrayResult[i][minCol] = number;
            number++;
        }

        minCol++;
        minRow++;
        maxRow--;
        maxCol--;
    }

    for (let i = 0; i < arrayResult.length; i++)
    {
        let current = [];
        for (let j = 0; j < arrayResult.length; j++)
        {
            current.push(arrayResult[i][j]);
        }
        console.log(current.join(" "));
    }
}

solve(3, 3);
solve(5, 5)