function solve(input) {
    let joinText = input.join("\n");
    let text = joinText.toLowerCase().split(/[^\w]/g).filter(x => x !== '');
    let result = [];

    for(let word of text){
        if(!result.includes(word)){
            result.push(word.toLowerCase());
        }
    }

    console.log(result.join(", "));
}

solve("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui. \n" +
    "Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla. \n" +
    "Vestibulum dolor diam, dignissim quis varius non, fermentum non felis. \n" +
    "Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut. \n" +
    "Morbi in ipsum varius, pharetra diam vel, mattis arcu. \n" +
    "Integer ac turpis commodo, varius nulla sed, elementum lectus. \n" +
    "Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.\n")