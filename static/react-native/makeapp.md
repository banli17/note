# 打包App

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
5、开启压缩 `app/proguard-rules.pro`

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
