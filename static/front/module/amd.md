# AMD规范

## 学习资料

- [JavaScript模块化编程简史](https://yuguo.us/weblog/javascript-module-development-history/)
- [UMD和ECMAScript模块](https://www.cnblogs.com/snandy/archive/2012/03/19/2406596.html)
- [require.js官方文档](http://requirejs.org/docs/api.html)
- [AMD 规范(中文版)](https://github.com/amdjs/amdjs-api/wiki/AMD)
- [Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [requirejs 源码简析](https://github.com/lcxfs1991/blog/issues/20)
- [AMD加载器分析与实现](https://github.com/creeperyang/blog/issues/17)
- [叶小钗require.js](http://www.cnblogs.com/yexiaochai/tag/require.js/)

## AMD规范简介

AMD是`Asynchronous  Module Definition`，即异步模块定义。`require.js`就是根据它实现的。

AMD规范只定义了一个全局函数`define`。

```javascript
define(id?, dependencies?, factory)
```

- id：模块名，必须是顶级和绝对的
- dependencies：一个依赖模块的数组
- factory：初始化完成时的回调

```javascript
define('math', ['jquery'], function($){
    console.log($)
})
```

## 实现

要实现AMD规范，首先要做的就是异步加载js，然后执行callback。

```javascript
function loadScript(url, callback) {
    var script = document.createElement('script')
    script.src = url
    script.onload = function () {
        this.remove()
        callback()
    }
    document.body.appendChild(script)
}

// 使用
loadScript('https://cdn.bootcss.com/jquery/3.3.1/jquery.js', function () {
    $('body').css({
        background: 'red'
    })
})
```

但是显然`require.js`库的实现没这么简单。我来根据需求一步步完善。

AMD 规范的第二个参数 dependencies 是一个数组。而且里面每一项可以是标志。例如：

```javascript
require(['jquery', 'lodash'], function($, _){
    console.log($, _)
})
```

所以我需要循环数组，通过发布订阅模式或其他方法在每个库加载完成后检查是否所有库都加载完了，并执行回调。

```javascript
function loadScript(dependencies, callback) {
    var flag = 0
    var total = dependencies.length
    dependencies.forEach(function (item, index) {
        var script = document.createElement('script')
        script.src = loadScript.config[item]
        script.onload = function () {
            flag++
            if (flag == total) {
                callback()
            }
        }
        document.head.appendChild(script)
    })
}

loadScript.config = {
    jquery: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.js',
    lodash: 'https://cdn.bootcss.com/lodash.js/4.17.10/lodash.js'
}


// 使用
loadScript(['jquery', 'lodash'], function () {
    console.log($, _)
})
```

不过如何实现像下面注入$变量呢？

```javascript
require(['jquery'], function($){
    console.log($)
})
```

也就是要让 $ 等于`jquery.js`的导出模块。

这就是AMD规范定义的define方法了。实现AMD的库，都有类似下面这段代码：

```javascript
// lodash
define(function(){
    return _
})
```

所以这就很容易了。

```javascript
var depsArr = []

function define() {
    //console.log(nowKey)
    fn = arguments[arguments.length - 1]
    depsArr.push(fn())
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

loadScript.config = {
    jquery: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.js',
    lodash: 'https://cdn.bootcss.com/lodash.js/4.17.10/lodash.js'
}

// 使用
loadScript(['jquery', 'lodash'], function ($, _) {
    console.log($, _)
})
```

好吧，虽然上面运行貌似没有问题，但是depsArr数组依赖的参数顺序可能不对，因为onload的顺序是异步可变的。这一点应该如何解决呢？


