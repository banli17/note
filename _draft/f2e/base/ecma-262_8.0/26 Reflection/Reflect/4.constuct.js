// function F(...args) {
// 	console.log(args)  //
// }

class F {
	constructor(){
		
	}
	name(){
		
	}
}


// 控制台打印出[ 'hi', 'hello' ]
var res = Reflect.construct(F, ['hi', 'hello'])

// F{}
console.log('res', res == F.constructor)