---
title: 问题
---

## SourceTree 每次都需要输入密码的问题

使用 sourceTree 的时候每次 pull 和 push 代码都得输入一次密码才能操作。
在本地的 ssh 文件中添加上 ssh 信息也不行。
找到了一个解决方法，在 SourceTree -> Preferences -> Git 中设置为 Use System Git，就是 使用系统安装的 Git。
其实也有一个可能是我们公司使用的是 GitLab,仓库的地址是 http 的，如果是 https 的应该就不会出现这种问题。

img 标签的空隙 https://www.jianshu.com/p/552276d87c3d

解决办法有 2 个:

1. 把图片变为块级元素

```
img {display: block}
```

2. 给图片的 vertical-align 设置任意一个值

```
img {vertical-align: middle;}
```

## 上中下盒子对齐

```css
.lv-card-box {
  width: 345px;
  margin: 0 auto 41px;

  .box-header {
    background: url("../../_assets/imgs/bg-box-header.png") no-repeat;
    height: 50px;
    text-align: center;
    width: 100%;
    background-size: 100% 100%; // 防止边差 1px，没有对齐
    display: inline-table; // 防止上下图片产生 1px 空隙
  }

  .box-body {
    background: url("../../_assets/imgs/bg-box-body.jpg") repeat-y;
    background-size: 100% 100%;
    display: inline-table;
    width: 100%;
    min-height: 40px;
  }

  .box-footer {
    background: url("../../_assets/imgs/bg-box-footer.png") no-repeat;
    background-size: 100% 100%;
    height: 45px;
    width: 100%;
    display: inline-table;
  }
}
```

## Android line-height 垂直居中会向上偏移？

不要用 line-height。

```
<html lang="zh-cmn-Hans"></html>

body {
    font-family: miui, sans-serif;
}
```

- https://www.zhihu.com/question/39516424
- https://www.cnblogs.com/herizai/p/8463916.html

https://www.cnblogs.com/dongfangzan/p/5976791.html

## 阿里云 OSS 视频上传

跨域解决 https://blog.csdn.net/jinchunzhao123/article/details/90475074

## 资料

http://www.conardli.top/docs/JavaScript/%E8%8A%82%E6%B5%81.html#%E5%AE%9A%E6%97%B6%E5%99%A8%E5%AE%9E%E7%8E%B0
http://www.conardli.top/blog/article/%E7%BB%BC%E5%90%88/%E3%80%90%E8%87%AA%E6%A3%80%E3%80%91%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E6%B8%85%E5%8D%95.html#%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90
https://github.com/ConardLi/awesome-coding-js
