# 进程管理

## 多进程管理

多进程在多核 cpu 下可以并行执行。
node 接受请求，也可以让多核 cpu 去并行处理请求，提高并发的能力

守护进程，主进程用来创建和管理 web 服务器进程，不处理实际请求，出现异常时，web 服务进程会中断和退出，守护进程发行后，会新建一个 web 服务进程代替它。

## 创建子进程

```
child_process.spawn(command[, args][, options])  // 异步创建子进程
child_process.exec(command[, options][, callback])
child_process.execFile(file[, args][, options][, callback])
child_process.fork(modulePath[, args][, options])
```

后面三个都是基于 spawn 来创建子进程。

spawn 是以管道方式创建的子进程，子进程有输出时，会发送给父进程，父进程可以监听到。

exec 不是以管道流输出数据，是先缓存到内存里，回调方法执行时，父进程才能获取到。

## 进程间通信

fork 创建 Node 子进程是默认采用 IPC 与父进程通信的。IPC 实际传递的是字符串，所以传递对象时会进行序列化，不可序列化的对象是无法传递的。IPC 是全双工通信的，即一端即可接收消息也可以发送消息。Nodejs 已经提供了非常方便的 API 进行消息传递，send 方法用于发送消息，message 事件接收消息。

通过`send()`来发送数据。

**parent.js**

```js
const http = require("http");
const cp = require("child_process");
const path = require("path");
const url = require("url");

const work = cp.fork(path.join(__dirname, "./child.js"));

const server = http.createServer(function(req, res) {
    const { query } = url.parse(req.url, true);
    console.log(query.n);
    if (!query.n) {
        res.end("hello world");
    } else {
        console.log(`work pid: ${work.pid}, `);
        work.send(query.n);
        work.on("message", function cb(data) {
            console.log("parent data:", data);
            res.end(JSON.stringify(data));
            work.removeListener("message", cb); // 移除事件
        });
    }
});

function listen(port) {
    server.listen(port, () => {
        console.log(`server on http://localhost:${port}`);
    });
}

let port = 5678;

server.on("error", e => {
    console.log(e);
    if (e.code === "EADDRINUSE" && port < 5680) {
        listen(port + 1);
    }
});

listen(port);
```

**child.js**

```js
process.on("message", n => {
    const result = fib(n);
    console.log("child", result);
    process.send({
        n,
        result
    });
});

function fib(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
```

## 集群
