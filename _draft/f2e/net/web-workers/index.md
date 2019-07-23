---
        title: 无名
        ---
        
# web workers

Web Workers 会让浏览器新开一个后台线程，用来执行指定的js文件。好处是用它来执行一些费时的操作，主线程就不会阻塞。

## Worker

创建worker对象

```
var w = new Worker('./1.js')
```

`1.js`将在worker线程中运行，并且里面的全局环境并不是当前`window`，而是一个`DedicatedWorkerGlobalScope`对象(标准workers由单个脚本使用，共享workers使用`SharedWorkerGlobalScope`)，可以通过`self`访问到。

在worker线程中：
1. 不能操作dom，或使用window对象中默认的方法和属性。
2. 不能使用localStorage
3. 可以使用WebSockets、IndexDB等。
4. 可以使用`importScrips('xx.js')`加载额外js脚本
5. 同源策略

具体可以查看[Functions and classes available to Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)。

主线程和worker线程之间如何通信呢？

答案是：两端都使用`postMessage()`发送信息，通过`onmessage`接受信息。数据的交互是通过传递深拷贝的副本，而不是直接共享数据。

worker可以通过XMLHttpRequest访问网络。只是它的responseXML和channel属性总是null。

除了专用worker之外，还有一些其他种类的worker:

- Shared Workers：用于多页面共享worker实例
- Service Workers
- 音频 Workers可以在网络worker上下文中直接完成脚本化音频处理

## Shared Workers

比如网站里有2个页面公用一个worker文件，在浏览器中同时打开这2个页面，浏览器将会开辟2个线程。而使用Shared Workers浏览器将会只开一个线程。这样可以节省系统资源。

`Shared Workers`是通过统一的标识符port(端口)，来实现多实例共享的。这是因为同域的端口是一致的，所以可以共享。使用方法如下：

1. 使用SharedWorker创建指定url脚本的共享的web进程实例

```
var w = new ShareWorker('1.js')

w.onerror = function(){}
```

`SharedWorker`继承自`EventTarge`和`AbstractWorker`，所以拥有它们的属性。

2. 在需要使用的地方使用port

SharedWorker.port 返回一个 MessagePort 对象，用来进行通信和对共享进程进行控制。

```
// 如果使用addEventlistener绑定，必须要使用 w.port.start() 启用
w.port.onmessage = function(e){
    console.log(e.data)
}
```

3. js里使用connect

```
// self可以省略
self.onconnect = function(){
    var port = e.ports[0]    // 用于连接分配的端口
    port.onmessage = function(e){   // 如果使用addEventListener，必须在后面使用port.start
        port.postMessage(...)
    }
}
```

## 参考资料

- [Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)
- [SharedWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker)
- [HTML5多线程JavaScript解决方案Web Worker——专用Worker和共享Worker](http://blog.csdn.net/q1056843325/article/details/58642617)
- [网站渐进式增强体验(PWA)改造：Service Worker 应用详解](https://lzw.me/a/pwa-service-worker.html#1%20%E4%BB%80%E4%B9%88%E6%98%AF%20Service%20Worker)
- [深入了解 Service Worker ，看这篇就够了](https://zhuanlan.zhihu.com/p/27264234)
- [设计一个无懈可击的浏览器缓存方案：关于思路，细节，ServiceWorker，以及HTTP/2](https://zhuanlan.zhihu.com/p/28113197)
