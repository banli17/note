---
title: linux操作系统笔记
sidebar_label: linux操作系统
---


## 常用系统工作命令

### echo 

echo: 用于输出字符串或变量。`echo [字符串|$变量]`

```bash
echo linux
echo $SHELL
```

### date

date: 打印日期，可以输入+自定义格式

- %t tab
- %H 小时00-23
- %I 小时00-12
- %M 分钟
- %S 秒
- %j 今年中的第几天

```
# 2019-04-14 03:03:12
date '+%Y-%m-%d %H:%M:%S'

# 设置系统时间
date -s "20170901 8:30:00"

# 插件当前是今年第几天
date '+%j'
```

### reboot和poweroff

只有root权限才可以
reboot: 重启
poweroff: 关机

### wget

wget: 下载网络文件
- -b 后台下载模式
- -P 下载到指定目录
- -t 最大尝试次数
- -c 断点续传
- -p 下载页面中所有资源，包括图片、视频
- -r 递归下载

### ps

ps: 查看系统进程状态，格式是`ps [参数]`

- `-a`: 显示所有进程（包括其他用户进程）
- `-u`: 用户及其他详细信息
- `-x`：显示没有控制终端的进程

进程状态：

- R（run）: 进程正在运行或在运行队列中等待。
- S (stop): 休眠，当某个条件形成或接收到信号后，则脱离该状态。
- D (不可中断): 进程不响应系统异步信号，即使kill也不能中断。
- Z (僵死): 进程已经终止，但进程描述符仍然存储，直到父进程调用`wait4()`系统函数将进程释放。
- T (停止): 进程收到信号后停止运行。

命令参数有长格式(--)，短格式(-)，只有短格式之间能合并，而且可以不加-

### top

top: 用于动态监视进程活动与系统负载等信息。

前5行是系统整体的统计信息
第1行：系统时间、运行时间、登陆终端数、系统负载（三个数值分别是1分钟、5分钟、15分钟内的平均值，数值越小负载越低）
第2行：进程总数、运行中的进程数、睡眠中的进程数、停止的进程数、僵死的进程数。
第3行：用户占用资源百分比、系统内核占用资源百分比、改变过优先级的进程资源百分比、空闲资源百分比等。
第4行：物理内存总量、内存使用量、内存空闲量、作为内存缓存的内存量。
第5行：虚拟内存总量、虚拟内存使用量、虚拟内存空闲量、已被提前加载的内存量。

### pidof 命令

用于查询某个指定服务进程的 PID 值，格式是`pidof [参数] [服务名称]`。每个进程的进程号码值(PID)是唯一的。

```bash
[root@localhost ~]# pidof sshd
7116
```

### kill 命令

kill命令用来终止某个 PID 的服务进程，格式为`kill [参数] [进程PID]`。这种操作的效果和强制停止sshd服务一样。

```bash
[root@localhost ~]# kill 7116
```

### killall

killall命令用于终止某个指定名称的服务所对应的全部进程，格式为`killall [参数] [进程名]`，因为有些复杂软件的服务程序会有多个进程。

```bash
[root@localhost ~]# pidof httpd
```

如果报错：`killall command not found`，需要安装`psmisc`。

```bash
yum install psmisc
```

执行命令时在末尾添加&符号，可以进入后台执行。

## 系统状态检测命令

### ip addr

ip addr命令用于获取网卡配置和网络状态信息。

### uname 

uname 命令用来查看系统内核与系统版本信息。格式`uname [-a]`，`-a`用于查看完整的内核名称、主机名、内核发行版本、节点名、系统时间、硬件名称、硬件平台、处理器类型和操作系统名等信息。

```bash
[root@localhost ~]# uname -a 
```

如果要查看系统版本详细信息，需要查看 redhat-release 文件。

```bash
[root@localhost ~]# cat /etc/redhat/release
```

### uptime

uptime 用于查看系统的负载信息。`load average`分别是1、5、15分钟的负载平均值。尽量不要长期超过1，生产环境不要超过5.

```bash
[root@localhost ~]# uptime
15:50:32 up 10:21, 1 user, load average: 0.00, 0.01, 0.05 
```

### free

free 命令用于显示当前系统中内存使用量信息，格式是`free [-h]`。

### who

who 命令用于查看登入主机的用户终端信息。

```bash
[root@localhost ~]# who
# 登陆用户名 终端设备 登陆时间
```

### last

last 命令用于查看所有系统的登陆记录。这些信息是保存到日志文件中的，所以黑客可以更改，不要用它来判断有无恶意入侵。

### history

history 命令用于显示历史执行过的命令。默认是1000条，记录数量定义在`/etc/profile`的HISTSIZE中。用过使用`-c`会清空所有命令历史记录。 `!编号数字`可以执行第多少个历史命令。

```bash
history
history -c
!15
```

### sosreport

sosreport 命令用于搜集系统配置及架构信息并输出诊断文档。如果`command not found`，需要安装`sos`包。





## vim编辑器


### 复制

```
y^  复制到行首，或 y0
y$  复制到行尾
yw  复制一个word 
y2w 复制2个word
y1G 复制到文件首
yG  复制到文件尾
"+y 将vim的内容复制到系统剪切板，可以 ctrl + v 粘贴
```


### 剪切

```
dd  剪切整行
d^  剪切到行首
d$  剪切到行尾
dw  剪切一个word
dG  剪切到文件尾
```

### 粘贴

```
:reg 查看剪贴板状态，一共有12个剪贴板
"Ny  复制第N个剪贴板的内容
Np   粘贴第N个剪贴板的内容
"+p  将系统剪切板内容粘贴到vim中
```



