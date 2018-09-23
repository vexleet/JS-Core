function solve(number) {
    console.log("<table border=\"1\">");

    for(let i = 1; i <= number + 1; i++){
        console.log("  <tr>");

        for(let j = 1; j<= number + 1; j++){
            if(i === 1){
                if(j === 1){
                    console.log("    <th>x</th>");
                }
                else{
                    console.log(`    <th>${j - 1}</th>`);
                }
            }
            else{
                if(j - 1 === 0){
                    console.log(`    <th>${i - 1}</th>`);
                }
                else {
                    console.log(`    <td>${(j - 1) * (i - 1)}</td>`);
                }
            }
        }

        console.log("  </tr>");
    }

    console.log("</table>");
}

solve(5)