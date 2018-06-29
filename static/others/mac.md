# mac使用技巧

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
