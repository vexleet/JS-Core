function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    let price = 0;
    let capacity = 0;

    $(".block input[placeholder='Enter product']").on("keyup", function () {
        let inputValue = $(".block input[placeholder='Enter product']").val();
        console.log(inputValue);
        if(inputValue === ""){
            $("#submit").attr('disabled', true);
        }
        else{
            $("#submit").attr('disabled', false);
        }
    });

    $("#submit").on("click", function () {
        let product = $(".block input[placeholder='Enter product']").val();
        let priceValue = Number($("#price").val());
        let quantity = Number($("#quantity").val());

        $(".display")
            .append(`<li>Product: ${product} Price: ${priceValue} Quantity: ${quantity}</li>`);

        $(".block input[placeholder='Enter product']").val('');
        $("#price").val(1);
        $("#quantity").val(1);
        $("#submit").attr('disabled', true);

        let checkIfMaxCapacity = capacity + quantity;

        if(checkIfMaxCapacity >= 150){
            $("#capacity").val('full');
            $("#capacity").attr('class', 'fullCapacity');
            $(".block input[placeholder='Enter product']").attr('disabled', true);
            $("#submit").attr('disabled', true);
            $("#price").attr('disabled', true);
            $("#quantity").attr('disabled', true);
            return;
        }

        capacity += quantity;
        price += priceValue;

        $("#capacity").val(capacity);
        $("#sum").val(price);
    });
}