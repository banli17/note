// console.log(self)
// console.log(Array)

self.onmessage = function (e) {
	console.log(e)
	// e.data 就是数据
	
	self.postMessage(e.data[0] * e.data[1])
	
	// e.data.child.name = 'hello'
	// self.postMessage('hi')
}
console.log(self)
console.log(XMLHttpRequest)

var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
	if (xhr.status === 200 && xhr.readyState == 4) {
		console.log(xhr.channel)
	}
}

xhr.open('get', './1.html', true)
xhr.send()

// var w = new self.Worker('./3.js')
// w.onmessage = function (e) {
// 	console.log('2.js', e)
// }
//
// w.postMessage('2.js')