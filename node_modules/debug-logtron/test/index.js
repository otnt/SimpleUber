'use strict';

var test = require('tape');
var process = require('process/');
var os = require('os');

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
    assert.equal(line.namespace, 'debuglogtron');
    assert.equal(line.msg, 'debug: hi ~ null');

    assert.end();
});

test('can log async', function t(assert) {
    var logger = allocLogger();

    logger.debug('oh hi', {}, onLogged);

    function onLogged(err) {
        assert.ifError(err);
        assert.equal(logger.lines.length, 1);

        var line = logger.lines[0];
        assert.equal(line.namespace, 'debuglogtron');
        assert.equal(line.msg, 'debug: oh hi ~ {}');

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
    logger.error('error');
    logger.fatal('fatal');

    assert.equal(logger.lines.length, 7);

    var line = logger.lines[0];
    assert.equal(line.namespace, 'debuglogtron');
    assert.equal(line.msg, 'trace: trace ~ null');

    var line2 = logger.lines[1];
    assert.equal(line2.namespace, 'debuglogtron');
    assert.equal(line2.msg, 'debug: debug ~ null');

    var line3 = logger.lines[2];
    assert.equal(line3.namespace, 'debuglogtron');
    assert.equal(line3.msg, 'info: info ~ null');

    var line4 = logger.lines[3];
    assert.equal(line4.namespace, 'debuglogtron');
    assert.equal(line4.msg, 'access: access ~ null');

    var line5 = logger.lines[4];
    assert.equal(line5.namespace, 'debuglogtron');
    assert.equal(line5.msg, 'warn: warn ~ null');

    var line6 = logger.lines[5];
    assert.equal(line6.namespace, 'debuglogtron');
    assert.equal(line6.msg, 'error: error ~ null');

    var line7 = logger.lines[6];
    assert.equal(line7.namespace, 'debuglogtron');
    assert.equal(line7.msg, 'fatal: fatal ~ null');

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

    assert.equal(line.namespace, 'debuglogtron');
    assert.equal(line.msg, 'info: hello ~ ' +
        '{ complex: { nested: true, foo: \'bar\' } }');

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

function allocLogger() {
    /* eslint no-process-env: 0 */
    var prev = process.env.NODE_DEBUG;
    process.env.NODE_DEBUG = 'debuglogtrontestcode';
    var logger = DebugLogtron('debuglogtron', {
        debuglog: function fakeDebuglog(namespace) {
            return function logStatement(msg) {
                logger.lines.push({
                    namespace: namespace,
                    msg: msg
                });
            };
        }
    });
    logger.lines = [];
    process.env.NODE_DEBUG = prev;

    return logger;
}