- [vim 复制/剪切/粘贴/撤销操作](https://blog.csdn.net/qidi_huang/article/details/52179279)


## 磁盘管理

文件系统层次化标准(FHS, filesystem hierarchy standard)。

linux文件和目录是区分大小写的，且名称不能包含`/`。

- `/boot`: 开机所需文件，内核、开机菜单以及所需配置文件等。
- `/dev`: 以文件形式存放任何设备与接口。
- `/etc`: 配置文件。
- `/home`: 用户主目录。
- `/bin`: 存放单用户模式下还可以操作的命令。
- `/lib`: 开机时用到的函数库，以及`/bin`与`sbin`下面的命令要调用的函数。
- `/sbin`: 开机过程中需要的命令。
- `/media`: 用于挂载设备文件的目录。
- `/opt`: 放置第三方的软件。
- `/root`: 系统管理员的家目录。
- `/srv`: 一些网络服务的数据文件目录。
- `/tmp`: 任何人均可使用的共享临时目录。
- `/proc`: 虚拟文件系统，例如系统内核、进程、外部设备及网络状态等。
- `/usr/local`: 用户自行安装的软件。
- `/usr/sbin`: 系统开机时不会使用到的软件/命令/脚本。
- `/usr/share`: 帮助与说明文件，也可放置共享文件。
- `/var`: 主要存放经常变化的文件，如日志。
- `/lost+found`: 当文件系统发生错误时，将一些丢失的文件片段存放在这里。

## 物理设备的命名规则

udev设备管理器服务决定了设备在/dev目录中的名称。

- `IDE设备`: `/dev/hd[a-d]`。
- `SCSI/SATA/U盘`: `/dev/fd[a-p]`。
- `软驱`: `/dev/fd[0-1]`。
- `打印机`: `/dev/lp[0-15]`。
- `光驱`: `/dev/cdrom`。
- `鼠标`: `/dev/mouse`。
- `磁带机`: `/dev/st0`或`/dev/ht0`。

一般硬盘是`/dev/sd`开头，用`a-p`来代表16块不同的硬盘。硬盘的分区编号是主分区或扩展分区从1开始，4结束；逻辑分区从5开始。

系统内核识别主板插槽顺序，首先是`/dev/sda`。大多数主板的的插槽顺序就是系统内核的识别顺序。

分区的数字编码是可以手动指定的，不一定是从1...n延续下来的。

分析一下/dev/sda5这个设备文件名称包含哪些信息。/dev/目录中保存的应当是硬件设备文件；其次，sd表示是存储设备；然后，a表示系统中同类接口中第一个被识别到的设备，最后，5表示这个设备是一个逻辑分区。一言以蔽之，“/dev/sda5”表示的就是“这是系统中第一块被识别到的硬件设备中分区编号为5的逻辑分区的设备文件”。

简单说一下硬盘。

## 文件系统

文件系统的作用是合理规划硬盘。

- `Ext3`: 是一款日志文件系统，能够在系统异常宕机时避免文件系统资料丢失，并能自动修复数据的不一致与错误。会把磁盘的写入都记录下来。
- `Ext4`: Ext3改进版本，作为RHEL6系统中的默认文件管理系统，支持存储容量高达1EB(1,073,741,824GB)，且能有无限多的子目录，能够批量分配block块，从而极大地提高读写效率。
- `XFS`: 一种高性能的日志文件系统，是RHEL7中默认的文件管理系统。发生意外宕机后尤其明显，即可以快速地恢复可能被破坏的文件，最大存储18EB。

## 磁盘容量配额

- 没有quota命令则安装quota。
- 可以限制用户的使用硬盘大小和文件个数。
- 分为软限制和硬限制，软限制在超出一定额度还能使用，超出硬限制会强制停止。

```bash
# 开启用户的usrquota配额服务 
vim /etc/fstab
# UUID=812b1f7c-8b5b-43da-8c06-b9999e0fe48b /boot xfs defaults,uquota 1 2
reboot
# 看目录是否能配额
mount | grep boot
# /dev/sda1 on /boot type xfs (rw,relatime,seclabel,attr2,inode64,usrquota)

useradd tom
chmod -Rf o+w /boot
```

- `xfs_quota`命令用于设置限额。-x表示要执行的命令，-x表示专家模式。

```bash
# 硬盘使用量的软限制和硬限制分别为3MB和6MB；创建文件数量的软限制和硬限制分别为3个和6个。
xfs_quota -x -c 'limit bsoft=3m bhard=6m isoft=3 ihard=6 tom' /boot

# 查看
xfs_quota -x -c report /boot

# 测试
su - tom
dd if=/dev/zero of=/boot/tom bs=5M count=1
```

- `edquota`命令用于编辑限额。-u表示对哪个用户设置，-g表示针对哪个用户组设置。

```bash
edquota -u tom

# 删除
edquota -e tom
```

## 软硬方式链接

- `硬链接(hard link)`：指向原始文件的inode指针，系统不为它分配独立的inode和文件，所以原始文件和硬链接文件指向同一个文件，所以原始文件删除后，还是可以通过硬链接访问。每增加一个硬链接，该文件的inode连接数就加1，只有链接数为0时，才算彻底删除。技术限制，不能跨分区对目录文件进行链接。
- `软链接(symbolic link,符号链接)`：就是快捷方式。

创建链接的方式是：`ln [选项] 目标`。

- `s`: 创建符号链接，默认创建硬链接。
- `f`: 强制创建文件或目录的链接。
- `i`: 覆盖前先询问。
- `v`: 显示创建链接的过程。

```bash
ln readme.txt 1.txt
ls -l readme.txt
# 这里的2是硬链接数
-rw-r--r-- 2 root root 26 Jan 11 00:13 readme.txt
```



Linux 删除用户 userdel 时提示被进程占用 is currently used by process

因为切换过用户。ctrl+d退出登陆。

## 用户管理

### 权限管理


UID(User IDentification)相当于身份证号，root的UID是0.

- 管理员UID为0: 系统的管理员用户。
- 系统用户UID为1-999：linux系统为了避免某个服务程序有漏洞而被黑客提权到整台服务器，默认服务程序会有独立系统用户负责运行。
- 普通用户UID从1000开始：管理员创建的用户。

用户组：GID，Group IDentification。

每个用户创建时，自动创建了一个同名基本用户组。纳入其它组后，其它组叫做扩展用户组，一个用户可以有多个扩展用户组。

#### useradd

useradd 命令用于创建新的用户，格式为`useradd [选项] 用户名`。创建时，默认家目录在`/home`目录下，默认Shell解释器为/bin/bash，默认创建一个同名基本用户组。可以通过下面参数修改：

- `d`: 执行家目录，默认为`/home/username`。
- `e`: 账户的到期时间，格式为`YYYY-MM-DD`。
- `u`: 指定该用户的默认UID。
- `g`: 指定一个初始的用户基本组(必须已存在)。
- `G`: 指定一个或多个扩展用户组。
- `N`: 不创建与用户同名的基本用户组。
- `s`: 指定该用户的默认Shell解释器。

通过`cat /etc/passwd`查看用户。

#### groupadd

groupadd 命令用于创建用户组，格式为`groupadd [选项] 群组名`。

#### usermod

usermod 命令用于修改用户的属性，格式为`usermod [选项] 用户名`。

- `c`: 填写用户账户的备注信息。
- `dm`:连用可以重新指定用户家目录并自动把旧的数据转移过去。
- `e`: 账户到期时间，格式为`YYYY-MM-DD`。
- `g`: 变更所属用户组。
- `G`: 变更扩展用户组。
- `L`: 锁定用户禁止其登陆系统。
- `U`: 解锁用户，允许其登陆系统。
- `s`: 变更默认终端。
- `u`: 修改用户UID。

```bash
# 查看用户
id banli

# 修改用户组
usermod -G root banli
```

#### passwd

passwd 命令用于修改用户密码，过期时间，认证信息等。格式为`passwd [选项] 用户名`。

- `l`: 锁定用户，禁止其登陆。
- `u`: 解除锁定，允许用户登陆。
- `--stdin`: 允许通过标准输入修改用户密码，如`echo 'newpassword' | passwd --stdin banli`。
- `d`: 使该用户可以空密码登陆。
- `e`: 强制用户下次登陆时修改密码。
- `S`: 显示用户的密码是否被锁定，以及密码的加密算法。

#### userdel

userdel 命令用于删除用户，格式为`userdel [选项] 用户名`。默认不会删除用户的家目录。

- `f`: 强制删除用户。
- `r`: 同时删除用户及家目录。

## 文件权限与归属

- `-`: 普通文件
- `d`: 目录文件
- `l`: 链接文件
- `b`: 块设备文件
- `c`: 字符设备文件
- `p`: 管道文件

文件或组的权限:

- `r`: 4，可读。
- `w`: 2，可写，能够编辑、新增、修改、删除。
- `x`: 1，可执行，能够运行一个脚本程序。

对目录来说，可读表示可读取目录内文件列表；可写表示能在目录新增、删除、重命名文件；可执行表示能够进入目录。

7表示可读写、可执行；6表示可读写。

文件权限字符`rwxrw-r--`，分别表示文件所有者、文件所属组、其它用户的权限。这个权限数字是764。

### 文件的特殊权限

单纯rwx有时无法满足需求。所以有了SUID、SGID、SBIT等特殊权限位。

SUID: 对二进制程序临时设置的特殊权限。比如passwd可以修改密码，但是密码保存在/etc/shadow中，这个文件的默认权限是000，只有root可以操作。但是加上SUID特殊权限位，普通用户就也可以操作了。

```
ls -l /etc/shadow
----------
ls -l /bin/passwd
-rwsr-xr-x
```

如果权限上没有x，那么赋予特殊权限后会变成S。

### SGID

### 文件的隐藏属性

### su和sudo

su 命令用户切换到其它用户，可以使用`-`将环境变量等都切换。但这样可能会泄露root密码。

sudo 命令把特定命令权限赋予指定用户。格式为`sudo [参数] 命令名称`。

- `h`: 列出帮助信息。
- `l`: 列出用户可执行命令。
- `u`: 以指定的用户身份执行命令。
- `k`: 清空密码的有效时间，下次执行sudo需要重新输入密码。
- `b`: 在后台执行指定的命令。
- `p`: 更改询问密码的提示语。


## vim 

vim的3种模式：

- 命令模式: 可以控制光标移动，可以复制、粘贴、删除、查找。

    - dd: 删除行
    - 5dd: 删除5行
    - yy: 复制行
    - 5yy: 复制5行
    - n: 搜索命令定位到下一个字符
    - N: 搜索命令定位到上一个字符
    - u: 撤销上一步操作
    - p: 粘贴
    - c: 复制字符
- 输入模式
- 末行模式: 可以保存或退出文档，以及设置编辑环境，输入冒号`:`切换到该模式。
    - `:w`: 保存
    - `:q`: 退出
    - `:q!`: 强制退出，放弃文档的修改
    - `:wq!`: 强制保存退出
    - `:set nu`: 显示行号
    - `:set nonu`: 不显示行号
    - `:命令`:  执行该命令
    - `:整数`:  光标跳转到改行
    - `:s/one/two`: 将当前光标坐在行的第一个one替换成two
    - `:s/one/two/g`: 将当前光标所在行的所有one替换成two
    - `%s/one/two/g`: 将全文所有one替换成two
    - `?字符串`: 在文本中从下往上搜索字符串
    - `/字符串`: 在文本中从上往下搜索字符串

## 配置主机名称

主机名一般保存在`/etc/hostname`文件中。需要修改后重启主机，然后用`hostname`命令查看。

## 配置网卡信息

网卡信息保存在`/etc/sysconfig/network-scripts/`中。

```bash
# 编辑
vim /etc/sysconfig/network-scripts/ifcfg-ens33
TYPE=Ethernet
BOOTPROTO=static
NAME=eno16777736
ONBOOT=yes
IPADDR=192.168.10.10
NETMASK=255.255.255.0
GATEWAY=192.168.10.1
DNS1=192.168.10.1

# 重启网卡设备
systemctl restart network
```

## 配置Yum软件仓库

1. 进入`/etc/yum.repos.d`，里面有yum配置文件。
2. 新建`rhel7.repo`配置文件。

## 编写Shell脚本

Shell脚本有2种：交互式和批处理。

下面是一个简单的shell脚本`a.sh`。

```bash
[root@localhost ~]# vim example.sh #!/bin/bash
#For Example BY linuxprobe.com
pwd
ls -al
```

然后使用`bash a.sh`即可执行。还可以用路径来执行，如`./a.sh`，但是提示权限不足，只需要增加权限就行了。

给shell传参数。

- `$0`: 脚本名称
- `$n`: 第几个参数
- `$#`: 参数个数
- `$*`: 参数集合
- `$?`: 上一次命令的执行返回值

条件语句的格式是`[ 条件表达式 ]`。

- `-d`: 测试文件是否是目录。
- `-e`: 测试文件是否存在。0表示存在，1表示不存在。
- `-f`: 是否是一般文件。
- `-r`: 是否有权限读取。
- `-w`: 是否有权限写入。
- `-x`: 是否有权限执行。

```
[ -e /etc/fstab ] 
echo $?   # 0 表示存在

# 逻辑与
[ -e /etc/fstab ] && echo 'ok'
[ $USER = root] && echo 'admin'

# 逻辑或
[ -e /etc/fstab1 ] || echo 'error'

# 逻辑非
[ ! -e /etc/fstab1 ] 

# 数字的比较不能用 > = <
[ 5 -eq 5]
[ 5 -gt 8]
[ 5 -le 3]
```


剩余内存多少时报警

```
# 提取第四列
[ `free -m  | grep Mem: | awk '{print $4}'` -lt 1024 ] && echo '内存不足'
[ `free -m  | grep Mem: | awk '{print $4}'` -lt 1024 ] && mail -s memory root@xx.com
```

- `z`: 判断String变量是否为空值
- `=`: 比较相等
- `!=`: 不相等

```
[ -z $hello ]
echo $?   # 0没有被用
```

## if语句

```bash
#!/bin/bash
# 如果目录不存在，则创建
if [ ! -e /media/haha ]
then
mkdir -p /media/haha
fi
```

```bash
#!/bin/bash
# ping 3次，每次延迟0.2s，超时时间为3s， 写入到 /dev/null，这里会自动销毁，黑洞
ping -c 3 -i 0.2 -W 3 $> /dev/null
if [ $? -eq 0]
then 
echo 'Host $1 is on-line'
else
echo 'Host $1 is off-line'
fi
```

输入的值赋给GRADE

```bash
#!/bin/bash
read -p 'Enter:' GRADE
if [ $GRADE -ge 85 ] && [ $GRADE -le 100 ] ; then
echo 'excellent' 
elif [ $GRADE -gt 70 ] &&  [ $GRADE -le 84 ] ; then
echo 'pass'
else 
echo 'fail'
fi
```

## for...in语句

```bash
#!/bin/bash
read -p "Enter:" PASSWD
for UNAME in `cat a.txt`
do 
id $UNAME $> /dev/null
if [ $? -eq 0 ]
then 
echo "Already exists"
else 
useradd $UNAME $> /dev/null
echo "$PASSWD" | passwd --stdin $UNAME
if [ $ -eq 0 ]
then 
echo "$UNAME, Create success"
else
echo "$UNAME, Create failure"
fi
fi 
done
```

`$(cat ~/ipadds.txt)`中的$(命令)类似于\`命令\`。

## while循环

```bash
#!/bin/bash
PRICE=$(expr $RANDOM % 1000)
TIMES=0
echo "商品实际价格为0-999之间，猜猜看是多少？"
while true
do
read -p "请输入您猜测的价格数目：" INT
let TIMES++
if [ $INT -eq $PRICE ] ; then
echo "恭喜您答对了，实际价格是 $PRICE"
echo "您总共猜测了 $TIMES 次"
exit 0
elif [ $INT -gt $PRICE ] ; then
echo "太高了！"
else
echo "太低了！"
fi
done
```

## case

```bash
#!/bin/bash
read -p "请输入一个字符，并按Enter键确认：" KEY
case "$KEY" in
[a-z]|[A-Z])   # 模式1
echo "您输入的是 字母。"
;;             # 模式结束符
[0-9])         # 模式2
echo "您输入的是 数字。"
;;
*)             # 通配模式
echo "您输入的是 空格、功能键或其他控制字符。"
esac
```



## 计划任务服务程序

分为一次性与长期性计划任务：

**一次性**

- `at 时间`: 开启计划命令，ctrl+d 结束编写计划。
- `at -l`: 查看已经设置好，还未执行的一次性计划。
- `atrm 任务序号`: 删除

```bash
at 23:30
```

**长期性**

- `crontab -e`: 创建和编辑计划任务。
- `ctontab -l`: 查看当前计划
- `crontab -r`: 删除
- `-u`: 编辑他人的计划任务

```bash
# 计划格式：分时日月星期命令，分必须是数字不能是*，日和星期只能用一个
# 每周1，3，5执行打包命令，-可以表示连续时间周期，*/2表示执行任务的间隔时间
25 3 * * 1,3,5 /usr/bin/tar -czvf backup.tar.gz /home/wwwroot
```

所有命令都要用绝对路径，使用whereis命令查询，如`whereis rm`。

## 网络管理

## 管道符、重定向与环境变量

### 输入输出重定向

输入重定向：把文件导入命令中。
输出重定向：把原本要输出到屏幕的数据信息写入指定文件中。

输出用的多：分为标准输出和错误输出重定向，模式分为清空写入和追加写入

- 标准输入重定向(STDIN, 文件描述符为 0): 默认从键盘输入，也可以从文件或命令中输入。
- 标准输出重定向(STDOUT，文件描述符为 1): 默认输出到屏幕。
- 错误输出重定向(STDERR, 文件描述符为 2): 默认输出到屏幕。

输入重定向

- `命令 < 文件`
- `命令 << 分界符`
- `命令 < 文件1 > 文件2`

输出重定向

- `命令 > 文件`: 将标准输出重定向到文件中。(清空原数据)，如果是错误输出用了这个命令，则会清空掉文件。
- `命令 2> 文件`: 将错误输出重定向到一个文件中。(清空原数据)
- `命令 >> 文件`: 将标准输出重定向到一个文件中。(追加原数据后面)
- `命令 >> 文件 2>&1`或`命令 &>> 文件`:将标准和错误输出重定向到一个文件中。(追加原数据后面) 

标准输出模式文件描述符1可以不写。

```bash
# 输入重定向，讲readme.txt文件导入给wc -l 命令
wc -l < readme.txt

