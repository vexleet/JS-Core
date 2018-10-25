function gcd(a, b) {
    while(b !== 0){
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

console.log(gcd(252, 105));