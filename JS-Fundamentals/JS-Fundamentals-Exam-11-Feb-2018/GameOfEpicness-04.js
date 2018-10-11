function solve(generals, battles) {
    let kingdoms = new Map();

    for (let obj of generals) {
        let currentKingdom = obj["kingdom"];
        let currentGeneral = obj["general"];
        let currentArmy = obj["army"];

        if (!kingdoms.has(currentKingdom)) {
            kingdoms.set(currentKingdom, new Map());
            kingdoms.get(currentKingdom).set(currentGeneral, new Map([["army", currentArmy], ["wins", 0], ["losses", 0]]));
        }
        else {
            if (kingdoms.get(currentKingdom).has(currentGeneral)) {
                kingdoms.get(currentKingdom).get(currentGeneral).set("army", kingdoms.get(currentKingdom).get(currentGeneral).get("army") + currentArmy);
            }
            else {
                kingdoms.get(currentKingdom).set(currentGeneral, new Map([["army", currentArmy], ["wins", 0], ["losses", 0]]));
            }
        }
    }

    for (let obj of battles) {
        let attackingKingdom = obj[0];
        let attackingGeneral = obj[1];
        let defendingKingdom = obj[2];
        let defendingGeneral = obj[3];

        if (attackingKingdom !== defendingKingdom) {
            let attackingKingdomArmy = kingdoms.get(attackingKingdom).get(attackingGeneral).get("army");
            let defendingKingdomArmy = kingdoms.get(defendingKingdom).get(defendingGeneral).get("army");

            if (attackingKingdomArmy > defendingKingdomArmy) {
                kingdoms.get(attackingKingdom).get(attackingGeneral).set("wins", kingdoms.get(attackingKingdom).get(attackingGeneral).get("wins") + 1);
                kingdoms.get(attackingKingdom).get(attackingGeneral).set("army", Math.floor(attackingKingdomArmy + attackingKingdomArmy * 0.1));
                kingdoms.get(defendingKingdom).get(defendingGeneral).set("losses", kingdoms.get(defendingKingdom).get(defendingGeneral).get("losses") + 1);
                kingdoms.get(defendingKingdom).get(defendingGeneral).set("army", Math.floor(defendingKingdomArmy - defendingKingdomArmy * 0.1));
            }
            else if (attackingKingdomArmy < defendingKingdomArmy) {
                kingdoms.get(attackingKingdom).get(attackingGeneral).set("losses", kingdoms.get(attackingKingdom).get(attackingGeneral).get("losses") + 1);
                kingdoms.get(attackingKingdom).get(attackingGeneral).set("army", Math.floor(attackingKingdomArmy - attackingKingdomArmy * 0.1));
                kingdoms.get(defendingKingdom).get(defendingGeneral).set("wins", kingdoms.get(defendingKingdom).get(defendingGeneral).get("wins") + 1);
                kingdoms.get(defendingKingdom).get(defendingGeneral).set("army", Math.floor(defendingKingdomArmy + defendingKingdomArmy * 0.1));
            }
        }
    }

    let mapAsc = new Map([...kingdoms.entries()].sort((a, b) => {
        return sum(Object.values(b)[1], "wins") - sum(Object.values(a)[1], "wins")
            || sum(Object.values(a)[1], "losses") - sum(Object.values(b)[1], "losses")
            || a[0].localeCompare(b[0]);
    }));

    let winner = mapAsc.keys().next().value;

    console.log(`Winner: ${winner}`);
    let sortGenerals = new Map([...mapAsc.get(winner).entries()].sort((a, b) => {
        return  b[1].get("army") - a[1].get("army");
    }));

    sortGenerals.forEach((value, key) => {
        console.log(`/\\general: ${key}`);
        value.forEach((a, b) => {
            console.log(`---${b}: ${a}`);
        })
    });

    function sum(object, orderBy) {
        let total = 0;
        if (orderBy === "wins") {
            for (let property of object.values()) {
                total += Number(property.get("wins"));
            }
        }
        else {
            for (let property of object.values()) {
                total += Number(property.get("losses"));
            }
        }
        return total;
    }
}