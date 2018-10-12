function solve(input) {
    let gladiators = new Map();

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "Ave Cesar") {
            break;
        }

        if (input[i].includes(" vs ")) {
            try {
                let [firstGladiator, secondGladiator] = input[i].split(" vs ");

                if (gladiators.has(firstGladiator) && gladiators.has(secondGladiator)) {
                    gladiators.get(firstGladiator).forEach((value, key) => {
                        if (gladiators.get(secondGladiator).has(key)) {
                            if (gladiators.get(secondGladiator).get(key) > gladiators.get(firstGladiator).get(key)) {
                                gladiators.delete(firstGladiator);
                            }
                            else if (gladiators.get(secondGladiator).get(key) < gladiators.get(firstGladiator).get(key)) {
                                gladiators.delete(secondGladiator);
                            }
                        }
                    });
                }
            }
            catch (e) {

            }
        }
        else {
            let [gladiatorName, gladiatorSkill, skillPower] = input[i].split(" -> ");

            if (!gladiators.has(gladiatorName)) {
                gladiators.set(gladiatorName, new Map());
                gladiators.get(gladiatorName).set(gladiatorSkill, skillPower);
            }
            else {
                if (gladiators.get(gladiatorName).has(gladiatorSkill)) {
                    if (gladiators.get(gladiatorName).get(gladiatorSkill) < skillPower) {
                        gladiators.get(gladiatorName).set(gladiatorSkill, skillPower);
                    }
                }
                else {
                    gladiators.get(gladiatorName).set(gladiatorSkill, skillPower);
                }
            }
        }
    }

    let mapAsc = new Map([...gladiators.entries()].sort((a, b) => {
        return sum(Object.values(b)[1]) - sum(Object.values(a)[1]) || a[0].localeCompare(b[0]);
    }));

    mapAsc.forEach((value, key) => {
        let totalSkill = sum(value);

        console.log(`${key}: ${totalSkill} skill`);

        let sortSkills = new Map([...value.entries()].sort((a, b) => {
            return b[1] - a[1] || a[0].localeCompare(b[0]);
        }));

        sortSkills.forEach((gladiatorSkillPower, gladiatorSkill) => {
            console.log(`- ${gladiatorSkill} <!> ${gladiatorSkillPower}`);
        })

    });

    function sum(object) {
        let total = 0;
        for (let property of object.values()) {
            total += Number(property);
        }
        return total;
    }
}