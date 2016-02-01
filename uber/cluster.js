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
var url = require('url');

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
    var done = after(self.size, function onDone(err) {
        callback(err, ringpops);
    });

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
        tchannel.listen(index + this.basePort, this.host, listenCb(ringpop));
    }

    function listenCb(ringpop, index) {
        // When TChannel is listening, bootstrap Ringpop. It'll
        // try to join its friends in the bootstrap list.
        return function onListen() {
          ringpop.bootstrap(self.bootstrapNodes, done);

          // This is how you wire up a handler for forwarded requests
          ringpop.on('request', forwardedCallback(ringpop));
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

// In this example, forwarded requests are immediately ended. Fill in with
// your own application logic.
function forwardedCallback(ringpop) {
    return function onRequest(req, res) {
        var url_parts = url.parse(req.url, true);
        console.log('Ringpop ' + ringpop.whoami() + ' handled forwarded ' + url_parts);
        res.end();
    }
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
    });
}

module.exports = Cluster;
