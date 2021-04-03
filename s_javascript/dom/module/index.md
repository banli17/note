---
title: 模块化开发
---

## 学习要求

1. 了解模块化开发发展历史
1. 掌握 AMD 规范
1. 学习 require.js，并实现简单代码
1. 掌握 UMD 规范和实现原理
1. 掌握 common.js，并实现简单代码(见第五章 COMMONJS 规范)
1. 掌握 ES6 模块化

1) JavaScript 模块化发展的演进历史 CommonJS、AMD、CMD、ES6 模块的演进历史
2) 目前最主流的模块化实现方案: CommonJS 到 ES Module
3) 手写 CommonJS 的简单实现

# 模块机制

## 为什么要有模块机制

回顾一下我写 js 代码的历史，最开始是直接在 html 模板中插入 script 标签，每一个 js 文件都需要引入一个 script 标签，很容易造成冲突，而且代码看起来混杂不堪。
后来命名空间、设计模式开始用在代码中，再后来，开始使用一些模块管理的库，如 seaJs，requireJs。
所以，总结下，js 实际有下面不足：

1. 没有模块系统，缺少其它语言的如 require、include 引入模块的功能。
2. 标准库少，比如一个非常常见的功能，获取 url 的 get 参数都需要自己写函数。
3. 没有包管理系统，不能自动加载和安装依赖。比如，如果需要插件 jquery-datetimepicker 实现选择时间的功能，还要去找依赖的 jquery 库文件，

这些问题导致 js 无法很好的应用于大型项目。为了解决这些问题，CommonJS 规范诞生了。

## commonJs 规范

CommonJS 规范的提出，不仅是弥补当前 javaScript 没有标准的缺陷，以达到像 Python、Java 具备开发大型应用的基础能力。而且期望用 CommonJS API 写出的应用可以具备跨宿主环境的能力。可以编写以下应用。

- 服务器端
- 命令行工具
- 桌面应用
- 混合应用（如 Adobe AIR）

CommonJS 为 JavaScript 开发大型应用指明了道路，规范包括模块、二进制、Buffer、字符串编码、I/O 流、进程环境、文件系统、套接字、单元测试、web 服务器网关接口、包管理等。

Node 借鉴 CommonJS 的 Module 规范，实现了一套非常容易使用的模块系统，npm 对 packages 规范的完好支持使得 Node 应用在开发中事半功倍。

CommonJs 对模块的定义十分简单，主要分为模块引用、模块定义和模块标识 3 个部分。

**1、模块引用**

```javascript
var math = require("math");
```

在 CommonJS 规范中，存在 require() 方法，这个方法接收模块标识，以此引入一个模块的 API 到当前上下文。

**2、模块定义**

在模块中，上下文提供 require() 方法来引入外部模块。对应引入功能，上下文提供了 exports 对象用于导出当前模块的方法和变量，并且它是唯一导出的出口。在模块中，还存在一个 module 对象，它代表模块自身，而 exports 是 module 的属性。在 node 中，一个文件就是一个模块，将方法挂载在 exports 对象上作为属性即可定义导出的方式。

```javascript
// math.js
exports.add = function () {
  var sum = 0,
    i = 0,
    args = arguments,
    l = args.length;
  while (i < l) {
    sum += args[i++];
  }
  return sum;
};
```

在另一个文件中，我们通过 require() 方法引入模块后，就能调用定义的属性和方法了。

```javascript
// program.js
var math = require("math");
exports.increment = function (val) {
  return math.add(val, 1);
};
```

> exports 对象是 module.exports 的引用。node 实际是导出的 module.exports 对象。

**3、模块标志**

模块标志其实就是传递给 require() 方法的参数，它必须是符合小驼峰命名的字符串，或者以 .、.. 开头的相对路径，或者绝对路径。它可以没有文件后缀名.js。

模块的定义十分简单，接口也十分简洁。它的意义在于将类聚的方法和变量等限定在私有作用域中，同时支持引入和导出功能以顺畅地连接上下游依赖。每个模块具有独立的空间，它们互不干扰，在引用时也显得干净利索。

CommonJS 构建的这套模块导出和导入机制使得用户完全不必考虑变量污染，命名空间等方法与之相比相形见绌。

## Node 的模块实现

前后端公共模块

