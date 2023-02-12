# webpack-dev-middleware 源码解读

## 简介

webpack 可以通过 watch 模式 (https://www.webpackjs.com/configuration/watch/) 方式启动，自动打包，但是每次打包后的结果将会存储到本地硬盘中，IO 操作是比较慢的。

webpack-dev-middleware 可以将编译后资源存储到内存中，加快速度。

```js
const wdm = require("webpack-dev-middleware");
const express = require("express");
const webpack = require("webpack");
const webpackConf = require("./webapck.conf.js");
const compiler = webpack(webpackConf);
const app = express();
app.use(wdm(compiler));
app.listen(8080);
```

## 功能

- 以 watch 模式 启动 webpack，监听的资源一旦发生变更，便会自动编译，生产最新的 bundle
- 在编译期间，停止提供旧版的 bundle 并且将请求延迟到最新的编译结果完成之后
- webpack 编译后的资源会存储在内存中，当用户请求资源时，直接于内存中查找对应资源，减少去硬盘中查找的 IO 操作耗时

```js
...
setupHooks(context);
...
// start watching
context.watching = compiler.watch(options.watchOptions, (err) => {
  if (err) {
    context.log.error(err.stack || err);
    if (err.details) {
      context.log.error(err.details);
    }
  }
});
...
setupOutputFileSystem(compiler, context);
```

## setupHooks

```js
context.compiler.hooks.invalid.tap("WebpackDevMiddleware", invalid);
context.compiler.hooks.run.tap("WebpackDevMiddleware", invalid);
context.compiler.hooks.done.tap("WebpackDevMiddleware", done);
context.compiler.hooks.watchRun.tap(
  "WebpackDevMiddleware",
  (comp, callback) => {
    invalid(callback);
  }
);
```

## watch 模式启动

此部分的作用是，调用 compiler 的 watch 方法，之后 webpack 便会监听文件变更，一旦检测到文件变更，就会重新执行编译。

## setupOutputFileSystem

其作用是使用 memory-fs 对象替换掉 compiler 的文件系统对象，让 webpack 编译后的文件输出到内存中。

```js
fileSystem = new MemoryFileSystem();
// eslint-disable-next-line no-param-reassign
compiler.outputFileSystem = fileSystem;
```

memory-fs 是用一个对象的形式来存储文件。

```js
{
    data: {
        User: {
            banli17: {
                project: {
                    index.html: Buffer,
                    app.js: Buffer
                }
            }
        }
    }
}
```

## middleware.js

如果是 get 请求，会到 MemoryFs 中查找对应的文件内容，并返回。

## 资料

- [webpack-dev-middleware 源码解读 政采云前端](https://mp.weixin.qq.com/s?__biz=Mzg3NTcwMTUzNA==&mid=2247486248&idx=1&sn=cbac0da5bdcf8f433af4334d98aab2b3&source=41#wechat_redirect)
- https://github.com/webpack/webpack-dev-middleware