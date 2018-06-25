const reverseEach = (arr, fn)=> {
	for (let i = arr.length - 1; i >= 0; i--) {
		fn.call(arr, arr[i], i)
	}
}

const a = [1, 5, 'a', 'b']
reverseEach(a, function (item, i) {
	console.log(item, i)
})