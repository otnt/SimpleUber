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

var Cluster = require('./cluster.js');
var logger = require('winston');
var parseArgs = require('./parse_args.js');
var express = require('express');
var s2 = require('./s2_node.js');

var LEADER_KEY = 'LEADER';

function App(ringpop) {
    this.ringpop = ringpop;
    this.currentLeader = null;
    this.isLeader = false;
}

App.prototype.chooseLeader = function chooseLeader() {
    var newLeader = this.ringpop.lookup(LEADER_KEY);
    if (!this.currentLeader || newLeader !== this.currentLeader) {
        logger.info(this.ringpop.whoami() + ' says new leader is ' + newLeader);

        // This app was not a leader, but now is.
        if (!this.isLeader && newLeader === this.ringpop.whoami()) {
            // Subscribe
            this.isLeader = true;
        }

        // This app was a leader, but now is not.
        if (this.isLeader && newLeader !== this.ringpop.whoami()) {
            // Unsubscribe
            this.isLeader = false;
        }

        this.currentLeader = newLeader;
    }
};


if (require.main === module) {
    var cluster = new Cluster(parseArgs());

    // Launch cluster. If successful, get individual Ringpop instances (nodes)
    // back.
    cluster.launch(function onLaunch(err, ringpops) {
        if (err) {
            logger.error('error:' + err.message);
            process.exit(1);
        }

        // Create an App wrapper around each Ringpop instance. Choose a
        // leader upon instantiation and when a ring change is detected.
        ringpops.forEach(function each(ringpop) {
            var app = new App(ringpop);
            app.chooseLeader();
            ringpop.on('ringChanged', app.chooseLeader.bind(app));
        });

        // These HTTP servers will act as the front-end
        // for the Ringpop cluster.
        ringpops.forEach(function each(ringpop, index) {
            var http = express();
    
            // Define a single HTTP endpoint that 'handles' or forwards
            http.get('/loc', function onReq(req, res) {
                s2.send(JSON.stringify(req.query));
                s2.whenGetId(function (key) {
                  // received a message sent from the Python script (a simple "print" statement)
                  req.key = key;
                  if (ringpop.handleOrProxy(key, req, res)) {
                      console.log('Ringpop ' + ringpop.whoami() + 
                          ' handled direct request ', req.query, 
                          " in cell " + key);
                      res.end();
                  }
                });
            });


            var port = cluster.basePort * 2 + index; // HTTP will need its own port
            http.listen(port, function onListen() {
                console.log('HTTP is listening on ' + port);
            });
        });
    });
}
