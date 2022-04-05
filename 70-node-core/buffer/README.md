# buffer 模块

buffer 让 js 能操作二进制数据。

- 二进制数据：IO 操作的就是二进制
- 流操作：Stream, 将数据分段传输
- 管道连接数据的生产和消费者，如果生产和消费速度不一样，就需要缓冲区。

Nodejs 中 Buffer 就是一块内存空间

- 是全局变量
- 不占用 v8 堆内存大小，是 C++ 申请，内存使用由 Node 控制，V8 的 GC 回收
- 一般配合 Stream 流使用，充当数据缓冲区

创建 Buffer 实例

- alloc: 创建指定大小的 buffer
- allocUnsafe: 创建指定大小的 buffer (不安全)
- from: 接收数据，创建 buffer

实例方法：

- fill: 使用数据填充 buffer
- write: 向 buffer 写数据
- toString
- slice
- indexOf
- copy

静态方法

- concat
- isBuffer
