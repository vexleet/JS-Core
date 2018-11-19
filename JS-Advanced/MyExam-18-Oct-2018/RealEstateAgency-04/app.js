function realEstateAgency() {
    $('#regOffer button[name=regOffer]').on('click', function () {
        let rentPrice = Number($('#regOffer input[name=apartmentRent]').val());
        let apartmentType = $('#regOffer input[name=apartmentType]').val();
        let commision = Number($('#regOffer input[name=agencyCommission]').val());

        if (isNaN(rentPrice) === false
            && isNaN(commision) === false
            && apartmentType !== ''
            && rentPrice > 0
            && (commision >= 0 && commision <= 100)
            && apartmentType.includes(":") === false) {
            $('#message').text('Your offer was created successfully.');

            let div = $('<div class="apartment"></div>');

            div.append(`<p>Rent: ${rentPrice}</p>`);
            div.append(`<p>Type: ${apartmentType}</p>`);
            div.append(`<p>Commission: ${commision}</p>`);

            $('#building').append(div);
        }
        else {
            $('#message').text('Your offer registration went wrong, try again.');
        }

        $('#regOffer input[name=apartmentRent]').val('');
        $('#regOffer input[name=apartmentType]').val('');
        $('#regOffer input[name=agencyCommission]').val('');
    });

    $('#findOffer button[name=findOffer]').on('click', function () {
        let familyBudget = Number($('#findOffer input[name=familyBudget]').val());
        let familyApartmentType = $('#findOffer input[name=familyApartmentType]').val();
        let familyName = $('#findOffer input[name=familyName]').val();

        if (isNaN(familyBudget) === false && familyBudget > 0
            && familyApartmentType !== '' && familyName !== '') {
            let offers = $('#building div');

            for (let currentOffer of offers) {
                let rent = Number(currentOffer.childNodes[0].textContent.split(' ')[1]);
                let type = currentOffer.childNodes[1].textContent.slice(6);
                let commission = Number(currentOffer.childNodes[2].textContent.split(' ')[1]);
                console.log(type);
                let toRent = rent + (rent * (commission / 100));
                if (familyBudget >= toRent && type === familyApartmentType) {
                    $('#message').text('Enjoy your new home! :))');
                    let currentProfitOfAgency = Number($('#roof h1').text().split(' ')[2]);

                    currentProfitOfAgency += ((rent * (commission / 100)) * 2);
                    $('#roof h1').text(`Agency profit: ${currentProfitOfAgency} lv.`);
                    $(currentOffer).empty();
                    $(currentOffer).css('border', '2px solid red');
                    $(currentOffer).attr('class', 'apartment');

                    let button = $('<button>MoveOut</button>');

                    button.on('click', function () {
                        $('#message').text(`They had found cockroaches in ${familyName}\'s apartment`);
                        this.parentNode.remove();
                    });

                    $(currentOffer).append(`<p>${familyName}</p>`);
                    $(currentOffer).append(`<p>live here now</p>`);
                    $(currentOffer).append(button);
                    break;
                }
                else {
                    $('#message').text('We were unable to find you a home, so sorry :(');
                    break;
                }
            }
        }
        else {
            $('#message').text('We were unable to find you a home, so sorry :(');
        }

        $('#findOffer input[name=familyBudget]').val('');
        $('#findOffer input[name=familyApartmentType]').val('');
        $('#findOffer input[name=familyName]').val('');
    });
}