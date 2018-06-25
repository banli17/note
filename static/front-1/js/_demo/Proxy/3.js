var obj = {
	name: 'hello'
}

var proxy = new Proxy(obj, {
	get(target, key, receiver){
		console.log(target, key)
	},
	set(){
		
	}
})

console.log(proxy.name)
console.log('obj.name', obj.name)