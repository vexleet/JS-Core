class Vacationer{
    constructor(names, cardDetails = undefined){
        let namesRegex = /^[A-Z][a-z]+$/g;
        if(names.length !== 3){
            throw new Error("Name must include first name, middle name and last name");
        }

        for(let name of names){
            let matchName = name.match(namesRegex);
            if(!matchName){
                throw new Error("Invalid full name");
            }
        }

        this.fullName = {
            firstName: names[0],
            middleName: names[1],
            lastName: names[2]
        };
        this.idNumber = this.generateIDNumber();
        if(cardDetails === undefined){
            this.creditCard = {
                cardNumber: 1111,
                expirationDate: "",
                securityNumber: 111
            }
        }
        else{
            this.creditCard = {};
            this.addCreditCardInfo(cardDetails);
        }
        this.wishList = [];
    }

    generateIDNumber(){
        let vowels = ["a", "e", "o", "i", "u"];
        let bonusNumber = "";

        if(vowels.includes(this.fullName.lastName[this.fullName.lastName.length - 1])){
            bonusNumber = "8";
        }
        else{
            bonusNumber = "7";
        }
        return 231 * this.fullName.firstName.charCodeAt(0) + 139 * this.fullName.middleName.length + bonusNumber;
    }

    addCreditCardInfo(cardInfo){
        if(cardInfo.length !== 3){
            throw new Error("Missing credit card information");
        }
        if(Number.isInteger(cardInfo[0]) === false || Number.isInteger(cardInfo[2]) === false){
            throw new Error("Invalid credit card details");
        }

        this.creditCard = {
            cardNumber: cardInfo[0],
            expirationDate: cardInfo[1],
            securityNumber: cardInfo[2]
        }
    }

    addDestinationToWishList(destination){
        if(this.wishList.includes(destination)){
            throw new Error("Destination already exists in wishlist")
        }
        this.wishList.push(destination);
        this.wishList.sort((a, b) => a.length - b.length);
    }

    getVacationerInfo(){
        return `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\n` +
            `ID Number: ${this.idNumber}\n`+
            `Wishlist:\n`+
            `${this.wishList.length === 0 ? "empty" : this.wishList.join(', ')}\n` +
            "Credit Card:\n" +
            `Card Number: ${this.creditCard.cardNumber}\n` +
            `Expiration Date: ${this.creditCard.expirationDate}\n` +
            `Security Number: ${this.creditCard.securityNumber}`;

    }
}

// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"],
    [123456789, "10/01/2018", 777]);

// Should throw an error (Invalid full name)
try {
    let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
} catch (err) {
    console.log("Error: " + err.message);
}

// Should throw an error (Missing credit card information)
try {
    let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
    vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
} catch (err) {
    console.log("Error: " + err.message);
}

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');

// Return information about the vacationers
console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());

