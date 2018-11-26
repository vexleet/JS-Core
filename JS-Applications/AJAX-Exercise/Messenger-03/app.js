function attachEvents() {
    $("#refresh").click(loadMessages);
    $("#submit").click(addMessage);

    let baseServiceUrl = "https://messenger-vex.firebaseio.com/messenger";

    function loadMessages() {
        console.log(true);
        $("#messages").empty();

        $.get(baseServiceUrl + '.json')
            .then(displayMessages)
    }

    function displayMessages(messages) {
        console.log(true);
        for (let key in messages) {
            let author = messages[key]['author'];
            let content = messages[key]['content'];

            $("#messages").text($("#messages").text() + `${author}: ${content}\n`);
        }
    }

    function addMessage(){
        let newMessageJson = JSON.stringify({
            author: $("#author").val(),
            content: $("#content").val()
        });

        $.post(baseServiceUrl + '.json', newMessageJson)
            .then(loadMessages);

        $("#author").val('');
        $("#content").val('');
    }
}