# 标准输出重定向
echo 'hello' > a.txt

# 错误输出重定向，xx.txt文件不存在
ls xx.txt 2> a.txt
```

### 管道命令符

管道命令符的作用是把前一个命令原本要输出到屏幕的标准正常数据当作是后一个命令的标准输入，格式为`命令A | 命令B`。

```bash
# 找出被限制登陆用户的个数
grep '/sbin/nologin' /etc/passwd | wc -l

# 重置密码
echo 'root' | passwd --stdin root

# 邮件发送，需要安装mailx
echo 'content' | mail -s 'Subject' root
su - root
mail

# 一直输入到自定义分界符over，才结束
mail -s 'readme' root@xx.com << over
```

### 命令行通配符

- `*`: 匹配任何多个任意字符。
- `?`: 匹配单个任意字符。
- `[0-9]`: 匹配单个字符。

```
ls -l /dev/sda*
ls -l /dev/sda[0-9]
```

### 常用转义字符

- `反斜杠(\)`:使反斜杠后面的一个变量变为单纯的字符串。 
- `单引号('')`:转义其中所有的变量为单纯的字符串。
- `双引号("")`:保留其中的变量属性，不进行转义处理。
- `反引号(``)`:把其中的命令执行后返回结果。

```bash
echo "price is $price"
# price is 5

