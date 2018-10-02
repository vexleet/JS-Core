function solve(array) {
    let result = array.map(x => x.split('').reverse().join('')).reverse().join('');

    console.log(result);
}

solve(['I', 'am', 'student'])