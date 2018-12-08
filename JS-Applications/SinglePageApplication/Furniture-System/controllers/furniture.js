const furniture = function(){
    const getCreate = function(ctx){
        ctx.partial('views/furniture/furniture.hbs');
    };

    const postCreate = function(ctx){
        furnitureModel.create(ctx.params);
        ctx.redirect('#/furniture/all');
    };

    const getAllFurnitures = function (ctx) {
        requester.get('appdata/kid_ByZQkV4JN/furniture')
            .then((furnitures) => {
                ctx.furnitures = furnitures;

                this.loadPartials({
                    furnitureDetails: 'views/furniture/furnitureDetails.hbs'
                }).then(function () {
                    this.partial('views/furniture/allFurnitures.hbs');
                });

            });
    };

    const getFurniture = function (ctx) {
        let furnitureId = ctx.params.id.substring(1);

        console.log(true);
        requester.get('appdata/kid_ByZQkV4JN/furniture' + `/${furnitureId}`)
            .then((furniture) => {
                ctx.make = furniture.make;
                ctx.model = furniture.model;
                ctx.year = furniture.year;
                ctx.price = furniture.price;
                ctx.image = furniture.image;
                ctx.material = furniture.material;
                ctx.description = furniture.description;

                ctx.partial('views/furniture/furnitureInformation.hbs');
            });
    };

    return {
        getCreate,
        postCreate,
        getAllFurnitures,
        getFurniture
    }
}();