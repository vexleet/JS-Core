function attachEvents(){
    const serviceUrl = "https://judgetests.firebaseio.com/";

    $("#submit").click(getWeather);

    function getWeather() {
        $("#forecast").css("display", "none");
        let inputWeather = $("#location").val();

        $.get(serviceUrl + 'locations.json')
            .then(parseData)
            .catch(handleError);

        function parseData(codes){
            let code = undefined;

            for(let loc of codes){
                if(loc.name === inputWeather){
                    code = loc.code;
                    break;
                }
            }

            if(code === undefined){
                throw new Error("");
            }

            Promise.all([
                $.get(serviceUrl + `forecast/today/${code}.json`),
                $.get(serviceUrl + `forecast/upcoming/${code}.json`)
            ])
                .then(handleForecast)
                .catch(handleError);
        }

        function handleForecast([today, upcoming]) {
            $("#current").empty();
            $("#current").append('<div class="label">Current conditions</div>');
            
            $("#upcoming").empty();
            $("#upcoming").append('<div class="label">Three-day forecast</div>');

            let weatherSymbols = {
                "Sunny": '&#x2600',
                "Partly sunny": '&#x26C5',
                'Overcast': '&#x2601',
                'Rain': '&#x2614',
                'Degrees': '&#176'
            };

            let todayInfo = today.forecast;
            let upcomingInfo = upcoming.forecast;

            $("#forecast").css("display", "block");

            let spanCondition = $("<span>").attr('class', 'condition');

            spanCondition
                .append(`<span class="forecast-data">${today.name}</span>`)
                .append(`<span class="forecast-data">${todayInfo.low}°/${todayInfo.high}°</span>`)
                .append(`<span class="forecast-data">${todayInfo.condition}</span>`);

            $("#current")
                .append(`<span class="condition symbol">${weatherSymbols[todayInfo.condition]}</span>`)
                .append(spanCondition);

            for(let day of upcomingInfo){
                let spanUpcoming = $("<span>").attr('class', 'upcoming');

                spanUpcoming
                    .append(`<span class="symbol">${weatherSymbols[day.condition]}</span>`)
                    .append(`<span class="forecast-data">${day.low}°/${day.high}°</span>`)
                    .append(`<span class="forecast-data">${day.condition}</span>`);

                $("#upcoming")
                    .append(spanUpcoming);
            }
        }

        function handleError(err){
            $("#forecast").text('Error');
            $("#forecast").show();
        }
    }
}