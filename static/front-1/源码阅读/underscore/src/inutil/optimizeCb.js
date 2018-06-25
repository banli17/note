/**
 * 将函数绑定context
 * @param callback
 */
module.exports = (callback, context)=> {
	return function () {
		callback.apply(null, arguments)
	}
}