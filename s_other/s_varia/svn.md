---
title: "SVN 使用技巧"
date: 2017-01-07 19:19:42
tags:
---

## 目标

掌握 svn 的原理，以及自己动手实践检出、提交版本、回退版本、文件恢复、处理冲突等操作。

## 学习资料

- [SVN 教程](http://www.runoob.com/svn/svn-tutorial.html)
- [mac终端下svn常用命令](https://www.cnblogs.com/luckythan/p/4478706.html)

## 常用操作

### 新建版本

```
svnadmin create /var/svn/new-repos
```

### 忽略提交文件

新建一个svn-ignore.txt文件，填写需要忽略的文件：

```
node_modules/
.vscode/
```

然后运行命令：

```
// 设置当前目录的忽略配置
svn propset svn:ignore -RF ./svn-ignore.txt  .

// 查看忽略的文件
svn propget svn:ignore .

```

### 检出

检出是将svn服务端的版本下载到本地，下载的版本能受到svn客户端的版本控制，可以进行commit、update等操作。

```
svn checkout svn://192.168.0.1/runoob01 --username=user01
```

### 删除文件

```
svn delete path -m "delete test file"

例如：svn delete svn://192.168.0.1/test.php -m "delete test file"
或者直接svn delete test.php 然后再svn ci -m ‘delete test file‘，推荐使用这种
简写：svn (del, remove, rm)
```

### 提交

```
svn add .
svn commit -m "描述"


// 取消 add
svn revert --recursive example_folder
```

```
svn update


## 查看工作副本的状态

```
svn status
```

输入命令后，文件前面会显示 status 字段：

![](./imgs/svn-status.png)

```markup
? 未纳入版本控制
! 表示该项目已遗失 (被非 svn 命令所删除) 或是不完整
```

### 版本恢复

```
svn revert read.md  // 恢复单文件
svn revert -R trunk // 恢复目录用-R

// 将当前22版本恢复到之前的21版本
svn merge -r 22:21 read.md
```

### 查看日志

```
svn log path
例如：svn log test.php 显示这个文件的所有修改记录，及其版本号的变化
```

### 查看文件详细信息

```
svn info path
例如：svn info test.php
```

### 比较差异

```
svn diff path(将修改的文件与基础版本比较)
例如：svn diff test.php
svn diff -r m:n path(对版本m和版本n比较差异)
例如：svn diff -r 200:201 test.php
简写：svn di
```

### 将两个版本之间的差异合并到当前文件

```
svn merge -r m:n path
例如：svn merge -r 200:205 test.php（将版本200与205之间的差异合并到当前文件，但一般都会有冲突，需要处理）
```

## 一些概念

**1. 检出checkout 和导出有什么区别？**

检出的文件夹会受到svn客户端的控制，能进行 update、commit 操作。包含 .svn 隐藏文件夹。

导出的文件夹不受svn客户端控制，不包含 .svn 隐藏文件夹。

## 常见报错

**1. is out of date**

和其它人的版本有冲突，需要首先 `svn update` 一下。

**2. is already under version control**

在提交整个目录文件时，会报这个错。需要使用 `svn add ./* --force` 强制提交才行。而且貌似不强制提交，它也已经提交上去了。

**3.  is too old (format 29) to work with client version '1.8.9 (r1591380)' (expects format 31)**

切换到项目目录下，`svn upgrade` 一下。

## 资料

- [Subversion 版本控制](http://svnbook.red-bean.com/nightly/zh/svn-book.html)
