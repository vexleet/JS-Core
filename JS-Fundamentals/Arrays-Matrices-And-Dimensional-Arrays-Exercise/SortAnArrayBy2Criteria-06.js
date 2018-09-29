function solve(array) {
    array.sort((a, b) => {
        if(a.length - b.length === 0){
            return a.localeCompare(b);
        }
        return a.length - b.length;
    });

    array.forEach(x => console.log(x));
}

solve(['alpha',
    'beta',
    'gamma']
);

solve(['Isacc',
    'Theodor',
    'Jack',
    'Harrison',
    'George']

);

solve(['test',
    'Deny',
    'omen',
    'Default']
)