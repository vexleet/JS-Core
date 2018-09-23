function solve([number, precision]) {
    number = Number(number);

    if(precision > 15){
        precision = 15;
    }

    let result = number.toFixed(precision);

    console.log(Number(result));
}

solve([3.1415926535897932384626433832795, 2]);
solve([10.5, 3]);