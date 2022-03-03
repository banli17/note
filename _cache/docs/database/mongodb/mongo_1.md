---
title: MongoDB 基础
---

## 概念

**什么是 MongoDB**

MongoDB 是一个以 JSON 为数据模型的文档数据库。

**为什么叫文档数据库**

文档来自于`JSON Document`，并非我们一般理解的 PDF、WORD 文档，更像是 Object 对象。

**谁开发 MongoDB**

MongoDB 由上市公司 MongoDB Inc(总部在美国纽约)公司开发 99% 代码，社区开发很少部分，开源。

**主要用途**

- 应用数据库，类似 Oracle, MySQL
- 海量数据处理，数据平台

**主要特点**

- 建模为可选
- JSON 数据模型比较适合开发者
- 横向扩展可以支撑很大数据量和并发

**MongoDB 是免费的吗**

MongoDB 分为社区版和企业版。
社区版基于 SSPL，一种和 AGPL 类似的开源协议。
企业版是基于商业协议，需付费使用，增加了企业管理、报表等额外功能。

**版本变迁**

- 2008: 0.x 起步，云端开发平台，数据库是 mongo，但是平台不被青睐，反倒是 mongo 受欢迎，就抽出来，专门做数据库
- 2010: 1.x 支持复制集和分片集
- 2012: 2.x 更丰富的数据库功能
- 2014: 3.x 整合 WiredTiger(性能提升)和周边生态环境
- 2018: 4.x 分布式事务支持

**MongoDB vs 关系型数据库**

![](./imgs/2020-03-28-11-01-31.png)

垂直扩展：提升单机处理能力。水平扩展：只要增加服务器数量，就能线性扩充系统性能。

**MongoDB 优势**

- 简单直观，以自然的方式建模，以直观的方式和数据库交互
- 结构灵活，弹性模式从容响应需求的频繁变化
  - 多形性，同一个集合中可以包含不同字段(类型)的文档对象(可动态添加新字段，而传统每条数据的键是一样多的)
  - 动态性，线上修改数据模式，修改是应用与数据库均无须下线
  - 数据治理，支持使用 JSON Schema 来规范数据模式，在保证灵活动态(多形性)的前提下，提供数据治理能力
- 快速开发，做更多的事，写更少的代码。JSON 模型快速特性：
  - 数据库引擎只需要在一个存储区读写，比如传统的用户、手机、地址表，可以在 MongoDB 中放在一个集合中`{user:{},phone:{},address:''}`。
  - 反范式、无关联的组织极大优化查询速度
  - 程序 API 自然，开发快速
- 原生的高可用
  - 默认就是 3 节点复制集部署(`primary + 2 * Secondary`), Replica Set 范围是 2 - 50 个成员，默认 Driver 只是从主节点读写。
  - 自恢复
  - 多中心容灾能力
  - 滚动服务 - 最小化服务终端，单节点升级
- 横向扩展
  - 无缝扩展
  - 应用全透明
  - 多种数据分布策略
  - 轻松支持 TB-PB 数量集

MongoDB 技术优势总结

- JSON 数据模型，动态模型，快速、灵活
- 复制集提供 99.999% 高可用
- 分片架构支持海量数据和无缝扩容

## 安装

