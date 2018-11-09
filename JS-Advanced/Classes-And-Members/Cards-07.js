let result = (function () {

    let Suits = {
        CLUBS: "\u2663",
        DIAMONDS: "\u2666",
        HEARTS: "\u2665",
        SPADES: "\u2660"
    };

    class Card{
        constructor(face, suit){
            this.face = face;
            this.suit = suit;
        }

        set face(face){
            let faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

            if(faces.includes(face)){
                this._face = face;
            }
            else{
                throw new Error("Invalid face");
            }
        }

        get face(){
            return this._face;
        }

        set suit(suit){
            if(!Object.keys(Suits).map(k => Suits[k]).includes(suit)) {
                throw new Error("Invalid suit")
            }
            this._suit = suit;
        }

        get suit(){
            return this._suit;
        }
    }

    return {
        Suits: Suits,
        Card: Card
    }
}());

let Card = result.Card;
let Suits = result.Suits;

let card = new Card("Q", Suits.CLUBS);
card.face = "A";
card.suit = Suits.DIAMONDS;

let card2 = new Card("A", Suits.Aasd);
console.log(card2);

