'use strict';

var LogMessage = require('./log-message.js');
var DebugLogBackend = require('./backends/debug-log-backend.js');
var LEVELS = require('./levels.js').LEVELS_BY_NAME;

module.exports = DebugLogtron;

function DebugLogtron(namespace, opts) {
    if (!(this instanceof DebugLogtron)) {
        return new DebugLogtron(namespace, opts);
    }

    opts = opts || {};

    this.name = namespace;

    this._backend = DebugLogBackend(namespace, opts);
    this._stream = this._backend.createStream();
}

DebugLogtron.prototype._log = function _log(level, msg, meta, cb) {
    var logMessage = new LogMessage(level, msg, meta);
    LogMessage.isValid(logMessage);

    this._stream.write(logMessage, cb);
};

DebugLogtron.prototype.trace = function trace(msg, meta, cb) {
    this._log(LEVELS.trace, msg, meta, cb);
};

DebugLogtron.prototype.debug = function debug(msg, meta, cb) {
    this._log(LEVELS.debug, msg, meta, cb);
};

DebugLogtron.prototype.info = function info(msg, meta, cb) {
    this._log(LEVELS.info, msg, meta, cb);
};

DebugLogtron.prototype.access = function access(msg, meta, cb) {
    this._log(LEVELS.access, msg, meta, cb);
};

DebugLogtron.prototype.warn = function warn(msg, meta, cb) {
    this._log(LEVELS.warn, msg, meta, cb);
};

DebugLogtron.prototype.error = function error(msg, meta, cb) {
    this._log(LEVELS.error, msg, meta, cb);
};

DebugLogtron.prototype.fatal = function fatal(msg, meta, cb) {
    this._log(LEVELS.fatal, msg, meta, cb);
};

DebugLogtron.prototype.whitelist = function whitelist(level, msg) {
    this._backend.whitelist(level, msg);
};

DebugLogtron.prototype.items = function items() {
    return this._backend.records;
};
