var arr = [
	{key: 1, value: 10},
	{key: 2, value: 20},
	{key: 3, value: 30}
];


var newArr = arr.map(function (item, index, array) {
	let newItem = {}
	newItem[item.key] = item.value
	return newItem
})
console.log(newArr)