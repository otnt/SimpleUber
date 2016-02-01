# time-mock

[![build status][1]][2]

[![browser support][3]][4]

Easily manipulate and mock out time in your tests

## Example

Let's say you have a simple time module that collects an array
    of timestamps every second.

```js
// ./fixtures/time.js
var setTimeout = require("timers").setTimeout
var now = require("date-now")

module.exports = function () {
    var items = []

    loop()

    return peek

    function peek() {
        return items
    }

    function loop() {
        items.push(now())

        setTimeout(loop, 1000)
    }
}
```

It uses `require("timers").setTimeout` and `require("date-now")` so that it's
    not hardcoded to time based global state.

We can then simply mock these things out using [`mock`][5]

```js
var mock = require("mock")
var assert = require("assert")

var Timer = require("../index")

// Pass starting time to Timer
var timer = Timer(0)

// Pass mocked setTimeout and Date.now functions to your module
var time = mock("./fixtures/time", {
    timers: {
        setTimeout: timer.setTimeout
    }
    , "date-now": timer.now
}, require)

var t = time()

console.log("#1", t())
assert.deepEqual(t(), [ 0 ])

timer.advance(500)

console.log("#2", t())
assert.deepEqual(t(), [ 0 ])

timer.advance(500)

console.log("#3", t())
assert.deepEqual(t(), [ 0, 1000 ])

timer.advance(2000)

console.log("#4", t())
assert.deepEqual(t(), [ 0, 1000, 2000, 3000 ])

timer.advance(4999)

console.log("#5", t())
assert.deepEqual(t(), [ 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000 ])
```

Timer basically allows you to create simple mockable functions for setTimeout
    and Date.now. You can then call `timer.advance(delta)` to make time move
    forward.

This is awesome for unit tests when you don't want your tests to be slow based
    on the fact that they have to wait for timeouts.

## Installation

`npm install time-mock`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Colingo/time-mock.png
  [2]: http://travis-ci.org/Colingo/time-mock
  [3]: http://ci.testling.com/Colingo/time-mock.png
  [4]: http://ci.testling.com/Colingo/time-mock
  [5]: http://github.com/Colingo/mock
