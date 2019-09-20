---
title: "知识总结"
---

## webpack 知识总结

## 为什么需要构建工具

- 转换 ES6
- 转换 jsx
- 压缩混淆
- css 前缀补齐/预处理
- 图片压缩

## 前端构建演变之路

ant - YUI Tool  
grunt(打包放在 IO)
fis3 gulp(打包放在内存)
rollup webpack parcel

why webpack?

webpack 社区活跃，插件丰富，配置灵活，官方迭代速度快

## webpack 配置文件

默认 webpack.config.js，可以通过 webpack --config 指定配置文件

配置组成

- entry
- output
- mode 环境
- module: loader 配置
- plugins: 插件配置

0 配置，默认是:

```
{
    entry: './src/index.js',
    output: './dist/main.js'
}
```

## 安装 node nvm

## 核心概念

entry

- 单入口 字符串
- 多入口 对象

output

- 多入口时，

```js
output:{
    filename: '[name].js',
    path: __dirname + '/dist'
}
```

loaders

webpack 开箱即用只支持 js、json 两种文件类型。通过 loaders 将文件转成有效模块，并添加到依赖树。

本身是一个函数，接收源文件作为参数，返回转换的结果。

常见 loader

- babel-loader 将 es6 7 转
- ts-loader 将 ts 转 js
- file-loader 进行图片、字体等打包
- raw-loader 将文件以字符串形式导入
- thread-loader 多进程打包 js 和 css

```js
modules:{
    rules:[
        test: /\.txt$/,
        use:  'raw-loader'
    ]
}
```

plugins  
插件用于 bundle 文件的优化，资源管理和环境变量注入。作用于整个构建过程。

常见 plugins

- CommonsChunkPlugin 将 chunks 相同的模块代码提取成公共 js
- CleanWebpackPlugin 清理构建目录
- ExtractTextWebpackPlugin 将 css 从 bundle 文件里提取成一个独立的 css 文件
- CopyWebpackPlugin 将文件/文件夹拷贝到构建的输出目录
- HtmlWebpackPlugin 创建 html 文件去承载输出的 bundle
- UglifyjsWebpackPlugin 压缩 js
- ZipWebpackPlugin 将打包出的资源生成一个 zip 包

用法

```js
plugins: [];
```

mode
用来指定构建环境是：
production : 会将 DefinePlugin 中 设置 process.env.NODE_ENV=development，开启 NamedChunkPlugin 和 NamedModulesPlugin
development: 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。会开启 FlagDependencyUsagePlugin , FlagIncludedChunksPlugin , ModuleConcatenationPlugin , NoEmitOnErrorsPlugin , OccurrenceOrderPlugin , SideEffectsFlagPlugin and TerserPlugin
none: 不开启任何优化选项

## 解析图片和字体

file-loader: 用于解析图片和字体

woff|woff2|eot|ttf|otf

url-loader 也可以处理图片和字体，可以设置较小资源自动 base64，内部使用的 file-loader

```
{
    loader: 'url-loader',
    options:{
        limit: 10240    // 字节
    }
}
```

## 文件监听

文件监听是在文件变化后，自动重新构建出新的输出文件。

1. 启动 webpack 时加上`--watch`
2. 在 webpack.config.js 中加入 `{watch: true}`

缺点是要手动刷新浏览器

文件监听的原理分析：
轮训判断文件的最后编辑时间是否变化。
某个文件发生了变化，并不会立即告诉监听者，而是先缓存起来，等 aggregateTimeout。如果有其它变化，会一起构建进来。

```js
module.exports = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/, // 默认为空，不监听的文件或文件夹，支持正则匹配
    aggregateTimeout: 300, // 监听到变化后，等待 300ms 再去执行，默认为 300ms
    poll: 1000 // 判断文件是否发生变化，是通过不停询问系统指定文件有没有变化实现的，默认每秒问 1000 词
  }
};
```

## 文件指纹

作用：差异发布、缓存 版本管理

Hash: 和整个项目相关
Chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值。无法和热更新一起使用，需要在生产环境中用。
Contenthash：根据文件内容来定义 hash, 文件内容不变，则 contenthash。 js 里引用了 css，修改了 js，css 的 chunkhash 也变了，css 一般用 Contenthash

用法

