---
title: "做一个自己的npm工具库：bl-util"
date: 2016-08-09 19:59:15
tags:
toc: true
---

## 简介

我们在本地用es6 module的语法写了一个库，如`bl-util`，需要发布到 npm 上给别人使用，这时就需要进行打包了。

## 编写代码

## 编写测试用例

## 使用webpack打包

打包的要求是：(1) 让别人能使用es6 module、commonjs、script等方式进行引用；(2) 代码压缩。

```javascript
// script，要暴露blUtil全局变量
<script src='./node_modules/bl-util/dist/util.js'></script>
console.log(blUtil)

// commonjs
const blUtil = require('bl-util')

// es6 module
import blUitl from 'bl-util'
```

`webpack.config.js`配置如下。

```javascript
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'util.js',
        library: 'blUtil',
        globalObject: 'this',
        libraryExport: 'default',
        libraryTarget: "umd"
    },
}
```

- `library`: 导出的变量名
- `globalObject`: 如果libraryTarget是umd，默认库的变量会挂载在window上，如果要在node和浏览器端通用，需要改成this。
- `libraryExport`: 默认变量会挂载在this.default上，可以直接到处default。
- `libraryTarget`: 使用什么方式导出
    - `var`: 默认值，通过script引入时访问
    - `this`: 通过this对象访问
    - `window`: 通过window访问
    - `umd`：在AMD或CommonJS require后能访问

## 发布到git和npm

