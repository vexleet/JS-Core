function solve(matrix, commands) {
    let array = [];

    array = fillArray(array, matrix);


    for (let i = 0; i < commands.length; i++) {
        let [force, forcePower] = commands[i].split(/\s+/g);

        forcePower = Number(forcePower);

        switch (force) {
            case "breeze":
                for (let i = 0; i < array[forcePower].length; i++) {
                    array[forcePower][i] -= 15;
                    if(array[forcePower][i] < 0){
                        array[forcePower][i] = 0;
                    }
                }
                break;
            case "gale":
                for (let i = 0; i < array.length; i++) {
                    array[i][forcePower] -= 20;
                    if(array[i][forcePower] < 0){
                        array[i][forcePower] = 0;
                    }
                }
                break;
            case "smog":
                for (let i = 0; i < array.length; i++) {
                    for(let j = 0; j < array[i].length; j++){
                        array[i][j] += forcePower;
                    }
                }
        }
    }

    let pollutedAreas = [];

    for (let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[i].length; j++){
            if(array[i][j] >= 50){
                pollutedAreas.push(`[${i}-${j}]`);
            }
        }
    }

    if(pollutedAreas.length > 0){
        console.log(`Polluted areas: ${pollutedAreas.join(", ")}`);
    }
    else{
        console.log("No polluted areas");
    }


    function fillArray(array, numbers) {
        for (let i = 0; i < numbers.length; i++) {
            let splitArray = numbers[i].split(" ").map(Number);
            array.push(splitArray);
        }
        return array;
    }
}