function solve(input) {
    let usernames = new Set();

    for(let currentUsername of input){
        usernames.add(currentUsername);
    }

    let test = Array.from(usernames);

    test.sort((a, b) => {
        return a.length - b.length || a.localeCompare(b);
    });

    test.forEach(x => console.log(x))
}

solve(['Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston']
)