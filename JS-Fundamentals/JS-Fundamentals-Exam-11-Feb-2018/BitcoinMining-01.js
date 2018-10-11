function solve(input) {
    let money = 0;
    let boughtBitcoins = 0;
    let dayOfFirstPurchasedBitcoin = 0;

    for(let i = 0; i < input.length; i++){
        let moneyMadeFromCurrentDay = Number(input[i]) * 67.51;

        if((i + 1) % 3 === 0){
            moneyMadeFromCurrentDay -= (moneyMadeFromCurrentDay * 0.3);
        }

        money += moneyMadeFromCurrentDay;

        while(money >= 11949.16){
            boughtBitcoins += 1;
            money -= 11949.16;

            if(dayOfFirstPurchasedBitcoin === 0){
                dayOfFirstPurchasedBitcoin = i + 1;
            }
        }
    }

    console.log(`Bought bitcoins: ${boughtBitcoins}`);
    if(dayOfFirstPurchasedBitcoin) {
        console.log(`Day of the first purchased bitcoin: ${dayOfFirstPurchasedBitcoin}`);
    }
    console.log(`Left money: ${money.toFixed(2)} lv.`);
}

solve([3124.15, 504.212, 2511.1240])