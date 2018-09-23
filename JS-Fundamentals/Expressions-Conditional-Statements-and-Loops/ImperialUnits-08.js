function solve(number){
    let feet = Math.floor(number / 12);
    let inches = number % 12;

    console.log(`${feet}'-${inches}"`);
}

solve(36);
solve(55);
solve(11);