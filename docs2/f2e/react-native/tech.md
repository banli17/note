---
title: "react-native项目技术选型"
date: 2018-08-11 05:57:04
toc: true
---


## 技术选型

这个项目刚开始只有我一个人，从6月中旬开始开发，七月的时候 mac 被偷走了，于是用 windows 装了个黑苹果，后来因为固态盘容量不够，为了省的麻烦，所以还是买了个 mac。momo是8月20日加入开发，我们的app是8月30上线第一版。

**初期选型**

第一版app的需求比较简单，都是些业务相关的页面，一些比较复杂的是：
- 表单比较多，我封装了个Form组件，通过动态传入form表单数据，根据每个字段的type来动态渲染Input等组件。
- 相机、拍照身份证识别、银行卡识别。

因为我一个人惯了，方案是怎么简单怎么来。所以项目初的架构是：

- `react-navigation` 导航库(因为之前开发过一个app,比较熟悉它)。
- `react-redux` 用于数据管理，初期我项目里虽然搭建好了它，但是只有很少几个部分用了。
- `antd-mobile-rn` 蚂蚁的UI库，不过说实话问题太多了，而且这个库也是刚从web版本单独抽离出来，所以问题多难免的。不过个人感觉阿里貌似没有一个好用的库，不知道是不是我主观意见。
- `封装fetch api` 处理网络请求。
- `bl-util` 自己写的个工具类库。

开发过程基本没有遇到什么阻碍。需要实现身份证、银行卡识别等功能。于是我用百度ocr sdk加`react-native-camera`封装了一个百度ocr识别的库，可是很难用。不过快上线时总算将就把功能实现了，但是体验很差。期间我找到了一个原生识别身份证等的库，但是苦于不会封装。

后来momo加入了我们，因为他会原生的ios/android。所以让他去试试封装原生的百度识别库，过了几天，成功了，而且效果很不错。具体请看[一个库解决普通拍照、身份证/银行卡等拍照识别、二维码生成与识别]。

有了它，直接放弃类似`react-native-camera`、`react-native-qrcode`等库。

**后来选型**

momo加入后推荐了原生的导航库`react-native-navigation`、UI库`native-base`，他之前开发app都是用这两个库，比较熟悉，告诉我说原生导航库性能很高，而且自带Modal弹出框等效果。`native-base`也很容易定制。

于是我考虑对比了这两种方案和一些项目中的问题:

**方案**
- `react-navigation`:js导航库，使用还可以
- `react-native-navigation`:原生导航库，性能高，自带Modal
- `antd-mobile-rn`: 用的很不爽
- `native-base`: 风格我不太喜欢

**现在项目的问题**
- android statubar无法覆盖到顶部
- modal自定义比较困难，而且官网的Modal我不太喜欢
- app速度慢（有个客户当面说，我们app速度太慢，点了半天才动，不过换导航库后一段时间，我们才发现不是导航库的问题，而是console太多导致的。)

于是我听从momo的建议，让他重构一下，他将整体架构换成了下面的方案。

- `react-native-navigation` 导航库
- `native-base` UI库
- `react-redux` 
- `react-saga`  用于处理异步

目前发现`native-base`比较难用，所以我们正在慢慢封装一套类似于小程序接口的库。
- UI层由我来做
- API功能momo来做

`react-native-navigation`也比较坑爹，ios还比较好，android上效果真是很奇葩，不知道为什么会是那般体验。

> 我走之后，momo又把导航库换回了react-navigation。
