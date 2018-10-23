function myFunc() {
    let summary = {};

    for(let i = 0; i < arguments.length; i++){
        let obj = arguments[i];
        let type = typeof arguments[i];
        console.log(`${type}: ${obj}`);

        if(!summary[type]){
            summary[type] = 1;
        }
        else{
            summary[type]++;
        }
    }

    let sortedTypes = [];
        for(let currentType in summary){
        sortedTypes.push([currentType, summary[currentType]]);
    }

    sortedTypes.sort((a, b) => {
        return b[1] - a[1];
    });

    for(let type of sortedTypes){
        console.log(`${type[0]} = ${type[1]}`);
    }
}

myFunc('cat', 42, function () { console.log('Hello world!'); })