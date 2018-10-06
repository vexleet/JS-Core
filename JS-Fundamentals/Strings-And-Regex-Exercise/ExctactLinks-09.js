function solve(input) {
    let pattern = /www\.[A-Za-z-0-9]+(\.[a-z]+)+/g;

    for (let i = 0; i < input.length; i++) {
        let match = pattern.exec(input[i]);

        while(match){
            console.log(match[0]);

            match = pattern.exec(input[i]);
        }
    }
}
solve(['Join WebStars now for free, at www.web-stars.com',
    'You can also support our partners:',
    'Internet - www.internet.com',
    'WebSpiders - www.webspiders101.com',
    'Sentinel - www.sentinel.-ko']
);
