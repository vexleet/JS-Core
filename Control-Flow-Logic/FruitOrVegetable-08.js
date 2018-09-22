function fruitOrVegetable(arg){
    let fruits = ["banana", "apple", "kiwi", "cherry", "lemon", "grapes", "peach"];
    let vegetables = ["tomato", "cucumber", "pepper", "onion", "garlic", "parsley"];

    if(fruits.indexOf(arg) >= 0){
        console.log("fruit");
    }
    else if(vegetables.indexOf(arg) >= 0){
        console.log("vegetable");
    }
    else{
        console.log("unknown");
    }
}

fruitOrVegetable("banana");
fruitOrVegetable("tomato");
fruitOrVegetable("pizza");