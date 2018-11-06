let expect = require("chai").expect;
let mathEnforcer = require("../MathEnforcer-04").mathEnforcer;

describe("Math Enforcer", function () {
    describe("Add Five", function () {
        it("with a non-number parameter, should return undefined", function () {
            expect(mathEnforcer.addFive("pesho")).to.equal(undefined, "Function did not return the correct result!");
        });

        it("with a number parameter, should return correct result", function () {
            expect(mathEnforcer.addFive(5)).to.equal(10, "Function did not return the correct result!");
        });

        it("with a negative number parameter, should return correct result", function () {
            expect(mathEnforcer.addFive(-6)).to.equal(-1, "Function did not return the correct result!");
        });

        it("with a float number parameter, should return correct result", function () {
            expect(mathEnforcer.addFive(2.2)).to.closeTo(7.2, 0.01, "Function did not return the correct result!");
        });

        it("with a float number parameter, should return correct result", function () {
            expect(mathEnforcer.addFive(-4.99)).to.closeTo(0.001, 0.01, "Function did not return the correct result!");
        });
    });

    describe("Subtract Ten", function () {
        it("with a non-number parameter, should return undefined", function () {
            expect(mathEnforcer.subtractTen("gosho")).to.equal(undefined, "Function did not return the correct result!");
        });

        it("with a number parameter, should return correct result", function () {
            expect(mathEnforcer.subtractTen(20)).to.equal(10, "Function did not return the correct result!");
        });

        it("with a negative number parameter, should return correct result", function () {
            expect(mathEnforcer.subtractTen(-6)).to.equal(-16, "Function did not return the correct result!");
        });

        it("with a float number parameter, should return correct result", function () {
            expect(mathEnforcer.subtractTen(20.2)).to.closeTo(10.2, 0.01, "Function did not return the correct result!");
        });

        it("with a float number parameter, should return correct result", function () {
            expect(mathEnforcer.subtractTen(11.99)).to.closeTo(1.99, 0.01, "Function did not return the correct result!");
        });
    });

    describe("Sum", function () {
        it("with a non-number as first parameter, should return undefined", function () {
            expect(mathEnforcer.sum("pesho", 5)).to.equal(undefined, "Function did not return the correct result!");
        });

        it("with a non-number as second parameter, should return undefined", function () {
            expect(mathEnforcer.sum(10, "tosho")).to.equal(undefined, "Function did not return the correct result!");
        });

        it("with number parameters, should return correct result", function () {
            expect(mathEnforcer.sum(10, 5)).to.equal(15, "Function did not return the correct result!");
        });

        it("with two negative numbers as parameters, should return correct result", function () {
            expect(mathEnforcer.sum(-10, -5)).to.equal(-15, "Function did not return the correct result!");
        });

        it("with two float numbers as parameters, should return correct result", function () {
            expect(mathEnforcer.sum(20.2, 2.2)).to.closeTo(22.4, 0.01, "Function did not return the correct result!");
        });
    });
});