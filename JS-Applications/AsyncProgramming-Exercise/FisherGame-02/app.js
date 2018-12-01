function attachEvents() {
    const host = "https://baas.kinvey.com/appdata/kid_ryFRDggJ4/biggestCatches";
    const auth = {'Authorization': `Basic ${btoa("guest:guest")}`, "Content-type": "application/json"};

    $(".load").click(getCatches);
    $(".add").click(addNewCatch);

    function getCatches() {
        $.ajax({
            url: host,
            headers: auth,
        })
            .then(parseData);

        function parseData(catches) {
            $("#catches").empty();

            for (let fishCatch of catches) {
                let div = $(`<div class="catch" data-id="${fishCatch._id}">
                                <label>Angler</label>
                                <input type="text" class="angler" value="${fishCatch.angler}"/>
                                <label>Weight</label>
                                <input type="number" class="weight" value="${fishCatch.weight}"/>
                                <label>Species</label>
                                <input type="text" class="species" value="${fishCatch.species}"/>
                                <label>Location</label>
                                <input type="text" class="location" value="${fishCatch.location}"/>
                                <label>Bait</label>
                                <input type="text" class="bait" value="${fishCatch.bait}"/>
                                <label>Capture Time</label>
                                <input type="number" class="captureTime" value="${fishCatch.captureTime}"/>
                                <button class="update">Update</button>
                                <button class="delete">Delete</button>
                            </div>`);

                $(div).find(".delete").click(deleteCatch);
                $(div).find(".update").click(updateCatch);

                $("#catches")
                    .append(div);
            }
        }
    }

    function addNewCatch(){
        let angler = $(".angler").val();
        let weight = Number($(".weight").val());
        let species = $(".species").val();
        let location = $(".location").val();
        let bait = $(".bait").val();
        let captureTime = Number($(".captureTime").val());

        let newCatchBody = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        $.ajax({
            method: "POST",
            url: host,
            data: JSON.stringify(newCatchBody),
            headers: auth,
        })
            .then(getCatches);

        for(let input of $(this.parentNode).find('input')){
            $(input).val('');
        }
    }

    function updateCatch(){
        let catchId = $(this.parentNode).data("id");

        let angler = $(this.parentNode).find(".angler").val();
        let weight = $(this.parentNode).find(".weight").val();
        let species = $(this.parentNode).find(".species").val();
        let location = $(this.parentNode).find(".location").val();
        let bait = $(this.parentNode).find(".bait").val();
        let captureTime = $(this.parentNode).find(".captureTime").val();

        let catchBody = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        $.ajax({
            url: host + `/${catchId}`,
            method: "PUT",
            data: JSON.stringify(catchBody),
            headers: auth,
        })
            .then(getCatches)
    }

    function deleteCatch() {
        let catchId = $(this.parentNode).data("id");
        console.log(host + `/${catchId}`);
        $.ajax({
            url: host + `/${catchId}`,
            method: 'DELETE',
            headers: auth,
        })
            .then(getCatches)
    }
}