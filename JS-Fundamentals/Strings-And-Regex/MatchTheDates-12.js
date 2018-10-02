function solve(dates) {
    let regex = /\b([0-9]{1,2})-([A-Z][a-z]{2})-([0-9]{4})\b/g;

    for(let i = 0; i < dates.length; i++){

        let match = regex.exec(dates[i]);

        while (match != null) {
            console.log(`${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`);

            match = regex.exec(dates[i]);
        }
    }

}

solve(['I am born on 30-Dec-1994.',
    'This is not date: 512-Jan-1996.',
    'My father is born on the 29-Jul-1955.']
);