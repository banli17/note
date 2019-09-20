---
title: 二、优化构建速度与体积
---

# webpack 优化

## 优化构建速度

构建速度的优化方法主要有下面几点：

1. 升级最新版本工具(node、webpack 等)
1. 多进程构建
1. 多进程压缩
1. 分包
1. 缓存
1. 缩小构建目标

### 升级最新版本工具

工具的升级往往伴随着工具性能的提升，所以升级 node 和 webpack 等。

### 多进程构建

可以使用`thread-loader`，还可以使用`parallel-webpack`，`HappyPack`。HappyPack 的原理是当 webpack 解析模块时，他会将它及它的依赖分配到其它 worker 线程中。

```js
{
    loader: 'thread-loader',
    options: {
        workers: 3
    }
}
```

### 多进程并行压缩

有下面几种方案：

1. 开启`terser-webpack-plugin`的 parallel 参数，默认线程数是 cpu \* 2 - 1。
2. 使用`webpack-parellel-uglify-plugin`插件
3. 开启`uglifyjs-webpack-plugin`的 parallel 参数

### 分包

分包主要有 2 种方案：

1、通过 cdn 引入基础包(如 react、react-dom)，这样就无需将基础包打入 bundle 中。可以使用`html-webpack-externals-plugin`。

2、预编译资源模块，即只最初打包一次基础包，之后直接引入，不再重新打基础包。使用 DLLPlugin 插件进行分包，DLLReferencePlugin 对 manifest.json 引用。

DLLPlugin 通常用于基础包(框架基础包、业务基础包)的分离，SplitChunks 虽然也可以提取，但是它每次提取需要耗时，而 DLLPlugin 只需要编译一次，后面无需再编译。通常是单独写一个`webpack.dll.js`文件，并配置命令`npm run dll`。

**webpack.dll.config.js**

```js
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const dllPath = "./public/vendor";

module.exports = {
  entry: {
    vendor: ["vue", "vue-router", "vuex", "axios"]
  },
  output: {
    path: path.resolve(__dirname, dllPath),
    filename: "[name].dll.js",
    library: "[name]_[hash]" // 打包的库暴露的名称
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      // 生成一个 json 文件，用于 DllReferencePlugin 映射到相关的依赖上去的
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      name: "[name]_[hash]",
      context: process.cwd() // 生成的 manifest.json 里 content 路径的上下文，如../
    })
  ]
};
```

**webpack.prod.config.js**

```js
module.exports = {
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require("./public/vendor/vendor-manifest.json")
      }),
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, "./public/vendor/*.js"),
        publicPath: "./vendor",
        outputPath: "./vendor" // 输出文件目录，这里会和原先的dll重复
    })
}
```

### 缓存

缓存可以大幅提升二次构建速度。

缓存的方案有：

1. 开启 babel 转换的缓存。`babel-loader?cacheDirectory`。
2. 开启代码压缩缓存，使用`terser-webpack-plugin`。
3. 开启模块转换的缓存。使用`cache-loader`或者`hard-source-webpack-plugin`提升模块转换阶段缓存。

```js
const TerserWebpackPlugin = require("terser-webpack-plugin");
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  plugins: [new HardSourceWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        cache: true
      })
    ]
  }
};
```

### 缩小构建目标

缩小构建目标可以减少文件搜索范围。

方案如下：

- `babel-loader`不解析 node_modules 目录的文件。通过配置`exclude: 'node_modules'`。
- 配置 resolve 模块查找
  - 优化 resolve.modules，resolve.mainFields，resolve.extensions。
  - 合理使用 alias
  - 设置 resolve.symlinks: false，如果不使用 npm link。
  - 设置 resolve.cacheWithContext: false，关闭根据上下文解析插件。

```
resolve:{
    alias: {
        react: path.resolve(__dirname, './node_modules/xx.react.js'
    },
modules: [path.resolve(__dirname, 'node_modules')],
extensions: ['.js'],
mainFields: ['main']
}
```

## 优化构建体积

### 图片压缩

### tree sharking

无用的 css 如何删除掉？

PurifyCss: 遍历代码，识别已经用到的 CSS class
uncss: HTML 需要通过 jsdom 加载，所有的样式通过 Postcss 解析，通过 document.querySelector 来识别在 html 文件里面不存在的选择器。
（purifycss-webpack 没有维护了）
使用 purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用。

```js
const glob = require("glob-all");
const PurgecssPlugin = require("purgecss-webpack-plugin");
new PurgecssPlugin({
  paths: glob.sync([
    path.join(__dirname, "./src/index.html"),
    path.join(__dirname, "./src/**/*.vue"),
    path.join(__dirname, "./src/**/*.js")
  ])
});
```

## 参考资料

- [https://webpack.js.org/guides/build-performance/](https://webpack.js.org/guides/build-performance/)
