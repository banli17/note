---
title: pm2
---

## 资料

- [pm2 官方文档](https://pm2.io/doc/en/runtime/quick-start/)

## 总结

pm2 是用于管理 Node 进程的工具。

### 安装

**安装**

```bash
npm install pm2 -g
yarn global add pm2
```

**更新**

```bash
npm install pm2 -g && pm2 update
```

### 生态系统文件

1. 通过`pm2 init`生成一个`ecosystem.config.js`模板。

2. 通过配置里面的 name 字段，来启动进程。

```javascript
module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

// pm2 start app
```

3. 修改环境

```
# 用--env标志选择环境
pm2 start ecosystem.config.js --env production

# 刷新环境
pm2 restart ecosystem.config.js --update-env

# 切换环境
pm2 restart ecosystem.config.js --env production --update-env
```

### 进程管理

```bash
# 新增一个进程
pm2 start app.js

# 通过--name或-n修改进程名，默认进程名是没有.js，即app。
pm2 start app.js --name newApp

# 列出进程
pm2 ls

# 停止和删除进程
pm2 delete app
```

接着就可以使用进程名称进行操作了。`pm2 start app.js`会在 pm2 进程列表中注册并后台启动应用程序。

```bash
pm2 start app
pm2 restart app
pm2 stop app

# 重启多个应用程序
pm2 restart app1 app2 app3

# 使用正则表达式
pm2 restart /^app/
```

**保存进程列表**

```bash
# 将流程列表保存到$HOME/.pm2/dump.pm2
pm2 save

# 恢复进程列表
pm2 resurrent
```

**本地监控**

本地监控工具可以显示每个进程 CPU 使用情况，内存使用情况，环路延迟或请求/分钟情况。

```bash
pm2 monit
```

### 日志管理

日志可以实时获取并保存在硬盘中，日志格式化、创建的方式都可以自定义。

**访问日志**

```bash
pm2 logs
pm2 logs app
```

**日志文件**

默认保存在`$HOME/.pm2/logs`下，可以用下面命令清空所有进程日志。

```bash
pm2 flush
```

**日志文件配置**

可以在`ecosystem.config.js`里指定自定义文件位置。

```javascript
module.exports = {
  apps: [
    {
      name: "app",
      script: "app.js",
      output: "./out.log",
      error: ".error.log",
      log: "./combined.outerr.log",
    },
  ],
};
```

- output 是标准输出，console.log()的内容
- error 是错误输出，console.error()的内容
- log，结合 output 和 error 的内容，默认是禁用的

**拆分大日志文件为多个文件**

可以通过[pm2-logrotate](https://github.com/keymetrics/pm2-logrotate)

```bash
pm2 install pm2-logrotate
```

**合并日志**

集群模式下，每个集群都有自己的日志，可以将它们合并到一个文件中。

```javascript
module.exports = {
  apps: [
    {
      name: "app",
      script: "app.js",
      output: "./out.log",
      error: ".error.log",
      merge_logs: true,
    },
  ],
};
```

**禁用日志**

可以将日志发送到/dev/null 来禁用日志。

```javascript
module.exports = {
  apps: [
    {
      name: "app",
      script: "app.js",
      output: "/dev/null",
      error: "/dev/null",
    },
  ],
};
```

**日志格式化**

在条目下添加 `log_type: 'json'` 字段。

**时间戳格式**

在条目下添加 `data_log_format: 'JJ-MM-YYYY''`。具体看[这里](https://momentjs.com/docs/#/parsing/string-format/)。

### 设置开机启动

`pm2 startup`命令可以生成开机启动的命令。

```bash
pm2 startup
$ [PM2] You have to run this command as root. Execute the following command:
$ sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
```

在命令行粘贴结果并运行。

> 使用 NVM pm2 时，更新 nodejs 时路径会发生变化。您需要 startup 在每次更新后运行该命令。

可以通过`--service-name <name>`自定义服务名称。

**保存进程列表**

开机启动会自动加载之前保存的进程列表。

```bash
# 将流程列表保存到$HOME/.pm2/dump.pm2
pm2 save

# 禁用启动系统
pm2 unstartup

# 用户权限，如果希望在其它用户下执行
pm2 startup ubuntu -u www --hp /home/ubuntu

# 更新启动钩子
pm2 unstartup
pm2 startup
```

**添加到文件**

- Ubuntu 的使用 updaterc.d 和脚本 lib/scripts/pm2-init.sh
- centos / redhat 的使用 chkconfig 和脚本 lib/scripts/pm2-init-centos.sh

### 负载均衡

**集群模式**

```bash
# 通过-i 传递所需的集群数量
pm2 start app.js -i 4

# 自动检测可用cpu数量
pm2 start app.js -i max

# 重载
pm2 reload app
```

**查看帮助**

```bash
pm2 restart -h
```

### 开发工具

**监听文件变化并重启**

```javascript
module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      watch: true,
    },
  ],
};
```

上面是硬重启。

**watch 选项**

watch 使用的[chokidar](https://github.com/paulmillr/chokidar#api)。

- watch：要监听的路径
- ignore_watch：可以是路径或字符串数组，会被用作 glob 或正则。
- watch_options

还可以在命令行使用`--watch`。停止也需要使用`pm2 stop --watch app`停止监听。

**通过 http 静态文件服务**

```bash
# 开启静态服务，默认当前目录，端口是8080
pm2 serve
pm2 serve <path> <port>
```

也可以通过配置：

```javascript
module.exports = {
  apps: [
    {
      name: "static-file",
      script: "serve",
      env: {
        PM2_SERVE_PATH: ".",
        PM2_SERVE_PORT: 8080,
      },
    },
  ],
};

// pm2 start ecosystem.config.js
```

### 使用 SSH 部署
