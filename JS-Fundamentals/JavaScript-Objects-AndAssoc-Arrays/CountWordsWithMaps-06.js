function solve(input) {
    let result = new Map();
    let text = input.join("\n");
    let splitInput = text.split(/[^\w]/g).filter(x => x !== '');

    for (let i = 0; i < splitInput.length; i++) {
        if(!result.has(splitInput[i].toLowerCase())){
            result.set(splitInput[i].toLowerCase(), 1);
        }
        else{
            result.set(splitInput[i].toLowerCase(), result.get(splitInput[i].toLowerCase()) + 1);
        }
    }

    let mapAsc = new Map([...result.entries()].sort());
    mapAsc.forEach((x, y) => console.log(`'${y}' -> ${x} times`))
}

solve("Far too slow, you're far too slow.")