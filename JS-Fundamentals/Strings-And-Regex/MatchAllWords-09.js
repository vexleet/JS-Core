function solve(text) {
    let regex = /\w+/g;
    let match = regex.exec(text);
    let result = [];

    while (match != null) {
        result.push(match);
        match = regex.exec(text);
    }

    console.log(result.join('|'))
}

solve('A Regular Expression needs to have the global flag in order to match all occurrences in the text')