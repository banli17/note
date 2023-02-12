# webpack-hot-middleware 源码解读

## 简介

HMR（HotModuleReplacement）

复杂点：
1. 需要客户端和服务端同时配合实现（new webpack.HotModuleReplacementPlugin 和 webpack-hot-middleware 联动使用）。
2. 客户端和服务端双向通信机制复杂。

https://zhuanlan.zhihu.com/p/30669007

https://github.com/careteenL/webpack-hmr