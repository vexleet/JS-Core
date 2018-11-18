describe('SoftUniFy tests', function () {
    describe('constructor tests', function () {
        it('initialize SoftUniFy correctly', function () {
            let sofunify = new SoftUniFy();

            expect(sofunify.allSongs).to.eql({});
        })
    });

    describe('downloadSong tests', function () {
        it('add given song correctly', function () {
            let sofunify = new SoftUniFy();

            sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');

            expect(sofunify.allSongs.hasOwnProperty('Eminem')).to.be.true;
            expect(sofunify.allSongs['Eminem'].songs[0]).to.equal(`Venom - Knock, Knock let the devil in...`);
            expect(sofunify.allSongs['Eminem'].songs.length).to.equal(1);
        });
    });

    describe('playSong tests', function () {
        it('with no songs', function () {
            let sofunify = new SoftUniFy();

            expect(sofunify.playSong('asd'))
                .to.equal('You have not downloaded a asd song yet. Use SoftUniFy\'s function downloadSong() to change that!');
        });

        it('with added songs but wrong song name on playSong', function () {
            let sofunify = new SoftUniFy();

            sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');

            expect(sofunify.playSong('EminemEminem'))
                .to.equal('You have not downloaded a EminemEminem song yet. Use SoftUniFy\'s function downloadSong() to change that!');
        });

        it('with added songs and correct name, should return correct string', function () {
            let sofunify = new SoftUniFy();

            sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');

            expect(sofunify.playSong('Venom')).to.equal('Eminem:\n' +
                'Venom - Knock, Knock let the devil in...\n')
        });
    });

    describe('songsList tests', function () {
        it('with no songs', function () {
            let sofunify = new SoftUniFy();

            expect(sofunify.songsList).to.equal(`Your song list is empty`)
        });

        it('with songs', function () {
            let sofunify = new SoftUniFy();

            sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            sofunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
            sofunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

            expect(sofunify.songsList).to.equal('Venom - Knock, Knock let the devil in...\n' +
                'Phenomenal - IM PHENOMENAL...\n' +
                'Light Me On Fire - You can call me a liar.. ')
        });
    });

    describe('rateArtist test', function () {
       it('with nothing parsed in', function () {
           let sofunify = new SoftUniFy();

           sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');

           expect(sofunify.rateArtist()).to.equal('The undefined is not on your artist list.');
       });
       
       it('with only name parsed in correctly', function () {
           let sofunify = new SoftUniFy();

           sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');

           expect(sofunify.rateArtist('Eminem')).to.equal(0);
       });

       it('with wrong name parsed in', function () {
           let sofunify = new SoftUniFy();

           sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');

           expect(sofunify.rateArtist('qwes')).to.equal('The qwes is not on your artist list.');
       });

       it('with more than 2 parameters', function () {
           let sofunify = new SoftUniFy();

           sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
           sofunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
           sofunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

           expect(sofunify.rateArtist('Eminem', 50, 20)).to.equal(0);
       });

       it('with 2 parameters but second one is a string', function () {
           let sofunify = new SoftUniFy();

           sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
           sofunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
           sofunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

           expect(sofunify.rateArtist('Eminem', 'asd')).to.equal(0);
       });

       it('with parameters parsed correctly', function () {
           let sofunify = new SoftUniFy();

           sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
           sofunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
           sofunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

           expect(sofunify.rateArtist('Eminem', 50)).to.equal(50);
           expect(sofunify.allSongs['Eminem'].rate).to.equal(50);
           expect(sofunify.allSongs['Eminem'].votes).to.equal(1);
       });
    });
});