let expect = require("chai").expect;
let sum = require("../SumOfNumbers-04").sum;

describe("sum(arr) - sum array of numbers", function () {
    it("should return 3 of [1,2]", function () {
        let expectedSum = 3;
        let actualSum = sum([1, 2]);
        expect(actualSum).to.be.equal(expectedSum);
    });
    it("should return 1 of [1]", function () {
       let expectedSum = 1;
       let actualSum = sum([1]);

       expect(actualSum).to.be.equal(expectedSum);
    });
    it("should return 0 of []", function () {
        let expectedSum = 0;
        let actualSum = sum([0]);

        expect(actualSum).to.be.equal(expectedSum);
    });
    it("should return 3 of [1.5, 2.5, -1]", function () {
        let expectedSum = 3;
        let actualSum = sum([1.5, 2.5, -1]);

        expect(actualSum).to.be.equal(expectedSum);
    });
    it("should return NaN of ['invalid data']", function () {
        let actualSum = sum(["invalid data"]);

        expect(actualSum).to.be.NaN;
    });
});