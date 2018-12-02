$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let catsObject = cats.map(x => {
            return {
                id: x.id,
                statusCode: x.statusCode,
                statusMessage: x.statusMessage,
                imageLocation: x.imageLocation,
            }
        });

        let source = $("#cat-template").html();
        let template = Handlebars.compile(source);

        let html = template({catsObject});

        $("#allCats").append(html);

        $("#allCats button").on('click', function () {
            if($(this.parentNode).find("div").css('display') === 'none') {
                $(this.parentNode).find("div").css('display', 'block');
                $(this).text("Hide status code");
            }
            else{
                $(this.parentNode).find("div").css('display', 'none');
                $(this).text("Show status code");
            }
        });
    }

});
