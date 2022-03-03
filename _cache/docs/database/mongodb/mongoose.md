---
title: mongoose
---

## 安装

- [官方安装 MongoDB 文档](https://docs.mongodb.com/manual/administration/install-community/)

### centos 安装

1. 新增文件`/etc/yum.repos.d/mongodb-org-4.2.repo`。

```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

2. 通过 yum 安装。

```
sudo yum install -y mongodb-org

# 也可以指定版本
sudo yum install -y mongodb-org-4.2.0 mongodb-org-server-4.2.0 mongodb-org-shell-4.2.0 mongodb-org-mongos-4.2.0 mongodb-org-tools-4.2.0
```

3. yum 会自动升级，要固定软件包，可以在`/etc/yum.conf`里新增下面字段。

```
exclude=mongodb-org,mongodb-org-server,mongodb-org-shell,mongodb-org-mongos,mongodb-org-tools
```

4. 默认情况下，mongodb 会使用 mongod 用户来运行。会新建下面目录：

```bash
# 如果是通过包管理工具安装，下面目录的拥有者和用户组会设置为 mongod
/var/lib/mongo (data数据目录)
/var/log/mongodb (日志目录)
```

5. 启动

```bash
# 启动
sudo service mongod start

# 暂停
sudo service mongod stop

# 重启
sudo service mongod restart

# 开机启动
sudo chkconfig mongod on

# 启动 mongo shell
mongo
```

启动后，`/var/log/mongodb/mongod.log`日志会输出成功，`/etc/mongod.conf`里配置了端口，默认为 27017。

6. 卸载

```bash
# 1. 暂停服务
sudo service mongod stop

# 2. 移除包
sudo yum erase $(rpm -qa | grep mongodb-org)

# 3. 移除数据目录
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo
```

### mac 安装

1. 提前工作

```
# 1. 安装 homebrew https://brew.sh/#install

# 2. 跳过引导
brew tap mongodb/brew
```

2.  安装 MongoDB

```
brew install mongodb-community@4.2
```

安装后会新增下面文件

```
/usr/local/etc/mongod.conf # 配置
/usr/local/var/log/mongodb # 日志
/usr/local/var/mongodb  # 数据
```

3. 运行

```bash
# 启动
mongod --config /usr/local/etc/mongod.conf

# 安装后就启动
brew services start mongodb-community@4.2

# 连接到 shell
mongo
```

> 如果遇到 ChecksumMismatchError 错误。先删除 .tgz 文件, 再运行下面命令。

```
brew untap mongodb/brew && brew tap mongodb/brew
brew install mongodb-community@4.2
```

### 可能的报错

> Failed to unlink socket file /tmp/mongodb-27017.sock Operation not permitted

是 mongod 没有 tmp 删除权限，手动删除或赋予权限即可。

> mongod.service: control process exited, code=exited status=14

```
chown -R mongod:mongod /var/lib/mongo
sudo chown mongod:mongod /tmp/mongodb-27017.sock
```

## 通过 MongoDB compass 工具连接

**centos 配置如下:**

1. 开启 27017 端口，详见[CentOS 开放端口的方法](https://www.cnblogs.com/inos/p/10985042.html)。

```
firewall-cmd --zone=public --add-port=27017/tcp --permanent
firewall-cmd --reload
```

2. 配置 `/etc/mongod.conf` 文件，并重启服务

```bash
net:
  port: 27017
  bindIp: 0.0.0.0 # 配置成 0.0.0.0

security:
  authorization: enabled
```

3. 新建 mongod 管理用户，运行`mongo`命令

```bash
# 创建
db.createUser(
  {
    user: "mongodb2",
    pwd: "hs15415162",
    roles: [ { role: "readWrite", db: "guess" } ]
  }
)


# 验证
db.auth("admin","admin")

db.revokeRolesFromUser(
  {
    user: "mongodb",
    roles: [ { role: "readWrite", db: "guess" } ]
  }
)
```

4. 配置连接参数。

![](imgs/2020-06-18-10-34-35.png)

## mongoose 使用方法

mongoose 是一个 npm 包，它定义了一些操作 mongodb 的接口。

### 基础使用

1. 安装

```sh
npm i mongoose
```

2. 连接数据库

```js
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");
var db = mongoose.connection;
db.on("error", () => {
  console.log("error");
});
db.once("open", () => {
  console.log("connected");
});
```

上面的代码，mongodb 会查看是否存在 test 数据库，如果不存在会自动创建。

3. 定义表结构

在 Mongoose 里，所有东西都是由 Schema(架构) 驱动。每个 Schema 都会映射成一个 Mongodb collection，并定义了 collection

```javascript
var userSchema = mongoose.Schema({
  name: String,
});

// 这里可以给表增加一个方法，通过methods
userSchme.methods.speak = function () {
  // 这里的name是保存数据时传入的name
  console.log(this.name);
};
```

4. 使用 schema 生成 model。它相当于是生成一个类，然后就可以用它生成对象，用于保存。

```javascript
var User = mongoose.model("User", userSchema);
```

5. 生成对象并保存。

```javascript
var zs= new User({name: '张三'})
zs.save((err, zs){
    if(err) throw err
    console.log('保存成功')

    // 这里zs有表的方法
    console.log(zs.speak())
})
```

6. 查询数据。保存成功后，就可以通过 model 的 find 来查询数据了。

```javascript
User.find((err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### Schemas

Schema 的数据类型由下面几种：

- String
- Number
- Data
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map

Schema 的配置选项有下面这些：

**Schema 类型**

- required：字段是否必须
- default：设置默认值
- select：
- validate：验证函数
- get
- set
- alias

**Indexs**

- index
- unique
- sparse

**String**

- lowercase
- uppercase
- trim
- match
- enum
- minlength：最小长度，可以等于
- maxlength

**Number**

- min
- max

**Data**

- min
- max

## 学习资料

- [mongoose 官方文档](http://mongoosejs.com/docs/schematypes.html)
