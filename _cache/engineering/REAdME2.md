## 42 工具链: Dev 工具

Server

- build: webpack babel vue jsx postcss
- watch: fsevent
- mock
- http: ws http-server

Client

- debugger: vscode devtool
  工作原理是：vscode 调试时，执行的命令 node 带 brk(服务端)，可以和客户端通信来控制
- source map ?

## 43 工具链: 设计并实现一个单元测试工具（一）

mocha
ava 会测试所有 `*.js`:

```
// https://github.com/avajs/ava-docs/blob/main/zh_CN/readme.md
{

}
```

coverage istanbul
nodejs 写 es6，因为测试里要引用前端 js

nyc 是 Istanbul 的命令行接口，即

```
nyc mocha  // 如果安装了 jest，则不需要安装 nyc，如果用 mocha ，则要手动安装
```

## 44 工具链: 设计并实现一个单元测试工具（二）

主要是使用 assert 给 htmlparser 添加测试，并修复 bug

学一下 node 的 assert 模块
动手：使用 jest 修复 htmlparser

## 45 工具链：目录结构与初始化工具

使用 yeoman 创建脚手架
支持 webpack webpack-dev-server babel test less

语义化版本

## 46 发布系统: 实现一个线上 Web 服务（一）

express

```
express --no-view -c less ./server/
banlideMacBook-Pro:demo1 banli$ express --help

  Usage: express [options] [dir]

  Options:

        --version        output the version number
    -e, --ejs            add ejs engine support
        --pug            add pug engine support
        --hbs            add handlebars engine support
    -H, --hogan          add hogan.js engine support
    -v, --view <engine>  add view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
        --no-view        use static html instead of view engine
    -c, --css <engine>   add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git            add .gitignore
    -f, --force          force on non-empty directory
    -h, --help           output usage information
```

```
publish-server 负责将代码数据发布到 server 上线
publish-tool 负责将本地代码数据发送到 publish-server 上去
server 线上服务
```

学习 http 模块

- 发送 get post 数据，并接受返回的数据
- 获取相应头、响应状态码等

学习 express api 文档

## 47 发布系统: 实现一个线上 Web 服务（二）

学习 node 流 stream

## 48 发布系统: lint 与 PhantomJS

- eslint
- [plantomjs](https://phantomjs.org/download.html)

```
npx eslint --init
```

## 49 发布系统: OAuth

## 50 发布系统: git hook 与 lint

## 51 发布系统: 使用无头浏览器与 DOM 检查
