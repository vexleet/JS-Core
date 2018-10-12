function solve(input) {
    let delimiter = input[1];
    let companies = input[0].split(delimiter).map(x => x.trim());

    let validSentences = [];
    let invalidSentences = [];

    for(let i = 2; i < input.length; i++){
        let currentSentence = input[i].toLowerCase();

        let isValidCounter = 0;

        companies.forEach(x => {
            if(currentSentence.includes(x.toLowerCase())){
                isValidCounter++;
            }
        });

        if(isValidCounter === companies.length){
            validSentences.push(currentSentence);
        }
        else{
            invalidSentences.push(currentSentence);
        }
    }

    if(validSentences.length > 0){
        console.log("ValidSentences");
        let count = 1;
        validSentences.forEach(x => {
            console.log(`${count}. ${x}`);
            count++;
        });
    }
    if(invalidSentences.length > 0){
        if(validSentences.length > 0) {
            console.log("=".repeat(30));
        }
        console.log("InvalidSentences");
        let count = 1;
        invalidSentences.forEach(x => {
            console.log(`${count}. ${x}`);
            count++;
        });
    }
}
//
// solve(["bulgariatour@, minkatrans@, koftipochivkaltd",
//     "@,",
//     "Mincho  e KoftiPockivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
//     "We will koftipochivkaLTD travel e expenses no MinkaTrans mu e BulgariaTour",
//     "dqdo BuLGariaTOUR mraz some text but is KoftiPochivkaLTD minkaTRANS"]
// )