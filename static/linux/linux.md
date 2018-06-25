

## 环境搭建

- [虚拟机virtualBox](https://www.virtualbox.org/)
- [centeros](https://www.centos.org/download/)
- 连接工具
    - windows - xshell
    - mac - [iterm2](http://www.iterm2.com/)

## 准备工作

```
ifconfig   // 可能是不全版本，需要自己配置
ip addr    // 查看ip，有多个。lo回环ip，不走网卡，是内部网卡; enp0s3 通过vi编辑让它显示
vi /etc/sysconfig/network-scripts/ifcfg-enp0s3   修改 ONBOOT=yes
service network restart  重启网络
yum install net-tools  // 安装软件，能让使用ifconfig命令

cat /etc/redhat-release   // 查看linux的版本
```

wget 是一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP协议 下载，并可以使用 HTTP 代理。 先安装wget。

```
yum install wget
```

替换默认源

http://mirrors.163.com/.help/centos.html

```
// 备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

cd /etc/yum.repos.d/

wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
```

安装vim

```
yum install vim
```

## ssh

`ssh`是`Secure Shell`安全外壳协议，建立在应用层基础上的安全协议，可靠，专门为远程登录会话和其它网络服务提供安全性的协议。

有效防止远程管理过程中的信息泄露问题，SSH客户端适用于多种平台，SSH服务端几乎支持所有UNIX平台。

### 服务器安装SSH服务

1. 安装SSH，一般是安装好了的。可视化linux一般没有装，需要按下面步骤进行安装。

```
// 1.安装SSH
yum install openssh-server

// 2.启动SSH
service sshd start

// 3.设置开机运行
chkconfig sshd on
```

`ssh`是典型的客户端和服务端的交互模式，`windows`有很多工具支持ssh连接，比如`xshell`。

安装SSH客户端，直接执行`yum install openssh-client`，实际上安装服务端时，客户端就已经安装好了。

2. SSH config讲解

`config`为了方便我们批量管理多个`ssh`，`config`存放在`~/.ssh/config`。

`config`语法

```
Host     别名
HostName 主机名
Port     端口
User     用户名
IdentityFile  秘钥文件的路径
```

操作

```
cd ~/.ssh/
touch config
vim config

// 编写config
host "centos"
    HostName 192.168.56.101
    User root
    Port 22

// 如果有多个，继续按照上面的写法即可
```

按照上面操作后，就不需要每次`ssh root@192.168.0.105`这样连接，直接通过`ssh centos`就行了。

3. ssh免密登录`ssh key`

ssh key使用非对称加密方式生成公钥和私钥。私钥存放在本地`~/.ssh`目录，公钥可以对外公开，放在服务器的`~/.ssh/authorized_keys`。


**linux下的操作步骤**

```
// 0 进入本机.ssh目录
cd ~/.ssh

// 1 生成秘钥文件，比如centos_rsa。 `rsa`和`dsa`是加密方式。
ssh-keygen -t rsa
// 或者
ssh-keygen -t dsa

// 2 在本地ssh-add加入私钥
ssh-add ~/.ssh/centos_rsa

// 3 进入远程linux环境的~/.ssh目录，然后新建authorized_keys文件，将本机的centos_rsa.pub的内容复制进去
cd ~/.ssh
touch authorized_keys

```

操作完成后，就不需要密码登录了。

**windows下xshell步骤**

`xshell`在`工具->用户秘钥管理`中生成。


4. SSH安全端口

端口安全指的是尽量避免服务器的远程连接接口被不法分子知道，为此而改变默认服务端的操作。

修改ssh默认端口，可以修改文件`/etc/ssh/sshd_config`。

可以同时监听多个端口。

```
Port 22
Port 4000
```

然后执行`service sshd restart`重启ssh服务。

5. 总结

- ssh是什么，ssh就是为了安全考虑的。
- SSH服务端安装
- SSH客户端安装


## linux命令

### 软件操作命令

- 软件包管理器：yum

```
yum install xxx // 安装
yum remove xxx  // 卸载
yum search xxx  // 搜索
yum clean packages // 清理缓存
yum list        // 列出已安装
yum info xxx    // 软件包信息
```

### 服务器硬件资源信息

- 内存 free -m (MB)，free和buff/cache 的总和是还可以使用的。
- 硬盘 df -h (human 以人类看懂的形式展示)，load average表示负载平均值，分别是1、5、15分钟的平均值。
- 负载 w/top (1是满了，1.x是超频了)
- cpu个数 和 核数。cat /proc/cpuinfo
- fdisk 格式化磁盘

### 文件操作命令

**linux文件的目录结构**
- 根目录 /
- 家目录 /home 。~表示当前用户的家目录
- 临时目录 /tmp
- 配置目录 /etc
- 用户迷路 /usr

**操作命令**

- ls 查看目录下的文件,`ls -al == ll`
- touch 新建文件
- mkdir 新建目录，mkdir -p表示循环创建目录，`mkdir -p /test1/test2`
- cd    进入目录
- rm    删除文件和目录,rm -r 循环删除
- cp    复制
- mv    移动
- pwd   显示路径
- grep -r "xx" ./*  查找，-r相当于 -d recurse，-d表示查找目录而非文件，recurse表示递归。
- sed  -i "" "s@from 'antd-mobile'@from 'component/antd-mobile'@g" $a 查找替换 -i表示

**更多资料**参考[Linux命令大全](http://man.linuxde.net/grep)

**vim**

- vim 新建并打开文件
- gg 行首
- G  行尾
- dd 删除一行
- u  恢复

**系统用户操作命令**

- useradd 添加用户
- adduser 添加用户
- userdel 删除用户,userdel只能删除用户，并不会删除相关的目录文件。userdel -r 可以删除用户及相关目录。
- passwd  设置密码,passwd banli(用户名)

新建用户时，进入home目录，然后使用useradd，添加用户，添加后，home目录会生成一个对应的目录。

**useradd与adduser的区别**
useradd与adduser都是创建新的用户

在CentOs下useradd与adduser是没有区别的都是在创建用户，在home下自动创建目录，没有设置密码，需要使用passwd命令修改密码。

而在Ubuntu下useradd与adduser有所不同。

1、useradd在使用该命令创建用户是不会在/home下自动创建与用户名同名的用户目录，而且不会自动选择shell版本，也没有设置密码，那么这个用户是不能登录的，需要使用passwd命令修改密码。

2、adduser在使用该命令创建用户是会在/home下自动创建与用户名同名的用户目录，系统shell版本，会在创建时会提示输入密码，更加友好。

新建用户后，登录，发现报错`Permission denied (publickey,gssapi-keyex,gssapi-with-mic).`需要用root权限将允许密码登录设置为yes。

```
vim /etc/ssh/sshd_config
passwordAuthentication yes // 修改为yes
service sshd restart
```


**防火墙设置**

- 作用是保护服务器，
- 设置防火墙规则，开放80,22端口。
- 关闭服务器

```
yum install firewalld
service firewalld start  启动
service firewalld status
service firewalld stop/disable  停止/禁用

firewall-cmd --state  // 查看状态
firewall-cmd --version
firewall-cmd --get-zones
firewall-cmd --get-default-zones
firewall-cmd --list-all-zones
firewall-cmd --zones-public
firewall-cmd --list-ports
firewall-cmd --query-service-ssh
firewall-cmd --remove-service-ssh
firewall-cmd --add-service-ssh
firewall-cmd --list-services
```

**提权和文件上传下载操作**

提权：sudo、visudo，首先使用visudo命令添加用户。然后该用户就可以使用sudo了。

```
visudo
%banli ALL...  //添加一行
```

下载：wget、curl

```
wget http://www.baidu.com
curl -o baidu.html http://www.baidu.com
```

上传：scp

```
scp 1.txt banli@192.168.56.101:/tmp/
```

## webservers

Apache 和ngix

apache基本操作

在centos里叫httpd,在ubuntu里叫apache

```
yum install httpd
service httpd start
service httpd stop
```


Linux下的打包和解压缩命令  https://blog.csdn.net/liuyanfeier/article/details/62422315



用指定软件打开文件

```
open -a /Applications/WebStorm.app/ Desktop/MyProject/card/
如果使用频繁，还可以添加软连接

sudo ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/bin/sublime
```
这样输入`sublime 1.txt `就可以打开文件了



打包压缩
https://blog.csdn.net/qq_32014215/article/details/63684368
