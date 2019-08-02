---
title: "android基础知识"
date: 2017-12-30 03:40:47
toc: true
---

## R.string是什么?

`R.string.Role_white` 意思是在 string 资源中定义的字符串`Role_white`的值。
- R = Resource
- string = string.xml
- Role_white = <Role_white>标记对应的值

![](./imgs/r.jpg)

## AndroidManifest.xml

## 修改包名

假设包名为com.exease.etd.objective，以下地方需要修改。

首先是两个java文件：android/app/src/main/java/com/PROJECT_NAME/MainActivity.java和/MainApplication.java，修改第一行为package com.exease.etd.objective;
然后是安卓的描述文件android/app/src/main/AndroidManifest.xml，第二行把package的至改为com.exease.etd.objective
之后是两个打包脚本。
android/app/BUCK，修改两个package的值package = 'com.exease.etd.objective',
android/app/build.gradle其中的applicationID，改为applicationId "com.exease.etd.objective"
修改完成后，命令行进入android目录，执行./gradlew clean清除缓存即可（windows上是 gradlew.bat）
android/app/src/AndroidManifest.xml里package。
还有MainActivity.java同级目录里文件的package。

## 权限

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.reactlibrary">
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="18"/>
</manifest>

```

### AndroidManifest.xml 加多个package

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.myactivities"
      android:versionCode="1"
      android:versionName="1.0">
    <application android:icon="@drawable/icon" android:label="@string/app_name">
        <activity android:name=".ActivityMain"
                  android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

每一个Activity、Service等应用程序组件都会对应AndroidManifest.xml文件中的一个`<activity>`、`<service>`标签。在这些标签中有一个必选的属性：android:name，该属性需要指定一个类名，例如，android.intent.action.MAIN类。指定android:name属性值有如下3种方式：
1.  指定完全的类名（packagename+classname），例如，android.intent.action.MAIN。
2.  只指定类名，例如，.ActivityMain，其中ActivityMain前面的“.”是可选的。该类所在的包名需要在`<manifest>`标签的package属性中指定。
3.  指定相对类名，这种方式类似于第2种方式，只是在`<activity>`标签的android:name属性中不光指定类名，还有部分包名。例如，如果Main类在net.blogjava.mobile.abcd包中，就可以在`<manifest>`标签的package属性中指定net.blogjava.mobile，然后在`<activity>`标签的android:name属性中指定.abcd.Main。
        由此可见，package的目的是为了更方便地指定android:name以及其他相关属性的值，就是一个默认的包。如果不在android:name中指定包名，会自动将package属性值加在前面。

## Plugin with id 'com.novoda.bintray-release' not found?

在 `build.gradle` 中添加：

```
dependencies {
    classpath 'com.android.tools.build:gradle:1.5.0'
    //添加下面这行代码就OK了
    classpath 'com.novoda:bintray-release:0.3.4'
```


## 关于requestPermissions不显示权限申请而直接跳转onRequestPermissionsResult的问题

当TargetSdk小于23时,即使运行在6.0以上的机型时,requestPermissions都不会弹出权限申请,无论是SDK里面的API还是V4包里面的API,都直接回调onRequestPermissionsResult,并且permissions和grantResults数组的长度都是0! 所以想通过requestPermissions来让用户授权是没用的,还是老老实实弹Toast或者提示跳转到Setting页让用户更改应用权限吧。

##  Could not expand ZIP

```
cd android && gradlew clean
```

## Configuration with name 'default' not found

看是不是某个库卸载了但是android文件依赖了。

## 修改apk的名字
打开`android/app/src/main/AndroidManifest.xml` 看到`android:label="@string/app_name"`，说明 app 的名字是在 `android/app/src/main/res/values/strings.xml` 配置，修改即可。
```markup
<resources>
    <string name="app_name">创库</string>
</resources>
```

## 打包安卓apk

1、首先执行
```markup
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
会在项目根目录生成一个签名文件。`my-key-alias` 名字可以修改。

2、把`my-release-key.keystore`文件放到你工程中的android/app文件夹下。

3、编辑`~/.gradle/gradle.properties`，添加如下的代码（注意把其中的****替换为相应密码）。

```markup
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```
4、编辑`android/app/build.gradle`。
```markup
...android {    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {            ...
            signingConfig signingConfigs.release
        }
    }
}...
```
5、开启压缩 `android/app/build.gradle`

```markup
def enableProguardInReleaseBuilds = true
```

6、执行打包命令

```markup
cd android && ./gradlew assembleRelease

```

生成的APK文件位于`android/app/build/outputs/apk/app-release.apk`，它已经可以用来发布了。

## 打包ios版本
## 参考

- <a href='http://reactnative.cn/docs/0.44/signed-apk-android.html#content' target='_blank'>reactnative中文网打包apk教程</a>


## unable to process incoming event 'ProcessComplete

```
gradlew assembleRelease --console plain
```



http://tool.css-js.com/base64.html

http://coding.imooc.com/class/chapter/99.html#Anchor
https://github.com/Code4AppiOS/RNShareSDK/issues


http://blog.csdn.net/smartbetter/article/details/64190798

http://www.devio.org/tags/#React Native

https://github.com/reactnativecn/react-native-pushy/issues
https://github.com/sunnylqm/react-native-storage/blob/master/README-CHN.md
http://dev.umeng.com/social/android/%E8%BF%9B%E9%98%B6%E6%96%87%E6%A1%A3#2
https://github.com/crazycodeboy/GitHubPopular/issues
https://github.com/remobile/react-native-toast

react-native修改android包名    http://www.jianshu.com/p/8b7412bab029


iOS App上架流程(2016详细版）
http://www.jianshu.com/p/9195cd991fc7
http://www.jianshu.com/p/b1b77d804254
https://developer.apple.com/account/ios/profile/create
https://itunesconnect.apple.com/



## 报错

node_modules_antdmobilern_lib_checkbox_image_normal.png: error: uncompiled PNG file passed as argument. Must be compiled first into .flat file..

1、`/android/gradle.properties`

```
android.enableAapt2=false
```

2、看看`android/app/src/res/drawable...`里`node_...png`图片删掉。

3、`./gradlew clean`
# Android Studio

## 导入第三方库

1. 将主项目作为依赖导入到新的项目中。

修改 AndroidManifest.xml

```xml
<!--  注释掉icon和theme
        android:icon="@mipmap/ic_app"
        android:theme="@style/AppTheme"
-->
<application
    android:name=".MyApplication"
    android:allowBackup="true"
    android:label="@string/app_name"
    android:supportsRtl="true"
    >
```

## Error:Unknown host 'android.oa.com'. You may need to adjust the proxy settings in Gradle.

将 build.gradle里的代理去掉

## 使用Genymotion模拟器

在android studio里设置插件，搜索genymotion，然后在最下面配置它的路径，重启 genymotion。


## 本地安装gradle-3.3-all.zip

先手动下载 [gradle包](http://services.gradle.org/distributions/)。然后修改`{project.dir}\gradle\wrapper\gradle-wrapper.properties`文件。

```
# distributionUrl=https\://services.gradle.org/distributions/gradle-2.2.1-all.zip
distributionUrl=gradle-2.2.1-all.zip
```

## unspecifie don project app resolves to an APK archive which is not support

出现这个问题是一个 libraryA 依赖另一个 libraryB 导致，需要修改 libraryB 的 build.gradle。

```
// 原
# apply plugin:'com.android.application'

// 修改为
apply plugin:'com.android.library'
```

改完编译，还会包下面一个错误 `Library projects cannot set applicationId. applicationId is set to 'com.tencent.qcloud.timchat' in default config.`。

还需要将 `android -> defaultConfig` 的 application 删除。

参考：[How to import android project as library and NOT compile it as apk (Android studio 1.0)](https://stackoverflow.com/questions/27536491/how-to-import-android-project-as-library-and-not-compile-it-as-apk-android-stud)

## 需要常量表达式case R.id.beauty_seekbar

将一个主工程作为依赖工程，给另一个新的主工程使用时，报了这个错误。

![](./imgs/error-need-const.png)

需要将 switch 语句替换成 if。如下：

```
// 原来
int id = view.getId();
switch (id) {
    case R.id.button1:
        action1();
        break;
    case R.id.button3:
        action3();
        break;
}

// 替换为
int id = view.getId();
if (id == R.id.button1) {
    action1();
} else if (id == R.id.button3) {
    action3();
}
```

在 android studio中可以使用快捷方式将 switch 语句换成 if 语句，方法是 `鼠标选中 switch 单词 ->  按 alt + enter -> 点击replace switch with if`。

参考：[Non-constant Fields in Case Labels](http://tools.android.com/tips/non-constant-fields)


## Manifest merger failed with multiple errors, see ？

- [Manifest merger failed with multiple errors, see](https://www.zhihu.com/question/36645628)


## 手机安装app出现多个图标

查看AndroidManifest.xml去掉下面代码。
```
<category android:name="android.intent.category.LAUNCHER" />
```

## rn跳转到原生

https://www.cnblogs.com/shen076/p/6380034.html

https://blog.csdn.net/csdn_aiyang/article/details/78397409?fps=1&locationNum=10



## 'Couldn't follow symbolic link' when testing release build for Android

```
rm -rf node_modules && npm install
```


## 添加依赖库

点击菜单中的“项目结构（倒数第四个 project construct）”图标按钮，或者快捷键`cmd + ;` 。

- [Android Studio 添加依赖库三种方式](https://www.jianshu.com/p/554900684447)


## 解决“Cannot merge new index xxx into a non-jumbo instruction”的问题

使用Gradle构建的，在模块的build.gradle里配置：

```
android {

    // 添加
    dexOptions {
        jumboMode true
    }
}
```

之后可能会报错：`method ID not in [0, 0xffff]: 65536`。需要在build.gradle文件里添加：

```
android {
    defaultConfig{
        ...
        multiDexEnabled true  // 添加
    }
}
```

- [Android Studio 遇到 “method ID not in [0, 0xffff]: 65536” error](https://blog.csdn.net/zouchengxufei/article/details/49996717)

## java.lang.OutOfMemoryError: GC overhead limit exceeded

意思是电脑内存、CPU占用太大了。

- [Error java.lang.OutOfMemoryError: GC overhead limit exceeded](https://stackoverflow.com/questions/1393486/error-java-lang-outofmemoryerror-gc-overhead-limit-exceeded)


## Duplicate files copied in APK lib/armeabi-v7a/libgnustl_shared.so

在主项目的`grade.build`里添加：

```
android {
    packagingOptions {
        pickFirst 'lib/armeabi-v7a/libgnustl_shared.so'
        pickFirst 'lib/arm64-v8a/libgnustl_shared.so'
        pickFirst 'lib/x86_64/libgnustl_shared.so'
        pickFirst 'lib/x86/libgnustl_shared.so'
    }
}
```

- [How to fix the libgnustl_shared.so file duplicated which in third party sdks?](https://stackoverflow.com/questions/37200853/how-to-fix-the-libgnustl-shared-so-file-duplicated-which-in-third-party-sdks/39584838#39584838)

## Error:Could not download gradle-core.jar (com.android.tools.build:gradle-core:2.3.3): No cached version available for offline mode

1. 打开android studio安装目录对应的目录`C:\Program Files\Android\Android Studio\gradle\m2repository\com\android\tools\build\gradle`。
2. 修改下面文件

![](./imgs/android-gradle-error.png)




参考 [Gradle版本号不匹配导致的错误解决办法](https://blog.csdn.net/scarecrow_fly/article/details/77949905)


## JAVA_HOME配置

- [Installing the JDK Software and Setting JAVA_HOME](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)


## adb不是内部命令

**windows系统**
将android studio sdk目录打开，`C:\Users\banli17\AppData\Local\Android\sdk\platform-tools`。里面有个adb.exe文件。 将它配置成环境变量。

**mac系统**

```bash
// 方法1，全局生效
vim /etc/profile
export PATH=$PATH:/Users/banli/Library/Android/sdk/platform-tools
source /etc/profile

// 方法2，用户生效
sudo vim ~/.bash_profile
export PATH=$PATH:/Users/banli/Library/Android/sdk/platform-tools
source ~/.bash_profile
```

## Error 'Could not determine java version from ‘10’

回退到[java8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)。


## React Native android build failed. SDK location not found

在android目录新建`local.properties`，添加sdk地址(Android studio sdk里面有)。

```
sdk.dir = /Users/USERNAME/Library/Android/sdk
```

## "application" 相关联的属性 "tools:replace" 的前缀 "tools" 未绑定



# 常用的java函数


## 获取远程文件的大小

```java
import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.io.IOException;
import com.facebook.react.bridge.Promise;

@ReactMethod
public void getFileSize(String path,Promise promise) throws Exception{
    URL url = new URL(path);
    HttpURLConnection conn = null;
    try {
        conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("HEAD");
        conn.getInputStream();
        promise.resolve("" + conn.getContentLength());
    } catch (IOException e) {
        promise.reject("-1");
    } finally {
        conn.disconnect();
    }
}
```

## 安装apk文件

```java
import android.content.Intent;
import android.net.Uri;

@ReactMethod
public void install(String path) {
    String cmd = "chmod 777 " + path;
    try {
        Runtime.getRuntime().exec(cmd);
    } catch (Exception e) {
        e.printStackTrace();
    }
    Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    intent.setDataAndType(Uri.parse("file://" + path), "application/vnd.android.package-archive");
    reactContext.startActivity(intent);
}
```

# java基础知识

## 资料

- [java基础教程](http://www.runoob.com/java/java-modifier-types.html)
- https://reactnative.cn/docs/0.51/native-modules-android.html
- https://www.jianshu.com/p/b9a7dbe9b336
- http://www.devio.org/
- https://www.jianshu.com/u/ca3943a4172a
- https://github.com/crazycodeboy
- https://gradle.org/install/
- http://maven.apache.org/download.cgi  mac下载二进制zip文件

## 变量类型

java数据类型有基本数据类型和引用类型。

基本类型有：
- 数值型
    - byte
    - short
    - int
    - long
    - float
    - double
- 字符型
    - char
- 布尔型
    - boolean

引用类型有：
- 类 class
- 接口 interface
- 数组

java 支持的变量类型有：
- 类变量
- 实例变量
- 局部变量

```javascript
public class Variable{
    static int allClicks=0;    // 类变量，初始化后值不能修改

    String str="hello world";  // 实例变量，可以在其他方法中使用

    public void method(){

        int i =0;  // 局部变量

        str = 'hi';

    }
}
```

## 访问修饰符

- default：在同一包内可见
- private：在同一类内可见
- public：对所有类可见
- protected
