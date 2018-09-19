var a = ['c', 'b', 'a', 'c', 'a', 'e']

function findPosition(arr, value) {
	var positions = []
	var idx = arr.indexOf(value)
	
	while (idx != -1) {
		positions.push(idx)
		idx = arr.indexOf(value, idx + 1)
	}
	
	return positions
}

console.log(findPosition(a, 'a'))