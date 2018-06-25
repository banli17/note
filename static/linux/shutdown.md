# 关机和重启命令

## 命令

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

## 说明

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

2.halt—-最简单的关机命令

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