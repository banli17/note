# webpack 使用

## webpack 介绍

安装 webpack(核心包)、webpack-cli(命令行工具包)

**基本概念**

- entry: 根据入口构建依赖图，默认是`src/index.js`
- output
    - path: 需要是绝对路径
    - filename
    - publicPath: index.html 里面引用打包资源的前缀
- loader:让 webpack 能处理其它类型的文件，默认只能识别 js、json 文件，本质是接受源代码，转为 js 模块代码。
    - loader 怎么配置
        - module 的 rules 属性，`{test: /\.txt/, use: 'raw-loader'}`
        - use 可以是 require、字符串、或插件的路径
- plugin: 插件目的在于解决 loader 无法实现的其他事
    - html-webpack-plugin 用于拷贝模版到打包目录，并自动插入 js 脚本链接
    
### mode

- development: 构建结果用于本地调试，代码不压缩，打印 debug 信息，包含 sourcemap，更加快速的增量编译构建
    - 设 process.env.NODE_ENV = development
    - 启用 NamedChunksPlugin 和 NamedModulesPlugin
- production(默认): 线上版本，会进行优化，如代码压缩，不打印 debug 信息，静态文件不包含 sourcemap
     - 设 process.env.NODE_ENV = production
     - 启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
- none : 不使用任何默认优化选项     

设置环境的方法有:

- `--mode=production`:默认，用来设置模块内的 NODE_ENV
    - 模块内可以得到，webpack配置内不行
    - 只有这个会影响 mode 参数
- `--env=production`: 通过 node 传递，用来设置webpack配置文件的参数
    - 配置中通过函数可以获取，模块内不行
- `cross-env`: 只是设置 node 环境的 NODE_ENV，对打包 mode 不起作用，mode 默认还是 production
- `DefinePlugin`: 设置模块内的全局变量
    - 可以在模块内直接获取，或者通过 process.env. 来获取
    
```js
plugins:[
    // eval
    // 如果是字符串，会计算执行后返回结果  "true" -> true
    // 如果是对象，会转成对象
   new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify('development'),
      'NODE_ENV':JSON.stringify('production'),
      'ENV': JSON.stringify(process.env.NODE_ENV) 
   })
]   
// index.js
console.log(NODE_ENV);//  production
```    

### 开发环境配置

- webpack-dev-server：为了提高性能，会放在内存里
    - publicPath: 确定 bundle 的来源，并具有优先级高于 contentBase，如果没有则用 output.publicPath
    - contentBase: 告诉服务器其它静态资源的目录，需要静态文件时才需要。默认当前目录。静态文件查找顺序是：contentBase -> output.path，如果设置了 contentBase，它不会找 ouput.path，不设置才有效
    - compress: 是否压缩
    - writeToDist：会写一份放在硬盘里，默认是只放在内存(memory-fs)
    
所以最好直接默认不写默认为打包的目录即可。

```
{
    "start": "webpack serve"  // 之前是 webpack-dev-server
}
```

### 常用的 loader 

**css 类 loader**

- css-loader 用来处理 @import 和 url()
- style-loader 可以把 css 插入到 DOM 中
- less-loader + less
- sass-loader + node-sass
- postcss-loader

loader 的处理顺序是从右往左的，最后一个 loader 要返回一个 js 模块。

```js
{
    test: /\.css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {importLoaders: 1}           
        },   
        'postcss-loader'
    ]
}
```

**图片类loader**


- file-loader: 将文件拷贝到 output 目录，返回图片的路径
- url-loader: 当图片小于limit的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader进行拷贝
- html-loader: 处理 html 文件里的资源的相对路径，它会把 html 变成一个模块，webpack看到里面有相对路径的文件如 `./x.png`，会调用 url-loader 来解析

```js
module: {
    rules: [
      { test: /\.(jpg|png|bmp|gif|svg)$/, 
        use: [{
          loader: 'url-loader', 
          options: {
            esModule: false,  // 默认es6引入，会挂在 default 属性上
            name: '[hash:10].[ext]',
            limit: 8*1024,
          }
        }]
     },
     {
       test: /\.html$/,
       loader: 'html-loader'
     }]
}
```

**引入图片的方式**

- 放在静态目录里，在 html 里引入，需要设置 contentBase
- 可以用 require 和 import 引入图片，
- css `url('./x.png')`引入，css-loader 会调用 url-loader 转换。

## 写 loader

loader.raw = true: 会得到一个二进制 Buffer，否则得到 utf8字符串

## JS 兼容

babel 将 es6+，jsx 转 es5。

- babel-loader: 使用 babel 和 webpack 转义 js
    - 使用 @babel/core，将 es6 变成 es6 ast
    - 使用 @babel/preset-env，将 es6 ast 转成 es5 ast
    - 使用 @babel/core 将 es5 ast 转为es5 代码
