# 工具链

## 分类

工具链按照开发过程分类:

- 初始化
  - yeoman
  - create-react-app
  - vue-cli
- 开发/调试
  - dev-tool/chrome
  - webpack-dev-server
  - mock
  - wireshark
  - charles
- 测试
  - mocha
  - jest
- 发布
  - lint
  - jenkins

有些工具可能包含了多个环节。

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
