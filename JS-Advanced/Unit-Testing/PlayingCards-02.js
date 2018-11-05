function makeCard(face, suit){
    let faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let suits = ["S", "H", "D", "C"];

    if(!faces.includes(face)){
        throw new Error("Error");
    }
    if(!suits.includes(suit)){
        throw new Error("Error");
    }

    let card = {
        face: face,
        suit: suit,
        toString: () => {
            let utfSuits = ["\u2660".toString(), "\u2665".toString(), "\u2666".toString(), "\u2663".toString()];
            let indexOfSuit = suits.indexOf(suit);

            return `${face}${utfSuits[indexOfSuit]}`;
        }
    };

    return card;
}

console.log('' + makeCard('A', 'S'));
console.log('' + makeCard('2', 'S'));