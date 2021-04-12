# nginx 笔记

## 应用场景

-   静态服务(直接返回静态资源)
-   反向代理(服务器端的代理)
-   API 接口服务(可以直接读取数据库和缓存，如权限控制)

## nginx 优势

-   高并发
    -   nginx 显示静态网页的话,轻轻松松上 3000 用 Apache+JAVA、PHP,就只有 300 左右了
-   可扩展
-   高可靠性
-   热部署(不用停机升级)
-   开源，轻量

## nginx 架构

Nginx 采用的是多进程(单线程)和多路 IO 复用模型。

**工作流程**：

1. nginx 启动后，会有一个 master 进程和多个独立的 worker 进程
2. master 接收来自外界的信号，向 worker 进程发送信号
3. master 进程能监控 worker 进程的运行状态，如果异常退出，则会启动新的 worker 进程

worker 进程数，一般设置为机器 CPU 核数，因为更多的 worker 会竞争 CPU，带来不必要的上下文切换。

**IO 多路复用**

-   同步阻塞 IO
-   同步非阻塞 IO
-   异步阻塞 IO(IO 多路复用)，nginx
-   异步非阻塞 IO

支持 I/O 多路复用的事件模型有：

-   select(轮询): 单个进程打开最大 1024 个连接，需要对所有文件描述符进行遍历，文件描述符太多会耗费性能
-   poll：和 select 基本一样，用链表存储，没有最大连接
-   epoll(callback): 在每个描述符上设置 callback，FD 就绪后才会调用 callback。活跃的 socket 少性能就低。

多线程的好处提高 CPU 的利用率。

**CPU 亲和**

CPU 和进程绑定，可以复用缓存，防止 worker 换核。

**sendfile**

传统当需要对一个文件进行传输的时候，其具体流程细节如下：

1、调用 read 函数，文件数据被 copy 到内核缓冲区
2、read 函数返回，文件数据从内核缓冲区 copy 到用户缓冲区
3、write 函数调用，将文件数据从用户缓冲区 copy 到内核与 socket 相关的缓冲区。
4、数据从 socket 缓冲区 copy 到相关协议引擎。

在这个过程当中，文件数据实际上是经过了四次 copy 操作：硬盘 —> 内核空间 —>用户 buf(封装响应报文)—>内核空间—>用户

sendfile 机制：减少以上多次 copy，提升文件传输性能的方法。内核直接封装响应报文。sendfile 函数在两个文件描述符之间传递数据（完全在内核中操作），从而避免了内核缓冲区和用户缓冲区之间的数据拷贝，效率很高，被称为零拷贝。

文件数据 -> 内核 -> 用户

静态文件

如何理解同步异步，阻塞非阻塞？

同步异步关注的是消息通信机制，同步是调用者主动等待被调用者的结果，异步是被调用者来通知调用者结果。是针对调用者来说的(如 js 发 ajax)。
阻塞和非阻塞关注的是程序(不是指调用者，也可能是被调用者)等待结果时的状态，阻塞是结果返回之前，调用者挂起，非阻塞是结果返回之前，调用者仍然运行。往往是针对被调用者(浏览器线程)来说的。

进程切换：期间要保存上一个进程的上下文，下次执行时恢复，所以会耗费性能。

0 标准输入 1 标准输出 2 错误输出，文件描述符是从 3 开始

I/O

## nginx 配置

