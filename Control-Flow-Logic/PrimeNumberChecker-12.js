function checkPrime(num){
    if(num < 0){
        console.log(false);
        return;
    }

    for(let i = 2; i < num; i++){
        if(num % i == 0){
            console.log(false);
            return;
        }
    }
    console.log(num !== 1 && num !== 0);
}

checkPrime(-5);
checkPrime(8);
checkPrime(81)