1. 下载地址 [mongodb.com/download-center](https://mongodb.com/download-center/community)。企业版对开发环境免费，社区版所有环境都免费(正式版大版本号都是偶数，如 4.2.5)。TGZ 版本包含 server mongos tools 和 shell。

```
# centeos 下载
mkdir -p /data /data/db
cd /data
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.5.tgz
tar -xvf mongodb-linux-x86_64-rhel70-4.2.5.tgz
export PATH=$PATH:/data/mongodb-linux-x86_64-rhel70-4.2.5/bin
mongod --dbpath /data/db --port 27017 --logpath /data/db/mongod.log --fork
```

2. 导入数据

```
# 下载样本数据
# curl -O -k https://raw.githubusercontent.com/tapdata/geektime- mongodb-course/master/aggregation/dump.tar.gz
git clone git@github.com:geektime-geekbang/geektime-mongodb-course.git
cd geektime-mongodb-course/aggregation
tar -xvf dump.tar.gz
mongorestore -h localhost:27017

# 样本数据文件
ls dump/mock/
orders.bson  orders.metadata.json

# 查看导入的数据库
[root@banli]# mongo
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mock    0.047GB
> use mock
switched to db mock
> show collections
orders
> db.orders.findOne()
```

3. 使用 MongoDB compass 管理

## 基本操作

### insert 插入数据

操作格式

```
db.<集合>.insertOne(JSON对象)
db.<集合>.insertMany([<JSON 1>, <JSON 2>,...<JSON N>])
```

示例

```
> db.fruit.insertOne({name:'apple'})
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5e39776a9ac61025a8db27ab")
}
> db.fruit.insertMany([
...     {name:'apple'},
...     {name:'orange'},
... ])
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5e3977709ac61025a8db27ac"),
		ObjectId("5e3977709ac61025a8db27ad")
	]
}
```

使用 find 查询文档

- 关于 find

  - find 是 MongoDB 中查询数据的基本指令，相当于 SQL 中的 SELECT
  - find 返回的是游标

- find 示例

```
db.movies.find({'year', 1975}) // 单条件查询
db.movies.find({'year', 1975, 'title': 'Batman'}) // 多条件查询
db.movies.find({ $and: [{'title':'Batman', {'category': 'action'}}]}) // and 的另一种形式
db.movies.find({ $or: [{'year':1989, {'title': 'Batman'}}]}) // 多条件 or 查询
db.movies.find({'title':/^B/}) // 正则查询
```

SQL 和 MQL 对比

```
SQL                  MQL
a = 1              {a: 1}
a <> 1             {a: {$ne: 1}}
a > 1              {a: {$gt: 1}}
a >= 1             {a: {gte: 1}}
a < 1              {a: {$lt: 1}}
a <= 1             {a: {$lte: 1}}
a = 1 AND b = 1    {a: 1, b:1} 或 {$and: [{a: 1}, {b: 1}]}
a = 1 OR b = 1     {$or: [{a: 1}, {b: 1}]}
a IS NULL          {a: {$exists: false}}
a IN (1, 2, 3)     {a: {$in: [1, 2, 3]}}
```

```
$lt 存在并小于
$lte 存在并小于等于
$gt  存在并大于
$gte 存在并大于等于
$ne 不存在或存在但不等于
$in  存在并在指定数组中
$nin 不存在或不在指定数组中
$or  匹配两个或多个条件中的一个
$and 匹配全部条件
```

使用 find 搜索子文档。

- find 支持使用`field.sub_field`的形式查询子文档，假设有一个文档:

```
db.fruit.insertOne({
    name: 'apple',
    from: {
        country: 'China',
        province: 'Guangdon'
    }
})
```

考虑以下查询的意义

```
# 查询子文档, ok
db.fruit.find({'from.country': 'China'})
# 找一个表里 country: China
db.fruit.find({'from': {country': 'China'} })

# db.fruit.drop() 删除表
```

使用 find 搜索数组

- find 支持对数组中的元素进行搜索，假设有一个文档

```
db.fruit.insert([
    {'name': 'Apple', color: ['red', 'green']},
    {'name': 'Mango', color: ['yellow', 'green']},
])
```

考虑以下查询的意义

```
> db.fruit.find({color: 'red'})
{ "_id" : ObjectId("5e397c699ac61025a8db27ae"), "name" : "Apple", "color" : [ "red", "green" ] }

> db.fruit.find({$or: [{color:'red'}, {color:'yellow'} ]})
{ "_id" : ObjectId("5e397c699ac61025a8db27ae"), "name" : "Apple", "color" : [ "red", "green" ] }
{ "_id" : ObjectId("5e397c699ac61025a8db27af"), "name" : "Mango", "color" : [ "yellow", "green" ] }
```

使用 find 搜索数组中的对象

考虑以下文档，在其中搜索

```
db.movies.insertOne({
    "title" : "Raiders of the Lost Ark",
    "filming_locations" : [
        { "city" : "Los Angeles", "state" : "CA", "country" :"USA" },
        { "city" : "Rome", "state" : "Lazio", "country" : "Italy" },
        { "city" : "Florence", "state" : "SC", "country" : "USA" }]
})
```

```
# 查找城市是 Rome 的记录
db.movies.find({"filming_locations.city": "Rome"})
```

在数组中搜索子对象的多个字段时，如果使用 `$elemMatch`，它表示必须是同一个 子对象满足多个条件。考虑以下两个查询:

```
db.getCollection('movies').find({
        "filming_locations.city": "Rome",
        "filming_locations.country": "USA"
})

db.getCollection('movies').find({
    "filming_locations": {
        $elemMatch:{"city":"Rome", "country": "USA"}
    }
})
```

控制 find 返回的字段

- find 可以指定只返回指定的字段;
- `_id` 字段必须明确指明不返回，否则默认返回;
- 在 MongoDB 中我们称这为投影(projection);
- `db.movies.find({"category": "action"},{"_id":0, title:1})` 表示不返回`_id`,只返回 title

### 使用 remove 删除文档

remove 命令需要配合查询条件使用;

- 匹配查询条件的的文档会被删除;
- 指定一个空文档条件会删除所有文档;
- 以下示例:

```
db.testcol.remove( { a : 1 } ) // 删除 a 等于 1 的记录
db.testcol.remove( { a : { \$lt : 5 } } ) // 删除 a 小于 5 的记录 db.testcol.remove( { } ) // 删除所有记录
db.testcol.remove() //报错，没有传参数
```

### 使用 update 更新文档

Update 操作执行格式: `db.<集合>.update(<查询条件>, <更新字段>)`

以以下数据为例:

```
db.fruit.insertMany([ {name: "apple"}, {name: "pear"}, {name: "orange"}])

# 将苹果的产地设置为 China
db.fruit.updateOne({name: "apple"}, {$set: {from: "China"}})
```

- 使用 updateOne 表示无论条件匹配多少条记录，始终只更新第一条;
- 使用 updateMany 表示条件匹配多少条就更新多少条;
- updateOne/updateMany 方法要求更新条件部分必须具有以下之一，否则将报错:
  - `$set/$unset`
  - `$push/$pushAll/$pop`
  - `$pull/$pullAll`
  - `$addToSet`

```
//报错
db.fruit.updateOne({name: "apple"}, {from: "China"})
```

- `$push`: 增加一个对象到数组底部
- `$pushAll`: 增加多个对象到数组底部
- `$pop`: 从数组底部删除一个对象
- `$pull`: 如果匹配指定的值，从数组中删除相应的对象
- `$pullAll`: 如果匹配任意的值，从数据中删除相应的对象
- `$addToSet`: 如果不存在则增加一个值到数组

### 使用 drop 删除集合

使用 `db.<集合>.drop()` 来删除一个集合

- 集合中的全部文档都会被删除
- 集合相关的索引也会被删除

```
db.colToBeDropped.drop()
```

### 使用 dropDatabase 删除数据库

使用 db.dropDatabase() 来删除数据库

- 数据库相应文件也会被删除，磁盘空间将被释放

```
use tempDB
db.dropDatabase()
show collections // No collections
show dbs // The db is gone
```

## python 操作 MongoDB

1. 安装驱动程序 pymongo

```sh
# 安装
sudo pip install pymongo

# 检查驱动程序，进入 python 交互模式下导入 pymongo
python
import pymongo
pymongo.version
```

2. 创建连接

```py
from pymongo import MongoClient

# 1. 确定 MongoDB 连接串
# https://docs.mongodb.com/manual/reference/connection-string/
uri = "mongodb://127.0.0.0:27017"
client = new MongoClient(uri)
print client;
```

3. 数据库操作: 插入用户

```py
# 初始化数据库和集合，不存在的数据库或集合不需要预先创建
db = client['eshop']
user_coll = db['user']

new_user = {'username': 'banli17', 'password': 'xxx', 'email': '867889876@qq.com'}
result = user_coll.insert_one(new_user)
print result
```

4. 更新用户

```py
# 增加 phone 字段
# 注意：并没有去数据库修改表结构
result = user_coll.update_one( {'username': 'nima'},
    {$set: {phone: '13213211321'}}
)
print result;
```

**总结**

- 使用 MongoDB 驱动程序操作 MongoDB 的 API 简单易行。
- 尽管大家使用的编程语言可能各不相同，但 MongoDB 驱动的设计是依照统一的规 范制定，无论使用哪种语言，其原理和 API 方法都非常相似。因此只要掌握一种语 言的驱动，切换到其他语言将十分容易。

## 聚合查询

什么是 MongoDB 聚合框架

MongoDB 聚合框架(Aggregation Framework) 是一个计算框架，它可以：

- 作用在一个或几个集合上
- 对集合中的数据进行一系列运算
- 将这些数据转化为期望的形式

从效果而言，聚合框架相当于 SQL 查询中的：

- GROUP BY
- LEFT OUTER JOIN
- AS 等

管道(Pineline) 和步骤(Stage)

整个聚合运算过程称为管道（Pipeline)，它由多个步骤(Stage) 组成，每个管道：

