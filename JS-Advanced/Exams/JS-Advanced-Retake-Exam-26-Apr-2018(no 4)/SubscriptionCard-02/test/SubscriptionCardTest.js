let expect = require("chai").expect;
let SubscriptionCard = require("../SubscriptionCard").SubscriptionCard;

describe("Subscription Card Class", function () {
    describe("Constuctor tests", function () {
        it("Should be initialized correctly", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.firstName).to.equal("Pesho");
            expect(card.lastName).to.equal("Petrov");
            expect(card.SSN).to.equal("00000000");
        });
    });

    describe("Is Blocked tests", function () {
        it("should return false for new card", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.isBlocked).to.be.false;
        });

        it("should return true for blocked card", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.block();

            expect(card.isBlocked).to.be.true;
        });

        it("should return false for blocked and unblocked card", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.block();
            card.unblock();

            expect(card.isBlocked).to.be.false;
        });

        it("should return true for unblocked and blocked card", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.unblock();
            card.block();

            expect(card.isBlocked).to.be.true;
        });
    });

    describe("addSubscription tests", function () {
        it("Added correctly subscription", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card._subscriptions.length).to.equal(1);
            expect(card._subscriptions[0].line).to.equal("120");
        });

        it("Added correctly subscription", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card._subscriptions.length).to.equal(2);
            expect(card._subscriptions[0].line).to.equal("120");
            expect(card._subscriptions[0].startDate).to.be.eql(new Date('2018-04-22'));
            expect(card._subscriptions[0].endDate).to.be.eql(new Date('2018-05-21'));
            expect(card._subscriptions[1].line).to.equal("*");
            expect(card._subscriptions[1].startDate).to.be.eql(new Date('2018-04-22'));
            expect(card._subscriptions[1].endDate).to.be.eql(new Date('2018-05-21'));
        });
    });

    describe("isValid tests", function () {
        it("Card with no subscription", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.isValid('120', new Date('2018-04-22'))).to.be.false;
        });

        it("Card with subscription", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-22'))).to.be.true;
        });

        it("Card with subscription that covers all lines", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-22'))).to.be.true;
        });

        it("On last date", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-21'))).to.be.true;
        });

        it("One day after", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-22'))).to.be.false;
        });

        it("One day before", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-21'))).to.be.false;
        });

        it("On blocked card", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            card.block();

            expect(card.isValid('120', new Date('2018-04-22'))).to.be.false;
        });
    });

    describe("Try to change values", function () {
        it("Should not change", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.firstName = "Gosho";
            card.lastName = "Peshev";
            card.SSN = "666";

            expect(card.firstName).to.equal("Pesho");
            expect(card.lastName).to.equal("Petrov");
            expect(card.SSN).to.equal("00000000");
        });
    });
});