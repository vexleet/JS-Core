function solve(array) {
    let resultArray = [];

    for(let i = 0; i < array.length; i++){
        let currentNumber = array[i];

        if(currentNumber < 0){
            resultArray.unshift(currentNumber);
        }
        else{
            resultArray.push(currentNumber);
        }
    }

    resultArray.forEach(x => console.log(x));
}

solve([7, -2, 8, 9]);
solve([3, -2, 0, -1]);