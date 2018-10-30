function result(worker) {
    if(worker.handsShaking === true){
        worker.bloodAlcoholLevel += ((worker.weight * 0.1) * worker.experience);
        worker.handsShaking = false;
    }

    return worker;
}

let worker = result({ weight: 80,
    experience: 1,
    bloodAlcoholLevel: 0,
    handsShaking: true }
);

console.log(worker);