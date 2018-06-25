;(function () {
	
	function EventAdmin(el) {
		this.events = []
		this.el = el
	}
	
	EventAdmin.prototype.add = function (handler) {
		this.events.push(handler)
	}
	
	EventAdmin.prototype.off = function (handler) {
		var handlers = this.events
		for (var i = 0, len = handlers.length; i < len; i++) {
			if (handlers[i] == handler) {
				handlers.splice(i, 1)
			}
		}
	}
	
	EventAdmin.prototype.dispatch = function () {
		var handlers = this.events
		for (var i = 0, len = handlers.length; i < len; i++) {
			handlers.apply(this.el, arguments)
		}
	}
	
	function wrapFn(el, handler) {
		if (!el || typeof handler !== 'function') return
		var eventAdmin = new EventAdmin(el)
		eventAdmin.add(handler)
		return eventAdmin
	}
	
	// var e = new EventAdmin
	// e.on('ha', function () {
	// 	console.log('ss')
	// })
	// e.emit('ha')
	
	var MyFinger = function (el, options) {
		this.element = typeof el === 'string' ? document.querySelector(el) : el
		this._eventAdmin = new EventAdmin()
		
		this.tap = wrapFn(this.element, options.tap)
		
		this.element.addEventListener('touchstart', this.start, false)
		this.element.addEventListener('touchmove', this.move, false)
		this.element.addEventListener('touchend', this.end, false)
	}
	
	MyFinger.prototype = {
		start: function (e) {
			console.log('touchStart', this)
			this._eventAdmin.emit('tap')
		},
		move: function (e) {
			console.log('touchMove')
		},
		end: function (e) {
			console.log('touchEnd')
		}
	}
	
	new MyFinger(document, {
		tap: function () {
			console.log('tap')
		}
	})
	
	if (typeof module !== 'undefined' && typeof exports === 'object') {
		module.exports = MyFinger
	} else {
		window.MyFinger = MyFinger
	}
})();