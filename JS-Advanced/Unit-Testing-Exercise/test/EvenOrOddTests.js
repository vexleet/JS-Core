let expect = require("chai").expect;
let isOddOrEven = require("../EvenOrOdd-02").isOddOrEven;

describe("isOddOrEven", function () {
    it("with a number parameter, should return undefined", function () {
        expect(isOddOrEven(13)).to.equal(undefined, "Function did not return the correct result!");
    });

    it("with a object parameter, should return undefined", function () {
       expect(isOddOrEven({name: "pesho"})).to.equal(undefined, "Function did not return the correct result!");
    });

    it("with an even length string, should return correct length", function () {
       expect(isOddOrEven("roar")).to.equal("even", "Function did not return the correct result!");
    });

    it("with an odd length string, should return correct length", function () {
        expect(isOddOrEven("cat")).to.equal("odd", "Function did not return the correct result!");
    });

    it("with multiple test, should return correct length", function () {
        expect(isOddOrEven("dog")).to.equal("odd", "Function did not return the correct result!");
    });

    it("with multiple test, should return correct length", function () {
        expect(isOddOrEven("great")).to.equal("odd", "Function did not return the correct result!");
    });

    it("with multiple test, should return correct length", function () {
        expect(isOddOrEven("rare")).to.equal("even", "Function did not return the correct result!");
    });

    it("with multiple test, should return correct length", function () {
        expect(isOddOrEven("is it even")).to.equal("even", "Function did not return the correct result!");
    });
});