# $$ 表示当前程序的进程ID
echo "price is $$price"
# price is 3767price

# 输出$5
echo "price is \$$price"
# price is $5

# 执行命令
echo `uname -a`
```


## 重要的环境变量

命令的执行步骤：

1. 如果用户以绝对路径或相对路径输入命令(如/bin/ls)，则直接执行。
2. 检查命令是否有别名命令，查看或设置别名命令通过`alias 别名=命令`，可以通过`unalias 别名`取消别名。删除命令`rm`实际是`rm -i`的别名。
3. Bash解释器判断用户输入的是内部命令还是外部命令。内部命令是解释器内部的指令，会被直接执行；外部命令交给第4步处理，通过`type 命令名称`查看命令是外部还是内部命令。
4. 系统在多个路径查找用户输入的命令文件，定义这个路径的变量是`PATH`。

```bash
echo $PATH;

# 添加PATH
PATH = $PATH:/root/bin
```

为什么不能将当前目录(.)添加到PATH中？可以添加，但是如果黑客在比较常用的公共目录/tmp放了一个ls或cd命令同名的木马文件，用户恰好在这个目录执行了这些命令，很有可能中招。所以不要添加。

重要的10个环境变量:

- `HOME`: 用户的主目录。
- `SHELL`: 用户在使用的Shell解释器名称。
- `HISTSIZE`: 输出的历史命令记录条数。
- `HISTFILESIZE`: 保存的历史命令记录条数。
- `MAIL`: 邮件保存路径。
- `LANG`: 系统语言、语系名称。
- `RANDOM`：生成一个随机数。
- `PS1`: Bash解释器的提示符。
- `PATH`: 解释器搜索用户执行命令的路径。
- `EDITOR`: 用户默认文本编辑器。

```
# 定义变量，只有自己能用
WORKDIR=/home/workdir

