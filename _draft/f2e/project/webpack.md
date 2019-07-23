---
title: "webpack学习"
date: 2017-02-11 22:15:32
tags: 
---








## loader

loader的查找

```json
{
    resolveLoader:{
        // loader的查找文件夹
        // module: ['node_modules', path.resolve(__dirname, 'loaders')],
        // 或者配置别名
        alias:{
            'css-loader': path.resolve(__dirname, 'loaders')
        }
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                use: 'css-loader'
            }
        ]
    }
}
```

loader的执行顺序是倒序的，也就是rules里的数组或use数组都是倒序的。

如果配置了enforce: 顺序是pre > normal > inline > post

默认情况下，每个文件都会走所有的loader，可以设置某个文件忽略某loader。

- `!`: 忽略普通loader
- `-!`: 忽略普通和pre类型的loader
- `!!`: 忽略普通、pre和post类型的loader

```
// index.js
require('!./a.js')
```

不应该使用行内loader（如`require('inline-loader!./a.js')`）和!前缀。

loader实际是有2部分组成，pitchLoader和normalLoader。比如下面这段配置：

```json
rules: [
    { test: /\.js$/, use:  'loader1' }, 
    { test: /\.js$/, use: 'loader2' }, 
    { test: /\.js$/, use: 'loader3' }
]
```

实际执行过程是：

1. 执行pitch loader: loader1 -> loader2 -> loader3
2. 执行normal loader: loader1 -> loader2 -> loader3

比如下面一个loader来看看什么是pitch loader。

```
// loader2.js
function loader(source){
    console.log('this is a normal loader')
    return source
}
loader.pitch = function(filePath,loaderPath){
    console.log('this is a pitch loader')
}
module.exports = loader
```

注意：上面的loader2的pitch 如果有返回值，则直接不执行当前nomarl loader2和后续loader了，返回normal loader1。


## banner-loader

loader-utils
validateOptions = schema-utils

this.cacheable && this.cacheable() // 默认   this.cacheable(false) 取消缓存
let options = loaderUtil.getOptions(this)
let cb = this.async()
let schma = {
    type:'object',
    properties: {
        text: {
            type: 'string'
        },
        filename:{
            type: 'string'
        }
    }
}
validateOptions(schma, options, 'banner-loader')
if(options.filename){
    this.addDependency()  // 自动添加文件依赖，即watch时也跟着自动编译
    fs.readFile(, ()=>{
        if(err){
            cb(err, `/**${data}**/${source}`)
        }else{
            cb(null, `/**${options.text}**/${source}`)
        }
    })
}


## less-loader

## style-loader

## css-loader




webpack的插件实际就是一个类，在运行插件时，会调用类的apply方法。

## 示例入门

```javascript
// webpack.config.js
{
    plugins: [
        new OnePlugin()
    ]
}

// OnePlugin.js
class OnePlugin {
    apply(compiler){
        compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
            setTimeout(() => {
                console.log('发射')
                cb()
            }, 2000)
        })
    }
}
```

上面的代码，运行webpack时，会执行OnePlugin里的apply方法。它的参数compiler保存着一些信息。hooks就是前面介绍的`tapable`库。

## 文件列表插件

现在写一个插件，功能时打包时生成包含打包文件大小列表信息的文件。

`compilation.assets`里面保存着所有打包资源文件的信息，是一个js对象。如果要新增文件，只需要给它加属性(文件名)，值是文件的内容即可。

```javascript
// FileListPlugin.js
class FileListPlugin {
    constructor({filename}) {
        this.filename = filename
    }

    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            // console.log(compilation.assets)
            let content = '##文件名 资源大小\r\n'
            Object.entries(compilation.assets).forEach(([filename, statObj]) => {
                content += `- ${filename} ${statObj.size()}\r\n`
            })

            // assets是要打包的文件
            compilation.assets[this.filename] = {
                source() {
                    return content
                },
                size() {
                    return content.length
                }
            }
        })
    }
}

module.exports = FileListPlugin

// webpack配置
{
    plugins:[
        new FileListPlugin({filename:'fileListSize.md'})
    ]
}
```

## 外链转行内插件

有时候使用了`mini-css-extract-plugin`后，`html`文件会以外链嵌入，但是如果是一个简单的页面，希望将这些外链直接嵌入到行内，则可以写一个插件。

我们需要在`html-webpack-plugin`的钩子函数里完成转换，将`<link href>`、`<script src>`转为内嵌。

