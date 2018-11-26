function getInfo(){
    let stopId = $("#stopId").val();
    let correctIds = ['1287', '1308', '1327', '2334'];

    $.get(`https://judgetests.firebaseio.com/businfo/${stopId}` + '.json')
        .then(displaySuccess)
        .catch(displayError);

    function displaySuccess(busStops){
        $("#stopName").text(busStops.name);

        for(let bus in busStops.buses){
            $("#buses").append(`<li>Bus ${bus} arrives in ${busStops.buses[bus]} minutes</li>`);
        }
    }

    function displayError() {
       $("#buses").empty();
       $("#stopName").text("Error");
    }
}