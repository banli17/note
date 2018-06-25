var Event = function () {
	this.eventLists = []
}

Event.prototype.add = function (fn) {
	this.eventLists.push(fn)
}
Event.prototype.trigger = function () {
	this.eventLists.forEach(function (callback) {
		callback()
	})
}

function fn1() {
	console.log('fn1')
}

function fn2() {
	console.log('fn2')
}
var e = new Event()
e.add(fn1)
e.add(fn2)

e.trigger()