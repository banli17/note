---
title: fs模块的应用
date: 2018-05-15 17:45:19
tags:
---

## 编码

- node为了能操作文件，专门提供了转换文件读写的模块fs
- 文件的内容都是二进制、八进制、十六进制
- node读取文件的结果默认是16进制，因为二进制太长了。


## 进制转换

- 二进制 0b
- 八进制 0
- 十六进制 0x

一个字节8位，是2^8-1 = 255，node表现的是16进制，最大是0xff(15*16 + 15)。

```
010  -> 8
0x10 -> 16
0b10 -> 2
```

- 看编码，utf8,汉字占3个字节，英文占1个字节
- 所有的编码都是utf8,node不支持gbk，乱码

## 编码的转换 (base64)

- 图片转base64，不会发生http请求。
- 简单的编码转换，没有加密。
- 转base64后，体积会扩大 1/3
- fileReader
- 2**3 表示 2^3

utf8中一个汉字3个字节，base64规范要求每个字节不超过64，即00111111( 2**6 - 1 = 63)。将 3*8 -> 4*6的格式。

```javascript
// 十进制转2进制，可以任意进制的转换
(11).toString(2)
(0x11).toString(8)

// 1011当作2进制进行转换为10进制
parseInt('1011', 2)

// 读取图片为base64
let btn = document.querySelector('#btn')
let file = document.querySelector('#file')
btn.onclick = function () {
    let r = new FileReader()
    console.dir(file)
    r.readAsDataURL(file.files[0])
    r.onload = function (e) {
        let img = new Image
        img.src = e.target.result
        document.body.appendChild(img)
        console.log(e.target.result)
    }
}
```

Base64编码要求把3个8位字节（3*8=24）转化为4个6位的字节（4*6=24），之后在6位的前面补两个0，形成8位一个字节的形式。 如果剩下的字符不足3个字节，则用0填充，输出字符使用‘=’，因此编码后输出的文本末尾可能会出现1或2个‘=’。

```javascript
// Z转换base64成Wg==
let b = Buffer.from('Z')

let c = (0x5a).toString(2)

console.log(c)
// 1011010 + = + = -> 00010110 + 00100000 + = + =
console.log(parseInt('00010110', 2)) // W
console.log(parseInt('00100000', 2)) // g
```

### 转base64的过程

```javascript
// 好 -> base64

let a = Buffer.from('好');  //<Buffer e5 a5 bd>
console.log(a)

// 转2进制
console.log((0xe5).toString(2)) // 11100101
console.log((0xa5).toString(2)) // 10100101
console.log((0xbd).toString(2)) // 10111101

// -> 00111001 00011010 00010110 00111101
console.log(parseInt('00111001', 2))  // 57
console.log(parseInt('00011010', 2))  // 26
console.log(parseInt('00010110', 2))  // 22
console.log(parseInt('00111101', 2))  // 61

let str = ''
for (let i = 65; i < 91; i++) {
    str += String.fromCharCode(i)
}

str += str.toLowerCase()
str += '0123456789'
str += '+/'

console.log(str[57] + str[26] + str[22] + str[61])  //5aW9
```

## Buffer

不建议使用`new Buffer()`了。

- 缓存，它的展现方法是16进制，16进制短。
- node中的buffer可以和字符串转换。

### 声明buffer

**1.声明**

Buffer声明后不能更改长度。

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

**2.截取slice**

```javascript
// 拷贝的是内存空间
let arr = [1, {name:'zs'}, 2]
let newArr = arr.slice(1, 2)
newArr[0].name = 'hello'
arr[1].name  //'hello' 浅拷贝

// slice浅拷贝
let buffer = Buffer.from([0,1,2])
let newBuffer = buffer.slice(0,1)
newBuffer[0] = 100  // 0x64
console.log(buffer) // <Buffer 64 01 02>

Buffer.from('你好').slice(0, 3).toString() // 你
```

Buffer一旦声明，就不能增加长度。

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

文件标志符fb: 打开文件时会生成一个文件标志符号，`node`的`process`默认占用了`0,1,2`，所以自己操作的文件标志从3开始。

- `process.stdin`: 0
- `process.stdout`: 1
- `process.stderr`: 2


- `fs.read(fb, buffer, offset,length,position,callback)`:通过fb读取数据
- fs.open
- fs.write
- `fs.fsync`： 同步磁盘缓存


fs遍历算法