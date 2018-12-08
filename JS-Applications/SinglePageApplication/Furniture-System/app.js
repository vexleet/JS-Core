const app = Sammy('#container', function(){
    this.use('Handlebars', 'hbs');
    
    this.get('#/', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get('#/furniture/create', furniture.getCreate);
    this.post('#/furniture/create', furniture.postCreate);
    this.get('#/furniture/all', furniture.getAllFurnitures);
    this.get('#/furniture/details/:id', furniture.getFurniture)
});

$(function(){
    app.run('#/');
});