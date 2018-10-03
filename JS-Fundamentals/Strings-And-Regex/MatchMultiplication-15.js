function solve(input) {
    let regex = /(\d+|-\d+)\s*\*\s*(-\d+.\d+|\d+.\d+|\d+|-\d+)/g;

    let match = regex.exec(input);
    let test = input.replace(regex, function(match, p1, p2){
        return p1 * p2;
    });

    console.log(test);
}

solve('My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).')