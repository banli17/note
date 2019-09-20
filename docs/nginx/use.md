---
title: "用法"
---

# nginx 基础用法

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

## nginx 403 forbidden 错误

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

参考资料：[关于 Nginx 不能正常启动的问题](https://blog.csdn.net/u012832088/article/details/80729002)

404，先 ping 一下看看 ip，可能 hosts 文件改了。

## 配置 https

首先在腾讯云申请 https 证书，然后下载。下载完成后通过下面命令上传到服务器。

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