```
user  nginx; # 以哪个用户身份运行
worker_processes  auto; # 工作进程数, 命令 lscpu 查看核心数，大于物理核心数没用

error_log  /var/log/nginx/error.log warn;  # nginx 的错误日志
pid        /var/run/nginx.pid;  # master 进程 id， 通过 ps aux | grep nginx 可以查看

# 动态装载模块配置，比如 geoip.conf 里可以 load_module "ngx_http_geoip_module.so"，根据ip定位的包
include /usr/share/nginx/module/*.conf

# 配置事件驱动模型，会自动选择 epoll 或其它
events {
    # 最大不要超过最大文件打开数，通过 ulimit -a 查看
    # 每个进程允许的最大连接数，总并发为 worker_processes * worker_connections，但是太多请求可能服务器承受不了
    worker_connections  1024;
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

    sendfile       on; # 不经过用户内核发送文件
    tcp_nopush     on; # 在sendfile开启的情况下懒发送，如发送大文件，会累积收到(服务器的)一定大小数据后再发送给客户端
    tcp_nodelay    on; # 在keepalive连接下，不延迟发送，和tcp_nopush相反

    keepalive_timeout  65; # 保持连接超时时间
    types_hash_max_size 2048;

    include       /etc/nginx/mime.types;  # 让 nginx 知道支持哪些 mime 类型，里面是 mime 的映射表
    default_type  application/octet-stream; # 默认把文件都识别为 8 进制数据

    gzip  on; # 启用 gzip 压缩
    gzip_comp_level 1; # gzip 压缩比率
    gzip_http_version 1.1; # 压缩版本 1.0 1.1

    include /etc/nginx/conf.d/*.conf;  # 让虚拟主机模块化，包含子配置项

    # 访问的主机名都不匹配会将第一个当作默认，可以通过 default_server 指定默认，来响应匹配不到的虚拟主机
    server {
        listen     80 default_server;
        listen     [::]:80 default_server;
        server_name  _;   # _ 匹配所有主机名
        root       /usr/share/nginx/html;

        include /etc/nginx/default.d/*.conf;

        location / {
        }

        location ~ .*\.(jpg|png|gif){
        	gzip off;  # 图片已经压缩过，压缩比率小，可以不压
        	root /data/www
        }

        location ~ .*\.(html|js|css){
        	gzip on;
        	gzip_min_length 1k; # 只压缩超过1K的文件
        	gzip_http_version 1.1;
        	gzip_com_compress 9;  # 压缩比率 1-9
        	gzip_types text/css application/javascript; # 进行压缩的文件类型
        	root /data/www;
				}

				location ~ ^/download {
          gzip_static on; # 启用压缩
          tcp_nopush on;  # 不要着急发，攒一波再发
          root /data/www; # 注意此处目录是`/data/www`而不是`/data/www/download`
    		}

        # 指定 404 状态码时返回的页面
        error_page 404 /404.html;
        location = /40x.html {
        }

        # 把后台错误重定向到50x页面
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html; # 没有root会找上级或当前目录
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

## 核心模块

### 监控 nginx 状态

`--with-http_stub_status_module`模块，监控 nginx 状态

```
server {
    location /status {
        stub_status
    }
}
```

之后访问 http://192.168.20.1/status 就可以看到 nginx 状态情况：

```
Active connections: 2
server accepts handled requests
 3 3 10
