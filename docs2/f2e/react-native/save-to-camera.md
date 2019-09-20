---
title: "react-native保存图片到手机相册"
date: 2018-04-14 03:41:19
toc: true
---


只需要使用官方的 `CameraRoll.saveToCameraRoll`方法就可以保存到相册中。

```
CameraRoll.saveToCameraRoll(ImageCache.get().cache[url]))
```

CameraRoll 在安卓上可以直接使用，在 ios 需要配置一番。

1、首先将 `node_module/react-native/Libraries/CameraRoll` 里面的 `RCTCameraRoll.xcodeproj` 添加到 `xcode` 项目工程的 `Liberaries` 文件夹下。
2、在 `xcode` 屏幕中间菜单有个 `Build Phases，Link Binary With Libraries` 里加一项 `libRCTCameraRoll.a`。
3、在 `Info.plist` 里加入一行 `Privacy - Photo Library Usage Description`。

> 参考文章： <a href='http://www.hangge.com/blog/cache/detail_1615.html' target='_blank'>使用CameraRoll将图片保存到本地相册</a>