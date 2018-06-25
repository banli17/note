# 文件File API

html5为我们提供了读取文件内容的接口，这样为我们的开发提供了一些遍历，比如文件上传时可以轻松的显示缩略图。获取上传文件的大小等等。

和文件相关的API有Blob、File、FileReader。

**目录：**
- [Blob](#Blob)
- [File](#File)
- [FileReader](#FileReader)

## Blob

Blob全称是`binary large object`，即二进制大型文件，可以存二进制的容器。Blob通常是视频、声音或多媒体文件。js里的Blob是一个底层API，文件就是基于它的。

1. 创建Blob对象

要从其它非Blob对象和数据创建一个Blob，需要使用Blob()构造函数。 语法是：

```
var blob = new Blob(array, options)
```

`array`是一个由`ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString` 等对象构成的 `Array`，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings会被编码为UTF-8。

`options`有两个属性，`type`默认是`""`，表示放入`blob`中的数组内容的mime类型。`endings`，表示结束符\n如何被写入。默认是`transparent`，表示结束符不变，`native`表示更改为适合操作系统的换行符。

```
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)],
  {type : 'application/json'});
  
console.log(blob.size)
console.log(blob.type)  // 'application/json'
```

获取blob的尺寸，使用size属性。获取mime类型，使用type属性，如果类型未知，则为空字符串。

2.要创建一个包含子Blob对象的Blob，可以使用slice()

```
var blob = instanceOfBlob.slice([start [, end [, contentType]]]};
```

start表示Blob里的开始下标。end如果是负数，则是倒数第几个字节。contentType默认是空字符串，表示给新Blob设置的文档类型。

3. 读取blob信息

获取用户系统上的文件Blob对象，要使用File API。从Blob中读取内容的唯一方式是使用FileReader。

```
var reader = new FileReader();
reader.addEventListener("loadend", function() {
   // reader.result 包含转化为类型数组的blob
});
reader.readAsText(blob);
```


## File

元素`<input type='file'>`在选择图片后，它的files属性会返回选择图片的相关信息。

![files](./_img/files.png)

可以看到，它是一个FileList对象，是一个类数组，由多个File对象组成。File对象是一种特殊的Blob，可以通过FileReader，URL.createObjectURL()，createImageBitmap()及XMLHttpRequest.send()处理Blob和File。

从上图可以知道，file对象的一些属性：

- File.lastModified：只读，返回文件最后修改时间，自1970年1月1日0:00的毫秒数
- File.lastModifiedDate：只读，返回最后修改的Date对象
- File.name：返回文件的名字
- File.size：返回文件的大小，单位是Byte
- File.type：返回文件的mime类型
- File.webkitRelativePath：这是个chrome下私有属性，结合下面代码了解。

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

当input没有设置webkitdirectory（上传目录里所有文件）时，选择单文件，或多文件。webkitRelativePath都是空字符串。当加上webkitdirectory 后，选择一个目录点击上传，webkitRelativePath显示所有文件相对于选择目录的路径。比如选择style目录，点击上传，显示结果如下图。

![relativePath](./_img/relativepath.png)

File接口没有定义任何方法，但是继承了Blob接口的方法。

## FileReader

FileReader可以用来异步读取File对象的信息。比如我们需要在文件上传时显示上传的图片。

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

接着来详细了解FileReader的属性和方法。

通过new FileReader()创建一个FileReader对象。它读取文件相关的方法如下：

- readAsArrayBuffer()：以buffer形式读。
- readAsBinaryString()：以二进制形式读。
- readAsDateURL()：以data:URL格式读，比如图片读出来就是base64格式。
- readAsText()：以文本形式读。
- abort()：中止读取操作，在返回时，readyState属性为DONE。

在开始读之前，我们需要先监听FileReader.readyState的变化，这点和ajax类型。可用事件如下：

- onabort：读取中止时触发。
- onerror：读取发生错误时触发。
- onload：读取完成时触发。
- onloadstart：开始读取时触发。
- onloadend：读取结束时触发，不管成功还是失败。
- onprogress：读取时触发。

FileReader.readyState可能值如下：

- 0，EMPTY  还没有加载任何数据
- 1，LOADING 数据正在加载
- 2，DONE  完成全部请求

最后的读取结果是`FileReader.result`。如果发生错误，会抛出一个`DOMException`，信息储存在`FileReader.error`中。

## URL.createObjectURL()

URL.createObjectURL(blob)接受一个blob或file对象，创建一个对象的本地url。

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