var a = [1, 2, , 9]
a.find(function (item, index, array) {
	if (index == 0) {
		delete a[3]
	}
	console.log(item)
})
console.log(a)


a.find(function (item, index, array) {
	console.log(item)
	if (index == 0) {
		a.pop()
	}
})
console.log(a)
