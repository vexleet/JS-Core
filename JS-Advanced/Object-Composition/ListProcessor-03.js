function processCommands(commands) {
    let commandProcessor = (function () {
        let list = [];
        return{
            add: (newitem) => list.push(newitem),
            remove: (item) => list = list.filter(x => x !== item),
            print: () => console.log(list),
        }
    })();
    for(let cmd of commands){
        let [cmdName, arg] = cmd.split(" ");
        commandProcessor[cmdName](arg);
    }
}