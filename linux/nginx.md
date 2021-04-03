---
title: Nginx
---

## http 服务和 IO 事件模型

http/https 服务

```
             request
user-agent  -----------> httpd(apache)
(chrome)    <-----------
             response
```

http 协议

```
# URL 格式
shceme://username:password@host:port//path;params?query#flag
    DocumentRoot: /PATH/TO/DIR/
        Location: URL
    Alias
    params:
        key=value&key=value
    query:
        field=value,...
```

http 事务

```
request
    <method> <URL> <VERSION>
    HEADERS

    <body>

response
    <VERSION> <STATUS> <REASON-PHRASE>
    HEADERS

    <body>

    name: value

METHOD: GET/HEAD/POST, PUT/DELETE, TRACE,OPTIONS

STATUS CODE
    1xx
    2xx  200
    3xx  301 302 304
    4xx  403 404
    5xx  502

认证
    基于 IP 认证
    基于用户认证 basic/digest

httpd MPM(http多处理模块)
    prefork 进程模式，二级结构，主进程 master 负责生成子进程，每个子进程负责响应一个请求
    worker 线程模型，三级结构，主进程 master 负责生成子进程，每个子进程负责生成多个线程，每个线程响应一个请求
    event 主进程 master 负责生成子进程，每个子进程响应多个请求
```

程序函数调用 操作硬件(如网络 io、文件系统 io、键盘 io、鼠标 io 等)都是通过系统调用实现的。
用户代码 转换-> 内核级代码

## 版本

组成

- nginx 二进制可执行文件：由各模块源码编译出的一个文件
- nginx.conf 配置文件，控制 nginx 的行为
- access.log 访问日志，记录每一条 http 请求信息
- error.log 错误日志，定位问题

版本发布

- feature
- bugfix
- change

mainline 主干版本
stable 稳定版本

开源版 nginx.org
商业版 nginx.com
阿里巴巴 tengine 不推荐，是 nginx 的分支，但是时间长脱离了。
开源 OpenResty: openresty.ory
商业 OpenResty: openresty.com 技术支持好些

## 架构模型

![](./imgs/2020-04-04-19-13-31.png)

特性：异步、事件驱动和非阻塞
并发请求处理：通过 epoll/select
文件 IO: 高级 IO sendfile，异步，mmap(内存映射：一般读取文件要从硬盘拷贝到内存，再从内存拷贝到进程，内存映射是直接硬盘映射到内存)

nginx 模块：高度模块化，支持动态装载和卸载。
模块分类：

- 核心模块 core module
- 标准模块
  http modules: Standard HTTP modules / Optional HTTP modules
  Mall modules
  Stream modules
- 第三方模块

nginx 作用

- 静态 web 静态服务器（图片服务器，或 js/css/html/txt 等静态资源服务器）。单台 3w 并发
- 结合 FastCGI/uwSGI/SCGI 等协议反动态资源请求
- http/https 协议的反向代理
- imap4/pop3 协议的反向代理
- tcp/udp 协议的请求转发

## 应用场景与优点

3 个主要应用场景

- 静态资源服务
- 反响代理服务
  - nginx 强大性能
  - 缓存
  - 负载均衡
- API 服务
  - OpenResty

为什么出现

- 互联网的数据快速增长
  - 互联网的快速普及
  - 全球化
  - 物联网
- 摩尔定律：心跟那个提升
- 低效的 Apache
  - 一个连接对应一个进程

5 个优点

- 高并发，高性能
- 可扩展性好，模块化，社区丰富
- 高可靠性
- 热部署，不停止服务的前提下升级
- BSD 许可证，开源，可自己改

### 重写

### 重定向

安装 nginx 方法

- 官方的预制包
  - a
  - Fedora-EPEL
- 编译安装

配置文件

- 主配置文件 nginx.conf

  - `include conf.d/*.conf`
  - fastcgi, uwsgl, scgi 等协议相关的配置文件
  - mime.types 支持的 mime 类型

