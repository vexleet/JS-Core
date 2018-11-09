class CheckingAccount{
    constructor(clientId, email, firstName, secondName){
        let clientRegex = /^[\d]{6}$/g;
        let emailRegex = /[A-Za-z0-9]+@[A-Za-z\.]+/g;
        let firstAndLastNameRegexForLength = /[A-Za-z]{3,20}/g;
        let firstAndLastNameRegexForChars = /[A-Za-z]+/g;

        let matchClient = clientRegex.exec(clientId);
        let matchEmail = emailRegex.exec(email);
        let matchFirstNameLength = firstName.match(firstAndLastNameRegexForLength);
        let matchLastNameLength = secondName.match(firstAndLastNameRegexForLength);
        let matchFirstNameChars = firstName.match(firstAndLastNameRegexForChars);
        let matchLastNameChars = secondName.match(firstAndLastNameRegexForChars);

        if(!matchClient){
            throw new TypeError("Client ID must be a 6-digit number");
        }
        this.clientId = clientId;

        if(!matchEmail){
            throw new TypeError("Invalid e-mail");
        }
        this.email = email;

        if(!matchFirstNameChars){
            throw new TypeError("First name must contain only Latin characters");
        }

        if(!matchFirstNameLength){
            throw new TypeError("First name must be between 3 and 20 characters long");
        }

        this.firstName = firstName;

        if(!matchLastNameChars){
            throw new TypeError("Last name must contain only Latin characters");
        }

        if(!matchLastNameLength){
            throw new TypeError("Last name must be between 3 and 20 characters long");
        }

        this.secondName = secondName;
    }
}

let acc = new CheckingAccount('423415', 'petkan@another.co.uk', 'Petkan', 'P3trov');

