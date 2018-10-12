function solve(input) {
    let peshoInventory = input[0].split(/\s+/g);

    for(let i = 1; i < input.length - 1; i++){
        let currentCommand = input[i].split(/\s+/g);

        let command = currentCommand[0];
        let equipment = "";
        switch (command) {
            case "Buy":
                equipment = currentCommand[1];
                peshoInventory = buyEquipment(peshoInventory, equipment);
                break;
            case "Trash":
                equipment = currentCommand[1];
                peshoInventory = trashEquipment(peshoInventory, equipment);
                break;
            case "Repair":
                equipment = currentCommand[1];
                peshoInventory = trashEquipment(peshoInventory, equipment);
                peshoInventory = buyEquipment(peshoInventory, equipment);
                break;
            case "Upgrade":
                let split = currentCommand[1].split("-");
                equipment = split[0];
                let upgrade = split[1];

                if(peshoInventory.includes(equipment)){
                    let indexOfEquipment = peshoInventory.indexOf(equipment);
                    peshoInventory.splice(indexOfEquipment + 1, 0, split.join(":"));
                }
                break;
        }

    }
    console.log(peshoInventory.join(" "));
    function buyEquipment(array, item){
        if(!array.includes(item)){
            array.push(item);
        }
        return array;
    }

    function trashEquipment(array, item) {
        if(array.includes(item)){
            let indexOfEquipment = array.indexOf(item);
            array.splice(indexOfEquipment, 1);
        }

        return array;
    }
}

solve(["SWORD Shield Spear",
        "Buy Bag",
        "Trash Shield",
        "Repair Spear",
        "Upgrade SWORD-Steel",
    "Fight!"])