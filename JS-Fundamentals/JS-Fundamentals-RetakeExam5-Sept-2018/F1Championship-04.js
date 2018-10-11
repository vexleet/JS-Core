function solve(input) {
    let pilots = new Map();

    for (let i = 0; i < input.length; i++) {
        let [teamName, pilotName, pilotPoints] = input[i].split(" -> ");

        if (!pilots.has(teamName)) {
            pilots.set(teamName, new Map());
        }

        if (pilots.get(teamName).has(pilotName)) {
            pilots.get(teamName).set(pilotName, pilots.get(teamName).get(pilotName) + Number(pilotPoints));
        }
        else {
            pilots.get(teamName).set(pilotName, Number(pilotPoints));
        }
    }

    let sort = new Map([...pilots.entries()].sort((a, b) => {
        return sum(Object.values(b)[1]) - sum(Object.values(a)[1])
    }));

    let counter = 0;

    sort.forEach((value, key) => {
        if (counter === 3) {
            return;
        }
        console.log(`${key}: ${sum(value)}`);

        let sortPilots = new Map([...value.entries()].sort((a, b) => {
            return b[1] - a[1];
        }));

        sortPilots.forEach((pilotPoints, pilotName) => {
            console.log(`-- ${pilotName} -> ${pilotPoints}`);
        });

        counter++;
    });

    function sum(object) {
        let total = 0;
        for (let property of object.values()) {
            total += Number(property);
        }
        return total;
    }
}

// solve(["Ferrari -> Kimi Raikonnen -> 25",
//     "Ferrari -> Sebastian Vettel -> 16",
//     "Mercedes -> Lewis Hamilton -> 10",
//     "Mercedes -> Valteri Bottas -> 8",
//     "Red Bull -> Max Verstapen -> 6",
//     "Red Bull -> Daniel Ricciardo -> 4",
//     "asdl -> Max Verstapen -> 6",
//     "asdl -> Daniel Ricciardo -> 10"]
// )