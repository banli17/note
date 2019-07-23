---
title: "计算机常见问题总结"
date: 2017-11-19 02:34:48
tags:
toc: true
---


## \r\n是什么

- `\r`:`carriage return`，表示光标移动到行首。 以前mac上用这个来。
- `\n`: `new line`，换一行。

换行在每个系统上不一样。老mac上用\r，window上用\r\n。linux 和新 mac 上用 \n。所以删除换行一般是将`\r\n`或`\n`替换为空。

具体的可以查看[阮一峰博客：回车和换行](http://www.ruanyifeng.com/blog/2006/04/post_213.html)