```javascript
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class InlinePlugin {
    processTag(tag, compilation) {
        let newTag, url
        if (tag.tagName === 'link') {
            newTag = {
                tagName: 'style',
                attributes: {type: 'text/css'}
            }
            url = tag.attributes.href
        }
        if (tag.tagName === 'script') {
            newTag = {
                tagName: 'script',
                attributes: {type: 'application/javascript'}
            }
            url = tag.attributes.src
        }
        if (url) {
            newTag.innerHTML = compilation.assets[url].source()
            delete compilation.assets[url]  // 删除资源
            return newTag
        }
        return tag
    }

    processTags(data, compilation) {
        let headTags = [], bodyTags = []
        data.headTags.forEach(tag => {
            headTags.push(this.processTag(tag, compilation))
        })
        data.bodyTags.forEach(tag => {
            bodyTags.push(this.processTag(tag, compilation))
        })
        return {...data, headTags, bodyTags}
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('InlinePlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'InlinePlugin',
                (data, cb) => {
                    data = this.processTags(data, compilation)
                    cb(null, data)
                }
            )
        })
    }
}

module.exports = InlinePlugin
```


https://astexplorer.net/












## 初始化

```bash
npm init -y
npm i webpack webpack-cli

# 运行webpack
npx webpack

npx webpack --config webpack.config.js
```

运行`npx webpack`命令，默认会去执行`node_modules/.bin`目录里的对应`webpack.js`文件。

## 打包文件模块分析

```javascript
(function (modules) {
    // 缓存对象
    var installedModules = {};

    // require 函数
    function __webpack_require__(moduleId) {

        // 有缓存直接用缓存
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // 新建模块
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // 执行模块
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }


    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {enumerable: true, get: getter});
        }
    };

    // define __esModule on exports
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
        }
        Object.defineProperty(exports, '__esModule', {value: true});
    };

    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', {enumerable: true, value: value});
        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };

    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ?
            function getDefault() {
                return module['default'];
            } :
            function getModuleExports() {
                return module;
            };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };

    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };

    // __webpack_public_path__
    __webpack_require__.p = "";


    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
/************************************************************************/
({
    "./src/a.js": (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return a; });\nconst a = 1\n\n//# sourceURL=webpack:///./src/a.js?");

    }),
    "./src/index.js": (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \"./src/a.js\");\n\n\nconsole.log(_a__WEBPACK_IMPORTED_MODULE_0__[\"a\"])\n\n//# sourceURL=webpack:///./src/index.js?");
    })
});
```

配置script

```
{
    "script": {
        "build": "webpack --config webpack.config.js"  // 这里不需要写npx
    }
}
```

## 服务

```
npm i webpack-dev-server
npx webpack-dev-server

{
    devServer: {
        port: 3000,  // 默认8081
        progress: true,
        contentBase: './build', // 静态服务的目录
        compress: true,
        open: true, // 打开浏览器
    }
}
```

## html-webpack-plugin

服务启动时加载内存的html。

```javascript
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: {
            removeAttributeQuotes: true, // 删除引号
            collapseWhitespace: true   // 删除空白
        },
        hash: true  // ?后面
    }),
]
```

## 打包css

`css-loader`: 解析@import语法
`style-loader`: 将css插入到head中
`less-loader`: 使用less将less文件转成css

单一职责原则。

loader的顺序默认是从右向左执行。

```javascript
// 生成内嵌样式，插入到head style标签里
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'
                    }
                },
                'css-loader']
        }
    ]
}
```

如果要生成`<link>`标签，webpack4 需要使用`mini-css-extract-plugin`插件。

```
{
    plugin: {
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        })
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    }
}
```

自动加浏览器前缀插件：`autoprefixer`，需要用`postcss-loader`。

```javascript
// postcss.config.js
module.exports = {
    plugins: [require('autoprefixer')]
}
```

压缩css文件，需要`optimize-css-assets-webpack-plugin`插件。配置了minimizer默认js压缩就不生效了，需要用`uglifyjs-webpack-plugin`。注意 mode 为`production`，以及没有babel不能用es6语法否则报错。

```javascript
{
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyjsPlugin({
                cache: true,
                parallel: true, // 并发打包，一起压缩多个
                mapSource: true
            }),
            new OptimizeCss()
        ]
    }
}
```

## js的处理

babel-loader 加载器  @babel/core 用来转换源代码  `@babel/preset-env` 怎么转


有些es7方法如 内置api，yield、promise、include 不会转换，通过 @babel/polyfill 转换。

比如对于每个文件里面如果都有class，`@babel/runtime`会为每个文件都生成一个_classCallCheck帮助函数，可以使用`@bable/plugin-transform-runtime`将它们提取成一个。

js的校验：eslint

第三方模块：jquery

