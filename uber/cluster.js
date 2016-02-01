// Copyright (c) 2015 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
'use strict';

var express = require('express');
var Ringpop = require('../index.js');
var TChannel = require('tchannel');

function Cluster(opts) {
    opts = opts || {};
    this.name = opts.name || 'mycluster';
    this.size = opts.size || 3;
    this.basePort = opts.basePort || 3000;
    this.bootstrapNodes = opts.bootstrapNodes;
    this.host = opts.host || '127.0.0.1';

    if (!this.bootstrapNodes) {
        this.bootstrapNodes = [];

        // Create the bootstrap list of nodes that'll
        // be used to seed Ringpop for its join request.
        for (var i = 0; i < this.size; i++) {
            this.bootstrapNodes.push('127.0.0.1:' + (this.basePort + i));
        }
    }
}

Cluster.prototype.launch = function launch(callback) {
    var self = this;
    var ringpops = [];
    //var done = after(self.size, function onDone(err) {
    //    callback(err, ringpops);
    //});
    var bootstrapCallback = bootstrapCallbackBuilder(self.size, ringpops, this.basePort)

    for (var index = 0; index < this.size; index++) {
        var tchannel = new TChannel();
        var ringpop = new Ringpop({
            app: this.name,
            hostPort: this.host + ':' + (index + this.basePort),
            channel: tchannel.makeSubChannel({
                serviceName: 'ringpop',
                trace: false
            })
        });
        ringpop.appChannel = tchannel.makeSubChannel({
            serviceName: this.name
        });
        ringpop.setupChannel();
        ringpops.push(ringpop);

        // First make sure TChannel is accepting connections.
        console.log('TChannel is listening on port ' + (this.basePort + index));
        tchannel.listen(index + this.basePort, this.host, //listenCb(ringpop, index));
        function onListen() {
          ringpop.bootstrap(self.bootstrapNodes, bootstrapCallback(ringpop, index));

          // This is how you wire up a handler for forwarded requests
          ringpop.on('request', forwardedCallback());
        }
    }

    function listenCb(ringpop, index) {
        // When TChannel is listening, bootstrap Ringpop. It'll
        // try to join its friends in the bootstrap list.
        return function onListen() {
          ringpop.bootstrap(self.bootstrapNodes, done(ringpop, index));

          // This is how you wire up a handler for forwarded requests
          //ringpop.on('request', forwardedCallback());
        };
    }
};

// IGNORE THIS! It's a little utility function that invokes
// a callback after a specified number of invocations
// of its shim.
function after(count, callback) {
    var countdown = count;

    return function shim(err) {
        if (typeof callback !== 'function') return;

        if (err) {
            callback(err);
            callback = null;
            return;
        }

        if (--countdown === 0) {
            callback();
            callback = null;
        }
    };
}

function bootstrapCallbackBuilder(size, _ringpops, basePort) {
    var bootstrapsLeft = size;
    var ringpops = _ringpops;
    var httpPort = basePort * 2;
    return function bootstrapCallback(ringpop, index) {
        return function onBootstrap(err) {
            if (err) {
                console.log('Error: Could not bootstrap ' + ringpop.whoami());
                process.exit(1);
            }
    
            console.log('Ringpop ' + ringpop.whoami() + ' has bootstrapped!');
            bootstrapsLeft--;
    
            if (bootstrapsLeft === 0) {
                console.log('Ringpop cluster is ready!');
                createHttpServers(ringpops, httpPort);
            }
        };
    }
}

// In this example, forwarded requests are immediately ended. Fill in with
// your own application logic.
function forwardedCallback() {
    return function onRequest(req, res) {
        console.log('Ringpop handled forwarded ');
        res.end();
    }
}

// These HTTP servers will act as the front-end
// for the Ringpop cluster.
function createHttpServers(ringpops, httpPort) {
    ringpops.forEach(function each(ringpop, index) {
        var http = express();

        // Define a single HTTP endpoint that 'handles' or forwards
        http.get('/objects/:id', function onReq(req, res) {
            var key = req.params.id;
            if (ringpop.handleOrProxy(key, req, res)) {
                console.log('Ringpop ' + ringpop.whoami() + ' handled ' + key);
                res.end();
            } else {
                console.log('Ringpop ' + ringpop.whoami() +
                    ' forwarded ' + key);
            }
        });

        var port = httpPort + index; // HTTP will need its own port
        http.listen(port, function onListen() {
            console.log('HTTP is listening on ' + port);
        });
    });
}

if (require.main === module) {
    // Launch a Ringpop cluster of arbitrary size.
    var cluster = new Cluster({
        name: 'mycluster',
        size: 2,
        basePort: 3000
    });

    // When all nodes have been bootstrapped, your
    // Ringpop cluster will be ready for use.
    cluster.launch(function onLaunch(err, ringpops) {
        if (err) {
            console.error('Error: failed to launch cluster');
            process.exit(1);
        }

        console.log('Ringpop cluster is ready!');
        createHttpServers(ringpops, cluster.basePort);
    });
}

module.exports = Cluster;
