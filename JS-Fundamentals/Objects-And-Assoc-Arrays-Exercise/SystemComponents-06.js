function solve(input) {
    let components = new Map();

    for(let i = 0; i < input.length; i++){
        let [systemName, componentName, subcomponentName] = input[i].split(" | ");

        if(!components.has(systemName)){
            components.set(systemName, new Map());
            components.get(systemName).set(componentName, new Array(subcomponentName));
        }
        else{
            if(!components.get(systemName).has(componentName)){
                components.get(systemName).set(componentName, new Array(subcomponentName));
            }
            else{
                let getSubcomponents =  components.get(systemName).get(componentName);
                getSubcomponents.push(subcomponentName);
                components.get(systemName).set(componentName, getSubcomponents);
            }
        }
    }

    let mapAsc = new Map([...components.entries()].sort((a, b) => {
        return Object.values(b)[1].size - Object.values(a)[1].size || a[0].localeCompare(b[0]);
    }));

    mapAsc.forEach((value, key) => {
        console.log(key);

        let orderComponents = new Map([...value.entries()].sort((a, b) => {
            return b[1].length - a[1].length;
        }));

        orderComponents.forEach((subcomponentName, componentName) => {
            console.log(`|||${componentName}`);
            subcomponentName.forEach(x => console.log(`||||||${x}`));
        })
    })
}

solve(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Lambda | CoreB | B25',
    'Lambda | CoreB | B26',
    'Lambda | CoreB | B27',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security']
)