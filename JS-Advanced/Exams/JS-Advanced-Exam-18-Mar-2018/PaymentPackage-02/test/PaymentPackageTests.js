// let expect = require("chai").expect;
// let PaymentPackage = require("../PaymentPackage").PaymentPackage;

describe("PaymentPackage", function () {
    describe("Constructor tests", function () {
        it("Parse parameters correctly", function () {
            const hrPack = new PaymentPackage('HR Services', 50);

            expect(hrPack.name).to.equal("HR Services");
            expect(hrPack.value).to.equal(50);
        });

        it("Parse nothing", function () {
            expect(function () {
                const hrPack = new PaymentPackage();
            }).to.throw();
        });

        it("Parse only name", function () {
            expect(function () {
                const hrPack = new PaymentPackage('HR Services');
            }).to.throw();
        });

        it("Parse name as string and value as object", function () {
            expect(function () {
                const hrPack = new PaymentPackage('HR Services', {name: "pesho"});
            }).to.throw();
        });

        it("Parse name as string and value as negative number", function () {
            expect(function () {
                const hrPack = new PaymentPackage('HR Services', -1);
            }).to.throw();
        });

        it("Parse name as number and value as number", function () {
            expect(function () {
                const hrPack = new PaymentPackage(50, 100);
            }).to.throw();
        });

        it("Parse empty string as name and value as number", function () {
            expect(function () {
                const hrPack = new PaymentPackage('', 100);
            }).to.throw();
        });
    });

    describe("Set and get VAT tests", function () {
        it("VAT default value", function () {
            const hrPack = new PaymentPackage('HR Services', 50);

            expect(hrPack.VAT).to.equal(20);
        });

        it("Set VAT value as a non-number parameter", function () {
            const hrPack = new PaymentPackage('HR Services', 50);

            expect(function () {
                hrPack.VAT = "Pesho";
            }).to.throw();
        });

        it("Set VAT value as a negative number", function () {
            const hrPack = new PaymentPackage('HR Services', 50);

            expect(function () {
                hrPack.VAT = -50;
            }).to.throw();
        });

        it("Set VAT value as a floating number", function () {
            const hrPack = new PaymentPackage('HR Services', 50);
            hrPack.VAT = 0.5;

            expect(hrPack.VAT).to.equal(0.5);
        });

        it("Set VAT value correctly and get its value", function () {
            const hrPack = new PaymentPackage('HR Services', 50);
            hrPack.VAT = 100;

            expect(hrPack.VAT).to.equal(100);
        });
    });

    describe("Set and get active value", function () {
        it("Active default value", function () {
            const hrPack = new PaymentPackage('HR Services', 50);

            expect(hrPack.active).to.be.true;
        });

        it("Set active value with a non-boolean parameter", function () {
            const hrPack = new PaymentPackage('HR Services', 50);

            expect(function () {
                hrPack.active = "false";
            }).to.throw();
        });

        it("Set active value correctly and get its value", function () {
            const hrPack = new PaymentPackage('HR Services', 50);
            hrPack.active = false;

            expect(hrPack.active).to.be.false;
        });

        it("Set active value correctly and after that to true again and get its value", function () {
            const hrPack = new PaymentPackage('HR Services', 50);
            hrPack.active = false;
            hrPack.active = true;

            expect(hrPack.active).to.be.true;
        });
    });

    describe("toString tests", function () {
        it("With active parameter", function () {
            const hrPack = new PaymentPackage('HR Services', 1500);

            const output = [
                `Package: HR Services`,
                `- Value (excl. VAT): 1500`,
                `- Value (VAT 20%): 1800`
            ];

            expect(hrPack.toString()).to.equal(output.join("\n"));
        });

        it("should return correct value for ('heyheyhey', 0.5)", function () {
            let p = new PaymentPackage("heyheyhey", 0.5);
            let expectedText = [
                `Package: ${p.name}` + '',
                `- Value (excl. VAT): ${p.value}`,
                `- Value (VAT ${p.VAT}%): ${p.value * (1 + p.VAT / 100)}`
            ].join("\n");
            let actualText = p.toString();

            expect(actualText).to.be.equal(expectedText);
        });

        it("With active parameter and changed VAT value", function () {
            const hrPack = new PaymentPackage('HR Services', 1500);
            hrPack.VAT = 30;

            const output = [
                `Package: HR Services`,
                `- Value (excl. VAT): 1500`,
                `- Value (VAT 30%): 1950`
            ];

            expect(hrPack.toString()).to.equal(output.join("\n"));
        });

        it("With inactive parameter", function () {
            const hrPack = new PaymentPackage('HR Services', 1500);
            hrPack.active = false;

            const output = [
                `Package: HR Services (inactive)`,
                `- Value (excl. VAT): 1500`,
                `- Value (VAT 20%): 1800`
            ];

            expect(hrPack.toString()).to.equal(output.join("\n"));
        });

        it("With value that is 0", function () {
            const hrPack = new PaymentPackage('HR Services', 0);
            hrPack.active = false;

            const output = [
                `Package: HR Services (inactive)`,
                `- Value (excl. VAT): 0`,
                `- Value (VAT 20%): 0`
            ];

            expect(hrPack.toString()).to.equal(output.join("\n"));
        });
    });
});