# 网络请求与表单

## 简介

## XMLHttpRequest 对象

1. 简述 ajax，及其代码流程？
   ajax 就是利用 XMLHttpRequest 对象向后端发送请求，返回数据并处理的技术，整个过程无需刷新页面。
   代码流程如下：创建 ajax 对象 -> open() -> 监听事件，readyState 为 4，且响应码是 2 开头或 304 -> send() 发送请求。

2. ajax 对象的属性
   - 说说 readyState 的几种状态，分别是什么意思?
     0: 请求还没有初始化，open 之前
     1: 建立连接，open 后
     2: 请求已接受,send 后
     3: 正在处理请求
     4: 请求已完成，且响应已准备好
   - response 是什么，类型可以是哪些，怎么设置类型？
   - responseType 的作用？
   - responseText 属性是什么？服务器以文本字符的形式返回
   - responseXML 属性是什么？以 XMLDocument 对象方式返回
   - 常用的 status 有哪些，分别是什么意思?
   - statusText 和 status 的区别？
   - timeout 的作用?
3. ajax 对象的方法
   - open()：说说它的参数?
     open 的第一个参数是请求方法，注意要大写，否则有些浏览器无法处理请求。如果是同步，不必使用函数，不过不推荐，体验不好，而且 Firefox 30.0 已经废弃同步请求。最好在回调里使用 try...catch，因为通信错误（如果服务器宕机）会抛出错误。
   - overrideMimeType()和 responseType
   - 发送和接收二进制数据
4. ajax 的事件有哪些？(8 个)
5. withCredentials 是什么，怎么用?
6. 怎么获取服务器所有响应头信息和某字段头信息？所有头信息的格式？如果头信息字段重名会怎么样？
7. http 请求方式有哪些，get 和 post 的区别?
8. send()的参数类型有哪些?
9. setRequestHeader() 什么时候用?如果多次设置同一字段这个字段的值是什么?怎么解决 post 乱码问题?
10. 怎么通过 overrideMimeType()接受二进制数据？接受二进制数据更好的方式是什么？
11. form 表单提交的四种格式，以及数据在浏览器面板里的样子?
12. 什么是同源策略
13. 跨域的不同窗口通信解决方案有哪些，分别的原理，实战？优缺点？
14. 什么是同源？非同源什么会限制？每种限制分别的解决方法？（考虑完全不同源的情况）
15. window.postMessage 怎么用？通过它读写其它窗口的 localStorage。
16. ajax 跨域的解决方案和原理？各种方案的优点和缺点？

## 表单提交

## 同源政策

同源是指协议、端口、域名都相同。如果有一个不同，浏览器将会在某些方法做一些限制。具体限制的地方有：

1. 本地数据无法获取：cookie、localStorage、indexedDB。
2. dom 无法获取。
3. ajax 请求无效，可以发送，但是浏览器拒绝响应。

> 为什么浏览器要使用同源策略呢？

同源策略的目的，是为了保证用户信息的安全，防止恶意网站窃取数据。

比如如果没有同源限制，恶意网站 B 网站可以嵌套 iframe 来获取 A 网站的 Cookie，得到 Cookie 后，攻击者往往就可以直接登录了。

> 为什么表单提交没有同源策略限制呢？

因为同源策略是为了阻止攻击者获取用户信息，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单提交并不会获取内容，所以可以跨域发起。同时这也说明跨域并不能阻止 CSRF 攻击，因为请求已经发出了。

## 跨域的解决方案

跨域的解决方法有很多:

- jsonp
- cors
- postMessage
- document.domain
- window.name
- location.hash
- http-proxy
- nginx
- websocket

虽然有这么多方法，但是线上项目一般使用`jsonp`和`cors`来解决跨域。

### jsonp

html 文档中的`<img>`和`<script>`标签不受同源策略限制，通过它们可以获取其它网站的资源。通过这个特点，可以实现跨域，具体如下：

```html
// 1. 先定义一个全局jsonp() 函数
<script>
  function jsonp(data) {
    // do...
  }
</script>

// 2. 获取跨域js脚本，接口返回 jsonp({name:'zs'})，会执行上面的 jsonp 函数
<script src="b.com/getUser?callback=jsonp"></script>
```

