// 自定义实现 buffer 的 split 方法

Buffer.prototype.split = function (sep) {
	let len = Buffer.from(sep).length
	let ret = []
	let start = 0
	let offset = 0

	while ((offset = this.indexOf(sep, start)) !== -1) {
		ret.push(this.slice(start, offset))
		start = offset + len
		console.log('start', start, offset , len)
	}
	ret.push(this.slice(start))
	return ret
}

let buf = '你吃苹果，他吃梨，我都吃'

console.log('split', buf.split('吃'))

const b = Buffer.from('helloeffek')
console.log('bbb', b)
console.log(b.split('e'))

console.log(b.indexOf('e')) // 1