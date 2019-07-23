---
title: "深入学习webpack原理"
date: 2019-06-14 07:32:38
toc: true
---


## bundle.js

这里来分析一下打包后的 bundle.js。

### 分析

webpack 打包后的主要代码如下：

```js
(function (modules){
    var installedModules = {};
    function __webpack_require__(moduleId){
        if (installedModules[moduleId]){
            return installedModules[moduleId].exports
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,  // 模块是否已经加载过
            exports: {}
        }
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

        module.l = true

        return module.exports
    }

    // __webpack_public_path__, 也就是output 配置里的 publicPath
    __webpack_require__.p = "./xx/"

    return __webpack_require__(__webpack_require__.s = './src/index.js')
({
   // 省略其它模块...

   "./src/images/1.jpg": (function (module, exports, __webpack_require__) {
     eval("module.exports = __webpack_require__.p +\"1_5a6aef13d80078566b424bce4385c7f2.jpg\"\n\n//# sourceURL=webpack:///./src/images/1.jpg?");
   }),
   "./src/index.js": (function (module, exports, __webpack_require__) {
     "use strict";
     eval("\n\n var fn = function fn() {\n  console.log('this is index');\n};\n\nfn();\nvar img = new Image();\nimg.src = __webpack_require__(/*! ./images/1.jpg */ \"./src/images/1.jpg\");\n\n//# sourceURL=webpack:///./src/index.js?");
   })
 });
```

上面代码可以看出这几点：

1. installedModules 是用来做缓存的，如果重复 require，会使用缓存。
2. webpack 将我们写的 require() 函数转换成了`__webpack_require__()`，这个函数会返回`modlue.exports`

这段代码首先执行入口模块`./src/index.js`，发现里面使用了图片，即`img.src = __webpack_require('./src/images/1.jpg`)`，它的返回结果就是图片的 url。

另外，还有一些转换规则如下：

```js
// a.js
export const a = () => {
    console.log('aaaaaaa')
}

// b.js
const b = 'hello'
export default b

// 代码
import {a} from './a.js'  // export a
import b from './b.js'   // export default b
console.log(b)

// 上面代码转换为
var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./a.js"); 
  console.log(_a__WEBPACK_IMPORTED_MODULE_0__["a"])