- 接收一系列文档（原始数据）
- 每个步骤对这些文档进行一系列运算
- 结果文档输出给下一个步骤

聚合运算的基本格式

```
pipeline = [$stage1, $stage2, ...$stageN];
db.<集合>.aggregate(
    pipeline,
    { option }
)
```

常见步骤

```
步骤                   作用            SQL 等价运算符
$match                过滤              WHERE
$project              投影               AS
$sort                 排序             ORDER BY
$group                分组             GROUP BY
$skip/$limit          结果限制          SKIP/LIMIT
$lookup               左外连接          LEFT OUTER JOIN
$unwind               展开数组          N/A
$graphLookup          图搜索            N/A
$facet/$bucket        分面搜索          N/A
```

常见步骤中的运算符

![](./imgs/2020-03-28-16-52-48.png)

聚合运算的使用场景

![](./imgs/2020-03-28-16-54-32.png)

MQL 常见步骤与 SQL 对比：

```sql
######### 例子：1 #########
# SQL
SELECT
FIRST_NAME AS '名'
LAST_NAME AS '姓'
FROM Users
WHERE GENDER = '男'
SKIP 100
LIMIT 20

# MQL
db.users.aggregate([
    {$match: {gender: '男'}},
    {$skip: 100},
    {$limit: 20},
    {$project: {     # 只返回 名、姓 字段
        '名': '$first_name',
        '姓': '$last_name'
    }}
])

######### 例子：2 #########
# 部门女人数小于10
# SQL
SELECT DEPARTMENT
    COUNT(NULL) AS EMP_QTY
FROM Users
WHERE GENDER = '女'
GROUP BY DEPARTMENT HAVING
COUNT(*) < 10

# MQL
db.users.aggregate([
    {$match: {gender: '女'}},
    {$group: {
        _id: '$DEPARTMENT', # 按 DEPARTMENT(部门) 分组
        emp_qty: {$sum: 1}  # 没看到一条就 + 1
    }},
    {$match: {emp_qty: {$lt: 10}}}
])

######### 例子：3 #########
> db.students.find()
{
    name: 'zs',
    score: [
        {subject:'语文', score: 80}
        {subject:'数学', score: 80}
        {subject:'英语', score: 80}
    ]
}

# 展开操作
> db.students.aggregate([{$unwind: '$score'}])
{name: 'zs', {subject:'语文', score: 80}}
{name: 'zs', {subject:'数学', score: 80}}
{name: 'zs', {subject:'英语', score: 80}}

######### 例子：4 #########
# $bucket 桶
# price [0, 10)   [10, 20) [20,30) [30, 40) [40,+无穷) 分别有多少条订单
db.products.aggregate([
    $bucket: {
        groupBy: '$price',
        boundaries: [0, 10, 20, 30, 40],
        default: 'Other',
        output: {'count': {$sum: 1}}
    }
])

######### 例子：5 #########
# $facet 多个纬度分桶
# 按 price、year 进行分桶
db.products.aggregate([{
    $facet: {
        price: {
            $bucket:{...}
        },
        year: {
            $bucket: {...}
        }
    }
}])
```

