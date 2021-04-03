---
title: "NodeJS Util"
sidebar_label: Util
---

## Util

util这部分主要涉及的内容如下：

- URL
- Query String
- util模块
- 正则表达式
- node常用模块

### URL

1. 说说url组成部分，要求一个不漏的说出来？

```js
┌─────────────────────────────────────────────────────────────────────────────┐
│                                    href                                     │
├──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┤
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          ││           │          │      │          │ │              │       │
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘
```

2. 关于url转义字符，为什么需要转义。

```js
Array(range).fill(0)
  .map((_, i) => String.fromCharCode(i))
  .map(encodeURI)
```

3. url模块常用的方法。

```js
const url = require('url')
const str = `http://username:password@localhost:3000/pathname?query=1#hash`
console.log(url.parse(str, true))

/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'username:password',
  host: 'localhost:3000',
  port: '3000',
  hostname: 'localhost',
  hash: '#hash',
  search: '?query=1',
  query: [Object: null prototype] { query: '1' },
  pathname: '/pathname',
  path: '/pathname?query=1',
  href: 'http://username:password@localhost:3000/pathname?query=1#hash'
}
*/
```

decodeURI

### Query String 

query string是URL的一部分，就是url?后面`name=zs&age=12`这样一串字符。node里内置了querystring模块用来解析它，还有第三方模块qs可以解析它。

querystring的常用方法：

- `.parse(str[, sep[, eq[, options]]])`: 将query string解析为json对象。
- `.unescape(str)`: 
- `.stringify(obj[, sep[, eq[, options]]])`: 将json对象转成query string。
- `.escape(str)`

自己试一试每个方法。querystring模块对深度结构的对象还不支持。

```js
const querystring = require('querystring')
const qs = require('qs')

let obj = {a : { b : 1 } }
querystring.stringify(obj) // 'a='
qs.stringify(obj)         // a%5Bb%5D=1  即 a[b]=1
```

> HTTP 如何通过 GET 方法 (URL) 传递 let arr = [1,2,3,4] 给服务器?

这个很简单，我们向后端提交表单的时候，多个字段需要是`name="name[]"`这种形式。所以只需要`https://your.host/api/?arr[0]=1&arr[1]=2&arr[2]=3&arr[3]=4`即可。

### util

util模块是node的内置模块，提供了一些工具方法。这里很多方法都要会用且会实现原理。

- `util.inherits()`

### 正则表达式

这个不多说了，见：

- [精通正则表达式之理论与实战](/f2e/regexp-1)
- [精通正则表达式之正则引擎原理](/f2e/regexp-2)

### 常用模块

- [Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)
- [Most depended-upon packages](https://www.npmjs.com/browse/depended)

上面的这些常用库首先要知道每个库的用途，然后在平时要用到的时候多用一用。

> 写段代码获取某个文件夹下所有的文件名？




## 网络

## 模块

模块涉及到的知识有：

- 模块机制
- 热更新
- 上下文
- 包管理

## IO

IO涉及到的知识：

- Buffer
- String Decoder
- Stream
- Console
- File System 
- Readline
- REPL


### Buffer

> linux 里的 buffer 是写缓存，数据存储时，先保存到磁盘缓冲区，然后再写入到永久空间。cache 读缓存，数据从磁盘读出后，暂留在缓冲区，预备程序接下来的使用。

> Buffer 一般用于处理什么数据? 其长度能否动态变化? 

Buffer 是 Node.js 中用来处理二进制数据的类，其中与 IO 相关的操作(网络/文件等)均基于 Buffer。Buffer类的实例非常类似从 0-255 之间整数数组(其它整数会通过&255强制转到此范围)，但其大小是固定不变的，且其内存在 V8 堆栈外分配原始内存空间。Buffer 的大小在创建时确定，且无法更改。

> 为什么 new Buffer() 从6.x开始废弃？

参数类型不同会返回不同类型的 Buffer 对象，所以如果开发者没有正确校验参数或没有正确初始化 Buffer 对象的内容时，就会不经意向代码中引入安全性或可靠性问题。

接口|用途
---|---
Buffer.from()|根据已有数据生成一个 Buffer 对象
Buffer.alloc()|创建一个初始化后的 Buffer 对象
Buffer.allocUnsafe()|创建一个未初始化的 Buffer 对象
Buffer.concat(list[, totalLength])|合并 Buffer 对象
buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])|拷贝buffer
buf.slice()|浅拷贝，即引用
buf.forEach()|遍历

