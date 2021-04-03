---
title: 模块机制（CommonJS规范，核心模块，C\C++扩展模块）
---

## 学习资料

- [深入浅出 Node.js - 模块化机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism)
  http://www.infoq.com/cn/master-nodejs/

## 模块化的好处

大型项目中，势必要讲功能拆分成一个个模块，这样的好处有:

1. 方便多人分工合作
2. 通过定义依赖可避免加载无用脚本
3. 减少代码耦合度
4. 解决命名冲突问题
5. 模块复用，减少重复造轮子

Node 采用 commonjs 规范实现模块化。

## commonjs 规范

CommonJS 规范完善了 js 规范，定义了文件操作，网络，模块等模块。目的是让 js 能不受限于浏览器，具备像 java 一样开发大型应用的能力。

每一个 js 文件就是一个模块，它可以引入和导出。

1. 使用`require()`引入模块
2. 通过`module.exports`对象暴露接口

nodejs 模块分类：

- 核心模块，通过模块名引入
- 第三方模块，通过模块名引入
- 用户编写模块(通过相对路径或绝对路径引入)

文件名如果省略，node 会自动查找：`.js`、`.json`、`.node`文件。

如果一个模块是通过模块名引入，Node 查找它的机制是：

1. 首先查看它是不是核心模块。
2. 然后查看当前`node_modules`目录有没有这个模块名目录，如果找到有这个模块名目录，则看`package.json`里面的入口文件，没有定义则找`index`(.js、.json、node)文件是否可用。
3. 第 2 步没找到，则找其父目录，重复第 2 步。
4. 一直到根目录的`node_modules`，没有则抛出异常。找寻的路径可以通过`module.paths`查看。

注意第二步是先找`index.`文件，然后看`package.json`的 main 入口文件。

## 模块的缓存机制

有时候我们会碰到一个问题，为什么改了模块但是没有生效？

这是因为`module`加载时执行，第二次会从缓存取，不会执行。

```
require('./1.js')
require('./1.js')  不会执行
```

模块首次加载后会缓存在`require.cache`中。通过删除其属性，可以清除缓存。

```javascript
const server = http.createServer((req, res) => {
  // 这里要放在里面，不能放外面，放外面是一次性引入
  const moduleText = require("./text");
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });
  res.end(moduleText.text);
});
```

## 学习资料

