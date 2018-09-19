/**
 * 浅拷贝obj对象
 * @param obj
 * @returns {Object}
 */
function copy(obj) {
	var copy = Object.create(Object.getPrototypeOf(obj))
	var propNames = Object.getOwnPropertyNames(obj)
	
	propNames.forEach(function (name) {
		var desc = Object.getOwnPropertyDescriptor(obj, name)
		Object.defineProperty(copy, name, desc)
	})
	return copy
}


var o1 = {
	name: 'zs',
	child: {
		name: 'ls'
	}
}
var o2 = copy(o1)

console.log(o2)
console.log(o2.child == o1.child)