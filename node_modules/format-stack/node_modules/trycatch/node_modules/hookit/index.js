/**
 * Shims built-in async functions and automatically wraps callbacks with 'wrap'
 * @param {function} wrap The function to return the new callback
 */


module.exports = process.hookit = 'function' === typeof process.hookit ? process.hookit : hookit

var alreadyRequired

function hookit(wrap) {
	var nextTick
		, fs
		, on
		, EventEmitter
		, removeListener
		, addListener

	if (alreadyRequired) return
	alreadyRequired = true

	// Wrap setTimeout and setInterval
	;['setTimeout', 'setInterval', 'setImmediate'].forEach(function (name) {
		if (this[name]) {
			var original = this[name]
			this[name] = function (callback) {
				arguments[0] = wrap(callback, name)
				return callInsteadOfApply(original, this, arguments)
			}
		}
	})

	// // Wrap process.nextTick
	nextTick = process.nextTick
	process.nextTick = function wrappedNextTick(callback) {
		arguments[0] = wrap(callback, 'process.nextTick')
		return callInsteadOfApply(nextTick, this, arguments)
	}

	// Wrap fs module async functions
	fs = require('fs')
	Object.keys(fs).forEach(function (name) {
		// If it has a *Sync counterpart, it's probably async
		if (!fs.hasOwnProperty(name + 'Sync')) return
		var original = fs[name]
		fs[name] = function () {
			var i = arguments.length - 1
			if (typeof arguments[i] === 'function') {
				arguments[i] = wrap(arguments[i], 'fs.'+name)
			}
			return callInsteadOfApply(original, this, arguments)
		}
	})

	// Wrap EventEmitters
	EventEmitter = require('events').EventEmitter

	on = EventEmitter.prototype.on
	addListener = EventEmitter.prototype.addListener
	EventEmitter.prototype.on = EventEmitter.prototype.addListener = function wrappedAddListener(type, listener) {
		var hookListener = wrap(listener, 'EventEmitter.addListener')
		hookListener.__original = listener
		return addListener.call(this, type, hookListener)
	}

	removeListener = EventEmitter.prototype.removeListener
	EventEmitter.prototype.removeListener = function wrappedRemoveListener(type, listener) {
		var listeners = this.listeners(type)
			, i = listeners.length

		while(i--) {
			if (listeners[i].__original === listener) {
				listener = listeners[i]
				break
			}
		}

		return removeListener.call(this, type, listener)
	}
}


function callInsteadOfApply(fn, that, args) {
  // Avoid slow apply for common use
  switch(args.length) {
  case 0:
    return fn.call(that)
    break
  case 1:
    return fn.call(that, args[0])
    break
  case 2:
    return fn.call(that, args[0], args[1])
    break
  case 3:
    return fn.call(that, args[0], args[1], args[2])
    break
  case 4:
    return fn.call(that, args[0], args[1], args[2], args[3])
    break
  case 5:
    return fn.call(that, args[0], args[1], args[2], args[3], args[4])
    break
  case 6:
    return fn.call(that, args[0], args[1], args[2], args[3], args[4], args[5])
    break
  case 7:
    return fn.call(that, args[0], args[1], args[2], args[3], args[4], args[5], args[6])
    break
  case 8:
    return fn.call(that, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7])
    break
  case 9:
    return fn.call(that, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8])
    break
  default:
    return fn.apply(that, args)
  }
}
