let expect = require("chai").expect;
let rgbToHexColor = require("../RgbToHex-06").rgbToHexColor;

describe("Normal Cases (valid input)", function () {
    it("should return #FF9EAA of (255, 158, 170)", function () {
        let expectedResult = "#FF9EAA";
        let actualColor = rgbToHexColor(255, 158, 170);

        expect(actualColor).to.be.equal(expectedResult);
    });

    it("should return #0C0D0E of (12, 13, 14)", function () {
        let expectedResult = "#0C0D0E";
        let actualColor = rgbToHexColor(12, 13, 14);

        expect(actualColor).to.be.equal(expectedResult);
    });

    it("should return #000000 of (0, 0, 0)", function () {
        let expectedResult = "#000000";
        let actualColor = rgbToHexColor(0, 0, 0);

        expect(actualColor).to.be.equal(expectedResult);
    });

    it("should return #FFFFFF of (255, 255, 255)", function () {
        let expectedResult = "#FFFFFF";
        let actualColor = rgbToHexColor(255, 255, 255);

        expect(actualColor).to.be.equal(expectedResult);
    });
});

describe("Special Cases (invalid input)", function () {
    it("should return undefined for (-1,0,0)", function () {
        expect(rgbToHexColor(-1, 0, 0)).to.be.equal(undefined);
    });
    it("should return undefined for (0,-1,0)", function () {
        expect(rgbToHexColor(0, -1, 0)).to.be.equal(undefined);
    });
    it("should return undefined for (0,0,-1)", function () {
        expect(rgbToHexColor(0, 0, -1)).to.be.equal(undefined);
    });
    it("should return undefined for (256,0,0)", function () {
        expect(rgbToHexColor(256, 0, 0)).to.be.equal(undefined);
    });
    it("should return undefined for (0,256,0)", function () {
        expect(rgbToHexColor(0, 256, 0)).to.be.equal(undefined);
    });
    it("should return undefined for (0,0,256)", function () {
        expect(rgbToHexColor(0, 0, 256)).to.be.equal(undefined);
    });
    it("should return undefined for (3.14,0,0)", function () {
        expect(rgbToHexColor(3.14, 0, 0)).to.be.equal(undefined);
    });
    it("should return undefined for (0,3.14,0)", function () {
        expect(rgbToHexColor(0, 3.14, 0)).to.be.equal(undefined);
    });
    it("should return undefined for (0,0,3.14)", function () {
        expect(rgbToHexColor(0, 0, 3.14)).to.be.equal(undefined);
    });
    it('should return undefined for ("5", [3], {8:9})', function () {
        expect(rgbToHexColor("5", [3], {8:9})).to.be.equal(undefined);
    });
    it("should return undefined for empty input", function () {
        expect(rgbToHexColor()).to.be.equal(undefined);
    });
});