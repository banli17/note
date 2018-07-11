# xCode 常见问题总结

## xocde 下载地址

```markup
https://developer.apple.com/download/more
```

## 模拟器Home键
```
command + shift + h
```

## * is busy: Processing symbol files

`xcode`真机调试的时候，提示`* is busy: Processing symbol files`。解决方法如下：
1. 尝试重新拔插测试设备。 
2. 如果“1”不起作用，重启Xcode尝试。 
3. 如果“2”不起作用，重启手机，然后尝试。

## library not found from 

在编译的时候，有时候报这个错误 "library not found for - "。由于是我们在项目中使用了一些第三方的库，就比如我再使用百度的静态库文件的时候，报出的这个错误。
当xcode在编译的时候却找不到这个库，从而导致如此。

所以我们要让xcode知道这个库文件在哪里，从而在编译的时候轻松的找到它。

解决办法：

获取 库文件所在的那个文件夹 路径，添加到 Target的Build Settings界面。或者不需要的话，将 `Build Phases` 里的 `Link Binary With Libraries`相关库删除。


## No bundle URL present

1、可能开了多个终端
2、可能翻墙了

## The app ID cannot be registered to your development team

xcode 真机安装报错，`The app ID "*******" cannot be registered to your development team. Change your bundle identifier to a unique string to try again`。
2.png
大概的意思就是appid被其他的项目占据了。导致原因是因为我之前真机运行过一个项目，然后被卸载了，重建之后appid依然被之前的项目占据，解决办法就是修改 `General`里的 `Bundle Ientifier`。
<img src="http://www.w3croad.com/images/20170704/3.jpg">


## Signing for requires a development team. Select a development team in the project editor.
解决方法：单击工程名 -》Signing -》 Team -》 选择对应的Account（如果没有Account，需要主动创建一个）

## Code signing is required for product type Unit Test Bundle in SDK iOS 8.0
首先选择测试项目，

参考资料：https://stackoverflow.com/questions/26109851/code-signing-is-required-for-product-type-unit-test-bundle-in-sdk-ios-8-0


## ld: file not found: /Users/banli/Library/Developer/Xcode/DerivedData/sucaiapp

1、点击菜单的`Product -> Clean`，然后重新build。
2、或者选择 [your project's Tests]，然后选择 `General -> Host Application`，选择后重新 `Build`。
https://stackoverflow.com/questions/26665196/ld-file-not-found-linker-command-failed-with-exit-code-1-use-v-to-see-invoca

## appid 登录时 incorrect verification code apple id
登录https://developer.apple.com/account/#/welcome 时，明明是正确的码，但还是老报这个错误。解决方法是：先点开苹果的一个软件，比如ibooks，icloud等。登录appid一下，验证通过后，再登录网页即可。

## 提高ios审核率
https://zhuanlan.zhihu.com/p/22572268
http://wetest.qq.com/ios/?from=content_zhihuzhuanlan


## 一键生成appicon多个尺寸的图标
http://ydimage.yidianhulian.com/ 

## The filename 未命名.ipa in the package contains an invalid character(s). The valid characters are:A-Z
上传app的时候，archive打包的名字不能有中文


## 提交版本的时候，一直显示在验证
网要翻墙，找一个美国的vpn。

## 提交成功后，在itunesconnect 里面没有显示
查看邮件，里面会有提示，一般是没有在info.plist里设置权限
<img width='60%' src="http://www.w3croad.com/images/20170725/2.png">
http://www.jianshu.com/p/067cb1ff8689

iOS Build Fail 但是却没有红色警告提示！

http://blog.csdn.net/xjh093/article/details/52636563

## nw_connection_get_connected_socket 109 Connection has no connected handler

解决方法： Xcode menu -> Product -> Edit Scheme  > arguments >  Environment Variables -> Add -> Name: "OS_ACTIVITY_MODE", Value:"disable" -> Run your app again 

参考网址：https://stackoverflow.com/questions/44081674/react-native-connection-has-no-connection-handler-error-meaning

## xocde 模拟器调试的时候，代码改了，但是视图一直不变化

```
rm -rf /usr/local/var/run/watchman && brew uninstall watchman && brew install watchman
```

注意将网络代理关掉，并重启模拟器和命令行。

参考文章： https://github.com/facebook/react-native/issues/10889


## CocoaPods升级

有时候，使用pod install 提示错误 `The `项目`None of your spec sources contain a spec satisfying the dependency: `NIMSDK (= 4.9.0)`.`。

```
pod install --repo-update  // 运行这个之后，再 pod install

sudo gem install cocoapods
```

需要将之前`Build Phases -> libPods..a` 删掉，再 `pod install` ，会自动加上这个 `libPods...a` 文件。(可能需要在左侧菜单library里添加.xcodeproj文件)