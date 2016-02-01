'use strict';

var inspect = require('util').inspect;
var process = require('process');
var globalConsole = require('console');
var TypedError = require('error/typed');

var TermColor = require('../lib/term-color.js');

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
var COLOR_MAP = {
    fatal: 'bgRed',
    error: 'bgRed',
    warn: 'bgYellow',
    access: 'bgGreen',
    info: 'bgGreen',
    debug: 'bgBlue',
    trace: 'bgCyan'
};

module.exports = DebugLogBackend;

function DebugLogBackend(namespace, opts) {
    /*eslint max-statements: [2, 25]*/
    if (!(this instanceof DebugLogBackend)) {
        return new DebugLogBackend(namespace, opts);
    }

    var self = this;

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

    self.console = opts.console || globalConsole;
    self.assert = opts.assert;
    self.colors = typeof opts.colors === 'boolean' ?
        opts.colors : true;
    /*eslint no-process-env: 0*/
    self.env = opts.env || process.env;
    self.namespace = namespace.toUpperCase();

    self.whitelists = {
        fatal: {},
        error: {},
        warn: {},
        access: {},
        info: {},
        debug: {},
        trace: {}
    };
    self.records = [];

    var debugEnviron = self.env.NODE_DEBUG || '';
    var regex = new RegExp('\\b' + self.namespace + '\\b', 'i');

    self.enabled = typeof opts.enabled === 'boolean' ?
        opts.enabled : true;
    self.verbose = opts.verbose || regex.test(debugEnviron);
    self.trace = typeof opts.trace === 'boolean' ?
        opts.trace : (self.verbose && !!self.env.TRACE);

    if (self.verbose) {
        self.enabled = true;
    }
}

DebugLogBackend.prototype.whitelist = function whitelist(level, msg) {
    var self = this;

    self.whitelists[level][msg] = true;
};

DebugLogBackend.prototype.createStream = function createStream() {
    var self = this;

    return DebugLogStream(self.namespace, self);
};

function DebugLogStream(namespace, backend) {
    if (!(this instanceof DebugLogStream)) {
        return new DebugLogStream(namespace, backend);
    }

    var self = this;

    self.namespace = namespace;
    self.backend = backend;
}

DebugLogStream.prototype.write = function write(logMessage, cb) {
    /*eslint complexity: [2, 15]*/
    var self = this;

    var logRecord = logMessage.toLogRecord();
    var levelName = logRecord.levelName;

    var whitelist = self.backend.whitelists[levelName];
    if (whitelist[logRecord.msg]) {
        self.backend.records.push(logRecord);

        if (cb) {
            cb();
        }
        return;
    }

    if (
        (levelName === 'fatal' || levelName === 'error') ||
        (self.backend.enabled &&
            (levelName === 'warn' || levelName === 'info')) ||
        (self.backend.verbose &&
            (levelName === 'access' || levelName === 'debug')) ||
        (self.backend.trace && levelName === 'trace')
    ) {
        var msg = self.formatMessage(logRecord);
        if (self.backend.assert) {
            self.backend.assert.comment(msg);
        } else {
            self.backend.console.error(msg);
        }
    }

    if (levelName === 'fatal' || levelName === 'error') {
        throw new Error(logRecord.msg);
    }

    if (cb) {
        cb();
    }
};

DebugLogStream.prototype.formatMessage =
function formatMessage(logRecord) {
    var self = this;

    var prefix = self.namespace + ' ' +
        logRecord.levelName.toUpperCase() + ':';
    var color = COLOR_MAP[logRecord.levelName];

    if (self.backend.colors) {
        prefix = TermColor[color](prefix);
        prefix = TermColor.bold(prefix);
    }

    return prefix + ' ' + logRecord.msg + ' ~ ' +
        inspect(logRecord.meta);
};