上面代码中，我们先定义好一个`jsonp()`方法(随便什么名字，要和后端约定好，或者通过 get 参数`callback=jsonp`传给后端)，然后请求其它网站的接口如 getUser(script 标签会默认解析为 js)。getUser 接口会返回代码`jsonp({name:'zs'})`会被执行。所以也就执行了我们预先定义好的 jsonp 方法里的逻辑。

简单实现一个 jsonp 方法。

```javascript
async function jsonp(opt) {
  let { url, params, callback } = opt;
  let script = document.createElementS;
  return callback();
}

jsonp({
  url: "b.com/b.js",
  params: {},
  callback: "show",
}).then((data) => {});
```

采用 jsonp 的方法实现跨域，它的优点是：

- 浏览器都兼容
- 数据直接是对象，不需要解析

缺点是：

- 只能发 get 请求，不支持 post。
- url 有长度限制。
- 不安全，可能别人的 js 文件里可能有攻击代码 xss。

### CORS

`CORS`全称是`cross-origin resource sharing`，目的是解决跨域的问题。它需要前后端都支持，IE 8 和 9 需要通过 XDomainRequest 来实现。

对于服务端来说，需要设置 header 的`Access-Control-Allow-Origin`。

```javascript
// 写*不能携带cookie
res.setHeader("Access-Control-Allow-Origin", "http://localhost:63342");

// 如果是非简单请求，则会先发 OPTIONS 预检，看服务器是否支持这个方法、是否支持自定义的头
res.setHeader("Access-Control-Allow-Methods", "PUT");
res.setHeader("Access-Control-Allow-Headers", "a"); // 前端a必须要有，否则报错

// 跨域默认情况下，前端 xhr 对象只能拿到一些最基本的响应头，如果要访问其它头，需要设置
res.setHeader("Access-Control-Expose-Headers", "a");

// 预检请求的有效期，在这么多秒内，不再发预检
res.setHeader("Access-Control-Max-Age", "1");
if (req.method === "OPTIONS") {
  res.statusCode = 200;
  return res.end("ok");
}
```

CORS 将根据简单请求和非简单请求，会增加一些设置。

简单请求的要求是：

1. 请求方法是 GET、HEAD、POST 中的一个。
2. Content-Type 的值是`text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`中的一个。
3. XMLHttpRequestUpload 对象没有注册任何事件监听器，XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
4. 请求中没有使用 ReadableStream 对象。
5. 不能人为设置 Accept、Accept-Language、Content-Language 、Content-Type。

与简单请求相反的就是非简单请求。非简单请求将首先发送预检 OPTIONS 请求，来查看服务器是否支持跨域请求。

默认情况下，跨域是不发送 Cookie 的，可以设置`xhr.withCredentials = true`以支持。

```javascript
document.cookie = "name=zs";
xhr.withCredentials = true;

res.setHeader("Access-Control-Allow-Credentials", true);

// unsafe headers 允许前端获取哪个头
res.setHeader("Access-Control-Expose-Headers", "name");
```

### postMessage

html5 引入了`window.postMessage`。允许跨窗口通信，不论这两个窗口是否同源。

```
postMessage(msg, origin)
```

postMessage 方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为\*，表示不限制域名，向所有窗口发送。

父窗口和子窗口都可以通过 message 事件，监听对方的消息。

**a.html**

```js
// a.html
<iframe src="http://localhost:4000/b.html" id='frame' frameborder="0" onload="load()"></iframe>
<script>
    function load() {
        const frame = document.getElementById('frame')
        frame.contentWindow.postMessage('hello', 'http://localhost:4000')
        // window.onmessage = (e) => {
        //     console.log(e.data)
        // }
    }
</script>
```

**localhost:4000/b.html**

```js
window.onmessage = function (e) {
  console.log("b", e.data);
  // e.source.postMessage('收到了')
};
```

事件对象的常用属性如下：

- `event.source`：发送消息的窗口
- `event.origin`: 消息发向的网址，可以通过它过滤不是发给本窗口的消息。
- `event.data`: 消息内容