> 实现concat、copy、split方法

```js
Buffer.concat = function(bufferList,len=bufferList.reduce((a,b)=>a+b.length,0)){
    let buffer = Buffer.alloc(len);
    let offset = 0;
    bufferList.forEach(buf=>{
        buf.copy(buffer,offset);
        offset += buf.length;
    })
    return buffer;
}
```

**TypedArray**

Node.js 的 Buffer 在 ES6 增加了 TypedArray 类型后，修改了原来的 Buffer 实现，选择基于 TypedArray 中 Uint8Array 来实现，从而提高性能。

```js
var arr = new Uint16Array(2)
arr[0] = 5000
arr[1] = 4000
console.log(arr) // Uint16Array [ 5000, 4000 ]

//  拷贝buffer
const buf1 = Buffer.from(arr)
console.log(buf1)  // <Buffer 88 a0> 
// 88 -> 8*16+8 -> 136 = 5000&255
// a0 -> 10*16 -> 160 = 4000&255
console.log(arr.buffer)  // ArrayBuffer { [Uint8Contents]: <88 13 a0 0f>, byteLength: 4 }

// 与buffer共享内存
const buf2 = Buffer.from(arr.buffer)
console.log(buf2)  // <Buffer 88 13 a0 0f>
// 1 * 16 + 3 = 19 -> 154  

// 是引用，可以改变
arr[1] = 6000
console.log(buf1);
// 输出: <Buffer 88 a0>
console.log(buf2);
// 输出: <Buffer 88 13 70 17>
```

### String Decoder

`string_decoder`模块用于将 Buffer 对象解码成字符串，是对 `.toString()` 的补充。支持 utf8 和 utf16 解码。

- `write()`: 这个方法会将 Buffer 写到缓存，并取出缓存中完整的部分字节。剩余不完整的留在缓存中。下次如果 write 传入剩余的字节，它就会返回。
- `end()`: 将缓存中的剩余字节一次性解码成字符串返回。

```js
const {
    StringDecoder
} = require('string_decoder')
const decoder = new StringDecoder('utf8')

console.log(Buffer.from('你好啊')) // <Buffer e4 bd a0 e5 a5 bd e5 95 8a>

// 1) 首先 write 四个字节，前三个字节组成 `你`，剩下 `好` 的一部分字节 0xe5
const str1 = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0, 0xe5]))
console.log(str1) // 你

// 2) 再次传入 `好` 的剩余字节
const str2 = decoder.write(Buffer.from([0xa5, 0xbd]))
console.log(str2) // 好

// 3) 调用 end() 时如果传入的字节不完整
const str3 = decoder.end(Buffer.from([0xe5]))
console.log(str3) // �   
console.log(Buffer.from(str3)) // <Buffer ef bf bd>
```

### Stream

Stream 流一般用于大文件任务，只需要用很小的内存就能完成大文件的拷贝。流的类型：

类|使用场景|重写方法
---|---|---
Readable|只读|_read
Writeable|只写|_write
Duplex|读写|_read, _write
Transform|操作被写入数据，然后读出结果|_transform, _flush

**对象模式**

通过 Node API 创建的流，只能操作字符串或 buffer。但流的实现可以基于其它 js 类型(除了 null，它在流中有特殊含义，表示流的结束)。这样的流就处于`对象模式(objectMode)`中。在创建流对象的时候，可以通过提供`objectMode`参数来生成对象模式的流。试图将现有流转为对象模式是不安全的。

