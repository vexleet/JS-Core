function solve(input) {
    let split = input.split(" ");
    let pattern = /^_([A-Za-z0-9]+)$/;

    let result = [];

    for (let i = 0; i < split.length; i++) {
        let currentWord = split[i];

        let match = pattern.exec(currentWord);

        if(match){
            result.push(match[1]);
        }
    }

    console.log(result.join(","));
}