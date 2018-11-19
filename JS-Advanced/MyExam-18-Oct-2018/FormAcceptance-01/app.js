function acceptance() {
    let companyName = $("#fields input[name=shippingCompany]").val();
    let product = $("#fields input[name=productName]").val();
    let quantity = Number($("#fields input[name=productQuantity]").val());
    let scrape = Number($("#fields input[name=productScrape]").val());

    if(companyName !== '' && product !== ''
        && isNaN(quantity) === false && isNaN(scrape) === false){
        if(quantity >= scrape && quantity - scrape > 0){
            let div = $("<div>");
            let button = $("<button type='button'>Out of stock</button>");

            div.append(`<p>[${companyName}] ${product} - ${quantity - scrape} pieces</p>`);
            button.on('click', function () {
                this.parentNode.remove();
            });

            div.append(button);

            $("#warehouse").append(div);

            $("#fields input[name=shippingCompany]").val('');
            $("#fields input[name=productQuantity]").val('');
            $("#fields input[name=productName]").val('');
            $("#fields input[name=productScrape]").val('')
        }
    }
}