**缓冲区**

读取的数据放入缓冲区，等待写入。Readable、Writeable 流都会将数据存入内部缓冲区，缓冲区可以分别通过 `writeable._writeableState.getBuffer()`和`readable._readableState.buffer`来访问。缓冲区大小由构造 stream 时的 hignWaterMark 标识指定可缓存多少字节，对于`objectMode`的 stream，该标志表示可容纳的对象个数。

**可读流**
**可写流**
**Duplex 和 Transform**
**pipe**




### Console

### File System 

“一切皆是文件”是 Unix/Linux 的基本哲学之一, 不仅普通的文件、目录、字符设备、块设备、套接字等在 Unix/Linux 中都是以文件被对待, 也就是说这些资源的操作对象均为 fd (文件描述符), 都可以通过同一套 system call 来读写. 在 linux 中你可以通过 ulimit 来对 fd 资源进行一定程度的管理限制.

**编码**

> UTF8, GBK, es6 中对编码的支持, 如何计算一个汉字的长度?

**stdio**

stdio (standard input output) 标准的输入输出流, 即输入流 (stdin), 输出流 (stdout), 错误流 (stderr) 三者. 在 Node.js 中分别对应 `process.stdin` (Readable), `process.stdout` (Writable) 以及 `process.stderr` (Writable) 三个 stream.

其中的 stream 则是指 stdout (输出流). 实际上在 shell 上运行一个应用程序的时候, shell 做的第一个操作是 fork 当前 shell 的进程 (所以, 如果你通过 ps 去查看你从 shell 上启动的进程, 其父进程 pid 就是当前 shell 的 pid), 在这个过程中也把 shell 的 stdio 继承给了你当前的应用进程, 所以你在当前进程里面将数据写入到 stdout, 也就是写入到了 shell 的 stdout, 即在当前 shell 上显示了.

输入也是同理, 当前进程继承了 shell 的 stdin, 所以当你从 stdin 中读取数据时, 其实就获取到你在 shell 上输入的数据

当你使用 ssh 在远程服务器上运行一个命令的时候, 在服务器上的命令输出虽然也是写入到服务器上 shell 的 stdout, 但是这个远程的 shell 是从 sshd 服务上 fork 出来的, 其 stdout 是继承自 sshd 的一个 fd, 这个 fd 其实是个 socket, 所以最终其实是写入到了一个 socket 中, 通过这个 socket 传输你本地的计算机上的 shell 的 stdout.

如果你理解了上述情况, 那么你也就能理解为什么守护进程需要关闭 stdio, 如果切到后台的守护进程没有关闭 stdio 的话, 那么你在用 shell 操作的过程中, 屏幕上会莫名其妙的多出来一些输出. 

```
for (; i < getdtablesize(); ++i) {
   close(i);  // 关闭打开的 fd
}
```

Linux/unix 的 fd 都被设计为整型数字, 从 0 开始. 你可以尝试运行如下代码查看.

```js
console.log(process.stdin.fd); // 0
console.log(process.stdout.fd); // 1
console.log(process.stderr.fd); // 2
```

在上一节中的 在 IPC 通道建立之前, 父进程与子进程是怎么通信的? 如果没有通信, 那 IPC 是怎么建立的? 中使用环境变量传递 fd 的方法, 这么看起来就很直白了, 因为传递 fd 其实是直接传递了一个整型数字.

> 如何同步的获取用户的输入?

