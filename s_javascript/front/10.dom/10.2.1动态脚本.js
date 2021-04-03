function loadScript(url) {
    let script = document.createElement('script')
    script.src = url
    script.onload = function () {
        console.log(test)
    }
    document.body.appendChild(script)
}

loadScript('./10.2.1.test.js')   // 10