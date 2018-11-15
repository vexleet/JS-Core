function addProduct() {
    let product = $("#add-product input[type=text]").val();
    let price = $("#add-product input[type=number]").val();

    if(product !== "" && price !== ""){
        let createTr = $("<tr>")
            .append(`<td>${product}</td>`)
            .append(`<td>${price}</td>`);

        $("#product-list").append(createTr);

        let getAllPrices = $("#product-list tr td:odd").toArray().map(x => Number(x.textContent));
        let total = getAllPrices.reduce((a, b) => a + b);

        $("#bill tfoot > tr td:odd").text(total);

        $("#add-product input[type=text]").val("");
        $("#add-product input[type=number]").val("");
    }
}