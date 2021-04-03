---
title: "了解babel的使用和原理"
---

# 了解 babel 的使用和原理

babel 是用来将高版本的 js 编译成低版本 js 的工具。

首先安装`babel-cli`、`babel-preset-env`。

然后新建一个`.babelrc`文件，添加配置。

```
// .babelrc
{
    presets: ['env']
}
```

-   babel-cli: babel 的命令行工具

如果不配置`.babelrc`文件，直接使用`babel 1.js -o 2.js`，将会原样输出。
`-o` 是 `--out-file`的简写，是输出编译结果到单个文件。
如果想每次修改文件后编译文件，加`--watch`或`-w`，`-w`要在`-o`之前写，否则报错文件不存在。

`babel src/*.js -w -o *.js`将会把 js 文件合并到一个 js 输出，这个 js 的名字是第一个 js 的名字。

`--source-maps`或`-s`表示添加 source map 文件。如果要内联，则是`-source-maps inline`，会生成一个.js.map 文件。

`--out-dir`或`-d`可以将整个 src 目录编译输出到 lib 目录。

```
// 正确
babel src -d build   // 编译整个目录到build目录
babel src -d build.js   // 编译整个目录到build.js

// 错误，会生成 build/src...
babel src/*.js -d build
```

忽略文件 `--ignore spec.js,text.js`

复制不需要编译的文件 `--copy-files`

传输文件 `babel -o 1.js < 2.js`

使用插件 `--plugins=transform-runtime,transform-es2015-modules-amd`

使用 presets `--presets=es2015,react`

忽略.babelrc 文件的配置并使用 cli 选项

```
babel --no-babelrc script.js --out-file script-compiled.js --presets=es2015,react
```

## babel-register

babel-register 模块改写 require 命令，为它加上一个钩子。此后，每当使用 require 加载.js、.jsx、.es 和.es6 后缀名的文件，就会先用 Babel 进行转码。

使用时，必须首先加载 babel-register。

```
require("babel-register");
require("./index.js");
```

然后，就不需要手动对 index.js 转码了。

需要注意的是，`babel-register`只会对 require 命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

不过现在`node8`都已经支持`es6`语法了，所以不太需要这货。

```
function loader(m, filename) {
  m._compile(compile(filename), filename);
}

function registerExtension(ext) {
  var old = oldHandlers[ext] || oldHandlers[".js"] || require.extensions[".js"];

  require.extensions[ext] = function (m, filename) {
    if (shouldIgnore(filename)) {
      old(m, filename);
    } else {
      loader(m, filename, old);
    }
  };
}
```

通过定义 require.extensions 方法，可以覆盖 require 方法，这样调用 require 的时候，就可以走 babel 的编译，然后使用 m.\_compile 方法运行代码。

## babel-node

`babel-node`可以直接形成一个支持 es6 语法的 node 环境，在开发环境中执行代码时可以用它来代替 node。

## babel-core

`babel-core`是以编程的方式使用 babel,可以用来将某段代码或某个文件转换成一个对象`{code, map, ast}`。

`ast`表示 [Abstract Syntax Tree](http://www.iteye.com/news/30731)。

```
var babel = require('babel-core');

var obj = babel.transform('()=>{}', {
	sourceMaps: true,
	presets: ['env']
});

console.log(obj);  // {code, map, ast}
```

-   babel.transformFile("filename.js", options)
-   babel.transformFileSync("filename.js", options)
-   babel.transformFromAst(ast: Object, code?: string, options?: Object)

## 配置 Babel

要使用 babel，需要通过`presets`和`plugins`来告诉 babel 做什么。

**.babelrc**

-   babel-preset-es2015
-   babel-preset-react 转义 react 语法
-   babel-preset-stage-x
    -   0 提议
    -   1 草稿
    -   2 定稿
    -   3 浏览器实验。如果可以，下一年就发布

```
{
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
}
```

babel 可以编译所有的新语法，但是 API 不能保证。

`babel-polyfill`用来将新 API，比如做一个`Array.from`垫片。babel 的垫片库是[core-js](https://github.com/zloirock/core-js)。要使用它，只需要在文件顶部加入`import "babel-polyfill"`即可。

-   babel 默认会将新语法比如 class 转成函数\_classCallCheck，但是每个模块文件都会新生成一遍。通过启用`babel-plugin-transform-runtime`可以在转化时 require 调用`babel-runtime`里面的方法，达到复用。

```
// 提取出来是依赖babel-runtime的
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

// 配置
{
    "plugins": [
      "transform-runtime",
      "transform-es2015-classes"
    ]
  }
```

## 手动指定预设

可以手动指定预设

```
npm install --save-dev babel-plugin-transform-es2015-classes

{
   "plugins": [
     "transform-es2015-classes"
   ]
}
```

## 根据环境配置 babel

```
  {
    "presets": ["es2015"],
    "plugins": [],
+   "env": {
+     "development": {
+       "plugins": [...]
+     },
+     "production": {
+       "plugins": [...]
+     }
    }
  }
```

当前环境可以使用 process.env.BABEL_ENV 来获得。 如果 BABEL_ENV 不可用，将会替换成 NODE_ENV，并且如果后者也没有设置，那么缺省值是"development"。.

unix 在 npm script 里

```
BABEL_ENV=production [command]
NODE_ENV=production [command]
```

windows 需要先 SET BABEL_ENV=production 在执行 command

如果要统一，则使用[cross-env](https://www.npmjs.com/package/cross-env)

## babel 的原理

`babel`使用的引擎是`babylon`，它是 fork 的`acorn`项目。

-   acorn 引擎，解析 ast
-   acorn-travesal 遍历 ast 树
-   acorn-

babel 将源码转换成 ast，通过遍历 ast 树，对树做一些修改，然后将 ast 转成编译后的源码。

babel 工作流程如下：

1. babylon 将 code 转 ast，如果有不符合 babel 语法的代码，就报错。

```
var babylon = require('babylon')

let code = `
	let a =1,b=2;
	function sum(a,b){
		return a + b
	}
	sum(a , b)
`

let ast = babylon.parse(code)

console.log(ast)
```

2. babel-traverse 用来遍历 ast 树，然后插件再进行转化。

```
traverse(ast, {
	enter(path){
		let node = path.node
		// console.log(types.isFunctionDeclaration(node))
		if(types.isFunctionDeclaration(node)){
			path.replaceWithSourceString(`function add(a, b){
				return a+b
			}`)
		}
	}
});
```

babel-traverse 遍历树时，有 2 个钩子，enter 和 exit，enter 发生在进入当前节点，未进入子节点前。

babel 的插件就是定义如何转换当前结点，所以从这里可以看出 babel 的插件能做的事情，只能转换 ast 树，而不能在作用在前序阶段（语法分析）

babel 的插件体系分为两部分。

-   babel-preset-xxx
-   babel-plugin-xxx

preset 和 plugin 其实是一个东西，preset 定义了一堆 plugin list。

preset 是倒序的，plugin 是正序的。也就是说

```
preset: ['es2015', 'react']
```

是先执行 react 插件，再用 es2015。

3. babel-generator 将 ast 树转成源码

```
let {code} = generator(ast)
```

## 参考资料

-   [剖析 Babel——Babel 总览](http://www.alloyteam.com/2017/04/analysis-of-babel-babel-overview/)
-   [Node.js 中 require 的工作原理浅析](http://www.jb51.net/article/51476.htm)
-   [babel 官网](http://babeljs.io/docs/plugins/)
-   [babel 的 polyfill 和 runtime 的区别](https://segmentfault.com/q/1010000005596587)
