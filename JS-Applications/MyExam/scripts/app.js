$(() => {
    const app = Sammy('#site-content', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', function () {
            let loggedIn = sessionStorage.getItem('authtoken') !== null;

            if (!loggedIn) this.redirect('#/welcome');
            else this.redirect('#/dashboard');
        });

        this.get('#/welcome', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/home/welcome.hbs')
            });
        });

        this.get('#/register', function (ctx) {
            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('templates/register/registerPage.hbs')
            });
        });

        this.post('#/register', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            if (username === '' && password === '') {
                notify.showError('Both fields are empty');
            } else if (username.length < 3) {
                notify.showError('Username must be at least 3 symbols');
                $('#username').val('');
                $('#password').val('');
            } else if (password.length < 6) {
                notify.showError('Password must be at least 6 symbols');
                $('#username').val('');
                $('#password').val('');
            } else {
                auth.register(username, password)
                    .then(function () {
                        notify.showInfo("User registration successful.");
                        auth.login(username, password)
                            .then(function (userInfo) {
                                auth.saveSession(userInfo);
                                notify.showInfo('Login successful');
                                ctx.redirect('#/home');
                            }).catch(notify.handleError);
                    }).catch(notify.handleError);
            }
        });

        this.get('#/login', function (ctx) {
            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                loginForm: 'templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    notify.showInfo('Login successful');
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

        this.get('#/addPet', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                createForm: 'templates/create/createForm.hbs'
            }).then(function () {
                this.partial('templates/create/createPage.hbs');
            });
        });

        this.post('#/addPet', function (ctx) {
            let name = ctx.params.name;
            let description = ctx.params.description;
            let imageURL = ctx.params.imageURL;
            let category = ctx.params.category;
            let numberOfPets = 0;

            let data = {
                name,
                description,
                imageURL,
                category,
                numberOfPets,
            };

            requester.post('appdata', 'pets', 'kinvey', data)
                .then(function () {
                    notify.showInfo('Pet created.');
                    ctx.redirect('#/home')
                }).catch(notify.handleError);
        });

        this.get('#/dashboard', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let userId = sessionStorage.getItem('userId');

            requester.get('appdata', 'pets', 'kinvey')
                .then((pets) => {
                    ctx.pets = pets.filter(x => x._acl.creator !== userId);

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        pet: './templates/pets/pet.hbs'
                    }).then(function () {
                        this.partial('./templates/pets/dashboard.hbs');
                    });
                }).catch(notify.handleError);
        });

        this.get('#/category/:typeOfPet', function (ctx) {
            let typeOfPet = ctx.params.typeOfPet.substring(1);
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let userId = sessionStorage.getItem('userId');

            requester.get('appdata', 'pets', 'kinvey')
                .then((pets) => {
                    ctx.pets = pets.filter(x => x.category === typeOfPet && x._acl.creator !== userId)
                        .sort((a, b) => b.numberOfPets - a.numberOfPets);

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        pet: './templates/pets/pet.hbs'
                    }).then(function () {
                        this.partial('./templates/pets/dashboard.hbs');
                    });
                }).catch(notify.handleError);
        });

        this.get('#/myPets', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let userId = sessionStorage.getItem('userId');

            requester.get('appdata', 'pets', 'kinvey')
                .then((pets) => {
                    ctx.myPets = pets.filter(x => x._acl.creator === userId);

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        myPet: './templates/pets/myPet.hbs'
                    }).then(function () {
                        this.partial('./templates/pets/myPets.hbs');
                    });
                }).catch(notify.handleError)
        });

        this.get('#/deletePet/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let petId = ctx.params.id.substring(1);

            requester.get('appdata', 'pets/' + petId, 'kinvey')
                .then((details) => {
                    ctx.name = details.name;
                    ctx.numberOfPets = details.numberOfPets;
                    ctx.imageURL = details.imageURL;
                    ctx.id = details._id;
                    ctx.description = details.description;

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('./templates/delete/deletePage.hbs');
                    });
                }).catch(notify.handleError)
        });

        this.post('#/deletePet/:id', function (ctx) {
            let petId = ctx.params.id.substring(1);

            requester.remove('appdata', 'pets/' + petId, 'kinvey')
                .then(function () {
                    notify.showInfo('Pet removed successfully!');
                    ctx.redirect('#/home');
                }).catch(notify.handleError);
        });

        this.get('#/detailsPet/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let petId = ctx.params.id.substring(1);
            let userId = sessionStorage.getItem('userId');

            requester.get('appdata', 'pets/' + petId, 'kinvey')
                .then((details) => {
                    ctx.name = details.name;
                    ctx.numberOfPets = details.numberOfPets;
                    ctx.imageURL = details.imageURL;
                    ctx.id = details._id;
                    ctx.description = details.description;

                    if (details._acl.creator !== userId) {
                        this.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs'
                        }).then(function () {
                            this.partial('./templates/pets/detailsOtherPet.hbs');
                        });
                    } else {
                        this.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs'
                        }).then(function () {
                            this.partial('./templates/pets/detailsMyPet.hbs');
                        });
                    }
                }).catch(notify.handleError);
        });

        this.post('#/editPet/:id', function (ctx) {
            let petId = ctx.params.id.substring(1);
            let description = ctx.params.description;

            requester.get('appdata', 'pets/' + petId, 'kinvey')
                .then((details) => {
                    details.description = description;
                    console.log(details);
                    requester.update('appdata', 'pets/' + petId, 'kinvey', details)
                        .then(function () {
                            notify.showInfo('Updated successfully!');
                            ctx.redirect('#/home');
                        }).catch(notify.handleError);
                });
        });

        this.get('#/petAPet/:id', function (ctx) {
            let petId = ctx.params.id.substring(1);

            requester.get('appdata', 'pets/' + petId, 'kinvey')
                .then((details) => {
                    details.numberOfPets = (Number(details.numberOfPets) + 1).toString();

                    requester.update('appdata', 'pets/' + petId, 'kinvey', details)
                        .then(function () {
                            ctx.redirect('#/home');
                        }).catch(notify.handleError);
                }).catch(notify.handleError);
        });
    });

    app.run('#/home');
});