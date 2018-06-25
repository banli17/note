const each = (arr, fn)=> {
	for (let i = 0, len = arr.length; i < len; i++) {
		fn.call(arr, arr[i], i)
	}
}


const arr = [1, 2, 4, 'a']

each(arr, (item, i)=> {
	console.log(this, item, i)
})