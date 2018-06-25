/**
 * 需要返回的对象继承自Array,并且改写push这些方法
 * @constructor
 */
function ArrayWrap() {
	return Array.apply(this, arguments);
}
ArrayWrap.prototype = [];
ArrayWrap.prototype.constructor = ArrayWrap

ArrayWrap.prototype.push = function () {
	console.log('我被改变了', this)
	
	return Array.prototype.push.apply(this, arguments)
}


let list = ['a', 'b', 'c']

let l = new ArrayWrap(list)

console.log(l)
l.push('3')
