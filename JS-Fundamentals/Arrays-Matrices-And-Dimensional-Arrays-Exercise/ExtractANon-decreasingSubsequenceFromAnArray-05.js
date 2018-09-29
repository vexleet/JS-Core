function solve(array) {
    for(let i = 1; i < array.length; i++){
        if(array[i] < array[i - 1]){
            array.splice(i, 1);
            i-=1;
        }
    }

    array.forEach(x => console.log(x));
}

solve([1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24]
);

solve([20,
    3,
    2,
    15,
    6,
    1]
)