create
read
update
delete
crud

文档主键`_id`

- 文档主键的唯一性
- 支持所有数据类型(数组除外)

对象主键 ObjectId

- 默认的文档主键
- 可以快速生成 12 字节 id
- 包含创建时间
  - 同一时间生成的对象，无法精确区分
  - 是根据服务器时间来的，如果每个服务器时间不同，会造成顺序不匹配

创建文档

- db.collection.insert()
- db.collection.save() 创建单一文档
- 创建多个文档

```
use test

show collections

# 会自动创建相应的集合
db.collection.insertOne(
    <document>,
    writeConcern: <document>
)

# writeConcern 本次文档创建操作的安全写级别，安全写级别用来判断一次数据库写入操作是否成功
# 安全写级别越高，丢失数据风险越低，但是写入操作延迟越高
# 不提供则使用默认安全写级别

# 将文档写入 accounts 集合
# insertOne 会自动创建相应的集合 accounts
db.accounts.insertOne(
    {
        _id: 'account1',
        name: 'alice',
        balance: 100
    }
)
{"acknowledged": true, "insertedId": "account1"}
acknowledged true 表示安全写级别被启用
insertedId 显示了被写入的文档的 _id

# 插入重复的文档，文档主键必须唯一，否则报错
try{
   db.accounts.insertOne(
        {
            _id: 'account1',
            name: 'alice',
            balance: 100
        }
    )
}catch(e){
    print(e)
}

# 不传入 _id，mongodb 会自动创建主键
> db.accounts.insertOne({name:'a',balance:200})
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5d9778b2323016e2838c6788") // 是个对象，具有唯一性
}
```

