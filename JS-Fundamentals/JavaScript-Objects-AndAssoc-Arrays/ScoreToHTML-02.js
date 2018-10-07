function solve(input) {
    let html = "<table>\n";
    html += "  <tr><th>name</th><th>score</th></tr>\n";

    let arr = JSON.parse(input);

    for(let obj of arr){
        html += `  <tr><td>${sanitizeHtml(obj['name'])}</td><td>${obj['score']}</td></tr>\n`
    }

    console.log(html += "</table>");

    function sanitizeHtml(text) {
        return text.replace(/&/g,'&amp;')
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;")
            .replace(/'/g,'&#39;')
    }
}

solve('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]')
solve('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]')