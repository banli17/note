---
title: flutter 开始
sidebar_label: 开始
---

## mac 开发环境搭建

1. 设置 Flutter 镜像，打开 `~/bash_profile`。

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

2. 下载 sdk

```sh
git clone -b dev https://github.com/flutter/flutter.git
```

2. 设置 sdk 路径

```
export PATH=$PATH:/Users/banli/Documents/flutter/bin
```

3. 检查安装成功

```sh
flutter
flutter doctor # 检查环境并在终端显示报告
```

## 创建项目并运行

```sh
# 创建项目
flutter create my_app

# 打开模拟器
open -a Simulator

# 运行
cd my_app
flutter run
```

## 问题

1. 执行 Flutter 包管理相关命令时有可能遇到 Waiting for another flutter command to release the startup lock... 这样的错误，可尝试杀死所有的 dart 进程解决：

```
// Linux
killall -9 dart

// Windows
taskkill /F /IM dart.exe
```

-   布局与组件
-   网络请求封装
-   全局变量和共享状态
-   路由跳转、路由参数
-   事件处理
-   包与插件
-   fish_redux(https://github.com/alibaba/fish-redux/blob/master/doc/concept/reducer-cn.md)

## 开发实践

### 布局开发

布局相关组件：

-   Container

### 路由与导航

有两种方式进行跳转：

1. 通过`Navigator.push()`。

```
Navigator.push(context, MaterialPageRoute(builder: (context) => VideoPage()));
```

2. 通过`Navigator.pushNamed()`。

```
// 1. 首先定义 routes
MaterialApp(
  title: 'flutter_名称',
  home: TabNavigator(),
  routes: <String, WidgetBuilder>{
    'video_page': (BuildContext context) => VideoPage(),
    'my': (BuildContext context) => My(),
  },
)

// 2. 跳转
Navigator.pushNamed(context, 'video_page');
```

### 处理用户操作和手势

```dart
import 'package:flutter/material.dart';

class My extends StatefulWidget {
  @override
  _MyState createState() => _MyState();
}

class _MyState extends State<My> {
  double moveX = 0;
  double moveY = 0;

  _printMsg(String msg) {
    print('msg : $msg');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('我的'),
        ),
        body: FractionallySizedBox(
          widthFactor: 1,
          child: Stack(
            children: <Widget>[
              GestureDetector(
                onTap: () => _printMsg('点击'),
                onDoubleTap: () => _printMsg('双击'),
                onLongPress: () => _printMsg('长按'),
                onTapCancel: () => _printMsg('取消'),
                onTapUp: (e) => _printMsg('松开'),
                onTapDown: (e) => _printMsg('按下'),
                child: Text('用户操作'),
              ),
              Positioned(
                left: moveX,
                top: moveY,
                child: GestureDetector(
                    onPanUpdate: (e) => _doMove(e),
                    child: Container(
                      width: 72,
                      height: 72,
                      decoration: BoxDecoration(
                          color: Colors.black,
                          borderRadius: BorderRadius.circular(36)),
                    )),
              )
            ],
          ),
        ));
  }

  _doMove(DragUpdateDetails e) {
    setState(() {
      moveX += e.delta.dx;
      moveY += e.delta.dy;
    });
  }
}
```

### 导入和使用资源文件

1. 在 pubspec.yaml 里配置 assets。

```
assets:
    - assets/
#   - images/avatar.jpeg
```

2. 通过 Image 组件显示。

```
Image(
    image: AssetImage('images/avatar'),
    width: 100,
    height: 100
)
```

### 打开第三方 APP

通过 [url_launcher](https://pub.dev/packages/url_launcher) 插件。

```dart
// 浏览器打开网页
_launchURL() async {
  const url = 'https://flutter.dev';
  if (await canLaunch(url)) {
    await launch(url);
  } else {
    throw 'Could not launch $url';
  }
}

// 打开app，通过 schema
_launchApp() async {
  const url = 'geo:52.32.4.917';
  if (await canLaunch(url)) {
    await launch(url);
  } else {
    // 可能是 ios, 打开地图软件
    const url = 'http://maps.apple.com/?ll=52.32.4.917';
    if(await canLaunch(url)){
        await launch(url);
    }else{
        throw 'Could not launch $url';
    }
  }
}
```

### flutter 页面生命周期

**StatelessWidget 生命周期**

-   createElement
-   build

**StatefulWidget 生命周期**

-   初始化时期
    -   `createState`
    -   `initState`: 通常做一些初始化工作，比如 channel 的初始化，监听器的初始化等，类似 android 的 onCreate() 和 ios 的 viewDidLoad()。
-   更新期间
    -   `didChangeDependencies`: state 改变后会被调用，1) `initState()` 后会立即调用。2) 如果 StatefulWidgets 依赖于 InheritedWidget，那么当当前 State 变化时会被调用。
    -   `build`: 页面更新时调用
    -   `didUpdateWidget`: 父组件需要更新时调用
