# webpack 优化

## 缩小查找范围

### extension

指定 extension 后，不用在 require/import 时添加文件扩展名，会依次尝试匹配。

```js
resolve: {
  extensions: [".js",".jsx",".json",".css"]
},
```

### alias

配置别名可以加快 webpack 查找模块的速度。

比如引入 bootstrap.css 时。

```js
const bootstrap = path.resolve(__dirname,'node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css');
resolve: {
    alias:{
        "bootstrap":bootstrap
    }
},
```

### modules

- 对于直接声明的模块，如 react，webpack 会类似 nodejs 的查找，搜索 node_modules 目录
  - 找 node_modules 里 库的 package.json 的 main
  - 找 index.js
- 这个目录就是使用 resolve.modules 字段进行配置的默认配置

```js
resolve: {
  modules: ["node_modules"];
}
```

### mainFields 和 mainFiles

默认情况下 package.json 文件则按照文件中 main 字段的文件名来查找文件

```js
resolve: {
  // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
  mainFields: ['browser', 'module', 'main'],
  // target 的值为其他时，mainFields 默认值为：
  mainFields: ["module", "main"],

  // 当目录里没有 package.json 的 main 时，会使用 index
  mainFiles: ['index'],
}
```

webpack library 同构，可以导出一个数组配置。

```js
const path = require("path");
const serverConfig = {
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lib.node.js",
  },
  //…
};

const clientConfig = {
  target: "web", // <=== 默认为 'web'，可省略
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lib.js",
  },
  //…
};

module.exports = [serverConfig, clientConfig];
```

### resolveLoader

resolve.resolveLoader 用于配置解析 loader 时的 resolve 配置,默认的配置：

```js
module.exports = {
  resolveLoader: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"],
  },
};
```

## noParse

- 模块会被转成 ast 和分析依赖
- module.noParse 字段，可以用于配置哪些模块文件的内容不需要进行解析，可以提升速度
- 使用 noParse 的模块不能用 import/export 等导入机制

```js
module.exports = {
  // ...
  module: {
    noParse: /jquery|lodash/, // 正则表达式
    // 或者使用函数
    noParse(content) {
      return /jquery|lodash/.test(content);
    },
  },
};
```

## DefinePlugin

- 可以定义全局变量

```js
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // eval("true")
      EXPRESSION: "1+2", // eval("1+2")
      NAME: "'banli'",
      AGE: 12
    })
  ];
}

// PRODUCTION true
// EXPRESSION 3
// NAME 'banli'
// AGE 12
```

- 如果配置的是字符串，会被解析成变量
- 如果是对象，则 key 的值会同上处理

## IgnorePlugin

IgnorePlugin 用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去

```js
import moment from "moment";
console.log(moment);

// 去掉不需要的语言包
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/locale/,
  contextRegExp: /moment$/,
});
```

- 第一个是匹配引入模块路径的正则表达式
- 第二个是匹配模块的对应上下文，即所在目录名

忽略掉 moment 模块中的 locale 目录。

## 区分环境变量

```js
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = (env, argv) => ({
  optimization: {
    minimizer:
      argv.mode == "production"
        ? [
            // 内置了，production 时 webpack 会自动开启
            new TerserWebpackPlugin({
              parallel: true, //开启多进程并行压缩
              extractComments: true, // 'all'
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
            new OptimizeCssAssetsWebpackPlugin({}),
          ]
        : [],
  },
});
```

## 图片压缩优化

image-webpack-plugin

## 日志优化

[webpack stats](https://webpack.docschina.org/configuration/stats/#root) 可以控制日志的打印，对于 webpack-dev-server 要放在 devServer 配里。

- errors-only 错误时输出
- minimal 发生错误或新的编译时
- none 没有输出
- normal 标准输出
- varbose 默认，全部输出
- [还可以配置对象](https://webpack.docschina.org/configuration/stats/#root)

- [friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin)

## 打包时间分析

- [speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin) 能统计每一步的时间

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  plugins: [new MyPlugin(), new MyOtherPlugin()],
});
```

## 包大小分析

- [webpack-bundle-analyzer] 可视化的 webpack 包大小关系图

```js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false, // 打开分析结果页面
      analyzerMode: server, // server, static, json, disabled
    }),
  ],
};
```

```
webpack --profile --json > a.txt
```

## 打包一个库