console.log(_a__WEBPACK_IMPORTED_MODULE_1__[\"default\"])

// a.js 会转换为
__webpack_require__.d(__webpack_exports__, \"a\", function() { return a; });\nconst a = () => {\n    console.log('aaaaaaa')\n}
// 相当于 __webpack_exports__.a = a

// b.js 会转换为
__webpack_exports__[\"default\"] = (b)
```

可以看到 export default 导出时会挂到模块的 default 属性下面。

除此之外，`__webpack_require__`函数还有一些其它的属性和方法：

```js
// 将模块对象暴露出去
__webpack_require__.m = modules;

// 将缓存对象暴露出去
__webpack_require__.c = installedModules;

// define getter function for harmony exports
__webpack_require__.d = function(exports, name, getter) {
  if(!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, { enumerable: true, get: getter });
  }
};

// define __esModule on exports
__webpack_require__.r = function(exports) {
  if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  }
  Object.defineProperty(exports, '__esModule', { value: true });
};

// create a fake namespace object
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 8|1: behave like require
__webpack_require__.t = function(value, mode) {
  if(mode & 1) value = __webpack_require__(value);
  if(mode & 8) return value;
  if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  var ns = Object.create(null);
  __webpack_require__.r(ns);
  Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  return ns;
};

// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function(module) {
  var getter = module && module.__esModule ?
    function getDefault() { return module['default']; } :
    function getModuleExports() { return module; };
  __webpack_require__.d(getter, 'a', getter);
  return getter;
};

// Object.prototype.hasOwnProperty.call
__webpack_require__.o = function(object, property) { 
    return Object.prototype.hasOwnProperty.call(object, property); 
};

// __webpack_public_path__, 也就是output 配置里的 publicPath
__webpack_require__.p = "./xx/";
```

### 异步加载

如果代码是异步加载的，会打包成什么样呢？编写 2 个模块：main.js 和 c.js。

```js
// main.js
document.onclick = function () {
    import('./c').then(test => {
        // Module {default: {key: 'something'}}
        console.log(test)
    })
}

// c.js
export default {
    key: 'something'
}
```

进行 webpack 打包后，会产生 2 个打包文件，分别是 bundle.js 和 0.bundle.js。

c.js 被编译成了 0.bundle.js，代码如下:

```js
// 0.bundle.js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{
    "./src/c.js": (function(module, __webpack_exports__, __webpack_require__) {
        eval(" __webpack_require__.r(__webpack_exports__);
            __webpack_exports__["default"] = ({
              key: 'something'
            })")
    })
}]);
```

上面的代码相当于是往 window["webpackJsonp"].push 了一个数组，后面的 c.js 模块导出了`__webpack_exports__ : {[Symbol.toStringTag]:'Module', default: {key: 'something'}`。

bundle.js 代码片段如下：

```js
"./src/main.js": (function(module, exports, __webpack_require__) {
    eval("document.onclick = function () {
         __webpack_require__.e(0)
            .then( __webpack_require__.bind(null, \"./src/c.js\"))
            .then(test => { 
                console.log(test)
            })
    }
})
```

可以看到，当点击 document 时，会执行`__webpack_require__.e(0)`，来看看函数 `__webpack_require__.e` 的代码:

```js
__webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData !== 0) { // 0 表示已经加载过

        // 如果有缓存过
        if (installedChunkData) {
            promises.push(installedChunkData[2]);
        } else {
            // 没有缓存则创建
            var promise = new Promise(function (resolve, reject) {
                installedChunkData = installedChunks[chunkId] = [resolve, reject];
            });
            promises.push(installedChunkData[2] = promise);
            // 相当于 installedChunkData =installedChunks[0] = [resolve,reject,promise]

            // 开始创建并加载 chunk js脚本
            var script = document.createElement('script');
            var onScriptComplete;
            script.charset = 'utf-8';
            script.timeout = 120;
            if (__webpack_require__.nc) {
                script.setAttribute("nonce", __webpack_require__.nc);
            }
            script.src = jsonpScriptSrc(chunkId);
            // 相当于是 <script charset='utf-8' timeout=120 nonce=__webpack_require__.nc src=`__webpack_require.p + 0.bundle.js`></script>

            // 在栈前面创建错误，否则得不到有用的信息
            var error = new Error();
            onScriptComplete = function (event) {
                // 避免ie内存泄露
                script.onerror = script.onload = null;
                clearTimeout(timeout);
                var chunk = installedChunks[chunkId];
                if (chunk !== 0) {
                    if (chunk) {
                        var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                        var realSrc = event && event.target && event.target.src;
                        error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                        error.name = 'ChunkLoadError';
                        error.type = errorType;
                        error.request = realSrc;
                        chunk[1](error);
                    }
                    installedChunks[chunkId] = undefined;
                }
            };
            var timeout = setTimeout(function () {
                onScriptComplete({
                    type: 'timeout',
                    target: script
                });
            }, 120000);
            script.onerror = script.onload = onScriptComplete;
            document.head.appendChild(script);  // 插入脚本
        }
    }
    return Promise.all(promises);
};
```

可以看到，大致就是将 0.bundle.js 插入到 head 中，但是 promise 在哪里执行的 resolve() 呢？

其实下面还有一段：

```js
var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
jsonpArray.push = webpackJsonpCallback;
jsonpArray = jsonpArray.slice();
for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
var parentJsonpFunction = oldJsonpFunction;
```

webpack 重置了 window['webpackJsonp'] 的 push 方法，修改为了 webpackJsonpCallback。webpackJsonpCallback 的代码如下：

```js
function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];
    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0,
        resolves = [];
    for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (installedChunks[chunkId]) {
            // 如果没有加载过 chunk，installedChunks[0] = [resolve,reject,promise]
            // resolves.push(resolve)
            resolves.push(installedChunks[chunkId][0]);
        }
        // 然后将它设为0，表示加载过了，后面会执行 resolve()
        installedChunks[chunkId] = 0;
    }

    // 将 chunk 里的模块挂到 modules 上，方便如果还有其它地方引入时直接使用
    for (moduleId in moreModules) {
        if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
            modules[moduleId] = moreModules[moduleId];
        }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);  // 这里是
    while (resolves.length) {
        resolves.shift()();   // 执行 resolve()
    }
};
```

所以在 0.bundle.js 执行时，其 window['webpackJsonp'].push 相当于是执行了上面的 webpackJsonpCallback 方法。data 为 `[[0], {'.src/c.js': ...}]`。在着里面执行了 resolve() 方法。

关于 parentJsonpFunction 的代码：

```js
jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
// 同步异步模块
for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
var parentJsonpFunction = oldJsonpFunction

