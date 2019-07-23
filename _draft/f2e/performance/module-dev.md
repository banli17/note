---
        title: 无名
        ---
        # 模块化编程

## 模块化发展演进历史

当业务代码越来越多，如果将它们全部放在一个文件，会变得很难维护。同时如果依赖的库越来越多，它们之间的引入顺序也会难以管理。 这时我们往往会对代码进行拆分，通常将一个功能放在一个文件里，这一个文件就是一个模块。

模块化主要就是来解决命名冲突、全局污染和依赖关系的。模块化定义统一的模块写法，自动帮我们分析管理依赖。

前缀命名空间、对象命名空间，属性和函数都会暴露，而且可能出现a.b.c.d很长的调用。IIFE立即执行函数表达式。`immediate  invoked function express`。保护私有变量，只暴露有用的接口。

```
var a = (function(){
    return {
        fn1: fn1
    }
})();
```

下面两种方法会报错

```
function (){}()
function hi(){}()
```

这是因为js解析器遇到function时，认为是在定义函数，必须要有函数名，且末尾不能是()。

但是上面的代码依然存在全局变量污染的问题。

```
var module1 = ..
var module2 = ..
var module3 = ..
```

为了解决这个问题，社区出了一些模块化的方案，主流的有3种：

1. commonjs
2. AMD
3. CMD

commonjs 是为了让js能够编写大型程序而提出的，node 的模块化是按照它来实现的，主要应用于后端。它的模块化方案如下：

- 一个文件就是一个模块
- require() 引入模块
- module.exports 导出模块

```
// 引入
var module1 = require('module2.js')

// 导出
module.exports = {}
```

commonjs是同步加载的，因为后端的js是在本机上，所以不会造成影响，但是浏览器端是通过网络请求js的，如果同步，则会造成阻塞。

AMD 和 CMD规范主要应用在浏览器端，AMD 规范的方法如下：

```
// 定义模块A， 依赖于B
define(A,['B'] (require, exports, module)=>{
    exports.fn = fn
})

// 使用模块
require(['A'], (A)=>{})
```

AMD规范是依赖前置，先声明需要引入的模块，然后再使用，`require.js`是按照AMD规范来实现的。

CMD规范是依赖就近引入。如下：

```
// module2
define(function (require,exports,module) {
      // exports : 对外的接口
      // require : 依赖的模块
      require('./a.js');//如果地址是一个模块的话，那么require的返回值就是模块中的exports
});
```
`sea.js`是按照这种方式来实现的。

不过现在在浏览器端，require.js 和 sea.js都可以不用了，因为新的es6从语言上已经有了模块化规范。

## commonjs的简单实现
   
   
## 参考资料

- [Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [RequireJS入门（一）](http://www.cnblogs.com/snandy/archive/2012/05/22/2513652.html)
- [RequireJS入门（二）](http://www.cnblogs.com/snandy/archive/2012/05/23/2513712.html)
- [RequireJS入门（三）](http://www.cnblogs.com/snandy/archive/2012/06/08/2538001.html)
- [requrie源码学习](http://www.cnblogs.com/yexiaochai/p/3632580.html)
- [RequireJS学习笔记](http://www.cnblogs.com/yexiaochai/p/3214926.html)
- [RequireJS 入门指南](http://www.oschina.net/translate/getting-started-with-the-requirejs-library)
- [为何用 Web 模块的方式？](http://cyj.me/why-seajs/requirejs/)
- [为何用 AMD 规范？](http://cyj.me/why-seajs/requirejs/#why-amd)





# 模块化开发

模块化开发分为js模块化和css模块化。本文将详细介绍下面几个概念。

1. js模块化的发展: 命名空间、CommonJS、AMD、CMD、UMD、ES6 Module
2. css模块化：OOCSS、ACSS、BEM、SMACSS

## js模块化的发展


## css模块化

css模块化实际上是css的组织方式，因为写css很容易，但是写好css很难。要写好css实际上就需要组织好css。

### OOCSS

OOCSS是以面向对象的方式来写css，以提高代码重用性、可维护性和可扩展性。面向对象的CSS有两个原则。

- 分离结构和主题：分离结构和主题是在于将一些视觉样式效果作为单独的“主题”来应用。
- 分离容器和内容：分离容器和内容要求使页面元素不依赖于其所处位置。

```
// 一般
<div class="size1of4"></div>
.size1of4 {
    background: blue;
    border: 1px solid #ccc;
    margin: 5px 10px 10px;
    width: 25%;
}

// oocss
<div class="size1of4 bgBlue solidGray mts mlm mrm mbm"></div>
.size1of4 {width: 25%;}
.bgBlue {background:blue}
.solidGray {border: 1px solid #ccc}
.mts {margin-top: 5px}
.mrm {margin-right: 10px}
.mbm {margin-bottom: 10px}
.mlm {margin-left: 10px}
```
可以看出，OOCSS风格的css可以描述为两点：

- 增加class
- 不使用继承选择符

OOCSS追求元件的复用，其class命名比较抽象，一般不体现具体内容。

### SMACSS
https://smacss.com/
是由Jonathan Snook提出的css理论。其主要原则有3条：

- 为css分类，SMACSS认为css有5个类别，分别是：
    - base rules：基础样式，比如css reset，它的定义不会用到class和id
    - layout rules：布局样式，可以作为module rules的容器，比如左右分栏，栅格系统。
    - module rules：模块样式，比如产品列表，导航条
    - state rules：任一元素特定状态下的外观，比如success和error提示框。
    - theme rules：主题外观，不强制使用单独的class，可以在module里直接定义。
- 命名规则
    - layout rules用 l- 或layout-这样的前缀，比如.l-header，.l-sidebar。
    - module rules用模块本身的名字，比如.media，.media-image
    - state rules用 is-前缀，比如.is-active，.is-hidden
    - theme rules如果用作单独的class，用theme-前缀，如.theme-a-background
- 最小化适配深度，不依赖html结构
   ```
   /* depth 1 */  
   .sidebar ul h3 { }   
     
   /* depth 2 */  
   .sub-title { }  
   ```
SMACSS着力于实现两个主要目标：

- 更语义化的html和css
- 降低对特定html结构的依赖

### SUIT CSS
http://suitcss.github.io/

### Atomic
http://github.com/nemophrost/atomic-css
### BEM
http://getbem.com/introduction/
BEM，即Block，Element，Modifier。
- Block是页面中独立存在的区块，可以在不同场合下被重用。每个页面都可以看做是多个Block组成。
- Element是构成Block的元素，只有在对应Block内部才具有意义，是依赖于Block的存在。
- Modifier是描述Block或Element的属性或状态。同一Block或Element可以有多个Modifier。

**Block**

Block用class属性表示，它用来描述目的，而不是状态。

```
// 正确
<div class="error"></div>

// 错误
<div class="red-text"></div>
```

- block不影响布局，所以不涉及外部距离和位置。
- 只是用class,不使用id和tag选择器

这可以提高重用性和可移植性。

```
.block { }   
.block_modifier { }   
.block__element { }   
.block__element_modifier { }  
```


## 参考资料

- [OOCSS——概念篇](https://www.w3cplus.com/css/oocss-concept)
- [OOCSS——核心篇](https://www.w3cplus.com/css/oocss-core)
- [深入解读CSS的OOCSS和SMACSS以及BEM](http://www.jb51.net/css/362236.html)
- [决战BEM, 10个常见问题及其解决方案](https://zhuanlan.zhihu.com/p/26407119?group_id=837593211068362752)
- [如何看待 CSS 中 BEM 的命名方式](https://www.zhihu.com/question/21935157)






































