class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        if (room === "livingRoom" || room === "bedRoom" || room ==="closet") {
            this.shelfGenre = shelfGenre;
            this.room = room;
            this.shelfCapacity = Number(shelfCapacity);
            this.shelf = [];
            return;
        }
        throw new Error(`Cannot have book shelf in ${room}`);
    }

    addBook(bookName, bookAuthor, genre = undefined) {
        if (this.shelf.length === this.shelfCapacity) {
            this.shelf.shift();
        }

        this.shelf.push({
            bookName: bookName,
            bookAuthor: bookAuthor,
            genre: genre
        });

        this.shelf = this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
    }

    throwAwayBook(bookToRemove) {
        this.shelf = this.shelf.filter(x => x.bookName !== bookToRemove);
    }

    showBooks(genre) {
        let books = [];

        for (let book of this.shelf) {
            if (book.genre === genre) {
                books.push(`\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"`);
            }
        }

        return `Results for search "${genre}":\n` +
            books.join("\n");
    }

    get shelfCondition() {
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

let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
bedRoom.addBook("John Adams", "David McCullough", "history");
bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
bedRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
bedRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");
console.log("Shelf's capacity: " + bedRoom.shelfCondition);
console.log(bedRoom.showBooks("history"));
