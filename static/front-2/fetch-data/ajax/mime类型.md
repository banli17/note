# mime类型

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






















































