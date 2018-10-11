function solve(input) {
    let regex = /^([!@#$?]*[A-Za-z]+[!@#$?]*)+?=([0-9]+)--([0-9]+)<<([A-Za-z]+)$/g;
    let organisms = new Map();

    for(let i = 0; i < input.length - 1; i++){
        let currentGene = input[i];

        let checkGene = currentGene.match(regex);

        if(checkGene){
            let myGene = regex.exec(currentGene);

            let lengthOfName = Number(myGene[2]);
            let countOfGenes = Number(myGene[3]);
            let organism = myGene[4];

            let nameOfGeneRegex = /[!@#$?]*([A-Za-z]+)[!@#$?]*/g;
            let nameOfGene = nameOfGeneRegex.exec(currentGene);
            let gene = "";
            while(nameOfGene){
                if(nameOfGene[1] !== organism){
                    gene += nameOfGene[1];
                }
                nameOfGene = nameOfGeneRegex.exec(currentGene);
            }

            let lengthOfGene = gene.split("").length;
            if(lengthOfGene === lengthOfName){
                if(!organisms.has(organism)){
                    organisms.set(organism, countOfGenes);
                }
                else{
                    organisms.set(organism, organisms.get(organism) + countOfGenes)
                }

            }
        }
    }

    let sort = new Map([...organisms.entries()].sort((a, b) => b[1] - a[1]));

    sort.forEach((value, key) => {
        console.log(`${key} has genome size of ${value}`)
    })
}
//
// solve(["!@ab?si?di!a@=7--152<<human",
//     "b!etu?la@=6--321<<dog",
//     "!curtob@acter##ium$=14--230<<dog",
//     "!some@thin@g##=9<<human",
//     "Stop!"
// ])