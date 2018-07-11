function findPosition(arr, value) {
	let positions = []
	let idx = arr.lastIndexOf(value)
	while (idx != -1) {
		positions.push(idx)
		idx = idx > 0 ? arr.lastIndexOf(value, idx - 1) : -1  // 找到位置0后退出
	}
	
	return positions
}

const arr = ['a', 'b', 'a', 'c', 'a', 'd'];
console.log(findPosition(arr, 'a'))
console.log(arr.lastIndexOf('a', -1))
