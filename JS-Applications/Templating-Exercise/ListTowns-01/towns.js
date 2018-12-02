function attachEvents() {
    let source = $("#towns-template").html();
    let template = Handlebars.compile(source);

    $("#btnLoadTowns").on('click', function () {
        $("#root").empty();

        let towns = $("#towns").val().split(",").map(t => {
            return {town: t};
        });

        console.log(towns);

        let html = template({towns});
        $("#root").append(html);

    });
}