'use strict';

var supportsColor = require('supports-color');
var ansiStyles = require('ansi-styles');

var TermColor = {
    bgRed: buildColor('bgRed'),
    bgYellow: buildColor('bgYellow'),
    bgGreen: buildColor('bgGreen'),
    bgBlue: buildColor('bgBlue'),
    bgCyan: buildColor('bgCyan'),
    bold: buildColor('bold')
};

TermColor.enabled = supportsColor;

module.exports = TermColor;

function buildColor(colorName) {
    return function colorFn(str) {
        if (!TermColor.enabled) {
            return str;
        }

        var code = ansiStyles[colorName];

        return code.open + str + code.close;
    };
}
