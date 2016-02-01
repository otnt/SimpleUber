'use strict';

var TypedError = require('error/typed');

var LogMessage = require('./log-message.js');
var DebugLogBackend = require('./backends/debug-log-backend.js');
var LEVELS = require('./levels.js').LEVELS_BY_NAME;

var validNamespaceRegex = /^[a-zA-Z0-9]+$/;
var InvalidNamespaceError = TypedError({
    type: 'debug-logtron.invalid-argument.namespace',
    message: 'Unexpected characters in the `namespace` arg.\n' +
        'Expected the namespace to be a bare word but instead ' +
            'found {badChar} character.\n' +
        'SUGGESTED FIX: Use just alphanum in the namespace.\n',
    badChar: null,
    reason: null,
    namespace: null
});

module.exports = DebugLogtron;

function DebugLogtron(namespace, opts) {
    if (!(this instanceof DebugLogtron)) {
        return new DebugLogtron(namespace, opts);
    }

    var isValid = validNamespaceRegex.test(namespace);
    if (!isValid) {
        var hasHypen = namespace.indexOf('-') >= 0;
        var hasSpace = namespace.indexOf(' ') >= 0;

        throw InvalidNamespaceError({
            namespace: namespace,
            badChar: hasHypen ? '-' : hasSpace ? 'space' : 'bad',
            reason: hasHypen ? 'hypen' :
                hasSpace ? 'space' : 'unknown'
        });
    }

    opts = opts || {};

    this.name = namespace;

    this._backend = DebugLogBackend(namespace, opts);
    this._stream = this._backend.createStream();
}

var proto = DebugLogtron.prototype;

proto._log = function _log(level, msg, meta, cb) {
    var logMessage = new LogMessage(level, msg, meta);
    LogMessage.isValid(logMessage);

    logMessage.name = this.name;

    this._stream.write(logMessage.toLogRecord(), cb);
};

proto.trace = function trace(msg, meta, cb) {
    this._log(LEVELS.trace, msg, meta, cb);
};

proto.debug = function debug(msg, meta, cb) {
    this._log(LEVELS.debug, msg, meta, cb);
};

proto.info = function info(msg, meta, cb) {
    this._log(LEVELS.info, msg, meta, cb);
};

proto.access = function access(msg, meta, cb) {
    this._log(LEVELS.access, msg, meta, cb);
};

proto.warn = function warn(msg, meta, cb) {
    this._log(LEVELS.warn, msg, meta, cb);
};

proto.error = function error(msg, meta, cb) {
    this._log(LEVELS.error, msg, meta, cb);
};

proto.fatal = function fatal(msg, meta, cb) {
    this._log(LEVELS.fatal, msg, meta, cb);
};
