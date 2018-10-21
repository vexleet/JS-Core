function domSearch(selector, isCaseSensitive) {
    let addControls = $('<div>')
        .addClass('add-controls')
        .append($('<label>').text('Enter text:').append($('<input>')))
        .append($('<a>')
            .addClass('button')
            .css('display', 'inline-block')
            .text('Add')
            .click(addItem));

    let searchControls = $('<div>')
        .addClass('search-controls')
        .append($('<label>').text('Search:').append($('<input>')
            .on('input', searchItem)));

    $(selector).append(addControls).append(searchControls);

    console.log($('.add-controls').text());;

    let divResultControls = $("<div>");
    let ulItems = $("<ul>");

    divResultControls.addClass("result-controls");
    ulItems.addClass("items-list");

    divResultControls.append(ulItems);
    $(selector).append(addControls).append(searchControls).append(divResultControls);

    function searchItem() {
        let allItems = $(".items-list li strong").toArray();
        let searchFor = $(".search-controls label input").val();

        for(let item of allItems){
            let li = $(item).parent();
            if(isCaseSensitive){
                if (item.textContent.indexOf(searchFor) < 0) {
                    li.css('display', 'none')
                } else {
                    li.css('display', 'block')
                }
            }
            else{
                if (item.textContent.toLowerCase().indexOf(searchFor) < 0) {
                    li.css('display', 'none')
                } else {
                    li.css('display', 'block')
                }
            }
        }
    }

    function removeItem() {
        let item = $(this).parent();
        item.remove();
    }

    function addItem(){
        let text = $(".add-controls label input").val();
        $(".items-list").append(makeLi(text))
    }

    function makeLi(text){
        let liItem = $("<li>");
        let xButton = $("<a>X</a>");

        liItem.addClass("list-item");
        xButton.addClass("button")
        xButton.on("click", removeItem);
        liItem.append(xButton).append(`<strong>${text}</strong>`);

        return liItem;
    }
}