```javascript
import $ from 'jquery'
console.log($)        // 行
console.log(window.$) // 不行

// 1.可以使用expose-loader 暴露到全局
import $ from 'expose-loader?$!jquery'

// 2.webpack配置，将jquery变成全局$
{
    test: require.resolve('jquery'),
    use: 'expose-loader?$'
}

// 3.插件，在每个模块注入$，没有window.$
new webpack.ProvidePlugin({
    $: 'jquery'
})

// 4.如果引入cdn,又再文件里import了，可以用externals防止将某些import的包（package）打包到bundle中
{
    externals: {
        'jquery': 'jQuery'
    }
}
```

## 图片

图片引入的方式：

1. js中创建图片，需要使用`url-loader`或`file-loader`，然后require或import进来。一般是`url-loader`生成base64，其它图片用`file-loader`产出。
2. css引入 background，可以直接引入
3. `<img src=''>`，需要使用`html-withimg-loader`

```
{
    use: {
        loader: 'url-loader',
        options: {
            limit: 200 * 1024,
            // outputPath:'img' 如果不是base64放在哪
        }
    }
}
```

## 打包文件分类

加`publicPath`前缀，可以放cdn上。

```javascript
{
    output:{
        publicPath: 'http://www.xx.cn'
    }
}

// 有时候js不放cdn上，可以再url-loader里加`publicPath`，就只有图片的加域名前缀了。

```

将css放css目录，js放js目录，img放img目录。

```
MiniCssExtractPlugin  filename
url-loader  outputPath
```

## 打包多页应用



## sourceMap

`devtool`用来控制是否生成，以及如何生成source map。

- `source-map`: 会生成单独的sourcemap文件，源码js最后一行注释指向这个文件，会标识行和报错的信息。
- 

## 实时打包

webpack 可以监听文件变化，当它们修改后会重新编译。

```
{
    watch: true,
    watchOptions: {
        poll: 1000,               // 多长时间轮训检查
        aggregateTimeout:500,         // 防抖
        ignored: /node_modules/,  // 忽略
    }
}
```

## 一些插件

- cleanWebpackPlugin
- copyWebpackPlugin
- bannerPlugin: 内置，版权声明插件

```javascript
{
    plugins: [
        new CleanWebpackPlugin(['./dist']),  // 可以是目录
        new CopyWebpackPlugin({from, to}),
        new webpack.BannerPlugin({banner:'hello'})
    ]
}
```

## 跨域请求

```javascript
{
    devServer:{
        proxy: {
            '/api': {
                target: 'localhost:3000',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}
```

模拟数据

```javascript
{
    devServer: {
        before(app){
            app.get('/user', (res,res)=>{
                res.json({name:'zs'})
            })
        }
    }
}
```

`webpack-dev-middleware`让前后端启动在一个端口。

```javascript
// 后端代码
let express = require('express')
let webpack = require('webpack)
let middle = require('webpack-dev-middleware)
let config = require('./webpack.config.js')
let compiler = webpack(config)

let app = express()
app.use(middle(compiler))
```

## resolve

```javascript
{
    resolve:{
        module: [path.resolve('node_modules')],  //查找第三方模块范围
        alias: {

        },
        // 先找package.json里的style
        // import 'bootstrap'
        mainFields: ['style', 'main'],   
        mainFiles: [], // 入口文件的名字 index.js
        // 引入后缀
        extensions: ['.js','.css','.json','.vue']
    }
}
```

## 定义环境变量

定义的变量就可以在js文件里使用了。

```javascript
{
    plugin: [
        new webpack.DefinePlugin({
            // 这里会将production转成变量名，所以stringify一下
            DEV: JSON.stringify('production'), 
            FLAG: 'true',
        })
    ]
}
```

## 区分开发环境和生产环境

分别建立`webpack.dev.js`、`webpack.prod.js`来区分，通过`webpack-merge`的 smart 方法将`webpack.base.js`于它们合并。

```
npx webpack -- -- config webpack.dev.js
```


## 优化

```
module:{
    noParse: /jquery/   // 不去分析jquery中的依赖库
}

plugins:[
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
]
```

dllPlugin

happypack 多线程打包


tree-shaking: import在生产环境下，会自动去除掉没用的代码
scope-hosting: 作用域提升，

```
let a = 1;
let b = 2
let c = a + b
console.log(c)

// webpack变成了
console.log(3)
```

抽离公共代码

```
{
    optimization:{
        splitChunks:{
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minSize:0,
                    minChunks:2,  // 用了几次才抽离
                },
                vendor: {
                    priority: 1,    // 权重，因为代码从上向下走，common已经抽离了，这就不走了
                    test: /node_modules/, // 引用第三方库就抽离  
                    chunks: 'initial',
                    minSize:0,
                    minChunks:2,  // 用了几次才抽离
                }
            }
        }
    }
}
```

懒加载
