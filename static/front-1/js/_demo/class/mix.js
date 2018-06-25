function mix(...mixins) {
	class Mix {
	}
	for (let mixin of mixins) {
		copyProperties(Mix, mixin)
		copyProperties(Mix.prototype, mixin.prototype)
	}
	return Mix
}

function copyProperties(target, source) {
	for (let key of Reflect.ownKeys(source)) {
		if (!['constructor', 'prototype', 'name'].includes(key)) {
			let desc = Object.getOwnPropertyDescriptor(source, key)
			Object.defineProperty(target, key, desc)
		}
	}
}

class A {
	sayA() {
		
	}
}
class B {
	sayB() {
		
	}
}
class C {
	sayC() {
		
	}
}
class D extends mix(A, B, C) {
	
}

var d = new D()

console.dir(d)