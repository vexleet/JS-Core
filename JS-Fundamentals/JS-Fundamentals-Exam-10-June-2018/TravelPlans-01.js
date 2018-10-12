function solve(input) {
    let specializedActivities = ["Programming", "Hardware maintenance", "Cooking", "Translating", "Designing"];
    let averageActivities = ["Driving", "Managing", "Fishing", "Gardening"];
    let clumsyActivities = ["Singing", "Accounting", "Teaching", "Exam-Making", "Acting", "Writing", "Lecturing", "Modeling", "Nursing"];

    let specializedActivitiesCounter = 0;
    let clumsyActivitiesCounter = 0;
    let goldMade = 0;

    for(let i = 0; i < input.length; i++){
        let [proffesion, goldOffered] = input[i].split(" : ");

        goldOffered = Number(goldOffered);

        if(specializedActivities.includes(proffesion)){
            if(goldOffered < 200){
                continue;
            }
            specializedActivitiesCounter++;

            goldOffered -= (goldOffered * 0.2);

            if(specializedActivitiesCounter % 2 === 0){
                goldOffered += 200;
            }
        }
        else if(clumsyActivities.includes(proffesion)){
            clumsyActivitiesCounter++;

            if(clumsyActivitiesCounter % 2 === 0){
                goldOffered -= (goldOffered * 0.05);
            }
            else if(clumsyActivitiesCounter % 3 === 0){
                goldOffered -= (goldOffered * 0.1);
            }
        }

        goldMade += goldOffered;
    }

    console.log(`Final sum: ${goldMade.toFixed(2)}`);

    if(goldMade < 1000){
        let moneyNeeded = 1000 - goldMade;
        console.log(`Mariyka need to earn ${moneyNeeded.toFixed(2)} gold more to continue in the next task.`)
    }
    else{
        let moneyLeft = goldMade - 1000;
        console.log(`Mariyka earned ${moneyLeft.toFixed(2)} gold more.`)
    }
}

solve(["Programming : 500", "Driving : 243.55", "Acting : 200", "Singing : 100", "Cooking : 199", "Hardware maintenance : 800", "Gardening : 700", "Programming : 500"])