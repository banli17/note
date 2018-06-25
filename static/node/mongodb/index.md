

sql数据库    mysql  oracle
nosql数据库  redis  mongodb

1. 无数据结构限制

- 没有表结构概念，每条记录可以有不同的解构
- 业务开发方便
- sql数据库需要实现规定表结构

2. 完全的索引支持

- redis的key-value
- hbase的单索引，二级索引需要自己实现

单键索引，多键索引 ：{x:1, y:1}
数组索引：['apple','lemon']
全文索引：'i am a bird'
地理位置索引：  2D

3. 方便的冗余与扩展

- 复制集保证数据安全
- 分片扩展数据规模

4. 良好的支持

- 完善的文档
- 齐全的驱动支持


```
banli-MBP:email banli$ mongo
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27017
2018-03-24T17:12:13.406+0800 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27017, in(checking socket for error after poll), reason: Connection refused
2018-03-24T17:12:13.409+0800 E QUERY    [thread1] Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed :
connect@src/mongo/shell/mongo.js:251:13
@(connect):1:6
exception: connect failed
banli-MBP:email banli$ mongo 127.0.0.1:12345
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:12345/test
MongoDB server version: 3.6.3
Server has startup warnings:
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten]
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten]
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server.
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten] **          Start the server with --bind_ip <address> to specify which IP
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.
2018-03-24T17:03:38.794+0800 I CONTROL  [initandlisten]
> dbs
2018-03-24T17:12:56.396+0800 E QUERY    [thread1] ReferenceError: dbs is not defined :
@(shell):1:1
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use imooc
switched to db imooc
> show dba
2018-03-24T17:13:47.875+0800 E QUERY    [thread1] Error: don't know how to show [dba] :
shellHelper.show@src/mongo/shell/utils.js:953:11
shellHelper@src/mongo/shell/utils.js:706:15
@(shellhelp2):1:1
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use imooc
switched to db imooc
> db.imooc_collection.insert({x:1})
WriteResult({ "nInserted" : 1 })
> show dbs
admin   0.000GB
config  0.000GB
imooc   0.000GB
local   0.000GB
> use imooc
switched to db imooc
> ls
[native code]
> db
imooc
> show collection
2018-03-24T17:15:43.602+0800 E QUERY    [thread1] Error: don't know how to show [collection] :
shellHelper.show@src/mongo/shell/utils.js:953:11
shellHelper@src/mongo/shell/utils.js:706:15
@(shellhelp2):1:1
> show collections
imooc_collection
> db.i
db.imooc_collection  db.isMaster(
> db.imooc_collection.find()
{ "_id" : ObjectId("5ab61700385503a5fa0fcfab"), "x" : 1 }
> db.imooc_collection.insert({x:2,_id:1})
WriteResult({ "nInserted" : 1 })
> db.imooc_collection.insert({x:3,_id:1})
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "E11000 duplicate key error collection: imooc.imooc_collection index: _id_ dup key: { : 1.0 }"
	}
})
> db.imooc_collection.find()
{ "_id" : ObjectId("5ab61700385503a5fa0fcfab"), "x" : 1 }
{ "_id" : 1, "x" : 2 }
> db.imooc_collection.find({x:1})
{ "_id" : ObjectId("5ab61700385503a5fa0fcfab"), "x" : 1 }



> db.imooc_collection.find().skip(3).limit(2).sort({x:-1})
{ "_id" : ObjectId("5ab61894385503a5fa0fcfae"), "x" : 5 }
{ "_id" : ObjectId("5ab61894385503a5fa0fcfad"), "x" : 4 }



> db.imooc_collection.update({x:1}, {x:999})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.imooc_collection.find({x:1} )
> db.imooc_collection.find({x:999})
{ "_id" : ObjectId("5ab61700385503a5fa0fcfab"), "x" : 999 }
> db.imooc_collection.insert({x:100,y:200,z:300})
WriteResult({ "nInserted" : 1 })
> db.imooc_collection.update({z: 300}, {$set:{y:99}})  // set是部分操作符
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.imooc_collection.find({z:300})
{ "_id" : ObjectId("5ab61a736e5ee48bc933eba6"), "x" : 100, "y" : 99, "z" : 300 }
>


> db.imooc_collection.update({y:100},{y:99})
WriteResult({ "nMatched" : 0, "nUpserted" : 0, "nModified" : 0 })
> db.imooc_collection.update({y:100},{y:99}, true)  // true表示没有则新增
WriteResult({
	"nMatched" : 0,
	"nUpserted" : 1,
	"nModified" : 0,
	"_id" : ObjectId("5ab61b0cd7cb1c2faaa4f7d5")
})
>

// update默认更新第一条数据，防止误操作
// 要全部更新，需要
> db.imooc_collection.update({y:99}, {$set:{g:9}}, false, true)
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 2 })
> db.imooc_collection.find({g:9})
{ "_id" : ObjectId("5ab61a736e5ee48bc933eba6"), "x" : 100, "y" : 99, "z" : 80, "z1" : 80, "g" : 9 }
{ "_id" : ObjectId("5ab61b0cd7cb1c2faaa4f7d5"), "y" : 99, "g" : 9 }
```





## mac下mongodb的使用

1、安装

```
brew install mongod
```

2、启动服务

```
brew services start mongodb
```

有时候connect fail时，也需要用这个命令重启下服务。

3、进入数据库

```
mongo
```




# 在centos上安装mongodb

我的系统是centos7，需要安装mongodb3.6版本。

- [官方文档](https://docs.mongodb.com/tutorials/install-mongodb-on-red-hat/#run-mongodb-community-edition)

1. 创建`/etc/yum.repos.d/mongodb-org-3.6.repo`文件，用于yum下载mongodb。

```
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
```

2.安装，执行下面的命令

```
sudo yum install -y mongodb-org
```

3. 运行mongodb

```
// 启动mongodb服务
sudo service mongod start

// 暂停服务
sudo service mongod stop

// 重启服务
sudo service mongod restart

// 使用mongodb
mongo --host 127.0.0.1:27017
```

```
security:
    authorization: enabled
```
https://docs.mongodb.com/v3.2/reference/configuration-options/#security.authorization

## 参考资料

- [Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)
- [CentOS系统yum源变快的好办法](http://blog.51cto.com/tonychiu/367204)

- [mongodb设置密码](https://blog.csdn.net/fofabu2/article/details/78983741)























