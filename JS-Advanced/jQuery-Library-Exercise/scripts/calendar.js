function calendar(date) {
    let day = date[0];
    let month = date[1];
    let year = Number(date[2]);
    let getDate = new Date(year, month, 1);

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

        for(let i = 0; i < getIndexOfMonday - 1; i++){
            row.append($("<th>").text(" "));
        }

        let number = 1;
        let daysCounter = getIndexOfMonday;

        while (getDate.getMonth() === month) {
            if(number === day){
                row.append($("<th>").text(number).addClass("today"));
            }
            else {
                row.append($("<th>").text(number));
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

        for(let i = row[0].childNodes.length; i < 7; i++){
            row.append($("<th>").text(" "));
        }
        createTable.append(row);
    }
    appendDays();
    $("#content").append(createTable);
}