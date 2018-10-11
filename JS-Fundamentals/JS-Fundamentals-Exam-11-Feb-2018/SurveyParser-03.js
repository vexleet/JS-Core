function solve(input) {
    let regex = /<svg>[\s\S]*?<cat>[\s\S]*?<text>[\s\S]*?\[([\s\S]+)\][\s\S]*?<\/text>[\s\S]*?<\/cat>[\s\S]*?<cat>([\s\S]+)<\/cat><\/svg>/g;
    let surveyRegex = /<svg>.+?<\/svg>/gm;

    let checkForSurvey = surveyRegex.exec(input);

    if(checkForSurvey){
        let checkFormat = input.match(regex);

        if(checkFormat){
            let format = regex.exec(input);

            let surveyLabel = format[1];

            let valuesRegex = /<g><val>([1-9]|10)<\/val>([0-9]+)<\/g>/g;
            let checkValues = valuesRegex.exec(input);
            let sumOfRatings = 0;
            let count = 0;

            while(checkValues){
                sumOfRatings += (Number(checkValues[1]) * Number(checkValues[2]));
                count += Number(checkValues[2]);
                checkValues = valuesRegex.exec(input);
            }

            let rating = sumOfRatings / count;
            if (count === 0) {
                console.log(`${surveyLabel}: `);
                return;
            }
            console.log(`${surveyLabel}: ${parseFloat(rating.toFixed(2))}`);
        }
        else{
            console.log("Invalid format");
        }
    }
    else{
        console.log("No survey found");
    }
}