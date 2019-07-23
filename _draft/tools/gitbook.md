---
title: "如何使用gitbook写书"
date: 2018-12-08 17:29:30
tags:
---

## 使用

```bsh
gitbook serve .
gitbook build
```

**1.报错TypeError: Cannot read property 'file' of undefined**

原因是在`.gitignore`文件里将`book.json`文件屏蔽掉了。

**2. 语法高亮支持**

[highlight](https://highlightjs.org/static/demo/)

## 参考
http://www.cnblogs.com/zhangjk1993/p/5066771.html
http://gitbook.zhangjikai.com/plugins.html
https://plugins.gitbook.com/plugin/changyan
http://www.chengweiyang.cn/gitbook/customize/book.json.html


hexo clean && hexo g && hexo server