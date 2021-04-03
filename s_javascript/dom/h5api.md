---
title: "HTML5新增的文件API"
---

html5 为我们提供了读取文件内容的接口，这样为我们的开发提供了一些遍历，比如文件上传时可以轻松的显示缩略图。获取上传文件的大小等等。

## File

元素`<input type='file'>`在选择图片后，它的 files 属性会返回选择一个包含图片相关信息的 FileList 类数组对象。由多个 File 对象组成。File 对象是一种特殊的 Blob，可以通过`FileReader`，`URL.createObjectURL()`，`createImageBitmap()`及`XMLHttpRequest.send()`处理。

File 对象的一些属性：

- `lastModified`：只读，返回文件最后修改时间，自 1970 年 1 月 1 日 0:00 的毫秒数
- `lastModifiedDate`：只读，返回最后修改的 Date 对象
- `name`：返回文件的名字
- `size`：返回文件的大小，单位是 Byte
- `type`：返回文件的 mime 类型
- `webkitRelativePath`：这是个 chrome 下私有属性，结合下面代码了解。

```js
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

File 接口没有定义任何方法，但是继承了 Blob 接口的方法。

## FileReader

FileReader 可以用来异步读取 File 对象的信息。比如我们需要在文件上传时显示上传的图片。

```js
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

接着来详细了解 FileReader 的属性和方法。

通过 new FileReader()创建一个 FileReader 对象。它读取文件相关的方法如下：

- `readAsArrayBuffer()`：以 buffer 形式读。
- `readAsBinaryString()`：以二进制形式读。
- `readAsDateURL()`：以 data:URL 格式读，比如图片读出来就是 base64 格式。
- `readAsText()`：以文本形式读。
- `abort()`：中止读取操作，在返回时，readyState 属性为 DONE。

在开始读之前，我们需要先监听`FileReader.readyState`的变化，这点和 ajax 类型。可用事件如下：

- `onabort`：读取中止时触发。
- `onerror`：读取发生错误时触发。
- `onload`：读取完成时触发。
- `onloadstart`：开始读取时触发。
- `onloadend`：读取结束时触发，不管成功还是失败。
- `onprogress`：读取时触发。

FileReader.readyState 可能值如下：

- `0，EMPTY` 还没有加载任何数据
- `1，LOADING` 数据正在加载
- `2，DONE` 完成全部请求

最后的读取结果是`FileReader.result`。如果发生错误，会抛出一个`DOMException`，信息储存在`FileReader.error`中。

## URL.createObjectURL()

`URL.createObjectURL(blob)`接受一个 blob 或 file 对象，创建一个对象的本地 url。

```js
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

HTML5 新增的拖拽 API

## 音频和视频

html5 新增了 audio 和 video 标签。也可以通过 new Audio 方式创建一个对象。

### audio 属性和方法

**方法**

- canPlayType() 用于检测浏览器支持音频、视频格式。常用参数是: - `video/ogg` - `video/mp4` - `video/webm` - `audio/mpeg` - video/ogg; codecs="theora, vorbis" - video/mp4; codecs="avc1.4D401E, mp4a.40.2" - video/webm; codecs="vp8.0, vorbis" - audio/ogg; codecs="vorbis" - audio/mp4; codecs="mp4a.40.5"
  返回支持的级别，可能值是`probably`，`maybe`, `-`(不支持)，codecs 是编解码器，如果包含 codecs，则只能返回 probably。

- load() 重新加载资源，safire 不支持。常常用来重置 src 属性后再 load()。

```
audio.src = 'x.mp4'
audio.load()
```

- play() 播放
- pause() 暂停播放

**属性**

- autoplay 设置加载完后是否自动播放
- buffered TimeRanges 对象，表示缓冲范围，audio 缓存只有一个分段。
  - length - 获得音视频中已缓冲范围的数量
  - start(index) - 获得某个已缓冲范围的开始位置
  - end(index) - 获得某个已缓冲范围的结束位置
- played TimeRanges 对象，已经播放或看到的音频/视频范围。
- controls 设置或返回浏览器应当显示标准的音视频控件
- crossOrigin
- currentSrc
- currentTime 当前播放位置，单位是秒
- defaultMuted 默认是否静音
- defaultPlaybackRate 默认播放速度
- duration 总长度
- ended 是否已结束
- error 错误对象
- loop 是否在结束时重新播放
- muted 是否静音
- playbackRate 播放速度
- preload 是否应该在页面加载后进行加载
- readyState 当前就绪状态
- seekable TimeRanges 对象表示音频/视频中用户可寻址的范围。
- seeking 用户目前是否在音频/视频中寻址。就是点进度条时
- src
- volume 范围是 0-1

**事件**

- abort 加载放弃时
- canplay 可以播放时
- canplaythrough 可在不因缓冲而停顿情况下播放时
- durationchange 当音频/视频加载后，时长将由 "NaN" 变为音频/视频的实际时长。
- emptied 播放列表为空时
- ended 播放列表已结束时
- error 加载期间错误时
- loadeddata 已加载当前帧时
- loadedmetadata 已加载元数据时
- loadstart 开始查找
- pause 暂停时
- play 已开始
- progress 正在下载指定的音频/视频时，会发生 progress 事件
- ratechange 当音频/视频的播放速度已更改时
- seeked 已移动/跳跃到音频/视频中的新位置时
- seeking 开始移动/跳跃到音频/视频中的新位置时
- stalled 尝试获取数据，但数据不可用
- suspend 可以不获取媒体数据时
- timeupdate 播放位置更改时
- volumechange 音量改变时
- waiting 需要缓冲停止时
- playing 因缓冲而暂停或停止后已就绪时

注：当音频/视频处于加载过程中时，会依次发生以下事件：

- loadstart
- durationchange
- loadedmetadata
- loadeddata
- progress
- canplay
- canplaythrough

### 常用代码

1. 重播

```
audio.currentTime = 0
audio.play()
```

2. 缓冲进度条和播放进度条

```
let buffered = 0
this.audio.addEventListener('timeupdate', (e)=> {
    for (let i = 0; i < this.audio.buffered.length; i++) {
        if (this.audio.currentTime < this.audio.buffered.end(i)) {
            buffered = this.audio.buffered.end(i)
         }
    }
    this.buffered = buffered / this.audio.duration
    this.progress = this.audio.currentTime / this.audio.duration
});
```

### 实战

任务说明：[仿豆瓣音乐播放器](http://ife.baidu.com/course/detail/id/83)

查看[我的代码](https://github.com/banli17/w3croad_blog/tree/master/baiduIfe/%E4%BB%BF%E8%B1%86%E7%93%A3%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8)

### 参考资料

- [html5 video 自定义控制条，缓冲进度怎么获取？](https://www.zhihu.com/question/37796780)
