const a = [1, 10, 9]

// a: 初始值，默认是第一个元素。在没有初始值的空数组上调用 reduce 将报错
// b: 正在处理的值
// c: 当前处理值的索引
// d: 当前数组
a.reduce(function (a, b, c, d) {
	console.log(a, b, c, d)
	return a + b
}, 20)