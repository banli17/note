---
title: "提交表单和上传文件"
date: 2016-08-31 23:15:12
tags:
toc: true
---


# 提交表单和上传文件

XMLHttpRequest有2种方式提交表单：
- 使用ajax：复杂但是灵活
- 使用FormData：简单但是无法将数据用JSON.stringify()转成json字符串。

## 使用ajax

一般的表单，如果不用FormData，也不会用其它的API，除非要上传文件，需要使用FileReader。

<form>可以用下面四种方式发送：
1. post，且enctype是application/x-www-form-urlencoded（默认）
1. post，且enctype是text/plain
1. post，且enctype是multipart/form-data
1. get

如果一个表单有2个字段foo和baz，那么上面对应的编码数据分别是：
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

上面的转码都是在提交form时浏览器自动完成。但是如果要用ajax来实现，就需要自己实现。具体实现代码如下：




1. `input=button`不会提交表单
2. input没有name属性，这个字段不会提交


## FormData

使用FormData提交表单十分简单，它和`<form enctype="multipart/form-data">`提交的数据格式是一样的，而且可以上传文件。

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
上面的代码会自动将form表单的数据生成FormData，然后发送。

下面是FormData API的详细介绍。

### FormData API

**append()**

append()方法可以追加要传给后台的表单字段。语法是：

```
append(name, value)
append(name, value, filename)
```
name是表单的字段名。value是值，还可以是File或Blob类型。如果是File或Blob类型，则可以指定其文件名。Blob的默认文件名是'blob'。

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

返回iterator对象，可以遍历FormData中的键值对。

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

用于修改值，如果不存在，则添加。而append()是在该key最后追加一个值。

```
formData.set('username', 'Chris');
formData.set('userpic', myFileInput.files[0], 'chris.jpg');
```

### jQuery里使用FormData

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

和entries()类似。

## 参考资料

- [FormData 对象的使用](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)
- [FormData API](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

# 提交表单和上传文件 - 总结

1. `html <form>`提交表单的四种方式？

2. 根据上面的方式写一个ajax提交表单库。包含文件上传。

3. 描述FormData

4. 描述文件API，File和FileReader。

5. 上传进度。




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





https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data

https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

