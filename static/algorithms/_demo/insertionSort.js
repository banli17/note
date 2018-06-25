const randomArr = require('./randomArr')

function insertionSort(arr) {
	for (let i = 1, len = arr.length; i < len; i++) {
		let _temp = null
		for (let j = i; j > 0; j--) {
			if (arr[j] < arr[j - 1]) {
				// 交换比较元素和被比较元素
				_temp = arr[j]
				arr[j] = arr[j - 1]
				arr[j - 1] = _temp
			} else {
				break
			}
		}
	}
}

insertionSort(randomArr)
console.log(randomArr)

module.exports = insertionSort
