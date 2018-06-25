/**
 * 判断对象是否是类数组
 * @param arr
 */
module.exports = (arr)=> {
	return [].slice.call(arr).length !== 0
}