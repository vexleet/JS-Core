class BookCollection{
    constructor(shelfGenre, room, shelfCapacity){
        this.room=room;
        this.shelfGenre=shelfGenre;
        this.shelf=[];
        this.shelfCapacity = shelfCapacity;
    }

    get room(){
        return this._room;
    }

    set room(val){
        let rooms = ['livingRoom', 'bedRoom', 'closet'];
        if(!rooms.includes(val)){
            throw new Error(`Cannot have book shelf in ${val}`);
        }
        this._room=val;
    }

    addBook(bookName, bookAuthor, genre = undefined) {
        if(this.shelf.length===this.shelfCapacity){
            this.shelf.shift();
        }
        this.shelf.push({bookName,bookAuthor,genre});
        this.shelf = this.shelf.sort((a,b)=>a.bookAuthor.localeCompare(b.bookAuthor));
    }

    throwAwayBook(bookName) {
        this.shelf = this.shelf.filter((a) => a.bookName!==bookName);
    }

    showBooks(genre) {
        if(typeof genre !== 'string'){
            throw new Error("");
        }
        let books = [];

        for (let book of this.shelf) {
            if (book.genre === genre) {
                books.push(`\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"`);
            }
        }

        return `Results for search "${genre}":\n` +
            books.join("\n");
    }

    get shelfCondition(){
        return this.shelfCapacity - this.shelf.length;
    }

    toString() {
        if (this.shelf.length === 0) {
            return "It's an empty shelf";
        }
        else {
            let books = [];

            for (let book of this.shelf) {
                books.push(`\uD83D\uDCD6 "${book.bookName}" - ${book.bookAuthor}`);
            }

            return `"${this.shelfGenre}" shelf in ${this.room} contains:\n`
                + books.join("\n");
        }
    }
}

let livingRoom = new BookCollection("Programming", "livingRoom", 5)
    .addBook("Introduction to Programming with C#", "Svetlin Nakov")

console.log(livingRoom.toString());
