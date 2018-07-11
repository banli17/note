let arr = [1, 5, 8].map(function (item) {
	if (item == 1) {
		return item * 2
	}
})
console.log(arr)   // [ 2, undefined, undefined ]