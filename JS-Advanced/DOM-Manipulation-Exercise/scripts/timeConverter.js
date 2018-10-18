function attachEventsListeners() {
    document.getElementById("daysBtn").addEventListener("click", function () {
        let days = parseInt(document.getElementById("days").value, 10);

        let hrs = days * 24;
        let mnts = hrs * 60;
        let seconds = mnts * 60;

        changeValues(days, hrs, mnts, seconds);
    });

    document.getElementById("hoursBtn").addEventListener("click", function () {
        let hrs = parseInt(document.getElementById("hours").value, 10);

        let days = hrs / 24;
        let mnts = hrs * 60;
        let seconds = mnts * 60;

        changeValues(days, hrs, mnts, seconds);
    });

    document.getElementById("minutesBtn").addEventListener("click", function () {
        let mnts = parseInt(document.getElementById("minutes").value, 10);

        let hrs = mnts / 60;
        let days = hrs / 24;
        let seconds = mnts * 60;

        changeValues(days, hrs, mnts, seconds);
    });

    document.getElementById("secondsBtn").addEventListener("click", function () {
        let seconds = parseInt(document.getElementById("seconds").value, 10);

        let days = seconds / (3600 * 24);
        let hrs = Math.floor(seconds / 3600);
        let mnts = Math.floor(seconds / 60);

        changeValues(days, hrs, mnts, seconds);
    });

    function changeValues(days, hours, minutes, seconds) {
        document.getElementById("days").value = days;
        document.getElementById("hours").value = hours;
        document.getElementById("minutes").value = minutes;
        document.getElementById("seconds").value = seconds;
    }
}