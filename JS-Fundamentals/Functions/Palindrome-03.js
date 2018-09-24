function solve(word) {
    console.log(word.split('').reverse().join('') === word ? "true" : "false");
}

solve('haha');
solve('racecar');