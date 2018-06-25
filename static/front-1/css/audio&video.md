# 音频和视频

html5新增了audio和video标签。也可以通过 new Audio方式创建一个对象。

## audio属性和方法

**方法**

- canPlayType()  用于检测浏览器支持音频、视频格式。常用参数是:
    - `video/ogg`
    - `video/mp4`
    - `video/webm`
    - `audio/mpeg`
    - video/ogg; codecs="theora, vorbis"
    - video/mp4; codecs="avc1.4D401E, mp4a.40.2"
    - video/webm; codecs="vp8.0, vorbis"
    - audio/ogg; codecs="vorbis"
    - audio/mp4; codecs="mp4a.40.5"
返回支持的级别，可能值是`probably`，`maybe`, `-`(不支持)，codecs是编解码器，如果包含codecs，则只能返回probably。

- load() 重新加载资源，safire不支持。常常用来重置 src属性后再 load()。

```
audio.src = 'x.mp4'
audio.load()
```

- play() 播放
- pause() 暂停播放

**属性**

- autoplay 设置加载完后是否自动播放
- buffered TimeRanges 对象，表示缓冲范围，audio缓存只有一个分段。
    - length - 获得音视频中已缓冲范围的数量
    - start(index) - 获得某个已缓冲范围的开始位置
    - end(index) - 获得某个已缓冲范围的结束位置
- played   TimeRanges 对象，已经播放或看到的音频/视频范围。
- controls 设置或返回浏览器应当显示标准的音视频控件
- crossOrigin
- currentSrc
- currentTime  当前播放位置，单位是秒
- defaultMuted  默认是否静音
- defaultPlaybackRate 默认播放速度
- duration  总长度
- ended     是否已结束
- error    错误对象
- loop     是否在结束时重新播放
- muted  是否静音
- playbackRate  播放速度
- preload  是否应该在页面加载后进行加载
- readyState 当前就绪状态
- seekable  TimeRanges 对象表示音频/视频中用户可寻址的范围。
- seeking  用户目前是否在音频/视频中寻址。就是点进度条时
- src
- volume  范围是0-1

**事件**

- abort  加载放弃时
- canplay  可以播放时
- canplaythrough  可在不因缓冲而停顿情况下播放时
- durationchange  当音频/视频加载后，时长将由 "NaN" 变为音频/视频的实际时长。
- emptied   播放列表为空时
- ended     播放列表已结束时
- error     加载期间错误时
- loadeddata   已加载当前帧时
- loadedmetadata  已加载元数据时
- loadstart   开始查找
- pause   暂停时
- play    已开始
- progress 正在下载指定的音频/视频时，会发生 progress 事件
- ratechange  当音频/视频的播放速度已更改时
- seeked    已移动/跳跃到音频/视频中的新位置时
- seeking   开始移动/跳跃到音频/视频中的新位置时
- stalled   尝试获取数据，但数据不可用
- suspend   可以不获取媒体数据时
- timeupdate   播放位置更改时
- volumechange  音量改变时
- waiting    需要缓冲停止时
- playing    因缓冲而暂停或停止后已就绪时

注：当音频/视频处于加载过程中时，会依次发生以下事件：

- loadstart
- durationchange
- loadedmetadata
- loadeddata
- progress
- canplay
- canplaythrough

## 常用代码

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

## 实战

任务说明：[仿豆瓣音乐播放器](http://ife.baidu.com/course/detail/id/83)

查看[我的代码](https://github.com/banli17/w3croad_blog/tree/master/baiduIfe/%E4%BB%BF%E8%B1%86%E7%93%A3%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8)


## 参考资料

- [html5 video 自定义控制条，缓冲进度怎么获取？](https://www.zhihu.com/question/37796780)











