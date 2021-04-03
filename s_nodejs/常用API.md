---
title: 常用API
---

# global

- CommonJS
- Buffer、process、console
- timer

## process

env, argv, argv0, execPath, execArgv

cwd() process 当前执行路径

process.nextTick() 比 setImmediate() 要早。

nextTick()是放在当前队列的最后，在异步 io 之前，setImmediate 是放在下一次异步事件队列的最前。setTimeout(,0) 是在中间。

## 调试

inspect chrome://inspect
ide

## path

normalize() 方法会规范化给定的 path，并解析 '..' 和 '.' 片段。

```
path.normalize('/foo/bar//baz/asdf/quux/..');
// 返回: '/foo/bar/baz/asdf'
```

join() 用于拼接路径。它会调用 normalize() 尽量标准化。

```
path.join('usr', '../local', 'bin')
// 输出 /usr/bin/
```

resolve() 将相对路径转为绝对路径，默认是当前目录。

basename() 文件名

extname() 扩展名

dirname() 所在文件夹的路径

parse() 将 path 解析成对象

format() 将对象转为 path

sep 路径的分隔符
delimiter process.env.PATH 的分隔符
win32 windows 下的 win32.sep win32.delimiter
posix linux 下的

**dirname ,**filename 总是返回文件的绝对路径
process.cwd() 总是返回 node 命令所在文件夹，node 在哪执行的
path.resolve('./')  
./ 在 require 方法中总是相对当前文件所在的文件夹，在其它情况下，和 process.cwd 一样。

## Buffer

用于处理二进制数据流，实例类型整数数组，大小固定。c++ 代码在 v8 堆外分配物理内存

**静态方法**
alloc() 用于创建一个 Buffer 对象，默认是 0 填充，第一个参数是长度，第二个参数是用什么填充。

from([1,2,3]) 用数组来实例化 Buffer
from('test') 用字符串来实例化 Buffer
from('test','base64') 指定编码

byteLength('test') 看占多少字节
isBuffer() 看是否是 Buffer 对象
concat() 将 Buffer 对象连接起来，参数是数组，每个元素是 Buffer 对象。

**实例方法**

length
toString() 将 Buffer 转字符串。默认是 utf8，参数是编码
fill(start,length,str) str 会被转为 16 进制填充
equals() 判断内容是否一样
indexOf()
copy()

## EventEmitter

类要继承 EventEmitter 类。

on()
emit()
once()
removeListener('test',fn)
removeAllListener('test')

## fs

```
readFile
readFileSync
writeFile('./text', 'hello', {encoding:'utf8},err=>{
     if(err){}
     console.log('done')
})
writeFile('./text',buffer, err=>{
     if(err){}
     console.log('done')
})

fs.stat('./1.js', (err, stats)=>{
    // 获取文件的信息
})

fs.rename('./text', 'test.txt', err=>{})

fs.unlink()  删除

fs.readdir('../', (err,files)=>{})

fs.mkdir()
fs.rmdir()

fs.watch('./', )
fs.watchFile()
```

.gitignore

前面的/ 表示当前项目根目录
最后面的/ 表示一个目录 \** 表示多级任意目录
! 表示排除
*表示任意字符串 \*.log

.npmignore 没有 npmignore 会忽略 gitignore 里的文件

.editconfig

```
root = true  // 顶层

[*]
end_of_line = lf   (unix风格)
```

## http 创建静态资源服务器

```

```

`npm i supervisor -g` 监听文件变化，自动重启服务器,然后通过 supervisor 运行 js 文件

