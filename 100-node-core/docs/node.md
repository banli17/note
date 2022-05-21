# node.js

## 子进程和线程

进程

-   操作系统挂载运行程序的单元
-   拥有一些独立的资源，如内存等

线程

-   运行运算调度的单元，进行任何运算都是在线程上跑的
-   进程内的线程共享进程内的资源

事件循环

-   主线程运行 v8 和 js
-   多个子线程通过事件循环被调度

即 一个进程内多个线程, 一个主线程，多个其他线程
只能利用一个 CPU

主从模式
读 cluster 源码

进程守护与管理 demo

重启子进程

-   子进程异常退出
-   内存溢出
-   心跳检测

    主进程异常

```
curl http://localhost:3000
```

压力测试

```
ab -c50 -n400 http://localhost:3000
```



# node 基础

## nodejs 架构

- native module
- node c/c++ bindings:胶水层（builtin module)
- v8、libuv、http parser、zlib
- CPU/RAM/DISK OS

v8 负责提供 js 执行环境，和执行胶水层 js -> c++ 的调用。

## why node

最初为了实现高性能服务器。

排除掉网络带宽等硬件设备，影响最大的就是 IO 操作(相对 CPU 很慢)。

多线程优缺点
- 体验好
- 线程无法无限创建
- 没有调用时，很多线程会处于等待状态

单线程优缺点
- 无需考虑锁
- 消耗少
- 减少线程切换

异步 IO
事件驱动

餐馆点餐示例
- 不适合大量客户无需思考就点单

同步和异步
	- task1(t1) -> task2(t2)
	- 同步 t1 + t2
	- 异步 < t1 + t2
阻塞和非阻塞

获取 IO 结果
- 轮询：询问 IO 是否结束。技术 read、select、poll、event ports
- 异步IO：IO 结束后返回结果，事件循环，libuv: 实现了异步 IO，会判断平台，调用具体异步 IO 的方法


事件驱动架构

- 事件多路分解器会调用系统 IO 接口, 获取到结果后将事件放到事件队列中。
- 演示 EventEmitter

单线程

nodejs 应用场景

- IO 密集型高并发任务: 非阻塞异步 IO
- 操作数据库提供 API 服务
- 实时聊天应用

## api-serve

1. 安装 tyepscript
2. 安装 ts-node, 可以直接启动 ts 脚本
3. tsc --init
4. 在 tsconfig.json 中添加 `resolveJsonModule: true`, 支持 json 文件引入
5. 安装 express 编写服务脚本

## 全局对象

- global
- timer 类函数
	- setImmediate
	- clearImmediate
- __filename: 文件绝对路径
- __dirname: 目录，绝对地址
- process
	- 获取进程信息
	- 执行进程操作
- require
- module, exports

```
this: 当前模块, 就是 module.exports = {}

this === global // false, 文件模块内
(function(){
	this === global // true
})()
```
