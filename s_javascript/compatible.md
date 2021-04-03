---
title: 前端兼容性汇总
---

## UI 兼容性

## line-height 不居中问题

手机上 line-height 可能不居中，使用 flex 布局或者 padding 来解决。

当外层元素太小时，外层元素不要设置高度。

### rem 有的 android 手机计算的 font-size 会偏大

### 1px 边框

1px 边框，如果使用 transform: scaleY(0.5)，就会变成`0.xrem`，有的 android 手机不支持零点几的写法，会直接不显示边框。

## 微信分享

1. ios 微信分享是以首次打开的链接来算的，`history.pushState` 无效。

bug: https://developers.weixin.qq.com/community/develop/doc/000cc20e8b835841fce87436e56c00

解决方法：

-   ios 使用 `history.replace()`

2. 微信分享会自动带一个`from=singlemessage...`标记为分享的来源，在单页面 hash 模式下会有 url bug。

```js
// 微信分享 bug，去掉微信自动加了 from=singlemessage
// https://bmsapi.lvji.cn/cityPages/?from=singlemessage&isappinstalled=0#/index?cityId=76
if (href.includes("?from=singlemessage")) {
    // ios 微信分享链接是按照首次打开来算，pushState 无效
    // bug: https://developers.weixin.qq.com/community/develop/doc/000cc20e8b835841fce87436e56c00
    if (Utils.os().isIOS) {
        location.replace(
            href.replace(/\?from=singlemessage.*?(?=#)/, "").replace(origin, "")
        );
    } else {
        history.replaceState(
            {},
            "",
            href.replace(/\?from=singlemessage.*?(?=#)/, "").replace(origin, "")
        );
    }
}
```

## video

## line-height android 不居中

https://www.zhihu.com/question/39516424

## css reset

http://meyerweb.com/eric/tools/css/reset/

## 多行文字显示几行

文本超出 ...，只是 firefox 上文字会被截断。

```css
.box {
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
}
```

```css
.box(@n) {
    display: -webkit-box;
    -webkit-line-clamp: @n;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

-   [关于文字内容溢出用点点点(…)省略号表示](https://www.zhangxinxu.com/wordpress/2009/09/%e5%85%b3%e4%ba%8e%e6%96%87%e5%ad%97%e5%86%85%e5%ae%b9%e6%ba%a2%e5%87%ba%e7%94%a8%e7%82%b9%e7%82%b9%e7%82%b9-%e7%9c%81%e7%95%a5%e5%8f%b7%e8%a1%a8%e7%a4%ba/)

## 滚动条隐藏

```
&::-webkit-scrollbar {
    display: none;
}
```

1. vivo banner 没有显示，加个 width:100% 可以
2. iphone 6p 10 系统，卡片商品名称内容不显示，
