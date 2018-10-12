function solve(lostFightsCount, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let helmetCounter = 0;
    let swordCounter = 0;
    let shieldCounter = 0;
    let armorCounter = 0;

    for(let i = 1; i <= lostFightsCount; i++){
        if(i % 2 === 0){
            helmetCounter++;
        }
        if(i % 3 === 0){
            swordCounter++;
        }

        if(i % 2 === 0 && i % 3 === 0){
            shieldCounter++;
            if(shieldCounter % 2 === 0){
                armorCounter++;
            }
        }
    }

    let expenses = (helmetCounter * helmetPrice) + (swordCounter * swordPrice) + (shieldCounter * shieldPrice) + (armorCounter * armorPrice);

    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`)
}

// solve(7,
// 2,
// 3,
// 4,
// 5,
// )