# export将变量提升为全局变量，其他用户也能用
export WORKDIR
```

## 系统安装


### 文件搜索命令
### 帮助命令
## 远程连接SSH专题


sudo vi /etc/ssh/sshd_config


### ssh连接时间设置

```
# 打开sshd_config文件
cd /etc/ssh
vim sshd_config

# 修改ssh_config文件里属性
ClientAliveInterval 300   # 我的腾讯云貌似这个设置长一点有效，下面一个属性无效
ClientAliveCountMax 10

# 重启ssh服务
service sshd reload
```

- `ClientAliveInterval`: 多久向客户端发送请求，单位是秒
- `ClientAliveCountMax`: 超过多少次没被客户端响应，结束连接

所以上面的设置是 300s * 10 = 50分钟，如果客户端没有响应则断开连接。

## apache +nginx + 数据库
## 缓存服务
## git
## Php框架TP5，Lavaral Yii2.0 环境配置
## python运行环境
## 监控神器Zabbix



https://www.centos.org/download/
引导固件
传统 BIOS
UEFI

内存设置为2GB，不低于1GB，也不用设置太大

桥接模式：相当于物理主机与虚拟机网卡架设了桥梁，可以通过屋里主机网卡访问外网。
NAT模式: Network Address Translation,网络地址转换，转成和物理主机类似的ip，用VMnet8
仅主机模式：虚拟机可以访问物理主机，不能访问外网，用 VMnet1与物理主机连接

## 重置root密码

查看版本

```bash
[root@localhost ~]# cat /etc/redhat-release
Red Hat Enterprise Linux Server release 7.0 (Maipo)
```

重启系统(按上下键)，进入引导页，选择第一个，按e进行编辑，在linux16行最后添加`rd.break`，然后`Ctrl+x`运行修改后的程序。进入紧急求助模式。在输入下面命令：

```bash
# 挂载根目录
mount -o remount,rw / 
# 修改密码
passwd root
# 更新系统信息
touch /.autorelabel   
# 退出重启
exit 
reboot
```

CentOS7怎么把系统默认语言从中文设置为英文

sudo localectl set-locale LANG=en_US.utf8

物理主机ssh连虚拟机linux

虚拟机设置成桥接模式，ip addr查看ip

## systemd初始化进程

linux操作系统的开机过程：BIOS -> Boot Loader -> 加载系统内核 -> 内核初始化 -> 启动初始化进程（7 用systemd代替了System V init，采用并发启动机制）

```bash
# 服务名的.service可以省略
systemctl start foo.service
systemctl restart foo.service
systemctl stop foo.service
systemctl reload foo.service
systemctl status foo.service

