hook
====

Shim all core IO calls and allow callback shimming via wrap function.

###Installation
```
$ npm install hookit
```
###Usage:
```javascript
hookit(function generateShim(callback, fnName) {
  return function() {
    try {
      callback.apply(this, arguments);
    } finally {
      console.log('bummer.')
    }
  }
})

process.nextTick(function() {
  throw new Error('here') // Will log "bummer" before we crash on error
})
```
