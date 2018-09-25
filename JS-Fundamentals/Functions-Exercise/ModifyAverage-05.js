function solve(number) {
    number = number.toString().split('').map(Number);

    let average = number.reduce((a, b) => a + b) / number.length;

    while(average <= 5){
        number.push(9);

        average = number.reduce((a, b) => a + b) / number.length;
    }

    console.log(number.join(""));
}

solve(101);
solve(5835);