// webpackJsonpCallback中
if (parentJsonpFunction) parentJsonpFunction(data);
```

上面代码会对 window["webpackJsonp"] 中的内容一一执行 webpackJsonpCallback，并且在异步加载时也执行一次。这样如果有在一个页面加载了多个入口文件，多个入口文件都使用了 0.js，它会只加载一次。注意这里需要 bundle2.js 在 0.js 之后加载才行。


### 总结

总结一下上面学到的东西:

1. 模块的设计，同步的模块统一存放在 modules，有缓存机制 installedModules；异步的模块会额外打包成一个 chunk，通过 __webpack_require__.e 加载 chunk js，并插入到 head 头部，返回一个 promise.all()，再通过执行修改后的 webpackJsonpCallback(`window['webpackJsonp'].push = webpackJsonpCallback`)方法，从而执行 promise 的 resolve()。
2. script 的 nonce 是用于 CSP 的。页面内嵌脚本必须有这个 nonce 才能执行。

```js
// 服务器返回头
Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

// 脚本
<script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
  // some code
</script>
```

## webpack loader

### 理解 loader

loader 的思想是将所有的模块都当作 js 模块来处理，如 css、图片等都通过 loader 转换成 js 模块。

- 对于 css: 可以转成一段功能是将 css 插入 dom 中的 js 模块。
- 对于图片，可以转成 base64 字符串内嵌，或者拷贝图片后导出图片的 URL。

每一个 loader 负责一件事情，符合单一职责原则。另外还可以将它们任意组合起来。如写 less 时，使用 less-loader 将 less 源文件处理为 css，再用 css-loader、style-loader 处理。

loader 实际是一个函数，会通过`run-loaders`进行执行，最终的返回值会被打包成模块形式的代码：

```js
"./src/index.css": (function(module, exports) {
eval("\n        var style = document.createElement('style');\n        style.innerHTML = \"body {\\n    background: red;\\n}\";\n        document.head.appendChild(style)\n    \n\n//# sourceURL=webpack:///./src/index.css?");
```

当用 `__webpack_require__("./src/index.css")` 引入时，会执行这个返回值代码。

自己写的 loader 引用的方式：

1. 做成 npm 包直接引用
2. 使用`resolveLoader`

```js
module.exports = {
    ...
    resolveLoader: {
        alias: {
            'babel-loader': path.resolve(__dirname, './loaders/babel-loader.js')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}
```

loader 配置的实际是一个路径，内部会调用 require(babelLoader的路径)。


### babel-loader

`babel-loader` 的主要功能是将 es6 源代码进行转换 es5。我们需要使用`@babel-core`和`@babel/preset-env`。

```js
// babel-loader.js
const babel = require('@babel-core')
module.exports = (content, map, meta) => {
    const babelOptions = {
        presets: ['@babel/preset-env']
    }
    const result = babel.transform(content, babelOptions)
    return result.code
}
```

如果需要生成 sourceMap，则要配置 babelOptions：

```js
const babelOptions = {
    sourceMaps: true,
    filename: this.request.split('!')[1].split('/').pop()
}
```

`sourceMaps: true`告诉 babel 需要生成 sourceMap，filename 是 sourceMap 的文件名，如果不提供则是 unKnown。`this.request`是一个字符串，格式为`loader绝对路径!处理文件的绝对路径`：

```
/Users/banli/Desktop/training/webpack-study/loaders/babel-loader.js!/Users/banli/Desktop/training/webpack-study/src/index.js
```

### style-loader 和 css-loader

- `css-loader`的作用是解析 css 中的 @import 和 url()，将它们转为 js 模块，即转为 require() 并导出。
- `style-loader`的作用是将样式插入到 DOM 中。大致流程如下：

```
const style = document.createElement('style')
style.innerHTML = css
document.head.appendChild(style)
```

### file-loader 和 url-loader

我们使用图片时，代码如下：

```js
const img = new Image()
img.src = require('./imgs/1.png')
```

可以看到如果要写一个 loader，它需要将图片转成一个`module.exports=imgUrl`这样的模块。

`file-loader`的功能就是将文件拷贝到 output 的目录，并返回 url。

```js
const loaderUtils = require('loader-utils')
const fileLoader = function (content) { // 不能是箭头函数，否则里面的this有问题
    // 获取file-loader的配置
    const options = loaderUtils.getOptions(this) || {}
    // options 是 {name: '[name]_[hash].[ext]'} 
    // interpolateName 是根据 name 和 content 生成唯一的文件名 url
    let url = loaderUtils.interpolateName(this, options.name, {
        content
    })
    // 生成文件
    this.emitFile(options.outputPath ? path.join(options.outputPath ,url) : url, content)
    // 导出 url
    return 'module.exports = __webpack_public_path__ +' + JSON.stringify(url)
}

module.exports = fileLoader
// 默认 loader 间传递的 content 是 utf8 ，raw 表示使用 raw-loader，这样收到的就是 Buffer 类型
module.exports.raw = true
```

`url-loader`比`file-loader`多了一个功能，是根据 limit 决定是生成文件还是生成 base64。

```js
const loaderUtils = require('loader-utils')
const mime = require('mime')

module.exports = function (content) {
    const options = loaderUtils.getOptions(this) || {}
    let limit = options.limit
    if (limit) {
        limit = parseInt(limit, 10)
    }
    const mimetype = options.mimetype || mime.getType(this.resourcePath);

    if (!limit || content.length < limit) {
        if (typeof content === 'string') {
            content = new Buffer(content)
        }
        const base64 = `data:${mimetype};base64${content.toString('base64')}`
        return `module.exports=${JSON.stringify(base64)}`
    }

    // 如果大于 limit，则用 file-loader 处理
    const fallback = options.fallback || 'file-loader'
    const fallbackLoader = require(fallback)
    return fallbackLoader.call(this, content)
}

module.exports.raw = true
```


## webpack 插件原理

### 原理

webpack 实现插件机制的大体过程：

1. 创建：在内部创建各种钩子。
2. 注册：插件将自己的方法注册到对应的钩子上。
3. 调用：webpack编译时，会触发对应的钩子，所以也就触发了插件的方法。






## tapable

### 官网文档总结

tapable 是一个类似 nodejs EventEmitter 的发布订阅模式库。它提供了一些 api：

```js
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
} = require("tapable");
```

1. Sync 开头的是同步钩子，Async 开头的是异步钩子。
2. 同步钩子只能用 tap 绑定事件，用`call()`触发，绑定事件时需要传入事件名和事件函数；异步钩子可以用 tap、tapAsync、tapPromise 绑定事件，但是它没有 call 方法，对应的需要用`callAsync()`、`promise()`触发。
3. 同步钩子只支持串行，即执行完一个再执行下一个。异步钩子分为串行和并行。并行相当于 Promise.all()。
4. `普通钩子 Hook` 与事件函数执行的返回值无关；`保险钩子 BailHook` 一旦事件函数返回 null，则后面的钩子不再执行；`瀑布流钩子 WaterfallHook` 上一个事件函数执行结果会作为参数传递给下一个事件函数，如果当前没有返回值，则上一个返回结果会穿透给下一个函数。`循环钩子 LoopHook` 是如果事件函数返回值不为 undefined，则重复执行，否则(`即return 或 return undefined`)会执行下一个。
5. 所有的钩子都接受一个可选参数，用来声明事件函数要接收的参数。如下：

```js
const { SyncHook } = require("tapable");
// 只声明了一个参数name，结果 call 时传入了多的参数，会被忽略掉
let queue = new SyncHook(['name'])
queue.tap('1', function (name, age) {
    console.log(11, name, age)  // 11, zhangsan, undefined
})
queue.call('zhangsan', 12)
```

6. 拦截器 intercept() 方法可以钩子运行期间做一些事情。

```js
myCar.hooks.calculateRoutes.intercept({
	call: (source, target, routesList) => {
		console.log("Starting to calculate routes");
	},
	register: (tapInfo) => {
		// tapInfo = { type: "promise", name: "GoogleMapsPlugin", fn: ... }
		console.log(`${tapInfo.name} is doing its job`);
		return tapInfo; // may return a new tapInfo object
	},
    loop:(...args) =>{},
    tap: (tap) => {}
})
```

7. context 对象，可以通过这个对象传递自己需要的数据给后续插件或拦截器。

```js
myCar.hooks.accelerate.intercept({
	context: true,
	tap: (context, tapInfo) => {
		// tapInfo = { type: "sync", name: "NoisePlugin", fn: ... }
		console.log(`${tapInfo.name} is doing it's job`);

		// `context` starts as an empty object if at least one plugin uses `context: true`.
		// If no plugins use `context: true`, then `context` is undefined.
		if (context) {
			// Arbitrary properties can be added to `context`, which plugins can then access.
			context.hasMuffler = true;
		}
	}
});

myCar.hooks.accelerate.tap({
	name: "NoisePlugin",
	context: true
}, (context, newSpeed) => {
	if (context && context.hasMuffler) {
		console.log("Silence...");
	} else {
		console.log("Vroom!");
	}
});
```

8. HookMap 是用来映射 key -> Hook 的一个帮助类。

```js
const keyedHook = new HookMap(key => new SyncHook(["arg"]))
keyedHook.tap("some-key", "MyPlugin", (arg) => { /* ... */ });
keyedHook.tapAsync("some-key", "MyPlugin", (arg, callback) => { /* ... */ });
keyedHook.tapPromise("some-key", "MyPlugin", (arg) => { /* ... */ });
const hook = keyedHook.get("some-key");
if(hook !== undefined) {
	hook.callAsync("arg", err => { /* ... */ });
}
```

9. MultiHook 可以将多个 hook 合起来一起操作。

```js
const { MultiHook } = require("tapable");
this.hooks.allHooks = new MultiHook([this.hooks.hookA, this.hooks.hookB]);
```

### SyncHook

串行同步执行，当调用 `call()`方法时它会一个个执行 tap 绑定的函数，如下。

```js
const { SyncHook } = require("tapable");
let queue = new SyncHook(['name'])
queue.tap('1', function (name) {
    console.log(11, name)
})
queue.tap('2', function (name) {
    console.log(22, name)
})
queue.tap('3', function (name) {
    console.log(33, name)
})
queue.call('hi')
```


下面简单实现一下，就是一个发布订阅模式，代码如下:

```js
class SyncHook {
    constructor() {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => task(...args))
    }
}
```

### SyncBailHook

同步保险钩子，如果有一个事件函数返回值为 null 则停止执行后面的事件函数。

```js
let {SyncBailHook} = require('tapable')
let h = new SyncBailHook(['name'])
h.tap('1', function (name) {
    console.log('1', name)
})
h.tap('2', function (name) {
    console.log('2', name)
    return null
})
h.tap('3', function (name) {
    console.log('3', name)
})
h.call('hi')
```

简单实现一下，代码如下：

```js
class SyncBailHook {
    constructor(name) {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let ret,
            i = 0,
            len = this.tasks.length
        // do {
        //     ret = this.tasks[i++](...args)
        // } while (ret !== null && i < len)
        for (; i < len; i++) {
            ret = this.tasks[i](...args)
            if (ret === null) break
        }
    }
}
```

### SyncWaterfallHook

同步瀑布流钩子，上一个事件函数的返回值会作为下一个事件函数的参数，如果当前没有返回值或返回 undefined 则上一个事件函数的返回值会穿透给下一个事件函数的参数。

```js
let {
    SyncWaterfallHook
} = require('tapable')
let h = new SyncWaterfallHook(['name'])
h.tap('1', function (name) {
    console.log(name, 1)
    return 11
})
h.tap('2', function (data) {
    console.log(data, 2)
})
h.tap('3', function (data) {
    console.log(data, 3)
})
h.call('zs')

// zs 1
// 11 2
// 11 3
```

简单实现一下：

```js
class SyncWaterfallHook {
    constructor(name) {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let ret = args
        let result
        this.tasks.forEach(task => {
            if (typeof result !== 'undefined') {
                ret = [result]
            }
            result = task(...ret)
        })
    }
}
```

### SyncLoopHook

同步循环钩子，如果当前事件函数的返回值为 undefined，则继续执行下一个，否则一直循环执行。要注意的是返回值不会传递给下一个事件函数，只有瀑布流钩子与返回值有关。

```js
const {SyncLoopHook } = require('tapable')
let h = new SyncLoopHook(['name'])
let count = 0
h.tap('1', function (name) {
    console.log(count)
    count++
    if (count === 3) {
        return 
    }
    return true
})
h.tap('2', function (name) {
    console.log(name)
})
h.call('hi')
```

简单实现一下：

```js
class SyncLoopHook {
    constructor() {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => {
            let ret
            do {
                ret = task(...args)
            } while (typeof ret !== 'undefined')
        })
    }
}
```

### AsyncParallelHook

异步并行钩子，可以通过 tap、tapAsync、tapPromise 三种方式绑定事件，对应的需要用 callAsync()、callAsync()、promise() 方法触发，它们的最后一个参数是一个回调函数。

1. tap + callAsync() 搭配，和 SyncHook 效果一样。

```js
let { AsyncParallelHook } = require('tapable')
let h = new AsyncParallelHook(['name'])
console.time('cost')
h.tap('1', function (name) {
    setTimeout(() => {
        console.log(1, name)
    }, 1000)
})
h.tap('2', function (name) {
    setTimeout(() => {
        console.log(2, name)
    }, 2000)
})
h.tap('3', function (name) {
    setTimeout(() => {
        console.log(3, name)
    }, 3000)
})
h.callAsync('hi', err => {
    console.log('err:', err)
    console.timeEnd('cost')  
})

// err:undefined
// cost: 10.181ms
// 1 hi
// 2 hi
// 3 hi
```

2. tapAsync + callAsync() 搭配，则需要使用事件回调函数的最后一个参数 callback，表示事件执行完成了，如果有一个事件回调函数没有调用 callback()，则不会触发 callAsync() 的回调。

```js
let { AsyncParallelHook } = require('tapable')
let h = new AsyncParallelHook(['name'])
console.time('cost')
h.tapAsync('1', function (name,callback) {
    setTimeout(() => {
        console.log(1, name)
        callback()
    }, 1000)
})
h.tapAsync('2', function (name,callback) {
    setTimeout(() => {
        console.log(2, name)
        callback()   
    }, 2000)
})
h.tapAsync('3', function (name,callback) {
    setTimeout(() => {
        console.log(3, name)
        callback()
    }, 3000)
})
h.callAsync('hi', err => {
    // 假设其中一个不使用callback()，则这里回调不会执行
    console.log('err:',err)
    console.timeEnd('cost')
})
// 1 hi
// 2 hi
// 3 hi
// err:undefined
// cost: 3008.706ms
```

下面来实现一个 tapAsync 和 callAsync()。

```js
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,length = this.tasks.length;
        function done(err) {
            if (++i == length) {
                callback(err);
            }
        }
        this.tasks.forEach(task => {
            task(...args,done);
        });
    }
}
```

3. tapPromis + promise() 搭配，事件处理函数需要返回一个 promise。

```js
let { AsyncParallelHook } = require('tapable')
let h = new AsyncParallelHook(['name'])
console.time('cost')
h.tapPromise('1', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1, name)
            resolve('xx')
        }, 1000)
    })
})
h.tapPromise('2', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2, name)
            resolve('xx')
        }, 2000)
    })
})
h.tapPromise('3', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(3, name)
            resolve('xx')
        }, 3000)
    })
})
h.promise('hi').then((data)=> {
    // 这里data 不会接收resolve(data)的返回值，除非用 waterfall 类型的钩子
    console.log(`data:${data}`) 
    console.timeEnd('cost')
})

