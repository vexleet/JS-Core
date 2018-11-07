let expect = require("chai").expect;
let nuke = require("../ArmageDom-06").nuke;
let $ = require('jquery');

describe("Nuke", function () {
    let targetHTML;
    beforeEach(() => {
        document.body.innerHTML = '<div id="target">' +
            '<div class="nested target">' +
            '<p>This is some text</p>' +
            '</div>' +
            '<div class="target">' +
            '<p>Empty div</p>' +
            '</div>' +
            '<div class="inside">' +
            '<span class="nested">Some more text</span>' +
            '<span class="target">Some more text</span>' +
            '</div>' +
            '</div>';

        targetHTML = $('#target');
    });

    describe("General tests", () => {
        it("should be a function", () => {
            expect(typeof nuke).to.equal('function');
        });
    });

    describe("Values tests", () => {
        it("with a invalid selector, should not change the html", () => {
            let selectorOne = 'invalid';
            let selectorTwo = $('.inside');
            let oldHTML = targetHTML.html();
            nuke(selectorOne, selectorTwo);
            expect(targetHTML.html()).to.equal(oldHTML);
        });

        it("with same selectors, should not change the html", () => {
            let selector = $('.inside');
            let oldHTML = targetHTML.html();
            nuke(selector, selector);
            expect(targetHTML.html()).to.equal(oldHTML);
        });

        it("with correct selectors but not existed, should not change html", () => {
            let selectorOne = $('.nested');
            let selectorTwo = $('.inside');
            let oldHTML = targetHTML.html();
            nuke(selectorOne, selectorTwo);
            expect(targetHTML.html()).to.equal(oldHTML);
        });

        it("with valid selectors, should change the html", () => {
            let selectorOne = $('.nested');
            let selectorTwo = $('.target');
            let oldHTML = targetHTML.html();
            nuke(selectorOne, selectorTwo);
            expect(targetHTML.html()).to.not.equal(oldHTML);
        });
    });
});