- [node.js 动态执行脚本](http://www.cnblogs.com/rubylouvre/archive/2011/11/25/2262521.html)
- [深入浅出 node.js 第二章]

## 简介

- 文件中的`this`是被修改了的，指的是`module.exports`。
- 在 node 环境(REPL: read evaluate print loop)中，this 就是 global。
- global 是全局变量。
  - `process`: 进程，程序都是运行在进程里
  - `Buffer`: 操作文件，文件都是二进制(实际它是 16 进制，可以看作是内存)，可以和字符串转换
  - `clearImmediate`和`setImmediate`: 宏任务
  - `clearTimeout`和`setTimeout`:
  - `clearInterval`和`setInterval`:

## process

```javascript
console.log();
console.info();
process.stdout.write("hello"); // 1.标准输出

console.warn();
console.error();
process.stderr.write("hello"); // 2.错误输出

process.stdin.on("data", function (data) {
  console.log(data.toString()); // 0表示标准输入
});
```

- `pid()`
- `exit()`
- `cwd()` 当前工作目录，可以在后续启动项目时，用户在哪个目录启动的
- `chdir()` 修改工作目录
- `nextTick()`: 微任务

```
// nextTick比then快
process.nextTick(()=>{
    console.log('nextTick')
})
```

- env 环境变量

```
// 可以先设置个环境变量NODE_ENV: win SET NODE_ENV="production"  mac export ..
// 然后判断时开发还是线上环境
if( process.env.NODE_ENV == 'development' ){
    url  = 'http://localhost:8081'
}else{
    url = 'http://xx.com'
}
```

- argv 参数，命令行可以传一些参数，返回一个数组，第一项时命令文件路径，第二项时运行的文件路径，第三个参数开始是传递的参数。

```
// yargs 把执行命令的时候传递的参数解析成对象，比如传递 -p 3000 -t xx
let args = process.argv.slice(2)
args = args.reduce((prev,next,currentIndex,arr)=>{
    if(next.includes('-')){
        prev[next.slice(1)] = arr[currentIndex + 1]
    }
    return prev
}, {})
```

## node 事件环

每次队列清空后，或者达到执行的最大限制切换到下个队列时，执行微任务。

## 模块化

amd/cmd

commonjs 模块化规范：

1. 一个文件就是一个模块
1. require()引用模块
1. module.exports 导出模块

```
function clusor(exports, module){
    module.exports = 'xx'
}
```

require()是同步执行的 fs.readFileSync()

eval 执行环境不干净。

让字符串代码执行的方式 eval(str) 和 new Function(...args, str)

eval 里代码执行会有上层的执行环境，不干净。new Function 会生成一个独立的环境

path 常用的方法

- extname 获取扩展名
- dirname
- join()
- resolve() 有/会编程根目录，会解析成绝路路径

**dirname
**filename

## 模块编译

### js 模块的编译

node 是先读取文件，然后包装成`(function(exports,module...){fn代码})`，然后用`vm.runInThisContext(fn)`执行函数，它是内置模块，环境是干净的。原理代码如下：

```
var Script = process.binding('evals').NodeScript;
var runInThisContext = Script.runInThisContext;

  NativeModule.wrap = function(script) {
    return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
  };

  NativeModule.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ];

  NativeModule.prototype.compile = function() {
    var source = NativeModule.getSource(this.id);
    source = NativeModule.wrap(source);

    var fn = runInThisContext(source, this.filename, true);
    fn(this.exports, NativeModule.require, this, this.filename);

    this.loaded = true;
  };
```

其中的 Script 对象和 require('vm')返回的对象很相似，但是 vm 模块实际是 Script 对象的封装。

- `fs.accessSync()` 判断文件是否能访问到，没有文件就报错。
- `path.resolve()` 把相对路径转成绝对路径

```javascript
try {
  fs.accessSync("1.txt");
} catch (e) {}

path.resolve(__dirname, "1.txt");
path.resolve("a", "/"); // 注意：这个返回盘的根目录

// 拼接路径
path.join(__dirname, "1.txt");

// 取文件扩展名
path.extname("1.min.js"); // 'js'

// 取文件基础名，第二个参数标志哪个不是基础名
path.basename("1.min.js", ".min.js");
```

文件扩展名：`.js`、`.json`、`.node`。

## require()源码分析

下面粗略的利用单步来跟踪一下 require 的源码是怎么写的。

**1.require()的定义**

```javascript
function makeRequireFunction(mod) {
  const Module = mod.constructor;

  function require(path) {
    try {
      exports.requireDepth += 1;
      return mod.require(path);
    } finally {
      exports.requireDepth -= 1;
    }
  }

  function resolve(request, options) {
    return Module._resolveFilename(request, mod, false, options);
  }

  require.resolve = resolve;

  function paths(request) {
    return Module._resolveLookupPaths(request, mod, true);
  }

  resolve.paths = paths;

  require.main = process.mainModule;

  // Enable support to add extra extension types.
  require.extensions = Module._extensions;

  require.cache = Module._cache;

  return require;
}
```

上面的代码主要是定义了`require()`，返回了`mod.require(path)`。

**2.mod.require()**

```javascript
Module.prototype.require = function (path) {
  assert(path, "missing path");
  assert(typeof path === "string", "path must be a string");
  return Module._load(path, this, /* isMain */ false);
};
```

这是 Module 类原型上的一个方法，主要是返回`Modal._load(path, this, false)`。path 是路径，this 是 Module 的实例，false 表示是否是核心模块。

**3.Module.\_load()**

```javascript
Module._load = function (request, parent, isMain) {
  if (parent) {
    debug("Module._load REQUEST %s parent: %s", request, parent.id);
  }

  if (isMain && experimentalModules) {
    (async () => {
      // loader setup
      if (!ESMLoader) {
        ESMLoader = new Loader();
        const userLoader = process.binding("config").userLoader;
        if (userLoader) {
          const hooks = await ESMLoader.import(userLoader);
          ESMLoader = new Loader();
          ESMLoader.hook(hooks);
        }
      }
      Loader.registerImportDynamicallyCallback(ESMLoader);
      await ESMLoader.import(getURLFromFilePath(request).pathname);
    })().catch((e) => {
      console.error(e);
      process.exit(1);
    });
    return;
  }

  // 用来拼接文件的完整路径
  var filename = Module._resolveFilename(request, parent, isMain);

  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    updateChildren(parent, cachedModule, true);
    return cachedModule.exports;
  }

  if (NativeModule.nonInternalExists(filename)) {
    debug("load native module %s", request);
    return NativeModule.require(filename);
  }

  // Don't call updateChildren(), Module constructor already does.
  var module = new Module(filename, parent);

  if (isMain) {
    process.mainModule = module;
    module.id = ".";
  }

  Module._cache[filename] = module;

  tryModuleLoad(module, filename);

  return module.exports;
};
```

上面的代码，首先获取了文件的路径，然后查看缓存`Module.cache`里是否有，如果有，则直接返回`cachedModule.exports`。如果没有则`new Module(filename, parent)`创建模块实例，添加到缓存中并且返回实例的 exports 属性。

**4.Module.\_resolveFilename()**

这个方法里面使用了`Module._findPath()`，用于匹配文件，比如`require('./2')`,它会依次去添加'.js'、'.json'、'.node'后缀尝试寻找文件，找到则返回。

**5.tryModuleLoad 和 Module.prototype.load**

```javascript
function tryModuleLoad(module, filename) {
  var threw = true;
  try {
    module.load(filename);
    threw = false;
  } finally {
    if (threw) {
      delete Module._cache[filename];
    }
  }
}

Module.prototype.load = function (filename) {
  debug("load %j for module %j", filename, this.id);

  assert(!this.loaded);
  this.filename = filename;
  this.paths = Module._nodeModulePaths(path.dirname(filename));

  var extension = path.extname(filename) || ".js";
  if (!Module._extensions[extension]) extension = ".js";
  Module._extensions[extension](this, filename);
  this.loaded = true;

  if (ESMLoader) {
    const url = getURLFromFilePath(filename);
    const urlString = `${url}`;
    const exports = this.exports;
    if (ESMLoader.moduleMap.has(urlString) !== true) {
      ESMLoader.moduleMap.set(
        urlString,
        new ModuleJob(ESMLoader, url, async () => {
          const ctx = createDynamicModule(["default"], url);
          ctx.reflect.exports.default.set(exports);
          return ctx;
        })
      );
    } else {
      const job = ESMLoader.moduleMap.get(urlString);
      if (job.reflect) job.reflect.exports.default.set(exports);
    }
  }
};
```

这里主要是加载模块，因为通过上面的拼接已经得到了文件的路径，这里根据文件的后缀名(.js,.json 等)执行不同的方法，比如`.js`，去执行`Module._extensions[js](this,filename)`方法。

```javascript
Module._extensions[".js"] = function (module, filename) {
  var content = fs.readFileSync(filename, "utf8");
  module._compile(internalModule.stripBOM(content), filename);
};
```

首先读取 js 文件内容，然后调用`_compile()`方法。

```javascript
Module.prototype._compile = function (content, filename) {
  content = internalModule.stripShebang(content);

  // create wrapper function
  var wrapper = Module.wrap(content);

  var compiledWrapper = vm.runInThisContext(wrapper, {
    filename: filename,
    lineOffset: 0,
    displayErrors: true,
  });

  var inspectorWrapper = null;
  if (process._breakFirstLine && process._eval == null) {
    if (!resolvedArgv) {
      // we enter the repl if we're not given a filename argument.
      if (process.argv[1]) {
        resolvedArgv = Module._resolveFilename(process.argv[1], null, false);
      } else {
        resolvedArgv = "repl";
      }
    }

    // Set breakpoint on module start
    if (filename === resolvedArgv) {
      delete process._breakFirstLine;
      inspectorWrapper = process.binding("inspector").callAndPauseOnStart;
      if (!inspectorWrapper) {
        const Debug = vm.runInDebugContext("Debug");
        Debug.setBreakPoint(compiledWrapper, 0, 0);
      }
    }
  }
  var dirname = path.dirname(filename);
  var require = internalModule.makeRequireFunction(this);
  var depth = internalModule.requireDepth;
  if (depth === 0) stat.cache = new Map();
  var result;
  if (inspectorWrapper) {
    result = inspectorWrapper(
      compiledWrapper,
      this.exports,
      this.exports,
      require,
      this,
      filename,
      dirname
    );
  } else {
    result = compiledWrapper.call(
      this.exports,
      this.exports,
      require,
      this,
      filename,
      dirname
    );
  }
  if (depth === 0) stat.cache = null;
  return result;
};
```

`_compile()`首先是将 js 内容包裹一层`(function(exports,require,module,__dirname,__filename){ js代码 })()`。然后通过`vm.runInThisContext`处理一下(类似 eval，但是环境是干净的)并返回，最后执行并返回`compiledWrapper.call(this.exports, this.exports, require, this,filename, dirname)`。

## 手动实现 require()原理

好吧，大致了解了 node module 的原理，接下来大致实现一下，代码比较差，肯定没有官方那么好。

```javascript
function require(path) {
  return Module._load(path);
}

function Module(id) {
  this.id = id;
  this.exports = exports;
}
Module._extensions = {
  ".js"() {},
  ".json"() {},
  ".node"() {},
};
Module._load = function () {
  var filename = Module._resolveFilename(request);
  var module = new Module(filename);
  tryModuleLoad(module, filename);
  return module.exports;
};
Module._resolveFilename = function (request) {
  // 尝试找文件
  if (!path.extname(request)) {
    // 尝试加后缀
    let exts = Object.keys(Module._extensions);
    for (let i = 0; i < exts.length; i++) {
      let filename = __dirname + exts[i];
      try {
        if (fs.accessSync(filename)) {
          return filename;
        }
      } catch (e) {}
    }
    throw new Error("没有找到文件");
  }
  return path.resolve(__dirname, request);
};
```

## 模块化发展演进历史

当业务代码越来越多，如果将它们全部放在一个文件，会变得很难维护。同时如果依赖的库越来越多，它们之间的引入顺序也会难以管理。 这时我们往往会对代码进行拆分，通常将一个功能放在一个文件里，这一个文件就是一个模块。

模块化主要就是来解决命名冲突、全局污染和依赖关系的。模块化定义统一的模块写法，自动帮我们分析管理依赖。

前缀命名空间、对象命名空间，属性和函数都会暴露，而且可能出现 a.b.c.d 很长的调用。IIFE 立即执行函数表达式。`immediate invoked function express`。保护私有变量，只暴露有用的接口。

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

这是因为 js 解析器遇到 function 时，认为是在定义函数，必须要有函数名，且末尾不能是()。

但是上面的代码依然存在全局变量污染的问题。

```
var module1 = ..
var module2 = ..
var module3 = ..
```

为了解决这个问题，社区出了一些模块化的方案，主流的有 3 种：

1. commonjs
2. AMD
3. CMD

commonjs 是为了让 js 能够编写大型程序而提出的，node 的模块化是按照它来实现的，主要应用于后端。它的模块化方案如下：

- 一个文件就是一个模块
- require() 引入模块
- module.exports 导出模块

```
// 引入
var module1 = require('module2.js')

// 导出
module.exports = {}
```

commonjs 是同步加载的，因为后端的 js 是在本机上，所以不会造成影响，但是浏览器端是通过网络请求 js 的，如果同步，则会造成阻塞。

AMD 和 CMD 规范主要应用在浏览器端，AMD 规范的方法如下：

```
// 定义模块A， 依赖于B
define(A,['B'] (require, exports, module)=>{
    exports.fn = fn
})

// 使用模块
require(['A'], (A)=>{})
```

AMD 规范是依赖前置，先声明需要引入的模块，然后再使用，`require.js`是按照 AMD 规范来实现的。

CMD 规范是依赖就近引入。如下：

```
// module2
define(function (require,exports,module) {
      // exports : 对外的接口
      // require : 依赖的模块
      require('./a.js');//如果地址是一个模块的话，那么require的返回值就是模块中的exports
});
```

`sea.js`是按照这种方式来实现的。

不过现在在浏览器端，require.js 和 sea.js 都可以不用了，因为新的 es6 从语言上已经有了模块化规范。

## commonjs 的简单实现

## 参考资料

- [Javascript 模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [Javascript 模块化编程（二）：AMD 规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [Javascript 模块化编程（三）：require.js 的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [RequireJS 入门（一）](http://www.cnblogs.com/snandy/archive/2012/05/22/2513652.html)
- [RequireJS 入门（二）](http://www.cnblogs.com/snandy/archive/2012/05/23/2513712.html)
- [RequireJS 入门（三）](http://www.cnblogs.com/snandy/archive/2012/06/08/2538001.html)
- [requrie 源码学习](http://www.cnblogs.com/yexiaochai/p/3632580.html)
- [RequireJS 学习笔记](http://www.cnblogs.com/yexiaochai/p/3214926.html)
- [RequireJS 入门指南](http://www.oschina.net/translate/getting-started-with-the-requirejs-library)
- [为何用 Web 模块的方式？](http://cyj.me/why-seajs/requirejs/)
- [为何用 AMD 规范？](http://cyj.me/why-seajs/requirejs/#why-amd)

# 模块化开发

模块化开发分为 js 模块化和 css 模块化。本文将详细介绍下面几个概念。

1. js 模块化的发展: 命名空间、CommonJS、AMD、CMD、UMD、ES6 Module
2. css 模块化：OOCSS、ACSS、BEM、SMACSS

## js 模块化的发展

## css 模块化

css 模块化实际上是 css 的组织方式，因为写 css 很容易，但是写好 css 很难。要写好 css 实际上就需要组织好 css。

### OOCSS

OOCSS 是以面向对象的方式来写 css，以提高代码重用性、可维护性和可扩展性。面向对象的 CSS 有两个原则。

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

可以看出，OOCSS 风格的 css 可以描述为两点：

- 增加 class
- 不使用继承选择符

OOCSS 追求元件的复用，其 class 命名比较抽象，一般不体现具体内容。

### SMACSS

https://smacss.com/
是由 Jonathan Snook 提出的 css 理论。其主要原则有 3 条：

- 为 css 分类，SMACSS 认为 css 有 5 个类别，分别是：
  - base rules：基础样式，比如 css reset，它的定义不会用到 class 和 id
  - layout rules：布局样式，可以作为 module rules 的容器，比如左右分栏，栅格系统。
  - module rules：模块样式，比如产品列表，导航条
  - state rules：任一元素特定状态下的外观，比如 success 和 error 提示框。
  - theme rules：主题外观，不强制使用单独的 class，可以在 module 里直接定义。
- 命名规则
  - layout rules 用 l- 或 layout-这样的前缀，比如.l-header，.l-sidebar。
  - module rules 用模块本身的名字，比如.media，.media-image
  - state rules 用 is-前缀，比如.is-active，.is-hidden
  - theme rules 如果用作单独的 class，用 theme-前缀，如.theme-a-background
- 最小化适配深度，不依赖 html 结构

  ```
  /* depth 1 */
  .sidebar ul h3 { }

  /* depth 2 */
  .sub-title { }
  ```

  SMACSS 着力于实现两个主要目标：

- 更语义化的 html 和 css
- 降低对特定 html 结构的依赖

### SUIT CSS

http://suitcss.github.io/

### Atomic

http://github.com/nemophrost/atomic-css

### BEM

http://getbem.com/introduction/
BEM，即 Block，Element，Modifier。

- Block 是页面中独立存在的区块，可以在不同场合下被重用。每个页面都可以看做是多个 Block 组成。
- Element 是构成 Block 的元素，只有在对应 Block 内部才具有意义，是依赖于 Block 的存在。
- Modifier 是描述 Block 或 Element 的属性或状态。同一 Block 或 Element 可以有多个 Modifier。

**Block**

Block 用 class 属性表示，它用来描述目的，而不是状态。

```
// 正确
<div class="error"></div>

// 错误
<div class="red-text"></div>
```

- block 不影响布局，所以不涉及外部距离和位置。
- 只是用 class,不使用 id 和 tag 选择器

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
- [深入解读 CSS 的 OOCSS 和 SMACSS 以及 BEM](http://www.jb51.net/css/362236.html)
- [决战 BEM, 10 个常见问题及其解决方案](https://zhuanlan.zhihu.com/p/26407119?group_id=837593211068362752)
- [如何看待 CSS 中 BEM 的命名方式](https://www.zhihu.com/question/21935157)
