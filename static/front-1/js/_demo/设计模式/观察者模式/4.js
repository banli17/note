var event = {
	lists: {},  // 存放事件
	cacheLists: {},
	on: function (ename, fn) {
		
		// 先处理离线内容
		if (this.cacheLists[ename]) {
			this.cacheLists[ename].forEach(function (arg) {
				fn.apply(this, arg)
			}, this)
		}
		
		
		if (!this.lists[ename]) {
			this.lists[ename] = []
		}
		this.lists[ename].push(fn)
	},
	trigger: function () {
		var args = [].splice.call(arguments, 1)   // [].shift.call(arguments)
		var ename = arguments[0]
		
		if (this.lists[ename]) {
			this.lists[ename].forEach(function (efn) {
				efn.apply(this, args)
			})
		} else {
			// 如果没有订阅过
			if (!this.cacheLists[ename]) {
				this.cacheLists[ename] = []
			}
			this.cacheLists[ename].push(args)
		}
	}
}

event.trigger('click', '张三', '男')

event.on('click', function (name, sex) {
	console.log(1, name, sex)
})

event.on('click', function (name, sex) {
	console.log(1, name, sex)
})