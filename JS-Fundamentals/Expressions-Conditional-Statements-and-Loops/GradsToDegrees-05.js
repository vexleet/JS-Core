function solve(number) {
    let diffDeg = 400 / 360;
    let convertGradToDeg = Number(number) / diffDeg;
    convertGradToDeg = convertGradToDeg % 360;

    if (convertGradToDeg < 0) {
        convertGradToDeg += 360;
    }
    console.log(convertGradToDeg)
}