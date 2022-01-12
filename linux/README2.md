---
title: linux
---

## 浏览文件

-   ls, list

```sh

~]# ls -l
drwxr-xr-x  2 root root         6 Jan  7 23:27 a
-rw-------. 1 root root      1241 Apr 13  2019 anaconda-ks.cfg
```

第一个字段是文件类型，- 表示普通文件，d 表示目录。
后面 9 个字符是模式，即权限位，3 个一组，每组用 rwx 表示，分别是用户权限、文件所属组权限以及其它用户的权限。改变权限可以用`chmod 711 anaconda-ks.cfg`。

第二个字段是硬链接数目。
第三个字段是所属用户，第四个字段是所属组，第五个字段是文件大小，第六个字段是文件被修改的日期，最后是文件名。

可以用 chown 改变所属用户，chgrp 改变所属组。

## 安装软件

linux 安装包有 rpm(centeos)、deb(ubuntu)格式。安装命令如下。-i 表示 install。

```sh
# centeos
rpm -i jdk-xxx_linux-x64_bin.rpm
# ubuntu
dpkg -i jdk-XXX_linux-x64_bin.deb
```

查看安装的软件列表。

```
# 显示安装软件列表
rpm -qa和dpkg -l

# 分页显示，more 只能往后翻，less 能往前后翻，q退出
rpm -qa | more和rpm -qa | less
```

-q query a all -l list

搜索安装的软件。

```
rpm -qa | grep jdk
```

删除安装的软件。

```
# -e 表示erase
rpm -e
# -r 表示 remove
dpkg -r
```

软件管家：yum(centeos)、apt-get(ubuntu)。

```
# 搜索可以安装的 jdk 版本， 如果太多，可以用 grep more less 过滤
yum search jdk
apt-cache search jdk

# 安装
yum install java-11-openjdk.x86_64
apt-get install openjdk-9-jdk

# 卸载
yum erase java-11-openjdk.x86_64
apt-get purge openjdk-9-jdk
```

/etc/yum.repos.d/CentOS-Base.repo 可以配置下载源地址。

```
[base]
name=CentOS-$releasever - Base - 163.com
baseurl=http://mirrors.163.com/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7
```

下载

```
wget url
```

解压：linux 默认有 tar 程序，如果是 zip，就需要安装解压软件。

```
yum install zip.x86_64 unzip.x86_64
```

如果是 tar.gz 格式，可以通过下面命令解压

```
tar xvzf jdk-XXX_linux-x64_bin.tar.gz
```

## 环境变量

```bash
# 临时有用，登录退出就失效
export JAVA_HOME=/root/jdk-XXX_linux-x64
export PATH=$JAVA_HOME/bin:$PATH

# 用户主目录下 .bashrc 文件，ls -al查看，每次登录时，这个文件会运行，也可以source .bashrc 手动执行。
```

## 运行程序

1. shell 交互执行

```
./vim a.txt
```

输出直接显示在界面上。

2. 后台运行

nohup 命令， no hang up(不挂起), 加 & 表示后台运行。

```

```

输出到保存到文件最好，

```
nohup command > out.file 2>&1 &
```

1 表示文件描述符 1，表示标准输出，2 表示文件描述符 2，意思是标准错误输出， 2>&1 表示标准输出和错误输出合并。

关闭进程

```
ps -ef |grep 关键字 |awk '{print $2}' |xargs kill -9
```

ps -ef 列出正在运行的程序， awk '{print \$2}'表示第二列的内容，是运行的程序 ID， 通过 xargs 传递给 kill -9，让它关闭。 如果知道程序 ID，可以直接通过 kill 关闭。

3. 以服务方式运行，如 MySQL，MySQL 被 Oracle 收购后，因为担心授权问题，改为使用 MariaDB，它是 MySQL 的一个分支。

```
# 安装
yum install mariadb-server mariadb
# 启动
systemctl start mariadb
# 设置开机启动
systemctl enable mariadb
```

它会在 /usr/lib/systemd/system 目录下，创建一个 XXX.service 的配置文件，从而成为一个服务。

## 关机和重启

```
shutdown -h now
reboot
```

## 远程下载/上传文件

```sh
# 连接远程服务器
sftp root@192.168.25.140
# 查看当前服务器路径
lpwd
# 查看远程服务器路径[默认用户家目录]
pwd
# 上传文件
put 当前路径 远程连接
# 下载文件
get 远程路径 当前路径
```
