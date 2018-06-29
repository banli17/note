# 开发环境搭建

## 学习网址

- <a href='http://www.zhufengpeixun.cn/course/55' target='_blank'>珠峰课堂 React Native App实战</a>
- <a href='https://github.com/zhufengketang/app' target='_blank'>珠峰课堂 React Native App github</a>

## mac 开发环境搭建

### 安装node, watchman

推荐使用brew工具进行安装，安装brew的命令如下：

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

然后执行下面的命令，安装node和watchman

```
brew install node
brew install watchman
```

watchman是facebook发布的一个用来监视文件变动的工具。

### 安装react-native-cli

react-native-cli可以用来运行react-native的相关命令。

```
npm install -g react-native-cli
```

如果发生权限错误，可以执行：

```
sudo npm install -g react-native-cli
```

如果报 "cannot find module npmlog"，直接运行下面命令安装npm：
```
curl -0 -L http://npmjs.org/install.sh | sudo sh.
```

### xcode

安装xcode最简单的方法是在苹果商店安装。

### 虚拟机的安装

安装virtualbox 和genymotion
https://www.virtualbox.org/wiki/Downloads
https://dl.genymotion.com/releases/genymotion-2.8.0/genymotion-2.8.0.dmg
安装sdk
让虚拟机能够安装apk文件的方法：https://forum.xda-developers.com/showthread.php?t=2528952

### 下载Android Studio，并且安装sdk
react-native-android-studio-android-sdk-build-tools.png
react-native-android-studio-android-sdk-platforms.png
并且在genymotion中设置sdk的路径，否则可能会报错'* failed to start daemon * error: cannot connect to daemon'
测试安装

```
react-native init AwesomeProject
cd AwesomeProject
react-native run-android
```

遇到要下载gradle-2.4-all.zip，可以去 https://services.gradle.org/distributions/gradle-2.4-all.zip 下载之后，放在目录 User/banli/.gradle/wrapper/dists/gradle-2.4-all/6r4uqcc6ovnq6ac6s0txzcpc0下面

### 一些命令
```
mv software/reactnative/gradle-2.4-all.zip .gradle/wrapper/dists/gradle-2.4-all/
cd .gradle/wrapper/dists/gradle-2.4-all/
ls
unzip gradle-2.4-all.zip
history
cp -r 拷贝
```

### 如何运行iso的虚拟机
打开xCode然后打开ios/xxx.xcodeproj 然后，点击运行按钮。就可以启动了。

**android**

```
git clone https://github.com/facebook/react-native.git
./gradlew :Examples:UIExplorer:android:app:installDebug
```

参考文章：http://www.jianshu.com/p/bcaaf51a9d0b

**iso**

启动xcode，然后启动项目中的uiexplorer.xcodeproj即可。要首先npm install一下。



# genymotion安卓模拟器

## 安装genymotion模拟器步骤

1、注册账号并安装genymotion个人免费版。
2、安装virtualBox。
3、安装android sdk。
4、修改genymotion的setting里的ADB的android sdk。

## 安装apk

`genymotion`安装`apk`，需要首先安装Genymotion_ARM_Translation兼容包。

```markup
5.0.0以下链接: https://pan.baidu.com/s/1eSmu8H8 密码: dw7s
5.0.0以上链接: https://pan.baidu.com/s/1o8fYEro 密码: hcgf
```
下载完后，直接将`zip`包拖入到模拟器中，安装完成后，重启模拟器，再安装`apk`即可(将apk拖入到模拟器中)。

## 真机调试

修改项目下`library -> RCTWebSocket.codeproj -> RCTWebSocetExecutor.m`中的代码：

```
// 将localhost改为本机ip
NSString *host = [[_bridge bundleURL] host] ?: @"192.168.0.104";
// NSString *host = [[_bridge bundleURL] host] ?: @"localhost";
```

如果报错`.. busy`则重插`usb`，重启`xcode`或重启手机。


**"Error: `fsevents` unavailable" on jest --watch**

```bash
npm r -g watchman
brew install watchman
```

然后，重开`js bundle`命令行。
