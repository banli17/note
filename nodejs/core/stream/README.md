# Stream

Stream 是处理文件和网络数据的有效方式，它是 unix 里引入的，程序可以通过管道符相互交互。

## 为什么要用流处理数据

比如看电影时，1GB 大文件，是不能用 readFile 这样的方法的，因为:

- readFile 方法在读取文件时是同步的，需要全部读完才能播放
- 资源文件最终会一次性加载到内存，导致占用内存过大

![](./imgs/2022-05-15-17-13-30.png)

**流的好处**

- 时间效率：开始处理数据所需时间要少得多，可以拥有数据后立即处理，而不是等到所有数据加载后
- 内存效率：同一时间流无需占据大内存空间
- 使用方便：流配合管道，扩展程序变得简单

![](./imgs/2022-05-15-17-14-49.png)

## Node 中的流分类

**Node 中的四种流**

- Readable: 可读流，能够实现数据的读取
- Writeable: 可写流， 能够实现数据的写操作
- Duplex: 双工流， 既可读又可写
- Tranform: 转换流, 可读可写，还能实现数据转换

**Node 流特点**

- Stream 模块实现了四个具体的抽象
- 所有流都继承了 EventEmitter

### 可读流

可读流：生产供消费的数据流

自定义可读流

- 继承自 stream 里的 Readable
- 重写 `_read` 方法调用 push 产出数据

问题：

- 底层数据读取完成之后如何处理？传 null 表示读取完成
- 消费者如何获取可读流中的数据？两个事件
  - readable：流中存在可读取数据时触发
  - data: 流中数据块传给消费者后触发

流动模式
暂停模式

![](./imgs/2022-05-15-18-19-02.png)

### 可写流

可写流：用于消费的流

自定义可写流

- 继承自 Writable
- 重写 `_write` 方法

可写流事件

- pipe: 可读流调用 `pipe()` 方法时触发
- unpipe: 可读流调用 `unpipe()` 方法时触发
- drain

### Duplex 双工流

### Transform 转换流

自定义转换流

- 继承 Transform 类
- 重写 _transform 方法，调用 push 和 callback
- 重写 _flush 方法，处理剩余数据

## 文件可读流

### 文件可读流事件和应用

- open
- close
- data
- end
- error

## 文件可写流


## API

- process.stdin 返回连接到 stdin 的流
- process.stdout 返回连接到标准输出的流
- process.stderr 返回连接到 stderr 的流
- fs.createReadStream() 创建到文件的可读流
- fs.createWriteStream() 创建到文件的可写流
- net.connect() 启动基于流的连接
- http.request() 返回 http 的实例。ClientRequest 类，它是一个可写的流
- zlib.createGzip() 使用 gzip（一种压缩算法）将数据压缩到流中
- zlib.createGunzip() 解压缩 gzip 流。
- zlib.createDeflate() 使用压缩（一种压缩算法）将数据压缩到流中
- zlib.createInflate() 解压缩放气流


## write 原理解析
