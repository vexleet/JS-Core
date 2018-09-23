function solve(n) {
    let height = n;

    if (n % 2 === 0) {
        height -= 1;
    }

    if(n < 3){
        console.log(`+${"-".repeat(n - 2)}+${"-".repeat(n - 2)}+`);
        return;
    }

    let specialLinesHeight = (height - 3) / 2;

    console.log(`+${"-".repeat(n - 2)}+${"-".repeat(n - 2)}+`);

    for (let j = 1; j <= specialLinesHeight; j++) {
        console.log(`|${" ".repeat(n - 2)}|${" ".repeat(n - 2)}|`);
    }

    console.log(`+${"-".repeat(n - 2)}+${"-".repeat(n - 2)}+`);

    for (let j = 1; j <= specialLinesHeight; j++) {
        console.log(`|${" ".repeat(n - 2)}|${" ".repeat(n - 2)}|`);
    }

    console.log(`+${"-".repeat(n - 2)}+${"-".repeat(n - 2)}+`);
}

solve(2);
// solve(6);
// solve(7);