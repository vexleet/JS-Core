// let expect = require("chai").expect;
// let HolidayPackage = require("../HolidayPackage").HolidayPackage;

describe("Holiday Package", function () {
    describe("Constructor tests", function () {
        it("Should be initialized correctly", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            expect(holidayPackage.destination).to.equal("Italy");
            expect(holidayPackage.season).to.equal("Summer");
        });
    });

    describe("addVacationer tests", function () {
        it("Should throw an error because name is not a string", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            expect(() => holidayPackage.addVacationer(5)).to.throw();
        });

        it("Should throw an error because name is empty", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            expect(() => holidayPackage.addVacationer(' ')).to.throw();
        });

        it("Should throw and error because name length is less than 2", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            expect(() => holidayPackage.addVacationer("Pesho")).to.throw();
        });

        it("Should throw an error because name length is more than 2", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            expect(() => holidayPackage.addVacationer("Pesho Petrov Kukata")).to.throw();
        });

        it("Add vacationers correctly ", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');

            expect(holidayPackage.showVacationers()).to.equal("Vacationers:\n" +
                "Ivan Ivanov\n" +
                "Petar Petrov\n" +
                "Georgi Georgiev")
        });
    });

    describe("showVacationers tests", function () {
        it("Show no vacationers", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            expect(holidayPackage.showVacationers()).to.equal("No vacationers are added yet");
        });

        it("Show vacationers", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');

            expect(holidayPackage.showVacationers()).to.equal("Vacationers:\n" +
                "Ivan Ivanov\n" +
                "Petar Petrov\n" +
                "Georgi Georgiev")
        });
    });

    describe("set insuranceIncluded tests", function () {


        it("Set insurance properly and return it", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            holidayPackage.insuranceIncluded = true;

            expect(holidayPackage.insuranceIncluded).to.be.true;
        });

        it("Get insurance default value", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            expect(holidayPackage.insuranceIncluded).to.be.false;
        });
    });

    describe("generateHolidayPackage tests", function () {
        it("Should throw an error because no vacationers", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');

            expect(() => holidayPackage.generateHolidayPackage()).to.throw();
        });

        it("Holiday with no insurance and no special season", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Autumn');
            holidayPackage.addVacationer("Pesho Petrov");
            let totalPrice = holidayPackage.vacationers.length * 400;

            let expectedResult = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + totalPrice;

            expect(holidayPackage.generateHolidayPackage()).to.equal(expectedResult);
        });

        it("Holiday with no insurance but with special season", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            holidayPackage.addVacationer("Pesho Petrov");
            let totalPrice = holidayPackage.vacationers.length * 400 + 200;

            let expectedResult = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + totalPrice;

            expect(holidayPackage.generateHolidayPackage()).to.equal(expectedResult);
        });

        it("Holiday with insurance but no special season", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Spring');
            holidayPackage.addVacationer("Pesho Petrov");
            holidayPackage.insuranceIncluded = true;
            let totalPrice = holidayPackage.vacationers.length * 400 + 100;

            let expectedResult = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + totalPrice;

            expect(holidayPackage.generateHolidayPackage()).to.equal(expectedResult);
        });

        it("Holiday with insurance and special season", function () {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            holidayPackage.addVacationer("Pesho Petrov");
            holidayPackage.insuranceIncluded = true;
            let totalPrice = holidayPackage.vacationers.length * 400 + 200 + 100;

            let expectedResult = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + totalPrice;

            expect(holidayPackage.generateHolidayPackage()).to.equal(expectedResult);
        });
    });
});