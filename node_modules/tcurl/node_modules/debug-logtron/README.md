# debug-logtron

<!--
    [![build status][build-png]][build]
    [![Coverage Status][cover-png]][cover]
    [![Davis Dependency status][dep-png]][dep]
-->

<!-- [![NPM][npm-png]][npm] -->

A debug logger with a logtron interface.

## Example

This logger does nothing unless you start the process with
  `NODE_DEBUG=mylibrary`.

```js
var DebugLogtron = require("debug-logtron");

var logger = DebugLogtron('mylibrary');

logger.debug('some fixed string', { some: 'meta object' });
logger.info('some fixed string', { some: 'meta object' });
logger.warn('some fixed string', { some: 'meta object' });
logger.error('some fixed string', { some: 'meta object' });
```

`debug-logtron` will internally use [`debuglog`][debuglog] to
write your logs.

This means its silent by default unless you start the process
with the `NODE_DEBUG` environment variable. If you set
`NODE_DEBUG=mylibrary` it will write to stderr.

## Interface

This library will re `throw` any `.error()` or `.fatal()` callsites.

Any warns and infos can be made visable using `NODE_DEBUG=mylibrary`.

Any debugs / access / trace can be made visible using
`NODE_DEBUG=mylibraryverbose`.

You can turn colors off with `--color false`

## Alternatives

**Warning:** This a logger for testing! Not a default logger.

If you want to add a default logger to your `dependencies` 
  then I strongly recommend you use [`null-logtron`][null-logtron]

## Motivation

You want to instrument your application and your libraries
  with a production application logger. A logger that writes
  somewhere in production.

However for your writing tests for both your libraries and
  your applications you probably do not want to see all of your
  logs spewing on STDOUT by default.

This is where `debug-logtron` comes in, You can start your app
  or libraries with the debug logger in your tests which allows
  the test runner to decide when to spew.

This works great together with `itape --trace` where you can
  use `itape` to turn on and off trace mode.

## Docs

// TODO. State what the module does.

## Installation

`npm install debug-logtron`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licensed

  [build-png]: https://secure.travis-ci.org/Raynos/debug-logtron.png
  [build]: https://travis-ci.org/Raynos/debug-logtron
  [cover-png]: https://coveralls.io/repos/Raynos/debug-logtron/badge.png
  [cover]: https://coveralls.io/r/Raynos/debug-logtron
  [dep-png]: https://david-dm.org/Raynos/debug-logtron.png
  [dep]: https://david-dm.org/Raynos/debug-logtron
  [npm-png]: https://nodei.co/npm/debug-logtron.png?stars&downloads
  [npm]: https://nodei.co/npm/debug-logtron
  [null-logtron]: https://github.com/Raynos/null-logtron
  [debuglog]: https://github.com/sam-github/node-debuglog