Reading: 0 Writing: 1 Waiting: 1
```

-   Active connections 当前 nginx 正在处理的活动连接数
-   accepts 总共处理的连接数
-   handled 成功创建握手数
-   requests 总共处理请求数
-   Reading 读取到客户端的 Header 信息数
-   Writing 返回给客户端的 Header 信息数
-   Waiting 开启 keep-alive 的情况下,这个值等于 active – (reading + writing)

### 随机主页

--with-http_random_index_module 在根目录里随机选择一个主页显示

```
location / {
    root /opt/app;
    random_index on;
}
```

### 内容替换

--with-http_sub_module 替换文件内容

```
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    sub_filter 'aa' 'bb'; # 将文件里的aa替换成bb
    sub_filter_once off;  # 默认只替换一次
}
```

### 请求限制

限制每秒能发多少请求。

编译时需要带上这些模块：

-   --with-limit-conn_module 限制连接频率
-   --with-limit-req_module 限制请求频率
-   一次 tcp 请求至少产生一个 http 请求
-   请求过程连接与挥手：Syn -> syn,ack->ack->request->response->fin->ack->fin->ack

#### ab 命令

Apache 的 ab 命令模拟多线程并发请求，测试服务器负载压力，也可以测试 nginx、lighthttp、IIS 等其它 Web 服务器的压力

-   -n 总共请求数
-   -c 并发请求数

```
ab -n 40 -c 20 http://127.0.0.1/
```

#### 案例

下面是一个例子，设置一个名为 req_ten_second 的规则，空间 10M，每秒 10 个请求。

```
http{
  ...
  # limit_req_zone Context: http(定义在server以外)
	limit_req_zone $binary_remote_addr zone=req_ten_second:10m rate=10r/s

	# 设置限制连接数规则
	limit_conn_zone $binary_remote_addr zone=conn_low:10m;
	server {
		# limit_req Context: http,server,location
		limit_req zone=req_ten_second;
		# burst是缓存队列长度 nodelay是不延期，每秒处理最多rate+burst个，后续请求放burst中
		# limit_req zone=req_ten_second burst=20 nodelay;

		# 限制连接数为10
		limit_conn conn_low 10;
	}
}
```

-   $binary_remote_add 表示请求的 ip 地址
-   zone=req_ten_second:10m 表示内存 10M，名称为 req_ten_second
-   rate=10r/s 表示每秒 10 个请求
-   burst=20 表示缓存队列长度，缓存区满了后续请求会被丢弃
-   nodelay 表示不延迟处理，后续请求会放在缓存区或直接丢弃

### 访问控制

-   基于 ip 的访问控制 -http_access_module
-   基于用户的信任登陆 -http_auth_basic_module

### http_access_module

```
Syntax: allow address|all;
Default: --
Context: http,server,location,limit_except
```

```
Syntax: deny address|CIDR|all;
Default: --
Context: http,server,location,limit_except
```

案例

```
server {
	location ~ ^/admin.html {
		deny 192.168.20.1/24; # 不允许 192.168.20.x 访问
		allow all;
	}
}
```

CIDR 是一种 ip 地址表示方法：

```
192.168.20.1/24; # ip二进制表示法是 4 * 8 = 32 位
```

是将该 ip 地址的前 24 位和子网掩码 255.255.255.0 做与操作的结果。

符号含义

-   = 严格匹配
-   ~ 区分大小写，匹配，可写正则
-   !~ 区分大小写，不匹配
-   ~\* 不区分大小写，匹配，可写正则
-   !~\* 不区分大小写，不匹配
-   ^~ 如果作用于常规字符串，则不当作正则

### http_auth_basic_module

可以做基本的访问校验，使用用户名和密码。

```
# 语法
Syntax: auth_basic string|off;
Default: auth_basic off;
Context: http,server,location,limit_except

# 语法
Syntax: auth_basic_user_file file;
Default: -;
Context: http,server,location,limit_except

# 1. 创建文件，写入用户名 zhangsan 和密码(会经过加密处理)
htpasswd -c /etc/nginx/users.conf zhangsan

# 2. 使用文件进行校验
server {
    auth_basic '请登录';
    auth_basic_user_file /etc/nginx/users.conf;
}
```

## 静态资源服务

### CDN

cdn: content delivery network 内容分发网络。

CDN 系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet 网络拥挤的状况，提高用户访问网站的响应速度。

![img](https://pic4.zhimg.com/80/v2-5ba76e77f05b030b5879177bd336928f_1440w.jpg?source=1940ef5c)

### http_gzip-static_module

这个模块会先磁盘上找同名 .gz 文件是否存在，存在则返回，常用于下载打包的文件。

-   http_gzip_static_module 支持 gzip 模块
-   http_gunzip_module 支持 gunzip 的压缩方式

```
gzip_static on/off
```

### 浏览器缓存

![](imgs/2021-04-11-16-12-38.png)

expires 是老浏览器支持，max-age 是新的。

![](imgs/2021-04-11-16-15-15.png)

```
location ~ .*\.(jpg|png|gif)$ {
    add_header  Cache-Control max-age=3600;
    # 不设置则响应 304
    expires 24h;  # d天 h  m s max
}
```

### 跨域

```
map $http_origin $allow_origin {
    ~^http://(www\.)?example.com$ $http_origin;
}
map $http_origin $allow_methods {
    ~^http://(www\.)?example.com$ "OPTIONS, HEAD, GET";
}

