function solve(input) {
    let result = {};
    let text = input.join("\n");
    let splitInput = text.split(/[^\w]/g).filter(x => x !== '');

    for (let i = 0; i < splitInput.length; i++) {
        if(!result.hasOwnProperty(splitInput[i])){
            result[splitInput[i]] = 1;
        }
        else{
            result[splitInput[i]] += 1;
        }
    }

    let obj = JSON.stringify(result);
    console.log(obj);
}

solve("Far too slow, you're far too slow.")