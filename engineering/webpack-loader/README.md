# webpack loader

## What

loader 导出一个函数，该函数在 loader 转换资源时调用。

## Why

## How

### 1. 本地开发设置 loader

本地开发设置 loader 有三种方法：

1、path.resolve 指定一个本地文件

```js
{
  loader: path.resolve('path/to/loader.js'),
  options: {
    /* ... */
  },
}
```

2、设置 resolveLoader.modules

```js
const path = require("path");

module.exports = {
  //...
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
};
```

### 2. loader 的参数和返回值

loader 有三个形参，分别是：

- content: 源代码内容
- sourcemap
- meta 是什么??

同步 loader 可以通过 return 或 this.callback() 返回值。return 只能返回一个值， this.callback(err, ...arr) 可以返回多个值。

如何处理错误??

异步 loader 通过 this.async() 获取 callback 函数，然后使用 callback() 返回值。

### 3. 测试 loader

## loader 分类

### 同步 loader

1、通过 return 返回一个 Buffer 或 String。
2、调用 this.callback(err, content, map, meta) 返回多个值，紧接着需要调用 return 返回 undefined。

前面执行的 loader 可以不需要返回值，但是最后一个 loader 必须有返回值，可以返回两个值，一个是 js 代码，第二个是可选的 sourcemap 对象。

loader 是反方向执行的。

### 异步 loader

通过调用 this.async() 获取 callback 函数。

loader 是通过 [loader-runner](https://github.com/webpack/loader-runner) 调用的。

### Raw loader

默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 raw 为 true，loader 可以接收原始的 Buffer。

```js
module.exports = function (content) {
  assert(content instanceof Buffer);
  return someSyncOperation(content);
  // 返回值也可以是一个 `Buffer`
  // 即使不是 "raw"，loader 也没问题
};
module.exports.raw = true;
```

### Pitching Loader

## loader context 上下文

## 编写 loader 准则

- 简单: 一个 loader 只做一个任务
- 保持链式传递：利用 loader 可以链式调用的优势。写五个简单的 loader 实现五项任务，而不是一个 loader 实现五项任务。
- 模块化的输出
- 确保无状态
- 使用 loader utilities
  - [loader-utils](https://github.com/webpack/loader-utils)
  - [schema-utils](https://github.com/webpack-contrib/schema-utils)
- 记录 loader 的依赖: 如果一个 loader 使用外部资源（例如，从文件系统读取），必须声明它。这些信息用于使缓存 loaders 无效，以及在观察模式(watch mode)下重编译。
- 解析模块依赖关系
- 提取通用代码
- 避免绝对路径
- 使用 peer dependencies

## 资料

- https://webpack.docschina.org/contribute/writing-a-loader
- https://webpack.docschina.org/api/loaders/
