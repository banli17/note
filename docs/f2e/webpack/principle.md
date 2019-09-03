---
title: "webpack (2): 原理"
---

执行 webpack 命令发生了什么？

## webpack 执行流程 

执行 webpack 时的过程如下：

1. 查找 webpack 入口文件。

### 查找入口文件

执行 webpack 的方式有 2 种：

1. 通过配置 npm run dev 或 npm run build等命令并运行。
2. 直接通过 webpack 命令

如果 webpack 安装在全局(不推荐)，npm 会去查找 /usr/bin/local 目录。如果安装在局部，则会去查找 node_modules/.bin/ 目录下的 webpack.sh 或 webpack.cmd(windows下)文件。如果存在，就执行，如果不存在，则抛出错误。

通常 webpack 都是安装在局部，所以实际会查执行`node_modules/webpack/bin/webpack.js`文件。

### 分析入口文件 webpack.js

找到入口文件后，来看看它做了什么事情。

```js
process.exitCode = 0
const runCommand = () => {}
const isInstalled = packageName => {require.resolve(packageName);...}
const CLIs = [
    {name: "webpack-cli", ...}
    {name: "webpack-command", ...}
]
const installedClis = CLIs.filter(cli => cli.installed)
if(installedClis.length === 0){
    // 提示需要安装 CLI 和提供快捷安装的方式
}else if(installedClis.length === 1){
    // 加载 CLI，并执行
}else{
    // 如果CLI都安装了，需要移除一个或直接使用二进制文件
}
```


执行 webpack-cli 命令，实际执行的是`node_modules/webpack-cli/bin/cli.js`文件。来看看它做了什么事情。

**webpack-cli/bin/cli.js**

1. 划分编译命令和非编译命令，NON_COMPILATION_ARGS 表示非打包编译的命令。

```js
const NON_COMPILATION_ARGS = ["init", "migrate", "serve", "generate-loader", "generate-plugin", "info"];
```

也就是说，执行如`webpack init`命令时，会去做其它对应的事情，而不是打包编译。

2. 使用 yargs 生成帮助文档等信息。

```js
require("./config/config-yargs")(yargs);
```

3. 解析配置(命令行和配置文件里的)并挂载到 options。这一步会将配置，如 entry、output、plugins 等配置，挂载到 option 上。

```js
options = require("./utils/convert-argv")(argv);
```

4. 执行 `webpack(options)` 进行编译。如果有 watch 属性，第一次会使用`compiler.watch()`监听文件，如果文件变化，则会使用`compiler.run()`重新编译。

```js
let compiler;
compiler = webpack(options);
if (firstOptions.watch || options.watch) {
    compiler.watch(watchOptions, compilerCallback);
}else {
	compiler.run((err, stats) => {
        // ...
    })
}
```