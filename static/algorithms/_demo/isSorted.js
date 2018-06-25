const isSorted = function (arr) {
	for (let i = 0, len = arr.length; i < len; i++) {
		if (arr[i] > arr[i + 1]) {
			console.log('没有经过排序')
			return false
		}
	}
	console.log('已经排序了')
	return true
}
module.exports = isSorted