// 1 hi
// 2 hi
// 3 hi
// cost: 3008.312ms
```

下面简单实现一下：

```js
class AsyncParallelHook {
    constructor() {
        this.tasks = []
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        let promises = this.tasks.map(task => task(...args));
        return Promise.all(promises).then(() => undefined)
    }
}
```

4. 不要用 tapAsync + promise() 搭配或其它搭配方式，有很多问题，而且从名字来看也是不合理的。

### AsyncParallelBailHook

异步并行保险钩子，一旦有事件函数返回值为真值(`if(data)`)，则终止。

1. tap + callAsync() 搭配。一旦有事件函数返回值为真，则执行 callAsync 回调不再执行其它事件函数。
2. tapAsync + callAsync() 搭配，一旦有事件函数的回调 callback(真值)，则执行 callAsync 回调，继续执行其它事件函数。
3. tapPromsie + promise() 搭配，一旦有reject()，则执行 promise.then() 的 onRejected，只有全部都 resolve()，才执行promise.then 的 onFullfilled。

### AsyncSeriesHook

异步串行钩子

### AsyncSeriesBailHook

异步串行保险钩子

### AsyncSeriesWaterfallHook

异步串行瀑布流钩子




## 参考资料

- [webpack 源码解析](https://github.com/lihongxun945/diving-into-webpack)
- [如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？](https://www.zhihu.com/question/41922432?sort=created)
- [滴滴webpack系列](https://github.com/DDFE/DDFE-blog#webpack%E7%B3%BB%E5%88%97)
- [珠峰架构师成长计划](http://www.zhufengpeixun.cn/architecture/html/26.webpack-3.tapable.html)
- [webpack原理](https://segmentfault.com/a/1190000015088834)
