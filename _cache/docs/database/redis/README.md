# Redis

## 简介

## 安装

1.  安装

```sh
brew install redis
brew services start redis
redis-server /usr/local/etc/redis.conf

# 配置
CONFIG GET CONFIG_SETTING_NAME
CONFIG GET port
CONFIG GET * # 获取所有配置
```

redis配置： https://www.runoob.com/redis/redis-conf.html

2.  开启服务，默认是 6379 端口。

````
~]$ redis-server
45478:C 24 Mar 2021 14:05:27.220 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
45478:C 24 Mar 2021 14:05:27.220 # Redis version=5.0.4, bits=64, commit=00000000, modified=0, pid=45478, just started
45478:C 24 Mar 2021 14:05:27.220 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
45478:M 24 Mar 2021 14:05:27.222 * Increased maximum number of open files to 10032 (it was originally set to 4864).
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 5.0.4 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 45478
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

45478:M 24 Mar 2021 14:05:27.226 # Server initialized
45478:M 24 Mar 2021 14:05:27.227 * Ready to accept connections
````

3.  使用客户端连接，默认会连接`127.0.0.1:6379`

```bash
~]$ redis-cli
127.0.0.1:6379>
```

## 数据结构

### 字符串 String

```
# 设置和获取值
SET name 张三
GET name

# 获取字串
GETRANGE key start end
getrange name 1 2  # "\xbc\xa0" 三?

# 递增递减
INCR age     # 加1
INCRBY age 6 # 加6
DESC age     # 减1
DESCBY age 6 # 减6

# 键
DEL key     # 删除 key
EXISTS key  # 判断 key 是否存在
EXIST key seconds # 设置过期时间
TTL key     # 查看key剩余生存时间，单位秒
TYPE key    # 返回 key 所存值的类型
```

### 哈希值 Map

```
# 设置
HSET person name zhangsan
HSET person name zhangsan age 10

# 获取
HGET user name 获取单个值
HMGET user name age 获取多个值
HGETALL user 获取多有值
HKEYS user 获取所有的 key

# 删除键
HDEL key field
HDEL user name
HGETALL user
```

### 列表 List

```sh
# 添加 LPUSH左边添加， RPUSH右边添加
LPUSH ids 2
LPUSH ids 1
RPUSH ids 3
RPUSH ids 4
RPUSH ids  5 6

# 查看元素
LRANGE ids 0 2
LRANGE ids 0 -1 # 获取所有
LINDEX ids 0 # 通过索引获取元素

# LPOP RPOP 弹出元素
LPOP ids
RPOP ids

# 获取列表长度
LLEN ids

# 移除列表元素 LREM key count value
# count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。
# count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。
# count = 0 : 移除表中所有与 VALUE 相等的值。
LREM ids count value
127.0.0.1:6379> lpush my 1
127.0.0.1:6379> lpush my 2
127.0.0.1:6379> lpush my 2
127.0.0.1:6379> lpush my 2
127.0.0.1:6379> lpush my 3
127.0.0.1:6379> lrange my 0 -1
1) "3"
2) "2"
3) "2"
4) "2"
5) "1"
127.0.0.1:6379> LREM my 2 2
(integer) 2
127.0.0.1:6379> lrange my 0 -1
1) "3"
2) "2"
3) "1"
```

### 集合 Set

```sh
# 添加，无法添加重复的元素
SADD tags 1
SADD tags 2
SADD tags 2  # 失败，返回0
SADD tags 3
SADD tags  4 5 6
SMEMBERS tags

# 查看
SMEMBERS tags

# 获取集合元素个数
SCARD tags

# 删除元素
SREM tags member
SREM tags 4
SMEMBERS tags

# 集合运算
SADD A 1 2 3
SADD B 2 3 4
SINTER A B 交集
SDIFF A B 差集
SUNION A B 并集
```

### 有序集合 SortSet

```sh
# 添加
ZADD key score1 member1 [score2 member2]

ZADD levels 1 one
ZADD levels 2 two

# 获取成员个数
ZCARD key
ZCARD levels

# 查看集合
ZRANGE levels  0 -1 按范围查看
ZRANGE levels  0 2 WITHSCORES 按范围查看，并显示分数

# 删除
ZREM key member [member ...]
ZADD levels 1 one
ZADD levels 2 two
ZREM levels one
ZRANGE levels  0 -1
```

## 在 nodejs 中使用

```js
const redis = require("redis");
let client = redis.createClient(6379, "127.0.0.1");
client.on("error", function(error) {
  console.error(error);
});
//1. 字符串类型
client.set("name", "zfpx", redis.print);
client.get("name", redis.print);
//2. 集合
client.hset("user", "name", "zfpx", redis.print);
client.hset("user", "age", "8", redis.print);
client.hget("user", "age", redis.print);
client.hkeys("user", function(err, replies) {
  replies.forEach(function(item, index, items) {
    client.hget("user", item, redis.print);
  });
});
```

## Redis 发布订阅

