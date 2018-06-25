# 常见问题

## react-native 加载 gif 图片
答：在ios上可以直接使用，在android端需要在build.gradle里的dependencies中，加入一行:
```
compile 'com.facebook.fresco:animated-gif:0.13.0'
```


# cookie

## fetch时带上cookie

现在有个需求，就是每次发数据请求的时候都需要带上cookie。但是我通过fetch请求的时候发现cookie并没有被带上。

在网上找了半天，原来是因为fetch请求需要配置一个credentials参数。具体如下：

```
fetch('1.json', {
    method: 'GET',
    credentials: 'same-origin'
}).then()
```

通过上面的修改，android端可以了，开心中...

接着我打开 xcode的 ios模拟器，发现又出问题了，提示 fetch 网络请求失败 network request failed。继续查找是什么原因。

最后发现原来，ios现在已经改成默认是发https请求了，这样会更加安全。但是我想发http啊，咋办呢？

解决办法是在xcode 里打开项目中的 Info.plist 然后添加几个配置。

1、右键新增App Transport Security Settings 设置成 Dictionary。（如果有了就不新增了）

2、在App Transport Security Settings的下面新增一个 Allow Arbitrary Loads 设置成Boolean，值改成Yes。

通过上面的修改，重启一个模拟器，就可以发请求了。

## cookie操作


## 参考文章

- fetch() and the missing Cookie on React Native Android
- 解决react native使用fetch函数在ios9报network request failed的问题