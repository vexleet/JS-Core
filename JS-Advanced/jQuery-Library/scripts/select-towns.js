function attachEvents() {
    $('#items li').on("click", function () {

        if($(this).attr("data-selected") === "true"){
            $(this).attr("data-selected", "false");
            $(this).css("background-color", "white");
        }
        else {
            $(this).attr("data-selected", "true");
            $(this).css("background-color", "#DDD");
        }
    });

    $("#showTownsButton").on("click", function () {
        let allTowns = $('#items li[data-selected=true]').toArray().map(li => li.textContent).join(", ");

       $("#selectedTowns").text("Selected towns: " + allTowns);
    });
}