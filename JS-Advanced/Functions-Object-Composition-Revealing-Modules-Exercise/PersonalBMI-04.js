function solve(name, age, weight, height) {
    let bmi = weight / Math.pow(height / 100, 2);
    let status = "";

    if (bmi < 18.5) {
        status = "underweight";
    }
    else if (bmi < 25) {
        status = "normal";

    }
    else if (bmi < 30) {
        status = "overweight";
    }
    else if (bmi >= 30) {
        status = "obese";
    }

    let info = {
        "name": name,
        "personalInfo": {
            "age": age,
            "weight": weight,
            "height": height
        },
        "BMI": Math.round(bmi),
        "status": status
    };

    if(status === "obese"){
        info["recommendation"] = 'admission required';
    }

    return info;
}

let result = solve("Peter", 9, 57, 137);
console.log(result.name);