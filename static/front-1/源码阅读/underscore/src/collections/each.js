const isArrayLike = require('../inutil/isArrayLike')
const optimizeCb = require('../inutil/optimizeCb');

const each = (list, iteratee, context)=> {
	context = context || this
	iteratee = optimizeCb(iteratee, context)
	if (isArrayLike(list)) {
		for (var i = 0, len = list.length; i < len; i++) {
			iteratee(list[i], i, list)
		}
	} else {
		for (var i in list) {
			iteratee(list[i], i, list)
		}
	}
	return list
}
//
// each([1, 7, 3], function (item, index, arr) {
// 	console.log(item, index, arr)
// })

each({name: 'zs', age: 12}, function (value, key, arr) {
	console.log(value, key, arr)
})

// ;
// (()=> {
// 	console.log(arguments.toString())  // [object Arguments]
// })()