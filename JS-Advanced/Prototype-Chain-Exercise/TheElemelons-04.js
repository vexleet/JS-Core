function solve() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.weight = weight;
            this.melonSort = melonSort;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = weight * melonSort.length;
        }

        toString() {
            return "Element: Water\n" +
                `Sort: ${this.melonSort}\n` +
                `Element Index: ${this.elementIndex}`;
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = weight * melonSort.length;
        }

        toString() {
            return "Element: Fire\n" +
                `Sort: ${this.melonSort}\n` +
                `Element Index: ${this.elementIndex}`;
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = weight * melonSort.length;
        }

        toString() {
            return "Element: Earth\n" +
                `Sort: ${this.melonSort}\n` +
                `Element Index: ${this.elementIndex}`;
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = weight * melonSort.length;
        }

        toString() {
            return "Element: Air\n" +
                `Sort: ${this.melonSort}\n` +
                `Element Index: ${this.elementIndex}`;
        }
    }

    class Melolemonmelon extends Watermelon{

        constructor(weight, melonSort){
            super(weight, melonSort);
            this.elements = ["Water", "Fire", "Earth", "Air"];

        }

        morph(){
            let firstElement = this.elements[0];
            this.elements.shift();
            this.elements.push(firstElement);
        }

        toString(){
            return `Element: ${this.elements[0]}\n` +
                `Sort: ${this.melonSort}\n` +
                `Element Index: ${this.elementIndex}`;
        }
    }



    return {Melon, Airmelon, Earthmelon, Firemelon, Melolemonmelon, Watermelon}
}