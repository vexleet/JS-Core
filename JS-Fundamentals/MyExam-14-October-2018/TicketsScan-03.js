function solve(string, order) {
    let nameRegex = / ([A-Z][a-zA-Z]*-[A-Z][a-zA-Z]*\.-[A-Z][a-zA-Z]*|[A-Z][a-zA-Z]*-[A-Z][a-zA-Z]*) /g;
    let airportRegex = / ([A-Z]{3})\/([A-Z]{3}) /g;
    let flightNumberRegex = / ([A-Z]{1,3}[0-9]{1,5}) /g;
    let companyRegex = /- ([A-Z][a-z]*\*[A-Z][a-z]*) /g;

    if(order === "name"){
        let matchName = nameRegex.exec(string);
        if(matchName) {
            let name = matchName[0].trim().split("-").filter(x => x !== "").join(" ");

            console.log(`Mr/Ms, ${name}, have a nice flight!`)
        }
    }
    else if(order === "flight"){
        let matchAirport = airportRegex.exec(string);
        let matchFlightNumber = flightNumberRegex.exec(string);

        let fromAirport = matchAirport[1];
        let toAirport = matchAirport[2];
        let flightNumber = matchFlightNumber[1];

        console.log(`Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`)
    }
    else if(order === "company"){
        let matchCompany = companyRegex.exec(string);

        let companyName = matchCompany[1].split("*").join(" ");
        console.log(`Have a nice flight with ${companyName}.`);
    }
    else if(order === "all"){
        try {
            let matchName = nameRegex.exec(string);
            let name = matchName[0].trim().split("-").filter(x => x !== "").join(" ");

            let matchAirport = airportRegex.exec(string);
            let matchFlightNumber = flightNumberRegex.exec(string);

            let fromAirport = matchAirport[1];
            let toAirport = matchAirport[2];
            let flightNumber = matchFlightNumber[1];

            let matchCompany = companyRegex.exec(string);

            let companyName = matchCompany[1].split("*").join(" ");

            console.log(`Mr/Ms, ${name}, your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${companyName}.`)
        }
        catch (e) {

        }
    }
}