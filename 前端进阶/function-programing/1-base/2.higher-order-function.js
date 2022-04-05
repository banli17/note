// 函数作为返回值
const makeFn = (msg) => {
	return () => {
		console.log(msg)
	}
}

const fn = makeFn('hello')
fn()

const once = (fn) => {
	let done = false
	return function () {
		if (!done) {
			done = true
			fn.apply(this, arguments)
		}
	}
}

const onceFn = once((args) => {
	console.log('button clicked', args)
})

const payOption = {
	money: 1
}
onceFn(payOption)
onceFn(payOption)
onceFn(payOption)