function solve(input) {
    let regex = /32656 19759 32763\s0\s\d+\s0\s([1-9]\d*\s)+/gm;
    let text = input.join(" ");

    let match = regex.exec(text);

    while (match) {
        let split = match[0].split(" 0 ");

        let lengthOfString = Number(split[1]);
        let characters = split[2].split(" ").filter(x => x !== '');
        let name = "";

        if (characters.length === lengthOfString) {
            for (let i = 0; i < characters.length; i++) {
                let currentChar = String.fromCharCode(characters[i]);
                name += currentChar;
            }
        }
        console.log(name);
        match = regex.exec(text);
    }
}

solve(["32656 19759 32763 0 5 0 80 101 115 104 111 0 0 0 0 0 0 0 0 0 0 0",
    "0 32656 19759 32763 0 7 0 83 111 102 116 117 110 105 0 0 0 0 0 0 0 0"
]);