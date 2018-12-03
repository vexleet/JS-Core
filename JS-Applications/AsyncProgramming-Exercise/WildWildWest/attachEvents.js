const host = 'https://baas.kinvey.com/appdata/kid_SkHErlmkE/players';
const auth = {'Authorization': `Basic ${btoa('guest:guest')}, "Content-type": "application/json"`};

function attachEvents() {
    getPlayers();

    function getPlayers(){
        $.ajax({
            url: host,
            headers: auth
        })
            .then(parseData);

        function parseData(players) {
            $("#players").empty();

            for (let player of players) {
                let html = $(`<div class="player" data-id="${player._id}">
            <div class="row">
                <label>Name:</label>
                <label class="name">${player.name}</label>
            </div>
            <div class="row">
                <label>Money:</label>
                <label class="money">${player.money}</label>
            </div>
            <div class="row">
                <label>Bullets:</label>
                <label class="bullets">${player.bullets}</label>
            </div>
            <button class="play">Play</button>
            <button class="delete">Delete</button>
        </div>`);

                $(html).find(".delete").on('click', deletePlayer);
                $(html).find(".play").on('click', playGame);

                $("#players").append(html);
            }
        }

        function deletePlayer() {
            let playerId = $(this.parentNode).data("id");

            $.ajax({
                url: host + `/${playerId}`,
                headers: auth,
                method: 'DELETE'
            })
                .then(getPlayers);
        }

        function playGame() {
            let playerId = $(this.parentNode).data("id");

            let newBody = {
                name: $(this.parentNode).find('.name').text(),
                money: Number($(this.parentNode).find('.money').text()),
                bullets: Number($(this.parentNode).find('.bullets').text())
            };

            savePlayer(newBody, playerId)
        }
    }


    $("#addPlayer").click(addPlayer);
    $("#save").click(savePlayer);

    function addPlayer(){
        let playerName = $("#addName").val();
        let newPlayerBody = {
            name: playerName,
            money: 500,
            bullets: 6
        };

        $.ajax({
            url: host,
            method: "POST",
            headers: auth,
            data: newPlayerBody
        })
            .then(getPlayers);
    }

    function savePlayer(data, playerId) {
        console.log(data);
        console.log(host + `/${playerId}`);
        $.ajax({
            method: "PUT",
            data: JSON.stringify(data),
            headers: auth,
            url: host + `/${playerId}`
        })
            .then(getPlayers);
    }

    function drawCanvas(data) {
        console.log(true);
        let canvasStyle = $("#canvas").css('display');

        if(canvasStyle === 'block'){
            canvas.intervalId.clearInterval();
            $("#canvas").css('display', 'none');
            $("#save").css('display', 'none');
            $("#reload").css('display', 'none');
        }
        else{
            $("#canvas").css('display', 'block');
            $("#save").css('display', 'block');
            $("#reload").css('display', 'block');

            loadCanvas(data);
        }
    }
}