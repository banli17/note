# 监控数据上报

收集到了性能数据和错误信息，就需要上报了。上报的方案是：

- 使用独立域名上报
-

## 使用独立域名

- 很多浏览器会限制同一个域名的请求并发数量
- 独立域名(服务器)，可以减轻主业务服务器压力，避免日志数据在主服务器堆积。
- 独立域名存在跨域问题，可以通过`new Image()`解决，因为 Image 的 src 是没有跨域的。

```js
let url = "xxx?data=" + JSON.stringify(data);
let img = new Image();
img.src = url;
```

## 何时上报数据

- 页面加载性能数据可以等到页面稳定后进行上报。
- 对于错误的上报，如果日志量很大，则可以合并后统一时间上报。一般的场景是：
  - 页面加载和重新刷新。
  - 页面路由切换。
  - 页面 Tab 变为可见。通过 webkitvisibilitychange 事件和 document.hidden 来判断。
  - 页面关闭。

### 单页应用上报

如果切换路由是通过 hash 来实现的，则只需要监听 hashchange 事件。如果通过 history API，那么需要使用 pushState 和 replaceState 事件。

可以使用下面的方法：

```js
const patchMethod = (type) => () => {
  const result = history[type].apply(this, arguments);
  const event = new Event(type);
  event.arguments = arguments;
  window.dispatchEvent(event);
  return result;
};

history.pushState = patchMethod("pushState");
history.replaceState = patchMethod("replaceState");

window.addEventListener("replaceState", (e) => {
  // report...
});
window.addEventListener("pushState", (e) => {
  // report...
});
```

### 页面关闭上报

```js
// 关闭窗口前执行，要注意的是
// 1、在IE中这个事件你只要去关闭窗口就触发。
// 2、谷歌、火狐等在F12调试模式中也会起效
// 3、谷歌、火狐、QQ等浏览器中被优化了，需要用户在页面有过任何操作才会出现提示！
window.onbeforeunload = function (e) {
  e = e || window.event;

  // 兼容IE8和Firefox 4之前的版本
  if (e) {
    e.returnValue = "关闭提示";
  }

  // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
  return "关闭提示";
};

// 关闭窗口后执行
window.onunload = function (event) {
  return "确定离开此页面？";
};
```

但是如果在页面离开时上报，那么页面卸载时不能保证数据安全的发送。如果使用同步 ajax，又会对页面流畅度和用户体验造成影响。

推荐使用 [sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon) 方法。它可以用来向服务器发送 post 请求，特点是：异步，页面卸载也可靠。

```js
window.addEventListener("unload", log, false);
function log() {
  navigator.sendBeacon("/log", data);
}
```

[目前 Google Analytics 是采用 sendBeacon 来进行数据上报的](https://www.thyngster.com/google-analytics-added-sendbeacon-functionality-universal-analytics-javascript-api/)。它的方案是：

- 如果数据小(url 长度是有限制的)使用 Image 上传，不跨域
- 数据量太大就使用 sendBeacon
- 如果不兼容，就使用 ajax post。

```js
const reportData = (url) => {
  // ...
  if (urlLength < 2083) {
    imgReport(url, times);
  } else if (navigator.sendBeacon) {
    sendBeacon(url, times);
  } else {
    xmlLoadData(url, times);
  }
};
```

最后，如果页面访问量太多，错误发送的信息太多，可以设置采集率。

```js
const reportData = (url) => {
  // 只采集 30%
  if (Math.random() < 0.3) {
    send(data);
  }
};
```

## 监控系统设计

监控系统分为：采集、存储、分析过滤、上报四个阶段。

![](./imgs/2021-05-15-12-22-55.png)

- 数据上报，可以借助 http2 持续优化。比如：采用 HTTP 2.0 头部压缩，以减少数据传送大小；采用 HTTP 2.0 多路复用技术，以充分利用链接资源。
- 接口方面
  - 可以考虑识别流量高峰，动态设置采集率
  - 对垃圾信息进行过滤
  - 通过配置减少业务接入成本
  - 短时间相同错误过滤
- 实时性方面
  - 后端服务设置阈值，以邮件或短信通知

后台设置阈值进行邮件或短信提醒。业界流行 [3-sigma](https://baike.baidu.com/item/3%CF%83%E5%87%86%E5%88%99/9361985) 阈值设置。
