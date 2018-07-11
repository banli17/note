// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的数字和位置的临时存储
var mapped = list.map(function (el, i) {
	return {index: i, value: el.toLowerCase()};
})
console.log(mapped)

// 按照多个值排序数组
mapped.sort(function (a, b) {
	// 前面优先级高+(a.value > b.value) || (+(a.value === b.value) - 1)
	console.log(+(a.value > b.value) || (+(a.value === b.value) - 1))
	return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 根据索引得到排序的结果
var result = mapped.map(function (el) {
	return list[el.index];
});

console.log(result)