var test = require("tape")
var mock = require("mock")

var Timer = require("../index")
var clearTimeoutModule = require("./fixtures/clearTimeout")

test("test clearTimeout", function (assert) {
    var timer = Timer(0)

    var clear = mock("./fixtures/clearTimeout", {
        timers: {
            setTimeout: timer.setTimeout
            , clearTimeout: timer.clearTimeout
        }
    }, require)

    var t = clear()

    assert.deepEqual(t(), [])

    timer.advance(1000)

    assert.deepEqual(t(), ["one"])

    timer.advance(1000)

    assert.deepEqual(t(), ["one", "two"])

    timer.advance(1000)

    assert.deepEqual(t(), ["one", "two"])

    timer.advance(5000)

    assert.deepEqual(t(), ["one", "two"])

    assert.end()
})
