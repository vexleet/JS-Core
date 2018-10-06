function solve(text, substring) {
    if(text.startsWith(substring)){
        console.log(true);
    }
    else{
        console.log(false);
    }
}

solve('How have you been?', 'how')