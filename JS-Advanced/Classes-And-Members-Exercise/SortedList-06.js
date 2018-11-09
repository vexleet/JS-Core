class SortedList{
    constructor(){
        this.arr = [];
        this.size = 0;
    }

    add(element){
        this.arr.push(element);
        this.arr.sort((a, b) => a - b);
        this.size++;
        return this.arr;
    }

    remove(index){
        if (this.arr.length > index && index >= 0) {
            this.arr.splice(index, 1);
            this.arr.sort((a, b) => a - b);
            this.size--;
            return this.arr;
        }
    }

    get(index){
        if (this.arr.length > index && index >= 0) {
            return this.arr[index];
        }
    }
}