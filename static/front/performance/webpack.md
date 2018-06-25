# webpack

## 命令行工具

- Terminal
- iTerm2
- Zsh

安装node和webpack，如果安装npm install webpack -g时报权限错误，[修复方法](https://docs.npmjs.com/getting-started/fixing-npm-permissions)

## webpack简介

webpack的四个核心概念：
- entry：代码的入口、打包的入口，单个或多个，可以是一个文件或数组或对象。
- output
- loader：webpack只能处理js文件，loader可以将其它文件转成js认识的文件，将它们转成js的模块。
    - 编译相关：babel-loader、ts-loader
    - 样式相关：style-loader/css-loader/postcss-loader、less-loader
    - 文件相关:file-loader、url-loader
- plugin：参与打包整个过程。可以压缩、混淆、分割、tree sharking等
    - 优化相关：CommonsChunkPlugin（提取chunk间相同代码）、UglifyjsWebpackPlugin（混淆压缩，生成sourcemap）
    - 功能相关：ExtractTextWebpackPlugin（提取css成单独文件，之前是style标签）、HtmlWebpackPlugin(生成html)、
    HotModuleReplacementPlugin(模块热更新)、
    CopyWebpackPlugin：帮助拷贝文件，打包时有可能引入第三方资源，它是已经打包好的，只需要移动到相应目录。
    
    


几个概念
- chunk：代码块，动态、懒加载、提取公共代码，都会形成新的chunk。
- bundle：打包过的一捆
- module：模块，比如通过loaders处理后也是一个模块


webpack使用的三种方式：
- 命令 webpack -h,webpack -v, webpack <entry> [<entry>] <output>
- 配置文件
- 第三方脚手架vue-cli，angular-cli，react-starter等

webpack支持的模块方式：
- amd：这个是异步加载，所以会单独chunk
- es module
- commonjs

大版本变化
- webpack v1.0.0  2014.2.20
    - 编译、打包
    - HMR(模块热更新)
    - 代码分割
    - 文件处理(loader、plugin)
- webpack v2.2.0  2017.1.18
    - Tree Shaking：去掉引入但是没有用到的代码，让体积更小
    - ES module，1.0用这种方式必须使用babel
    - 动态引入新增了一个方法Import()，1.0需要使用使用require.ensure
    - 新的文档
- webpack v3.0.0  2017.6.19
    - Scope Hoisting(作用域提升)：打包代码性能提升，老版本是将所有的模块都包裹在一个闭包中，新版本是提到了单一的闭包中
    - Magic Comments(配合动态import使用)：可以指定打包后的chunk文件名。
1.0.0和2.0.0是并行开发的。

版本迁移
v1 -> v2：迁移指南webpack.js.org/guides/migrating 
v2 -> v3：只需要npm update，不会改之前的api，因为影响大，也不好维护。

参与社区投票
webpack.js.org/vote/

webpack-cli的作用
- 交互式生成配置文件
- 方便升级


## 编译es6/7

使用babel来编译，需要安装`babel-preset-env`、`babel-loader`。babel-loader将会自动安装并调用babel-core的方法处理js文件。

```
// webpack.config.js

module:{
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader'
        }
    ]
}

// 新建.babelrc文件
{
    "presets": ["env"]
}
```

`babel-polyfill`直接在入口开头引用。在babelrc里启用`babel-plugin-transform-runtime`

```
{
    "presets": ["env"],
    "plugins": ["transform-runtime"]
}
```

指定兼容浏览器版本。它是根据[browserslist](https://github.com/ai/browserslist)来的。
```
{
    "presets": [
        ["env",
        {
            "targets":
            {
            	"browser": ["> 1%"]
            },
            "include": ["transform-es2015-arrow-functions", "es6.map"],
            "exclude": ["transform-regenerator", "es6.set"]
        }]
    ]
}
```

## 提取公用代码

提取各个页面之间公用的代码，一个页面加载后，另一个页面就可以利用缓存了。

1. 减少代码冗余
2. 提高下载速度

使用`webpack.optimize.CommonsChunkPlugin`插件。

提取公共代码对于单个entry是没有作用的，需要多个entry，或者是懒加载等。实际是提取多个页面的公用代码。

```
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        pageA: './src/pageA.js',
        pageB: './src/pageB.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        })
    ]
}
```

- options.name or options.names：公共代码的名字
- options.filename
- options.minChunks 
    - 数字：提取的公用代码出现的次数
    - infinite：不会提取
    - 函数：
- options.chunks：哪几个模块中提取公用代码
- options.deepChildren
- options.async：创建异步的公共代码块

下面的代码可以将公共库，webpack公共文件和业务代码分开打包：

```
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        pageA: './src/pageA.js',
        pageB: './src/pageB.js',
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        // 如果要将webpack公共文件和公共库打包在一起，将这句删掉
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',  // 要将公共库和webpack分开，取一个非entry名字
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['pageA','pageB'],
            minChunks: 2
        })
    ]
}
```

## 代码分割和懒加载

减少加载代码的体积，让用户更快的看到内容。

**方法1：webpack内置方法**

`require.ensure`
    - []:依赖，并不会执行
    - callback：在这里执行
    - errorCallback
    - chunkName
注意如果依赖Promise，如果浏览器不支持，需要垫片。

```
output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',  // 指定发布的目录
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'  // 指定chunk的文件名
}
    
    
document.querySelector('.btn').onclick = function() {
    require.ensure(['jquery'], function() {
        var $ = require('jquery')
        console.log($.type('hello'))
    }, 'vendor')
}
```

`require.include`

require.include(dependency: String)
引入一个不需要执行的依赖，这可以用于优化输出 chunk 中的依赖模块的位置。
```
require.include('a');
require.ensure(['a', 'b'], function(require) { /* ... */ });
require.ensure(['a', 'c'], function(require) { /* ... */ });
```

如果不使用 require.include('a')，输出的两个匿名 chunk 都有模块 a。



**方法2：es 2015 loader spec**

es2015动态import。
import()返回Promise。

**方法3：webpack3的import()**

```
document.querySelector('.btn').onclick = function() {
    import(/* webpackChunkName:'jquery' */'jquery').then(function($){
    	console.log('jquery', $)
    })
}
```

如果有文件chunkname一样，webpack会把它们打包到一起。

代码分割
- 分离业务代码和第三方依赖
- 分离业务代码和业务公共代码和第三方依赖
- 分离首次加载和访问后加载的代码

分割出异步模块

```
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        async: 'async-common',
        minChunks: 2,
        children: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        minChunks: Infinity
    })
]
```

## 处理css

之前是直接link，现在模块化开发每个模块都有对应的html、css、js，使用时，是在js中引入css。

1. 如何引入css
2. css module
3. 使用less和sass
4. 提取css代码：一方面可以利用缓存，第二个方面多个js引入同一个css，这个css会打包到每个css中，所以需要提取。

- style-loader：可以创建style标签到页面中
    - style-loader/url
    - style-loader/useable
- css-loader：可以在js中直接import css

**style-loader**

```
module: {
	rules: [
		{
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader'
				}
			]
		}
	]
}
```

上面的loader处理是倒序的，先用css-loader，再style-loader。效果是在页面中插入style标签。

`style-loader/url`可以在页面中插入link标签。

```
module: {
	rules: [
		{
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader/url'
				},
				{
					loader: 'file-loader'
				}
			]
		}
	]
}
```

这种方法并不常用，因为它会将每个import的css都link一遍，增加了http请求，如下图。

![](./img/webpack/1.png)

使用`style-loader/useable`可以用js来控制css是否启用。

```
module: {
	rules: [
		{
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader/useable'
				},
				{
					loader: 'css-loader'
				}
			]
		}
	]
}

// 然后在js中
import base from './css/base.css'  // 默认不启用，需要开启base.use()
base.use()
base.unuse()
```

`style-loader`还有下面一些配置：
- insertAt：插入位置，默认是`bottom`，还可以是`top`
- insertInto：插入到dom，默认是'header'，可以自定义选择器
- singleton：是否将样式都插入到同一个style标签中，默认是false
- transform：返回一个函数，在`style-loader`插入style时执行，是在浏览器端执行，可以在函数内进行一些操作(可以用window等)。这个函数对每个css文件都会执行

```
module: {
	rules: [
		{
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader',
					options: {
						insertInto: 'body',
						singleton: true,
						transform: './css.tranform.js'  
					}
				},
				{
					loader: 'css-loader'
				}
			]
		}
	]
}

// css.transform.js
module.exports = function(css){
    if(window.innerWidth >= 768){ return null}
	return css  // 如果什么都不做，直接返回css
}
```

**css-loader**

`css-loader`的参数如下：
- alias: 解析的别名
- importLoader：看css后面是否有其他要处理的loader
- minimize：是否压缩
- modules: 是否启用css-modules，css模块化是指：
    - :local：给定局部的样式
    - :global
    - compose 继承一段样式
    - composes: bigBox from './common.css' 从某个文件引入样式。注意这个要写在第一行，否则打包后顺序是倒序的。
    
```
{
    loader: 'css-loader',
    options: {
        minimize: true,
        modules: true  // 开启模块化
    }
}

// 使用
import base from './css/base.css'
import './css/common.css'


var app = document.querySelector('#app')

app.innerHTML = '<div class="' + base.box + '"></div>'
```

这样会生成如下代码：

![](./img/webpack/2.png)

它的class不是原来的class名字了，可以通过localIdentName: '[path][name]__[local]--[hash:base64:5]'来指定。
这样会生成如：`src-css-base_box_2SaOU`的名称。


## 配置less和sass

如果项目中less、css文件都有，则要多个配置。

```
npm install less less-loader

module: {
	rules: [
		{
			test: /\.less$/,
			use: [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader',
					options: {
						minimize: true,
					}
				},
				{
					loader: 'less-loader'
				}
			]
		}
	]
}
```

上面的配置，`less-loader`会将less文件处理后交给`css-loader`继续处理。

## 提取css

提取css有2种方式：
- extract-loader
- ExtractTextWebpackPlugin 这个是主流的方式

```
module: {
    rules: [{
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
            // fallback是没有提取的css用什么loader处理 
            fallback: {
                loader: 'style-loader'
            },
            // 将源码转成css模块所需的loader
            use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                    }
                },
                {
                    loader: 'less-loader'
                }
            ],
            publicPath: ''  // 重写全局publicPath
        })
    }]
},
plugins: [
    // 因为css都是交给loader去处理，提取出来需要改变loader
    new ExtractTextWebpackPlugin({
        filename: '[name].min.css', // 提出来的css名称
        allChunks: false  // 如果为true，则所有的css都会提取，如果是false，则只提取初始化的(非异步加载的，可以将同步和异步的拆分)。当用了CommonsChunkPlugin时，比如是true。
    })
]
```

`ExtractTextWebpackPlugin.extract`里的参数表示后续的一些处理。

提取出来的css文件不会自动插入到页面中，需要手动引入。

## postcss in webpack

PostCSS是一个用js转换css的工具。 和postcss相关的插件：
- Autoprefixer：给css加前缀
- css-nano：css-loader是用它来进行css压缩的
- css-next：可以使用未来新的css，比如calc，css变量，自定义选择器
- postcss-loader

```
{
	loader: 'postcss-loader',
	options: {
		ident: 'postcss',
		plugins: [
			// require('autoprefixer')(),
			require('postcss-cssnext')()
		]
	}
}

// 浏览器版本
{
    "browserslist": ["> 1%", "last 2 versions"]
}
```

公用一份`browserslist`，建议写在`package.json`，还可以写在`.browserslistrc`。

还有一些
- postcss-import：通过@import 将css inline到css中
- postcss-url：
- postcss-assets：

## Tree shaking

- js tree shaking
- css tree shaking

使用场景
- 常规优化
- 只是用了第三方库某个功能

https://segmentfault.com/a/1190000010934375

处理步骤是：
- tree shaking ，webpack自动会标识无用代码,自动会注释unused harmony exports
- webpack.optimize.UglifyJsPlugin ：用来移除无用代码

```
plugins: [
    new webpack.optimize.UglifyJsPlugin() // 只能移除module.exports这样的无用代码
]
```

有些库书写的方式不能tree shaking，必须按照es6 module书写才行。 lodash，用lodash-es也不行，需要借助bable的`babel-plugin-lodash`。

css tree shaking需要使用[purify css](https://github.com/webpack-contrib/purifycss-webpack)。它是去除静态资源里的无用css,必须配合extract-text-webpack-plugin使用，而且要写在它的后面。

options
- paths:glob.sync([]) 将给的url或html进行tree shaking。glob.sync可以处理多路径。paths表示要遍历的地址，它会把这些文件里用到的css提取出来，没用用的去掉。

```
npm install glob-all

new PurifycssWebpack({
	paths: glob.sync([
		path.join(__dirname, '*.html'),  // 必须是绝对地址
		path.join(__dirname, 'src/*.js')
	])
})
```

在js里插入，或直接在html写都可以去除。

## 文件处理

- 图片处理
- 字体文件
- 第三方js库

**图片处理**
css中引入的图片
自动合成雪碧图
一般图片要进行压缩，有些图片很小，可以转成base64编码

file-loader：引入文件
url-loader: base64，字体文件，比file-loader功能多些
[img-loader](https://www.npmjs.com/package/img-loader)：压缩图片
postcss-sprites：合成雪碧图

```
// file-loader
{
    test: /\.(jpg|png|jpeg|gif)$/,
    use: [{
        loader: 'file-loader',
        options: {
        	useRelativePath: true,  
        	publicPath: '',
        	outputPath: 'dist/'
        }
    }]
}


// url-loader，在图片处理时可以代替file-loader，limit表示图片小于多少字节时转base64
{
    test: /\.(jpg|png|jpeg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            name: '[name]-[hash:5].min.[ext]',  // 用来命名雪碧图的名字
        	limit: 5000,   // 图片小于5kb时，将会转成base64
        	useRelativePath: true,  
        	publicPath: '',
        	outputPath: 'dist/'
        }
    }]
}

// img-loader， 压缩图片，它也是一些图片压缩库插件的集合，可以通过pngquant查看
{
    loader: 'img-loader',
    options: {
        pngquant: {
            quality: 80
        },
        mozjpeg: {
            quality: 80
        }
    }
}

// postcss-sprites
{
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            require('postcss-sprites')({
                spritePath: 'dist/assets/imgs/sprites',
                retina:true   // 用来处理高清图
            })
        ]
    }
}
```

**字体文件**

```
{
    test: /\.(eot|woff2?|ttf|svg)/,
    use: [
        {
            loader: 'url-loader',
            options: {
                name: '[name]-[hash:5].[ext]',
                limit: 5000,
                publicPath: '',
                outputPath: 'dist/',
                useRelativePath: true
            }
        }
    ]
}
```

**第三方js库**

给每个模块注入变量，这个变量很多地方要用。
- `webpack.providePlugin`

```
new webpack.ProvidePlugin({
    $: 'jquery'
})

// 如果jquery是自定义的，而不是第三方的，可以通过alias
new webpack.ProvidePlugin({
    $: 'jquery$'
})
resolve:{
    alias: {
        jquery$: path.resolve(__dirname, 'src/js/jquery.min.js')
    }
}
```

- `imports-loader`，也要设置alias

```
{
    test: path.resolve(__dirname, 'src/app.js'),
    use: [
        {
            loader: 'imports-loader',
            options: {
                $: 'jquery'
            }
        }
    ]
}
```

- 全局变量

## 生成HTML
打包过程中，js/css等都会有hash版本，这个需要自动插到html中。所以需要自动生成html文件。

插件：HtmlWebpackPlugin

options
    template：模板文件，可以是html，ejs等，注意加loader
    filename：文件名
    minify：是否压缩html
    chunks：有哪几个entry需要加入
    inject：布尔值， 是否自动插入生成的css和js
    
```
new HtmlWebpackPlugin({
    filename: 'html/index.html',
    template: './index.html',
    // inject: false
    minify: {  // 借助第三方html-minify实现
        collapseWhitespace: true
    }
})
```

在html中引入图片,需要使用`html-loader`
options
    attrs: [img: src]

```
{
	test: /\.jpg$/,
	use: [
		{
			loader: 'file-loader'
		}
	]
},
{
	test: /\.html$/,
	use: [
		{
			loader: 'html-loader',
			options: {
				attrs: ['img:src', 'img:data-src']
			}
		}
	]
}
```

其它方式引入：

```
<img src="${require("./src/imgs/1.jpg")}" >
```

配合优化：可以把chunk直接嵌入到页面中
- inline-manifest-webpack-plugin，和html-loader配合有bug
- html-webpack-inline-chunk-plugin

```
new HtmlInlineChunkPlugin({
    inlineChunks: ['manifest']  // 要配合提取公共代码使用
})
```

## 搭建开发环境

- webpack watch mode

```
webpack -watch

// 简写
webpack -w
```

- webpack-dev-server
- express + webpack-dev-middleware

**watch mode**

clean-webpack-plugin

这个重新打包还是打包在dist目录中。

**webpack-dev-server**

功能
- live reloading：刷新浏览器
- 它不能打包文件，因为它打包的文件实际是存在内存中，主要是帮助调试和开发。
- 路径重定向：可以将本地的地址换成线上的
- 支持https
- 可以在浏览器中显示编译错误
- 可以做接口代理
- 模块热更新，不刷新浏览器更新代码

配置
devServer
- inline：默认是true，表示使用inline模式，如果使用iframe模式，访问地址变成了`/webpack-dev-server`，里面是个iframe。
- contentBase
- port
- historyApiFallback：单页history pushState这些，地址实际没有这个文件，刷新时会报404，如果设为true，则会用index.html替代404页面(注意，只能是路径/a，不能是资源/a.html)。还可以rewrites，重新定位到某个文件
```
historyApiFallback: {
	rewrites: [
		{
			from : '/pages/a',
			to: '/pages/a.html'
		},
		{
			from : '/pages/(\w+)',
			to: function(context){
			    return '/' + context.match[1] + '.html'
			}
		}
	]
},
```

- https：支持https
- proxy：实际用的[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options)库
    - target
    - changeOrigin：将请求头的origin修改成target url。
    - [headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields)：比如如果要登录，可以设置header
    - logLevel：可以设为debug查看代理的地址
    - pathRewrite：{'^/old/api' : '/new/api'}
- hot：热更新，相当于一个钩子，在这个钩子里替换代码，需要自己写代码，vue-loader这些已经自己写好了。
- openpage：打开初始页面，也可以通过webpack-dev-server --open
- lazy：刚启动的时候不打包，访问页面时才打包，只打包这个访问的页面。
- overlay：这遮罩上显示错误

可以通过`http://localhost:9001/webpack-dev-server`来查看当前启动服务器使用的文件目录。
```

```

热更新：在不刷新浏览器情况下，刷新前端代码
- 保持应用的数据状态
- 节省调试时间
- 样式调试更快

需要将devServer.hot设置为true，要生效还要使用webpack.HotModuleReplacementPlugin，
如果想清晰看到模块的路径，可以使用webpack.NamedModulesPlugin。

module.hot：通过它可以对代码进行热更新操作
module.hot.accept：第一个参数是依赖，第二个参数是回调。在回调中对要更新的内容进行重载。
module.hot.decline：拒绝某些模块热更新

css是通过style-loader来实现的，所以不能再使用extract。
js还是会进行页面刷新，需要吧hotOnly打开，不要进行页面刷新。需要加入

```
if(module.hot){
    module.hot.accept()
}
```

vue-loader已经自动实现好了。

**开启source map调试**

打包后的代码无法调试。source map将生成的代码和之前的代码做映射，方便调试。
方案：
- Devtool
- webpack.SourceMapDevToolPlugin
- webpack.EvalSourceMapDevToolPlugin

DevTool的参数
Development
    eval
    eval-source-map
    cheap-eval-source-map
    cheap-module-eval-source-map
    cheap-module-source-map  // 推荐，考虑到速度和清晰
Production
    source-map  // 推荐
    hidden-source-map
    nosource-source-map
使用场景和打包速度不一样
js的sourcemap要配置uglify的sourcemap。
css 的sourcemap，需要开启devtool之外，还需要开启loader的sourcemap，要给处理css的每个loader都加。顺便把singleton去掉。
css-loader.options.sourcemap
less-loader.options.sourcemap
sass-loader.options.sourcemap

## Eslint检查代码格式

安装eslint、eslint-loader、eslint-plugin-html、eslint-friendly-formatter(错误格式化输出)

配置
- .eslintrc.*或者在package里的eslintConfig
- 配置eslint-loader
    - failOnWarning：
    - failOnError
    - formatter
    - outputReport
    
要在浏览器中直接显示，不在命令行看，可以使用devServer.overlay

## 开发环境和生产环境
开发环境
- 模块热更新
- sourcemap
- proxy
- eslint

生产环境
- 提取公共代码
- 压缩混淆
- 文件压缩或base64编码
- tree sharking去除无用代码

共同点
- 同样的入口
- 同样的代码处理(loader处理)
- 同样的解析配置

通过webpack-merge，可以将配置合并

webpack.dev.conf.js
webpack.prod.conf.js
webpack.common.conf.js







































1.gulp的基本用法以及实现原理
2.常用插件(压缩、合并、编译、预览服务、自动注入)
   3.node.js中自定义流的高级用法
   4.实现自定义插件(auto-prefixer)
   5.webpack基本用法以及运行原理
   6.常见的loader以及plugin(DllPlugin等)
   7.Webpack工作原理分析
   8.编写自定义Loader、编写自定义Plugin
   9.webpack优化(resolve、模块热替换、压缩、代码分割、可视化工具)
   
   
   
   
   ## 项目需求
   
   - vue + webpack + weui 多页面
   - 将重复文件合并，零散文件分开
   - 放服务器任何文件夹，通过对应地址访问
   - 热更新
   - 差异化发布到服务器
   
   前端变的复杂的原因就是node导致了大量工具的出现，但是这些工具都是为了解放生产力，让性能变的更好而出现的。现在不会工程化，就不是一个合格的前端。
   
   webpack是现在最流行的前端构建工具，我把官方文档大概看了一下，知道了一些概念，但是东西太多还是很懵逼的。特别整理一下，并且详细拿 vue-cli的配置来说一下。
   
   之前使用vue-cli做过一个项目，基于那个项目来思考开发环境应该有哪些要求。
   
   ## 要求
   
   先思考想要的开发环境：
   
   1. 可以使用sass，es6
   2. 开发时保存自动刷新浏览器
   3. 可以在js中直接引入sass文件 
   4. 可以使用 vue
   5. 可以使用字体图标
   
   打包编译之后的要求：
   
   1. 公共文件打包在一起，比如公用的js
   2. 每个页面可能有单独的js另外加载
   3. 文件都是压缩了的
   4. 由于线上可能有缓存，所以每次编译文件要带上特定的hash
   5. 通过命令一键发布，只发布和线上不同的文件，并且先发布资源文件，最后发布html文件
   
   
   ## vue-cli的webpack配置文件
   
   
   
   ## 参考
   
   - [使用Vue-cli搭建多页面应用时对项目结构和配置的调整](http://www.jianshu.com/p/0a30aca71b16)
   - https://github.com/YaoZeyuan/vue-multi-page



# 指南

## 问题

1. 没有显示体现出`index.js`文件依赖于`lodash.js`
2. 很有可能没有引入或在后面引入`loadash.js`，导致应用无法正常运行
3. 如果依赖被引入，但是没有使用，浏览器也会下载这些无用代码

- output的path必须是绝对地址

css-loader使你能够使用类似@import和url（...）的方法实现require的功能，style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的js文件中。
因此，我们这样配置后，遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式文件引入（所以如果没有css-loader，就没法解析这类语句），最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
需要注意的是，loader是有顺序的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。因此应该把style-loader放在css-loader的前面（webpack loader的执行顺序是从右到左）。