redis 客户端可以订阅频道，也可以向频道发送消息。

测试：开启 2 个客户端

```
SUBSCRIBE chat   # 客户端1订阅消息
PUBLISH chat hello # 客户端2发送消息
```

![](imgs/2021-03-24-16-36-53.png)

```js
let client1 = redis.createClient(6379, "127.0.0.1");
let client2 = redis.createClient(6379, "127.0.0.1");
let count = 0;
client1.subscribe("food");
client1.subscribe("drink");
client1.on("message", function(channel, message) {
  console.log(channel, message);
  client1.unsubscribe("food");
});

client2.publish("food", "面包");
client2.publish("drink", "桔汁");
setTimeout(() => {
  client2.publish("food", "面包2");
  client2.publish("drink", "桔汁2");
}, 2000);
```

## 备份与还原

### 备份

SAVE 命令会同步在 redis 目录创建 dump.rdb 文件。

```
127.0.0.1:6379> save
OK
```

要查看 redis dump.rdb 的备份目录，可以通过 `config get dir`命令。

```sh
127.0.0.1:6379> config get dir
1) "dir"
2) "/var/lib/redis"
```

BGSAVE 命令是创建 redis 备份的备用命令，它会在后台执行。

### 还原

还原 redis 数据只需要将 dump.rdb 放在 redis 目录并重启服务。

## 事务

事务是指一个完整的动作，要么全部执行，要么什么也没有做。

redis 事务不是严格意义的事务，它只是批量操作。前任务执行失败不会影响后续的执行。

- MULTI 组装事务
- EXEC 执行事务
- DISCARD 取消事务
- WATCH 监听 key，一旦 key 在事务执行前改变，则取消事务的执行，会返回 nil。

```
127.0.0.1:6379> get age
"12"
# watch 后修改了 age，所以事务会被取消（取消后watch也会消失）
127.0.0.1:6379> watch age
OK
127.0.0.1:6379> set age 13
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set age 14
QUEUED
127.0.0.1:6379> exec
(nil)  // 事务无法被执行
# 继续执行事务，就成功了，上一次watch已经失效了
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set age 14
QUEUED
127.0.0.1:6379> exec
1) OK
```

## 安全

如何给 redis 加密码？

1.  `config get requirepass` 来查看是否密码
2.  `config set requirepass` 来设置密码
3.  通过`AUTH password` 来获取权限

```sh
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) ""
127.0.0.1:6379> config set requirepass aa123456
OK
127.0.0.1:6379> config get requirepass
(error) NOAUTH Authentication required.
127.0.0.1:6379> AUTH aa123456
OK
```

## redis 持久化

redis 提供了 2 种持久化方式：

- RDB(redis database): 将 redis 数据生成快照存储到磁盘上。过程是将数据写到临时文件，持久化结束后用临时文件替换上次持久化好的文件(会单独创建 fork 子进程来执行)。
  - 适合大规模数据恢复，对完整性要求不高
- AOF(append only file 只允许追加文件): 将 redis 执行的写指令记录下来，下次 redis 重启时，执行一遍，就可以实现数据恢复了。
  - 通过配置 redis.conf 种的 appendonly yes 来开启 AOF
  - 默认 AOF 策略是每秒 fsync 一次(将缓存中的写指令记录到磁盘)
  - 如果在追加日志时，恰好遇到磁盘空间满、inode 满或断电等情况导致日志写入不完整，也没有关系，redis 提供了 redis-check-aof 工具，可以用来进行日志修复。
  - 追加方式，如果不做任何处理的话，AOF 文件会变得越来越大，为此，redis 提供了 AOF 文件重写（rewrite）机制，即当 AOF 文件的大小超过所设定的阈值时，redis 就会启动 AOF 文件的内容压缩，只保留可以恢复数据的最小指令集。举个例子，假如我们调用了 100 次 INCR 指令，在 AOF 文件中就要存储 100 条指令，但这明显是很低效的，完全可以把这 100 条指令合并成一条 SET 指令，这就是重写机制的原理。
  - AOF 重写时，仍然是采用先写临时文件，全部完成后再替换的流程
  - 通过场景再现，可以修改 AOF 文件来移除错误操作。

AOF 重写的内部运行原理:

1.  redis 创建（fork）一个“重写子进程”，读取现有的 AOF 文件，并将其包含的指令进行分析压缩并写入到一个临时文件中。
2.  与此同时，主工作进程会将新接收到的写指令一边累积到内存缓冲区中，一边继续写入到原有的 AOF 文件中，这样做是保证原有的 AOF 文件的可用性，避免在重写过程中出现意外。
3.  当“重写子进程”完成重写工作后，它会给父进程发一个信号，父进程收到信号后就会将内存中缓存的写指令追加到新 AOF 文件中。
4.  当追加结束后，redis 就会用新 AOF 文件来代替旧 AOF 文件，之后再有新的写指令，就都会追加到新的 AOF 文件中了。

官方建议同时使用这两种方案。
