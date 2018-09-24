function solve(text) {
    let regex = /[A-Za-z0-9]+/g;
    let myArray;
    let arrayResult = [];

    while ((myArray = regex.exec(text)) !== null) {
        arrayResult.push(myArray[0].toUpperCase());
    }

    console.log(arrayResult.join(", "));
}

solve("Hi, how are you?");