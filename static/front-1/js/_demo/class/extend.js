/**
 * extend的原理
 * 1. Child.prototype.__proto__ == Parent.prototype
 */
class A {
	
}

class B extends A {
	
}

console.log(B.prototype.__proto__ == A.prototype)
console.log(B.__proto__ === A)

// let b = new B();
//
// console.log(b.__proto__ === A)
// console.dir(B)
//
//
// console.log(B.__proto__ === A)