1. JavaScript模块化发展的演进历史 CommonJS、AMD、CMD、ES6模块的演进历史
2. 目前最主流的模块化实现方案: CommonJS 到 ES Module
3. 手写 CommonJS 的简单实现


# 模块机制

## 为什么要有模块机制

回顾一下我写 js 代码的历史，最开始是直接在html模板中插入script标签，每一个js文件都需要引入一个script标签，很容易造成冲突，而且代码看起来混杂不堪。
后来命名空间、设计模式开始用在代码中，再后来，开始使用一些模块管理的库，如seaJs，requireJs。
所以，总结下，js实际有下面不足：

1. 没有模块系统，缺少其它语言的如require、include引入模块的功能。
2. 标准库少，比如一个非常常见的功能，获取 url 的 get参数都需要自己写函数。
3. 没有包管理系统，不能自动加载和安装依赖。比如，如果需要插件 jquery-datetimepicker 实现选择时间的功能，还要去找依赖的 jquery 库文件，

这些问题导致 js 无法很好的应用于大型项目。为了解决这些问题，CommonJS 规范诞生了。

## commonJs规范

CommonJS规范的提出，不仅是弥补当前 javaScript 没有标准的缺陷，以达到像 Python、Java 具备开发大型应用的基础能力。而且期望用 CommonJS API 写出的应用可以具备跨宿主环境的能力。可以编写以下应用。

- 服务器端
- 命令行工具
- 桌面应用
- 混合应用（如Adobe AIR）

CommonJS为 JavaScript 开发大型应用指明了道路，规范包括模块、二进制、Buffer、字符串编码、I/O流、进程环境、文件系统、套接字、单元测试、web服务器网关接口、包管理等。

Node 借鉴 CommonJS 的 Module规范，实现了一套非常容易使用的模块系统，npm 对 packages 规范的完好支持使得 Node 应用在开发中事半功倍。

CommonJs 对模块的定义十分简单，主要分为模块引用、模块定义和模块标识3个部分。

**1、模块引用**

```javascript
var math = require('math');
```

在CommonJS 规范中，存在 require() 方法，这个方法接收模块标识，以此引入一个模块的API到当前上下文。

**2、模块定义**

在模块中，上下文提供 require() 方法来引入外部模块。对应引入功能，上下文提供了 exports 对象用于导出当前模块的方法和变量，并且它是唯一导出的出口。在模块中，还存在一个 module 对象，它代表模块自身，而 exports 是 module 的属性。在 node 中，一个文件就是一个模块，将方法挂载在 exports 对象上作为属性即可定义导出的方式。

```javascript
// math.js
exports.add = function(){
	var sum = 0,
	    i = 0,
	    args = arguments,
	    l = args.length;
	while (i < l){
		sum += args[i++];
	}
	return sum;
}
```

在另一个文件中，我们通过 require() 方法引入模块后，就能调用定义的属性和方法了。

```javascript
// program.js
var math = require('math');
exports.increment = function(val){
	return math.add(val, 1)
}
```

> exports 对象是 module.exports 的引用。node 实际是导出的 module.exports 对象。

**3、模块标志**

模块标志其实就是传递给 require() 方法的参数，它必须是符合小驼峰命名的字符串，或者以 .、.. 开头的相对路径，或者绝对路径。它可以没有文件后缀名.js。

模块的定义十分简单，接口也十分简洁。它的意义在于将类聚的方法和变量等限定在私有作用域中，同时支持引入和导出功能以顺畅地连接上下游依赖。每个模块具有独立的空间，它们互不干扰，在引用时也显得干净利索。

CommonJS 构建的这套模块导出和导入机制使得用户完全不必考虑变量污染，命名空间等方法与之相比相形见绌。

## Node的模块实现



前后端公共模块
- [Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [js模块化编程之彻底弄懂CommonJS和AMD/CMD！](https://www.cnblogs.com/chenguangliang/p/5856701.html)
- [JavaScript 模块化入门Ⅰ：理解模块](https://zhuanlan.zhihu.com/p/22890374)
- [JavaScript 模块化入门Ⅱ：模块打包构建](https://zhuanlan.zhihu.com/p/22945985)
- [JavaScript模块化编程简史](https://yuguo.us/weblog/javascript-module-development-history/)
- [深入了解JavaScript模块化编程](http://jerryzou.com/posts/jsmodular/)
- [JS模块化 - 浅谈 CommonJS require 函数实现](https://github.com/kaola-fed/blog/issues/16)
- [使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](http://justineo.github.io/singles/writing-modular-js/)
- [原生js从零实现AMD规范的define和require功能](https://github.com/chenshenhai/amd-define)

- [CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)
- [浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)