# 设置开机启动
systemctl enable foo.service 
systemctl disable foo.service
systemctl is-enabled foo.service  # 查看服务是否开机启动

# 查看各个级别下服务的启动和禁止情况
systemctl list-unit-files --type=service
```

RPM 是为了简化安装的复杂度，而 Yum 软件仓库是为了解决软件包之间的依赖关系。

## 常用系统工作命令

echo: 用于输出字符串或变量。`echo [字符串|$变量]`

```
echo linux
echo $SHELL
```

date: 打印日期，可以输入+自定义格式

- %t tab
- %H 小时00-23
- %I 小时00-12
- %M 分钟
- %S 秒
- %j 今年中的第几天

```
# 2019-04-14 03:03:12
date '+%Y-%m-%d %H:%M:%S'

# 设置系统时间
date -s "20170901 8:30:00"

# 插件当前是今年第几天
date '+%j'
```

只有root权限才可以
reboot: 重启
poweroff: 关机

wget: 下载网络文件
- -b 后台下载模式
- -P 下载到指定目录
- -t 最大尝试次数
- -c 断点续传
- -p 下载页面中所有资源，包括图片、视频
- -r 递归下载

ps: 查看系统进程状态，格式是`ps [参数]`

- `-a`: 显示所有进程（包括其他用户进程）
- `-u`: 用户及其他详细信息
- `-x`：显示没有控制终端的进程

进程状态：

- R（run）: 进程正在运行或在运行队列中等待。
- S (stop): 休眠，当某个条件形成或接收到信号后，则脱离该状态。
- D (不可中断): 进程不响应系统异步信号，即使kill也不能中断。
- Z (僵死): 进程已经终止，但进程描述符仍然存储，直到父进程调用`wait4()`系统函数将进程释放。
- T (停止): 进程收到信号后停止运行。

命令参数有长格式(--)，短格式(-)，只有短格式之间能合并，而且可以不加-


top: 用于动态监视进程活动与系统负载等信息。

前5行是系统整体的统计信息
第1行：系统时间、运行时间、登陆终端数、系统负载（三个数值分别是1分钟、5分钟、15分钟内的平均值，数值越小负载越低）
第2行：进程总数、运行中的进程数、睡眠中的进程数、停止的进程数、僵死的进程数。
第3行：用户占用资源百分比、系统内核占用资源百分比、改变过优先级的进程资源百分比、空闲资源百分比等。
第4行：物理内存总量、内存使用量、内存空闲量、作为内存缓存的内存量。
第5行：虚拟内存总量、虚拟内存使用量、虚拟内存空闲量、已被提前加载的内存量。

### pidof 命令

用于查询某个指定服务进程的 PID 值，格式是`pidof [参数] [服务名称]`。每个进程的进程号码值(PID)是唯一的。

```bash
[root@localhost ~]# pidof sshd
7116
```



## 版本

分为内核版本和发型版本

- kernel 内核版

各个厂商会制作自己的发行版本

- redhat
- CentOS
- debian
- ubuntu
- fedora

## linux和windows区别

- linux区分大小写
- linux所有内容都是以文件形式保存，包括硬件、用户和文件
- linux不靠扩展名区分文件类型，是靠权限来区分，但是有一些约定的扩展名，是给管理员看的
    - 压缩包 .gz .bz2 .tar.bz2 .tgz
    - 二进制文件 .rpm
    - 网页文件 .html .php
    - 脚本文件 .sh
    - 配置文件 .conf
- Windows下的程序不能直接在Linux中安装和运行
- Linux更多使用字符界面
    - 占用的系统资源更少
    - 减少了出错和被攻击的可能性，会让系统更稳定

## 虚拟机知识

虚拟机是一个可以在本机上模拟电脑的软件。可以虚拟新的硬件环境，可以装软件。常用的虚拟机：vmware8、virtualbox。

虚拟机会在本机生成下面2个虚拟机网卡(查看网络属性):

- Vmware Virtual Ethernet Adapter For VMnet1
- Vmware Virtual Ethernet Adapter For VMnet8

安装时链接网络的区别:

- **桥接网络**: 直接连接到物理网络，会占用一个局域网真实ip，
- **NAT**: 网络地址转换（network address translation），使用已共享主机的ip，可以上网，利用VMnet8网卡通信
- **Host-Only**：与主机共享一个私有网络，只能本机使用，利用VMnet1进行通信，不能上网

## 系统启动流程

1. 计算机通电后，首先读取刷入ROM芯片的开机程序，这个程序叫做BIOS(Basic Input/Output System)。
2. BIOS程序首先检查计算机硬件是否满足运行的基本条件，这叫做硬件自检(Power-On Self-Test)。如果硬件有问题，主板会发出不同含义的蜂鸣，启动中止。如果没有问题，屏幕会显示CPU、内存、硬盘等信息。
3. 硬件自检完成后，BIOS将控制权交给下一阶段的启动程序，这时BIOS需要知道"下一阶段的启动程序"具体放在哪个设备，BIOS需要一个外部储存设备的排序，排在前面的设备就是优先转交控制权的设备，这个排序叫做“启动顺序”(Boot Sequence)。BIOS按照启动顺序将控制权转交给第一位的储存设备。这时，计算机读取该设备的第一个扇区，也就是读取最前面的512字节。如果这512字节的最后两个字节是0x55和0xAA，表示这个设备可以用于启动；如果不是，表示设备不能用于启动，控制权交给下一个设备。最前面的512字节，叫做“主引导记录”(Master boot record, MBR)。
4. 主引导记录只有512字节，作用是告诉计算机到硬盘的哪一个位置找操作系统。1-446字节用于记录系统的启动信息，调用操作系统的机器码。447-510字节（64个字节）是分区表(Partition table)，将硬盘分为若干个区，每个区16个字节，所以最多4个主分区。511-512字节是主引导记录签名(0x55和0xAA)。
5. 硬盘分区是将硬盘划分为几个逻辑分区，一旦划分为多个分区，不同的目录和文件可以存储进不同的分区内。主引导记录需要知道控制权交给哪个区。分区表的长度是64个字节，里面分为4项，每一项16个字节。

    - （1） 第1个字节：如果为0x80，就表示该主分区是激活分区，控制权要转交给这个分区。四个主分区里面只能有一个是激活的。
    - （2） 第2-4个字节：主分区第一个扇区的物理位置（柱面、磁头、扇区号等等）。
    - （3） 第5个字节：主分区类型，比如FAT32、NTFS等。
    - （4） 第6-8个字节：主分区最后一个扇区的物理位置。
    - （5） 第9-12字节：该主分区第一个扇区的逻辑地址。
    - （6） 第13-16字节：主分区的扇区总数。

6. 计算机控制权交给硬盘的某个分区，它会读取激活分区的第一个扇区，叫做"卷引导记录"(Volume boot record, VBR)。
7. 控制权交给操作系统后，操作系统的内核首先被载入内存。比如linux系统首先载入/boot目录里的kernel。内核加载成功后，第一个运行的程序是/sbin/init，它根据配置文件产生init进程，这是linux启动的第一个进程，pid进程编号是1,其它进程都是它的后代。然后init线程加载系统各个模块，比如窗口程序和网络程序，直至执行/bin/login程序，跳出登陆界面，等待用户输入用户名和密码。


## Linux目录

- / 根目录
- /dev 设备文件
- /etc 配置文件
- /home 用户家目录
- /lib 系统库保存目录
- /mnt 移动设备挂载目录
- /tmp 临时目录
- /proc 不能直接操作，保存的是内存的挂载点
- /sys 不能直接操作
- /root 超级用户的家目录，可以操作
- /usr/bin
- /usr/sbin 系统软件资源目录，面向超级用户的系统用户

## 常用命令

提示符：超级用户是#，普通用户是$。

```
[root@banli17 ~]#