- 对 js 设置 output filename 使用 [chunkhash]
- style-loader 会 css 插入页面放入头部，没有 css 文件，一般会设置 MiniCssExtractPlugin 的 filename 使用 [contenthash]，将 css 提取出来，就不要用 style-loader 了。

```
MiniCssExtractPlugin.loader,
new MiniCssExtractPlugin({
    filename: '[name][contenthash].css'
})
```

- file-loader 的 name 使用 hash，这里的 hash 和前面 hash 不一样，它相当于 contenthash。
  - file-loader 的占位符
  - [ext]
  - [name]
  - [path]
  - [folder]
  - [contenthash]
  - [hash]
  - [emoji] 一个随机的指代内容的 emoji

## 清理目录

clean-webpack-plugin 默认删除 output 指定的目录。

Minified React error #200，render 方法里的 dom 元素不存在

## 资源内联

代码层面

- 页面框架的初始化脚本
- 上报相关打点
- css 内联避免页面闪动

请求层面：减少 http 请求数

- 小图片或字体内联 url-loader

raw-loader 内联 html, 因为使用的 html-webpack-plugin，里面模版引擎是 ejs，所以下面能识别 \${require()}

```
<script>${require('raw-loader!babel-loader!./meta.html')}</script>
```

raw-loader 内联 js

```
<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
```

使用 0.5 的版本，最新版本有点问题

## 多页面打包(MPA)

每个页面一个 entry, 一个 html-webpack-plugin
缺点：每次新增或删除页面需要修改配置

动态获取 entry 和设置 html-webpack-plugin 数量
利用 glob.sync

```
// 同步获取， 关于 *   1.* 一级目录  2.*.js  3.**多级目录
entry: glob.sync(path.join(__dirname, './src/*/index.js'))
```

规则：所有文件放在对应目录下
index/index.js
search/index.js

## source map

作用：通过 source map 定位到源代码
http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html

开发环境开启，线上环境关闭(会暴露源代码)
排查错误，将 sourcemap 上传到错误监控系统。

source map 关键字
eval: 使用 eval 包裹模块代码
source map: 产生.map 文件
cheap: 不包含列信息
inline: 将.map 作为 DataURI 嵌入，不单独生成.map 文件
module: 包含 loader 的 sourcemap

devtool: 'source-map'

### 公共资源抽离

基础库分离
将 react, react-dom 基础包通过 cdn 引入，不打入 bundle 中

方法：使用 html-webpack-externals-plugin

```
new HtmlWebpackExternalsPlugin({
    externals:[{
        module: 'react',
        entry: '//x.cdn.com/react.js',
        global: 'React'
    },{
        module: 'react-dom',
        entry: '//x.cdn.com/react-dom.js',
        global: 'ReactDOM'
    }]
})
```

上面代码，webpack 将不打包 react 和 reactdom，需要手动在 html 里面引入 cdn。

利用 SplitChunksPlugin 进行公共脚本抽离
webpack4 内置的，用于替代 CommonsChunkPlugin 插件

chunks 参数说明：
async: 默认，异步引入的 js 分离
initial 同步引入的 js 分离
all: 推荐

分离基础包

```
optimization:{
    splitChunks:{
        cacheGroups:{
            commons: {
                test: /(react|react-dom)/,
                name: 'vendors',
                chunks: 'all'
            }
        }
    }
}
```

上面配置，还需要将 vendor 添加到 htmlWebpackPlugin 的 chunk 配置里。

分离页面公共文件

```
splitChunks:{
minSize: 0,  // 分离包体积大小
cacheGroups:{
    commons: {
        name: 'commons',
        chunks: 'all',
        minChunks: 2        // 设置最小引用次数
    }
}
}
```

```
optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10    // webpack 优先分离优先级高的
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true    // 如果当前块包含已从主bundle拆分的模块，则将重用它而不是生成新的块。这可能会影响块的结果文件名

        }
      }
    }
  }
```

## tree shaking

概念：1 个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打包到 bundle 里，tree shaking 就是只把用到的方法打入 bundle，没用到的方法会在 uglify 阶段被擦除掉。

使用：webpack 默认支持，在 .babelrc 里面设置 modules: false 即可。
.production mode 的情况是默认开启

要求：必须是 ES6 语法，CommonJS 不支持。

DCE(Elimination)
代码不会被执行，不可到达
代码执行的结果不会被用到
代码只会影响死变量(只写不读)

