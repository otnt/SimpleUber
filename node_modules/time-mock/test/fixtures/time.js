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
