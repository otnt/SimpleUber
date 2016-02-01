'use strict';

var assert = require('assert');
var process = require('process/');
var os = require('os');
var Buffer = require('buffer').Buffer;

var LEVELS = require('./levels.js').LEVELS_BY_VALUE;

LogMessage.isValid = isValid;
LogMessage.JSONLogRecord = JSONLogRecord;

module.exports = LogMessage;

function LogMessage(level, msg, meta, time) {
    this.level = level;
    this.levelName = LEVELS[level];
    this.msg = msg;

    this.meta = (meta === null || meta === void 0) ? null : meta;

    this._time = time;
    this._jsonLogRecord = null;
    this._buffer = null;
}

LogMessage.prototype.toLogRecord = function toLogRecord() {
    if (!this._jsonLogRecord) {
        this._jsonLogRecord = new JSONLogRecord(
            this.level, this.msg, this.meta, this._time);
    }

    return this._jsonLogRecord;
};

LogMessage.prototype.toBuffer = function toBuffer() {
    if (!this._buffer) {
        var logRecord = this.toLogRecord();

        var jsonStr = JSON.stringify(logRecord._logData);
        this._buffer = new Buffer(jsonStr);
    }

    return this._buffer;
};

/* JSONLogRecord. The same interface as bunyan on the wire */
function JSONLogRecord(level, msg, meta, time) {
    this._logData = new LogData(level, msg, meta, time);

    this.msg = msg;
    this.levelName = LEVELS[level];
    this.meta = meta;
}

function LogData(level, msg, meta, time) {
    this.name = null;
    this.hostname = os.hostname();
    this.pid = process.pid;
    this.component = null;
    this.level = LEVELS[level];
    this.msg = msg;
    this.time = time || (new Date()).toISOString();
    this.src = null;
    this.v = 0;

    // Non standard
    this.fields = meta;
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