-   销毁期间
    -   `deactivate`: 很少使用，在组件被移除时调用 dispose 之前调用。
    -   `dispose`: 组件销毁时调用

InheritedWidget 可以高效的将数据在 Widget 树中向下传递、共享。

### flutter 应用生命周期

widgetsBindingObserver 是一个 Widgets 绑定观察器，通过它我们可以监听应用的生命周期、语言等相关的变化。

```dart
// 1. 混入 with widgetsBindingObserver
class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  Brightness _brightness = Brightness.light;

  @override
  void initState() {
    // 2. 添加监听器
    WidgetsBinding.instance.addObserver(this);
    super.initState();
  }

  // 3. 生命周期变化时触发
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);
    print('state = $state');
    if (state == AppLifecycleState.paused) {
      print('app进入后台');
    } else if (state == AppLifecycleState.resumed) {
      print('app 进入前台');
    } else if (state == AppLifecycleState.inactive) {
      // 不常用，应用程序处于非活动状态，并且未接受用户输入时调用，比如来了个电话
    } else if (state == AppLifecycleState.detached) {
      // 不常用，应用程序被挂起时调用，不会在 ios 上出发
    }
  }

  @override
  void dispose() {
    // 销毁
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FLToastProvider(
        child: MaterialApp(
      color: Colors.red,
      title: 'flutter_名称',
      theme: ThemeData(
        brightness: _brightness,
        primarySwatch: Colors.blue,
        pageTransitionsTheme: PageTransitionsTheme(builders: {
          TargetPlatform.android: CupertinoPageTransitionsBuilder(),
        }),
      ),
      home: TabNavigator(),
    ));
  }
}
```

### 切换主题

```dart
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Brightness _brightness = Brightness.light;

  @override
  void initState() {
    super.initState();
    setState(() {
      _brightness = Brightness.dark;
    });
  }

  @override
  Widget build(BuildContext context) {
    return FLToastProvider(
        child: MaterialApp(
      color: Colors.red,
      title: 'flutter_名称',
      theme: ThemeData(
        brightness: _brightness,
        primarySwatch: Colors.blue,
        pageTransitionsTheme: PageTransitionsTheme(builders: {
          TargetPlatform.android: CupertinoPageTransitionsBuilder(),
        }),
      ),
      home: TabNavigator(),
    ));
  }
}
```

### 自定义字体

1. 将字体 ttf 放到 `fonts` 目录下。
2. 启用字体。在 pubspec.yaml 里，fonts 注释去掉。

```
fonts:
  - family: Schyler
    fonts:
      - asset: fonts/Schyler-Regular.ttf
      - asset: fonts/Schyler-Italic.ttf
        style: italic
  - family: Trajan Pro
    fonts:
      - asset: fonts/TrajanPro.ttf
      - asset: fonts/TrajanPro_Bold.ttf
        weight: 700
```

3. 全局配置配置 theme。

```
MaterialApp(
    theme: ThemeData(
        fontFamily: 'Schyler',
        ...
    ),
));
```

4. 局部使用。

```
Text('hello, style: TextStyle(fontFamily: 'Schyler'))
```

### 学习构建 Flutter 实例项目

-   flutter 官方提供的例子
-   flutter/samples
-   flutter-examples
-   flutterExampleApps

### 图片控件

如何加载网络图片？
如何加载静态图片？
如何加载本地图片？
如何设置 Placeholder?
如何设置缓存?
如何加载 Icon?

-   new Image 用于从 ImageProvider 获取图片
-   new Image.asset 使用 key 从 AssetBundle 获取图片
-   new Image.network 从网络获取图片
-   new Image.file 从本地文件中加载图片
-   new Image.memory 从内存加载图片

如果要支持不同分辨率的图片，要用 asset 指定图片，且 Image 要放在 MaterialApp、WidgetsApp 或 MediaQuery 下面。

```
Image.newwork(url)
```

加载静态图片

1. 在 pubspec.yaml 声明图片路径
2. 使用 AssetImage 访问图片

```
Image(
  width: 20,
  height: 20,
  image: AssetImage(url)
)

// 或者
Image.asset(url, width: 20, height: 20)
```

加载本地图片

1. 加载绝对路径的图片。

```
import 'dart:io'
Image.file(File('/sdcard/Download/1.png'))
```

2. 加载相对路径的图片，需要使用 `path_provider` 插件。

```
import 'dart:io'
import 'package:path_provider/path_provider.dart'

// 根据相对路径
FutureBuilder(future: _getLocalFile('Download/1.png'),
  builder: (BuildContext context, AsyncSnapshot<File> snapshot){
    return snapshot.data != null ? Image.file(snapshot.data): Container();
  }
)

// 获取 SDCard 的路径
Future<File> _getLocalFile(String filename) async{
  String dir = (await getExternalStorageDirectory()).path;
  File f = new File('$dir/$filename');
  return f;
}
```

设置 placeholder 占位图片。 使用`transparent_image`插件，