location ~ .*\.json$ {
    # add_header Access-Control-Allow-Origin http://localhost:3000;
    # add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
    add_header Access-Control-Allow-Origin $allow_origin;
    add_header Access-Control-Allow-Methods $allow_methods;
    root /data/json;
}
```

### 防盗链

防盗链的作用是保证资源的安全、防止流量浪费。

通过 http_refer 防盗链

```
location ~ .*\.(jpg|png|gif)$ {
	# none 表示没有 refer，blocked为非正式http请求，特定ip
	# 设置变量 valid_referers 为满足三个条件之一
	valid_referers none blocked 192.168.20.1;
	if ($invalid_referer) { # 验证通过为0，不通过为1
		return 403;
	}
}
```

```
# -e,--referer 设置 referer url
curl -e http://www.baidu.com http://banli17.com
```

## 代理服务 proxy_pass

### 正向代理

比如请求 x.com，首先修改 hosts 文件:

```
192.168.20.22 www.x.com
```

然后使用 nginx 做正向代理。

```
resolver 8.8.8.8; #谷歌的域名解析地址
location / {
    # $http_host 要访问的主机名 $request_uri请求路径
    proxy_pass http://$http_host$request_uri;
}
```

### 反向代理

```
location ~ ^/api {
    proxy_pass http://localhost:3000;
    # 相当于 proxy_redirect http://localhost:3000  /api;
    proxy_redirect default; # 重定向

    proxy_set_header Host $http_host;        # 向后传递头信息
    proxy_set_header X-Real-IP $remote_addr; # 把真实IP传给应用服务器

    proxy_connect_timeout 30; # 默认超时时间
    proxy_send_timeout 60;    # 发送超时
    proxy_read_timeout 60;    # 读取超时

    proxy_buffering on;             # 在proxy_buffering 开启的情况下，Nginx将会尽可能的读取所有的upstream端传输的数据到buffer，直到proxy_buffers设置的所有buffer们 被写满或者数据被读取完(EOF)
    proxy_buffers 4 128k;           # proxy_buffers由缓冲区数量和缓冲区大小组成的。总的大小为number*size
    proxy_busy_buffers_size 256k;   # proxy_busy_buffers_size不是独立的空间，他是proxy_buffers和proxy_buffer_size的一部分。nginx会在没有完全读完后端响应的时候就开始向客户端传送数据，所以它会划出一部分缓冲区来专门向客户端传送数据(这部分的大小是由proxy_busy_buffers_size来控制的，建议为proxy_buffers中单个缓冲区大小的2倍)，然后它继续从后端取数据，缓冲区满了之后就写到磁盘的临时文件中。
    proxy_buffer_size 32k;          # 用来存储upstream端response的header
    proxy_max_temp_file_size 256k; # response的内容很大的 话，Nginx会接收并把他们写入到temp_file里去，大小由proxy_max_temp_file_size控制。如果busy的buffer 传输完了会从temp_file里面接着读数据，直到传输完毕。
}
```

## 负载均衡

### 配置

```
upstream x {
  server 127.0.0.1:3000 weight=10;
  server 127.0.0.1:4000;
  server 127.0.0.1:5000;
}

