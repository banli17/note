---
title: "深入学习nodejs系列（3）：Buffer"
date: 2017-03-29 21:50:20
tags:
---

## 学习资料

- [深入浅出node.js第六章：理解Buffer]

> linux 里的 buffer 是写缓存，数据存储时，先保存到磁盘缓冲区，然后再写入到永久空间。cache 读缓存，数据从磁盘读出后，暂留在缓冲区，预备程序接下来的使用。

## 简介

因为 node 需要处理二进制数据，js自由方法无法满足这个需求。所以出现了 Buffer。Buffer 是一个像 Array 的对象，它主要用来操作字节。

Buffer占用的内存不是v8分配的，而是C++内建模块分配的。

## Buffer对象

Buffer对象的元素是16进制的二位数，即0-255的数。为什么不用二进制表示呢？因为太长了。

```javascript
var str = '深入浅出node.js'
var buf = Buffer.from(str)
console.log(buf)
// => <Buffer e6 b7 b1 e5 85 a5 e6 b5 85 e5 87 ba 6e 6f 64 65 2e 6a 73>
```

不同编码的字符串占用的元素个数不同，UTF-8编码下中文是3个元素，字母是1个元素。

通过`Buffer.alloc(size)`新建Buffer对象。

```javascript

```



```javascript
let buffer = Buffer.from('你好');
```

toString()可以将 buffer 转字符串。

```javascript
buffer.toString();  
buffer.toString('utf8');  
buffer.toString('base64');  
```

buffer 不支持gbk，可以使用`iconv-lite`，把二进制gbk转成utf8。

**进制的转换**

二进制 11111111   0b开头
八进制 
十六进制

```
let r = parseInt('11111111', 2)

// 10进制转其它进制
let r = (255).toString(8)
```

**编码**

- base64: img.src background  3*8 -> 4*6