- 主配置文件的配置指令

```
directive value [value2...]
```

- 指令必须以分号结尾
- 支持使用配置变量
  - 内建变量：由 nginx 模块引入，可以直接引用
  - 自定义变量：由用户使用 set 命令定义
    - `set variable_name value`
    - 引用变量： `$variable_name`

主配置文件结构

```
main block: 主配置段，即全局配置段
    event{
        ...
    }: 事件驱动相关配置
http {

}: http/https 协议相关的配置段
mall {
    ...
}
stream {
    ...
}：四层代理
```

http 协议相关的配置结构

```
http {
    ...: 各 server 的公共配置
    server {

    }: 每个 server 用于定义一个虚拟主机，没有中心主机的概念
    server {
        ...
        listen
        server_name
        root : 指定站点的根目录
        alias:
        location [OPERATOR] URL {
            ...
            if CONDITION {
                ...
            }
        }
    }
}
```

```
[root@banli ~]# nginx -h
nginx version: nginx/1.16.1
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /etc/nginx/)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file
```

nginx -s reload
帮助 -? -h
使用指定的配置文件 -c
指定配置指令 -g
指定运行目录 -p
发送信号 -s

- stop 立即停止服务 - quit 优雅的停止服务 - reload 重载配置文件 - reopen 重新开始记录日志文件

- 测试配置文件是否有语法错误 -t -T
- 打印 nginx 版本信息、编译信息 -v -V

```
systemctl start nginx.service
ss -tnl # 查看监听的端口
ss -tnlp #

ps aux # 查看进程，可以看到 nginx 的 master/worker 进程

可以访问ip， http://192.168.25.201 ，它会生成一个测试页

cd /etc/nginx
ls
vim nginx.conf
```

```
user  nginx; # 以哪个用户身份运行
worker_processes  auto; # 工作进程数, 命令 lscpu 查看核心数，大于物理核心数没用

error_log  /var/log/nginx/error.log warn;  # 错误日志
pid        /var/run/nginx.pid;  # master 进程 id， 8154

# 动态装载模块配置，比如 geoip.conf 里可以 load_module "ngx_http_geoip_module.so"，根据ip定位的包
include /usr/share/nginx/module/*.conf

# 配置事件驱动模型
events {
    worker_connections  1024;  # 单进程响应1024个请求，总并发为 worker_processes * worker_connections，但是太多请求可能服务器承受不了
}


http {
    # 所有 server 共享的配置

    # 日志格式
    # $remote_addr 客户端地址  $remote_user basic 认证时客户端用户名  $time_local 本地时间
    # $request 请求报文起始行  $status 响应码
    # http_x_forwarded_for 真正客户端真实 ip， nginx作为中间层转发后端时可以将用户真实 ip 发给后端保存
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    # 访问日志和日志格式main
    access_log  /var/log/nginx/access.log  main;

    sendfile       on;
    tcp_nopush     on;
    tcp_nodelay    on;

    keepalive_timeout  65; # 保持连接超时时间
    types_hash_max_size 2048;

    include       /etc/nginx/mime.types;  # 让 nginx 知道支持哪些 mime 类型
    default_type  application/octet-stream; # 默认把文件都识别为 8 进制数据

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;  # 让虚拟主机模块化

    # 访问的主机名都不匹配会将第一个当作默认，可以通过 default_server 指定默认，匹配不到的虚拟主机通过它响应
    server {
        listen     80 default_server;
        listen     [::]:80 default_server;
        server_name  _;   # _ 匹配所有主机名
        root       /usr/share/nginx/html;

        include /etc/nginx/default.d/*.conf;

        location / {

        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

#    设置 https 的虚拟主机
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers HIGH:!aNULL:!MD5;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        location / {
#        }
#
#        error_page 404 /404.html;
#            location = /40x.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#            location = /50x.html {
#        }
#    }
}
```

传统当需要对一个文件进行传输的时候，其具体流程细节如下：

