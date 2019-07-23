---
title: "移动端微信开发常用"
date: 2019-03-03 12:08:28
tags:
toc: true
---

## 长按复制文本

移动端框架一般都禁用了用户选择，在 `body` 上增加了` -webkit-user-select: none` 样式。如果我们需要让某段文本可以选择复制，可以通过修改这个属性。
```markup
user-select: none | text | all | element;
```


微信JS-SDK接口 http://qydev.weixin.qq.com/wiki/index.php?title=微信JS-SDK接口
https://github.com/wuchangming/spy-debugger


http://203.195.235.76/jssdk/

## 微信config配置

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

- <a href='https://github.com/wuchangming/spy-debugger#weiner' target='_blank'>spy-debugger页面调试工具</a>

## 参考

- [微信JS-SDK说明文档](https://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html)
