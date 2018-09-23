function solve([day, month, year]) {
    if(month !== 0){
        month -= 1;
    }

    let test = new Date(year, month, 0);

    console.log(test.getDate());
}

solve([17, 1, 2002]);
solve([13, 0, 2004]);