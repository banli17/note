class MyObj extends Object {
	constructor() {
		super(...arguments)
	}
}

var m = new MyObj({a: 1})

console.log(m)