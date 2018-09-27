function solve(lengthOfSequence, sumOfPreviousElements) {
    let arr = [1];

    for (let i = 0; i < lengthOfSequence - 1; i++) {
        let currentSum = 0;

        for (let j = arr.length - sumOfPreviousElements; j < arr.length; j++) {
            if(j < 0){
                continue;
            }
            currentSum += arr[j];
        }

        arr.push(currentSum);
    }

    console.log(arr.join(" "));
}

solve(6, 3);
solve(8, 2)