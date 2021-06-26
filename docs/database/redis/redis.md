---
title: redis
---

`redis`是一个`key-value`内存型数据库，性能高，同时因为内存比较贵，通常来存储不大的数据。

## 特点

- 高性能，存储在内存中
- 可配置持久化

## redis 存储 session

`session`因为需要经常访问，而且不能经常丢失(因为存在内存中，服务端发新版本重启服务会丢失)，所以最好使用 redis 新开一个进程来存储。

## 命令行使用

1. 使用`brew`安装`redis`，启动`redis`服务。

```bash
redis-server
```

2. 启动客户端

```
redis-cli

redis-cli -h 127.0.0.1 -p 6379
```

3. 常用命令

```bash
# 查看所有key
keys *

# 获取某个key的值
get <key_name>

# 设置某个key的值
set <key_name> <key_value>

# 清除某个key
del <key_name>

# 清空当前库中的所有key
flushdb

# 清除redis服务器数据
flushall
```
