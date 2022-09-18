# Buffer 模块

## 简介

Node.js 中的 Buffer(缓冲区) 可以看作是一块内存空间。

- Buffer 是全局变量，直接就能使用。
- Buffer 是 C++ 申请的，不占用 v8 的堆内存大小，它无法调整大小，内存使用由 Node.js 控制，由 V8 的 GC 进行回收。
- Buffer 一般配合 Stream 使用，充当数据缓冲区。
- Buffer 可以理解为一个整数数组，每个数据是一个字节，用 16 进制表示(最大值是 256)。

## 为什么需要 Buffer?

引入 Buffer 是为了让 js 能操作二进制数据，文件或网络 IO 流。

如果使用字符串，字符串是不变量，每次处理字符串都会返回一个新的字符串，这会造成性能问题。

## 创建 Buffer 实例

Buffer 提供了三个方法 Buffer.from()、Buffer.alloc()、Buffer.allocUnsafe()，来创建 Buffer 实例。

- Buffer.from(array)
- Buffer.from(arrayBuffer[, byteOffset[, length]])
- Buffer.from(buffer)
- Buffer.from(string[, encoding])

```js
const buf = Buffer.alloc(1024)
const buf = Buffer.allocUnsafe(1024)
```

- `alloc()` 分配时会用零初始化 buffer，alloc 的第二个参数可以指定初始值。
- `allocUnsafe()` 不会初始化 buffer，可能包含旧数据(会造成数据访问和泄漏，所以不安全)，但是速度比 alloc() 快

## 实例方法

- fill(): 使用数据填充 buffer
- write(): 向 buffer 写数据
- toString()
- `slice() deprecated`: 使用 subarray 代替
- indexOf()
- copy()
- subarray() 用来创建 buffer 切片

### subarray()

subarray() 用来创建 buffer 切片，注意切片不是拷贝，如果原 buffer 改变，切片也会改变。

```js
const buf = Buffer.from('Hey!')
buf.subarray(0).toString() // Hey!
const slice = buf.subarray(0, 2)
console.log(slice.toString()) // He
buf[1] = 111 // o
console.log(slice.toString()) // Ho
```

### set()

set() 方法用来拷贝 buffer。

```js
const buf = Buffer.from('Hey!')
const bufcopy = Buffer.alloc(4) // allocate 4 bytes
bufcopy.set(buf)
```

默认情况下，会拷贝整个 buffer，如果想拷贝一部分，可以使用 subarray() 并设置 offset 参数。

```js
const buf = Buffer.from('Hey?')
const bufcopy = Buffer.from('Moo!')
bufcopy.set(buf.subarray(1, 3), 1)
console.log(bufcopy.toString()) // 'Mey!'
```

## 静态方法

- concat()
- isBuffer()

## 常用操作

### 获取 buffer 长度

```js
const buf = Buffer.from('Hey!')
console.log(buf.length)
```

### 遍历 buffer 内容

```js
const buf = Buffer.from('Hey!')
for (const item of buf) {
  console.log(item) // 72 101 121 33
}
```

### 改变 buffer 内容

```js
const buf = Buffer.alloc(4)
buf.write('Hey!')
```

也可以使用数组语法：

```js
const buf = Buffer.from('Hey!')
buf[1] = 111 // o in UTF-8
console.log(buf.toString()) // Hoy!
```
