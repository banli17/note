var a = [1, 5, 10]

var b = a.some(function (item, index, arr) {
	if (item == 5) {
		arr.push(12)
	}
	console.log(item)
	// return item
})

console.log(a, b)