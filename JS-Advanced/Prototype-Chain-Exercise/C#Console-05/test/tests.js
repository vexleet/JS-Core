let expect = require("chai").expect;
let Console = require("../solution").Console;

describe("C# Console tests", function () {
    describe("writeLine(string) tests", function () {
        it("with string as message", function () {
            expect(Console.writeLine("Pesho")).to.equal("Pesho");
        });

        it("with a number as message", function () {
           expect(Console.writeLine(5)).to.equal(undefined);
        });
    });

    describe("writeLine(object) tests", function () {
        it("with object as message", function () {
           expect(Console.writeLine({name: "pesho"})).to.equal('{"name":"pesho"}')
        });

        it("with a number as message", function () {
            expect(Console.writeLine(5)).to.equal(undefined);
        });
    });

    describe("writeLine(templateString, parameters) tests", function () {
        it("Nothing parsed in", function () {
            expect(() => Console.writeLine()).to.throw();
        });

        it("with multiple arguments but first one is not a string",  function () {
            expect(() => Console.writeLine({name: "Pesho"}, 1, 2, 3)).to.throw();
        });

        it("with correct arguments but parameters does not correspond to the length of the placeholders", function () {
           expect(() => Console.writeLine("{0} is the {1} person ever", "Pesho", "person", "YES", "gosho")).to.throw();
        });

        it("with placeholders with 2 numbers", function () {
            expect(() => Console.writeLine("The numbers are {0} and {0}", 2, 1)).to.throw();
        });

        it("with correct parameters", function () {
           expect(Console.writeLine("The sum of {0} and {1} is {2}", 2, 1, 3)).to.equal("The sum of 2 and 1 is 3");
        });

        it("with invalid placeholder is given", function () {
            expect(() => Console.writeLine("The sum of {0} and {1} is {2}", 1, 3)).to.throw();
        });

        it("with parameters as strings", function () {
            expect(Console.writeLine("The sum of {0} and {1} is {2}", "2", "1", "3")).to.equal("The sum of 2 and 1 is 3");
        });

        it("with out of index placeholder", function () {
            expect(() => Console.writeLine("Not {10}", "valid")).to.throw(RangeError);
        });
    });
});