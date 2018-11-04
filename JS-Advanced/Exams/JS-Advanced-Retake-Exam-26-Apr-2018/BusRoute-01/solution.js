function busRoute() {
    let firstStop = $("#enter-stops input[name=first-stop]").val();
    let lastStop = $("#enter-stops input[name=last-stop]").val();

    let allBusStops = $("#bus-stops li").toArray();

    if(firstStop !== "" && lastStop !== ""){
        if(lastStop > allBusStops.length){
            return;
        }

        let selectedRoutes = $("#selected-bus-stops");
        selectedRoutes.empty();

        $("#selected-route span").text(`${firstStop}-${lastStop}`);
        for(let i = firstStop - 1; i <= lastStop - 1; i++){
            selectedRoutes.append(`<li>${allBusStops[i].textContent}</li>`);
        }

        $("#enter-stops input[name=first-stop]").val("");
        $("#enter-stops input[name=last-stop]").val("");
    }
}