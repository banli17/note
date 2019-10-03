---
title: 四、原理分析
---

# webpack 原理分析

## 构建流程

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
  if (!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, { enumerable: true, get: getter });
  }
};

// define __esModule on exports
__webpack_require__.r = function(exports) {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  }
  Object.defineProperty(exports, "__esModule", { value: true });
};

// create a fake namespace object
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 8|1: behave like require
__webpack_require__.t = function(value, mode) {
  if (mode & 1) value = __webpack_require__(value);
  if (mode & 8) return value;
  if (mode & 4 && typeof value === "object" && value && value.__esModule)
    return value;
  var ns = Object.create(null);
  __webpack_require__.r(ns);
  Object.defineProperty(ns, "default", { enumerable: true, value: value });
  if (mode & 2 && typeof value != "string")
    for (var key in value)
      __webpack_require__.d(
        ns,
        key,
        function(key) {
          return value[key];
        }.bind(null, key)
      );
  return ns;
};

// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function(module) {
  var getter =
    module && module.__esModule
      ? function getDefault() {
          return module["default"];
        }
      : function getModuleExports() {
          return module;
        };
  __webpack_require__.d(getter, "a", getter);
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
document.onclick = function() {
  import("./c").then(test => {
    // Module {default: {key: 'something'}}
    console.log(test);
  });
};

// c.js
export default {
  key: "something"
};
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
  if (installedChunkData !== 0) {
    // 0 表示已经加载过

    // 如果有缓存过
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      // 没有缓存则创建
      var promise = new Promise(function(resolve, reject) {
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });
      promises.push((installedChunkData[2] = promise));
      // 相当于 installedChunkData =installedChunks[0] = [resolve,reject,promise]

      // 开始创建并加载 chunk js脚本
      var script = document.createElement("script");
      var onScriptComplete;
      script.charset = "utf-8";
      script.timeout = 120;
      if (__webpack_require__.nc) {
        script.setAttribute("nonce", __webpack_require__.nc);
      }
      script.src = jsonpScriptSrc(chunkId);
      // 相当于是 <script charset='utf-8' timeout=120 nonce=__webpack_require__.nc src=`__webpack_require.p + 0.bundle.js`></script>

      // 在栈前面创建错误，否则得不到有用的信息
      var error = new Error();
      onScriptComplete = function(event) {
        // 避免ie内存泄露
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var chunk = installedChunks[chunkId];
        if (chunk !== 0) {
          if (chunk) {
            var errorType =
              event && (event.type === "load" ? "missing" : event.type);
            var realSrc = event && event.target && event.target.src;
            error.message =
              "Loading chunk " +
              chunkId +
              " failed.\n(" +
              errorType +
              ": " +
              realSrc +
              ")";
            error.name = "ChunkLoadError";
            error.type = errorType;
            error.request = realSrc;
            chunk[1](error);
          }
          installedChunks[chunkId] = undefined;
        }
      };
      var timeout = setTimeout(function() {
        onScriptComplete({
          type: "timeout",
          target: script
        });
      }, 120000);
      script.onerror = script.onload = onScriptComplete;
      document.head.appendChild(script); // 插入脚本
    }
  }
  return Promise.all(promises);
};
```

可以看到，大致就是将 0.bundle.js 插入到 head 中，但是 promise 在哪里执行的 resolve() 呢？

其实下面还有一段：

```js
var jsonpArray = (window["webpackJsonp"] = window["webpackJsonp"] || []);
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
  var moduleId,
    chunkId,
    i = 0,
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
  if (parentJsonpFunction) parentJsonpFunction(data); // 这里是
  while (resolves.length) {
    resolves.shift()(); // 执行 resolve()
  }
}
```

所以在 0.bundle.js 执行时，其 window['webpackJsonp'].push 相当于是执行了上面的 webpackJsonpCallback 方法。data 为 `[[0], {'.src/c.js': ...}]`。在着里面执行了 resolve() 方法。

关于 parentJsonpFunction 的代码：

```js
jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
// 同步异步模块
for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
var parentJsonpFunction = oldJsonpFunction;

