# 模块化规范

## What

模块就是小而精且利于维护的代码片段

## Why

- 弥补 JS 语言模块化缺陷
- 需求、功能越来越复杂，带来的问题
  - 命名冲突和污染
  - 代码冗余、无效请求多
  - 文件间的依赖关系复杂

需要模块化和组件化


## How

- 利用函数、对象、自执行函数实现

### 常见的模块化规范

- Commonjs 规范: 类似 ecmascript， 是语言层级的规范，包括 IO 流、fs 等等

是同步的，服务器端加载 js 文件本地很快，先加载再执行，对性能之类没有什么影响。

但是浏览器端就不行了。所以出现了 AMD 规范。

- AMD 异步，代表是 require.js
  - require
  - define

- CMD 规范，异步，代表是 seajs
- ES module 规范

### 历程

- 模块化是前端走向工程化中的重要一环
- 早期 js 语言层面没有模块化规范
- Commonjs AMD CMD 都是模块化规范
- ES6 将模块化纳入标准规范
- 目前流行的就是 Commonjs 和 ES module

## CommonJS

- 语言层面的规范
- 主要用于 Nodejs 中，为什么不适合浏览器？

### What

**规定**
- 模块引用
- 模块定义
- 模块标识

**实现**

- 每个文件就是一个模块，具有独立作用域
- 使用 require 导入其他模块
- 将模块 ID 传入 require 实现目标模块定位

module属性
- 每个 js 文件就是一个模块，可以直接使用 module 属性
- id: 返回模块标识符，一般是一个绝对路径
- filename: 文件模块的绝对地址
- loaded: 模块是否加载完成
- parent: 返回一个模块对象，存放调用当前模块的模块
- children: 返回数组，存放当前模块调用的其他模块
- exports: 返回当前模块需要暴露的内容
- paths: 返回数组，存放不同目录下 node_modules 位置


modules.exports 和 exports 的区别？

模块到处的变量是 module.exports。

```
exports = module.exports
```

不能给 exports 重新赋值。

require 属性

- 基本功能是读取并执行一个模块文件
- resolve: 返回模块文件的绝对路径
- extensions: 一句不同后缀名执行解析操作
- main: 返回主模块对象


### 总结

- CommonJS 规范起初是为了弥补 JS 语言模块化缺失，让 js 不止运行于浏览器中。
- CommonJS 是语言层规范
- CommonJS 规定了引用、定义、标识符三部分
- Module 在任何模块中可直接使用，包含模块信息
- require 用于加载目标模块
- exprots 和 module.exports 都能导出模块数据

![](imgs/2022-03-20-16-47-50.png)


## 模块分类

- 核心模块: Node 源码编译时写入到二进制文件中，加载速度快
- 文件模块(自己写的和第三方的): 代码运行时，动态加载的

加载流程

- 路径分析：依据标识符确定模块位置
- 文件定位：确定目标模块中具体的文件及文件类型
- 编译执行：采用对应的方式完成文件的编译执行

路径标识符
- 路径标识符
- 非路径标识符：module.paths

文件定位，以 require('m1') 为例
- 遍历 module.paths
- 查找顺序 .js -> .json -> .node
- 查找 package.json 文件，使用 JSON.parse 解析
- main.js -> main.json -> main.node
- 将 index 作为目标模块中的具体文件名称， index.js -> index.json -> index.node
- 如果没有，则查找上层目录的 node_modules

```
require('m1')
```

编译执行

- 将某个具体类型的文件按照相应的方式进行编译和执行
- 创建新对象，按路径载入，完成编译执行

JS 文件的编译执行，如 fs 模块
- 读入 fs 模块文件内容
- 对内容进行语法包装，生成可执行 js 函数
- 调用函数时，传入 exports，module， require 等参数

JSON 文件
- 将读取到的文件进行 JSON.parse 解析

缓存优化原则
- 提高模块加载速度
- 当模块不存在时，则完整加载
- 模块加载完成后，将路径作为索引进行缓存

加载流程小结
- 路径分析：确定目标模块位置
- 文件定位：确定目标模块中的具体文件
- 编译执行：对模块内容进行编译，返回可用的 exports 对象

## 模块加载源码分析

核心模块的 id 是模块名，如 fs，自己写个 fs 模块放在 node_modules 里，是不能通过 `require('fs')` 加载的，它会加载核心模块。

实现：核心逻辑

- 路径分析
- 缓存优先
- 文件定位
- 编译执行
