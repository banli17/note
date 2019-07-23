---
title: "ajax知识总结"
date: 2016-09-03 22:16:59
tags:
toc: true
---

![](./ajax/1.svg)

## 基础

**阅读资料回答问题**
- http://javascript.ruanyifeng.com/bom/ajax.html
- http://javascript.ruanyifeng.com/bom/same-origin.html
- http://javascript.ruanyifeng.com/bom/cors.html
- http://javascript.ruanyifeng.com/htmlapi/websocket.html
- https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX
- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

1. 简述ajax，及其代码流程？
ajax就是利用XMLHttpRequest对象向后端发送请求，返回数据并处理的技术，整个过程无需刷新页面。
代码流程如下：创建ajax对象 -> open() -> 监听事件，readyState为4，且响应码是2开头或304 -> send() 发送请求。

2. ajax对象的属性
    - 说说readyState的几种状态，分别是什么意思?
    0: 请求还没有初始化，open之前
    1: 建立连接，open后
    2: 请求已接受,send后
    3: 正在处理请求
    4: 请求已完成，且响应已准备好
    - response是什么，类型可以是哪些，怎么设置类型？
    - responseType的作用？
    - responseText属性是什么？服务器以文本字符的形式返回
    - responseXML属性是什么？以 XMLDocument 对象方式返回
    - 常用的status有哪些，分别是什么意思?
    - statusText和status的区别？
    - timeout的作用?
3. ajax对象的方法
    - open()：说说它的参数?
    open的第一个参数是请求方法，注意要大写，否则有些浏览器无法处理请求。如果是同步，不必使用函数，不过不推荐，体验不好，而且Firefox 30.0已经废弃同步请求。最好在回调里使用try...catch，因为通信错误（如果服务器宕机）会抛出错误。
    - overrideMimeType()和responseType
    - 发送和接收二进制数据
4. ajax的事件有哪些？(8个)
5. withCredentials是什么，怎么用?
6. 怎么获取服务器所有响应头信息和某字段头信息？所有头信息的格式？如果头信息字段重名会怎么样？
7. http请求方式有哪些，get和post的区别?
8. send()的参数类型有哪些?
9. setRequestHeader() 什么时候用?如果多次设置同一字段这个字段的值是什么?怎么解决post乱码问题?
10. 怎么通过overrideMimeType()接受二进制数据？接受二进制数据更好的方式是什么？
11. form表单提交的四种格式，以及数据在浏览器面板里的样子?
12. 什么是同源策略
13. 跨域的不同窗口通信解决方案有哪些，分别的原理，实战？优缺点？
14. 什么是同源？非同源什么会限制？每种限制分别的解决方法？（考虑完全不同源的情况）
15. window.postMessage怎么用？通过它读写其它窗口的localStorage。
16. ajax跨域的解决方案和原理？各种方案的优点和缺点？

## 表单提交

## 图片上传

3. 方案有哪些？

- jsonp
- cors
- postMessage
- document.domain
- window.name
- location.hash
- http-proxy
- nginx
- websocket



## 浏览器的同源策略

## 跨域的解决方案

### jsonp

html中的img和script标签不受同源策略限制，所以通过script标签可以解决跨域问题。原理如下：

```html
先定义一个全局jsonp() 函数
<script>
    function jsonp(data){
        // 数据
    }
</script>

获取跨域js脚本，内容为 jsonp({name:'zs'})，会执行上面的函数
<script src='b.com/b.js'></script>
```

像上面这样，就可以执行之前定义好的jsonp()方法了，data就是b.js里的数据。

简单实现一个jsonp方法。

```javascript
function jsonp(opt){
    let {url, params, callback} = opt
}

jsonp({
    url: 'b.com/b.js',
    params: {},
    callback: 'show'
}).then(data=>{})
```

采用jsonp的方法实现跨域，优点和缺点如下：

优点：
- 浏览器兼容
- 数据直接是对象，不用解析

缺点：
- 只能发get请求，不支持post
- url有长度限制
- 不安全，可能别人的js里有攻击代码xss