// webpackJsonpCallback中
if (parentJsonpFunction) parentJsonpFunction(data);
```

上面代码会对 window["webpackJsonp"] 中的内容一一执行 webpackJsonpCallback，并且在异步加载时也执行一次。这样如果有在一个页面加载了多个入口文件，多个入口文件都使用了 0.js，它会只加载一次。注意这里需要 bundle2.js 在 0.js 之后加载才行。

### 总结

总结一下上面学到的东西:

1. 模块的设计，同步的模块统一存放在 modules，有缓存机制 installedModules；异步的模块会额外打包成一个 chunk，通过 **webpack_require**.e 加载 chunk js，并插入到 head 头部，返回一个 promise.all()，再通过执行修改后的 webpackJsonpCallback(`window['webpackJsonp'].push = webpackJsonpCallback`)方法，从而执行 promise 的 resolve()。
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

loader 配置的实际是一个路径，内部会调用 require(babelLoader 的路径)。

### babel-loader

`babel-loader` 的主要功能是将 es6 源代码进行转换 es5。我们需要使用`@babel-core`和`@babel/preset-env`。

```js
// babel-loader.js
const babel = require("@babel-core");
module.exports = (content, map, meta) => {
  const babelOptions = {
    presets: ["@babel/preset-env"]
  };
  const result = babel.transform(content, babelOptions);
  return result.code;
};
```

如果需要生成 sourceMap，则要配置 babelOptions：

```js
const babelOptions = {
  sourceMaps: true,
  filename: this.request
    .split("!")[1]
    .split("/")
    .pop()
};
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
const img = new Image();
img.src = require("./imgs/1.png");
```

可以看到如果要写一个 loader，它需要将图片转成一个`module.exports=imgUrl`这样的模块。

`file-loader`的功能就是将文件拷贝到 output 的目录，并返回 url。

```js
const loaderUtils = require("loader-utils");
const fileLoader = function(content) {
  // 不能是箭头函数，否则里面的this有问题
  // 获取file-loader的配置
  const options = loaderUtils.getOptions(this) || {};
  // options 是 {name: '[name]_[hash].[ext]'}
  // interpolateName 是根据 name 和 content 生成唯一的文件名 url
  let url = loaderUtils.interpolateName(this, options.name, {
    content
  });
  // 生成文件
  this.emitFile(
    options.outputPath ? path.join(options.outputPath, url) : url,
    content
  );
  // 导出 url
  return "module.exports = __webpack_public_path__ +" + JSON.stringify(url);
};

module.exports = fileLoader;
// 默认 loader 间传递的 content 是 utf8 ，raw 表示使用 raw-loader，这样收到的就是 Buffer 类型
module.exports.raw = true;
```

`url-loader`比`file-loader`多了一个功能，是根据 limit 决定是生成文件还是生成 base64。

```js
const loaderUtils = require("loader-utils");
const mime = require("mime");

module.exports = function(content) {
  const options = loaderUtils.getOptions(this) || {};
  let limit = options.limit;
  if (limit) {
    limit = parseInt(limit, 10);
  }
  const mimetype = options.mimetype || mime.getType(this.resourcePath);

  if (!limit || content.length < limit) {
    if (typeof content === "string") {
      content = new Buffer(content);
    }
    const base64 = `data:${mimetype};base64${content.toString("base64")}`;
    return `module.exports=${JSON.stringify(base64)}`;
  }

  // 如果大于 limit，则用 file-loader 处理
  const fallback = options.fallback || "file-loader";
  const fallbackLoader = require(fallback);
  return fallbackLoader.call(this, content);
};

module.exports.raw = true;
```

## webpack 插件原理

### 原理

webpack 实现插件机制的大体过程：

1. 创建：在内部创建各种钩子。
2. 注册：插件将自己的方法注册到对应的钩子上。
3. 调用：webpack 编译时，会触发对应的钩子，所以也就触发了插件的方法。
