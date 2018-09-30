function solve([width, height, x, y]) {
    let arrayResult = [...Array(height)].map(e => Array(width).fill(0));

    for (let row = 0; row < width; row++) {
        for (let col = 0; col < height; col++) {
            arrayResult[row][col] = Math.max(Math.abs(row - x), Math.abs(col - y)) + 1;
        }
    }

    console.log(arrayResult.map(row => row.join(" ")).join("\n"));
}

solve([4, 4, 0, 0]);