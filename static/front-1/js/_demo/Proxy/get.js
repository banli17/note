let target = Object.create(null)

let proxy = new Proxy(target, {
	get(trapTarget, key, receiver){
		if (!(key in receiver)) {
			throw new TypeError('该属性不存在')
			return false
		}
		
		return Reflect.get(trapTarget, key, receiver)
	},
	set(){
		
	}
})

proxy.name = 11


console.log(proxy.name)
