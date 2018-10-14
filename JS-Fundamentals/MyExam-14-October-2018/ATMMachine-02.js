function solve(input) {
    let moneyInATM = [];

    for (let i = 0; i < input.length; i++) {
        let currentCommand = input[i];

        if (currentCommand.length === 1) {
            let banknoteToCount = Number(currentCommand[0]);
            let banknotes = moneyInATM.filter(x => x === banknoteToCount);

            console.log(`Service Report: Banknotes from ${banknoteToCount}$: ${banknotes.length}.`);
        }
        else if (currentCommand.length > 2) {
            currentCommand.map(Number).forEach(x => {
                moneyInATM.push(x);
            });

            let insertedCashSum = currentCommand.reduce((a, b) => a + b, 0);
            let ATMBalance = moneyInATM.reduce((a, b) => a + b, 0);

            console.log(`Service Report: ${insertedCashSum}$ inserted. Current balance: ${ATMBalance}$.`);
        }
        else if (currentCommand.length === 2) {
            let accountBalance = Number(currentCommand[0]);
            let moneyToWithdraw = Number(currentCommand[1]);

            if (accountBalance < moneyToWithdraw) {
                console.log(`Not enough money in your account. Account balance: ${accountBalance}$.`);
                continue;
            }
            let ATMBalance = moneyInATM.reduce((a, b) => a + b, 0);

            if (ATMBalance < moneyToWithdraw) {
                console.log('ATM machine is out of order!');
            }
            else {
                let sortATM = moneyInATM.sort((a, b) => b - a);
                let sum = 0;

                while (sum !== moneyToWithdraw) {
                    for (let i = 0; i < sortATM.length; i++) {
                        let currentBanknote = sortATM[i];
                        let checkForSum = sum + currentBanknote;

                        if (checkForSum <= moneyToWithdraw) {
                            sum = checkForSum;
                            let indexOfNumber = sortATM.indexOf(currentBanknote);
                            moneyInATM.splice(indexOfNumber, 1);
                            break;
                        }
                    }
                    sortATM = moneyInATM.sort((a, b) => b - a);
                }


                sortATM.forEach(x => {


                });
                let moneyLeftInAccount = accountBalance - moneyToWithdraw;

                console.log(`You get ${moneyToWithdraw}$. Account balance: ${moneyLeftInAccount}$. Thank you!`);
            }
        }
    }

}

// solve([[20, 5, 100, 20, 1],
//         [457, 25],
//         [1],
//         [10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
//         [20, 85],
//         [5000, 4500],
//     ]
// )