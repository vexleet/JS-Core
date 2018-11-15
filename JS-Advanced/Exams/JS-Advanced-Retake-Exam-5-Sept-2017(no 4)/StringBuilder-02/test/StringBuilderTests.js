// let expect = require("chai").expect;
// let StringBuilder = require("../StringBuilder").StringBuilder;

describe("StringBuilder", function () {
    describe("Constructor tests", function () {
        it("With non string as parameter", function () {
            expect(() => str = new StringBuilder(50)).to.throw();
        });

        it("With string as parameter", function () {
            let str = new StringBuilder("hello");

            expect(str._stringArray.length).to.equal(5);
            expect(str._stringArray[0]).to.equal("h");
            expect(str._stringArray[1]).to.equal("e");
            expect(str._stringArray[2]).to.equal("l");
            expect(str._stringArray[3]).to.equal("l");
            expect(str._stringArray[4]).to.equal("o");
        });

        it('has functions attached to prototype', function () {
            let str = new StringBuilder("hello");

            expect(Object.getPrototypeOf(str).hasOwnProperty('append')).to.equal(true);
            expect(Object.getPrototypeOf(str).hasOwnProperty('prepend')).to.equal(true);
            expect(Object.getPrototypeOf(str).hasOwnProperty('insertAt')).to.equal(true);
            expect(Object.getPrototypeOf(str).hasOwnProperty('remove')).to.equal(true);
            expect(Object.getPrototypeOf(str).hasOwnProperty('toString')).to.equal(true);
        });

        it("With no parameter parsed", function () {
            let str = new StringBuilder();

            expect(str._stringArray.length).to.equal(0);
            expect(str._stringArray).to.be.eql([]);
        });
    });

    describe("append tests", function () {
        it("With parsed non string as parameter", function () {
            let str = new StringBuilder('hello');

            expect(() => str.append(10)).to.throw();
        });

        it("With parsed string as parameter and empty array", function () {
            let str = new StringBuilder();
            str.append('hello');

            expect(str._stringArray.length).to.equal(5);
            expect(str._stringArray.join("")).to.equal('hello');

        });

        it("With parsed string as parameter and not empty array", function () {
            let str = new StringBuilder('pesho');
            str.append('hello');

            expect(str._stringArray.length).to.equal(10);
        });
    });

    describe("prepend tests", function () {
        it("With parsed non string as parameter", function () {
            let str = new StringBuilder('hello');

            expect(() => str.prepend(10)).to.throw();
        });

        it("With parsed string as parameter and empty array", function () {
            let str = new StringBuilder();
            str.prepend('hello');

            expect(str._stringArray.length).to.equal(5);
            expect(str._stringArray[0]).to.equal("h");
            expect(str._stringArray[1]).to.equal("e");
            expect(str._stringArray[2]).to.equal("l");
            expect(str._stringArray[3]).to.equal("l");
            expect(str._stringArray[4]).to.equal("o");
        });

        it("With parsed string as parameter and not empty array", function () {
            let str = new StringBuilder('pesho');
            str.prepend('hello');

            expect(str._stringArray.length).to.equal(10);
        });
    });

    describe("insertAt tests", function () {
        it("With parsed non string as parameter", function () {
            let str = new StringBuilder('hello');

            expect(() => str.insertAt(10, 'pesho')).to.throw();
        });

        it("With parsed string as parameter and empty array", function () {
            let str = new StringBuilder();
            str.insertAt('hello', 0);

            expect(str._stringArray.length).to.equal(5);
            expect(str._stringArray[0]).to.equal("h");
            expect(str._stringArray[1]).to.equal("e");
            expect(str._stringArray[2]).to.equal("l");
            expect(str._stringArray[3]).to.equal("l");
            expect(str._stringArray[4]).to.equal("o");
        });

        it("With parsed string as parameter and not empty array", function () {
            let str = new StringBuilder('pesho');
            str.insertAt('hello', 5);

            expect(str._stringArray.length).to.equal(10);
        });

        it("With parsed string as parameter and not empty array", function () {
            let str = new StringBuilder('pesho');
            str.insertAt('hello', '1');

            expect(str._stringArray.length).to.equal(10);
        });
    });

    describe("remove tests", function () {
        it("With parsed string as parameter and empty array", function () {
            let str = new StringBuilder('hello');
            str.remove(0, 3);

            expect(str._stringArray.length).to.equal(2);
        });

        it("With parsed string as parameter and not empty array", function () {
            let str = new StringBuilder('pesho');
            str.insertAt('hello', 5);
            str.remove(0, 3);

            expect(str._stringArray.length).to.equal(7);
        });

        it("should not remove if index are wrong", function () {
            let str = new StringBuilder('pesho');
            str.insertAt('hello', 5);
            str.remove(20, 50);

            expect(str._stringArray.length).to.equal(10);
        });
    });

    describe("toString tests", function () {
        it("with empty array", function () {
            let str = new StringBuilder();

            expect(str.toString()).to.equal("");
        });

        it("with 1 element", function () {
            let str = new StringBuilder('hello');

            expect(str.toString()).to.equal("hello");
        });

        it("with not empty array", function () {
            let str = new StringBuilder('hello');
            str.append(', there');
            str.prepend('User, ');
            str.insertAt('woop', 5);
            console.log(str.toString());

            let expectedResult = "User,woop hello, there";

            expect(str.toString()).to.equal(expectedResult);
            str.remove(6, 3);
            expectedResult = "User,w hello, there";
            expect(str.toString()).to.equal(expectedResult);
        });
    });
});