```js
/*
 * http://stackoverflow.com/questions/3430939/node-js-readsync-from-stdin
 * @mklement0
 */
var fs = require('fs');

var BUFSIZE = 256;
var buf = new Buffer(BUFSIZE);
var bytesRead;

module.exports = function() {
  var fd = ('win32' === process.platform) ? process.stdin.fd : fs.openSync('/dev/stdin', 'rs');
  bytesRead = 0;

  try {
    bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
  } catch (e) {
    if (e.code === 'EAGAIN') { // 'resource temporarily unavailable'
      // Happens on OS X 10.8.3 (not Windows 7!), if there's no
      // stdin input - typically when invoking a script without any
      // input (for interactive stdin input).
      // If you were to just continue, you'd create a tight loop.
      console.error('ERROR: interactive stdin input not supported.');
      process.exit(1);
    } else if (e.code === 'EOF') {
      // Happens on Windows 7, but not OS X 10.8.3:
      // simply signals the end of *piped* stdin input.
      return '';
    }
    throw e; // unexpected exception
  }

  if (bytesRead === 0) {
    // No more stdin input available.
    // OS X 10.8.3: regardless of input method, this is how the end 
    //   of input is signaled.
    // Windows 7: this is how the end of input is signaled for
    //   *interactive* stdin input.
    return '';
  }
  // Process the chunk read.

  var content = buf.toString(null, 0, bytesRead - 1);

  return content;
};
```

### Readline

`readline` 模块提供了一个用于从 Readable 的 stream(如 process.stdin)中一次读取一行的接口。常用的场景有日志分析、自动完成、命令行工具问答。