1、调用 read 函数，文件数据被 copy 到内核缓冲区
2、read 函数返回，文件数据从内核缓冲区 copy 到用户缓冲区
3、write 函数调用，将文件数据从用户缓冲区 copy 到内核与 socket 相关的缓冲区。
4、数据从 socket 缓冲区 copy 到相关协议引擎。

在这个过程当中，文件数据实际上是经过了四次 copy 操作：硬盘 —> 内核空间 —>用户 buf(封装响应报文)—>内核空间—>用户

sendfile 机制：减少以上多次 copy，提升文件传输性能的方法。内核直接封装响应报文。

文件数据 -> 内核 -> 用户

实验

```
mkdir /data/nginx/vhost1 -vp

vim /etc/nginx/conf.d/vhost1.conf

# 编辑内容后保存
server {
    listen 80;
    server_name c.test.com;
    root /data/nginx/vhost1;
}

# 然后配置 host 文件，指向虚拟机
192.168.25.201  c.test.com  b.test.com

# 打开浏览器，输入 c.test.com 即可访问
# 访问 192.168.25.201 时，因为没有匹配到 server_name 所以会访问默认主机
```

## open_file_cache

图片上传时，有些静态文件无法显示。查看 nginx 错误日志 error.log 里出现 `pread() read only 4653 of 4656 from`。

```
2020/09/05 10:32:54 [alert] 27727#0: *102 pread() read only 0 of 32768 from "/home/www/xx/upload/a.png" while sending response to client, client: 2.2.1.1, server: xx.com, request: "GET /a.png HTTP/1.1", host: "www.xx.com"
...
```

谷歌了一番，这个错误是由于文件在返回过程中发生了变化导致。一般由于 nginx 的参数 `open_file_cache` 导致，但是我这个是由于图片上传时异步压缩图片引起的。

## recv() failed

nginx 反向代理的时候在读取响应头时报错，`recv() failed (104: Connection reset by peer) while reading response header from upstream`。

```
# 请求
223.104.3.203 - - [17/Sep/2020:09:47:38 +0800] "POST /poem/generate HTTP/1.1" 502 3693 "https://servicewechat.com/wxec40586820dc1549/12/page-frame.html" "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.15(0x17000f2d) NetType/4G Language/zh_CN" "-"

# 报错
2020/09/17 09:47:38 [error] 14877#0: *37969 recv() failed (104: Connection reset by peer) while reading response header from upstream, client: 223.104.3.203, server: banli17.com, request: "POST /poem/generate HTTP/1.1", upstream: "http://103.4.128.43:80/poem/generate", host: "www.banli17.com", referrer: "https://servicewechat.com/wxec40586820dc1549/12/page-frame.html"
```

upstream prematurely closed connection while reading response header from up

http://www.mamicode.com/info-detail-2329136.html
https://blog.51cto.com/nanchunle/1657410
https://blog.csdn.net/fsj818077/article/details/85243145
https://xuexb.github.io/learn-nginx/example/proxy_pass.html#url-%E5%8C%85%E5%90%AB%E8%B7%AF%E5%BE%84

## 动态域名解析

nginx 在代理花生壳域名的时候, 差不多一天出现一次 nginx 访问挂掉，但真实服务正常运行，重启 nginx 后又正常了，查 nginx 的 log，后发现是花生壳域名解析的 IP 改变了后，nginx 会缓存之前的 IP。

解决方法：

```
location /xx {
    resolver 223.5.5.5 223.6.6.6 1.2.4.8 114.114.114.114 valid=3600s;
    set $dip ssaa.oicp.net;
    proxy_pass http://$dip;
    expires -1;
}
```

**参考文章：**

- [https://ld246.com/article/1448286508594](https://ld246.com/article/1448286508594)
- [Nginx 反向代理到花生壳动态域名失效问题解决](https://www.jianshu.com/p/7af71499f78e)
- [resolver](http://nginx.org/en/docs/http/ngx_http_core_module.html#resolver)
