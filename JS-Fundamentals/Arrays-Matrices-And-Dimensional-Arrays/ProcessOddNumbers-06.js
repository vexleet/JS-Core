function solve(array) {
    let result = [];
    for(let i = 0; i < array.length; i++){
        if(i % 2 !== 0){
            result.push(array[i] * 2);
        }
    }

    console.log(result.reverse().join(" "));
}

solve([10, 15, 20, 25]);
solve([3, 0, 10, 4, 7, 3])