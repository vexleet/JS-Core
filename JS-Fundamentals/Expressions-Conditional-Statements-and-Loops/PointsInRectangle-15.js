function solve([arg1, arg2, arg3, arg4, arg5, arg6]) {
    let x = Number(arg1);
    let y = Number(arg2);
    let xMin = Number(arg3);
    let xMax = Number(arg4);
    let yMin = Number(arg5);
    let yMax = Number(arg6);


    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
        console.log("inside");
    }
    else {
        console.log("outside");
    }
}

solve([8, -1, 2, 12, -3, 3])