创建多个文档 db.collection.insertMany()

```
db.<collection>.insertMany(
    [<document1>,<document2>,...],
    {
        writeConcern: <document>,
        ordered: <boolean>
    }
)
# ordered 决定 mongoDB 是否按顺序来写入这些文档，不提供将会自动优化写入操作，默认为 true
# {ordered:true} 如果写入发生错误，后面的文档则会都失败
# {ordered:false} 报错后，后面的仍然会写入成功
```

创建单个或多个文档

db.collections.insert()

```
> db.accounts.insert({ name: 'george', balance: 1000 })
WriteResult({ "nInserted" : 1 })
> db.accounts.insert({  _id: 'account1',   name: 'george',     balance: 1000 })
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "E11000 duplicate key error collection: test.accounts index: _id_ dup key: { _id: \"account1\" }"
	}
})

# 写入多个，发生错误，也会阻止后面的执行
```

- insertOne() 和 insertMany() 不支持 db.collection.explain()
- insert() 支持 db.collection.explain()

db.collection.save() 和 insertOne() 类型，会调用 insert() 命令，所以返回结果和 insert() 一样。

默认的对象主键 ObjectId

```
> ObjectId()
ObjectId("5d977c8d323016e2838c678c")
> ObjectId("5d977c8d323016e2838c678c")
ObjectId("5d977c8d323016e2838c678c")
> ObjectId("5d977c8d323016e2838c678c").getTimestamp() # 创建的时间
ISODate("2019-10-04T17:08:29Z")
```

复合主键
复合主键的字段顺序和类型不同，都可以插入成功。如果相同，则会报重复错误。

```
> db.accounts.insert({_id:{a:1,b:2},name:'zs',balance:12} )
WriteResult({ "nInserted" : 1 })
> db.accounts.insert({_id:{a:1,b:2},name:'zs',balance:12} )
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "E11000 duplicate key error collection: test.accounts index: _id_ dup key: { _id: { a: 1.0, b: 2.0 } }"
	}
})
> db.accounts.insert({_id:{a: 1,b: '2'},name:'zs',balance:12} )
WriteResult({ "nInserted" : 1 })
> db.accounts.insert({_id:{b:2,a:1},name:'zs',balance:12} )
WriteResult({ "nInserted" : 1 })
```

### 读取文档

- db.collection.find()
- 匹配查询
- 查询操作符

返回游标
投射：只返回部分字段，内嵌文档、数组都可以投射

```
db.collection.find()
# projection 定义了对结果的投影
db.<collection>.find(<query>, <projection>)
```

