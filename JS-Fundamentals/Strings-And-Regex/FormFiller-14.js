function solve(username, email, phoneNumber, arrayOfStrings) {
    for(let element of arrayOfStrings){
        element = element.replace(/<![A-Za-z]+!>/g, username);
        element = element.replace(/<@[A-Za-z]+@>/g, email);
        element = element.replace(/<\+[A-Za-z]+\+>/g, phoneNumber);

        console.log(element);
    }
}

solve('Pesho',
    'pesho@softuni.bg',
    '90-60-90',
    ['Hello, <!username!>!',
        'Welcome to your Personal profile.',
        'Here you can modify your profile freely.',
        'Your current username is: <!fdsfs!>. Would you like to change that? (Y/N)',
        'Your current email is: <@DasEmail@>. Would you like to change that? (Y/N)',
        'Your current phone number is: <+number+>. Would you like to change that? (Y/N)']
)