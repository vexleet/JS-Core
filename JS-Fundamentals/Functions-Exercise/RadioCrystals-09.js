function solve(input){

    function cutChunk(desiredThickness, chunk){
        let cutCounter = 0;

        while(true){
            if(chunk / 4 >= desiredThickness){
                chunk /= 4;
                cutCounter++;
            }
            else{
                if(cutCounter > 0) {
                    console.log(`Cut x${cutCounter}`);
                    printTransportingAndWashing();
                }
                return Math.floor(chunk);
            }
        }
    }

    function lapChunk(desiredThickness, chunk){
        let lapCounter = 0;

        while(true){
            if(chunk - (chunk * 0.2) >= desiredThickness){
                chunk -= (chunk * 0.2);
                lapCounter++;
            }
            else{
                if(lapCounter > 0) {
                    console.log(`Lap x${lapCounter}`);
                    printTransportingAndWashing();
                }
                return Math.floor(chunk);
            }
        }
    }

    function grindChunk(desiredThickness, chunk){
        let grindCounter = 0;

        while(true){
            if(chunk - 20 >= desiredThickness){
                chunk -= 20;
                grindCounter++;
            }
            else {
                if(grindCounter > 0) {
                    console.log(`Grind x${grindCounter}`);
                    printTransportingAndWashing();
                }
                return Math.floor(chunk);
            }
        }
    }

    function etchChunk(desiredThickness, chunk){
        let etchCounter = 0;

        while(true){
            if(chunk - 2 >= desiredThickness){
                chunk -= 2;
                etchCounter++;
            }
            else if(chunk - 2 + 1 === desiredThickness){
                chunk = (chunk - 2) + 1;
                console.log(`Etch x${etchCounter + 1}`);
                printTransportingAndWashing();
                console.log("X-ray x1");
                return Math.floor(chunk);
            }
            else {
                if(etchCounter > 0) {
                    console.log(`Etch x${etchCounter}`);
                    printTransportingAndWashing();
                }
                return Math.floor(chunk);
            }
        }
    }

    function checkXray(desiredThickness, chunk){
        if(chunk + 1 === desiredThickness){
            console.log("X-ray x1");
            return Math.floor(chunk + 1);
        }
        return Math.floor(chunk);
    }

    function printTransportingAndWashing(){
        console.log("Transporting and washing");
    }

    let targetThickness = input[0];

    for(let i = 1; i < input.length; i++){
        let currentChunkOfQuartz = input[i];

        console.log(`Processing chunk ${currentChunkOfQuartz} microns`);

        currentChunkOfQuartz = cutChunk(targetThickness, currentChunkOfQuartz);
        currentChunkOfQuartz = lapChunk(targetThickness, currentChunkOfQuartz);
        currentChunkOfQuartz = grindChunk(targetThickness, currentChunkOfQuartz);
        currentChunkOfQuartz = etchChunk(targetThickness, currentChunkOfQuartz);
        currentChunkOfQuartz = checkXray(targetThickness, currentChunkOfQuartz);

        console.log(`Finished crystal ${currentChunkOfQuartz} microns`)
    }
}

solve([1375, 1374]);