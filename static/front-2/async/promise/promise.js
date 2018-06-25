/**
 * 实现promise
 * @param executor
 * @constructor
 */
function Promise(executor) {
	const self = this
	self.data = null
	self.status = 'pending' // 维护状态，可以变成 resolved, rejected
	self.resolveCallback = []
	self.rejectCallback = []
	
	function resolve(value) {
		if (self.status !== 'pending') return
		self.data = value
		self.status = 'resolved'
		
		// console.log(self.resolveCallback)
		self.resolveCallback.forEach((callback) => {
			callback()
		})
	}
	
	function reject(reason) {
		if (self.status == 'pending') return
		
		self.data = reason
		self.status = 'rejected'
		self.rejectCallback.forEach((callback) => {
			callback()
		})
	}
	
	try {
		executor(resolve, reject)
	} catch (e) {
		reject(e)
	}
}

Promise.prototype.then = function (onResolvedFn) {
	const self = this
	
	// 确保onResolvedFn是function
	onResolvedFn = typeof onResolvedFn === 'function' ? onResolvedFn : function (v) {
	}
	
	// onResolvedFn要在resolved之后执行，将之push到resolveCallback里
	if (self.status === 'pending') {
		// 要返回一个新的Promise，然后继续then操作
		return new Promise((resolve, reject) => {
			self.resolveCallback.push(onResolvedFn)
		})
	}
}


new Promise((resolve, reject) => {
	// setTimeout(()=> {
	// 	console.log('hi')
	// 	resolve()
	// }, 3000)
	console.log(1)
	for (var i = 0; i < 10000; i++) {
		if (i === 999) {
			setTimeout(() => {
				console.log('resolve')
				resolve()
			})
		}
	}
	console.log(2)
}).then(() => {
	console.log('jack')
})