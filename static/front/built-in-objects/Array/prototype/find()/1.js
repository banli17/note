const a = [1, 3, 5, 8, 5].find(function (item, index, array) {
	console.log(item)
	return item == 5
})


console.log(a)