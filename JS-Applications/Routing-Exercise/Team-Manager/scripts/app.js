$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('/index.html', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.teamId = sessionStorage.getItem('teamId');
            ctx.hasTeam = sessionStorage.getItem('teamId') !== 'undefined';

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs')
            });
        });

        this.get('#/home', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.teamId = sessionStorage.getItem('teamId');
            ctx.hasTeam = sessionStorage.getItem('teamId') !== 'undefined';

            console.log(sessionStorage);

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs')
            });
        });

        this.get('#/about', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                console.log(true);
                this.partial('./templates/about/about.hbs')
            });
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
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPassword;

            if (password !== repeatPassword) {
                alert('Password do not match');
            }
            else {
                auth.register(username, password, repeatPassword);
                ctx.redirect('#/home');
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
            let password = ctx.params.password;

            auth.login(username, password)
                .then((userData) => {
                    auth.saveSession(userData);
                    ctx.redirect('#/home');
                })
                .catch(console.error);
        });

        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function(){
                    sessionStorage.clear();
                    ctx.redirect('#/home');
                });
        });

        this.get('#/catalog', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.hasNoTeam = sessionStorage.getItem('hasNoTeam') !== 'undefined'
                || sessionStorage.getItem('hasNoTeam') !== null;

            teamsService.loadTeams()
                .then((teams => {
                    ctx.teams = teams;

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
                }));
        });

        this.get('#/catalog/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.isOnTeam = sessionStorage.getItem('teamId') !== 'undefined';

            teamsService.loadTeamDetails(ctx.params.id.substring(1))
                .then((details) => {
                    ctx.name = details.name;
                    ctx.comment = details.comment;
                    ctx.members = details.members;
                    ctx.teamId = details._id;
                    ctx.isAuthor = details._acl.creator === sessionStorage.getItem('userId');

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamMember: './templates/catalog/teamMember.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs');
                    });
                });
        });

        this.get('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs',
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            let teamName = ctx.params.name;
            let comment = ctx.params.comment;

            teamsService.createTeam(teamName, comment)
                .then((info) => {
                    console.log(info);
                    sessionStorage.setItem('teamId', info._id);
                    ctx.redirect('#/catalog');
                });
        });

        this.get('#/join/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            teamsService.joinTeam(ctx.params.id.substring(1))
                .then((info) => {
                    sessionStorage.setItem('teamId', info.teamId);
                    ctx.redirect('#/catalog');
                });
        });

        this.get('#/edit/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            teamsService.loadTeamDetails(ctx.params.id.substring(1))
                .then((details) => {
                    ctx.name = details.name;
                    ctx.comment = details.comment;
                    ctx.teamId = details._id;

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    });
                });
        });

        this.post('#/edit/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            let name = ctx.params.name;
            let comment = ctx.params.comment;

            teamsService.edit(ctx.params.id.substring(1), name, comment)
                .then(ctx.redirect(`#/catalog/${ctx.params.id}`));
        });

        this.get('#/leave', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            teamsService.leaveTeam();
            sessionStorage.setItem('teamId', 'undefined');
            ctx.redirect('#/catalog');
        });
    });

    app.run();
});