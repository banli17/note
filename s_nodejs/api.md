# API 构建

## 安装

首先按照 mysql，再安装[mysql 连接器](https://github.com/mysqljs/mysql#readme)，提供了操作数据库的接口

```bash
npm i mysql
```

## 连接 mysql 报错

**1、connect ECONNREFUSED 127.0.0.1:3306**

mamp 的 mysql 端口是 8889 了，另外，需要开启`Allow network access to Mysql`。

**2、Access denied for user 'root'@'localhost' (using password: NO)**

重置一下 root 的密码

## 操作 mysql 的方式

1、通过 sql 语句

```javascript
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "",
  password: "",
  database: "",
});

connection.connect(function (err) {
  if (err) {
    console.error(err.stack);
    return;
  }

  connection.query("SELECT * FROM blogs", function (err, result) {
    if (err) throw err;

    console.log(result);

    connection.end();
  });
});
```

sql 注入安全问题

2、通过 ORM 方式

`Object Relational Mapping`。通过操作对象的方式操作数据库。

优点：

1. 不用写 sql 语句，在工具层防止 sql 注入
2. 屏蔽底层操作，提升开发效率和可维护性

确定：

1. 复杂场景，性能不如 sql
1. 很难做性能调优
1. 对于复杂查询很无力

通过 Sequelize 库

```
npm install sequelize
npm install mysql2
```

提供数据接口

接口设计
get 和 post 请求处理

使用连接池
频繁开启关闭链接可能造成性能问题或达到链接上线。

连接池

优点
资源重用
更快响应速度
统一连接管理，避免数据库连接泄露
更好的资源分配

mysql 和 sequelize 都默认支持。

```
mysql.createPool({

})
```

## 进程管理

### 利用多核 CPU

一个核运行一个进程。

### 守护进程

在实际的生产环境的 Web 服务器都是以多进程方式的，目的除了可以提高处理请求的并发能力，另外就是可以管理 web 服务进程，当出现异常时，程序可以发现并重启新的 web 服务进程来继续服务，保障服务的健壮和稳定。

守护进程因为是负责创建和管理工作进程的，所以不要实际处理请求，要保证尽量不出现异常，如果守护进程都出现异常了就只能人工重启服务或通过第 3 方程序来定时发现并重启了。

- [nvm](https://github.com/creationix/nvm)

使用 nvm 管理 node。

```
// 安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm install v8.1.2
nvm use v8.1.2
node -v

nvm alias default v8.1.2  // node命令的默认版本是8.1.2
```

pm2

配置文件是根目录的`ecosystem.json`

```
pm2 list
pm2 show server
```

vue-cli

brew

码云

## 预习

- Lesson 0: [《搭建 Node.js 开发环境》](https://github.com/alsotang/node-lessons/tree/master/lesson0)
- Lesson 1: [《一个最简单的 express 应用》](https://github.com/alsotang/node-lessons/tree/master/lesson1)
- Lesson 2: [《学习使用外部模块》](https://github.com/alsotang/node-lessons/tree/master/lesson2)
- Lesson 3: [《使用 superagent 与 cheerio 完成简单爬虫》](https://github.com/alsotang/node-lessons/tree/master/lesson3)

通过上面的学习回答下面的问题。

1. 回忆 express 搭建`hello world`的代码？
2. 一共使用了哪些模块，用它们做了些什么？

- express 搭建静态服务器
- utility 实现 md5
- superagent 可以抓数据，cheerio 就是 node 版的 jquery

3. 在做爬虫抓 CNode 网站时，返回结果出现乱码，可能是 superagent 抓数据或者 express 返回数据时出现的问题。superagent 源码默认是 utf-8（如果需要设置编码，可以使用 superagent-charset 库），所以是 express 没有设置编码的问题。

```
res.setHead(200, {'Content-Type':'text/plain;charset=utf-8'})
```

4. put 和 post 的区别？patch 是什么？
   [HTTP 中 post 和 put 的根本区别和优势？](https://www.zhihu.com/question/48482736?from=profile_question_card)
5. 一个 url 的完整形式？

```
<scheme>://<user>:<password>@<host>:<port>/<url-path>
```

6. 端口的作用和范围？
   端口是用来区分传输的数据是要分配给哪个应用或进程的，一共有 Math.pow(2, 16)即 65536 个端口，范围是 0 - 65535（对 TCP 来说, port 0 被保留，不能被使用. 对于 UDP 来说, source 端的端口号是可选的， 为 0 时表示无端口）。

## 进阶

- [七天学会 NodeJS 之 NodeJS 基础](http://nqdeng.github.io/7-days-nodejs/#1)
- [深入浅出 Node.js（一）：什么是 Node.js](http://www.infoq.com/cn/articles/what-is-nodejs)
- [深入浅出 Node.js（二）：Node.js&NPM 的安装与配置](http://www.infoq.com/cn/articles/nodejs-npm-install-config)
