function getKnock(message = "Knock Knock.") {
    let host = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock?query=" + message;
    const auth = {'Authorization': `Basic ${btoa("guest:guest")}`};

    $.ajax({
        url: host,
        headers: auth
    })
        .then(message => {
            if(message.hasOwnProperty("message")){
                console.log(message.answer);
                console.log(message.message);
                getKnock(message.message);
            }
            else{
                console.log(message.answer);
            }
        })
}