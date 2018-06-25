var babylon = require('babylon')
var traverse = require('babel-traverse').default
var types = require('babel-types')
var generator = require('babel-generator').default

let code = `
	let a =1,b=2;
	function sum(a,b){
		return a + b
	}
	sum(a , b)
`

let ast = babylon.parse(code)



traverse(ast, {
	enter(path){
		let node = path.node
		// console.log(types.isFunctionDeclaration(node))
		if(types.isFunctionDeclaration(node)){
			path.replaceWithSourceString(`function add(a, b){
				return a+b
			}`)
		}
	}
});

console.log(generator(ast))