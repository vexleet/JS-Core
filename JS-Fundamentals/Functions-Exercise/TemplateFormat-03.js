function solve(input) {
    console.log("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    console.log("<quiz>");

    for(let i = 0; i < input.length; i+= 2){
        let question = input[i];
        let answer = input[i + 1];

        console.log("  <question>");
        console.log(question);
        console.log("  </question>");

        console.log("  <answer>");
        console.log(answer);
        console.log("  </answer>");
    }

    console.log("</quiz>");
}