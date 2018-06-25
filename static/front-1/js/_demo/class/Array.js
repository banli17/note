class MyAry extends Array {
	constructor() {
		super(...arguments)
		this.x = 1
	}
	
	hehe() {
		console.log('hehe')
	}
	
	push() {
		return super.hehe(...arguments)
	}
}


var ary = new MyAry(5)

ary.push(10)
console.log(ary)

