---
title: "mac使用技巧"
date: 2018-07-28 14:15:19
tags:
---

## 截图

- 截屏幕：`command - shift - 3`
- 部分截图：`command - shift - 4`

图片保存在桌面上。

## 显示隐藏文件

显示隐藏文件，在当前目录按 `command + shift + .`。

## 打开mac自身支持ntfs的读写

1、`diskutil list`可以查看挂载的盘的名字

2、`sudo vim /etc/fstab`添加下面一行。注意`\040`是空格

```bash
// 比如盘名banli disk
LABEL=banli\040disk none ntfs rw,auto,nobrowse
```

3、设置完成后，建立连接，挂载Volumes下。

```bash
sudo ln -s /Volumes ~/Desktop/Volumes
```

接着finder左侧设备的盘就可以读写了。

## 安装未知来源软件

```bash
sudo spctl --master-disable  
```

## 一些链接

```bash
sudo ln -s /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code /usr/local/bin/vscode
```

## 突然没声音了

```
sudo killall coreaudiod
```

来源：https://www.zhihu.com/question/23498580


## 常用软件

- 截图snip：https://snip.qq.com/
- xnipapp: https://zh.xnipapp.com/