- [Node.js 包教不包会](https://github.com/alsotang/node-lessons)

## http

### 一个简单的服务

先来看一个简单的例子，搭建一个服务，打开网址显示一串字符串。

```
var http = require('http')
var server = http.createServer((request, response)=>{
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('hello')
    response.end()
}))
server.listen('9898')
```

response.write() 的第一个参数是字符串或二进制 buffer。

### 返回 html，资源文件

但是前端页面都是需要返回模板，静态 css、js 资源的，而不是字符串。需要通过[mime 库](https://github.com/broofa/node-mime)来识别资源的 mime 类型。

```node
const http = require("http");
const fs = require("fs");
const mime = require("mime");

function static(url, res) {
  res.setHeader("Content-Type", mime.getType(url) + ";charset=utf-8");
  fs.readFile(url.slice(1), (err, data) => {
    res.write(data);
    res.end();
  });
}
const server = http.createServer((req, res) => {
  const url = req.url;

  if (url == "/") {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    fs.readFile("index.html", (err, data) => {
      res.write(data);
      res.end();
    });
  } else {
    static(url, res);
  }
});

server.listen("9898", () => {
  console.log("connect ok");
});
```

## 网络 net

### net.createServer()

用于创建一个 TCP 或 IPC 服务。

```
net.createServer([option][,connectionListener])
```

- option ：是一个对象
  - allowHalfOpen：是否允许 TCP 半连接，默认是 false
  - pauseOnConnect：在有连接进来时，socket 是否暂停，默认是 false
- connectionListener：自动监听 connection 事件的函数

```
const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```

## stream

- [深入理解 Node.js Stream 内部机制](http://taobaofed.org/blog/2017/08/31/nodejs-stream/)
- [streamify-your-node-program](https://github.com/zoubin/streamify-your-node-program)
- [Node.js Stream - 基础篇](https://tech.meituan.com/stream-basics.html)
  进阶篇：http://tech.meituan.com/stream-internals.html
  实战篇：http://tech.meituan.com/stream-in-action.html

## Buffer

- [深入浅出 node.js 第六章：理解 Buffer]

> linux 里的 buffer 是写缓存，数据存储时，先保存到磁盘缓冲区，然后再写入到永久空间。cache 读缓存，数据从磁盘读出后，暂留在缓冲区，预备程序接下来的使用。

## 简介

因为 node 需要处理二进制数据，js 自由方法无法满足这个需求。所以出现了 Buffer。Buffer 是一个像 Array 的对象，它主要用来操作字节。

Buffer 占用的内存不是 v8 分配的，而是 C++内建模块分配的。

## Buffer 对象

Buffer 对象的元素是 16 进制的二位数，即 0-255 的数。为什么不用二进制表示呢？因为太长了。

```javascript
var str = "深入浅出node.js";
var buf = Buffer.from(str);
console.log(buf);
// => <Buffer e6 b7 b1 e5 85 a5 e6 b5 85 e5 87 ba 6e 6f 64 65 2e 6a 73>
```

不同编码的字符串占用的元素个数不同，UTF-8 编码下中文是 3 个元素，字母是 1 个元素。

通过`Buffer.alloc(size)`新建 Buffer 对象。

```javascript
```

```javascript
let buffer = Buffer.from("你好");
```

toString()可以将 buffer 转字符串。

```javascript
buffer.toString();
buffer.toString("utf8");
buffer.toString("base64");
```

buffer 不支持 gbk，可以使用`iconv-lite`，把二进制 gbk 转成 utf8。

**进制的转换**

二进制 11111111 0b 开头
八进制
十六进制

```
let r = parseInt('11111111', 2)

// 10进制转其它进制
let r = (255).toString(8)
```

**编码**

- base64: img.src background 3*8 -> 4*6

---

title: fs 模块的应用
date: 2018-05-15 17:45:19
tags:

---

## 编码

- node 为了能操作文件，专门提供了转换文件读写的模块 fs
- 文件的内容都是二进制、八进制、十六进制
- node 读取文件的结果默认是 16 进制，因为二进制太长了。

## 进制转换

- 二进制 0b
- 八进制 0
- 十六进制 0x

一个字节 8 位，是 2^8-1 = 255，node 表现的是 16 进制，最大是 0xff(15\*16 + 15)。

```
010  -> 8
0x10 -> 16
0b10 -> 2
```

- 看编码，utf8,汉字占 3 个字节，英文占 1 个字节
- 所有的编码都是 utf8,node 不支持 gbk，乱码

## 编码的转换 (base64)

- 图片转 base64，不会发生 http 请求。
- 简单的编码转换，没有加密。
- 转 base64 后，体积会扩大 1/3
- fileReader
- 2\*\*3 表示 2^3

utf8 中一个汉字 3 个字节，base64 规范要求每个字节不超过 64，即 00111111( 2\**6 - 1 = 63)。将 3*8 -> 4\*6 的格式。

```javascript
// 十进制转2进制，可以任意进制的转换
(11).toString(2)(0x11).toString(8);

// 1011当作2进制进行转换为10进制
parseInt("1011", 2);

// 读取图片为base64
let btn = document.querySelector("#btn");
let file = document.querySelector("#file");
btn.onclick = function () {
  let r = new FileReader();
  console.dir(file);
  r.readAsDataURL(file.files[0]);
  r.onload = function (e) {
    let img = new Image();
    img.src = e.target.result;
    document.body.appendChild(img);
    console.log(e.target.result);
  };
};
```

Base64 编码要求把 3 个 8 位字节（3*8=24）转化为 4 个 6 位的字节（4*6=24），之后在 6 位的前面补两个 0，形成 8 位一个字节的形式。 如果剩下的字符不足 3 个字节，则用 0 填充，输出字符使用‘=’，因此编码后输出的文本末尾可能会出现 1 或 2 个‘=’。

```javascript
// Z转换base64成Wg==
let b = Buffer.from("Z");

let c = (0x5a).toString(2);

console.log(c);
// 1011010 + = + = -> 00010110 + 00100000 + = + =
console.log(parseInt("00010110", 2)); // W
console.log(parseInt("00100000", 2)); // g
```

### 转 base64 的过程

```javascript
// 好 -> base64

let a = Buffer.from("好"); //<Buffer e5 a5 bd>
console.log(a);

// 转2进制
console.log((0xe5).toString(2)); // 11100101
console.log((0xa5).toString(2)); // 10100101
console.log((0xbd).toString(2)); // 10111101

// -> 00111001 00011010 00010110 00111101
console.log(parseInt("00111001", 2)); // 57
console.log(parseInt("00011010", 2)); // 26
console.log(parseInt("00010110", 2)); // 22
console.log(parseInt("00111101", 2)); // 61

let str = "";
for (let i = 65; i < 91; i++) {
  str += String.fromCharCode(i);
}

str += str.toLowerCase();
str += "0123456789";
str += "+/";

console.log(str[57] + str[26] + str[22] + str[61]); //5aW9
```

## Buffer

不建议使用`new Buffer()`了。

- 缓存，它的展现方法是 16 进制，16 进制短。
- node 中的 buffer 可以和字符串转换。

### 声明 buffer

**1.声明**

Buffer 声明后不能更改长度。

```javascript
// 1.通过数字声明，申请多大空间
Buffer.alloc(3); // 3表示字节
<Buffer 00 00 00 >

// 2.使用字节数组创建buffer，每个元素都是一个字节，只能是数字0-255
var buffer = Buffer.from('你好')
console.log(buffer)  // <Buffer e4 bd a0 e5 a5 bd>
console.log(buffer.toString())  // 你好

var buffer2 = Buffer.from([1, 55])  // 表示2个字节，
console.log(buffer2)   // <Buffer 02 03>
console.log('a' + buffer2.toString() + 'b')  // 'a7b', 1在Ascii里是空字符

const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(buf.toString())  // buffer

// 3.使用字符串创建buffer
let b = Buffer.from('文件')
b.length  // 6

// buffer可以循环
b.forEach(item=>{
    console.log(item) // 打印每个字节。控制台默认打印10进制
})
```

**forEach()**

**2.截取 slice**

```javascript
// 拷贝的是内存空间
let arr = [1, { name: "zs" }, 2];
let newArr = arr.slice(1, 2);
newArr[0].name = "hello";
arr[1].name; //'hello' 浅拷贝

// slice浅拷贝
let buffer = Buffer.from([0, 1, 2]);
let newBuffer = buffer.slice(0, 1);
newBuffer[0] = 100; // 0x64
console.log(buffer); // <Buffer 64 01 02>

Buffer.from("你好").slice(0, 3).toString(); // 你
```

Buffer 一旦声明，就不能增加长度。

**3.copy、concat**

```javascript
let buf1 = Buffer.from('你')
let buf2 = Buffer.from('好')
console.log(buf1 + buf2) // '你好' 这是拼接成转字符串了

// sourceBuffer.copy(targetBuffer, targetStart, sourceStart, sourceEnd)
// 后面参数可以省略
let buf1 = Buffer.from('你好')
let buf2 = Buffer.from('地球')
let bigbuf = Buffer.alloc(12)
buf1.copy(bigbuf)
buf2.copy(bigbuf)
console.log(bigbuf.toString())  // 地球)

// Buffer.concat(list[, totalLength])
var buf = Buffer.concat([buf1, buf2])
console.log(buf.toString())  //你好地球
var bufCut = Buffer.concat([buf1, buf2], 3)  // 3表示合并后返回多少位长度
console.log(bufCut.toString())  //你

// 原理
Buffer.concat = function(lists, length = lists.reduce((prev,next)=>prev+next.length,0){
    let buffer = Buffer.alloc(length)
}
```

**indexOf**

```
Buffer.from('你好*').indexOf('*')  // 6
Buffer.from('你好*你好*').indexOf('*',7)  // 13
```

## fs

`fs`方法中一般有同步和异步两种方法，同步可以马上拿到返回结果，异步就通过`callback`形式，异步只能`error first`来获取错误。

```
// 读取
// 默认是buffer，需要传编码，还可以传对象{encoding:'utf8', flag:'r'}
fs.readFile('./note.md', 'utf8', function(err, data){
    if(err){}
    console.log(data)
})

// 写入，文件不存在会创建文件，如果有内容会清空内容
fs.writeFile('./a.md', 1, function(err,data){})

// 拷贝，readFile会将内容整个读取到内存中，不可能读取比内存大的大文件 fs.copyFile(),是一次性读取
// 同时操作一个文件可能会错乱，可以放在队列里依次执行

```

### flag

- `a`: 打开文件为了追加，文件没有则创建
- `ax`: 和`a`一样，但是没有文件会报错
- `a+`: 打开文件问了追加和读，文件没有则创建
- `ax+`: 和`a+`一样，没有文件报错
- `as`: 和`a`一样，只是是异步打开
- `as+`: 和`a+`一样，异步的
- `r`: 打开文件为了读，文件不存在会报错
- `r+`: 打开文件为了读和写，文件不存在会报错
- `rs+`: 打开文件为了读和写，异步的，会写入系统缓存
- `w`
- `wx`
- `w+`
- `w+`:读取并写入，不存在会创建，存在则清空

文件标志符 fb: 打开文件时会生成一个文件标志符号，`node`的`process`默认占用了`0,1,2`，所以自己操作的文件标志从 3 开始。

- `process.stdin`: 0
- `process.stdout`: 1
- `process.stderr`: 2

* `fs.read(fb, buffer, offset,length,position,callback)`:通过 fb 读取数据
* fs.open
* fs.write
* `fs.fsync`： 同步磁盘缓存

fs 遍历算法

## 简介

require()找文件的路径，按照`module.paths`查找。

比如`require("mime")`，首先找`.js|.json|.node`文件，再找目录里的`package.json`的`main`，如果没有再找目录里的`index.js`。

## util

- `util.promisify()`: 将回调的方式转成`promise`。

```javascript
let util = require("util");
let read = util.promisify(fs.readFile);
```

`mz`模块会自动把 node 的模块转化成 promise 的形式。

```javascript
let fs = require("mz/fs");
fs.readFile("1.txt", "utf8").then((data) => console.log(data));
```

继承的方法，node 里有大量的继承。

- `util.inherits(constructor, superConstructor)`:继承另一个构造器的方法,属性不继承。不建议使用，用 es6 extends

```javascript
Child.prototype.__proto__ = Parent.prototype;
Object.create();
Object.setPrototypeOf();
```

## events

```javascript
let EventEmitter = require("events");
let util = require("util");
let event = new EventEmitter();

function Person() {}
util.inherits(Person, EventEmitter);
let p = new Person();
p.on("newListener", (eventName) => {});
let eat = function () {
  console.log("eat");
};
p.on("clock", eat);
p.emit("clock");
```

- `newListener`: 绑定一次事件会触发一次
- `on(evname, fn)`
- `off(evname, fn)`
- `removeListener(ename, fn)`
- `EventEmitter.defaultMaxListeners`
- `getMaxListeners()`
- `setMaxListeners(n)`
- `eventNames()`: 监听的事件名数组
- `listenerCount(ename)`: 监听的事件名次数
- `prependListener()`: 在 on 前面监听
- `once()`: 只执行一次，触发完，数组里删除

## EventEmitter 类的实现

下面用发布订阅模式简单的实现一下`EventEmitter`类。

```javascript
```
