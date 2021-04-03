---
title: MongoDB 分片集群与运维
---

## 备份和恢复

备份的目的：

- 防止硬件故障引起的数据丢失
- 防止人为错误
- 时间回溯
- 监管要求

MongoDB 的备份

MongoDB 的备份机制分为：

- 延迟节点备份
- 全量备份 + Oplog 增量

最常见的全量备份方式包括：

- mongodump
- 复制数据文件
- 文件系统快照

延迟节点备份

```
mongodump --host localhost:27017 --oplog -u banli -o ~/dump/
```

- `-o`: 是指定备份存放在哪里，如果不指定，默认为当前所在目录
- `--oplog` 表示备份时，将增量的数据也备份，如果没有新增数据，会提示错误：

```
error getting recent oplog entry: mongo: no documents in resu
```

恢复: 进入到 dump 的父级目录中，执行：

```
cd ~
mongorestore --host localhost:27017 --oplogReplay
```

- `--oplogReplay` 如果有增量数据，会恢复回去

Unhandled promise rejection: Error: URL malformed, cannot be parsed

```
mongoose.connect(MONGO_URL, {
  auth: {
    user: MONGO_DB_USER,
    password: MONGO_DB_PASSWORD
  },
  { useNewUrlParser: true }
})
```

mongodb 定时备份：https://zhuanlan.zhihu.com/p/37411939

## 导入样本

```sh
curl -O -k x.com/x.gz
tar -xvf dump.tar.gz

cd 到 dump 上一层
mongorestore

启动 mongodb
$ mongo
> show dbs
admin   0.000GB
config  0.000GB
eshop   0.000GB
geek    0.000GB
local   0.000GB
mock    0.047GB
test    0.000GB
> use mock
switched to db mock
> show collections
orders
> db.orders.findOne()
```

## 备份

```
>mongodump -h dbhost -d dbname -o dbdirectory
mongodump --host HOST_NAME --port PORT_NUMBER
mongodump --dbpath DB_PATH --out BACKUP_DIRECTORY
mongodump --collection COLLECTION --db DB_NAME
```

## 恢复

```
mongorestore -h 127.0.0.1:27017 -u root -d test d:\dump\test
```