### cors

`cors`全称是`cross-origin resource sharing`，目的是解决跨域的问题。

它需要前后端都支持，ie10以下不支持cors。

服务器端，需要设置header的Allow.. origin: * 或 请求源

```javascript
// 写*不能携带cookie
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342')

// 如果是非简单请求，则会先发 OPTIONS 预检，看服务器是否支持这个方法、是否支持自定义的头
res.setHeader('Access-Control-Allow-Methods', 'PUT')
res.setHeader('Access-Control-Allow-Headers', 'a')

// 预检请求的有效期，在这么多秒内，不再发预检
res.setHeader('Access-Control-Max-Age', '1')
if (req.method === 'OPTIONS') {
    res.statusCode = 200
    return res.end('ok')
}
```

cors分为简单请求和非简单请求。

cookie默认不能跨域，要设置

```javascript
document.cookie = 'name=zs'
xhr.withCredentials= true

res.setHeader('Access-Control-Allow-Credentials', true)

// unsafe headers 允许前端获取哪个头
res.setHeader('Access-Control-Expose-Headers', 'name')
```

## postMessage


## window.name

## hash

## document.domain


### websocket


http缺陷：只能客户端发请求。 如果要更新，需要轮询。效率低，浪费资源。

websocket 是 tcp协议，没有跨域问题

http://javascript.ruanyifeng.com/htmlapi/websocket.html
https://www.zhihu.com/question/20215561

## 参考资料

- [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)


## 进阶

- 写一个简单的`ajax`库。
- 学习`zepto`的`ajax`源代码。
- `$.Deferred`的实现，再看看Promise。
- 通过两种方式`FormData`和`file api`分别实战文件上传？

## 参考资料

