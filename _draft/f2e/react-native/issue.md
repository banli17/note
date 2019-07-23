---
title: "react-native 常见问题汇总"
date: 2018-12-20 20:26:43
toc: true
---

### 找不到 `extra -> support library`？

因为这个包 google 准备将它移除掉。不推荐使用了。如果需要使用，可以到[mvnrepository](http://www.mvnrepository.com/artifact/com.android.support/support-v4?repo=google)下载对应的aar版本。然后将它的后缀名改成 .zip。解压后目录里有个 `classes.jar`。

## android安装了genymotion插件后，看不到genymotion红按钮。

可能是toolbar没有打开，在`菜单栏 -> View -> ToolBar`打开。然后点击genymotion按钮，选择它的安装地址：`/Applications/Genymotion.app`。

## 修改genymotion的hosts文件

```bash
adb shell
mount -o remount,rw /system
echo "10.71.34.1   devmobservices" >> /etc/hosts
```


## 参考文章

- fetch() and the missing Cookie on React Native Android
- 解决react native使用fetch函数在ios9报network request failed的问题


使用pod install
被卡住:Updating local specs repositories
一种原因：pod install 被墙了，换成pod install --verbose --no-repo-update

另外一种原因：cocoapods是git使用管理，可能由于某种原因git存在了修改，再使用pod install的时候，会提示“在更新或合并之前解决修改（大概这个意思）”。解决办法：①解决修改，然后再pod install。②或者直接删除$HOME.cocoapods/repos/下面的master，再pod install 重新clone pod库。

还有一种原因，就是git更新超慢，导致的错觉


## Network request failed

最新的rn用chrome调试时，ajax请求发送报错，说是跨域请求失败。解决方法是另外打开一个能跨域的chrome模式进行调试。

```bash
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/banli/MyChromeDevUserData/
```

将上面 banli 换成自己的 mac 名称。

```
brew update && brew cask install react-native-debugger
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

1. xocde 下载地址: https://developer.apple.com/download/more

2. 模拟器Home键: `command + shift + h`

3. * is busy: Processing symbol files

`xcode`真机调试的时候，提示`* is busy: Processing symbol files`。解决方法如下：
1. 尝试重新拔插测试设备。 
2. 如果“1”不起作用，重启Xcode尝试。 
3. 如果“2”不起作用，重启手机，然后尝试。

4. library not found from 

在编译的时候，有时候报这个错误 "library not found for - "。由于是我们在项目中使用了一些第三方的库，就比如我再使用百度的静态库文件的时候，报出的这个错误。
当xcode在编译的时候却找不到这个库，从而导致如此。

所以我们要让xcode知道这个库文件在哪里，从而在编译的时候轻松的找到它。

解决办法：

获取 库文件所在的那个文件夹 路径，添加到 Target的Build Settings界面。或者不需要的话，将 `Build Phases` 里的 `Link Binary With Libraries`相关库删除。

5. No bundle URL present

1、可能开了多个终端
2、可能翻墙了

6. The app ID cannot be registered to your development team

xcode 真机安装报错，`The app ID "*******" cannot be registered to your development team. Change your bundle identifier to a unique string to try again`。

大概的意思就是appid被其他的项目占据了。导致原因是因为我之前真机运行过一个项目，然后被卸载了，重建之后appid依然被之前的项目占据，解决办法就是修改 `General`里的 `Bundle Ientifier`。

7. Signing for requires a development team. Select a development team in the project editor.
解决方法：单击工程名 -》Signing -》 Team -》 选择对应的Account（如果没有Account，需要主动创建一个）

1. Code signing is required for product type Unit Test Bundle in SDK iOS 8.0
首先选择测试项目，

参考资料：https://stackoverflow.com/questions/26109851/code-signing-is-required-for-product-type-unit-test-bundle-in-sdk-ios-8-0

1. ld: file not found: /Users/banli/Library/Developer/Xcode/DerivedData/sucaiapp

1、点击菜单的`Product -> Clean`，然后重新build。
2、或者选择 [your project's Tests]，然后选择 `General -> Host Application`，选择后重新 `Build`。
https://stackoverflow.com/questions/26665196/ld-file-not-found-linker-command-failed-with-exit-code-1-use-v-to-see-invoca

1. appid 登录时 incorrect verification code apple id

登录https://developer.apple.com/account/#/welcome 时，明明是正确的码，但还是老报这个错误。解决方法是：先点开苹果的一个软件，比如ibooks，icloud等。登录appid一下，验证通过后，再登录网页即可。

1. 提高ios审核率

https://zhuanlan.zhihu.com/p/22572268
http://wetest.qq.com/ios/?from=content_zhihuzhuanlan


1. 一键生成appicon多个尺寸的图标
http://ydimage.yidianhulian.com/ 

1. The filename 未命名.ipa in the package contains an invalid character(s). The valid characters are:A-Z
上传app的时候，archive打包的名字不能有中文

1. 提交版本的时候，一直显示在验证

网要翻墙，找一个美国的vpn。

1. 提交成功后，在itunesconnect 里面没有显示

查看邮件，里面会有提示，一般是没有在info.plist里设置权限: http://www.jianshu.com/p/067cb1ff8689

1. iOS Build Fail 但是却没有红色警告提示！

http://blog.csdn.net/xjh093/article/details/52636563

1. nw_connection_get_connected_socket 109 Connection has no connected handler

解决方法： Xcode menu -> Product -> Edit Scheme  > arguments >  Environment Variables -> Add -> Name: "OS_ACTIVITY_MODE", Value:"disable" -> Run your app again 

参考网址：https://stackoverflow.com/questions/44081674/react-native-connection-has-no-connection-handler-error-meaning

1. xocde 模拟器调试的时候，代码改了，但是视图一直不变化

```
rm -rf /usr/local/var/run/watchman && brew uninstall watchman && brew install watchman
```

注意将网络代理关掉，并重启模拟器和命令行。

参考文章： https://github.com/facebook/react-native/issues/10889

1. CocoaPods升级

有时候，使用pod install 提示错误 `The `项目`None of your spec sources contain a spec satisfying the dependency: `NIMSDK (= 4.9.0)`.`。

```
pod install --repo-update  // 运行这个之后，再 pod install

sudo gem install cocoapods
```

需要将之前`Build Phases -> libPods..a` 删掉，再 `pod install` ，会自动加上这个 `libPods...a` 文件。(可能需要在左侧菜单library里添加.xcodeproj文件)


com.android.ddmlib.InstallException: Failed to establish session
打开miui的开发者选项，关闭miui优化

