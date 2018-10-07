function solve(json) {
    let html = "<table>\n";
    let arr = JSON.parse(json);
    html += " <tr>";
    for (let key of Object.keys(arr[0]))
        html += `<th>${htmlEscape(key)}</th>`;
    html += "</tr>\n";
    for (let obj of arr) {
        html += "  <tr>";
        for(let value of Object.values(obj)){
            html += `<td>${htmlEscape(value)}</td>`
        }
        html += "</tr>\n";
    }
    console.log(html + "</table>");

    function htmlEscape(text) {
        if(isNaN(text)) {
            return text.replace(/&/g, '&amp;')
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, '&#39;')
        }
        return text;
    }
}

solve('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]')