### window.name

### hash

就是通过父窗口改变子窗口的 hash，然后子窗口监听到 hash 变化，拿到数据。同理子窗口也可以改变父窗口 hash。主要用于 iframe。

```js
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

### document.domain

`document.domain`方法只适合 iframe 下子窗口读取父窗口的 cookie。

### websocket

http 缺陷：只能客户端发请求。 如果要更新，需要轮询。效率低，浪费资源。

websocket 是 tcp 协议，没有跨域问题

- http://javascript.ruanyifeng.com/htmlapi/websocket.html
- https://www.zhihu.com/question/20215561

## 图片上传

图片上传是一个很常见的需求，常见的处理方法有下面几种：

1、传统的表单提交
2、ajax + ReadFile() 将图片转成 base64 格式数据
3、ajax + FormData() 还是通过原始图片格式上传
4、百度 webUploader 图片上传插件

### 传统的 file input

通过 form type=file 的方法提交。

### ajax + ReadFile()

将图片转成 base64 格式数据

### ajax + FormData()

html5 提供了一个 FormData 类，它可以将表单数据序列化（包括图片），和 ajax 联合使用，这样页面就不会跳转，用户体验也很好。这个和传统表单提交时发送的图片格式是一样的。

```
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

需要安卓修改 webview。

## mime 类型

浏览器通常使用 mime 类型(而不是文件扩展名)来确定如何处理文件，对于未知的类型，浏览器会以附件的形式(下载)处理。因此服务器设置正确 mime 类型很重要。

比如`<link type="text/plain" href='1.css' />`，浏览器并不能解析 1.css。

mime 类型的语法是`type/subtype`。由类型和子类型组成。大小写不敏感，通常小写。它分为独立类型和 multipart 类型。

**独立类型**

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

**multipart 类型**

```
multipart/form-data
multipart/byteranges
```

### application/octet-stream

这是应用程序文件的默认值。意思是 未知的应用程序文件 ，浏览器一般不会自动执行或询问执行。浏览器会像对待 设置了 HTTP 头 Content-Disposition 值为“附件”的文件一样来对待这类文件。

### text/plain

文本文件默认值。意思是 未知的文本文件 ，浏览器认为是可以直接展示的。但是比如`<link>`里类型如果是`text/plain`，浏览器不会将它解析成 css 文件，除非是`text/css`。

### text/css

注意服务器经常不会分辨使用.css 后缀的 css 文件，并将其 mime 类型设置为 text/plain 或 application/octet-stream 发送。这样浏览器就不能解析了。

### text/html

所有的 html 文件都需要使用这种类型。

### 图片类型

`image/gif`， `image/jpeg`， `image/png`, `image/svg+xml`。有最新的`image/webp`类型，但是增加新类型不但会增加代码，而且可能带来安全问题。所以浏览器供应商十分小心。另外还有`image/x-icon`类型，比如 favicons。

### 音频和视频类型

### multipart/form-data

