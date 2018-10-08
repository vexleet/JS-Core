function solve(input) {
    let html = "<table>\n";



    for(let obj of input){
        let arr = JSON.parse(obj);
        html += `	<tr>\n		<td>${sanitizeHtml(arr['name'])}</td>\n		<td>${sanitizeHtml(arr['position'])}</td>\n		<td>${arr['salary']}</td>\n		<tr>\n`;

    }

    console.log(html + "</table>");

    function sanitizeHtml(text) {
        return text.replace(/&/g,'&amp;')
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;")
            .replace(/'/g,'&#39;')
    }
}

solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}']
)