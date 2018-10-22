function calendar(date) {
    let day = date[0];
    let month = Number(date[1]);
    let year = Number(date[2]);
    let getDate = new Date(year, month - 1, 1);

    let monthWithLetters = getDate.toLocaleString("en-us", { month: "long" });

    let createTable = $("<table>")
        .append(`<caption>${monthWithLetters} ${year}</caption>`)
        .append("<tbody>")
        .append(appendWeek());

    function appendWeek(){
        let months = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        let row = $("<tr>");

        for(let item of months){
            row.append($("<th>").text(item));
        }
        return row;
    }

    function appendDays(){
        let row = $("<tr>");
        let getIndexOfMonday = getDate.getDay();

        if(getIndexOfMonday === 0){
            getIndexOfMonday = 7;
        }

        for(let i = 0; i < getIndexOfMonday - 1; i++){
            row.append($("<td>"));
        }

        let number = 1;
        let daysCounter = getIndexOfMonday;

        while (getDate.getMonth() === month - 1) {
            if(number === day){
                row.append($("<td>").text(number).addClass("today"));
            }
            else {
                row.append($("<td>").text(number));
            }

            if(daysCounter === 7){
                daysCounter = 0;
                createTable.append(row);
                row = $("<tr>");
            }
            number++;
            daysCounter++;

            getDate.setDate(getDate.getDate() + 1);
        }
        if(row[0].childNodes.length > 0) {
            for (let i = row[0].childNodes.length; i < 7; i++) {
                row.append($("<td>"));
            }
            createTable.append(row);
        }
    }
    appendDays();
    $("#content").append(createTable);
}