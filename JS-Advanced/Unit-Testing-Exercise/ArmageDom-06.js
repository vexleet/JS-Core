let jsdom = require('jsdom-global')();
let $ = require('jquery');

function nuke(selector1, selector2) {
    if (selector1 === selector2) return;
    $(selector1).filter(selector2).remove();
}

document.body.innerHTML = '<div id="target">' +
    '    <div class="nested target">' +
    '        <p>This is some text</p>' +
    '    </div>\n' +
    '    <div class="target">' +
    '        <p>Empty div</p>' +
    '    </div>\n' +
    '    <div class="inside">' +
    '        <span class="nested">Some more text</span>' +
    '        <span class="target">Some more text</span>' +
    '    </div>' +
    '</div>';

module.exports = {nuke};