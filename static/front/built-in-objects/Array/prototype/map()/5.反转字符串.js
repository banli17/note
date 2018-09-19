var a = 'hello'

// console.log(a.split('').reverse().join(''))

// 方法2
var str = '12345';
Array.prototype.map.call(str, function (x) {
	return x;
}).reverse().join('');
