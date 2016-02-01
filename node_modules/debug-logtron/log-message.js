'use strict';

var assert = require('assert');
var process = require('process/');
var os = require('os');
var Buffer = require('buffer').Buffer;
var extend = require('xtend');

var LEVELS = require('./levels.js').LEVELS_BY_VALUE;

LogMessage.isValid = isValid;
LogMessage.JSONLogRecord = JSONLogRecord;

module.exports = LogMessage;

function LogMessage(level, msg, meta, time) {
    if (!(this instanceof LogMessage)) {
        return new LogMessage(level, msg, meta);
    }

    this.level = level;
    this.levelName = LEVELS[level];
    this.msg = msg;

    this.meta = (meta === null || meta === void 0) ? null : meta;

    this._time = time;
    this._jsonLogRecord = null;
    this._buffer = null;
}

var proto = LogMessage.prototype;

proto.toLogRecord = function toBuffer() {
    if (!this._jsonLogRecord) {
        this._jsonLogRecord = new JSONLogRecord(
            this.level, this.msg, this.meta, this._time);
    }

    return this._jsonLogRecord;
};

proto.toBuffer = function toBuffer() {
    if (!this._buffer) {
        var logRecord = this.toLogRecord();

        var jsonStr = JSON.stringify(logRecord.fields);
        this._buffer = new Buffer(jsonStr);
    }

    return this._buffer;
};

/* JSONLogRecord. The same interface as bunyan on the wire */
function JSONLogRecord(level, msg, meta, time) {
    if (!(this instanceof JSONLogRecord)) {
        return new JSONLogRecord(level, msg, meta, time);
    }

    this.fields = extend(meta, {
        name: null,
        hostname: os.hostname(),
        pid: process.pid,
        component: null,
        level: level,
        msg: msg,
        time: time || (new Date()).toISOString(),
        src: null,
        v: 0
    });

    this.levelName = LEVELS[level];
    this.meta = meta;
}

function isValid(logRecord) {
    assert(typeof logRecord.level === 'number',
        'level must be a number');
    assert(typeof logRecord.msg === 'string',
        'msg must be a string');

    assert(logRecord.meta === null ||
        typeof logRecord.meta === 'object',
        'meta must be an object');
}
