$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        $(document).on({
            ajaxStart: () => $("#loadingBox").show(),
            ajaxStop: () => $('#loadingBox').fadeOut()
        });

        function showInfo(message) {
            let infoBox = $('#infoBox');

            infoBox.on('click', function () {
                infoBox.fadeOut();
            });

            let infoBoxText = $('#infoBox span');
            infoBoxText.text(message);
            infoBox.show();
            setTimeout(() => infoBox.fadeOut(), 3000);
        }

        function showError(message) {
            let errorBox = $('#errorBox');

            errorBox.on('click', function () {
                errorBox.fadeOut();
            });

            let errorBoxText = $('#errorBox span');
            errorBoxText.text(message);
            errorBox.show();
        }

        function handleError(reason) {
            showError(reason.responseJSON.description);
        }

        this.get('#/', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            if (ctx.loggedIn === false) {
                this.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/home/home.hbs');
                });
            }
            else {
                requester.get('appdata', 'flights', 'kinvey')
                    .then((flights) => {
                        ctx.flights = flights.filter(x => x.isPublished === 'yes');

                        this.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs',
                            flight: './templates/catalog/flight.hbs',
                            flightCatalog: './templates/catalog/flightCatalog.hbs'
                        }).then(function () {
                            this.partial('./templates/home/home.hbs');
                        });
                    });
            }
        });

        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.pass;
            let repeatPassword = ctx.params.checkPass;

            if (password === repeatPassword && username.length >= 5 && password !== '' && repeatPassword !== '') {
                auth.register(username, password, repeatPassword);
                ctx.redirect('#/');
                showInfo("User registration successful.");
            }
            else {
                showError("Invalid input");
            }
        });

        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.pass;

            auth.login(username, password)
                .then(userData => {
                    auth.saveSession(userData);
                    ctx.redirect('#/');
                    showInfo("Login successful.");
                }).catch(e => {
                handleError(e);
            });
        });

        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    ctx.redirect('#/');
                    showInfo("Logout successful.");
                }).catch(e => {
                handleError(e);
            });
        });

        this.get('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            let destination = ctx.params.destination;
            let origin = ctx.params.origin;
            let departureDate = ctx.params.departureDate;
            let departureTime = ctx.params.departureTime;
            let image = ctx.params.img;
            let seats = ctx.params.seats;
            let cost = ctx.params.cost;
            let isPublished = ctx.params.public === 'on' ? 'yes' : 'no';

            let data = {
                destination,
                departure: departureDate,
                origin,
                departureTime,
                image,
                seats,
                cost,
                isPublished,
            };

            if (destination !== '' && origin !== '' && seats > 0 && cost > 0) {
                requester.post('appdata', 'flights', 'kinvey', data)
                    .then(function () {
                        ctx.redirect('#/');
                        showInfo('Created flight.');
                    });
            }
        });

        this.get('#/flights/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            requester.get('appdata', 'flights/' + ctx.params.id.substring(1), 'kinvey')
                .then((flight) => {
                    ctx.image = flight.image;
                    ctx.destination = flight.destination;
                    ctx.origin = flight.origin;
                    ctx.departure = flight.departure;
                    ctx.departureTime = flight.departureTime;
                    ctx.seats = flight.seats;
                    ctx.cost = flight.cost;
                    ctx.creator = sessionStorage.getItem('userId') === flight._acl.creator;
                    ctx._id = flight._id;

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/flightDetails.hbs');
                    });
                });
        });

        this.get('#/myflights', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            requester.get('appdata', 'flights', 'kinvey')
                .then((flights) => {
                    let userId = sessionStorage.getItem('userId');
                    ctx.myFlights = flights.filter(x => x._acl.creator === userId);

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/myFlights.hbs');
                    });
                });
        });

        this.get('#/removeFlight/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            requester.remove('appdata', 'flights/' + ctx.params.id.substring(1), 'kinvey')
                .then(function () {
                    ctx.redirect('#/myflights');
                    showInfo("Flight deleted.");
                });

        });

        this.get('#/editFlight/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            requester.get('appdata', 'flights/' + ctx.params.id.substring(1), 'kinvey')
                .then((flight) => {
                    ctx.image = flight.image;
                    ctx.destination = flight.destination;
                    ctx.origin = flight.origin;
                    ctx.departure = flight.departure;
                    ctx.departureTime = flight.departureTime;
                    ctx.seats = flight.seats;
                    ctx.price = flight.cost;
                    ctx.isPublished = flight.isPublished === 'yes' ? 'checked' : '';
                    ctx._id = flight._id;

                    console.log(flight);

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editFlight.hbs');
                    });
            });
        });

        this.post('#/editFlight/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            let destination = ctx.params.destination;
            let origin = ctx.params.origin;
            let departureDate = ctx.params.departureDate;
            let departureTime = ctx.params.departureTime;
            let image = ctx.params.img;
            let seats = ctx.params.seats;
            let cost = ctx.params.cost;
            let isPublished = ctx.params.public === 'on' ? 'yes' : 'no';

            let data = {
                destination,
                departure: departureDate,
                origin,
                departureTime,
                image,
                seats,
                cost,
                isPublished,
            };

            requester.update('appdata', 'flights/' + ctx.params.id.substring(1), 'kinvey', data)
                .then(function () {
                    ctx.redirect('#/flights/:' + ctx.params.id.substring(1));
                    showInfo("Successfully edited flight.");
                });
        });
    });

    app.run('#/');
});