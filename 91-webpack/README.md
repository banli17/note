# webpack

## webpack 快速上手

### webpack 核心概念

- entry: 入口模块文件路径
- output: 输出 bundle 文件路径
- module: 模块，webpack 构建对象
- bundle: 输出文件，webpack 构建产物
- chunk: 中间文件，webpack 构建的中间产物
- loader: 文件转换器
- plugin: 插件，执行特定任务

## Quick start

```
npm init -y
mkdir src
touch src/index.js
npm i webpack webpack-cli -D
```

### 打包产物 1

最简单模块在 development 下打包产物：

```js
(() => {
  var __webpack_modules__ = {
    "./src/index.js": () => {
      // module key
      eval(
        "console.log('hello');\n\n\n//# sourceURL=webpack://quick-start/./src/index.js?"
      );
    }, // module source
  };
  var __webpack_exports__ = {}; // 导出对象
  __webpack_modules__["./src/index.js"](); // 执行入口文件
})();
```

devtool 修改时，会影响打包产物。

### sourcemap 介绍

```js
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
console.log('hello');

/******/ })()
;
//# sourceMappingURL=bundle.js.map
```

```js
{
  "version": 3, // 固定
  "file": "bundle.js", // 对应的源文件
  "mappings": ";;;;;AAAA", // ; 表示行，从第 6 行开始映射
  "sources": [
    "webpack://quick-start/./src/index.js" // 会映射成一个内部路径
  ],
  "sourcesContent": [
    "console.log('hello');\n" // 源码内容
  ],
  "names": [],
  "sourceRoot": ""
}
```

阮一峰 source map 详解

## loader 

loader 主要解决文件转换问题。

### 打包 css

使用 `import './index.css'` 时，webpack 会把它当作一个模块加载。

- css-loader: 将 css 转成模块
- style-loader: 根据转成的模块，转成 `<style>`标签插入到 dom 中

这就是 css in js 的概念。

css-loader 源码解析
style-loader 源码解析

### loader 执行顺序

loader 的执行顺序，从下到上，从右到左。

### 内联调用 loader

```js
import 'style-loader!css-loader!index.css'
```

### plugin

需要对 webpack 构建生命周期功能定制问题。如 压缩，定制。

webpack 本身就是一个构建过程的状态机，其本身的核心功能也是建立在 loader 和 plugin 之上。


## ZBestPC 项目改造

- 改造前源码分析
- 项目工程化存在的问题
- 改造流程梳理和难点
