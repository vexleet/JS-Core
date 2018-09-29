function solve(array) {
    let amountOfRotationToPerform = Number(array.pop());

    for(let i = 0; i < amountOfRotationToPerform % 1000; i++){
        let getLastElement = array.pop();

        array.unshift(getLastElement);
    }

    console.log(array.join(" "));
}

solve(['1',
    '2',
    '3',
    '4',
    '2']
);