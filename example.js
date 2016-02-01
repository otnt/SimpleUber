var express = require('express');
var Ringpop = require('ringpop');
var TChannel = require('tchannel');

var host = '127.0.0.1'; // not recommended for production
var ports = [3000, 3001, 3002];
var bootstrapNodes = ['127.0.0.1:3000', '127.0.0.1:3001',
    '127.0.0.1:3002'];

var cluster = [];

// Create Ringpop instances
ports.forEach(function each(port) {
    var tchannel = new TChannel();
    var subChannel = tchannel.makeSubChannel({
        serviceName: 'ringpop'
    });

    cluster.push(new Ringpop({
        app: 'yourapp',
        hostPort: host + ':' + port,
        channel: subChannel
    }));
});

// Bootstrap cluster
cluster.forEach(function each(ringpop, index) {
    ringpop.setupChannel();
    ringpop.channel.listen(ports[index], host, function onListen() {
        console.log('TChannel is listening on ' + ports[index]);
        ringpop.bootstrap(bootstrapNodes,
            bootstrapCallback(ringpop, index));

        // This is how you wire up a handler for forwarded requests
        ringpop.on('request', forwardedCallback());
    });
});

// After successfully bootstrapping, create the HTTP server.
var bootstrapsLeft = bootstrapNodes.length;
function bootstrapCallback(ringpop, i) {
    return function onBootstrap(err) {
        if (err) {
            console.log('Error: Could not bootstrap ' + ringpop.whoami());
            process.exit(1);
        }

        console.log('Ringpop ' + ringpop.whoami() + ' has bootstrapped!');
        bootstrapsLeft--;

        if (bootstrapsLeft === 0) {
            console.log('Ringpop cluster is ready!');
            createHttpServers();
        }
    };
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
function createHttpServers() {
    cluster.forEach(function each(ringpop, index) {
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

        var port = ports[index] * 2; // HTTP will need its own port
        http.listen(port, function onListen() {
            console.log('HTTP is listening on ' + port);
        });
    });
}