利用 ES6 模块的特点

- 只能作为顶层语句出现
- `import` 的模块名只能是字符串常量
- `import binding` 是 immutable 的

代码擦除： 会注释标记代码，在 uglify 阶段删除

## Scope Hoisting

没开启前，构建后的代码存在大量闭包代码。

问题：
大量函数闭包包裹代码，导致体积增大(模块越多越明显)
运行代码时创建函数作用域变多，内存开销变大

结论：
被 webpack 转换后的模块会带上一层包裹
`import` 会转换成\_\_webpack_require

分析
打包出来是一个 IIFE
modules 是一个数组，每一项是一个模块初始化函数
\_\_webpack_require 用来加载模块，返回 module.exports
通过 WEBPACK_REQUIRE_METHOD(0) 启动，即 entry 模块

scope hoisting 原理
原理：将所有模块代码按照引用顺序放在一个函数作用域，适当重命名防止变量名冲突。
对比 scope hoisting 可以减少函数声明代码和内存开销。

使用：
production 默认会开启。必须是 es6 语法

```
new webpack.optimize.ModuleConcatenationPlugin()
```

modules: false 进制对模块转换。将 es6 转成什么 amd/umd/commonjs/cjs

## 代码分割

对于大的 web 应用，将所有代码都放在一个文件中明显是不够有效的，特别是当你的某个代码块在某些特殊时候才能被用到，webpack 有个功能是将代码库分割成 chunks，当代码运行到需要的时候再加载。

- 抽离相同代码到一个共享块
- 脚本懒加载，使得初始化下载的代码更小，如首屏、tab 显示第一个 单独打包

懒加载的方式：
commonjs: require.ensure
es6 动态 `import`（目前还没有原生 4.6.0+ 支持，低版本需要 babel 转换）。和 commonjs 的 require 比较像

需要使用 @babel/plugin-syntax-dynamic-import

```js
import("./text.js").then(Text => {});
```

## ESLint

vivo json 重复 key 解析报错，没有用 x5，用的自带浏览器内核。

行内 ESlint 规范实践
eslint-config-airbnb eslint-config-airbnb-base

alloyteam eslint-config-alloy
ivweb eslint-config-ivweb

制定团队的 eslint 规范

- 不重复造轮子，基于 eslint:recommend 配置并改进
- 能发现代码错误的规则，全部开启
- 帮助保持团队的代码风格统一，而不是限制开发体验

落地

1. 和 ci/cd 系统集成

   - 在 build 前增加检查 ![](./doc/2.png)
   - 本地开发阶段增加 precommit 钩子
     - 安装 husky
     - 增加 npm script，通过 lint-staged 增量检查修改的文件。但可以通过 --morefire 绕过检查
     ```
     scripts: {
         precommit: 'lint-staged'
     },
     "lint-staged":{
         "linter":{
             "*.{js.scss}": ["eslint --fix", "git add"]
         }
     }
     ```

2. 和 webpack 集成， 适合新项目
   使用 eslint-loader，构建时检查 js 规范

.eslintrc.js

```
module.exports = {
    parser: "babel-eslint",
    extends: "airbnb",
    "env": {
        browser: true,
        node: true
    },
    rules: {
        semi: "error"
    }
}
```

需要 react
npm i eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y -D
不需要 react ，只用安装 eslint-config-airbnb-base

npm 钩子函数有哪些？

## 打包库和组件

实现一个大整数加法库的打包。

- 需要打包压缩版（开发阶段）和非压缩版本(线上打包)
- 支持 AMD/CJS/ESM 模块引入

打包输出的库名称：

- 未压缩版 large-number.js
- 压缩版 large-number.min.js

支持 esmodule
支持 cjs
支持 amd require(['large-number'], function(largeNumber){})
script 引入

如何将库暴露出去？

library: 制定库的全局变量
libraryTarget: 支持库引入的方式

entry:{
"large-number": "./src/index.js",
"large-number.min": "./src/index.js"
}
output:{
filename: "[name].js"
library: "largeNumber",
libraryExport: "default",
libraryTarget: "umd"
}

Terser-webpack-plugin

uglifyjs-webpack-plugin 3.0 才支持 es6 压缩

设置入口文件

package.json 的 main 字段为 index.js

