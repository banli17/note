---
title: "Nginx基础知识"
date: 2018-04-17 05:57:45
draft:  true
---

## 什么是Nginx

中间件的作用是隔离应用与应用，应用与操作系统，层次分明，让应用专注于业务。而 Nginx 就是一个开源且高性能、可靠的HTTP中间件、代理服务。

## 常见的中间件服务

- HTTPD: apache基金会的产品
- IIS: 微软
- GWS: google web server

## 为什么选择nginx?

**1、IO多路复用epoll(单线程异步IO)**

为了解决并发的问题，可以采用的方案有多线程、IO多路复用。多线程存在资源消耗的问题。IO多路复用就是单线程异步IO，响应会主动上报(内核会主动发送文件信息给应用端)。

IO多路复用的实现方式：select、poll、epoll。

- `select`: 是单线程同步的方式，效率低下，而且能够监听文件描述符的数量存在最大限制1024个。
- `epoll`: 是单线程异步的方式，最大连接无限制。

**2、轻量级**

- 功能模块少，只保留了和http核心相关的代码。
- 代码模块化

**3、CPU亲和**

多核服务器主要用于多线程，密集计算型服务使用。如果有多个CPU，利用它自动的切换工作方式，会造成性能的损耗。

Nginx是将工作进程和CPU核心，也就是把每个 worker 进程固定到一个 CPU 上执行，减少切换 CPU 的 cache miss，获得更好的性能。

![](./1/nginx.png)

**4、sendfile**

nginx处理静态资源服务是非常高效的。

请求文件时，会经过操作系统的`内核空间 -> 用户空间 -> 内核空间 -> Socket`多次切换后返回给用户。但是静态文件的获取时可以在内核空间直接返回，不需要用户空间的逻辑处理。nginx是采用了linux2的零拷贝传输模式，把文件的传输只通过内核空间传给Socket，返回给用户。所以在CBN、或动静分离的静态文件处理上，性能更优。

![](./1/2.png)

## 安装

官网网站：[http://nginx.org/](http://nginx.org/en/download.html)。版本信息如下：

- `Mainline version`: 开发版本
- `Stable version`: 稳定版本
- `Legacy version`: 历史版本
- `CHANGES`: 版本更新信息
- `pgp`: 用于对源代码做安全校验的工具，非官方下载的包要验证一下。
- `source code`: 源代码提交、修改记录
- `Pre-Built Packages`: 通过 yum 等方式源安装，里面有各个系统,如 centeros 的安装方式

**centeros安装方式**

1. 新建`vim /etc/yum.repos.d/nginx.repo`，这个是 nginx 的源(我的腾讯云不需要这步，直接yum install nginx即可，加了这个文件反而有错误，应该是要翻墙的问题)。

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

通过yum安装都是一个个的rpm包。

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

## nginx基础语法

**主配置文件 /etc/nginx/nginx.conf**

```
user 设置nginx服务的系统使用用户，和上面的--user类似 
worker_processes 工作进程数，设置为cpu数即可
error_log 错误日志
pid 服务启动时候的pid，会把启动的信息写入文件中

events 
    - worker_connections 每个进程允许的最大连接数
    - use  定义内核模型,select或epoll

http {
    ...
    # 每个独立站点
    server {
        listen 80;
        server_name localhost; # 域名

        # 配置默认访问的路径
        location / {
            # 存放首页的目录
            root  /usr/share/nginx/html;

            # 首页的路径
            index index.html index.htm;
        }

        # 错误页面，把500,502,503,504错误码页面定位到50x.html
        error_page 500 502 503 504 /50x.html
        location = /50x.html {

            # 页面存放在系统的哪个目录下面
            root  /usr/share/nginx/html; 
        }
    }

    server {}
}
```


- log_format 日志类型

## nginx 403 forbidden错误

```
# 查看nginx状态，绿色active表示正常
systemctl status nginx 

# 查看端口
netstat -tnlp 

# nginx端口被占用了
ps -ef | grep nginx
pkill -9 nginx

# 重载服务
# 无效 service nginx start
# 有效 service sshd reload 
nginx -s reload
```

参考资料：[关于Nginx不能正常启动的问题](https://blog.csdn.net/u012832088/article/details/80729002)

404，先ping一下看看ip，可能hosts文件改了。

## 配置https

首先在腾讯云申请https证书，然后下载。下载完成后通过下面命令上传到服务器。

```bash
# 将文件上传到服务器的data目录
scp www.banli17.com_bundle.crt  www.banli17.com.key  root@101.101.111.121:data/key/
```

然后设置`/etc/nginx/nginx.conf`文件。

```nginx
    server {
        listen 80;
        server_name  banli17.com www.banli17.com;
        rewrite ^(.*)$ https://$host$1 permanent;   # 重定向http 到 https
        }

    server {
        listen 443;
        server_name  banli17.com www.banli17.com;

        #root         /usr/share/nginx/html;

        # 设置 https 证书
        ssl on;
        ssl_certificate /data/key/www.banli17.com_bundle.crt;
        ssl_certificate_key /data/key/www.banli17.com.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
                root  /data/www/blog/public;
                index index.html;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```

最后通过`service nginx reload`重载一下后，就可以了。在浏览器输入`http://www.banli17.com`就可以重定向到`https://www.banli17.com`了。