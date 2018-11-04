function addDestination() {
    let city = $("#input .inputData:even").val();
    let country = $("#input .inputData:odd").val();
    let season = $("#input #seasons option:selected").text();



    if(city !== "" && country !== ""){
        let tr = $("<tr>")
            .append(`<td>${city}, ${country}</td>`)
            .append(`<td>${season}</td>`);

        $("#destinations")
            .append(tr);

        switch (season) {
            case "Summer":
                $("#summer").val(Number($("#summer").val()) + 1);
                break;
            case "Spring":
                $("#spring").val(Number($("#spring").val()) + 1);
                break;
            case "Winter":
                $("#winter").val(Number($("#winter").val()) + 1);
                break;
            case "Autumn":
                $("#autumn").val(Number($("#autumn").val()) + 1);
                break;
        }

        $("#input .inputData:even").val("");
        $("#input .inputData:odd").val("");
    }
}