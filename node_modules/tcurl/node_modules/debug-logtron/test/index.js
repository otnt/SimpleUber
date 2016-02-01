'use strict';

var test = require('tape');
var process = require('process/');
var os = require('os');
var chalk = require('chalk');

chalk.enabled = false;

var DebugLogtron = require('../index.js');
var LogMessage = require('../log-message.js');
var JSONLogRecord = LogMessage.JSONLogRecord;

test('DebugLogtron is a function', function t(assert) {
    assert.equal(typeof DebugLogtron, 'function');
    assert.end();
});

test('can create logger', function t(assert) {
    var logger = allocLogger();

    logger.debug('hi');

    assert.equal(logger.lines.length, 1);

    var line = logger.lines[0];
    assert.ok(line.msg.indexOf('DEBUG: hi ~ null') >= 0);

    assert.end();
});

test('can log async', function t(assert) {
    var logger = allocLogger();

    logger.debug('oh hi', {}, onLogged);

    function onLogged(err) {
        assert.ifError(err);
        assert.equal(logger.lines.length, 1);

        var line = logger.lines[0];
        assert.ok(line.msg.indexOf('DEBUG: oh hi ~ {}') >= 0);

        assert.end();
    }
});

test('logger throws with bad namespace', function t(assert) {
    assert.throws(function throwIt() {
        DebugLogtron('bad name');
    }, /found space character/);
    assert.throws(function throwIt() {
        DebugLogtron('bad-name');
    }, /found - character/);
    assert.throws(function throwIt() {
        DebugLogtron('bad#name');
    }, /found bad character/);

    assert.end();
});

test('logger defaults opts', function t(assert) {
    assert.doesNotThrow(function noThrow() {
        DebugLogtron('somenamespace');
    });

    assert.end();
});

test('logger levels', function t(assert) {
    /*eslint max-statements: 0*/
    var logger = allocLogger();

    logger.trace('trace');
    logger.debug('debug');
    logger.info('info');
    logger.access('access');
    logger.warn('warn');

    assert.equal(logger.lines.length, 5);

    var line = logger.lines[0];
    assert.ok(line.msg.indexOf('TRACE: trace ~ null') >= 0);

    var line2 = logger.lines[1];
    assert.ok(line2.msg.indexOf('DEBUG: debug ~ null') >= 0);

    var line3 = logger.lines[2];
    assert.ok(line3.msg.indexOf('INFO: info ~ null') >= 0);

    var line4 = logger.lines[3];
    assert.ok(line4.msg.indexOf('ACCESS: access ~ null') >= 0);

    var line5 = logger.lines[4];
    assert.ok(line5.msg.indexOf('WARN: warn ~ null') >= 0);

    assert.throws(function throwIt() {
        logger.error('error');
    }, 'error');
    assert.throws(function throwIt() {
        logger.fatal('fatal');
    }, 'fatal');

    var line6 = logger.lines[5];
    assert.ok(line6.msg.indexOf('ERROR: error ~ null') >= 0);

    var line7 = logger.lines[6];
    assert.ok(line7.msg.indexOf('FATAL: fatal ~ null') >= 0);

    assert.end();
});

test('fails with string meta', function t(assert) {
    assert.throws(function throwIt() {
        var logger = allocLogger();

        logger.info('hi', 'string meta');
    }, /meta must be an object/);

    assert.end();
});

test('serialize meta', function t(assert) {
    var logger = allocLogger();

    logger.info('hello', {
        complex: {
            nested: true, foo: 'bar'
        }
    });

    assert.equal(logger.lines.length, 1);
    var line = logger.lines[0];

    assert.ok(line.msg.indexOf('INFO: hello ~ ' +
        '{ complex: { nested: true, foo: \'bar\' } }') >= 0);

    assert.end();
});

test('JSONLogRecord without new', function t(assert) {
    var logRecord = JSONLogRecord(20, 'hi', null);

    assert.ok(logRecord);
    assert.equal(logRecord.levelName, 'debug');
    assert.equal(logRecord.meta, null);
    assert.equal(logRecord.fields.msg, 'hi');

    assert.end();
});

test('LogMessage without new', function t(assert) {
    var logMessage = LogMessage(20, 'hi', null);

    assert.ok(logMessage);
    assert.equal(logMessage.levelName, 'debug');
    assert.equal(logMessage.meta, null);
    assert.equal(logMessage.msg, 'hi');

    assert.end();
});

test('LogMessage to buffer', function t(assert) {
    var hostname = os.hostname();

    var time = (new Date()).toISOString();
    var logMessage = LogMessage(20, 'hi', null, time);

    var buf = logMessage.toBuffer();

    assert.equal(String(buf),
        '{"name":null,' +
        '"hostname":"' + hostname + '",' +
        '"pid":' + process.pid + ',' +
        '"component":null,' +
        '"level":20,' +
        '"msg":"hi",' +
        '"time":"' + time + '",' +
        '"src":null,' +
        '"v":0}'
    );

    var buf2 = logMessage.toBuffer();
    assert.equal(buf, buf2);

    var logRecord = logMessage.toLogRecord();
    var logRecord2 = logMessage.toLogRecord();
    assert.equal(logRecord, logRecord2);

    assert.end();
});

