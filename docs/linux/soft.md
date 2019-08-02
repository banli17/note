---
title: "linux软件安装管理"
sidebar_label: 软件安装管理
---


## 软件安装管理

linux中的软件安装方式有 3 种:

1. 通过源码包安装。好处是可以查看并修改源代码、比较安全(因为是开源的)、自由配置所需功能、卸载方便，另外通过源码包安装时需要编译，会更适合自己的系统、更加稳定和高效。缺点是安装步骤多、容易出错、编译时间较长。
2. 通过二进制包(RPM包、系统默认包)安装。缺点是看不到源码，功能选择没有源码包灵活；另外因为是厂商编译的，没有对本机做优化，效率可能没有源码包高。
3. 通过其它人写好的脚本自动安装，如lnmp。优点是安装方便，缺点是无法定制。

通常建议是如apache这样的服务器使用源码包安装，因为它是为其他用户提供浏览服务的(如网页)，对于效率要求更高。下面分别介绍这3种安装方式。

### 源码包和RPM包区别

- 安装前的区别：概念
- 安装后的区别：目录

RPM一般默认安装就行，不需要自己手动指定安装目录。源码包要指定位置，卸载是直接删除，否则卸载要手动删除很多文件。安装位置导致启动服务命令不同。 RPM包安装在`/etc/rc.d/init.d/`里可以使用service命令管理，源码包只能使用绝对路径来管理。

### 源码包的安装

因为源码包都是C写的，所以安装源码包首先需要安装`gcc`编译器，。一般我们保存和安装源码包目录如下。

- 源码包保存位置： `/usr/local/src/`
- 源码包安装位置：`/usr/local/`

源码包的安装过程如下:

1. 下载源码包。
2. 解压缩到目录。
3. 进入解压缩目录。
4. 执行`./configure`配置和检查软件，会把配置和能否安装信息都写在`Makefile`文件中，用于后续的编辑。

```bash
# 配置和检查软件，配置安装目录
./configure --prefix=/usr/local/apache2

# 编译
make

# 安装
make install

# 清除安装的缓存，如果make install报错，还需要删除安装目录
make clean
```

### RPM包

**1. RPM包在哪里?**

RMP包在系统光盘的Packages里。

**2. 命名规则？**

拿`httpd-2.2.15-15.el6.centos.1.i686.rmp`分析。是`包名 + 软件版本 + 软件发布的次数 + 适合的linux平台 + 适合的硬件平台 + 包扩展名`。

**3. RPM包的依赖性缺点？**

由于Linux中的程序大多是小程序。程序与程序之间存在非常复杂的依赖关系。RPM无法解决软件包的依赖关系。需要自己手动一个个安装。

- 树形依赖
- 环形依赖
- 模块依赖：www.rpmfind.net，需要依赖库文件`so.数字`，在网站查询。

**4. 包全名与包名。**

操作没有安装的包要使用包全名；操作已经安装的包使用包名；已经安装的包记录在/var/lib/rpm/中的数据库`__db.xxx`中。

**5. RPM安装**

太麻烦，要解决一个个依赖。

- `i(install)`: 安装。
- `v(verbose)`: 显示详细信息。
- `h(hash)`: 显示进度。
- `--nodeps`: 不检测依赖性。

```bash
rpm -ivh 包全名
```

**6. RPM升级和卸载**

- `U(upgrade)`: 升级
- `e`: 卸载，因为包的文件安装在哪里是作者规定的，用户不知道删除，所以提供了这个卸载功能
- `--nodeps`: 不检查依赖包

```bash
# 升级，如果没有则安装
rpm -Uvh 包全名

# 卸载，需要根据依赖来卸载
rpm -e 包名

# 不处理依赖包，但是会导致其它包不能用了
rpm -e --nodeps 包名
```

**7. RPM包查询**

- `q`: 查询(query)
- `a`: 所有(all)
- `i`: 查询软件信息(infomation)
- `p`: 查询未安装的包信息(package)
- `l`: 列表，查询包的文件装在哪里
- `f`: 查询文件属于哪个软件包
- `R`: 查询依赖的包

```bash
# 查看是否安装过
rpm -q httpd

# 查询安装的包
rpm -qa 
rpm -qa | grep httpd

# 查询包详细信息，里面有包的网站
rpm -qi httpd

# 查询未安装的包
rpm -qip 包全名

# 查询包的文件装在哪里
rpm -ql 包名

# 查询未安装包打算装在哪里
rpm -qlp 包名

# 查询文件属于哪个包
rpm -qf yum.conf

# 查询依赖哪些包
rpm -qR httpd
rpm -qpR httpd
```

**8. RPM包默认安装路径**

- `/etc/`: 配置文件
- `/usr/bin/`: 可执行命令
- `/usr/lib/`: 函数库
- `/usr/share/doc/`: 使用手册
- `/usr/share/man/`:帮助文件

**9. RPM包的校验**

```
rpm -V httpd
```

可能返回的结果:

- `S`: 文件大小是否改变
- `M`: 文件类型或权限(rwx)是否改变
- `5`: md5校验是否改变
- `D`：设备的主从代码是否修改
- `L`: 文件路径是否改变
- `U`: 文件所有者是否改变
- `G`: 文件所属组是否改变
- `T`: 文件修改时间是否改变
- `c`: 配置文件
- `d`: 普通文档
- `g`: 不该rpm包包含的文件
- `L`: 授权文件
- `r`: 描述文件

**10. RPM包中文件提取**

比如ls被删除了，可以通过`rpm2cpio 包全名 | cpio -idv .文件绝对路径`将ls提取出来。

```
# 查看是哪个包
rpm -qf /bin/ls
mv /bin/ls /tmp/

# 将命令文件提取到当前目录，之后再复制到bin目录即可
rpm2cpio /mnt/cdrom/Packages/coreutils...rpm | cpio -idv ./bin/ls
```

### yum在线安装

一个命令，在线就可以解决依赖。安装的实际也是rpm包。不能查询和校验。

**1. yum源文件**

在`/etc/yum.repos.d/`目录里，默认生效的是`Centos-Base.repo`文件。

- `[base]`: 容器名称
- `mirrorlist`:镜像
- `baseurl`: 源
- `enable`: 1表示生效，0表示不生效
- `gpgcheck`: rpm验证
- `gpgkey`: 验证证书位置

**2. 光盘yum安装**

没网的时候，将`Centos-Base.repo`改名`Centos-Base.repo.bak`让它失效，然后启用`Centos-Media.repo`。将enable改为1，修改baseurl为光盘的地址，注释其他file地址。

**3. yum命令**

```bash
# 查询所以可安装的包列表，不支持本地查询安装的包
yum list

# 搜索服务器包含关键字的包
yum search 关键字

# 安装
yum -y install 包名

# 升级
yum -y update 包名

# 会把linux内核也升级，所有包也升级，可能导致崩溃，不要用这个命令
yum -y update 

# 卸载
yum -y remove 包名

# 组操作
# 查看支持的组
yum grouplist

# 安装组，要使用英文
yum groupinstall "Chinese Support"
LANG=zh_CN
LANG=zh_CN.utf8

# 卸载组
yum groupremove "Chinese Support"
```
