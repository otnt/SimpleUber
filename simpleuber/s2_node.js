'use strict'

var PythonShell = require('python-shell');
PythonShell.defaultOptions = {
  scriptPath: './simpleuber'
};
var pyshell = null;

exports.send = function(json_req) {
  pyshell = new PythonShell("get_id.py");
  pyshell.send(json_req).end();
}
exports.whenGetId = function(callback) {
  pyshell.on('message', callback);
}