server {
    location / {
        proxy_pass http://x;
    }
    ...
```

### 后端服务器状态

-   down: 当前服务器不参与负载均衡
-   backup: 备用，其它节点都无法使用时，才启用
-   max_fails: 允许请求失败的次数，到达最大次数会休眠
-   fail_timeout: 经过 max_fails 失败后，服务暂停的时间，默认 10s
-   max_conns: 限制每个 server 最大接收的连接数，性能高的服务器可以多点

```
upstream x {
  server localhost:3000 down;
  server localhost:4000 backup;
  server localhost:5000 max_fails=1 fail_timeout=10s;
}
```

### 分配方式

-   轮询(默认)，down 的不会参与
-   weight 加权
-   ip_hash 按照 ip 的 hash 结果分配，可以解决登陆状态的 session 问题(比如登陆后分配给其它服务器会显示未登录)
-   least_conn 分配给连接少的
-   url_hash(第三方): 按照 url 地址来分配，后端代码里可以用 url 来做缓存
-   fair(第三方): 响应时间短的优先分配
-   自定义 hash

```
upstream x{
  ip_hash;
  server 127.0.0.1:3000;
}

upstream x{
  hash $request_uri;
  server 127.0.0.1:3000;
}
```

## nginx 缓存

可以做以下缓存：

-   应用服务器缓存
-   代理缓存
-   客户端缓存

```
http {
    # 缓存路径 目录层级 缓存空间名称和大小 失效时间为7天 最大容量为10g
    proxy_cache_path /data/nginx/cache levels=1:2 keys_zone=cache:100m inactive=60m max_size=10g;
}
```

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

-   nginx 二进制可执行文件：由各模块源码编译出的一个文件
-   nginx.conf 配置文件，控制 nginx 的行为
-   access.log 访问日志，记录每一条 http 请求信息
-   error.log 错误日志，定位问题

版本发布

-   feature
-   bugfix
-   change

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

-   核心模块 core module
-   标准模块
    http modules: Standard HTTP modules / Optional HTTP modules
    Mall modules
    Stream modules
-   第三方模块

nginx 作用

-   静态 web 静态服务器（图片服务器，或 js/css/html/txt 等静态资源服务器）。单台 3w 并发
-   结合 FastCGI/uwSGI/SCGI 等协议反动态资源请求
-   http/https 协议的反向代理
-   imap4/pop3 协议的反向代理
-   tcp/udp 协议的请求转发

## 应用场景与优点

3 个主要应用场景

-   静态资源服务
-   反响代理服务
    -   nginx 强大性能
    -   缓存
    -   负载均衡
-   API 服务
    -   OpenResty

为什么出现

-   互联网的数据快速增长
    -   互联网的快速普及
    -   全球化
    -   物联网
-   摩尔定律：心跟那个提升
-   低效的 Apache
    -   一个连接对应一个进程

5 个优点

-   高并发，高性能
-   可扩展性好，模块化，社区丰富
-   高可靠性
-   热部署，不停止服务的前提下升级
-   BSD 许可证，开源，可自己改

### 重写

### 重定向

安装 nginx 方法

-   官方的预制包
    -   a
    -   Fedora-EPEL
-   编译安装

配置文件

-   主配置文件 nginx.conf

    -   `include conf.d/*.conf`
    -   fastcgi, uwsgl, scgi 等协议相关的配置文件
    -   mime.types 支持的 mime 类型

-   主配置文件的配置指令

```
directive value [value2...]
```

-   指令必须以分号结尾
-   支持使用配置变量
    -   内建变量：由 nginx 模块引入，可以直接引用
    -   自定义变量：由用户使用 set 命令定义
        -   `set variable_name value`
        -   引用变量： `$variable_name`

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

-   stop 立即停止服务 - quit 优雅的停止服务 - reload 重载配置文件 - reopen 重新开始记录日志文件

-   测试配置文件是否有语法错误 -t -T
-   打印 nginx 版本信息、编译信息 -v -V

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

-   [https://ld246.com/article/1448286508594](https://ld246.com/article/1448286508594)
-   [Nginx 反向代理到花生壳动态域名失效问题解决](https://www.jianshu.com/p/7af71499f78e)
-   [resolver](http://nginx.org/en/docs/http/ngx_http_core_module.html#resolver)
