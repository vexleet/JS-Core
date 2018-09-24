function solve(day) {
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    if(days.includes(day)){
        console.log(days.indexOf(day) + 1);
    }
    else{
        console.log("error");
    }
}

solve("dasd");
solve("Monday");