function solve(array) {
    let initialNumber = 1;

    let arrayResult = [];

    for(let i = 0; i < array.length; i++){
        let currentCommand = array[i];

        if(currentCommand === 'add'){
            arrayResult.push(initialNumber);
        }
        else if(currentCommand === 'remove'){
            arrayResult.pop();
        }
        initialNumber++;
    }

    if(arrayResult.length === 0){
        console.log('Empty');
        return;
    }

    arrayResult.forEach(x => console.log(x));
}

solve(['add',
    'add',
    'add',
    'add']

);

solve(['add',
    'add',
    'remove',
    'add',
    'add']
);