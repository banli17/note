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

## 打开 mac 自身支持 ntfs 的读写

1、`diskutil list`可以查看挂载的盘的名字

2、`sudo vim /etc/fstab`添加下面一行。注意`\040`是空格

```bash
// 比如盘名banli disk
LABEL=banli\040disk none ntfs rw,auto,nobrowse
```

3、设置完成后，建立连接，挂载 Volumes 下。

```bash
sudo ln -s /Volumes ~/Desktop/Volumes
```

接着 finder 左侧设备的盘就可以读写了。

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

- 截图 snip：https://snip.qq.com/
- xnipapp: https://zh.xnipapp.com/
- 时间管理
  - [Microsoft To Do](https://to-do.microsoft.com/tasks/login?redirectUrl=/en-us?source=product_page)

切换到国内源

```
# 替换brew.git:
$ cd "$(brew --repo)"
# 中国科大:
$ git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
# 清华大学:
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

# 替换homebrew-core.git:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
# 中国科大:
$ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
# 清华大学:
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

# 替换homebrew-bottles:
# 中国科大:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile
# 清华大学:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 应用生效:
$ brew update
```

切换到官方源

```
# 重置brew.git:
$ cd "$(brew --repo)"
$ git remote set-url origin https://github.com/Homebrew/brew.git

# 重置homebrew-core.git:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

https://blog.csdn.net/zhanglh046/article/details/78890432

备份一下原本的 yum 源：
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
下载阿里云的 yum 源【我下的是 CentOS7 的，如果需要其他版本，那么只需要将下面的 7 改成 5 或 6 即可】【这一步需要能联网】：
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
之后运行给 install 生成缓存
yum makecache