```
> db.accounts.find()
{ "_id" : "account1", "name" : "alice", "balance" : 100 }
{ "_id" : ObjectId("5d9778b2323016e2838c6788"), "name" : "a", "balance" : 200 }
{ "_id" : ObjectId("5d977b08323016e2838c6789"), "name" : "george", "balance" : 1000 }
{ "_id" : ObjectId("5d977b2d323016e2838c678a"), "name" : "george", "balance" : 1000 }
{ "_id" : { "a" : 1, "b" : 2 }, "name" : "zs", "balance" : 12 }
{ "_id" : { "a" : 1, "b" : "2" }, "name" : "zs", "balance" : 12 }
{ "_id" : { "b" : 2, "a" : 1 }, "name" : "zs", "balance" : 12 }
> db.accounts.find().pretty()
{ "_id" : "account1", "name" : "alice", "balance" : 100 }
{
	"_id" : ObjectId("5d9778b2323016e2838c6788"),
	"name" : "a",
	"balance" : 200
}
{
	"_id" : ObjectId("5d977b08323016e2838c6789"),
	"name" : "george",
	"balance" : 1000
}
{
	"_id" : ObjectId("5d977b2d323016e2838c678a"),
	"name" : "george",
	"balance" : 1000
}
{ "_id" : { "a" : 1, "b" : 2 }, "name" : "zs", "balance" : 12 }
{ "_id" : { "a" : 1, "b" : "2" }, "name" : "zs", "balance" : 12 }
{ "_id" : { "b" : 2, "a" : 1 }, "name" : "zs", "balance" : 12 }
# 筛选文档
> db.accounts.find({name:'zs',balance:12})
{ "_id" : { "a" : 1, "b" : 2 }, "name" : "zs", "balance" : 12 }
{ "_id" : { "a" : 1, "b" : "2" }, "name" : "zs", "balance" : 12 }
{ "_id" : { "b" : 2, "a" : 1 }, "name" : "zs", "balance" : 12 }
> db.accounts.find({name:'zs',balance:12})
> db.accounts.find({'_id.b':'2'})
{ "_id" : { "a" : 1, "b" : "2" }, "name" : "zs", "balance" : 12 }
```

比较操作符

```
{<field>: { $<operator>: <value>}}

$eq
$ne : 不等于(not equal)
$gt : 大于
$gte
$lt
$lte
$in : 匹配字段值与任一查询值相等的文档
$nin : not in
```

```
> db.accounts.find({name: {$eq: 'zs'}})
{ "_id" : { "a" : 1, "b" : 2 }, "name" : "zs", "balance" : 12 }
{ "_id" : { "a" : 1, "b" : "2" }, "name" : "zs", "balance" : 12 }
{ "_id" : { "b" : 2, "a" : 1 }, "name" : "zs", "balance" : 12 }
```

```
{ field: ${in: [<value1>, <value2> ... <valueN>]}}
```

```
> db.accounts.find({ name: {$in: ['alice','a']}})
{ "_id" : "account1", "name" : "alice", "balance" : 100 }
{ "_id" : ObjectId("5d9778b2323016e2838c6788"), "name" : "a", "balance" : 200 }
```

逻辑操作符

- `$not`: 匹配筛选条件不成立的文档
- `$and`: 匹配多个筛选条件全部成立的文档
- `$or`: 匹配至少一个筛选条件成立的文档
- `$nor`: 匹配多个筛选条件全部不成立的文档

```
# 省略 $and
db.accounts.find({balance: {$lt: 1000, $gt: 100}})

db.accounts.find({
    $or: [
        {name: {$eq: 'alice'}},
        {name: {$eq: 'charlie'}},
    ]
})
# 如果 $or 里都是 $eq，则可以使用 $in 简化
db.accounts.find({
    $name: {
        $in: ['alice','charlie']
    }
})

# 读取不属于 alice 和 charlie 且余额不小于100的银行账户文档
db.accounts.find({
    $nor: [
        {name: 'alice'},
        {name: 'charlie'},
        {balance: {$lt: 100}}
    ]
})
```

字段操作符

- `$exists`:
- `$type`: 指定字段类型

```
{field: {$exists: <boolean>}}
# 读取包含 _id.type 字段的文档
db.accounts.find({'_id.type': {$ne:'typing', $exists: true}})

db.accounts.find({'balance': {$type:'string'})
db.accounts.find({'balance': {$type:'null'})
db.accounts.find({'balance': {$type:'2'}) # BJSON 2 表示 string，旧版本只支持这种
```

数组操作符

- `$all`: 都包含才返回

