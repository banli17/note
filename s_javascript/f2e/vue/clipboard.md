---
title: "clipboard.js复制到剪切"
date: 2017-07-23 15:50:15
tags:
toc: true
---

## clipboard.js 复制到剪切板

- cdn 地址：[http://www.bootcdn.cn/clipboard.js](http://www.bootcdn.cn/clipboard.js)
- 官网：[https://clipboardjs.com](https://clipboardjs.com)

这个库通过`gzip`后只有`3kb`，非常小。支持`ie9+`，`chrome`等浏览器。

**1. 安装**

```
// 方式1. 引入js
<script src="https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js"></script>

// 方式2. 使用npm
npm install clipboard --save
const ClipboardJS = require('clipboard')
```

**2. 一个完整的例子**

具体的使用方法参考[官网](https://clipboardjs.com)上的说明。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>target-div</title>
  </head>
  <body>
    <!-- 1. 定义一些标签 
        data-clipboard-target: 要复制的对象，可以是 class 或 id。
    -->
    <div>hello</div>
    <button
      class="btn"
      data-clipboard-action="copy"
      data-clipboard-target="div"
    >
      复制
    </button>

    <!-- 2. 引入库 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>

    <!-- 3. 初始化 -->
    <script>
      var clipboard = new Clipboard(".btn");

      clipboard.on("success", function (e) {
        console.log(e);
      });

      clipboard.on("error", function (e) {
        console.log(e);
      });
    </script>
  </body>
</html>
```

**3. 常用技巧**

```js
// 获取下一个元素的innerText内容
new ClipboardJS(".btn", {
  target: function (trigger) {
    return trigger.nextElementSibling;
  },
});

// 获取元素的属性
new ClipboardJS(".btn", {
  text: function (trigger) {
    return trigger.getAttribute("aria-label");
  },
});
```

**4. 注意事项**

在单页应用中，可能需要使用类似下面的方法。以免复制事件重复绑定多次。

```js
// 这句是关键，在初始化之前调用
if (this.clipboard) {
  this.clipboard.destroy();
  this.clipboard = null;
}

this.clipboard = new ClipboardJS(".copyBtn", {
  text(trigger) {
    return trigger.previousElementSibling.innerText;
  },
});
this.clipboard.on("success", (e) => {
  e.trigger.classList.add("copied");
  setTimeout(() => {
    e.trigger.classList.remove("copied");
  }, 3000);
});
```

## jquery.validate.js 验证表单

- `required=true`：必填字段
- `email=true`：输入正确的邮箱格式
- `url=true`：输入正确的地址
- `date=true`：输入正确的日期
- `number=true`：数字
- `digits=true`：整数
- `equalTo='#password'`：和某元素值相同，可以用于重复输入密码
- `maxlength=5`：最大长度
- `minlength=5`：最小长度
- `rangelength="5,10"`：长度范围
- `range="5,10"`：值的范围
- `max=5`：最大值
- `min=5`：最小值

资料：[https://github.com/Tencent/weui.js](https://github.com/Tencent/weui.js)

网站上联系我们页面经常需要加入百度地图，要定位到指定的地点，下面记录一下制作的方法。

## 实现

1、通过百度地址坐标拾取工具：http://api.map.baidu.com/lbsapi/getpoint/index.html 获取位置坐标

2、添加如下代码。注意要修改坐标、标题、地址标注等等。

```js
<div id='map'></div>
<script>
var map = new BMap.Map("map");
var point = new BMap.Point(114.294985,27.692483);  // 地址坐标
map.centerAndZoom(point, 18);
var marker = new BMap.Marker(point);  // 创建标注
var opts = {
    width : 200,     // 信息窗口宽度
    height: 100,     // 信息窗口高度
    title : "玉盘大酒店" , // 信息窗口标题
    enableMessage:true
}
var infoWindow = new BMap.InfoWindow("地址：地址标注", opts);  // 创建信息窗口对象
marker.addEventListener("mouseover", function(){
    map.openInfoWindow(infoWindow,point); //开启信息窗口
});
map.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
map.setMapStyle({style:'grayscale'});
</script>
```

效果图如下所示：

1.png

## 参考

百度地图 api http://developer.baidu.com/map/reference/index.php

## 长按复制文本

移动端框架一般都禁用了用户选择，在 `body` 上增加了`-webkit-user-select: none` 样式。如果我们需要让某段文本可以选择复制，可以通过修改这个属性。

```markup
user-select: none | text | all | element;
```

微信 JS-SDK 接口 http://qydev.weixin.qq.com/wiki/index.php?title=微信JS-SDK接口
https://github.com/wuchangming/spy-debugger

http://203.195.235.76/jssdk/

## 微信 config 配置

```markup
wx.config({
    debug: true,
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [ 'onMenuShareTimeline',
                 'onMenuShareAppMessage',
                 'onMenuShareQQ',
                 'onMenuShareQQ',
                 'scanQRCode'
               ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

```

## 微信扫一扫

```markup
wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
}
});
```

## 微信分享

```markup
wx.onMenuShareAppMessage({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});
```

## 手机调试工具

```
npm install spy-debugger -g  // windows
sudo npm install spy-debugger -g  // mac
```

- <a href='https://github.com/wuchangming/spy-debugger#weiner' target='_blank'>spy-debugger 页面调试工具</a>

## 参考

- [微信 JS-SDK 说明文档](https://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html)
