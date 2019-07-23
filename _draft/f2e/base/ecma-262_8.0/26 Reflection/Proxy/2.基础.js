let a = {
	name: 'jack'
}

let b = new Proxy(a, {
	get(target, key){
		return 'lucy'
	},
	set(target, key, value){
		target[key] = value
	}
})

console.log(b.name)  // 'lucy'
console.log(a.name)  // 'jack'

b.name = 'liming'
console.log(a)  // {name: 'liming'}