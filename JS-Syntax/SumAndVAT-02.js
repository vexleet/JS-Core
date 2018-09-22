function sumAndVAT02(arr){
    let sum = 0;

    for(let i = 0; i < arr.length; i++){
        sum += arr[i];
    }

    let VAT = sum * 0.2;

    console.log(`sum = ${sum.toFixed(2)}`);
    console.log(`VAT = ${VAT.toFixed(2)}`);

    let total = sum + VAT;

    console.log(`total = ${total.toFixed(2)}`);
}

sumAndVAT02([1.20, 2.60, 3.50]);