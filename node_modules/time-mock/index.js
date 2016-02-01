module.exports = Timer

function Timer(currentTime) {
    var callbacks = []
    var counter = 1

    return {
        setTimeout: setTimeout
        , clearTimeout: clearTimeout
        , now: now
        , advance: advance
    }

    function setTimeout(cb, offset) {
        var id = counter++

        callbacks.push([cb, currentTime + offset, id])

        return id
    }

    function clearTimeout(id) {
        var index = callbacks.map(function (triplet) {
            return triplet[2]
        }).indexOf(id)

        callbacks.splice(index, 1)
    }

    function now() {
        return currentTime
    }

    function advance(offset) {
        var newTime = currentTime + offset
        // currentTime += offset

        var firstTime = callbacks.map(function (triplet) {
            return triplet[1]
        }).sort()[0]

        // console.log("oops", newTime, firstTime)

        if (newTime > firstTime) {
            var remainder = newTime - firstTime
            var initialJump = firstTime - currentTime
            advance(initialJump)
            advance(remainder)
            return
        }

        currentTime = newTime

        var toRemove = callbacks.filter(function (triplet) {
            var cb = triplet[0]
            var time = triplet[1]

            if (time <= currentTime) {
                cb()
                return true
            }
        })

        toRemove.forEach(function (triplet) {
            var index = callbacks.map(function (triplet) {
                return triplet[2]
            }).indexOf(triplet[2])

            callbacks.splice(index, 1)
        })
    }
}
