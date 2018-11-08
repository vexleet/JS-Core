let expect = require("chai").expect;
let Calculator = require("../Calculator").Calculator;

describe("Calculator testing", function () {
    describe("add tests", function () {
        it("Empty calculator", function () {
            let output = new Calculator();

            expect(output.expenses.length).to.equal(0);
        });

        it("Calculator with 2 expenses", function () {
            let output = new Calculator();
            output.add("Pesho");
            output.add(10);

            expect(output.expenses.length).to.equal(2);
            expect(output.expenses[0]).to.equal("Pesho");
            expect(output.expenses[1]).to.equal(10);
        });
    });

    describe("divideNums tests", function () {
        it("Divide with no numbers", function () {
            let output = new Calculator();
            output.add("Pesho");
            output.add("Gosho");

            expect(() => output.divideNums()).to.throw();
        });

        it("Divide with 0, should return 'Cannot divide by zero'", function () {
            let output = new Calculator();
            output.add(10);
            output.add(1);
            output.add(0);

            expect(output.divideNums()).to.equal("Cannot divide by zero");
        });

        it("Divide correctly", function () {
            let output = new Calculator();
            output.add("Pesho");
            output.add(10);
            output.add(1);

            expect(output.divideNums()).to.equal(10);
            expect(output.expenses.length).to.equal(1);
            expect(output.expenses[0]).to.equal(10);
        });
    });

    describe("toString tests", function () {
        it("No expenses", function () {
            let output = new Calculator();

            expect(output.toString()).to.equal("empty array");
        });

        it("With 1 expense", function () {
           let output = new Calculator();
           output.add("Pesho");

           expect(output.toString()).to.equal("Pesho");
        });

        it("With more than 1 expenses", function () {
            let output = new Calculator();
            output.add(10);
            output.add("Pesho");
            output.add("5");

            let expectedResult = "10 -> Pesho -> 5";

            expect(output.toString()).to.equal(expectedResult);
        });
    });

    describe("orderBy tests", function () {
        it("No expenses", function () {
            let output = new Calculator();

            expect(output.orderBy()).to.equal("empty");
        });

        it("Only with numbers as expenses", function () {
            let output = new Calculator();
            output.add(1);
            output.add(10);
            output.add(7);
            output.add(3);

            let expectedResult = "1, 3, 7, 10";
            expect(output.orderBy()).to.equal(expectedResult);
        });

        it("Mixed data as expenses", function () {
            let output = new Calculator();
            output.add(1);
            output.add(true);
            output.add(3.14);
            output.add("Pesho");

            let expectedResult = "1, 3.14, Pesho, true";
            expect(output.orderBy()).to.equal(expectedResult);
        });
    });
});