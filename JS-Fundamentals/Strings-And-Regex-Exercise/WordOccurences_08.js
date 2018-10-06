function solve(text, keyWord) {
    let regex = new RegExp("\\b" + keyWord + "\\b", 'gi');
    let match = text.match(regex);

    if(match){
        console.log(match.length);
    }
    else{
        console.log(0);
    }
}

solve('The waterfall was so high, that the child couldn’t see its peak.',
    'the'
)
solve('How do you plan on achieving that? How? How can you even think of that?',
    'how'
)
solve('There was one. Therefore I bought it. I wouldn’t buy it otherwise.',
    'there'
)