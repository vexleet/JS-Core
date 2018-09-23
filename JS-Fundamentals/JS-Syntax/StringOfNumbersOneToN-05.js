function printNumbers(n){
    let result = "";
    let number = Number(n);

    for(let i = 1; i <= number; i++){
        result += i;
    }

    console.log(result);
}

printNumbers(11);