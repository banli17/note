# MongoDB CRUD操作

> 集合相当于是表，文档相当于是数据

crud操作是创建、读、更新和删除文档。

## 创建

创建和插入操作能在集合里新增一个文档。如果集合不存在，插入操作将会创建集合。

mongodb提供了方法在集合中插入文档。

- db.collection.insertOne()
- db.collection.insertMany()

## 查询

- db.collection.find()

还可以增加查询过滤器。

```
db.users.find(
    {age:12},   // 查询条件
    {name:1}    // 预测
).limit(5)
```

## 更新

- db.collection.updateOne()
- db.collection.updateMany()
- db.collection.replaceOne()

```
db.users.updateMany(
    {age: {$lt:18}},          // 更新过滤
    {$set:{status:'reject'}}  // 更新操作
)
```

## 删除

- db.collection.deleteOne()
- db.collection.deleteMany()

```
db.users.deleteMany(
    { status: 'reject'}  // 删除过滤器
)
```