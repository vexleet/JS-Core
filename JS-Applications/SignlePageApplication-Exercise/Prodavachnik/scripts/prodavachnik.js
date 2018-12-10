function startApp() {
    sessionStorage.clear();
    showView('viewHome');
    const templates = {};

    loadTemplates();

    async function loadTemplates() {
        const [adsCatalogTemplate, adBoxTemplate]
            = await Promise.all([
            $.get('./templates/ads-catalog.html'),
            $.get('./templates/ad-box-partial.html')
        ]);

        templates['catalog'] = Handlebars.compile(adsCatalogTemplate);
        Handlebars.registerPartial('adBox', adBoxTemplate);
    }

    // Attach click events
    (() => {
        $('header').find('a[data-target]').click(navigateTo);
        $('#buttonLoginUser').click(login);
        $('#buttonRegisterUser').click(register);
        $('#linkLogout').click(logout);
        $('#buttonCreateAd').click(createAd);
        $('.notification').click(function () {
            $(this).hide();
        });
    })();

    let requester = (() => {
        const appKey = 'kid_BJEYgmhyV';
        const appSecret = 'd23fa6957d4d47e197c1e12f33bcd933';
        const baseUrl = 'https://baas.kinvey.com/';

        // Creates the authentication header
        function makeAuth(type) {
            return type === 'basic'
                ? 'Basic ' + btoa(appKey + ':' + appSecret)
                : 'Kinvey ' + localStorage.getItem('authtoken');
        }

        // Creates request object to kinvey
        function makeRequest(method, module, endpoint, auth) {
            return req = {
                method,
                url: baseUrl + module + '/' + appKey + '/' + endpoint,
                headers: {
                    'Authorization': makeAuth(auth)
                }
            };
        }

        // Function to return GET promise
        function get(module, endpoint, auth) {
            return $.ajax(makeRequest('GET', module, endpoint, auth));
        }

        // Function to return POST promise
        function post(module, endpoint, auth, data) {
            let req = makeRequest('POST', module, endpoint, auth);
            req.data = data;
            return $.ajax(req);
        }

        // Function to return PUT promise
        function update(module, endpoint, auth, data) {
            let req = makeRequest('PUT', module, endpoint, auth);
            req.data = data;
            return $.ajax(req);
        }

        // Function to return DELETE promise
        function remove(module, endpoint, auth) {
            return $.ajax(makeRequest('DELETE', module, endpoint, auth));
        }

        return {
            get,
            post,
            update,
            remove
        }
    })();

    if (localStorage.getItem('authtoken') !== null) {
        userLoggedIn();
    } else {
        userLoggedOut();
    }

    // Handle notifications
    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();

        if (viewName === 'viewAds') {
            loadAds();
        }
    }

    // Shows only the correct links for a logged in user
    function userLoggedIn() {
        $("#linkHome").show();
        $("#linkLogin").hide();
        $("#linkRegister").hide();
        $("#linkListAds").show();
        $("#linkCreateAd").show();
        $("#linkLogout").show();
    }

    // Shows only the correct links for an anonymous user
    function userLoggedOut() {
        $("#linkHome").show();
        $("#linkLogin").show();
        $("#linkRegister").show();
        $("#linkListAds").hide();
        $("#linkCreateAd").hide();
        $("#linkLogout").hide();
    }

    function navigateTo() {
        showView($(this).attr('data-target'));
    }


    // Saves username/id/authtoken to local storage
    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
        userLoggedIn();
    }

    // Logs in the user
    async function login() {
        let form = $('#formLogin');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let response = await requester.post('user', 'login', 'basic', {username, password});
            saveSession(response);
            showView('viewAds');
            showInfo('Successfully logged in!');
        } catch (e) {
            handleError(e);
        }
    }

    // Register a user
    async function register() {
        let form = $('#formRegister');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let response = await requester.post('user', '', 'basic', {username, password});
            saveSession(response);
            showView('viewAds');
            showInfo('Successfully registered!');
        } catch (e) {
            handleError(e);
        }
    }

    // Logout a user
    async function logout() {
        try {
            await requester.post('user', '_logout', 'kinvey', {authtoken: localStorage.getItem('authtoken')});
            localStorage.clear(); // Clears all session storage on logout
            userLoggedOut();
            showView('viewHome');
            showInfo('Logout successful!')
        } catch (e) {
            handleError(e);
        }
    }

    // Load all ads
    async function loadAds() {

        try {
            let adverts = await requester.get('appdata', 'adverts', 'kinvey');
            showInfo('Ads loaded');

            if (adverts.length === 0) {
                $("#content").text('No advertisements');
            }
            else {
                $("#content").empty();

                function appendRow(advert, adsTable){
                    let links = [];

                    if(advert._acl.creator === localStorage['id']){
                        let deleteLink = $('<a href="#">[Delete]</a>')
                            .click(deleteAd.bind(this, advert));
                        let editLink = $('<a href="#">[Edit]</a>')
                            .click(openEditAdd.bind(this, advert));
                        links = [deleteLink, '', editLink];
                    }

                    adsTable.append($('<tr>').append(
                        $('<td>').text(advert.title),
                        $('<td>').text(advert.description),
                        $('<td>').text(advert.price),
                        $('<td>').append(links)
                    ));

                }

                let adsTable = $("<table>")
                    .append($("<tr>").append(
                        '<th>Title</th><th>Description</th>',
                        '<th>Price</th>',
                        '<th>Actions</th>'));

                for(let advert of adverts){
                    appendRow(advert, adsTable);
                }
                $('#content').append(adsTable);
            }
        }
        catch (e) {
            handleError(e);
        }

    }

    // Create an add
    async function createAd() {
        let adData = {
            title: $("#formCreateAd input[name=title]").val(),
            description: $("#formCreateAd textarea[name=description]").val(),
            price: $("#formCreateAd input[name=price]").val(),
            imageUrl: $("#formCreateAd input[name=imageUrl]").val()
        };

        await requester.post('appdata', 'adverts', 'kinvey', adData);
        showView('viewAds');
        showInfo("Ad created");
    }

    // Delete an add
    async function deleteAd(advert) {
        console.log(advert);
        await requester.remove('appdata', `adverts/${advert._id}`, 'kinvey');
        showView('viewAds');
        showInfo('Ad Deleted');
    }

    // Edit an add
    async function editAd(id, publisher, date) {
        let adData ={
            title: $("#formEditAd input[name=title]").val(),
            description: $("#formEditAd textarea[name=description]").val(),
            price: $("#formEditAd input[name=price]").val(),
            imageUrl: $("#formEditAd input[name=imageUrl]").val()
        };

        await requester.update('appdata', `adverts/${$("#formEditAd input[name=id]").val()}`, 'kinvey', adData);
        showView('viewAds');
        showInfo('Updated Ad');
    }

    // Open edit add view
    async function openEditAdd(advert) {
        console.log(advert);
        showView('viewEditAd');

        $("#formEditAd input[name=id]").val(advert._id);
        $("#formEditAd input[name=title]").val(advert.title);
        $("#formEditAd textarea[name=description]").val(advert.description);
        $("#formEditAd input[name=price]").val(advert.price);
        $("#formEditAd input[name=imageUrl]").val(advert.imageUrl);

        $("#buttonEditAd").click(editAd);
    }
}