test('logger respects color option', function t(assert) {
    chalk.enabled = true;
    var logger1 = allocLogger({
        colors: false
    });
    var logger2 = allocLogger({
        colors: true
    });

    logger1.info('hi');
    logger2.info('hi');

    var line1 = logger1.lines[0].msg;
    assert.ok(line1.indexOf('INFO: hi ~ null') >= 0);

    var line2 = logger2.lines[0].msg;
    assert.ok(
        line2.indexOf('INFO:\u001b[49m\u001b[22m hi ~ null') >= 0
    );

    chalk.enabled = false;
    assert.end();
});

test('always prints error/fatal', function t(assert) {
    var lines = [];
    var logger = DebugLogtron('wat', {
        console: {
            error: function log(x) {
                lines.push(x);
            }
        }
    });

    assert.throws(function throwIt() {
        logger.error('hi');
    }, 'hi');
    assert.equal(lines.length, 1);
    var line = lines[0];
    assert.ok(line.indexOf('ERROR: hi ~ null') >= 0);

    lines = [];
    logger.info('lul');
    assert.equal(lines.length, 0);

    assert.end();
});

test('prints warn/info if NODE_DEBUG', function t(assert) {
    var lines = [];
    var logger = DebugLogtron('wat', {
        console: {
            error: function log(x) {
                lines.push(x);
            }
        },
        env: {
            NODE_DEBUG: 'wat'
        }
    });

    logger.info('hi');
    assert.equal(lines.length, 1);

    assert.ok(lines[0].indexOf('INFO: hi ~ null') >= 0);

    lines = [];
    logger.debug('roflcopter');

    assert.equal(lines.length, 0);

    assert.end();
});

test('prints warn/info if enabled', function t(assert) {
    var lines = [];
    var logger = DebugLogtron('wat', {
        console: {
            error: function log(x) {
                lines.push(x);
            }
        },
        enabled: true
    });

    logger.info('hi');
    assert.equal(lines.length, 1);

    assert.ok(lines[0].indexOf('INFO: hi ~ null') >= 0);

    lines = [];
    logger.debug('roflcopter');

    assert.equal(lines.length, 0);

    assert.end();
});

test('prints debug/access/trace if NODE_DEBUG verbose', function t(assert) {
    var lines = [];
    var logger = DebugLogtron('wat', {
        console: {
            error: function log(x) {
                lines.push(x);
            }
        },
        env: {
            NODE_DEBUG: 'watverbose'
        }
    });

    logger.debug('hi');
    assert.equal(lines.length, 1);

    assert.ok(lines[0].indexOf('DEBUG: hi ~ null') >= 0);

    logger.info('hi');

    assert.equal(lines.length, 2);
    assert.ok(lines[1].indexOf('INFO: hi ~ null') >= 0);

    assert.throws(function throwIt() {
        logger.error('hi');
    }, 'hi');

    assert.equal(lines.length, 3);
    assert.ok(lines[2].indexOf('ERROR: hi ~ null') >= 0);

    assert.end();
});

test('prints debug/access/trace if verbose', function t(assert) {
    var lines = [];
    var logger = DebugLogtron('wat', {
        console: {
            error: function log(x) {
                lines.push(x);
            }
        },
        verbose: true
    });

    logger.debug('hi');
    assert.equal(lines.length, 1);

    assert.ok(lines[0].indexOf('DEBUG: hi ~ null') >= 0);

    logger.info('hi');

    assert.equal(lines.length, 2);
    assert.ok(lines[1].indexOf('INFO: hi ~ null') >= 0);

    assert.throws(function throwIt() {
        logger.error('hi');
    }, 'hi');

    assert.equal(lines.length, 3);
    assert.ok(lines[2].indexOf('ERROR: hi ~ null') >= 0);

    assert.end();
});

test('writes to assert comment', function t(assert) {
    var lines = [];
    var comments = [];
    var logger = DebugLogtron('wat', {
        console: {
            error: function log(x) {
                lines.push(x);
            }
        },
        assert: {
            comment: function comment(x) {
                comments.push(x);
            }
        },
        verbose: true
    });

    logger.debug('hi');

    assert.equal(lines.length, 0);
    assert.equal(comments.length, 1);

    assert.ok(comments[0].indexOf('DEBUG: hi ~ null') >= 0);

    assert.end();
});

function allocLogger(opts) {
    opts = opts || {};
    var logger = DebugLogtron('debuglogtrontestcode', {
        env: {
            NODE_DEBUG: 'debuglogtrontestcode ' +
                'debuglogtrontestcodeverbose'
        },
        console: {
            error: function logStatement(msg) {
                logger.lines.push({
                    msg: msg
                });
            }
        },
        colors: opts.colors
    });
    logger.lines = [];

    return logger;
}
