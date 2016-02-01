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
