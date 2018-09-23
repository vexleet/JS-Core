function solve(input) {
    let result = {};

    for(let i = 0; i < input.length; i+=2){
        result[input[i]] = input[i + 1];
    }

    console.log(result);
}

solve(['name', 'Pesho', 'age', '23', 'gender', 'male']);