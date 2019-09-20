---
title: 一、基础
---

# webpack 基础

## 理想的构建工具

思考下，一个理想的前端项目构建工具，需要有哪些功能：

- 文件
  - html: 压缩、支持 require 引入(如 header)
  - js: 压缩混淆、合并，支持 es6+、jsx、ts 等语法
  - css: 预处理(如 less)、加浏览器私有前缀、合并
  - 图片、字体：压缩
- 体验
  - 构建速度快
  - 模块化开发
  - 修改文件后，浏览器自动刷新/热更新
  - 跨域时，proxy 请求代理
  - 命令行输出关键日志
- 质量
  - 代码规范 eslint
  - git 提交规范
  - 测试
  - 持续集成
- 部署
  - 非覆盖式发布：文件指纹
- 优化
  - 支持持续优化的方案

## 处理文件

### HTML

webpack 中通常使用插件 HtmlWebpackPlugin 来处理 HTML 文件。它的功能如下：

- 将模版文件转换为最终打包输出的 html 文件
- 可以将打包后的 js 以 script 标签形式插入到文件。
- 支持 html 压缩

基本配置如下：

```js
new HtmlWebpackPlugin({
  template: path.join(__dirname, "src/search.html"), // 模版文件
  filename: "search.html", // 打包输出模版的名称
  chunks: ["search"], // 这个chunk会插入到输出模版中
  inject: true,
  minify: {
    html5: true,
    collapseWhitespace: true, // 移除空格
    preserveLineBreaks: false, // 必须与上面一起使用，多换行变成一行
    minifyCSS: true, // 用于压缩一开始就内联的 css
    minifyJS: true, // 用于压缩一开始就内联的 js
    removeComments: false, // 移除注释
    removeRedundantAttributes: true, // 移除默认匹配的属性 如
    removeScriptTypeAttributes: true, // 移除 script  type 属性
    removeStyleLinkTypeAttributes: true, // 移除默认值属性，如input 默认值为 type="text" ，将被移除
    useShortDoctype: true, // 使用短 doctype
    removeEmptyAttributes: true // 移除空属性 ，如 id="" id="\n"
  }
});
```

另外 HTML 还需要支持`require('head.html')`语法，可以使用`raw-loader`，它可以读取文件并嵌入到页面中。由于 HtmlWebpackPlugin 默认是 ejs 语法，所以可以使用`${require}`。

```js
// raw-loader 0.5.1
<script>${require("raw-loader!babel-loader!./meta.html")}</script>
```

### CSS

CSS 文件一般要做的事情如下：

- 支持`require('x.css')`，使用`css-loader`，它将文件转为 commonjs 对象。
- 支持 css 内嵌入 html 中，使用`style-loader`，它会将 css 通过`<style>`标签形式插入 head 中。或者使用`html-inline-css-webpack-plugin`插件。

```js
{
    loader:'style-loader'
    options:{
        insertAt: 'top', // 样式插入到 <head>
        singleton: true, // 将所有 style 标签合并成一个
    }
}
```

- 支持将 css 抽取成外链 (`mini-css-extract-plugin`)。
- 支持预处理，如 less，可以使用`less-loader`。
- 支持压缩，一般使用`optimize-css-asset-webpack-plugin`插件 +`cssnano`处理器。
- 支持自动添加浏览器私有前缀，如 -webkit- 等，可以使用`postcss-loader` + `autoprefixer`插件，`autoprefixer`是一个 css 后置处理器，是代码生成后再处理的，它根据 can i use 规则进行添加私有前缀。
  - Trident -ms
  - Geko -moz
  - Webkit -webkit
  - Presto -o

```js
const OptimizeCssAssetsPlugin = require('optimize-css-asset-webpack-plugin')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    ...
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano
        })
    ]
}
```

### JS

js 需要做的事情如下：

- 压缩：webpack 内置了 uglifyjs-webpack-plugin，在 mode 为 production 时默认开启
- 内联 JS，`<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>`。
- 解析 es6，需要使用`babel-loader`。添加配置文件`.babelrc`。

```
npm i @babel/core @babel/preset-env babel-loader -D (--dev-save)
```

**.babelrc**

