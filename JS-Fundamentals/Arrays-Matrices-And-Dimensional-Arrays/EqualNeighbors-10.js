function solve(array) {
    let counter = 0;


    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array[i].length; j++){
            try{
                if(array[i][j] === array[i + 1][j]){
                    counter++;
                }
            }
            catch (e) {}

            try {
            if (array[i][j] === array[i][j + 1]) {
                counter++;
                }
            }
            catch (e) {}
        }
    }

    console.log(counter);
}

solve([['2', '3', '4', '7', '0'],
    ['4', '0', '5', '3', '4'],
    ['2', '3', '5', '4', '2'],
    ['9', '8', '7', '5', '4']]
);
solve([['2','2','5','7', '4'],
    ['4','0','5','3', '4'],
    ['2','5','5','4', 2]]
);
//
// 2 2 5 7 4
// 4 0 5 3 4
// 2 5 5 4 2
