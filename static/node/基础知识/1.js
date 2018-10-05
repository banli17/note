self.onmessage = function (ev) {
    console.log('1.js' + typeof ev.data)
    self.postMessage('ev.data' + ev.data)
}

