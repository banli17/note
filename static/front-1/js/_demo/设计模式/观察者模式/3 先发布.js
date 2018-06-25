function Event() {
	this.eventLists = {}  // 事件管理
}
Event.prototype.on = function (ename, fn) {
	if (!this.eventLists[ename]) {
		this.eventLists[ename] = []
	}
	this.eventLists[ename].push(fn)
}
Event.prototype.trigger = function (ename) {
	if (this.eventLists[ename]) {
		this.eventLists[ename].forEach(efn=> {
			efn.call(this)
		})
	}
}
var e = new Event()
function say() {
	console.log('say')
}
function say1() {
	console.log(this)
}
e.on('click', say)
e.on('click', say1)

e.trigger('click')