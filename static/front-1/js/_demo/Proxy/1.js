let l = console.log

let target = {}
let proxy = new Proxy(target, {
	set(trapTarget, key, value, receiver){
		l(trapTarget == target, key, value, receiver == proxy)
		if (key === 'name') {
			throw new TypeError('不能设置name')
		}
		Reflect.set(trapTarget, key, value, receiver)
	}
})
console.dir(proxy)
proxy.key = 'zs'
