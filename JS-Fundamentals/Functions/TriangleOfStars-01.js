function solve(num){
    for(let i = 1; i <= num; i++){
        console.log("*".repeat(i));
    }

    for(let j = num - 1; j >= 1; j--){
        console.log("*".repeat(j));
    }
}

solve(1);
solve(2);
solve(5);