```
if(process.env.NODE_ENV == 'production'){
    module.exports = require('./dist/large-number.min.js')
}else{
    module.exports = require('./dist/large-number.js')
}
```

## ssr 打包

前端渲染 串行的

- 开始加载
- html 加载成功，开始加载数据 loading
- 数据加载成功，渲染成功开始，加载图片资源
- 图片加载成功，页面可交互

服务端渲染 ssr 是什么？
渲染 html + css + js + data -> 渲染后的 html
服务端渲染的优势：
所有模版等资源都储存在服务器
内网机器拉取数据更快
一个 HTML 返回所有的数据

SSR 的优势

- 减少白屏时间
- 对于 SEO 友好

SSR 代码实现思路

服务端 - 使用 react-dom/server 的 renderToString 方法将 React 组件渲染成字符串 - 服务端路由返回对应的模版
客户端 - 打包出针对服务器的组件

## 命令行显示日志

展示一大堆日志，并不是开发者需要关注的。

统计信息 devServer 里的配置 stats
errors-only true 只在错误时输出
minimal none 错误和重新编译时输出
none false 不输出
normal true 标准输出
verbose none 全部输出 (默认)

更好的方法
使用 friendly-errors-webpack-plugin
success: 构建成功的日志提示
warning
error

## 构建异常和中断处理

如何判断构建是否成功？
在 CI/CD 的 pipline 或者发布系统需要知道当前构建状态

每次 build 构建完成后输入 echo \$? 获取错误码。 2 表示错误

webpack4 之前的版本构建失败不会抛出错误码(error code)
Node.js 中 process.exit 规范
0 表示成功完成，回调函数中，err 为 null
非 0 表示执行失败，回调函数中，err 不为 null，err.code 就是传给 exit 的数字。

如何主动捕获并处理构建错误？
compiler 在每次构建结束后会触发 done 这个 hook
process.exit 主动处理构建报错

```
plugins: [
    function(){
           // webpack 3  this.hooks.done.tap 改成 this.plugins
        this.hooks.done.tap('done', stats=>{
            if(stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1){
                console.log('build error')
                process.exit(1)
            }
        })
    }
]
```

## 构建包

构建配置并抽离成 npm 包的意义
通用性

- 业务开发者无需关注构建配置
- 统一团队构建脚本(一个人去维护)

可维护性

- 构建配置合理的拆分
- README 文档，ChangeLog 文档等。

质量

- 冒烟测试、单元测试、测试覆盖率
- 持续集成

构建配置管理的可选方案

- 通过多个配置文件管理不同环境的构建，webpack --config 参数进行控制
- 将构建配置设计成一个库，比如 hjs-webpack Neutrino webpack-blocks
- 抽成一个工具进行管理：比如 create-react-app kyt nwb
- 将所有的配置放在一个文件，通过 --env 参数控制分支

配置包设计

- 通过多个配置文件管理不同环境的 webpack 配置
  - 基础配置 webpack.base.js
  - 开发环境 webpack.dev.js
  - 生产环境 webpack.prod.js
  - ssr 环境 webpack.ssr.js

抽离成一个 npm 包统一管理

- 规范: Git commit 日志，readme, eslint 规范 Semver 规范
- 质量：冒烟测试、单元测试、测试覆盖率 和 CI

通过 webpack-merge 组合配置

合并配置： merge(baseConfig, devConfig)

## 使用 eslint 规范构建脚本

使用 eslint-config-airbnb-base
eslint --fix 可以自动处理空格
webpack 配置格式化 eslint ，先配置 eslint ，然后修改 eslint fix 格式化快捷键

## 冒烟测试

冒烟测试是指对提交测试的软件在进行详细深入的测试之前而进行的预测试，这种预测试的主要目的是暴露导致软件需要重新发布的基本功能失效等严重问题。

关注点：

- 构建是否成功
  在示例项目里面运行构建，看看是否有报错
- 构建完成 build 目录是否有内容输出：是否有 js、css 等静态资源，是否有 html 文件。
  编写 mocha 测试用例

## 单元测试与测试覆盖率

单纯的测试框架，需要断言库

- mocha
- ava

断言库

- chai should.js expect better-assert

集成框架

- jasmine
- jest

技术选型：Mocha + Chai
测试代码：describe， it，except
测试命令：mocha add.test.js

