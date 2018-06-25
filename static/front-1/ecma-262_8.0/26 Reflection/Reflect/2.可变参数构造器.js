var args = [1, 2, 3]

class F {
	constructor(...args) {
		console.log(args)
	}
}
var obj = new F(...args)

function F1(x, y, z) {
	this.x = x
	console.log(x, y, z)
}

var obj1 = new F1(args)

Reflect.construct(F1, args)