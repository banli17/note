# 团队协作

## 前端框架分类及选型

## 文档与版本管理

![](imgs/2020-05-02-12-37-18.png)
![](imgs/2020-05-02-12-38-12.png)

## MarkDown 文档格式

- Typora: 可以导出成 psd、word 等
- IDE
  - webstorm
  - vscode

## ShowDoc 文档管理工具

- 数据字典、接口模版(新建时会自动创建模版)
- 团队协作(可以建立项目、成员权限管理)
- 免费开源

### 安装 docker

```
1、安装依赖

docker依赖于系统的一些必要的工具，可以提前安装。

yum install -y yum-utils device-mapper-persistent-data lvm2

2、添加软件源

yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

3、更新并安装docker-ce

yum clean all
yum makecache fast
yum -y install docker-ce

4、启动服务

通过systemctl启动服务

systemctl start docker

5、查看安装版本
docker version # 完整版本信息
docker --version
```

### 安装 showDoc

- [Docker 方式安装说明文档](https://www.showdoc.cc/help?page_id=65610)

```sh
# 原版官方镜像安装命令(中国大陆用户不建议直接使用原版镜像，可以用后面的加速镜像)
docker pull star7th/showdoc
# 中国大陆镜像安装命令（安装后记得执行docker tag命令以进行重命名）
docker pull registry.cn-shenzhen.aliyuncs.com/star7th/showdoc
docker tag registry.cn-shenzhen.aliyuncs.com/star7th/showdoc:latest star7th/showdoc:latest
##后续命令无论使用官方镜像还是加速镜像都需要执行
#新建存放showdoc数据的目录
mkdir -p /showdoc_data/html
chmod  -R 777 /showdoc_data
#启动showdoc容器
docker run -d --name showdoc --user=root --privileged=true -p 4999:80 \
-v /showdoc_data/html:/var/www/html/ star7th/showdoc

# 查看是否启动成功
docker ps | grep showdoc_test

# 放行端口
firewall-cmd --add-port=4999/tcp --permanent
```

**功能**

- 可以创建目录、新建成员、设置成员权限
- API 文档、技术文档、数据字典
- 可以导出成 word
- markdown 编辑、模版插入
- 多平台

更多参考[https://www.showdoc.cc/help](https://www.showdoc.cc/help?page_id=1385767280275683)

## 云笔记和个人笔记

- 映像笔记
- OneNote
- 有道云笔记
- VuePress

### 如何记笔记

- 清晰的目录结构(注意分类、索引)
- 时常更新与回顾，借助 APP 利用碎片时间进行学习
- 使用插件 + 移动端 APP、提升效率

学习 议论文、辩论文、陈述 的写作方式

## 缺陷控制与自动化流程

防火墙开放

```sh
firewall-cmd --add-port=11005/tcp --permanent
firewall-cmd --reload
```

插件库
![](imgs/2020-06-30-18-14-46.png)

配置加速源：

**1. 在线情况下**

在 Plugin Manager -> Advanced -> [Update Site](http://192.168.25.201:8080/pluginManager/advanced) 里面输入镜像地址即可。

```
清华大学镜像：https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
jenkins官方：https://updates.jenkins.io/update-center.json
```

**2. 离线内网情况下**

在 [https://plugins.jenkins.io/](https://plugins.jenkins.io/)搜插件，右边有个 archives 按钮下载。

然后 Plugin Manager -> Advanced ->`Upload Plugin`。

### 常用插件

备份 docker 容器内的东西到宿主。

## 搭建 git Gogs

1. 首先安装 git

```sh
yum install git -y
```

2. 新建 git 用户，Gogs 默认以 git 用户运行，运行后，用户不能再通过 ssh 登录。

```sh
sudo adduser git
su git
mkdir ~/.ssh  # 用来生成密钥
```

3. 下载 gogs

```sh
wget https://dl.gogs.io/0.11.34/linux_amd64.zip

unzip linux_amd64.zip

cd gogs/

# 执行命令
./gogs web  # 默认运行在 3000 端口
```

4. 登录安装即可。

## 防火墙

1、开放端口

```sh
firewall-cmd --zone=public --add-port=5672/tcp --permanent # 开放 5672 端口

firewall-cmd --zone=public --remove-port=5672/tcp --permanent #关闭 5672 端口

firewall-cmd --reload # 配置立即生效
```

2、查看防火墙所有开放的端口

```
firewall-cmd --zone=public --list-ports
```

3.、关闭防火墙

如果要开放的端口太多，嫌麻烦，可以关闭防火墙，安全性自行评估

```
systemctl stop firewalld.service
```

4、查看防火墙状态

```
firewall-cmd --state
```

5、查看监听的端口

```sh
netstat -lnpt
```

> PS:centos7 默认没有 netstat 命令，需要安装 net-tools 工具，yum install -y net-tools

6、检查端口被哪个进程占用

```sh
netstat -lnpt |grep 5672
lsof -i:8080
```

7、查看进程的详细信息

```sh
ps pid
```

8、中止进程

```sh
kill -9 6832
```

fs-extra https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/outputFile.md

download
微信小程序实现类 3D 轮播图
https://blog.csdn.net/laishaojiang/article/details/82384233

pm2 启动模式 fork 和 cluster 的区别
https://segmentfault.com/q/1010000005972763/a-1020000006078840
https://pm2.keymetrics.io/docs/usage/application-declaration/

https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1593240735874_R&pv=&ic=&nc=1&z=0&hd=&latest=&copyright=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&hs=2&sid=&word=%E7%86%8A%E7%8C%AB%E5%A4%B4
https://www.zhihu.com/question/276797767
