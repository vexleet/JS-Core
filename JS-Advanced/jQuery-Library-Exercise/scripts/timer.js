function timer() {
    let seconds = 0;
    let hrs = 0;
    let mnts = 0;
    let timer;

    $("#start-timer").attr("started", "false");

    $("#start-timer").on("click", function () {

        if ($("#start-timer").attr("started") === "false") {
            timer = setInterval(step, 1000);

            function step() {
                seconds += 1;

                if (seconds === 60) {
                    mnts += 1;
                    seconds = 0;
                    if (mnts === 60) {
                        hrs += 1;
                        mnts = 0;
                    }
                }

                $("#hours").text(hrs < 10 ? "0" + hrs : hrs);
                $("#minutes").text(mnts < 10 ? "0" + mnts : mnts);
                $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
            }

            $("#start-timer").attr("started", "true");
        }
    });

    $("#stop-timer").on("click", function () {
        clearInterval(timer);
        $("#start-timer").attr("started", "false");
    });

}