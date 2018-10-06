function solve(input) {
    input = input.toLowerCase().split(" ");

    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].charAt(0).toUpperCase() + input[i].slice(1);
    }

    console.log(input.join(" "));
}

solve('Capitalize these words');
solve('Was that Easy? tRY thIs onE for SiZe!')