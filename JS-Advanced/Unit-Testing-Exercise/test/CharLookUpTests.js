let expect = require("chai").expect;
let lookupChar = require("../CharLookUp-03").lookupChar;

describe("Char Look up", function () {
    it("with a non-string first parameter, result should be undefined", function () {
        expect(lookupChar(15, 2)).to.equal(undefined, "Function did not return the correct result!");
    });

    it("with a non-integer second parameter, result should be undefined", function () {
        expect(lookupChar("pesho", {name: "pesho"})).to.equal(undefined, "Function did not return the correct result!");
    });

    it("with a floating point number as second parameter, result should undefined", function () {
        expect(lookupChar("pesho", 4.5)).to.equal(undefined, "Function did not return the correct result!");
    });

    it("with an incorrect index value, result should return incorrect index", function () {
        expect(lookupChar("pesho", 10)).to.equal("Incorrect index", "Function did not return the correct result!");
    });

    it("with a negative index value, result should return incorrect index", function () {
        expect(lookupChar("gosho", -10)).to.equal("Incorrect index", "Function did not return the correct result!");
    });

    it("with an index value equal to string length, should return incorrect index", function () {
        expect(lookupChar("gosho", 5)).to.equal("Incorrect index", "Function did not return the correct result!");
    });

    it("with correct parameters, should return correct value", function () {
       expect(lookupChar("pesho", 0)).to.equal("p", "Function did not return the correct result!");
    });

    it("with correct parameters, should return correct value", function () {
        expect(lookupChar("stamat", 3)).to.equal("m", "Function did not return the correct result!");
    });
});