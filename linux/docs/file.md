---
title: 文件和目录操作
---

### 软连接

```
# 建立
ln -s 目标地址 软连接地址
# 删除
rm -rf 软连接地址
# 修改
```

上传文件报 413 Request Entity Too Large 错误解决办法

产生这种原因是因为服务器限制了上传大小

1、nginx 服务器的解决办法
修改 nginx.conf 的值就可以解决了
将以下代码粘贴到 nginx.conf 内

client_max_body_size 20M;
可以选择在 http{ }中设置：client_max_body_size 20m;
也可以选择在 server{ }中设置：client_max_body_size 20m;
还可以选择在 location{ }中设置：client_max_body_size 20m;
三者有区别
设置到 http{}内，控制全局 nginx 所有请求报文大小
设置到 server{}内，控制该 server 的所有请求报文大小
设置到 location{}内，控制满足该路由规则的请求报文大小

同时记得修改 php.ini 内的上传限制
upload_max_filesize = 20M

链接：https://www.jianshu.com/p/3851c3d6eaf1
