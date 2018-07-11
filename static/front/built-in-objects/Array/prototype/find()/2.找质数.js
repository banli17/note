// [1, 4, 8].find(isPrime)
function isPrime(item, index, array) {
	var start = 2
	while (start <= Math.sqrt(item)) {  // 只需要start - Math.sqrt(item) 这个区间判断即可
		console.log(start <= Math.sqrt(item))
		let a = item % start++
		console.log('a', a)
		
		if (a < 1) {
			return false
		}
	}
	return item > 1
}


console.log(isPrime(11))
// 11 % 2   -> 1
// 11 % 3   -> 2
// 11 % 4   -> 3
// 11 % 5   -> 1
// 11 % 6   -> 5
// 11 % 7   -> 4
// 11 % 8   -> 3
// 11 % 9   -> 2
// 11 % 10   -> 1
// 11 % 11   -> 0
// 11 % 12   -> 11