# 修改主机名，可以让显示变短
hostname bl
```

命令格式，-a是简称，--all是全称。

### ls

```bash
-a 显示隐藏文件
-l 显示详细信息
-i 文件的id号，不会重复，递增的
-d 显示文件夹本身的信息
```

```
# 权限      链接数 所属用户  组      大小   时间          文件名
drwxrwxrwx  20    banli  staff    640 Jan  4 23:03 w3croad_blog
```

权限的第一个字母是文件类型（d），后面字符分成3份，分别是所有着U(rwx)、所属组G(rwx)、其它人O(rwx)。

- d directory目录
- - 文件
- l 链接

r read    读
w write   写
x execute 执行

默认权限是644。

```
r(2^2) + w(2^1) + x(2^0) = 7 

# 修改权限
chmod 766 1.txt

# 给所属组增加执行的权限，g是组，x是执行。只能一个个写，不能连着写多个
chmod g+x 1.txt

# 去掉所属组的执行权限
chmod g-x 1.txt
```

### mkdir

```
# 递归创建目录
mkdir -p b/b
```

### cd

```
# 切换到父目录
cd ..

# 切换到自己家目录
cd ~  
cd 

# 回到上一个工作目录
cd - 

# 显示当前目录
pwd

# 删除空的目录，非空删除失败
rmdir a

# 删除，回警告
rm 1.txt

# rm -f (--force) 1.txt 强制删除

# 递归删除所有文件
rm -rf b

# 删除所有文件，不要用，删了系统无法恢复了
rm -rf /  

# 拷贝目录
cp -r b bb

默认拷贝文件，时间会变化，通过-p 可以拷贝属性

# 硬链接(基本没用)
ln /tmp/access.log access.log

# 软链接，显示很直观，显示了指向的文件
ln -s 源文件 目标文件
```

### 文件搜索命令

locate : 查找文件名

- 速度快，找的是数据库索引表(/var/bin/mlocate.db)，每天更新一次，更新不及时。使用updatedb强制更新。
- `/etc/updatedb.conf`是配置，里面有不加入索引表的配置(PRUNE 忽略)。比如有/tmp，查询/tmp的文件回忽略。

whereis: 搜索命令所在路径

```bash
whereis ls

