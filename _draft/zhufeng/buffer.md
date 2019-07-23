---
title: "Buffer"
date: 2017-01-26 01:48:54
tags:
---

>linux 里的 buffer 是写缓存，数据存储时，先保存到磁盘缓冲区，然后再写入到永久空间。cache 读缓存，数据从磁盘读出后，暂留在缓冲区，预备程序接下来的使用，

Buffer类，不要用new，被废弃了。它代表缓存，是二进制，表现成了16进制。

将字符串转16进制。默认是utf8，一个汉子是3个字节。

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