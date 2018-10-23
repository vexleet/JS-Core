function solve(input){
    let sum = input.reduce((a, b) => a + b);
    let min = Math.min(...input);
    let max = Math.max(...input);
    let product = input.reduce((a, b) => a * b);
    let join = input.join("");

    console.log(`Sum = ${sum}`);
    console.log(`Min = ${min}`);
    console.log(`Max = ${max}`);
    console.log(`Product = ${product}`);
    console.log(`Join = ${join}`);
}

solve([2,3,10,5])