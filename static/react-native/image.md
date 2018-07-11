# 图片

## 图片引用
```markup
// 引用本地图片
// 引用网络图片
<Image source={{uri: 'url地址'}} />

```

## 图片缓存库之 react-native-img-cache

在安装 `react-native-img-cache` 库之前，需要首先安装 `react-native-fetch-blob`。

安装好之后，重新运行下`react-native run-android`，然后使用：

```markup
import {CachedImage, ImageCache} from 'react-native-img-cache'

<CachedImage source={{uri: ''}} />

ImageCache.get()    获取缓存对象

ImageCache.get().clear()  清除所有的缓存文件
```

## 保存图片到手机相册

只需要使用官方的 `CameraRoll.saveToCameraRoll`方法就可以保存到相册中。
```markup
CameraRoll.saveToCameraRoll(ImageCache.get().cache[url]))
```

## CameraRoll ios配置

CameraRoll 在安卓上可以直接使用，在 ios 需要配置一番。

1、首先将 `node_module/react-native/Libraries/CameraRoll` 里面的 `RCTCameraRoll.xcodeproj` 添加到 `xcode` 项目工程的 `Liberaries` 文件夹下。
2、在 `xcode` 屏幕中间菜单有个 `Build Phases，Link Binary With Libraries` 里加一项 `libRCTCameraRoll.a`。
3、在 `Info.plist` 里加入一行 `Privacy - Photo Library Usage Description`。

> 参考文章： <a href='http://www.hangge.com/blog/cache/detail_1615.html' target='_blank'>使用CameraRoll将图片保存到本地相册</a>