```
FadeInImage.memoryNetwork(
  placeholder: kTransparentImage,
  image: imageUrl
)
```

从本地资源中加载 placeholder

```
// 1. 配置本地资源图片
assets:
  - assets/loading.gif

// 2
FadeInImage.assetNetwork(
  placeholder: 'assets/loading.gif',
  image: imageUrl
)
```

配置图片缓存，可以使用插件`cached_network_image`。

```
CachedNetworkImage(
  placeholder: (context, url) => CircularProgressIndicator(),
  imageUrl: imageUrl,
)
```

加载 icon: 内置了 `material_fonts`。

```
Icon(Icons.android, size: 100)
```

自定义 Icon:

```
// 1
const IconData(
  this.codePoint, // 必须，fonticon 对应的 16 进制 Unicode
  {
    this.fontFamily,   // 字体库系列
    this.fontPackage,  // 字体在哪个包中，不填仅在自己程序包中查找
    this.matchTextDirection: false, // 图标是否按照图标绘制方向显示
  })

// 2 配置
fonts
  - family: a
    fonts
      - assets: fonts/a.ttf

// 3 使用

child: Icon(IconData(0xf5566, fontFamily: 'a'), size: 100, color: Colors.blue)
```

### 调试

-   断点调试
-   Variables 视窗和 Watches 视窗
-   通过 Frames 回退
-   善用控制台

### ListView

横竖

### 折叠列表

### 网格布局

### 下拉和滚动刷新

### 混合开发

-   Flutter Android 混合开发
-   Flutter ios 混合开发
-   Flutter 和 Android 通信
-   Flutter 和 ios 通信

场景：

-   独立页面加入，flutter 页面打开原生页面或原生页面打开 flutter 页面。
-   作为一部分嵌入。

步骤：

1. 创建 Flutter module。
2. 添加 Flutter module 依赖。
3. 在 Java/Object-c 中调用 Flutter module。
4. 编写 Dart 代码。

### 启动白屏问题

时间：1-3s，因为 flutter 应用需要启动 flutter sdk，加载代码，然后渲染。

`flutter_native_splash`插件太大了，打包后增加了 10M，所以用下面原生方式实现：

https://juejin.im/post/5ca2d357e51d4533087aa92c

### 沉浸式状态栏

## 打包发布

## 优化

1. 代码优化：冗余代码、封装。

### Android 打包发布

1. 修改 app 名称和 snapshot 名称(查看打开 app 列表时显示的)。

```
// 1. app名称, android/app/src/main/AndroidManifest.xml
<application
        android:name="io.flutter.app.FlutterApplication"
        android:icon="@mipmap/ic_launcher"
        android:label="flutter之旅">


// 2. snapshot名称
MaterialApp({
    title: 'snapshot名称'
})
```

2. 修改 applicationId、targetSdkVersion。在 `android/app/src/build.gradle`文件。

3. 修改启动图标，文件 `android/app/src/res/mipmap-xhdpi/ic_launcher.png`，可以将其它分辨率的图标删除，减少包的大小。

4. 签名 APP。

```sh
// mac
keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key

// windows
keytool -genkey -v -keystore c:/Users/USER_NAME/key.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

创建一个名为的文件`<app dir>/android/key.properties` ，其中包含对密钥库的引用：

```
storePassword=flutter_app
keyPassword=flutter_app
keyAlias=key
storeFile=/Users/banli/key.jks
```

5. 构建

```sh
# 移除--split-per-abi参数后,会生成支持所有ABI平台的Apk文件
# 打包文件在 <app dir>/build/app/outputs/apk/release/app-armeabi-v7a-release.apk
flutter build apk --split-per-abi

# dart 混淆 obfuscate
flutter build apk --obfuscate --split-debug-info=/Users/banli/Desktop/test/flutter_app/split_debug_info  --split-per-abi
```

-   android abi 详细:[https://developer.android.google.cn/ndk/guides/abis](https://developer.android.google.cn/ndk/guides/abis)
-   官方详细文档[https://flutter.dev/docs/deployment/android](https://flutter.dev/docs/deployment/android)

## 常见问题

### pod install 失败

安装失败的主要问题就是网络问题。

**替换 ruby 源**

```sh
// 查看现有的源
gem source -l

// 移除
gem sources --remove  https://rubygems.org/

// 添加 ruby-china 的源
gem sources -a https://gems.ruby-china.org/
```

**安装 codoapods 仓库**

```sh
# 移除原仓库镜像
pod repo remove master
pod repo remove trunk  # 注意这货要删除，就是它的 cdn 不能下载

# 使用清华源安装到本地 cd  ~/.cocoapods/repos/master
git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git

pod setup

pod repo
```

然后`pod install`一下。

```sh
# 查看进度
pod install --verbose --no-repo-update
```

### android 真机上没网络

android 联网权限。在 `android/app/src/main/AndroidManifest.xml` 文件里添加如下配置：

```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />

<application
    ...
```