```
db.accounts.find({contact: {$all: ['china', 'beijing']}})
db.accounts.find({contact: {$all: [['china', 'beijing']]}})
```

## 聚合实验

### 总销量

计算所有订单的总销售额。

```
// _id 表示以哪个字段进行分组，null 表示不分组，所有数据作为一个组
// total 是新创建字段， $sum 表示把 total 字段全部加起来
// $total 表示变量
db.orders.aggregate([
    {
        $group: {
            _id: null,
            total: { $sum: "$total" }
        }
    }
])
// result
{ "_id" : null, "total" : NumberDecimal("44019609") }
```

### 订单金额汇总

查询 2019 年第一季度（1.1 - 3.31） 已完成订单 (completed) 的订单总金额和订单总数。

```
db.orders.aggregate([
    // 1. 匹配条件
    {
        $match: {
            status: "completed",
            orderDate: {
                $gte: ISODate("2019-01-01"),
                $lt: ISODate("2019-04-01")
            }
        }
    },
    // 2. 聚合订单总金额、总运费、总数量
    {
        $group: {
            _id: null,
            total: { $sum: "$total" },
            shippingFee: { $sum: "$shippingFee" },
            count: { $sum: 1 }
        }
    },
    // 过滤返回的字段，只返回 count/grandTotal 字段
    {
        $project: {
            grandTotal: {$add: ["$total", "$shippingFee"]},
            count: 1,
            _id: 0
        }
    }
])
// result
{ "count" : 5875, "grandTotal" : NumberDecimal("2636376.00") }
```

## 复制集

复制集的作用

- MongoDB 复制集的主要意义在于实现服务器高可用（99.999%在线可用）
- 它的实现依赖于两个方面的功能
  - 数据写入时将数据迅速复制到另一个独立节点上
  - 在接受写入的节点发生故障时自动选举出一个新的替代节点
- 在实现高可用的同时，复制集实现了其它几个附加作用
  - 数据分发: 将数据从一个区域复制到另一个区域，减少另一个区域的读延迟(类似 cdn)
  - 读写分离: 不同类型的压力(操作)分别在不同节点上执行
  - 异地容灾：在数据中心故障时快速切换到异地

典型的复制集结构

- 一个典型的复制集由 3 个以上具有投票的节点组成，包括：
  - 一个主节点(primary): 接受写入操作和选举时投票
  - 两个(或多个)从节点(secondary)：复制主节点上的新数据和选举时投票
  - 不推荐使用 Arbiter(投票节点): 以前投票节点是没有数据，专门用来投票的节点，因为投票要多数大于少数

数据是如何复制的？

- 当一个修改操作(插入、更新、删除)，到达主节点时，它对数据的操作将被记录下来(经过一些必要的转换)，这些记录称为 oplog。
- 从节点通过在主节点上打开一个 tailable 游标不断获取新进入主节点的 oplog，并在自己的数据上回放，以此保持跟主节点的数据一致。

```
writes     oplog
主节点  -------------> 从节点
```

通过选举完成故障恢复

- 具有投票权的节点之间两两相互发送心跳。
- 当 5 次心跳未收到时判断为节点失联。
- 如果失联的是主节点，从节点会发起选举，选出新的主节点。
- 如果失联的是从节点则不会产生新的选举。
- 选举基于 RAFT 一致性算法实现，选举成功的必要条件是大多数投票节点存活。
- 复制集中最多可以有 50 个节点，但是具有投票权的节点最多 7 个。

影响选举的因素

- 整个集群必须有大多数节点(大于 1/2)存活；如 5 个必须有 3 个，7 个必须有 4 个。
- 被选举为主节点的节点必须：
  - 能够与多数节点建立连接。
  - 具有较新的 oplog。
  - 具有较高的优先级(如果有配置)

复制集常见选项

- 是否具有投票权(v 参数)，有则参与投票。
- 优先级(priority 参数)，优先级越高的节点越优先成为主节点，优先级为 0 的节点无法成为主节点。
- 隐藏(hidden 参数)，复制数据，但对应用不可见(相当于线上不能访问)，隐藏节点可以具有投票权，但优先级必须是 0。
- 延迟(slaveDelay 参数)，复制 n 秒之前的数据，保持与主节点的时间差。（防止删除操作后，所有节点都同步了导致无法恢复）。

