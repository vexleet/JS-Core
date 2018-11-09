class Rat{
    constructor(rat){
        this.name = rat;
        this.unitedRats = [];
    }

    unite(otherRat){
        if(typeof otherRat === 'object') {
            this.unitedRats.push(otherRat);
        }
    }

    getRats(){
        return this.unitedRats;
    }

    toString(){
        let result = this.name + '\n';

        if(this.unitedRats.length > 0){
            this.unitedRats.forEach(x => {
                result += "##" + x.name + '\n';
            });
        }

        return result;
    }
}

let test = new Rat("Pesho");
console.log(test.toString()); //Pesho
console.log(test.getRats()); //[]

test.unite(new Rat("Gosho"));
test.unite(new Rat("Sasho"));
console.log(test.getRats());
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString());
// Pesho
// ##Gosho
// ##Sasho
