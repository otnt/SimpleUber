"use strict";

module.exports = Result;

function Result(err, value) {
    var self = this;
    self.err = err || null;
    self.value = value;
}

Result.prototype.toValue = function toValue() {
    var self = this;
    if (self.err) {
        throw self.err;
    } else {
        return self.value;
    }
};

Result.prototype.toCallback = function toCallback(callback) {
    var self = this;
    callback(self.err, self.value);
};

Result.just = function just(value) {
    return new Result(null, value);
};

Result.error = function error(err) {
    return new Result(err, null);
};

Result.lift = function lift(func) {
    return function rezultLifted() {
        try {
            return Result.just(func.apply(this, arguments));
        } catch(err) {
            return Result.error(err);
        }
    };
};
