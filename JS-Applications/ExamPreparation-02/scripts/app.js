$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', function () {
            let loggedIn = sessionStorage.getItem('authtoken') !== null;
            loggedIn === false ? this.redirect('#/home') : this.redirect('#/welcome');
        });

        this.get('#/welcome', function () {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;

            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/home/welcome.hbs')
            });
        });
        this.get('#/home', function () {
            let loggedIn = sessionStorage.getItem('authtoken') !== null;

            if (!loggedIn) this.redirect('#/welcome');
            else this.redirect('#/allListings');
        });

        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            let usernameRegex = /^[A-Za-z]{3,}$/g;
            let passRegex = /^[A-Za-z0-9]{6,}$/g;

            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            let matchUsername = username.match(usernameRegex);
            let matchPassword = password.match(passRegex);
            let matchRepeatPass = repeatPass.match(passRegex);

            if (matchUsername !== null && matchPassword !== null
                && matchRepeatPass !== null && password === repeatPass) {
                auth.register(username, password, repeatPass)
                    .then(function () {
                        notify.showInfo("Registration successful");
                        auth.login(username, password)
                            .then(function (userInfo) {
                                auth.saveSession(userInfo);
                                notify.showInfo('Login successful');
                                ctx.redirect('#/home');
                            }).catch(notify.handleError);
                    }).catch(notify.handleError);
            }
        });

        this.get('#/login', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    notify.showInfo("Login successful.");
                    ctx.redirect('#/home');
                }).catch(notify.handleError);
        });

        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    ctx.redirect('#/home');
                    notify.showInfo("Logout successful.");
                }).catch(notify.handleError);
        });

        this.get('#/allListings', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            requester.get('appdata', 'cars', 'kinvey')
                .then((cars) => {
                    ctx.cars = cars;
                    ctx.hasCars = undefined;

                    cars.length > 0 ? ctx.hasCars = true : ctx.hasCars = false;

                    for (let car of ctx.cars) {
                        if (car._acl.creator === sessionStorage.getItem('userId')) {
                            car.isAuthor = true;
                        }
                    }

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        car: './templates/car-listings/car.hbs'
                    }).then(function () {
                        this.partial('./templates/car-listings/carListings.hbs');
                    });
                });
        });

        this.get('#/createListing', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/car-listings/createListing.hbs');
            });
        });

        this.post('#/createListing', function (ctx) {
            let title = ctx.params.title;
            let brand = ctx.params.brand;
            let description = ctx.params.description;
            let fuel = ctx.params.fuelType;
            let imageUrl = ctx.params.imageUrl;
            let model = ctx.params.model;
            let price = ctx.params.price;
            let year = ctx.params.year;
            let seller = sessionStorage.getItem('username');

            if (title === '' || brand === '' || description === '' || fuel === '' || imageUrl === '' || model === '' || price === '' || year === '') notify.showError('All input fields must be filled in.')
            else if (title.length > 33) notify.showError('Title too long!');
            else if (description.length > 450 || description.length < 30) notify.showError('Description must be between 30 and 450 characters long!');
            else if (brand.length > 11) notify.showError('Brand too long!');
            else if (fuel.length > 11) notify.showError('Fuel type too long!');
            else if (model.length > 11) notify.showError('Model too long!');
            else if (!imageUrl.startsWith('http')) notify.showError('Wrong image link!');
            else {
                let data = {title, brand, description, fuel, imageUrl, model, price, year, seller};

                requester.post('appdata', 'cars', 'kinvey', data)
                    .then(function () {
                        notify.showInfo('Car listing created!');
                        ctx.redirect('#/allListings')
                    }).catch(notify.handleError);
            }
        });

        this.get('#/delete/:id', function (ctx) {
            requester.remove('appdata', 'cars/' + ctx.params.id.substring(1), 'kinvey')
                .then(function () {
                    notify.showInfo('Listing deleted.');
                    ctx.redirect('#/home');
                }).catch(notify.handleError);
        });

        this.get('#/myListings', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            requester.get('appdata', 'cars', 'kinvey')
                .then((cars) => {
                    ctx.cars = cars.filter(x => x._acl.creator === sessionStorage.getItem('userId'));
                    ctx.hasCars = undefined;

                    cars.length > 0 ? ctx.hasCars = true : ctx.hasCars = false;

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        myCar: './templates/car-listings/myCar.hbs'
                    }).then(function () {
                        this.partial('./templates/car-listings/myListings.hbs');
                    });
                }).catch(notify.handleError)
        });

        this.get('#/carDetails/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            requester.get('appdata', 'cars/' + ctx.params.id.substring(1), 'kinvey')
                .then((car) => {
                    ctx.title = car.title;
                    ctx.imageUrl = car.imageUrl;
                    ctx.brand = car.brand;
                    ctx.model = car.model;
                    ctx.year = car.year;
                    ctx.fuel = car.fuel;
                    ctx.price = car.price;
                    ctx.description = car.description;
                    ctx.id = car._id;
                    ctx.isAuthor = car._acl.creator === sessionStorage.getItem('userId') ? true : false;

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('./templates/car-listings/details.hbs');
                    });
                }).catch(notify.handleError);
        });

        this.get('#/edit/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            requester.get('appdata', 'cars/' + ctx.params.id.substring(1), 'kinvey')
                .then((details) => {
                    ctx.title = details.title;
                    ctx.brand = details.brand;
                    ctx.description = details.description;
                    ctx.model = details.model;
                    ctx.year = details.year;
                    ctx.price = details.price;
                    ctx.fuel = details.fuel;
                    ctx.imageUrl = details.imageUrl;
                    ctx.id = details._id;

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('./templates/car-listings/editListing.hbs');
                    });
                }).catch(notify.handleError)
        });

        this.post('#/edit/:id', function (ctx) {
            let title = ctx.params.title;
            let brand = ctx.params.brand;
            let description = ctx.params.description;
            let fuel = ctx.params.fuelType;
            let imageUrl = ctx.params.imageUrl;
            let model = ctx.params.model;
            let price = ctx.params.price;
            let year = ctx.params.year;
            let carId = ctx.params.carId;
            let seller = sessionStorage.getItem('username');

            if (title === '' || brand === '' || description === '' || fuel === '' || imageUrl === '' || model === '' || price === '' || year === '') notify.showError('All input fields must be filled in.')
            else if (title.length > 33) notify.showError('Title too long!');
            else if (description.length > 450 || description.length < 30) notify.showError('Description must be between 30 and 450 characters long!');
            else if (brand.length > 11) notify.showError('Brand too long!');
            else if (fuel.length > 11) notify.showError('Fuel type too long!');
            else if (model.length > 11) notify.showError('Model too long!');
            else if (!imageUrl.startsWith('http')) notify.showError('Wrong image link!');
            else {
                let data = {title, brand, description, fuel, imageUrl, model, price, year, seller};
                requester.update('appdata', 'cars/' + carId, 'kinvey', data)
                    .then(function () {
                        notify.showInfo('Car listing edited!');
                        ctx.redirect('#/allListings')
                    }).catch(notify.handleError);
            }
        });
    });

    app.run();
});