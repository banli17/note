---
title: 项目技术方案
---

### 搭建 UI 骨架

### 集成 fish-redux

### 数据请求处理

### 使用 bugly 异常上报

### 本地存储方案

### APP 升级

## 体验优化

### 全面屏适配

### 启动白屏问题

时间：1-3s，因为 flutter 应用需要启动 flutter sdk，加载代码，然后渲染。

`flutter_native_splash`插件太大了，打包后增加了 10M，所以用下面原生方式实现：

https://juejin.im/post/5ca2d357e51d4533087aa92c

android 白屏分为 2 个部分，在打开图标时会显示主题(这里主题要设置透明，才没有白屏)，然后显示启动屏幕。

```xml title="res/styles.xml"
<!-- 设置透明背景 -->
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
        <!-- Show a splash screen on the activity. Automatically removed when
             Flutter draws its first frame -->
        <item name="android:windowBackground">@drawable/launch_background</item>
        <item name="android:windowIsTranslucent">true</item>
</style>
```

ios xcode

1. 将启动屏图片 导入 Assets.xcassets ，直接拖进去。
2. 在 LaunchScreen.storyboard 里添加启动屏图片。
3. 添加约束，修改图片显示模式。将 splash_screen 向 View 用鼠标拖来添加约束。

![](imgs/2020-06-04-17-58-34.png)

### 沉浸式状态栏

```java
...
import 'package:flutter/services.dart';

void main() {
  runApp(MyApp());

  // 添加如下代码
  if (Platform.isAndroid) {
    SystemUiOverlayStyle systemUiOverlayStyle = SystemUiOverlayStyle(statusBarColor: Colors.transparent);
    SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
  }
}
```

状态栏颜色设置。

```
appBar: AppBar(
    ...
    brightness: Brightness.light,
)
```

## 项目优化

### 代码优化

去除冗余代码，封装代码。

```
bottomTabNavigator

NavigatorUtil
    - push
    - pop
```

### 包体积优化

在包大小方面:

-   压缩本地图片：https://tinypng.com
-   使用单架构 so: armeabi-v7a，现在基本 android 都支持这种架构。

```
android {
    defaultConfig {
        ndk {
            abiFilters "armeabi-v7a"
        }
    }
}

//flutter build apk
```

### 流畅度优化

-   按需创建页面
-   AutomaticKeepAliveClientMixin: 保证页面不销毁，会占用很多内存。可以在左右滑动 tab 时使用。
-   耗时的计算放在独立的 Isolate

### 内存优化

-   图片优化: 根据控件大小加载指定分辨率的图片
-   列表优化
    -   分页加载
    -   ListView.builder 来创建列表，区域外的不会显示
-   防止内存泄露，dispose 需要销毁的 listener 等

## 参考

-   [Flutter 沉浸式状态栏](https://www.jianshu.com/p/97e93c82ccef)
-   [flutter 修改状态栏字体颜色](https://www.jianshu.com/p/15700d9145aa)
-   [Flutter 沉浸式及状态栏颜色渐变](https://blog.csdn.net/qq_33653807/java/article/details/80973186)
