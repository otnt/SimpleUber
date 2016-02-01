# tape-cluster

<!--
    [![build status][build-png]][build]
    [![Coverage Status][cover-png]][cover]
    [![Davis Dependency status][dep-png]][dep]
-->

<!-- [![NPM][npm-png]][npm] -->

A helper to run integration tests against a cluster

## Motivation

When writing integration tests against a service you generally
want to spawn up an instance of the application or spawn up
a cluster of applications.

Writing tests against such a cluster can be tedious without
a helper to setup your cluster before and after every test.

## Example

Your test file

```js
// test/what.js
'use strict';

var request = require('request');

var MyTestCluster = require('./lib/test-cluster.js');

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
```

Your actual `test-cluster.js`

```js
// test-cluster.js
'use strict';

var tape = require('tape');
var http = require('http');
var tapeCluster = require('tape-cluster');

MyTestCluster.test = tapeCluster(tape, MyTestCluster);

module.exports = MyTestCluster;

function MyTestCluster(opts) {
    if (!(this instanceof MyTestCluster)) {
        return new MyTestCluster(opts);
    }

    var self = this;

    self.assert = opts.assert;
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
```

## Installation

`npm install tape-cluster`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licensed

  [build-png]: https://secure.travis-ci.org/Raynos/tape-cluster.png
  [build]: https://travis-ci.org/Raynos/tape-cluster
  [cover-png]: https://coveralls.io/repos/Raynos/tape-cluster/badge.png
  [cover]: https://coveralls.io/r/Raynos/tape-cluster
  [dep-png]: https://david-dm.org/Raynos/tape-cluster.png
  [dep]: https://david-dm.org/Raynos/tape-cluster
  [npm-png]: https://nodei.co/npm/tape-cluster.png?stars&downloads
  [npm]: https://nodei.co/npm/tape-cluster
