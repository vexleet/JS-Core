function getFibonator() {
    let firstN = 1;
    let secondN = 0;

    return function () {
        let thirdN = firstN + secondN;
        firstN = secondN;
        secondN = thirdN;
        return secondN;
    };
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13


