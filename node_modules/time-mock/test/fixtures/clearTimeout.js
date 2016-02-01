var setTimeout = require("timers").setTimeout
var clearTimeout = require("timers").clearTimeout

module.exports = function () {
    var items = []

    var one = setTimeout(function () {
        items.push("one")
    }, 1000)

    var two = setTimeout(function () {
        items.push("two")
    }, 2000)

    var three = setTimeout(function () {
        items.push("three")
    }, 3000)

    var four = setTimeout(function () {
        items.push("four")
    }, 4000)

    setTimeout(function () {
        clearTimeout(three)
        clearTimeout(four)
    }, 2500)

    return function peek() {
        return items
    }
}
