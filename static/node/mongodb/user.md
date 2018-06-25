# MongoDB安全

- 最安全的是物理隔离：不现实
- 网络隔离，比如使用内网，或限制端口、ip
- 防火墙再其次
- 用户名密码在最后


## 用户名密码验证

开启权限的方法是开启auth，并且要创建用户。

1. 修改配置文件 `/etc/mongod.conf`，开启 `authorization`。

```
security:
    authorization: enabled
```

2. 创建用户

```
// 语法
db.createUser({
    "user": "<name>",
    "pwd: "<password>",
    "customData": {<any infomation>},
    "roles":[
        {
            "role": "<role>",
            "db": "<database>"
        }
    ]
})
```

角色类型如下：

```
Built-In Roles（内置角色）：
    1. 数据库用户角色：read、readWrite;
    2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
    3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
    4. 备份恢复角色：backup、restore；
    5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
    6. 超级用户角色：root  
    // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
    7. 内部角色：__system

Read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
root：只在admin数据库中可用。超级账号，超级权限
```


createRole()

https://docs.mongodb.com/manual/reference/command/nav-role-management/
```
db.system.users.find() // 查看系统用户

use admin  // 切换数据库

```

## 参考资料

- [MongoDB 3.X 用户权限控制](https://www.cnblogs.com/shiyiwen/p/5552750.html)