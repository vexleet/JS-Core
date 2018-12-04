function attachEvents() {
    const host = "https://baas.kinvey.com/appdata/kid_rJGj3-xJN/books";
    const auth = {'Authorization': `Basic ${btoa("guest:guest")}`, "Content-type": "application/json"};

    $(".load").click(getBooks);
    $(".add").click(addBook);

    function getBooks() {
        $.ajax({
            url: host,
            headers: auth,
        })
            .then(parseData);

        function parseData(books) {
            $("#books").empty();

            for(let book of books){
                let div = $(`<div class="book" data-id="${book._id}">
                    <label>Title</label>
                    <input type="text" class="title" value="${book.title}"/>
                    <label>Author</label>
                    <input type="text" class="author" value="${book.author}"/>
                    <label>ISBN</label>
                    <input type="text" class="isbn" value="${book.isbn}"/>
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                    </div>`);

                $(div).find(".delete").click(deleteBook);
                $(div).find(".update").click(updateBook);

                $("#books").append(div);
            }
        }
    }

    function addBook(){
        let title = $(this.parentNode).find(".title").val();
        let author = $(this.parentNode).find(".author").val();
        let isbn = $(this.parentNode).find(".isbn").val();

        let newBookBody = {
            title,
            author,
            isbn
        };

        $.ajax({
            method: "POST",
            url: host,
            headers: auth,
            data: JSON.stringify(newBookBody)
        })
            .then(getBooks);

        for(let input of $(this.parentNode).find("input")){
            $(input).val('');
        }
    }

    function updateBook(){
        console.log(true);
        let bookId = $(this.parentNode).data("id");

        let title = $(this.parentNode).find(".title").val();
        let author = $(this.parentNode).find(".author").val();
        let isbn = $(this.parentNode).find(".isbn").val();

        let bookBody = {
            title,
            author,
            isbn
        };

        console.log(bookBody);

        $.ajax({
            url: host + `/${bookId}`,
            method: "PUT",
            data: JSON.stringify(bookBody),
            headers: auth,
        })
            .then(getBooks);
    }

    function deleteBook(){
        let bookId = $(this.parentNode).data("id");

        $.ajax({
            url: host + `/${bookId}`,
            method: "DELETE",
            headers: auth,
        })
            .then(getBooks);
    }
}