function solve(input) {
    let startPoint = Number(input[0]);
    let endPoint = Number(input[1]);
    let rightWord = input[2];

    let regexForCountry = /[A-Z][a-z]+[A-Z]/g;
    let regexForNumbers = /(\d{3}\.\d+|\d{3})/g;
    let match = regexForCountry.exec(input[3]);

    let country = match[0];

    country = replaceBetween(country, startPoint, endPoint, rightWord).toLowerCase();

    let matchNumbers = regexForNumbers.exec(input[3]);

    let decodedString = "";
    while(matchNumbers){
        let currentNumber = Number(Math.ceil(matchNumbers[0]));
        decodedString += String.fromCharCode(currentNumber);
        matchNumbers = regexForNumbers.exec(input[3]);
    }

    console.log(`${capitalize(country)} => ${capitalize(decodedString)}`);

    function replaceBetween(string, start, end, what) {
        return string.substring(0, start) + what + string.substring(end + 1);
    }

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
    }
}