function ajax(options) {
	
	const fn = () => {
	}
	
	const defaultOptions = {
		type: 'get',
		url: '',
		dataType: 'json',
		data: {},
		timeout: 1,
		header: {},
		async: true,
		success: fn,
		error: fn,
		complete: fn,
		abort: fn
	}
	options = Object.assign(defaultOptions, options)
	
	const xhr = new XMLHttpRequest()
	xhr.open(options.type, options.url, options.async)
	
	xhr.responseType = options.dataType
	
	xhr.timeout = options.timeout
	
	// 设置响应头必须要在open之后
	for (let i in options.header) {
		xhr.setRequestHeader(i, options.header[i])
	}
	
	xhr.addEventListener('error', options.error)
	xhr.addEventListener('abort', options.abort)
	xhr.addEventListener('loadend', options.complete)
	xhr.addEventListener('timeout', function () {
		console.log('timeout')
		xhr.abort()
	})
	xhr.addEventListener('readystatechange', (e)=> {
		// 成功
		if (xhr.readyState === 4 && /^(2|403)/.test(xhr.status)) {
			options.success.call(xhr, xhr.response)
		}
	})
	
	// console.log(param(options.data))
	xhr.send(options.type == 'get' ? null : param(options.data))
}
function param(obj) {
	var paramStr = ''
	for (let i in obj) {
		paramStr += `&${i}=${obj[i]}`
	}
	return paramStr.substring(1)
}

ajax({
	url: 'http://www.b.com/index.php',
	type: 'post',
	data: {
		name: '张三',
	},
	success(data){
		console.log('data', data.name)
	},
	complete(e){
		console.log(e)
	},
	error(){
		console.log('error')
	}
})