# meta基础知识

### 学习

- [【原】移动web资源整理](http://www.cnblogs.com/PeunZhang/p/3407453.html#meta)
- [移动端网页设置的viewport 设置target-densitydpi有什么作用？](https://segmentfault.com/q/1010000006437059)
- [移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)
- [A tale of two viewports — part one](https://www.quirksmode.org/mobile/viewports.html)、[中文版](https://www.jianshu.com/p/6920a0d42a04)
- [A tale of two viewports — part two](https://www.quirksmode.org/mobile/viewports2.html)、[中文版](http://www.360doc.com/content/13/0918/12/8445249_315365119.shtml)
- [meta viewport](https://www.quirksmode.org/mobile/metaviewport/#link18)
- [淘宝的flexible适配方案为什么只对iOS进行dpr判断，对于Android始终认为其dpr为1?](https://www.zhihu.com/question/38303534)

### 总结

**1. 通用的模板**
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<!-- H5页面窗口自动调整到设备宽度，并禁止用户缩放页面 -->
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">

<!-- ios safari将网站添加到快速启动方式时，顶部状态栏样式，可选default、black、black-translucent -->
<meta content="black" name="apple-mobile-web-app-status-bar-style">

<!-- 忽略页面中的电话号码 -->
<meta content="telephone=no" name="format-detection">

<!-- 忽略android平台对邮箱地址的识别 -->
<meta content="email=no" name="format-detection">
<title>标题</title>
<link rel="stylesheet" href="index.css">
</head>

<body>
这里开始内容
</body>

</html>
```

**2. target-densitydpi是什么？**