## 持续集成

优点：
快速发现错误
防止分支大幅偏离主干

核心措施是，代码集成到主干之前，必须通过自动化测试，只要有一个测试用例失败，就不能集成。

CI
Travis CI Circle CI Jenkins

https://travis-ci.org/

travis.yml 文件内容

```
language: node_js

sudo:false

cache:
    apt: true
    directories:
        - node_modules

node_js: stable

install:
    - npm install -D
    - cd ./test/template-project
    - npm install -D
    - cd ../../../

script:
    - npm test
```

install 安装依赖项目
script 运行测试用例

## 发布到 npm

npm adduser

升级版本
升级补丁版本号 npm version patch bug 会自动 git 打 tag
升级小版本号 npm version minor feat
升级大版本号 npm version major  
chore 日常事物

npm login

## 开源项目版本信息案例

![](./doc/4.png)

alpha 内部测试
beta 外部测试
rc 通测

遵循 semver(语义化版本) 规范的优势
github 提出，为了解决软件开发依赖地狱的问题。

![](./doc/5.png)

优势：

- 避免循环依赖
- 依赖冲突减少

语义化版本 Semantic Versioning 规范格式
主版本号：当你做了不兼容的 API 修改。
次版本号：当你做了向下兼容的功能性新增。
修订号：当你做了向下兼容的问题修正。

先行版本号 aplha beta rc
先行版本号可以作为在发布正式版本之前的版本，格式是：16.4.0-alpha.2 16.4.0-alpha.3131212 次数

![](./doc/6.png)

## 分析 构建速度和构建体积

### 初级分析

- webpack 内置的 stats
- stats: 构建的统计信息

方法 1：package.json 中使用 stats

```
"scripts":{
    "build:stats": "webpack --env production --json > stats.json"
}
```

方法 2：node.js 中使用

webpack(config, (err, stats)) 这里的 stats

上面两种方法，颗粒度太粗，看不出问题所在。

### 速度分析

插件：speed-measure-webpack-plugin

```
smp = new SpeedMeasurePlugin()
webpackConfig = smp.wrap({
    plugins: [
        new Myplugin()
    ]
})
```

- 分析总耗时
- 分析每个 loader plugin 耗时

### 体积分析

webpack-bundle-analyzer

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

