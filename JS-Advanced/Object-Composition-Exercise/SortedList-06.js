function solve() {
    let obj = (() => {
            let arr = [];
            let add = function (element) {
                arr.push(element);
                arr.sort((a, b) => a - b);
                this.size++;
                return arr;
            };

            let remove = function (index) {
                if (arr.length > index && index >= 0) {
                    arr.splice(index, 1);
                    arr.sort((a, b) => a - b);
                    this.size--;
                    return arr;
                }
            };

            let get = function (index) {
                if (arr.length > index && index >= 0) {
                    return arr[index];
                }
            };
            
            let size = 0;
            return {add, remove, get, size};
        }
    )();

    return obj;
}