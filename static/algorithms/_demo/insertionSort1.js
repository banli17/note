const randomArr = require('./randomArr')
const isSorted = require('./isSorted')
const insertionSort1 = (arr) => {
	for (let i = 1, len = arr.length; i < len; i++) {
		let _temp = arr[i]
		let j
		for (j = i; j > 0; j--) {
			if (_temp < arr[j - 1]) {
				arr[j] = arr[j - 1]
			} else {
				break
			}
		}
		arr[j] = _temp
	}
}


module.exports = insertionSort1