plugins:[
    ==new BundleAnalyzerPlugin()
]
```

依赖的第三方模块大小
业务组件代码大小

使用高版本 webpack 和 node.js

使用 webpack4 优化原因

- V8 带来的优化(for of 替换 forEach，Map Set 替代 Object，includes 替代 indexOf)
- 默认使用 md4 hash 算法 更快
- webpack ast 可以直接从 loader 传递 ast，减少解析时间
- 使用字符串方法替换正则表达式

## 构建速度优化

### 多进程多实例构建

资源并行解析

thread-loader
可选方案： parallel-webpack happyPack

HappyPack
原理：每次 webpack 解析一个模块，它会将它及它的依赖分配到 worker 线程中。
开发者慢慢不维护了

thread-loader 分配多个 node 进程，worker 中。

```
{
    loader: 'thread-loader',
    options: {
        workers:3
    }
}
```

### 多进程/多实例：并行压缩

方法 1： webpack-parellel-uglify-plugin 插件

方法 2：uglifyjs-webpack-plugin 开启 parallel 参数，之前推荐
方法 3：terser-webpack-plugin 开启 parallel 参数，webpack 内部使用，默认线程数 cpu\*2-1

### 分包

思路：将 react react-dom 基础包通过 cdn 引入，不打入 bundle 中

方法： 使用 html-webpack-externals-plugin

预编译资源模块
方法： 使用 DLLPlugin 进行分包，DLLReferencePlugin 对 manifest.json 引用。
DllPlugin 通常用于基础包（框架包、业务包）的分离。SplitChunks 虽然也可以做 DllPlugin 的事情，但是更加推荐使用 SplitChunks 去提取页面间的公共 js 文件。因为使用 SplitChunks 每次去提取基础包还是需要耗费构建时间的，如果是 DllPlugin 只需要预编译一次，后面的基础包时间都可以省略掉。
webpack.dll.js

npm run dll

![](./doc/7.png)

entry 里知道要分离的包，
框架基础包 library: [react, react-dom]
业务基础包： bus-library: []

output: library

webpack.config.js

```
new webpack.DllReferencePlugin({
    manifest: require('./build/library/mainfest.json')
}),
new webpack.DllReferencePlugin({
    manifest: require('./build/bus-library/mainfest.json')
})
```

### 缓存

### 缩小构建目标

## 构建体积的优化

### 图片压缩

## tree sharking

## 动态 polyfill

![](./doc/8.png)

es6shim 不灵活

所有用户都需要加载，浪费了。

polyfill service 原理，根据手机下发 polyfill
之前发一个请求，识别不同手机的 user agent，下发不同的 polyfill

```
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
```

开源，自建 polyfill 服务

huayang.qq.com/polyfill_service/v2/polyfill.min.js?unknown=polyfill&feature=Promise,Map,Set

缺点，国内厂商修改浏览器的 ua，可能会返回错误的 polyfill

降级：如果失败，可以加载所有的 polyfill

体积优化策略总结

- scope Hoisting
- tree-sharking
- 公共资源分离
- 图片压缩
- 动态 polyfill

## webpack 源码分析

webpack 的本质
webpack 可以理解为一种基于事件流编程范例，一系列的插件运行。

Compiler extends Tapable
Compilation extends Tapable

![](./doc/10.png)

![](./doc/11.png)

webpackOptionsApply
将所有配置 options 参数转换成 webpack 内部插件。
使用默认插件列表。

Compiler hooks
流程相关

- (before-)run
- (before-/after-)run
- make
- (after-)run
- done

监听相关

- watch-run
- watch-close

Compilation
Compiler 调用 Compilation 生命周期方法

- addEntry -> addModuleChain
- finish(上报模块错误)
- seal（资源输出，优化）

ModuleFactory
NormalModuleFactory
ContextModuleFactory

Module

- NormalModule
  - Build
    - 使用 loader-runner 运行 loaders
    - 通过 Parser 解析 (内部是 acron)
    - ParserPlugins 添加依赖
- ContextModule ./src/a
- ExternalModule module.exports = jQuery
- DelegatedModule manifest
- MultiModule entry:['a', 'b']

文件生成

## 编写一个简单的 webpack

常见的几种模块化方式
es module
cjs
amd require(['large-number'], function(largeNumber){})

AST 抽象语法结构的树状表现形式。每个节点都表示源代码中的一种结构。

https://esprima.org/demo/parse.html

1. 可以实现 es6 转 es5
   - 通过 babylon 生成 ast
   - 通过 babel-core 将 ast 重新生成源码
2. 可以分析模块之间的依赖关系
   - 通过 babel-traverse 的 ImportDeclaration 方法获取依赖属性
3. 生成的 JS 文件可以在浏览器中运行

## loader

loader 就是一个导出为函数的 js 模块
执行顺序，从后往前

函数组合的两种情况

- Unix 的 pipline
- compose(webpack)
  - compose = (f, g) => (...args) => f(g(...args))

loader-runner
运行在不安装 webpack 的情况下运行 loaders

作用：

- 作为 webpack 的依赖，webpack 中使用它执行 loader
- 进行 loader 的开发和调试

参数获取
通过 loader-utils 的 getOptions 方法获取

```
const loaderUtils = require('loader-utils')

module.exports = function(content){
    const {name} = loaderUtils.getOptions()
}
```

异常处理

- loader 内直接 throw
- this.callback(err, content, sourceMap, )

回传多个值
this.callback(err, json, 2,3,4)

异步 loader
通过 this.async 来返回一个异步函数
第一个参数是 Error，第二个参数是处理的结果

```
const callback = this.async()
if(callback){

}
callback()
```

loader 中使用缓存
webpack 中默认开启 loader 缓存
可以使用 this.cacheable(false) 关掉缓存
缓存条件：loader 的结果在相同输入下有确定的输出
有依赖的 loader 无法使用缓存

loader 如何进行文件输出？
this.emitFile 进行文件写入
this.emitFile(url, content)

29 webpack21-30 vue10-15 面试题 gitlab 重学前端 next 复习 node
30 webpack31-40 vue16-20
31 webpack41-50 vue21-25
1 webpack51-60 vue26-30
2 webpack61-70 vue31-35
3 webpack71-80 vue36-40
4 vue41-45
5 vue46-50
6 vue51-55
7
8 投递简历
