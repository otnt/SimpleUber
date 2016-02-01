'use strict';

var tape = require('tape');
var http = require('http');
var request = require('request');

var tapeCluster = require('../index.js');

function MyTestCluster(opts) {
    if (!(this instanceof MyTestCluster)) {
        return new MyTestCluster(opts);
    }

    var self = this;

    self.port = opts.port;
    self.server = http.createServer();

    self.server.on('request', onRequest);

    function onRequest(req, res) {
        res.end(req.url);
    }
}

MyTestCluster.prototype.bootstrap = function bootstrap(cb) {
    var self = this;

    self.server.once('listening', cb);
    self.server.listen(self.port);
};

MyTestCluster.prototype.close = function close(cb) {
    var self = this;

    self.server.close(cb);
};

MyTestCluster.test = tapeCluster(tape, MyTestCluster);

MyTestCluster.test('a test', {
    port: 8000
}, function t(cluster, assert) {
    request({
        url: 'http://localhost:' + cluster.port + '/foo'
    }, function onResponse(err, resp, body) {
        assert.ifError(err);

        assert.equal(resp.statusCode, 200);
        assert.equal(resp.body, '/foo');

        assert.end();
    });
});
