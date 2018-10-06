function solve(input) {
    let pattern = /\d+/g;
    let result = [];

    for (let i = 0; i < input.length; i++) {
        let match = pattern.exec(input[i]);

        while(match){
            result.push(match);
            match = pattern.exec(input[i]);
        }
    }

    console.log(result.join(" "));
}

solve(['123a456',
    '789b987',
    '654c321',
    '0']
)