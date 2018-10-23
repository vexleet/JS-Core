function solve(input) {
    let str = "";
    for(let i = 0; i < input.length - 1; i++){
        let [command, argument] = input[i].split(" ");

        switch (command) {
            case "append":
                str += argument;
                break;
            case "removeStart":
                str = str.slice(Number(argument));
                break;
            case "removeEnd":
                str = str.slice(0, str.length - Number(argument));
                break;
        }
    }
    console.log(str);
}