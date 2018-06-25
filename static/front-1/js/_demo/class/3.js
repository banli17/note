const bar = Symbol('bar')

class Person {
	constructor(name) {
		console.log(new.target  == Person)
		Person.a = 1
	}
	
	get name() {
		console.log('get name')
		return 'name'
	}
	
	* speak() {
		for (var i = 0; i < 10; i++) {
			yield i
			return i
		}
	}
	
	[bar]() {
		console.log(111)
	}
}
let p1 = new Person('zs', 12)

console.log(Person.a)