- [Javascript 模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [Javascript 模块化编程（二）：AMD 规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [Javascript 模块化编程（三）：require.js 的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [js 模块化编程之彻底弄懂 CommonJS 和 AMD/CMD！](https://www.cnblogs.com/chenguangliang/p/5856701.html)
- [JavaScript 模块化入门 Ⅰ：理解模块](https://zhuanlan.zhihu.com/p/22890374)
- [JavaScript 模块化入门 Ⅱ：模块打包构建](https://zhuanlan.zhihu.com/p/22945985)
- [JavaScript 模块化编程简史](https://yuguo.us/weblog/javascript-module-development-history/)
- [深入了解 JavaScript 模块化编程](http://jerryzou.com/posts/jsmodular/)
- [JS 模块化 - 浅谈 CommonJS require 函数实现](https://github.com/kaola-fed/blog/issues/16)
- [使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](http://justineo.github.io/singles/writing-modular-js/)
- [原生 js 从零实现 AMD 规范的 define 和 require 功能](https://github.com/chenshenhai/amd-define)

- [CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)
- [浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)

* [JavaScript 模块化编程简史](https://yuguo.us/weblog/javascript-module-development-history/)
* [UMD 和 ECMAScript 模块](https://www.cnblogs.com/snandy/archive/2012/03/19/2406596.html)
* [require.js 官方文档](http://requirejs.org/docs/api.html)
* [AMD 规范(中文版)](https://github.com/amdjs/amdjs-api/wiki/AMD)
* [Javascript 模块化编程（二）：AMD 规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
* [requirejs 源码简析](https://github.com/lcxfs1991/blog/issues/20)
* [AMD 加载器分析与实现](https://github.com/creeperyang/blog/issues/17)
* [叶小钗 require.js](http://www.cnblogs.com/yexiaochai/tag/require.js/)

## AMD 规范简介

AMD 是`Asynchronous Module Definition`，即异步模块定义。`require.js`就是根据它实现的。

AMD 规范只定义了一个全局函数`define`。

```javascript
define(id?, dependencies?, factory)
```

- id：模块名，必须是顶级和绝对的
- dependencies：一个依赖模块的数组
- factory：初始化完成时的回调

```javascript
define("math", ["jquery"], function ($) {
  console.log($);
});
```

## 实现

要实现 AMD 规范，首先要做的就是异步加载 js，然后执行 callback。

```javascript
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.src = url;
  script.onload = function () {
    this.remove();
    callback();
  };
  document.body.appendChild(script);
}

// 使用
loadScript("https://cdn.bootcss.com/jquery/3.3.1/jquery.js", function () {
  $("body").css({
    background: "red",
  });
});
```

但是显然`require.js`库的实现没这么简单。我来根据需求一步步完善。

AMD 规范的第二个参数 dependencies 是一个数组。而且里面每一项可以是标志。例如：

```javascript
require(["jquery", "lodash"], function ($, _) {
  console.log($, _);
});
```

所以我需要循环数组，通过发布订阅模式或其他方法在每个库加载完成后检查是否所有库都加载完了，并执行回调。

```javascript
function loadScript(dependencies, callback) {
  var flag = 0;
  var total = dependencies.length;
  dependencies.forEach(function (item, index) {
    var script = document.createElement("script");
    script.src = loadScript.config[item];
    script.onload = function () {
      flag++;
      if (flag == total) {
        callback();
      }
    };
    document.head.appendChild(script);
  });
}

loadScript.config = {
  jquery: "https://cdn.bootcss.com/jquery/3.3.1/jquery.js",
  lodash: "https://cdn.bootcss.com/lodash.js/4.17.10/lodash.js",
};

// 使用
loadScript(["jquery", "lodash"], function () {
  console.log($, _);
});
```

不过如何实现像下面注入\$变量呢？

```javascript
require(["jquery"], function ($) {
  console.log($);
});
```

也就是要让 \$ 等于`jquery.js`的导出模块。

这就是 AMD 规范定义的 define 方法了。实现 AMD 的库，都有类似下面这段代码：

```javascript
// lodash
define(function () {
  return _;
});
```

所以这就很容易了。

```javascript
var depsArr = [];

function define() {
  //console.log(nowKey)
  fn = arguments[arguments.length - 1];
  depsArr.push(fn());
}

define.amd = {};

function loadScript(dependencies, callback) {
  var flag = 0;
  var total = dependencies.length;
  dependencies.forEach(function (item) {
    var script = document.createElement("script");
    script.src = loadScript.config[item];
    script.onload = function () {
      flag++;
      if (flag == total) {
        callback.apply(null, depsArr);
      }
    };
    document.head.appendChild(script);
  });
}

loadScript.config = {
  jquery: "https://cdn.bootcss.com/jquery/3.3.1/jquery.js",
  lodash: "https://cdn.bootcss.com/lodash.js/4.17.10/lodash.js",
};

// 使用
loadScript(["jquery", "lodash"], function ($, _) {
  console.log($, _);
});
```

好吧，虽然上面运行貌似没有问题，但是 depsArr 数组依赖的参数顺序可能不对，因为 onload 的顺序是异步可变的。这一点应该如何解决呢？

## 学习资料

- [Require.js 叶小钗](https://www.cnblogs.com/yexiaochai/p/3213712.html)
- [RequireJS 学习笔记](https://www.cnblogs.com/yexiaochai/p/3214926.html)
- [使用 RequireJS 优化 Web 应用前端](https://www.ibm.com/developerworks/cn/web/1209_shiwei_requirejs/)
- [http://requirejs.org/](http://requirejs.org/)

## 使用

```javascript
<script data-main="script/main.js" scr="scripts/require.js"></script>
```

`main.js`文件的路径是引入 require.js 的 HTML 页面目录。

### baseUrl

baseUrl 用来设置 js 加载的相对路径。默认是和`data-main`的值是同一个目录。

```
requirejs.config({
    baseUrl: 'js/lib',  // 也是相对引入require.js的页面的目录
    paths: {
        app: '../app'  // 路径是 js/app，它是相对于baseUrl，不带.js后缀
    }
})
```

### paths

用于定义不在 baseUrl 目录下的模块。

### shim

shim 参数解决了使用非 AMD 方式定义的模块（如 jQuery 插件）及其载入顺序。比如 jquery 插件一般是挂载在`jQuery.fn`对象上的，它不是 define 定义的模块。为了保证在使用插件的时候首先加载 jQuery，就需要使用 shim。

```javascript
require.config({
  shim: {
    "jquery-slide": ["jquery"],
  },
});

require(["jquery-slide"]);
```

### require()

```
// 这里jquery,lodash加载是有顺序的
require(['jquery', 'lodash'], function($, _){

})
```

### 循环依赖

有时候，a 依赖 b，b 又依赖 a。这时需要用`require('a')`延迟获取模块。否则获取不到 a。

```javascript
// a.js
define(["b"], function (b) {
  return {
    name: b.name,
  };
});

// b.js
define(["a"], function (a) {
  // 因为在a里执行依赖b的时候，b.js还没有执行到返回结果，所以出错
  console.log(a);
  return {
    name: a.name,
  };
});
```

上面的代码需要修改成下面这样。

```javascript
// a.js
define(["b"], function (b) {
  return {
    name: b.name,
  };
});

// b.js
define(["a"], function (a) {
  return {
    name: function () {
      // 延迟获取a模块，这里return a也没有用，因为a模块之前加载的时候，还没有结果
      return require("a");
    },
  };
});
```

### exports

```javascript
define(function (require, exports, module) {
  //If "a" has used exports, then we have a real
  //object reference here. However, we cannot use
  //any of a's properties until after b returns a value.
  var a = require("a");

  exports.foo = function () {
    return a.bar();
  };
});
```

# UMD 规范

## 学习资料

- [JavaScript 模块化编程简史](https://yuguo.us/weblog/javascript-module-development-history/)
- [UMD 和 ECMAScript 模块](https://www.cnblogs.com/snandy/archive/2012/03/19/2406596.html)

## UMD 简介和实现

UMD 规范是为了兼容 AMD 和 CommonJS 规范，它的实现很容易。

```javascript
;(function(){
    this.util = {
        getUrl: function(){},
        parseUrl(): function(){},
        ...
    }
})(this);
```

上面是一个工具库，接下来我会将它改成 UMD 规范。这样就能够兼容浏览器、Node 和 AMD 规范了。

```javascript
(function(root, factory){
    if(typeof define === 'function' && define.amd){
        // amd 规范
        define(factory)
    }else if(typeof exports === 'object'){
        // commonjs 规范
        module.exports = factory()
    }else{
        // 浏览器上
        root.util = factory()
    }
})(this, function(){
    var util = {
        getUrl: function(){},
        parseUrl(): function(){},
        ...
    }

    return util
});
```

下面是《JavaScript 设计模式》作者 Dustin Diaz 开发的 qwery 里面的代码。

![](./imgs/umd.png)

UMD 规范还是比较简单的，它的目的只是为了兼容其他规范。
