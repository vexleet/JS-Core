function initializeTable() {
    $("#createLink").on('click', createCountry);
    addCountryToTable("Bulgaria", "Sofia");
    addCountryToTable("Germany", "Berlin");
    addCountryToTable("Russia", "Moscow");
    fixRowLinks();

    function createCountry() {
        let country = $('#newCountryText').val();
        let capital = $('#newCapitalText').val();
        addCountryToTable(country, capital, true);
        $('#newCountryText').val('');
        $('#newCapitalText').val('');
        fixRowLinks();
    }

    function addCountryToTable(country, capital) {
        let row = $('<tr>')
            .append($("<td>").text(country))
            .append($("<td>").text(capital))
            .append($("<td>")
                .append($("<a href='#'>[Up]</a>").on('click', moveRowUp))
                .append($("<a href='#'>[Down]</a>").on('click', moveRowDown))
                .append($("<a href='#'>[Delete]</a>").on('click', deleteRow)));

        $("#countriesTable").append(row);
    }

    function deleteRow(){
        let row = $(this).parent().parent();
        row.fadeOut(function() {
            row.remove();
            fixRowLinks();
        });
    }
    
    function moveRowUp() {
        let row = $(this).parent().parent();
        row.fadeOut(function() {
            row.insertBefore(row.prev());
            row.fadeIn();
            fixRowLinks();
        });
    }
    
    function moveRowDown() {
        let row = $(this).parent().parent();
        row.fadeOut(function() {
            row.insertAfter(row.next());
            row.fadeIn();
            fixRowLinks();
        });
    }

    function fixRowLinks() {
        // Show all links in the table
        $('#countriesTable a').css('display', 'inline');

        // Hide [Up] link in first table data row
        let tableRows = $('#countriesTable tr');
        $(tableRows[2]).find("a:contains('Up')")
            .css('display', 'none');

        // Hide the [Down] link in the last table row
        $(tableRows[tableRows.length - 1]).find("a:contains('Down')")
            .css('display', 'none');
    }
}
