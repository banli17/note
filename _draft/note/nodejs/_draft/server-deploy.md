---
        title: 无名
        ---
        # 服务端环境部署与项目发布

**涉及到的内容**

- 配置服务器应用环境
- 安装配置数据库
- 项目远程部署发布与更新

## 增强服务器安全

1. 修改默认的22端口号

```
sudo vim /etc/ssh/sshd_config
```

- 修改`port`端口
- 将 UseDNS 改为 no
- 新增`AllowUsers banli17`，如果不增加这句，登录时会报`can't be established`错误。

2. 重启服务

```
sudo service sshd restart
```

3. 关闭root密码登录

```
PermitEmptyPasswords no
PermitRootLogin no
PasswordAuthentication no  // 密码登录
```

## 安装部署node

1、安装一些依赖

```bash
yum install vim openssl build-essential libssl-dev wget curl git
```

2、安装[nvm](https://github.com/creationix/nvm)

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

3、通过 nvm 安装 node，后面是 node 的版本号

```bash
nvm install v6.9.5
nvm use v6.9.5
nvm alias default v6.9.5
```

4、配置 npm 淘宝源，安装 nrm

```bash
npm install nrm -g
nrm ls
nrm use taobao
```

5、

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

6、安装全局工具包

```
npm i pm2 webpack gulp grunt-cli -g
```

7、新建`/www/app.js`

远程通过ip + port的方式(99.99.99.99:8081)访问。

8、使用pm2，用来运维node，防止挂掉，可以自动重启

```bash
pm2 start app.js  // 开启
pm2 logs
```

9、外部通过80端口来访问，用nginx转发到其它端口

```bash
sudo yum install nginx
cd /etc/nginx/default.d
sudo vim test-com-8081.conf    // 新建一个网址的配置文件
```

`test-com-8081.conf`文件内容如下：

```nginx
upstream test{
    server 127.0.0.1:8081;
}

server {
    listen 80;
    server_name localhost;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://test;
        proxy_redirect off;
    }
}
```

打开`/etc/nginx/nginx.conf`可以看到它会默认引入`default.d/`里的全部`.conf`配置。

`sudo vi ngix.conf`将server_tokens设置为off，隐藏浏览器上访问时头部的nginx版本信息

`service nginx restart`

## 安装mongoDB

> 具体查看官方文档[mongoDB](https://docs.mongodb.com/tutorials/install-mongodb-on-red-hat/)

安装步骤如下：

1、vim 新建一个`/etc/yum.repos.d/mongodb-org-3.6.repo`文件，里面的内容如下：

```
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
```

2、使用 yum 安装

```bash
sudo yum install -y mongodb-org
```

3、启动 mongod 服务

```bash
sudo service mongod start

# sudo service mongod stop
# sudo service mongod restart
```

4、设置 mongod 开机自动启动

```bash
sudo chkconfig mongod on
```

5、接着就可以连接数据库了

6、设置mongodb账号密码

7、本地电脑使用Robo3T软件连接远程数据库

## 使用nginx

**1. 将请求分发到node端口**
服务器上有多个网站a.com:333、b.com:444，如果不想输入端口333、444,则需要使用默认的80端口，都用同一个80端口会出现端口占用的问题。这时我们需要使用nginx来做端口分发，将它监听到的80端口的数据分发给333、444端口。下面是一个例子：

```nginx
include /etc/nginx/conf.d/*.conf;
    upstream test{
            server 127.0.0.1:8081;
    }
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        listen 443 ssl;
        server_name  www.a.com;

        root         /home/banli/www/a;

        # 配置https
        ssl_certificate ./conf/1_www.a.com_bundle.crt;
        ssl_certificate_key ./conf/2_www.a.com.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://test;
        proxy_redirect http:// https://;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

```

详细nginx介绍，请查看[nginx使用教程](/docs/linux/nginx.md)

## 使用pm2管理node服务

使用`node app.js`时，一个报错就让node服务停止运行。pm2 是一个带有负载均衡功能的Node应用的进程管理器，能更好的管理node进程，并保证进程永远都活着。使用npm全局安装pm2后，可以使用下面命令。

```shell
pm2 -h    // 查看帮助
pm2 ls    // 列出所有当前启动的node服务
pm2 start app.js --watch  // --watch会监听文件变化，并重启node
pm2 kill  // 杀掉所有的node服务
```

## 如何让服务开机自动启动

服务器一旦重启，就需要手动重新启动nginx、mongodb、pm2等，这非常的麻烦。怎么样让这些服务开机自动启动呢？

nginx和mongodb的自启动，打开文件`/etc/rc.local`，内容里面添加对应的命令。

```shell
/usr/sbin/ntpdate ntpupdate.tencentyun.com >/dev/null 2>&1 &
/usr/local/qcloud/rps/set_rps.sh >/tmp/setRps.log 2>&1
/usr/local/qcloud/irq/net_smp_affinity.sh >/tmp/net_affinity.log 2>&1
/usr/bin/mongod -f /etc/mongod.conf --fork     // 添加
```

pm2自启动

```shell
// 1. 首先用pm2启动网站服务

// 2. 保存配置
pm2.save

pm2 log 0   // 可以用来查看console，0表示id，通过pm2 ls查看，
```


netstat -tunlp |grep mong
netstat -tunlp |grep 27017


ps aux | grep nginx  查看nginx的运行情况


 lsof -i:端口号
