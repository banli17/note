---
title: "安装"
---

# Nginx 安装

官网网站：[http://nginx.org/](http://nginx.org/en/download.html)。版本信息如下：

- `Mainline version`: 开发版本
- `Stable version`: 稳定版本
- `Legacy version`: 历史版本
- `CHANGES`: 版本更新信息
- `pgp`: 用于对源代码做安全校验的工具，非官方下载的包要验证一下。
- `source code`: 源代码提交、修改记录
- `Pre-Built Packages`: 通过 yum 等方式源安装，里面有各个系统,如 centeros 的安装方式

**centeros 安装方式**

1. 新建`vim /etc/yum.repos.d/nginx.repo`，这个是 nginx 的源(我的腾讯云不需要这步，直接 yum install nginx 即可，加了这个文件反而有错误，应该是要翻墙的问题)。

```
# centos是系统,7是系统版本
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/OSRELEASE/7/$basearch/
gpgcheck=0
enabled=1
```

- `yum list |grep nginx`: 列出 nginx 的版本
- `yum install nginx`：安装

2. 执行安装命令：`yum install nginx`。

3. 检查安装成功，通过命令`nginx -v`。

- `nginx -V`：编译的参数。

## 安装目录

通过 yum 安装都是一个个的 rpm 包。

```
# 列出安装时创建的文件
rpm -ql nginx

# 配置文件，Nginx日志轮转，用于logrotate服务的日志切割
/etc/logrotate.d/nginx

# 目录和配置文件，作用是nginx主配置文件
/etc/nginx
/etc/nginx/nginx.conf    // 启动加载的配置文件
/etc/nginx/conf.d
/etc/nginx/conf.d/default.conf // 默认读的配置文件

# cgi配置相关，fastcgi配置
/etc/nginx/fastcgi_params
/etc/nginx/uwsgi_params
/etc/nginx/scgi_params

# 编码转换映射转化文件，很少用到
/etc/nginx/koi-utf
/etc/nginx/koi-win
/etc/nginx/win-utf

# 设置http协议的Content-Type与扩展名对应关系，不能识别的扩展名可以在这里添加
/etc/nginx/mime.types

# 用于配置出系统守护进程管理器管理方式，centeros7.2新的方式
/usr/lib/systemd/system/nginx-debug.service
/usr/lib/systemd/system/nginx.service
/usr/sysconfig/nginx
/usr/sysconfig/nginx-debug

# Nginx模块目录，安装的一些模块
/usr/lib64/nginx/modules
/usr/nginx/modules

# nginx服务的启动管理的终端命令
/usr/sbin/nginx
/usr/sbin/nginx-debug    // 用来具体的调试分析

# 手册和帮助文件
/usr/share/doc/nginx-1.12.0
/usr/share/doc/nginx-1.12.0/COPYRIGHT
/usr/share/man/man8/nginx.8.gz

# nginx的缓存目录
/var/cache/nginx

# nginx的日志目录
/var/log/nginx
```

## 安装编译参数

通过`nginx -V`命令查看。就是通过源码编译(`./configure`)时带的参数。

```
# 安装目录
--prefix=/usr/share/nginx
--sbin-path=/usr/sbin/nginx
--modules-path=/usr/lib64/nginx/modules
--conf-path=/etc/nginx/nginx.conf
--error-log-path=/var/log/nginx/error.log

# 执行对应模块时，nginx所保留的临时性文件，不是很重要的
--http-log-path=/var/log/nginx/access.log
--http-client-body-temp-path=/var/lib/nginx/tmp/client_body
--http-proxy-temp-path=/var/lib/nginx/tmp/proxy
--http-fastcgi-temp-path=/var/lib/nginx/tmp/fastcgi
--http-uwsgi-temp-path=/var/lib/nginx/tmp/uwsgi
--http-scgi-temp-path=/var/lib/nginx/tmp/scgi

# 设定nginx进程启动的用户和组用户，虽然是用root运行，但是它是用nginx用户在跑
--user=nginx --group=nginx

# 设置额外的参数将被添加到CFLAGS参数
--with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -specs=/usr/lib/rpm/redhat/redhat-hardened-cc1 -m64 -mtune=generic'

# 设置附加的参数，链接系统库。比如c编译要依赖那些库，可以把路径添加进来，找库
--with-ld-opt='-Wl,-z,relro -specs=/usr/lib/rpm/redhat/redhat-hardened-ld -Wl,-E'

```

- `ps -ef | grep nginx`
- `find /|grep nginx.conf`: 查找安装目录