- @babel/core Babel编译的核心包，可以将代码转语法树，并根据语法树生成代码
- @babel/preset-env: js 语法对应关系，决定了 es6 转 es5 转成什么样
- @babel/preset-react: react 插件的 babel 预设
- @babel/plugin-proposal-decorators 把类和对象装饰器编译成ES5
- @babel/plugin-proposal-class-properties 转换静态类属性以及使用属性初始值化语法声明的属性

预设是插件的集合。

```
{
    test: /\.jsx?$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                '@babel/preset-react',
            ],
            plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
        },
    },
},
```

polyfill 问题：

- 默认 babel 只会转换es新的语法，不会转换 api
- 


loader配置

-  enforce: 指定 loader 执行顺序
    - pre: 之前
    - normal
    - inline
    - post
- include 白名单
- exclude 黑名单


## devtool

浏览器 debugger 的时候会自动找到 sourcemap。

关键字

- eval：使用 eval 包裹模块代码，性能高(因为可以做字符串缓存，方便判断差异，如果不加eval直接是函数，不好判断差异做缓存)
- source-map: 产生 .map 文件
- cheap: 只包含行信息，也不包含 loader转换之前的 sourcemap
- module: 包含 loader 的 sourcemap，如 jsx -> js，否则无法定位源文件
- inline 将 .map 作为 DataURI 嵌入，不单独生成 .map 文件

```
        可以定位源文件        定位到loader转换后的代码
      这loader的sourcemap1       sourcemap2
es6代码 ->(babel-loader) -> es5代码 -> es5压缩
```

最佳实践：
- 开发环境：要求sourceMap 快(eval)，全(module)，由于代码没压缩，不是很关心列信息(cheap)
    - 速度快 `eval-cheap-source-map`
    - 如果想调试更友好 cheap-module-source-map
    - 折中的选择就是 eval-source-map
- 生产环境：需要隐藏源代码，还要减少体积
    - 调试友好: `sourcemap>cheap-source-map/cheap-module-source-map>hidden-source-map/nosources-sourcemap`
    - 速度快： `cheap-source-map`
    - 折中：`hidden-source-map`: 生成时有 sourcemap，但是js文件里没有sourcemap的映射，所以不要将 sourcemap 上传

SourceMapDevToolPlugin插件可以更细化的控制sourcemap的生成，比如某些文件不生成、在源文件末尾追加#sourceMappingURL信息等。

将 .map 文件放在另外的目录，不上传。

```js
const FileManagerPlugin = require('filemanager-webpack-plugin');

plugins: [
    new webpack.SourceMapDevToolPlugin({
        append: '\n//# sourceMappingURL=http://127.0.0.1:8081/[url]',
        filename: '[file].map',
    }),
    new FileManagerPlugin({
        events: {
            onEnd: {
              copy: [{
                source: './dist/*.map',
                destination: './sourcemap',
              }],
              delete: ['./dist/*.map'],
            },
        },
    }),
]
```

生产环境下，将 sourcemap 放到本地服务器，控制访问权限。 

## 打包第三方类库

1. 直接引入

```
import _ from 'lodash';
```

2. 插件引入，自动加载模块，而不必到处import或require引入

```
new webpack.ProvidePlugin({
    _:'lodash'
})
```

3. expose-loader: 可以把模块挂载到全局上，调试时有用，将 loader 放在其它 loader 之前

```
module: {
    rules: [
      {
          test: require.resolve('lodash'),
          loader: 'expose-loader',
          options: {
              exposes: {
                  globalName: '_',
                  override: true,
              },
          },
      }
    ]
}
```

4. externals: 手动在 html 里添加 cdn 链接，然后配置 externals 告诉 webpack，lodash 对应全局变量 _

```
externals: {
    lodash: '_'
}
```

5. html-webpack-externals-plugin : 外链 cdn

```
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
new HtmlWebpackExternalsPlugin({
    externals: [
        {
            module: 'lodash', // 模块名
            // 可以通过 env 判断用本地地址
            // 如果使用相对路径entry: 'lodash.min.js'，会去 node_modules/lodash 里查找
            entry: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.js",
            global: '_', // 全局变量名
        },
    ],
}),
```

CDN中的库：使用<script>标签和externals选项
文件系统中的库：将库包含在捆绑软件中。（也许修改resolve选项以查找库）
externals：使全局变量作为模块可用
ProvidePlugin：使模块可以作为模块内部的自由变量使用

## 面试题


https://juejin.cn/post/6844904094281236487
https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html


defer 是什么

<script defer="defer" src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.js"></script>


































