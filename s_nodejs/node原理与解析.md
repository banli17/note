---
title: 无名
---

- node 是什么
- node 架构原理
- node 特点

## node 是什么

nodejs 是一个可以运行 javascript 的服务端环境。它并不是一门语言，它是一个运行环境，可以运行 js。就像之前我们在浏览器上运行 js 代码一样。浏览器就是运行环境。但是浏览器因为用户安全问题，提供给我们的权限有限，并不能操作用户电脑的文件。

而 nodejs 的目的是搭建服务器，所以它提供了很多 api，比如 fs，http 等模块，供我们操作服务端电脑和搭建服务。

所以 nodejs 和 javascript 的关系，更像是 apache 和 php 的关系。

## node 架构原理

上面是 node 的架构图，它分为三层：

1. 最顶层是用 js 写的，即 Node.js 标准库，，比如 fs,http 等
2. 中间层是 node binding，它的目的是让 js 调用底层 c++
3. 最底层由 c/c++实现，包括：
   - 谷歌的 v8 引擎：高效运行 js
   - libuv: 它为 Node.js 提供了跨平台，线程池，事件池，异步 I/O 等能力，是 Node.js 如此强大的关键。
   - C-ares 提供了异步处理 DNS 相关的能力。
   - http_parser、OpenSSL、zlib 等：提供包括 http 解析、SSL、数据压缩等其他的能力。

在 Java™ 和 PHP 这类语言中，每个连接都会生成一个新线程，每个新线程可能需要 2 MB 的配套内存。在一个拥有 8 GB RAM 的系统上，理论上最大的并发连接数量是 4,000 个用户。随着您的客户群的增长，如果希望您的 Web 应用程序支持更多用户，那么，您必须添加更多服务器。所以在传统的后台开发中，整个 Web 应用程序架构（包括流量、处理器速度和内存速度）中的瓶颈是：服务器能够处理的并发连接的最大数量。这个不同的架构承载的并发数量是不一致的。

而 Node 的出现就是为了解决这个问题：更改连接到服务器的方式。在 Node 声称它不允许使用锁，它不会直接阻塞 I/O 调用。Node 在每个连接发射一个在 Node 引擎的进程中运行的事件，而不是为每个连接生成一个新的 OS 线程（并为其分配一些配套内存）

## 能做什么

使用 Node.js，你可以轻易的实现：

具有复杂逻辑的网站；
基于社交网络的大规模 Web 应用；
Web Socket 服务器；
TCP/UDP 套接字应用程序；
命令行工具；
交互式终端程序；
带有图形用户界面的本地应用程序；
单元测试工具；
客户端 JavaScript 编译器。

## node 的特点

1. 单线程

js 是单线程的，在浏览器它实际是主线程只有一个，如果有异步任务，则浏览器会重新开新的线程，比如 ajax，setTimeout，在异步完成后，将回调函数放入到任务队列中。在主线程的任务执行完成后，开始执行任务队列的任务。任务队列是相当于 while true，无限循环的。 所以如果主线程上有个耗时很长的任务，则会阻塞进程，让任务队列延迟执行。而且 webworker 的提出也解决了主线程出现大量计算的问题。

nodejs 也是一样，只有一个主线程。但是异步 I/O 会通过底层的 Libuv 进行新建线程执行，执行完成后，通知主线程执行回调函数。所以密集的 I/O 操作不会阻塞进程，而密集的 CPU（大量计算）会阻塞进程。不过 node 也提供了 child_process 来新开子进程以解决问题，也有很多的 node 多线程库可以开多线程来充分利用 CPU。

2. 事件驱动

3) 异步 I/O

node 是基于事件驱动和异步 I/O 的，是单线程的。

Node.js 的单线程并不是真正的单线程，只是开启了单个线程进行业务处理（cpu 的运算），同时开启了其他线程专门处理 I/O。当一个指令到达主线程，主线程发现有 I/O 之后，直接把这个事件传给 I/O 线程，不会等待 I/O 结束后，再去处理下面的业务，而是拿到一个状态后立即往下走，这就是“单线程”、“异步 I/O”。
I/O 操作完之后呢？Node.js 的 I/O 处理完之后会有一个回调事件，这个事件会放在一个事件处理队列里头，在进程启动时 node 会创建一个类似于 While(true)的循环，它的每一次轮询都会去查看是否有事件需要处理，是否有事件关联的回调函数需要处理，如果有就处理，然后加入下一个轮询，如果没有就退出进程，这就是所谓的“事件驱动”。

## 参考资料

- [Node.js 探秘：初识单线程的 Node.js](http://taobaofed.org/blog/2015/10/29/deep-into-node-1/)
- [一个前端工程师眼里的 NodeJS](http://www.infoq.com/cn/articles/nodejs-in-front-end-engineer-view)
- [线程和进程的区别是什么？](https://www.zhihu.com/question/25532384)
- [田永强](http://www.infoq.com/cn/profile/%E7%94%B0%E6%B0%B8%E5%BC%BA)

http://www.cnblogs.com/dolphinX/category/540916.html

- [timer 的优化故事](http://taobaofed.org/blog/2015/10/31/nodejs-timer/)
- [当我们谈论 cluster 时我们在谈论什么(上)](http://taobaofed.org/blog/2015/11/03/nodejs-cluster/)
- [当我们谈论 cluster 时我们在谈论什么（下）](http://taobaofed.org/blog/2015/11/10/nodejs-cluster-2/)

- [如何定位 Node.js 的内存泄漏](http://taobaofed.org/blog/2016/04/16/how-to-find-memory-leak/)
- [前端也应该了解点 docker 知识：docker 架构（上）](http://taobaofed.org/blog/2016/01/21/feders-should-kown-some-docker-2/)
- [前端也应该了解点 docker 知识：docker 的理念与场景](http://taobaofed.org/blog/2016/01/19/feders-should-kown-some-docker-1/)
- [浅谈 Node.js 和 PHP 进程管理](http://taobaofed.org/blog/2015/11/24/nodejs-php-process-manager/)
- [Node.js 常见网络错误信息](http://taobaofed.org/blog/2015/11/05/nodejs-errors/)

- [跟着老司机玩转 Node 命令行](https://aotu.io/notes/2016/08/09/command-line-development/)
- [既然 Node.js 是单线程，又是怎么做到支持异步函数调用的？](https://www.zhihu.com/question/19914053)

http://alinode.aliyun.com/blog?pageno=9
https://75team.com/archives/
