'use strict';

var LEVELS_BY_NAME = {
    'trace': 10,
    'debug': 20,
    'info': 30,
    'access': 35,
    'warn': 40,
    'error': 50,
    'fatal': 60
};

var LEVELS_BY_VALUE = {
    '10': 'trace',
    '20': 'debug',
    '30': 'info',
    '35': 'access',
    '40': 'warn',
    '50': 'error',
    '60': 'fatal'
};

module.exports = {
    LEVELS_BY_NAME: LEVELS_BY_NAME,
    LEVELS_BY_VALUE: LEVELS_BY_VALUE
};