`multipart/form-data`可以用于 html 表单从浏览器发送数据给服务器。它由边界线(--开头的字符串)划分不同部分组成。每个部分都有自己的实体、http 请求头、Content-Disposition 和 Content-Type 用于文件上传领域，最常用的 (Content-Length 因为边界线作为分隔符而被忽略）。

### MIME 嗅探

可以使用浏览器可以通过请求头 Content-Type 来设置 X-Content-Type-Options 以阻止 MIME 嗅探。

### 其他检查文件类型的方法

除了 mime 类型，还有其它绝对文件类型的方法：如后缀和文件标志，比如 47 49 46 38 十六进制值[GIF89]或 89 50 4E 47 [.PNG]的 PNG 文件开头。但是都不可靠。

## 面试题

1. 对跨域的了解?
1. 跨域怎么解决，有没有使用过 Apache 等方案?
1. 文件上传如何做断点续传?
1. 表单可以跨域吗?
1. 通过什么做到并发请求?
1. 介绍 service worker?
1. 前后端通信使用什么方案?
1. RESTful 常用的 Method?
1. 介绍下跨域?
1. 如何解决跨域问题?
1. ajax 如何处理跨域?
1. CORS 如何设置?
1. jsonp 为什么不支持 post 方法?
1. 介绍同源策略?
1. Access-Control-Allow-Origin 在服务端哪里配置?
1. Ajax 发生跨域要设置什么（前端）?
1. 加上 CORS 之后从发起到请求正式成功的过程?
1. 异步请求，低版本 fetch 如何低版本适配?
1. get 和 post 有什么区别?
1. jsonp 方案需要服务端怎么配合?
1. formData 和原生的 ajax 有什么区别?
1. 介绍下表单提交，和 formData 有什么关系?
1. 服务端怎么做统一的状态处理?

- 写一个简单的`ajax`库。
- 学习`zepto`的`ajax`源代码。
- `$.Deferred`的实现，再看看 Promise。
- 通过两种方式`FormData`和`file api`分别实战文件上传？

## 参考资料

- 极客时间：趣谈网络协议
- http://javascript.ruanyifeng.com/bom/ajax.html
- http://javascript.ruanyifeng.com/bom/same-origin.html
- http://javascript.ruanyifeng.com/bom/cors.html
- http://javascript.ruanyifeng.com/htmlapi/websocket.html
- https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX
- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
- [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
- [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition)
- [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)
- [zepto 源码](https://github.com/madrobby/zepto)
- [CORS 通信](http://javascript.ruanyifeng.com/bom/cors.html)
- [HTTP 访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#)
- http://javascript.ruanyifeng.com/bom/same-origin.html
- [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
- [启用了 CORS 的图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)
- [window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

XMLHttpRequest 有 2 种方式提交表单：

- 使用 ajax：复杂但是灵活
- 使用 FormData：简单但是无法将数据用 JSON.stringify()转成 json 字符串。

## 使用 ajax

一般的表单，如果不用 FormData，也不会用其它的 API，除非要上传文件，需要使用 FileReader。

`<form>`可以用下面四种方式发送：

1. post，且 enctype 是 application/x-www-form-urlencoded（默认）
1. post，且 enctype 是 text/plain
1. post，且 enctype 是 multipart/form-data
1. get

如果一个表单有 2 个字段 foo 和 baz，那么上面对应的编码数据分别是：

```
// Content-Type: application/x-www-form-urlencoded
foo=bar&baz=The+first+line.&#37;0D%0AThe+second+line.%0D%0A

// Content-Type: text/plain
foo=bar
baz=The first line.
The second line.

// Content-Type: multipart/form-data; boundary=---------------------------314911788813839
-----------------------------314911788813839
Content-Disposition: form-data; name="foo"
bar
-----------------------------314911788813839
Content-Disposition: form-data; name="baz"
The first line.
The second line.
-----------------------------314911788813839--

// get
?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
```

上面的转码都是在提交 form 时浏览器自动完成。但是如果要用 ajax 来实现，就需要自己实现。具体实现代码如下：

1. `input=button`不会提交表单
2. input 没有 name 属性，这个字段不会提交

## FormData

使用 FormData 提交表单十分简单，它和`<form enctype="multipart/form-data">`提交的数据格式是一样的，而且可以上传文件。

```
<form enctype="multipart/form-data" method="post" name="fileinfo">
  <label>Your email address:</label>
  <input type="email" autocomplete="on" autofocus name="userid" placeholder="email" required size="32" maxlength="64" /><br />
  <label>Custom file label:</label>
  <input type="text" name="filelabel" size="12" maxlength="32" /><br />
  <label>File to stash:</label>
  <input type="file" name="file" required />
  <input type="submit" value="Stash the file!" />
</form>
<div></div>

var form = document.forms.namedItem("fileinfo");
form.addEventListener('submit', function(ev) {

  var oOutput = document.querySelector("div"),
      oData = new FormData(form);

  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "stash.php", true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
      oOutput.innerHTML = "Uploaded!";
    } else {
      oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
    }
  };

  oReq.send(oData);
  ev.preventDefault();
}, false);
```

上面的代码会自动将 form 表单的数据生成 FormData，然后发送。

下面是 FormData API 的详细介绍。

### FormData API

**append()**

append()方法可以追加要传给后台的表单字段。语法是：

```
append(name, value)
append(name, value, filename)
```

name 是表单的字段名。value 是值，还可以是 File 或 Blob 类型。如果是 File 或 Blob 类型，则可以指定其文件名。Blob 的默认文件名是'blob'。

```
formData.append('name', '张三')
formData.append('age', 12) // 12会转为'12',非file或blob类型会转成字符串
formData.append('pic[]', f.files[0], '1.jpg')
```

**delete()**

可以删除指定的键值对，参数是要删除的 Key 的名字。

```
formData.delete('age')
```

**entries()**

返回 iterator 对象，可以遍历 FormData 中的键值对。

```
var formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

for(var pair of formData.entries()) {
   console.log(pair[0]+ ', '+ pair[1]);
}

// 执行结果
key1, value1
key2, value2
```

**get()**

用于获取某个键的第一个值。

```
formData.append('name', '李四')
formData.get('name'); // "张三"
```

**getAll()**

获取某个键的所有的值。

```
formData.getAll('name') // ['张三','李四']
```

**has()**
**keys()**
**set()**

用于修改值，如果不存在，则添加。而 append()是在该 key 最后追加一个值。

```
formData.set('username', 'Chris');
formData.set('userpic', myFileInput.files[0], 'chris.jpg');
```

### jQuery 里使用 FormData

在`jquery`里使用`FormData`需要注意设置`processData`和`contentType`为`false`。

```
var fd = new FormData(document.querySelector("form"));
fd.append("CustomField", "This is some extra data");
$.ajax({
  url: "stash.php",
  type: "POST",
  data: fd,
  processData: false,  // 不处理数据
  contentType: false   // 不设置内容类型
});
```

**values()**

和 entries()类似。

## 参考资料

- [FormData 对象的使用](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)
- [FormData API](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

# 提交表单和上传文件 - 总结

1. `html <form>`提交表单的四种方式？

2. 根据上面的方式写一个 ajax 提交表单库。包含文件上传。

3. 描述 FormData

4. 描述文件 API，File 和 FileReader。

5. 上传进度。

html5 为我们提供了读取文件内容的接口，这样为我们的开发提供了一些遍历，比如文件上传时可以轻松的显示缩略图。获取上传文件的大小等等。

和文件相关的 API 有 Blob、File、FileReader。

**目录：**

- [Blob](#Blob)
- [File](#File)
- [FileReader](#FileReader)

## Blob

Blob 全称是`binary large object`，即二进制大型文件，可以存二进制的容器。Blob 通常是视频、声音或多媒体文件。js 里的 Blob 是一个底层 API，文件就是基于它的。

1. 创建 Blob 对象

要从其它非 Blob 对象和数据创建一个 Blob，需要使用 Blob()构造函数。 语法是：

```
var blob = new Blob(array, options)
```

`array`是一个由`ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString` 等对象构成的 `Array`，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings 会被编码为 UTF-8。

`options`有两个属性，`type`默认是`""`，表示放入`blob`中的数组内容的 mime 类型。`endings`，表示结束符\n 如何被写入。默认是`transparent`，表示结束符不变，`native`表示更改为适合操作系统的换行符。

```
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)],
  {type : 'application/json'});

console.log(blob.size)
console.log(blob.type)  // 'application/json'
```

获取 blob 的尺寸，使用 size 属性。获取 mime 类型，使用 type 属性，如果类型未知，则为空字符串。

2.要创建一个包含子 Blob 对象的 Blob，可以使用 slice()

```
var blob = instanceOfBlob.slice([start [, end [, contentType]]]};
```

start 表示 Blob 里的开始下标。end 如果是负数，则是倒数第几个字节。contentType 默认是空字符串，表示给新 Blob 设置的文档类型。

3. 读取 blob 信息

获取用户系统上的文件 Blob 对象，要使用 File API。从 Blob 中读取内容的唯一方式是使用 FileReader。

```
var reader = new FileReader();
reader.addEventListener("loadend", function() {
   // reader.result 包含转化为类型数组的blob
});
reader.readAsText(blob);
```

## File

元素`<input type='file'>`在选择图片后，它的 files 属性会返回选择图片的相关信息。

![files](./_img/files.png)

可以看到，它是一个 FileList 对象，是一个类数组，由多个 File 对象组成。File 对象是一种特殊的 Blob，可以通过 FileReader，URL.createObjectURL()，createImageBitmap()及 XMLHttpRequest.send()处理 Blob 和 File。

从上图可以知道，file 对象的一些属性：

- File.lastModified：只读，返回文件最后修改时间，自 1970 年 1 月 1 日 0:00 的毫秒数
- File.lastModifiedDate：只读，返回最后修改的 Date 对象
- File.name：返回文件的名字
- File.size：返回文件的大小，单位是 Byte
- File.type：返回文件的 mime 类型
- File.webkitRelativePath：这是个 chrome 下私有属性，结合下面代码了解。

```
<input type="file" id="filepicker" name="fileList" webkitdirectory multiple/>
<ul id="listing"></ul>
<script>
    document.getElementById("filepicker").addEventListener("change", function (event) {
        let output = document.getElementById("listing");
        let files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            let item = document.createElement("li");
            item.innerHTML = files[i].webkitRelativePath;
            output.appendChild(item);
        }
    }, false);
</script>
```

当 input 没有设置 webkitdirectory（上传目录里所有文件）时，选择单文件，或多文件。webkitRelativePath 都是空字符串。当加上 webkitdirectory 后，选择一个目录点击上传，webkitRelativePath 显示所有文件相对于选择目录的路径。比如选择 style 目录，点击上传，显示结果如下图。

![relativePath](./_img/relativepath.png)

File 接口没有定义任何方法，但是继承了 Blob 接口的方法。

## FileReader

FileReader 可以用来异步读取 File 对象的信息。比如我们需要在文件上传时显示上传的图片。

```
<input type="file" class="file">
<img src="" alt="" class="preview">
<button type="button" class="btn">点击</button>
<script>
    var file = document.querySelector('.file')
    var preview = document.querySelector('.preview')
    var btn = document.querySelector('.btn')

    btn.onclick = function (e) {
        var f = file.files[0]
        var reader = new FileReader()
        reader.onload = function (e) {
            console.log(e.target === this) // true
            preview.src = e.target.result
        }
        reader.readAsDataURL(f)
    }
</script>
```

![files](./_img/readasurl.png)

接着来详细了解 FileReader 的属性和方法。

通过 new FileReader()创建一个 FileReader 对象。它读取文件相关的方法如下：

- readAsArrayBuffer()：以 buffer 形式读。
- readAsBinaryString()：以二进制形式读。
- readAsDateURL()：以 data:URL 格式读，比如图片读出来就是 base64 格式。
- readAsText()：以文本形式读。
- abort()：中止读取操作，在返回时，readyState 属性为 DONE。

在开始读之前，我们需要先监听 FileReader.readyState 的变化，这点和 ajax 类型。可用事件如下：

- onabort：读取中止时触发。
- onerror：读取发生错误时触发。
- onload：读取完成时触发。
- onloadstart：开始读取时触发。
- onloadend：读取结束时触发，不管成功还是失败。
- onprogress：读取时触发。

FileReader.readyState 可能值如下：

- 0，EMPTY 还没有加载任何数据
- 1，LOADING 数据正在加载
- 2，DONE 完成全部请求

最后的读取结果是`FileReader.result`。如果发生错误，会抛出一个`DOMException`，信息储存在`FileReader.error`中。

## URL.createObjectURL()

URL.createObjectURL(blob)接受一个 blob 或 file 对象，创建一个对象的本地 url。

```
var src = URL.createObjectURL(file.files[0])
preview.src = src

// 结果
blob:http://localhost:63342/35e2dba0-b306-4a6f-a755-5339f398eff9
```

## createImageBitmap

`window.createImageBitmap`是一个全局属性。待研究。

## 参考资料

- [MDN file api](https://developer.mozilla.org/zh-CN/docs/Web/API/File)
- [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
- [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
- [self.createImageBitmap()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap)
