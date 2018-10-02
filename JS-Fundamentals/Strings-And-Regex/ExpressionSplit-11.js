function solve(codeToSplit) {
    let elements = codeToSplit.split(/[(),;.\s]+/);

    console.log(elements.join('\n'))
}

solve('let sum = 4 * 4,b = "wow";')
solve('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}')