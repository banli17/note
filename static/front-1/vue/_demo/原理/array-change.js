const arrMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const arrAugmentations = []

arrMethods.forEach((method)=> {
	let original = Array.prototype[method]
	
	arrAugmentations[method] = function () {
		console.log('被改了', this, arguments)
		return original.apply(this, arguments)
	}
})

let list = ['a', 'b', 'c']
list.__proto__ = arrAugmentations
console.dir(list instanceof Array)
list.push('d', 'e')
