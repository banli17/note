# ios版本上线

ios版本的发布太麻烦了，主要分为以下几个步骤:

1. 
2. 在

## 在 itunes Connect 中新建 app

进入<a href='https://itunesconnect.apple.com/login' target='_blank'>Itunes Connect官网</a>，登录，注意如果有多个账号不要登录错了。选择`我的App`。

然后点击左上角的加号，添加一个app。注意这里有个问题，ios 包名必须是 `com.xxx.yyy`形式，不能是 `com.xxx`，否则套装ID会有问题。


## 生成icon图标，屏幕截图，启动页等图片

**生成icon图标**

http://ydimage.yidianhulian.com/ 

**生成启动页** 

使用App icon gear 工具

**生成启动页** 

直接用`xcode sumulator`模拟器打开后，`command + 1`，然后 `command + s` 保存屏幕截图，即使模拟器超出了屏幕也不要紧，会自动截完整。最后的截图会在电脑的桌面上。

要注意的是，如果外接了显示器，一定要把模拟器拖到mac原显示器上，否则尺寸会不对。

## 参考文章

- http://www.jianshu.com/p/1d03f8f31f58?nomobile=yes


## 加速审核

- https://developer.apple.com/contact/app-store/?topic=expedite