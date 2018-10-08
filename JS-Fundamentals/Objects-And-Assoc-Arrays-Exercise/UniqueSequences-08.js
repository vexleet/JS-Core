function solve(input) {
    let arrays = new Set();

    for(let i = 0; i < input.length; i++){
        let currentArray = JSON.parse(input[i]).sort((a, b) => b - a);

        arrays.add(currentArray.toString());
    }

    let sortArray = Array.from(arrays).sort((a, b) => {
        return a.split(",").length - b.split(",").length;
    });

    sortArray.forEach(a => {
        console.log(`[${a.split(",").map(Number).join(", ")}]`);
    })
}

solve(["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"]
)