复制集注意事项

- 关于硬件
  - 因为正常的复制集节点都可能成为主节点，它们的地位是一样的，因此硬件配置上必须一致。
  - 为了保证节点不会同时宕机，各节点使用的硬件必须具有独立性。
- 关于软件
  - 复制集各节点软件版本必须一致，以避免出现不可预知的问题。
- 增加节点不会增加系统的写性能！可以扩展读。

## 实验：搭建复制集

目标： 在一个机器上运行 3 个实例来搭建一个最简单的复制集，通过实验，学会：

- 如何启动一个 MongoDB 实例
- 如何将 3 个 MongoDB 实例搭建成一个复制集
- 如何对复制集运行参数做一些常规调整

1. 准备： 安装最新的 MongoDB，配置 PATH 变量，10g 空间
2. 创建数据目录
   MongoDB 启动时将使用一个数据目录存放所有数据文件，我们将为 3 个复制集节点创建各自的数据目录

```
mkdir -p /data/db{1,2,3}
```

3. 准备配置文件

复制集的每个 mongod 进程应该位于不同的服务器，我们现在在机器上运行 3 个进程，因此要为它们各自配置：

- 不同的端口，28017/28018/28019
- 不同的数据目录 `/data/db1`、`/data/db2`、`/data/db3`
- 不同的日志文件路径 `/data/db{1,2,3}/mongod.log`

![](./imgs/2020-04-07-01-00-53.png)

bindIp: 0.0.0.0 会在所有的网卡上监听，否则只会监听 127.0.0.1，这样在别的机器上就不能访问 Mongodb。

replSetName 复制集名称

```
// 启动
mongod -f db1/mongd.conf
mongod -f db2/mongd.conf
mongod -f db3/mongd.conf
```

```
查看 mongod 进程
ps -ef | grep mongod
```

5. 配置复制集

![](./imgs/2020-04-07-01-06-08.png)

```
看主机名是否能被解析
[root@banli ~]# hostname -f
banli.linux
```

## MongoDB 全家桶

| 软件模块                  | 描述                                            |
| ------------------------- | ----------------------------------------------- |
| mongod                    | Mongodb 数据库软件                              |
| mongo                     | Mongodb 命令行工具，管理 MongoDB 数据库 1       |
| mongos                    | MongoDB 路由进程，分片环境下使用                |
| mongodump / mongorestore  | 命令行数据库备份与恢复工具                      |
| mongoexport / mongoimport | csv/json 导入与导出，主要用于不同系统间数据迁移 |
| compass                   | MongoDB GUI 管理工具                            |
| Ops Manager(企业版)       | MongoDB 集群管理软件                            |
| BI Connector(企业版)      | SQL 解释器/BI 套接件                            |
| MongoDB Charts(企业版)    | MongoDB 可视化软件                              |
| Atlas(付费及免费)         | MongoDB 云托管服务，包括永久免费云数据库        |

### Mongodump / mongorestore

- 类似于 MySQL 的 dump/restore 工具
- 可以完成全库 dump: 不加条件
- 也可以根据条件 dump 部分数据： -q 参数
- dump 的同时根据数据变更：--oplog
- restore 是反操作，把 mongodump 的输出导入到 mongodb

```
mongodump -h 127.0.0.1:27017 -d test -c test
mongorestore -h 127.0.0.1:27017 -d test -c test xxx.bson
```

![](./imgs/2020-04-08-14-15-21.png)

MongoDB BI Connector

- 将 SQL 转换为 MQL
- 将 mongoDB 的 JSON 转换为 MySQL 的 ResultSet
- 不支持写操作，因为不想用 SQL 来取代 MQL
  ![](./imgs/2020-04-08-14-18-38.png)

MongoDB Ops Manager - 集群管理平台

- 自动化管理：补丁、升级、在线扩容
- 监控及报警
- 持续备份及任意时间点恢复
- Kubernetes 集成

MongoDB Charts

- 拖拽创建 MongoDB 图表
- 创建、分享和嵌入 MongoDB 数据可视化的最快、最便捷方式
- 专门为 MongoDB 文档模型设计
- 一行代码在网页中嵌入图表(iframe)
