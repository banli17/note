---
title: 打包发布
---

## Android 系统

### 打包

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

5. 在 `android/app/build.gradle` 里添加如下代码。

```java title="android/app/build.gradle"
...

def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...

    // 如果要只打包某个架构的 apk，可以在 defaultConfig 配置，然后 flutter build apk
    // defaultConfig {
    //     ndk {
    //         abiFilters "armeabi-v7a"
    //     }
    // }

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
       release {
           signingConfig signingConfigs.release  // 注意这里 release
       }
   }
}
```

6. 构建，可以通过命令行。

```sh
# 移除--split-per-abi参数后,会生成支持所有ABI平台的Apk文件
# 打包文件在 <app dir>/build/app/outputs/apk/release/app-armeabi-v7a-release.apk
flutter build apk --split-per-abi

# dart 混淆 obfuscate
flutter build apk --obfuscate --split-debug-info=/Users/banli/Desktop/test/flutter_app/split_debug_info  --split-per-abi
```

或者 android studio 的`Build -> flutter -> build apk`。

7. 打包完成后，命令行会显示打包文件的输出目录，选择`app-armeabi-v7a-release.apk`，这个架构的 apk 在各个 android 系统中都支持。

![](imgs/2020-06-04-11-13-03.png)

-   android abi 详细:[https://developer.android.google.cn/ndk/guides/abis](https://developer.android.google.cn/ndk/guides/abis)
-   官方详细文档[https://flutter.dev/docs/deployment/android](https://flutter.dev/docs/deployment/android)

## Ios 系统

### 准备工作

在开始发布应用程序之前，请确保其符合 Apple 的 [《应用程序审查指南》](https://developer.apple.com/app-store/review/)。

### 打包

### 发布
