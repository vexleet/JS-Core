function solve(input) {
    let racers = input[0].split(" ");

    for (let i = 1; i < input.length; i++) {
        let [action, pilot] = input[i].split(" ");

        switch (action) {
            case "Join":
                if (!racers.includes(pilot)) {
                    racers.push(pilot);
                }
                break;
            case "Crash":
                if (racers.includes(pilot)){
                    let indexOfPilot = racers.indexOf(pilot);
                    if(indexOfPilot > - 1) {
                        racers.splice(indexOfPilot, 1);
                    }
                }
                break;
            case "Pit":
                if(racers.includes(pilot)){
                    let indexOfPilot = racers.indexOf(pilot);
                    if(indexOfPilot > - 1) {
                        racers.splice(indexOfPilot, 1);
                    }


                    racers.splice(indexOfPilot + 1, 0, pilot);
                }
                break;
            case "Overtake":
                if(racers.includes(pilot)){
                    let indexOfPilot = racers.indexOf(pilot);
                    if(indexOfPilot > - 1) {
                        racers.splice(indexOfPilot, 1);
                    }

                    if(indexOfPilot - 1 !== - 1) {
                        indexOfPilot -= 1;
                    }

                    racers.splice(indexOfPilot , 0, pilot);
                }
                break;
        }
    }

    console.log(racers.join(" ~ "));
}

// solve(["Vetel Hamilton Slavi",
//     "Pit Hamilton",
//     "Overtake Vetel",
//     "Crash Slavi"]
// )