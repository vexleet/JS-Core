function solve(targetString, input) {
    let count = 0;

    let index = input.indexOf(targetString);

    while(index > -1){
        count++;
        index = input.indexOf(targetString, index + 1);
    }

    console.log(count);
}

solve('the', 'The quick brown fox jumps over the lay dog.');