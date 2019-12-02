# mongodb

## 是什么

mongodb 存储的是文档。

## 基本操作

create
read
update
delete
crud

文档主键`_id`

-   文档主键的唯一性
-   支持所有数据类型(数组除外)

对象主键 ObjectId

-   默认的文档主键
-   可以快速生成 12 字节 id
-   包含创建时间
    -   同一时间生成的对象，无法精确区分
    -   是根据服务器时间来的，如果每个服务器时间不同，会造成顺序不匹配

创建文档

-   db.collection.insert()
-   db.collection.save() 创建单一文档
-   创建多个文档

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

-   insertOne() 和 insertMany() 不支持 db.collection.explain()
-   insert() 支持 db.collection.explain()

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

-   db.collection.find()
-   匹配查询
-   查询操作符

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

-   `$not`: 匹配筛选条件不成立的文档
-   `$and`: 匹配多个筛选条件全部成立的文档
-   `$or`: 匹配至少一个筛选条件成立的文档
-   `$nor`: 匹配多个筛选条件全部不成立的文档

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

-   `$exists`:
-   `$type`: 指定字段类型

```
{field: {$exists: <boolean>}}
# 读取包含 _id.type 字段的文档
db.accounts.find({'_id.type': {$ne:'typing', $exists: true}})

db.accounts.find({'balance': {$type:'string'})
db.accounts.find({'balance': {$type:'null'})
db.accounts.find({'balance': {$type:'2'}) # BJSON 2 表示 string，旧版本只支持这种
```

数组操作符

-   `$all`: 都包含才返回

```
db.accounts.find({contact: {$all: ['china', 'beijing']}})
db.accounts.find({contact: {$all: [['china', 'beijing']]}})
```
