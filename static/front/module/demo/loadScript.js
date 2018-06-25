// 用于加载js
var deps = {}  // 依赖注入
var depsArr = []

function define(id, dependencies, factory) {
    //console.log(nowKey)
    // 必填
    factory = arguments[arguments.length - 1]

    // id的获取
    id = typeof arguments[0] === 'string' ? id : ''
}

define.amd = {}

function loadScript(dependencies, callback) {
    var flag = 0
    var total = dependencies.length
    dependencies.forEach(function (item) {
        var script = document.createElement('script')
        script.src = loadScript.config[item]
        script.onload = function () {
            flag++
            if (flag == total) {
                callback.apply(null, depsArr)
            }
        }
        document.head.appendChild(script)
    })
}

require.config = {
    shim: {
        jquery: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.js',
        lodash: 'https://cdn.bootcss.com/lodash.js/4.17.10/lodash.js'
    }
}
