'use strict';

var inspect = require('util').inspect;
var process = require('process');
var globalConsole = require('console');
var chalk = require('chalk');

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

    self.console = opts.console || globalConsole;
    self.assert = opts.assert;
    self.colors = typeof opts.colors === 'boolean' ?
        opts.colors : true;
    /*eslint no-process-env: 0*/
    self.env = opts.env || process.env;
    self.namespace = namespace.toUpperCase();

    var debugEnviron = self.env.NODE_DEBUG || '';
    var regex = new RegExp('\\b' + self.namespace + '\\b', 'i');
    var verboseRegex = new RegExp(
        '\\b' + self.namespace + 'verbose\\b', 'i'
    );

    self.enabled = regex.test(debugEnviron);
    self.verbose = verboseRegex.test(debugEnviron);

    if (opts.verbose) {
        self.verbose = true;
    }
    if (self.verbose || opts.enabled) {
        self.enabled = true;
    }
}

DebugLogBackend.prototype.createStream = function createStream() {
    var self = this;

    return DebugLogStream(self.namespace, {
        console: self.console,
        assert: self.assert,
        colors: self.colors,
        enabled: self.enabled,
        verbose: self.verbose
    });
};

function DebugLogStream(namespace, opts) {
    if (!(this instanceof DebugLogStream)) {
        return new DebugLogStream(namespace, opts);
    }

    var self = this;

    self.namespace = namespace;
    self.console = opts.console;
    self.assert = opts.assert;
    self.colors = opts.colors;
    self.enabled = opts.enabled;
    self.verbose = opts.verbose;
}

DebugLogStream.prototype.write = function write(logRecord, cb) {
    /*eslint complexity: [2, 15]*/
    var self = this;

    var levelName = logRecord.levelName;

    if (
        (levelName === 'fatal' || levelName === 'error') ||
        (self.enabled &&
            (levelName === 'warn' || levelName === 'info')) ||
        (self.verbose &&
            (levelName === 'access' || levelName === 'debug' ||
                levelName === 'trace'))
    ) {
        var msg = self.formatMessage(logRecord);
        if (self.assert) {
            self.assert.comment(msg);
        } else {
            self.console.error(msg);
        }
    }

    if (levelName === 'fatal' || levelName === 'error') {
        throw new Error(logRecord.fields.msg);
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

    if (self.colors) {
        prefix = chalk[color](prefix);
        prefix = chalk.bold(prefix);
    }

    return prefix + ' ' + logRecord.fields.msg + ' ~ ' +
        inspect(logRecord.meta);
};
