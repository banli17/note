const a = 'hello'

// 报错，a.map is not a function
// a.map(function (item) {
// 	console.log(item)
// })
	;
[].map.call(a, function (item) {
	console.log(item)
})