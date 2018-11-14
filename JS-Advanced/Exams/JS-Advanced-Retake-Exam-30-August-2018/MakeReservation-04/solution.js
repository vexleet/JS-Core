function makeReservation(selector) {
    function editInformation() {
        let getAllInformation = $('.preview #infoPreview li');

        $("#fullName").val(getAllInformation[0].textContent.split(" ").slice(1).join(" "));
        $("#email").val(getAllInformation[1].textContent.split(" ").slice(1).join(" "));
        $("#phoneNumber").val(getAllInformation[2].textContent.split(" ").slice(1).join(" "));
        $("#address").val(getAllInformation[3].textContent.split(" ").slice(1).join(" "));
        $("#postalCode").val(getAllInformation[4].textContent.split(" ").slice(2).join(" "));

        $(".preview #infoPreview").empty();

        $("#submit").attr('disabled', false);
        $("#edit").attr('disabled', true);
        $("#edit").off();
        $('#continue').attr('disabled', true);
        $("#continue").off();
    }

    function changeData() {
        let selectedOption = $(this).find(":selected").text();

        if (selectedOption === 'Credit Card') {
            $('#extraDetails').empty();
            let inputLabelForCardNumber = $("<div class='inputLabel'></div>")
                .append("Card Number")
                .append("<input>");

            let inputLabelForExpDate = $("<div class='inputLabel'></div>")
                .append("Expiration Date")
                .append("<input>");

            let inputLabelForSecurityNumber = $("<div class='inputLabel'></div>")
                .append("Security Numbers")
                .append("<input>");

            $("#extraDetails")
                .append(inputLabelForCardNumber)
                .append("<br>")
                .append(inputLabelForExpDate)
                .append("<br>")
                .append(inputLabelForSecurityNumber)
                .append("<br>");
        }
        else if (selectedOption === 'Bank Transfer') {
            $('#extraDetails').empty();
            let data = $("<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>");

            $("#extraDetails")
                .append(data);
        }

        $('#extraDetails')
            .append("<button id='checkOut'>Check Out</button>");

        $("#checkOut").on("click", function () {
            $("#wrapper").empty();
            $("#wrapper")
                .append("<h4>Thank you for your reservation!</h4>")
        });
    }

    function generateInformation() {
        $("#edit").attr('disabled', true);
        $('#continue').attr('disabled', true);

        $(selector).append(`<h2>Payment details</h2>`);

        let selectButton = $("<select>");
        selectButton.attr('id', 'paymentOptions');
        selectButton.addClass("custom-select");

        selectButton
            .append("<option selected disabled hidden>Choose</option>")
            .append("<option value='creditCard'>Credit Card</option>")
            .append("<option value='bankTransfer'>Bank Transfer</option>");

        selectButton.change(changeData);

        $(selector).append(selectButton);
        $(selector).append("<div id='extraDetails'></div>");
    }

    $("#submit").on("click", function () {
        let fullName = $("#fullName").val();
        let email = $("#email").val();
        let phoneNumber = $("#phoneNumber").val();
        let address = $("#address").val();
        let postalCode = $("#postalCode").val();

        if (fullName !== '' && email !== '') {
            let information = [fullName, email, phoneNumber, address, postalCode];
            let text = ["Name: ", "E-mail: ", "Phone: ", "Address: ", "Postal Code: "];

            for (let i = 0; i < information.length; i++) {
                $(".preview #infoPreview").append(`<li>${text[i]}${information[i]}</li>`);
            }

            $("#fullName").val('');
            $("#email").val('');
            $("#phoneNumber").val('');
            $("#address").val('');
            $("#postalCode").val('');

            $("#submit").attr('disabled', true);
            $("#edit").attr('disabled', false);
            $('#continue').attr('disabled', false);

            $("#edit").on("click", editInformation);
            $('#continue').on("click", generateInformation);
        }
    });
}