-b 只查找可执行文件
-m 查找命令的手册manual
```

which: 查看外部安装命令的别名或原始命令，无法查看Shell自带的命令which cd

```
which ls
ls --color=auto

# 修改别名
alias ls=' ls --color=auto'  // color=no
```

find: 文件名要一摸一样才能找到，可以写通配符

```
# 通过名字来搜
find /a -name 1.txt
find /a -name 1*
find /a -name "1.tx?"
find /a -name "1.tx[abct]"  // 找不到
find /a -name 1?  // 找不到
find /a -name "1.txT"  // 找不到,区分大小写的
find /a -iname "1.txT"  // -i表示忽略大小写

# 通过用户搜索
find /a -user "1.txt" 

# 通过时间搜索
find /nginx/access.log -mtime+5

atime 文件访问时间
ctime 文件属性时间
mtime 文件内容修改
```



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

**服务器安装SSH服务**

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

打包压缩: https://blog.csdn.net/qq_32014215/article/details/63684368

## 关机和重启命令

**1. 重启**

```
reboot    // 重启
shutdown -r now   // 立即重启(root用户使用)
shutdown -r 10    // 过10分钟自动重启(root用户使用)
shutdown -r 20:35  // 在时间为20:35时候重启(root用户使用)
shutdown  -c     // 取消shutdown设置的重启命令
```

**2. 关机**

```
halt  // 立即关机
poweroff  // 立即关机
shutdown -h now  // 立即关机(root用户使用)
shutdown -h 10   // 10分钟后自动关机
shutdown -c      // 取消shutdown设置的关机命令
```

**说明**

**1. shutdown**

shutdown 命令安全地将系统关机。 有些用户会使用直接断掉电源的方式来关闭 linux，这是十分危险的。因为 linux 与 windows 不同，其后台运行着许多进程，所以强制关机可能会导致进程的数据丢失，使系统处于不稳定的状态，甚至在有的系统中会损坏硬件设备。

而在系统关机前使用 shutdown 命令，系统管理员会通知所有登录的用户系统将要关闭。并且 login 指令会被冻结，即新的用户不能再登录。直接关机或者延迟一定的时间才关机都是可能的，还可能重启。这是由所有进程〔process〕都会收到系统所送达的信号〔signal〕决定的。这让像 vi 之类的程序有时间储存目前正在编辑的文档，而像处理邮件〔mail〕和 新闻〔news〕的程序则可以正常地离开等等。

shutdown 执行它的工作是送信号〔signal〕给 init 程序﹐要求它改变 runlevel。Runlevel 0 被用来停机〔halt〕，runlevel 6 是用来重新激活〔reboot〕系统，而 runlevel 1 则是被用来让系统进入管理工作可以进行的状态；这是预设的，假定没有-h 也没有-r 参数给 shutdown。要想了解在停机〔halt〕或者重新开机〔reboot〕过程中做了哪些动作，你可以在这个文件/etc/inittab 里看到这些 runlevels 相关的资料。

shutdown 参数说明:

```
[-t] 在改变到其它 runlevel 之前﹐告诉 init 多久以后关机。
[-r] 重启计算器。
[-k] 并不真正关机﹐只是送警告信号给每位登录者〔login〕。
[-h] 关机后关闭电源〔halt〕。
[-n] 不用 init﹐而是自己来关机。不鼓励使用这个选项﹐而且该选项所产生的后果往往不总是你所预期得到的。
[-c] cancel current process 取消目前正在执行的关机程序。所以这个选项当然没有
时间参数﹐但是可以输入一个用来解释的讯息﹐而这信息将会送到每位使用者。
[-f] 在重启计算器〔reboot〕时忽略 fsck。
[-F] 在重启计算器〔reboot〕时强迫 fsck。
[-time] 设定关机〔shutdown〕前的时间。
```

**2.halt—-最简单的关机命令**

其实 halt 就是调用 shutdown -h。halt 执行时，杀死应用进程﹐执行 sync 系统调用， 文件系统写操作完成后就会停止内核。

参数说明:

```
[-n] 防止 sync 系统调用，它用在用 fsck 修补根分区之后﹐以阻止内核用老版本的超级块〔superblock〕覆盖修补过的超级块。
[-w] 并不是真正的重启或关机，只是写 wtmp〔/var/log/wtmp〕纪录。
[-d] 不写 wtmp 纪录〔已包含在选项[-n]中〕。
[-f] 没有调用 shutdown 而强制关机或重启。
[-i] 关机〔或重启〕前，关掉所有的网络接口。
[-p] 该选项为缺省选项。就是关机时调用 poweroff。
```

**3. reboot**

reboot 的工作过程差不多跟 halt 一样，不过它是引发主机重启，而 halt 是关机。它的参数与 halt 相差不多。

**4. init**

init 是所有进程的祖先﹐它的进程号始终为 1，所以发送 TERM 信号给 init 会终止所有的用户进程、守护进程等。shutdown 就是使用这种机制。init 定义了 8 个运行级别(runlevel)， init 0 为关机，init 1 为重启。关于 init 可以长篇大论，这里就不再叙述。另外还有 telinit 命令可以改变 init 的运行级别，比如，telinit -iS 可使系统进入单用户模式，并且得不到使用 shutdown 时的信息和等待时间。

**5. linux 如何修改 root 管理员密码**

以 root 身份登录(SSH 操作)，输入 passwd 命令 就可以看到提示输入新密码了。


## 资料

- [centos关机与重启命令详解](https://blog.csdn.net/jiangzhengdong/article/details/8036594)