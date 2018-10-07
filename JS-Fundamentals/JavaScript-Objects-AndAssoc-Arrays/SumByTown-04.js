function solve(input) {
    let towns = {};

    for(let i = 0; i < input.length; i+=2){
        if(!towns.hasOwnProperty(input[i])){
            towns[input[i]] = 0;
        }
        towns[input[i]] += Number(input[i + 1]);
    }

    let obj = JSON.stringify(towns);

    console.log(obj);
}

solve(["sofia", 20, "varna", "5", "sofia", "5"])