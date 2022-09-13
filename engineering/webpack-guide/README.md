# webpack-guide

cdn 管理 js 文件的缺点：
1、脚本依赖不明显
2、依赖项丢失或顺序错误，会导致程序无法运行
3、如果依赖性未使用，浏览器将下载不必要的代码

src/index.js -> dist/main.js

npx webpack

如果配置文件 webpack.config.js 存在，则会使用它，可通过 --config 进行设置。

## 处理资源

处理 css

- style-loader
- css-loader

处理图片、字体

webpack5 引入了资源模块，内置可以处理资源文件，如图片、字体。

webpack5 之前，通常需要：

- 使用 raw-loader 将文件转成字符串
- 使用 url-loader 将文件转为 data-url
- 使用 file-loader 将文件输出到目录

资源模块添加了 4 种类型，用来替换这些 loader。

- `asset/resource`: 生成单独的文件，并导出 URL。(之前 file-loader)
- `asset/inline` 导出资源的 dataURL，(之前 url-loader)
- `asset/soruce` 导出资源的源代码，(之前 raw-loader)
- `asset` 自动在导出数据 URL 和单独文件中选择，(之前设置 url-loader limit 来实现)

如果还是要使用 loader 转换，可以设置 `type:'javascript/auto'` 避免与 webpack5 内置的资源处理重复。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
};
```

处理 json : node 内置支持的
json 自定义解析器，可以将 json5、yaml、toml 等格式文件当作 json 解析

处理 csv : csv-loader
处理 xml: xml-loader

全局资源
assets 下

## 输出

html-webpack-plugin 默认会用内置的 index.html，并插入打包的包。

清除目录 clean: true

```js
output: {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dist'),
  clean: true,
}
```

webpack-manifest-plugin 可以生成一个 manifest.json 清单文件，列出要输出的资源列表。

## development

mode development

sourcemap: 为了更容易地跟踪错误和警告，JavaScript 提供了源代码映射。

webpack 提供了几种选项，在修改代码后自动编译代码:

- watch 模式: `--watch` 或增加 `watch:true` 配置。 缺点是需要刷新浏览器，才能看到效果的变化
- webpack-dev-server: 会从 output.path 定义的目录去找文件，路径是 `http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]`
- webpack-dev-middleware: 会将 webpack 处理的文件发送到服务器。

## 代码拆分

可以将代码拆分为较小的 bundle，然后按需或并行加载。如果使用得当，可能会对加载时间产生重大影响。

三种拆分方法：

- 入口点：使用入口配置手动拆分代码。
- 防止重复：使用 Entry 依赖项或 SplitChunksPlugin 对块进行重复数据删除和拆分。
- 动态导入：通过模块中的内联函数调用拆分代码。

### 入口点

也就是通过 entry 进行拆分，拆分后，通过 html-webpack-plugin 都会作为 script 插入到 index.html 中。

问题是:

- 不那么灵活，不能用于使用核心应用程序逻辑动态拆分代码。
- 如果入口块之间存在任何重复的模块，它们将包含在两个捆绑包中。比如入口都使用了 lodash.js。

### 防止重复

防止重复有两种方法:

1、dependOn 选项允许在块之间共享模块：

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    another: {
      import: "./src/another-module.js",
      dependOn: "shared",
    },
    shared: "lodash",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    runtimeChunk: "single",
  },
};
```

2、使用内置的 SplitChunksPlugin 插件：

```js
optimization: {
  splitChunks: {
    chunks: 'all',
  },
},
```

## 动态导入

动态导入的代码会被自动拆分。有两种方法动态导入：

- import() : 推荐
- require.ensure

nvm 换淘宝源

export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
