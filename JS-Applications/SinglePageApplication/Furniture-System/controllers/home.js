const home = function(){
    const index = function(ctx) {
        ctx.swap('<h2>Начало</h2>');
        console.log(localStorage);
    };

    return {
        index
    };
}();