function solve(array) {
    let usernames = [];

    for(let i = 0; i < array.length; i++){
        let currentEmail = array[i].split("@");

        let alias = currentEmail[0];
        let domain = currentEmail[1].split('.');

        let currentUsername = alias + '.';
        domain.forEach(x => currentUsername += x[0]);

        usernames.push(currentUsername);
    }

    console.log(usernames.join(', '));
}

solve(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com'])