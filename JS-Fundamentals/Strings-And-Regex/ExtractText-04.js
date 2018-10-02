function solve(string) {
    let regex = /\((.+?)\)/g;
    let match = regex.exec(string);
    let result = [];

    while (match != null) {
        result.push(match[1]);
        match = regex.exec(string);
    }

    console.log(result.join(', '))
}

solve('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)')