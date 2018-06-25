const arr = require('./randomArr')


// 选择排序

const selectionSort = (arr)=> {
	let minIndex
	let len = arr.length
	let _temp = null
	
	for (let i = 0; i < len; i++) {
		minIndex = i
		for (let j = i + 1; j < len; j++) {
			if (arr[minIndex] > arr[j]) {
				minIndex = j
			}
		}
		
		// 找到minIndex之后，将minIndex和原第一项交换位置
		_temp = arr[i]
		arr[i] = arr[minIndex]
		arr[minIndex] = _temp
	}
}

module.exports = selectionSort