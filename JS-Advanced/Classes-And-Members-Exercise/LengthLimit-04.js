class Stringer{
    constructor(innerString, innerLength){
        this.innerString = innerString;
        this.innerLength = Number(innerLength);
    }

    get innerLength(){
        return this._innerLength;
    }

    set innerLength(length){
        if(length < 0){
            this._innerLength = 0;
        }
        else{
            this._innerLength = Number(length);
        }
    }

    increase(length){
        this._innerLength += length;
    }

    decrease(length){
        this.innerLength = this._innerLength - length;
    }

    toString(){
        if(this.innerLength === 0){
            return ".".repeat(3);
        }

        if(this.innerString.length > this.innerLength){
            return this.innerString.substring(0, this.innerLength) + '.'.repeat(3);
        }
        else{
            return this.innerString;
        }
    }
}

let test = new Stringer("Test", 5);

console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(4);
console.log(test.toString()); //Test
