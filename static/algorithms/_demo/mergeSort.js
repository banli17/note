var randomArr = require('./randomArr')

function merge(arr, l, mid, r) {
	var aux = arr.slice(l, r + 1)
	var i = l, j = mid + 1;
	for (var k = l; k <= r; k++) {
		if (i > mid) {
			arr[k] = aux[j - l]
			j++
		} else if (j > r) {
			arr[k] = aux[i - l]
			i++
		} else if (aux[i - l] < aux[j - l]) {
			arr[k] = aux[i - l]
			i++
		} else {
			arr[k] = aux[j - l]
			j++
		}
	}
}

function __mergeSort(arr, l, r) {
	if (l >= r) return
	var mid = Math.floor((l + r) / 2)
	__mergeSort(arr, l, mid)
	__mergeSort(arr, mid + 1, r)
	if (arr[mid] > arr[mid + 1]) {
		merge(arr, l, mid, r)
	}
}

// 数组区间是 [l, r]
var mergeSort = (arr)=> {
	var n = arr.length
	__mergeSort(arr, 0, n - 1)
}

mergeSort(randomArr)
console.log(randomArr)

module.exports = mergeSort