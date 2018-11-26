function solve() {
    let currentStop = "depot";
    let busName = undefined;
    function depart(){
        $("#depart").attr('disabled', true);

        $.get(`https://judgetests.firebaseio.com/schedule/${currentStop}` + '.json')
            .then(nextStop)
            .catch(throwError);
    }

    function nextStop(bus){
        currentStop = bus.next;
        busName = bus.name;
        $(".info").text(`Next stop ${busName}`);
        $("#arrive").attr('disabled', false);
    }
    
    function throwError() {
        $("#depart").attr('disabled', true);
        $("#arrive").attr('disabled', true);
        
        $(".info").text("Error");
    }
    
    function arrive() {
        $("#arrive").attr('disabled', true);
        $(".info").text(`Arriving at ${busName}`);
        $("#depart").attr('disabled', false);
    }

    return {
        depart,
        arrive
    };
}
let result = solve();