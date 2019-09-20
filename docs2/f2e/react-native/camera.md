---
title: "react-native图片识别与相机拍照"
date: 2018-05-11 04:25:16
toc: true
---

> 可以使用momo的库[react-native-baidu-camera-ocr-scan]([https://github.com/qiepeipei/react-native-baidu-camera-ocr-scan])，我们现在项目中正在用的

图片上传是app最基本的需求了，需要选择相册或者拍照，之前我是用过的库有下面三个：

- [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker)
- [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
- 忘记叫啥了，和微信里选择图片类似

但是上面的库都有一些缺点，用着不爽，而且我们需求还有ocr识别，所以我让momo研究一下fanbaoying的下面这两个库，看能不能封装成rn组件。

- [FBYIDCardRecognition-Android](https://github.com/fanbaoying/FBYIDCardRecognition-Android)
- [FBYIDCardRecognition-iOS](https://github.com/fanbaoying/FBYIDCardRecognition-iOS)

过了几天，momo搞定了，而且说好像没有用上面这俩个库，而是百度官方的ocr demo本来就有这些功能，所以他将它封装了自己的库[react-native-baidu-camera-ocr-scan](https://github.com/qiepeipei/react-native-baidu-camera-ocr-scan)。

现在这个库功能很强大了。支持的功能

- 拍照
- 选择相册
- 识别身份证、银行卡、营业执照等
- 生成二维码图片
- 识别二维码图片
