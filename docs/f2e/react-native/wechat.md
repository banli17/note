---
title: "react-native 微信注册、分享、支付"
date: 2018-01-16 09:27:57
toc: true
---

app端要实现微信注册、分享、支付功能，还是很简单的。在上一个app中，我是用[`react-native-wechat`](https://github.com/yorkie/react-native-wechat)实现了微信登陆功能。但是在做这个app时，发现那个库有差不多一年没有更新了。我集成进去也是一堆报错，不起作用，所以我找到了另一个库：[yyyyu/react-native-wechat](https://github.com/yyyyu/react-native-wechat)。

这个库好像是fork自`react-native-wechat`。不过用了最新的sdk，并且修复了一些东西。我们现在的分享、登陆、支付都是采用这个库来做的。

而且之前我们app里有个功能可能要迁移到本app里：微信分享多图到朋友或者朋友圈。这个需要使用另一个库：[react-native-share-local](https://github.com/kmlidc/react-native-share-local)。