presets 对应一个功能集合，plugins 对应一个功能

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

**解析 react**

需要在 presets 配置里增加`@babel/preset-react`。

```
npm i react react-dom @babel/preset-react -D
```

### 图片

图片需要做的事情如下：

- 支持`require()`引入模块，可以使用`url-loader`或`file-loader`，`url-loader`内部也是使用的`file-loader`，但是它支持设置小图片转 base64 内嵌。
- 图片压缩，一般是使用 imagemin 库或 tinypng API 进行图片压缩。可以配置`image-webpack-loader`，它内部是用的`imagemin`。

`imagemin`的优点是:

- 有很多定制选项
- 可以引入更多第三方优化插件，如 pngquant
- 可以处理多种图片格式

`imagemin`压缩原理是:

- `pngquant`:
- `pngcrush`: 主要目的是通过尝试不同压缩级别和 PNG 过滤方法来降低 PNG IDAT 数据流的大小。
- `optipng`:
- `tingpng`:

```js
{
    test: /\.(png|svg|jpg|gif|blob)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: `${filename}img/[name]${hash}.[ext]`
        }
    },
    {
        loader: 'image-webpack-loader',
        options: {
            mozjpeg: {
                progressive: true,
                quality: 65
            },
            optipng: {
                enabled: false
            },
            pngquant: {
                quality: '65-90',
                speed: 4
            },
            gifsicle: {
                interlaced: false
            },
            webp: {
                quality: 75
            }
        }
    }]
}
```

## 响应式开发

- 支持响应式开发：可以使用`px2rem-loader` + `lib-flexible`。

```
@media max-width(768px){

}
```

缺陷：需要写多套代码

w3c 对 rem 的定义：font-size of the root element。

通过 750 的设计稿去写，然后用构建工具进行转换成 rem

使用 px2rem-loader

```
{
    loader: 'px2rem-loader',
    options: {
        remUnit: 75,       // 设计图的宽度/10 比如你的设计图是1920的宽度 这里你就1920/10=192
        remPrecision: 8    // 换算的rem保留几位小数点
    }
}
```

```
//对于有些地方不用转换的我们可以在样式后面添加/*no*/这样就不会给我们转化了;
.text{
    width:200px;
    height:200px;
    border-radius: 50%;
    border:1px solid red;/*no*/
}
```

页面渲染时计算根元素的 font-size 值

可以使用 lib-flexible，注意代码里限制了 PC 使用，只支持移动端。需要修改 refreshRem 前三行。

```
npm i px2rem-loader lib-flexible -D
```

## 体验

### 热更新

实现热更新有两种方式：

1. `webpack-dev-server` + HotModuleReplacementPlugin 插件。

```
// webpack-dev-server --config webpack.dev.js --open

devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
}

new webpack.HotModuleReplacementPlugin()
```

2. `webpack-dev-middleware`，它会将 webpack 输出的文件传给服务器，适合灵活的定制场景。

```js
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
app.listen(3000, function() {});
```

热更新的原理如下：

![](/img/webpack/hmr.jpg)

webpack-dev-server 会启动两个服务 Bundle Server 和 HMR Server，并通过 webpack compiler 将 JS 文件打包编译输出给这两个服务，Bundler Server 是浏览器访问服务，HMR Server 是热更新服务，浏览器访问时，会被注入 HMR Runtime(使用 websocket 进行通信)，当文件有更新时，HMR Server 会将更新输出给 HMR Runtime，进行更新。

## Mock

目前前端项目都是前后端分离的，可以使用 Mock 模拟假数据，提高开发效率。方法如下

1. 在根目录新建一个 mock 目录，里面存放 mock js 文件。当然，可以使用 [mock.js](https://github.com/nuysoft/Mock/wiki/Name)。

```js
function menu(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [1, 2, 3];
      break;
    default:
      res = null;
  }
  return res;
}
```

2. 配置 devServer。

```js
module.export = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // webpack 会自动启动服务
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require("./mock/${name}");
            const result = mock(req.method);
            delete require.cache[require.resolve("./mock/${name}")];
            return res.send(result);
          }
        }
      }
    }
  }
};
```

3. 在 ajax 中请求 `http://localhost:3000/api/menu`。