- [zepto源码](https://github.com/madrobby/zepto)
    

参考资料：
- [CORS通信](http://javascript.ruanyifeng.com/bom/cors.html)
- [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#)
服务器和浏览器模型
使用nodeJS搭建服务器
使用nodeJS建传统的网站
request的7种方式
HTTP协议详解
XMLHttpRequest对象详细介绍
promise版的Ajax库(jQuery源码级)
数据处理及JSONP数据绑定
JSONP和其它跨域技术
用jQuery实现Ajax





图片上传是一个很常见的需求，常见的处理方法有下面几种：

1、传统的表单提交
2、ajax + ReadFile() 将图片转成 base64 格式数据
3、ajax + FormData() 还是通过原始图片格式上传
4、百度 webUploader 图片上传插件 

## 实现

下面就使用代码来说明。

## 传统的表单提交

通过 form input=type 的方法提交。

## ajax + ReadFile()将图片转成 base64 格式数据

## ajax + FormData()

html5 提供了一个 FormData类，它可以将表单数据序列化（包括图片），和ajax联合使用，这样页面就不会跳转，用户体验也很好。这个和传统表单提交时发送的图片格式是一样的。
```markup
<form id="uploadForm">
    <input class="weui-uploader__input" type="file" accept="image/*"
           multiple=""
           name="file"
           @change="uploadImage"
    >
</form>

$.ajax({
    type: 'post',
    url: this.state_api.common.uploadImg,
    data: new FormData(document.getElementById('uploadForm')),
    contentType: false,   // 必须
    processData: false,   // 必须
    async: false,
    cache: false,
    dataType: "json",
    success: function (data) {
        _this.images.push(data.data)
    }
});
```

## 遇到的一些坑

1、使用 thinkphp 做为后台，在移动端上传图片时，提示"文件类型不符合要求"。
这是由于 thinkphp 后端判断图片类型时是判断的文件后缀，而不是根据文件的前几个字节来判断类型的。需要修改。

2、移动端有的手机点击 input type='file'按钮没反应。此问题还没有解决。


# 同源政策

- 协议、端口、域名相同则是同源

**限制**
- 本地数据无法获取：cookie、localStorage、indexedDB
- dom无法获取
- ajax请求无效，可以发送，但是浏览器拒绝响应


`document.domain`的用途？服务器怎么设置也可以达到效果？

这种方法只适合iframe下子窗口读取父窗口的cookie。
其它情况下读取不到cookie，比如父窗口window.onload后读取子窗口的cookie。或者是先访问a.a.com，再访问b.a.com

对于iframe或window.open获取子窗口dom，报错。可以设置document.domain解决

完全不同源通信：
- 片段识别符：就是通过父窗口改变子窗口的hash，然后子窗口监听到hash变化，拿到数据。同理子窗口也可以改变父窗口hash。
```
// a.com
<button class="btn">点击</button>
<iframe src="http://www.b.com/index.html"></iframe>
<script>
    document.querySelector('.btn').onclick = function(){
        document.querySelector('iframe').src += '#' + 'hello=1'
    }
</script>

// b.com
window.onhashchange = function(e){
	console.log('hash change', location.hash)
}
```
- 跨文档通信API
html5为了解决这个问题，引入了window.postMessage。允许跨窗口通信，不论这两个窗口是否同源。
postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为*，表示不限制域名，向所有窗口发送。
父窗口和子窗口都可以通过message事件，监听对方的消息。
event.source：发送消息的窗口
event.origin: 消息发向的网址，可以过滤不是发给本窗口的消息。
event.data: 消息内容
```
window.addEventListener('message', function(e) {
  console.log(e.data);
},false);
```

- http://javascript.ruanyifeng.com/bom/same-origin.html
- [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
- [启用了 CORS 的图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)
- [window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)



浏览器通常使用mime类型(而不是文件扩展名)来确定如何处理文件，对于未知的类型，浏览器会以附件的形式(下载)处理。因此服务器设置正确的相应mime类型很重要。

比如`<link type="text/plain" href='1.css' />`，浏览器并不能解析1.css。

mime类型的语法是`type/subtype`。由类型和子类型组成。大小写不敏感，通常小写。

它分为独立类型和multipart类型。

独立类型有：

```
text/plain   // 未知的文本类型
text/html
image/jpeg
image/png
audio/mpeg
audio/ogg
audio/*
video/mp4
application/octet-stream  // 未知的二进制类型
```

multipart类型有：
```
multipart/form-data
multipart/byteranges
```

## 重要的mime类型

### application/octet-stream

这是应用程序文件的默认值。意思是 未知的应用程序文件 ，浏览器一般不会自动执行或询问执行。浏览器会像对待 设置了HTTP头Content-Disposition 值为“附件”的文件一样来对待这类文件。

### text/plain

文本文件默认值。意思是 未知的文本文件 ，浏览器认为是可以直接展示的。但是比如<link>里类型如果是`text/plain`，浏览器不会将它解析成css文件，除非是`text/css`。

### text/css

注意服务器经常不会分辨使用.css后缀的css文件，并将其mime类型设置为text/plain 或 application/octet-stream 发送。这样浏览器就不能解析了。

### text/html

所有的html文件都需要使用这种类型。

### 图片类型

`image/gif`， `image/jpeg`， `image/png`, `image/svg+xml`。有最新的`image/webp`类型，但是增加新类型不但会增加代码，而且可能带来安全问题。所以浏览器供应商十分小心。另外还有`image/x-icon`类型，比如favicons。

### 音频和视频类型

### multipart/form-data

`multipart/form-data`可以用于html表单从浏览器发送数据给服务器。它由边界线(--开头的字符串)划分不同部分组成。每个部分都有自己的实体、http请求头、Content-Disposition和 Content-Type 用于文件上传领域，最常用的 (Content-Length 因为边界线作为分隔符而被忽略）。

## MIME 嗅探

可以使用浏览器可以通过请求头 Content-Type 来设置 X-Content-Type-Options 以阻止MIME嗅探。

## 其他传送文件类型的方法

除了mime类型，还有其它绝对文件类型的方法：如后缀和文件标志，比如47 49 46 38十六进制值[GIF89]或89 50 4E 47 [.PNG]的PNG文件开头。但是都不可靠。

## 参考资料

- [MIME类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition)
- [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)

