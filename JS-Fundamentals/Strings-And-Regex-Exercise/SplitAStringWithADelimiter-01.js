function solve(text, delimiter) {
    let splitString = text.split(delimiter);

    console.log(splitString.join("\n"));
}

solve('One-Two-Three-Four-Five', '-')
