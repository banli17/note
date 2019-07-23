---
title: "react-native rn版本的升级"
date: 2017-12-09 17:01:21
toc: true
---


## RN升级

> 0.48修改太大，很多库都还没有同步过来，最终降级到0.47.2

由于目前`app`有个`bug`，就是`TextInput`为多行时，点击换行不能换行。在最新的`0.48`上已经修改。所以决定进行升级。下面记录升级的步骤：

1、安装`Git`: 下载<a href='https://git-scm.com/downloads' target='_blank'>git</a>，并把其路径添加到`PATH`变量中。

2、安装`react-native-git-upgrade`

```
npm install -g react-native-git-upgrade
```

3、运行更新命令

```
react-native-git-upgrade  // 直接将react-native 升级到最新版本
react-native-git-upgrade react-native@0.47.2  // 将react-native升级到指定版本
```

如果保存，可以试试先执行`yarn`，再执行上面的命令。

4、打开模拟器，执行`react-native run-android`

这一步会包很多错误，一一解决，如果在某个库那报错，则删除`package.json`中对应的`dependencies`库，再用`npm`安装最新的库即可。

如果出现莫名错误，则需要查看`android/setting.gradle`和`android/build.gradle`里面是否有已经删掉的库，如果有，则把对应的代码删掉。

如果出现下面的错误
```
android/app/src/main/java/com/dadichuangke/MainActivity.java:7: 错误: 程序包com.cboy.rn.splashscreen不存在
import com.cboy.rn.splashscreen.SplashScreen;
```

则重新去看一下github对应库的文档，发现新版本做了一些修改,于是`unlink`之后，重新`react-native link`。

> 参考资料：<a href='http://reactnative.cn/docs/0.48/upgrading.html' target='_blank'>react native升级</a>
