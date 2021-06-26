# AST 介绍

## 抽象语法树

AST(abstract syntax tree)抽象语法树是用树结构来表示编程语言的语法结构。

## 用途

- 代码检查、代码格式化、代码高亮、自动补全、错误提示等，如 eslint，ide 的错误提示
- 代码混淆压缩，如 terser
- 优化代码变更，改变代码结构
  - 打包工具 如 webpack、rollup
  - commonjs、amd、cmd、umd 等代码规范之间的转换
  - ts、jsx 转成 js

## JS Parser

- JS Parser 是将 js 源码转为抽象语法树的解析器。
- 浏览器会把 js 源码通过解析器转为抽象语法树，再转成字节码或机器码。
- 不同的 js 引擎都有自己的 ast 格式。如 v8 和 [spiderMonkey]()。

### 常用的 js parser

下面这些库可以将 js 源代码转成 ast 树。

- [esprima](https://github.com/jquery/esprima) 属于 jquery
- [traceur](https://github.com/google/traceur-compiler) 属于 google
- [acorn](https://github.com/acornjs/acorn)
- shift

还有 2 个常用的库：

- [estraverse](https://github.com/estools/estraverse) 用来遍历 ast 树，可以修改节点
- [escodegen](https://github.com/estools/escodegen) 把 ast 树转成源代码

### esprima 体验

下面是将代码 `const a = 1;` 转为 `const b = 1;` 的案例。

```js
const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");

const code = `const a = 1;`;

const ast = esprima.parse(code); // 或 parseScript
console.log(ast);
estraverse.traverse(ast, {
  enter(node) {
    console.log("进入" + node.type);
    if (node.type == "VariableDeclarator" && node.id.name === "a") {
      node.id.name = "b";
    }
  },
  leave(node) {
    console.log("离开" + node.type);
  },
});

const newCode = escodegen.generate(ast);
console.log(newCode); // const b = 1;
```

## babel

babel 能将 es6+ 转为 es5，它的工作流程是：

1. Parse(解析): 解析源代码为 ast 树，树上的节点符合[ESTree 规范](https://github.com/estree/estree)。
2. Transform(转换): 对 ast 树进行转换。
3. Generate(生成)：将转换过的 ast 树生成新的代码。

### AST 遍历

- ast 遍历是深度优先遍历
- 访问者模式 visitor 对于某个对象或一组对象，不同的访问者，产生结果和操作不同
- visitor 对象定义了用于 ast 中获取具体节点的方法
- visitor 上挂载以 type 命名的方法，当遍历到对应的 type 时，会执行对应的方法

### babel 插件

- [@babel/core](https://www.npmjs.com/package/@babel/core) babel 的编译器，核心 api 都在里面，如 transform，parse
- [@babel/parser](https://github.com/babel/babel/tree/master/packages/babel-parser) babel 的解析器，以前名字加 babylon
- [babel-types](hhttps://github.com/babel/babel/tree/master/packages/babel-types) 包含生成、验证、替换 ast 节点的 api
  - [babel-types-api](https://babeljs.io/docs/en/babel-types.html)
- [babel-traverse](https://www.npmjs.com/package/babel-traverse) 遍历 ast
- [babel 插件手册](https://github.com/brigand/babel-plugin-handbook/blob/master/translations/zh-Hans/README.md#asts)
- [babeljs.io](https://babeljs.io/en/repl.html) babel 可视化编译器
- [babel 手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/README.md)
- [babel-plugin-transform-es2015-arrow-functions](https://www.npmjs.com/package/babel-plugin-transform-es2015-arrow-functions)

### 转换箭头函数案例

转换前

```js
const sum = (a, b) => {
  console.log(this);
  return a + b;
};
```

转换后

```js
var _this = this;

const sum = function (a, b) {
  console.log(_this);
  return a + b;
};
```

### 转换类案例

## webpack treeshaking 插件
