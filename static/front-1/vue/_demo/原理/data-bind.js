function Observer(data) {
	this.data = data
	this._walk(data)
}

// 对对象进行递归遍历添加监听事件
Observer.prototype._walk = function (obj) {
	let val;
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			val = obj[key]
			if (typeof obj[key] === 'object') {
				new Observer(val)
			}
			
			this._convert(key, val)
		}
	}
}

// 将obj转换成属性描述符定义的形式
Observer.prototype._convert = function (key, val) {
	Object.defineProperty(this.data, key, {
		configurable: true,
		get: function () {
			console.log('读取了', key)
			return val
		},
		set: function (newVal) {
			console.log('设置了', key, newVal)
			if (newVal === val) return
			val = newVal
			
			if (typeof newVal === 'object') {
				new Observer(this.data[key])
			}
		}
	})
}

let data = {
	user: {
		name: "liangshaofeng",
		age: "24"
	},
	address: {
		hello: ['1', '2'],
		city: "beijing",
		child: {}
	}
};

let app = new Observer(data);