学习[readline资料](https://github.com/chyingp/nodejs-learning-guide/blob/master/%E6%A8%A1%E5%9D%97/readline.md)后，自己再实现一遍：

1. 实现命令行输入字母，自动转大写输出。
2. 日志读取
3. 代码提示
4. 实现npmt init

> Readline 是如何实现的? (有思路即可) 

realine 在读取 TTY 的数据时, 是通过 `input.on('keypress', onkeypress)` 时发现用户按下了回车键来判断是新的 line 的, 而读取一般的 stream 时, 则是通过缓存数据然后用正则 .test 来判断是否为 new line 的.

> 什么叫 IO, 什么又叫 IO 密集型业务?
> Stream 的 highWaterMark 与 drain 事件是什么? 二者之间的关系是? 
> Stream 的 pipe 的作用是? 在 pipe 的过程中数据是引用传递还是拷贝传递? 
> 什么是文件描述符? 输入流/输出流/错误流是什么? 
> console.log 是同步还是异步? 如何实现一个 console.log? 
> 如何同步的获取用户的输入? 

### REPL

Read-Eval-Print-Loop (REPL)

### 参考资料

- [Nodejs基础：巧用string_decoder将buffer转成string](https://github.com/chyingp/nodejs-learning-guide)

## 错误处理

错误处理/调试部分主要涉及的内容如下：

- Errors(异常)
- Domain(域)
- Debugger(调试器)
- C/C++ 插件
- V8
- 内存快照
- CPU profiling(CPU剖析)

### V8

暂时看不懂，跳过

### 内存快照


## OS


OS 这部分主要涉及的内容如下：

- TTY
- OS
- 命令行参数
- 负载
- CheckList
- 指标

### TTY

### 什么是 TTY ?

`tty`原意是 teletype 打字机，`pty`则是 pseudo-teletype 伪打字机，在 unix 中，`/dev/tty*`指任何表现像打字机的设备，例如终端。

> 如何查看一个进程是通过 TTY 启动的？

- `w` 命令可以查看当前登陆的用户情况，每登陆一个窗口就有一个 TTY。
- `ps -x`命令查看进程信息中也有 TTY 的信息。`?` 表示没有依赖 TTY 的进程，即守护进程。

可以通过`stdio.isTTY`判断当前进程是否处于 TTY 环境。

```
node -p -e "Boolean(process.stdout.isTTY)" | cat
```

### OS模块

通过 os 模块可以获取当前操作系统的一些基础信息。

属性|描述
---|---
os.EOL|返回当前系统的`end of line`
os.arch|返回当前系统CPU架构，如`x86`或`x64`
os.constants|返回系统常量
os.cpus()|返回每个核的信息
os.endianness()|返回 CPU 字节序，如果大端字节序返回 `BE`，小端字节序则 `LE`
os.freemen()|返回系统空闲内存大小，单位是字节
os.homedir()|返回当前用户的根目录
os.hostname()|返回当前系统的主机名
os.loadavg()|返回负载信息
os.networkInterfaces|返回网卡信息(类似 `ifconfig`)
os.platform()|返回编译时指定的平台信息，如`win32`，`linux`，同`process.platform()`
os.release()|操作系统的分发版本号
os.tmpdir()|系统默认的临时文件夹
os.totalmem()|返回总内存大小
os.type()|根据`[uname](https://en.wikipedia.org/wiki/Uname#Examples)`返回系统的名称
os.uptime()|返回系统的运行时间，单位是秒
os.userInfo([options])|返回当前用户信息

> 不同操作系统的换行符(EOL)有什么区别？

end of line(EOL) 同 newline，line ending，以及line break。
通常由 line feed(LF, `\n`) 和 carriage return (CR，`\r`)组成。windows 用的`\r\n`，mac os9之前用的`\r`，mac os X 及 linux用的\n`。

### os 常量

- 信号常量
- POSIX 错误常量(POSIX Error Constants): 如 EACCES，EADDRINUSE 等。
- Windows 错误常量(Windows Specific Error Constants)，如 WSAEACCESS，WSAEBADF 等。
- libuv 常量(libuv Constants)，仅 UV_UDP_REUSEADDR。

## Path

### 不同平台，路径的区别?

每个平台路径形式不同，path 模块的方法就是对应平台的方法，如 mac 平台下。

```js
const path = require('path');
console.log(path.basename === path.posix.basename); // true
```

### path对象的解析？

on POSIX:

```js
path.parse('/home/user/dir/file.txt')
// Returns:
// {
//    root : "/",
//    dir : "/home/user/dir",
//    base : "file.txt",
//    ext : ".txt",
//    name : "file"
// }
```

on Windows:

```js
path.parse('C:\\path\\dir\\file.txt')
// Returns:
// {
//    root : "C:\\",
//    dir : "C:\\path\\dir",
//    base : "file.txt",
//    ext : ".txt",
//    name : "file"
// }
```

### path.extname(path)

case|return
---|---
path.extname('index.html')|.html
path.extname('index.coffee.md')|.md
path.extname('index.')|.
path.extname('index')|
path.extname('.index')|

### 命令行参数

命令行参数(Command Line Options)，即对 CLI 使用上的一些文档。关于 CLI 主要有 4 种使用方式。

- node [options] [v8 options] [script.js | -e "script"] [arguments] 
- node debug [script.js | -e "script" | :] ...
- node --v8-options
- 无参数直接启动 REPL (Read Eval Print Loop:交互式解释器)环境

参数|简介
---|---
-v,--version|查看当前 node 版本
-h --help|查看帮助文档
-e,--eval "script"|将参数字符串当作代码执行
-p,--print "script"|打印 -e 的返回值，`node -pe '1+1'`
-c,--check|检查语法不执行
-i,--interactive|即使 stdin 不是终端也打开 REPL 模式
-r,--require module|在启动前预先 require 指定模块
--no-deprecation|关闭废弃模块警告
--trace-deprecation|打印废弃模块的堆栈跟踪信息
--throw-deprecation|执行废弃模块时抛出错误
--no-warnings|无视报警(包括废弃模块)
--trace-sync-io|只要检测到异步 I/O 处于 Event Loop 的开头就打印堆栈信息
--zero-fill-buffers|自动初始化(zero-fill) Buffer 和 SlowBuffer
--preserve-symlinks|在解析和缓存模块时指示模块加载程序保存符号链接
--track-heap-objects|为堆快照跟踪对象的分配情况
--prof-process|使用 v8 选项 `--prof` 生成 Profilling 报告
--v8-options|显示 v8 命令行选项
--tls-cipher-list=list|指明替代的默认 TLS 加密器列表
--enable-fips|在启动时开启 FIPS-compliant crypto
--force-fips|在启动时强制实施 FIPS-compliant
--openssl-config=file|启动时加载 OpenSSL 配置文件
--icu-data-dir=file|指定 ICU 数据加载路径

### 环境变量

环境变量|简介
---|---
`NODE_DEBUG=module[,...]`|指定要打印调试信息的核心模块列表
`NODE_PATH=path[:...]`|指定搜索目录模块路径的前缀列表
`NODE_DISABLE_COLORS=1`|关闭 REPL 的颜色显示
`NODE_ICU_DATA=file`|ICU(Intl Object)的数据路径
`NODE_REPL_HISTORY=file`|持久化存储 REPL 历史文件的路径
`NODE_TTY_UNSAFE_ASYNC=1`|设置为1时，将同步操作 stdio (如console.log变成同步)
`NODE_EXTRA_CA_CERTS=file`|指定 CA (如 VeriSync) 的额外证书路径
`NODE_NO_WARNINGS=1`|设置为1时，不会提示警告

### 负载

> 什么是负载？怎么查看？不同值的负载表示什么？

负载是衡量服务器运行状态的一个重要概念，通过负载情况，可以知道服务器目前是清闲，良好，繁忙还是即将 crash。

- 系统负载（System Load）是系统CPU繁忙程度的度量，即有多少进程在等待被CPU调度（进程等待队列的长度）。
- 平均负载（Load Average）是一段时间内系统的平均负载，这个一段时间一般取1分钟、5分钟、15分钟。

命令行可以通过 `uptime`, `top`命令，node.js 中可以通过 `os.loadavg()` 来获取当前系统的平均负载情况。

```
> os.loadavg()
[ 3.13134765625, 3.01953125, 3.04296875 ]
```

分别是最近1分钟、5分钟、15分钟系统 CPU 的平均负载，当 CPU 的一个核工作饱和的时候负载为 1，有几个核 CPU 的饱和负载就是几。我的电脑是 8 核，所以一分钟平均 Load 约等于 3.13134765625/8=0.39。

在 nodejs 中查看单个进程的 CPU 负载可以使用 [pidusage](https://github.com/soyuka/pidusage) 模块。

单核 CPU，不同的 Load 值：

- Load < 0.7时：系统很闲，要考虑多部署一些服务
- 0.7 < Load < 1时：系统状态不错
- Load == 1时：系统马上要处理不多来了，赶紧找一下原因修复
- Load > 5时：系统已经非常繁忙了

> 如何知道我的系统有多少核心?

除了 CPU 负载, 对于服务端 (偏维护) 还需要了解网络负载, 磁盘负载等。

> CPU 负载和 CPU 使用率的区别？低利用率意味着没有负载吗？

它们是从不同角度来描述 CPU 使用情况的。负载是从进程数上描述的，使用率是从时间上来描述的。比如银行工作人员，负载是很多客户排队，使用率是处理客户的有效时间(工作人员的等待时间不算在内如打印身份证等不算在内)/总时间。

- [理解Load Average做好压力测试](http://www.blogjava.net/cenwenchu/archive/2008/06/30/211712.html)

资料：

- [一分钟理解负载LoadAverage](https://www.w3cschool.cn/architectroad/architectroad-loadaverage.html)
- [Understanding Linux CPU Load](http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages)


### CheckList

USE 方法用来完整评估的服务器的状态。即对系统中的每种资源都检查使用率(usage)、饱和度(saturation)和错误(errors)。

- 资源：所有物理服务器功能组件(CPU、磁盘、总线...)
- 利用率：资源忙于工作的平均时间，用一段时间内的百分比描述
- 饱和度(负载)：资源具有无法服务的额外工作的程度，如 loadavg 用队列长度来描述。
- 错误：错误的数量

- [USE 方法](http://www.brendangregg.com/USEmethod/use-linux.html)

### 物理资源

部件|类型|衡量
---|---|---

> ulimit 是用来干什么的?

ulimit 命令用于管理用户对资源的使用情况。
