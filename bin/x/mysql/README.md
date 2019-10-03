# mysql

sql nosql

关系数据库的特点

-   数据结构化存储在二维表中
-   支持事务的原子性 A、一致性 C、隔离性 I、持久性 D
-   支持使用 SQL 语言对存储在其中的数据进行操作

适用场景

-   数据之间存在着一定的关系，需要关联查询数据的场景
-   需要事务支持的业务场景
-   需要适用 sql 语言灵活操作数据的场景

非关系型数据库的特点

-   存储结构灵活，没有固定的结构，一般占用存储大，因为保存 key 多了 {key:value}
-   对事务的支持比较弱，但对数据的并发处理性能高。

适用场景

-   数据结构不固定的场景
-   对事务要求不高，但读写并发比较大的场景
-   对数据的处理操作比较简单的场景

关系数据库的选型原则

-   数据库使用的广泛性: 出了问题方便查资料、约广泛相对越完善
-   数据库的可扩展性
-   数据库的安全性和稳定性
-   数据库所支持的系统
-   数据库的使用成本

mysql 数据库的可扩展性

-   支持基于二进制日志的逻辑复制
-   存在多种第三方数据库中间层，支持读写分离和分库分表

安全性和稳定性

-   主从复制集群可达到 99% 的可用性
-   配合主从复制高可用架构可达到 99.99%的可用性
-   支持对存储在 mysql 的数据进行分级安全控制

mysql 社区版本免费，使用人员多，可以方便获取技术支持

## 实战环境部署

```
yum install wget
```

```
wget http://mirrors.sohu.com/mysql/MySQL-8.0/mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz
tar -zxvf mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz
mv mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz /usr/local/mysql
# 新建一个账号来启动
adduser mysql

# mysql 配置
vi /etc/my.cnf

mkdir -p /data/mysql/data && ln -s /usr/local/mysql/bin/* /usr/bin
```

mysql 国内镜像下载网址
http://mirrors.sohu.com/mysql/
http://mirrors.ustc.edu.cn/mysql-ftp/Downloads/

开源镜像站点汇总
http://segmentfault.com/a/1190000000375848
http://mirrors.ustc.edu.cn/

```
[client]
port = 3306
socket = /usr/local/mysql/data/mysql.sock
[mysqld]
# Skip #
skip_name_resolve = 1
skip_external_locking = 1
skip_symbolic_links = 1

# GENERAL #
default_storage_engine = InnoDB
character-set-server = utf8
socket = /usr/local/mysql/data/mysql.sock
pid_file = /usr/local/mysql/data/mysqld.pid
basedir = /usr/local/mysql
port = 3306
bind-address = 0.0.0.0
explicit_defaults_for_timestamp = off
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
key_buffer_size = 32M
```

添加命令

vi /etc/profile

export PATH=\$PATH:/usr/local/mysql/bin

source /etc/profile

初始化
mysqld --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data

cd supports-files
cp mysql.server /etc/init.d/mysqld
/etc/init.d/mysqld start
ps -ef | grep mysql

cd ../sql_log
grep password mysql-error.log 查看初始密码

mysql -uroot -p

`[mysqld]` 下添加--skip-grant-tables 跳过检查

修改密码
alter user user() identified by '123456'

数据库结构设计
业务分析
逻辑设计
数据类型
对象命名
建立库表

### 逻辑设计

宽表模式

-   数据插入异常，部分数据由于缺失主键信息而无法写入表中
-   数据删除异常，删除某一行数据时，不得不删除另一数据

宽表模式的应用场景

-   配合列存储的数据报表应用

设计范式

-   表中的所有字段（列属性）不可再分
-   表中必须存在业务主键，并且非主键依赖于全部业务主键，（只有一个主键天生就满足这个规则）
-   表中的非主键列之间不能相互依赖

面向对象设计

范式设计的问题
如果查询很多，会拖慢性能，还要对经过范式设计的表进行改进

反范式化设计
都是以空间换时间，增加数据的冗余
比如课程章节表只用于课程表，所以把它归入课程表

物理设计
mysql 常见的存储引擎
MYISAM 不支持事务，mysql5.6 之前的默认引擎，最常用的非事务型存储引擎，数据是以堆表来存储的，没有顺序 索引，直接用的物理地址。读写都会对整张表加锁，会阻塞，影响性能
CSV 不支持事务
Archive 不支持事务，只允许查询和新增数据而不允许修改，通常用于记录日志，这种存储引擎占用小
Memory 不支持事务，性能高，一旦重启，数据就会消失，主要用于 mysql 内部 中间数据
INNODB 支持事务，现在默认引擎

InnoDB 存储引擎的特点

-   事务型存储引擎支持 ACID
-   数据按主键聚集存储
-   支持行级锁几 MVCC
-   支持 Btree 和自适应 Hash 索引
-   支持全文和空间索引

常用的整数类型
列类型 存储空间 属性 取值范围
tinyint 1 字节 signed -128 - 127 unsigned 0 - 255
smallint 2 signed -32768~32767 0 ~65535
mediumint 3  
int 4
bigint 8

常用的浮点类型 实数类型
列类型 存储空间 是否精确类型
float 4 否
double 8 否
decimal 每 4 个字节存 9 个数字，小数点占一个字节 是

123456789.123456789 = decimal(18,9) 共占用 4 + 1 + 4 = 9 个字节

```
CREATE TABLE test;
USE test;
create table t(d1 double, d2 decimal(10,3));
insert into t values(11.2, 11.2),(12.3,41.1)
```

时间类型数据
类型 存储空间 格式 范围
date 3 YYYY-MM-DD
time 3-6 HH:MM:SS[.微秒值] -838:59:59 838:59:59 除了可以存储小时，还可以存储 a-b 的小时数，所以可以大于 24
year 1 YYYY 1901 - 2155
datetime 5-8 YYYY-MM-DD HH:MM:SS[.微秒值] 1000-01-01 00:00:00 9999-12-31 23:59:59
timestamp 4-7 YYYY-MM-DD HH:MM:SS[.微秒值] 1970-01-01:00:00:01 UTC - 2038-01-19 03:14:07 UTC

```
SET time_zone='+10:00'  // 改为东10区
```

常用的字符串类型
类型 范围 说明
char(m) m=1~255 个字符 占用空间固定长度 m
varchar(m) 一行中所有 varchar 类型的列所占用的字节数不能超过 65535 个字节，UTF8mb4 varchar(10) = 40 字节 存储可变长度的 m 个字符
tinytext 最大 255 可变长度
text 最大 65535 可变长度
mediumtext 最大长度 16777215 可变长度
longtext 最大 4294967295 可变长度
enum 集合最大数目为 65535 只能插入列表中的值

如何选择数据类型

-   优先选择符合存储数据需求的最小的数据类型
    -   INET_ATON('255.255.255.255') 15 个字节 = 4294967295 4 个字节
    -   INET_NTOA(4294967295) 反转成字符串
-   谨慎使用 enum，text 字符串类型 内存临时表不支持 text，只能用磁盘临时表，还需要二次查找，性能会差，对 enum 修改，要加锁，可能造成阻塞
-   同财务相关的数值，必须使用 decimal

如何为表和列选择适合的名字

-   必须使用小写字母，可选用`_`分割
-   禁止用 MySQL 保留关键字 mysql 官网 keywords
-   见名识义，并最好不要超过 32 字符，可以包含数据库名称，这样方便知道当前是哪个数据库
-   临时表必须以 tmp 前缀，并以日期为后缀
-   用于备份的库，表必须以 bak 前缀并以日期为后缀
-   所有存储相同数据的列名和列类型必须一致 关联索引，查询更高效

## 访问 mysql

-   命令行工具 mysql
-   图形化界面 sqlyog、navicat、sequel pro
-   mysql 连接器(程序)，Connector/ODBC、Connector/J

```
mysql --help

mysql -uroot -p -hlocalhost
-u 用户
-h 域名或ip
-p 密码

不进入交互界面
mysql -uroot -p -hlocalhost -e"select * from.."
```

## 常见问题

### 重置 root 密码

```
# 1. 安装 mysql 后会自动生成随机密码
grep 'temporary password' /var/log/mysqld.log

# 2. 配置免密码登录，即在 [mysqld] 新增 skip-grant-tables
vim /etc/my.cnf

[mysqld]
skip-grant-tables

# 3. 重启服务
service mysqld restart

# 4. 登录，没有密码，直接回车
mysql -uroot -p

# 5. 切换到 mysql 数据库
use mysql

# 6. 查看 user 相关信息
select host, user, authentication_string, plugin from user;
- host: 允许用户登录的ip，%表示可以远程登录
- user: 当前数据库用户名
- plugin: 加密方式

# 7. 将 root 密码设置为空，并退出
use mysql;
update user set authentication_string='' where user='root';
quit;

# 8. 删除 /etc/my.cnf 文件最后的 skip-grant-tables，并重启服务
vim /etc/my.cnf
service mysqld restart

# 9. 重新登录 mysql，直接回车，因为密码刚刚设置为空了
mysql -u root -p

# 10. 修改 root 用户密码，密码如果设置太简单会不成功，在 mysql8 password() 已废弃
ALTER user 'root'@'localhost' IDENTIFIED BY 'Xpf123@';
```

### MySQL said: Authentication plugin 'caching_sha2_password' cannot be loaded: dlopen(/usr/local/lib/plugin/caching_sha2_password.so, 2): image not found

是因为 sequel 工具的加密方式不一致。解决方法如下

1. 设置`/etc/my.cnf`的`[mysqld]`，新增：

```
#default_authentication_plugin=caching_sha2_password  (comment line!)
default_authentication_plugin=mysql_native_password   (new line)
```

然后重启服务`service mysqld restart`。

2. 连接数据库，执行修改语句。

```
mysql -uroot -p
use mysql
select user,host from user;

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'xxx';
```

### The server quit without updating PID file

### MySQL said: Can't connect to MySQL server on '192.168.25.201' (61)

可以是以下原因导致的。

1. pid 没有写权限。

```
chown -R mysql:mysql /var/data
chmod -R 755 /usr/local/mysql/data
# 然后重新启动mysqld！
```

2. mysql 已经启动了。

```
ps -ef|grep mysqld
```

3. 看看 mysql 的 data 目录有没有 mysql-bin.indx，有则删除它。

4. 设置 datadir

```
vim /etc/my.cnf

# 新增
[mysqld]
datadir = /usr/local/mysql/data
```

5. 检查`/etc/my.cnf`里有没有`skip-federated`字段，有则删除。

6. 错误日志目录不存在，使用 chown chmod 命令赋予 mysql 所有者权限。

7. 关闭 selinux，打开`etc/selinux/config`，设置`SELINUX=disabled`，重启机器。

### netstat 命令不是内部命令

```
yum install net-tools
```

### python 访问 MySQL

```
yum install python-setuptools python-devel
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
pip install --upgrade setuptools
pip install PyMySQL
```

### 1045 异常

-   确认密码是否正确。
-   确认是否对 ip 进行授权，% 不包括 localhost。
-   网络是否畅通。

### 1153 异常

u Got a packet bigger than 'max_allowed_packet' bytes。

-   增加 配置大小
-   `SET PERSIST max_allowed_packe='100*1024*1024'`

## SQL

-   结构化查询语言
-   对存储在 RDBMS 中的数据进行增删改查操作
-   语法分类 DCL(控制用户访问)、DDL(数据定义，如建立数据库)、DML(数据操作语句)、TCl(事务控制语句)

### DCL

-   建立数据库账号：create user
-   对用户授权：grant
-   收回用户权限：revoke

任务

1. 建立程序使用的数据库账号

```sql
CREATE USER mc_class@'192.168.1.%'
IDENTIFIED WITH 'mysql_native_password' by '123456'
# WITH MAX_USER_CONNECTIONS 1
```

查看帮助信息，在 mysql 下，输入 help create user;

2. 给账户授权

| 权限名称 | 说明               |
| -------- | ------------------ |
| Insert   |                    |
| Delete   |                    |
| Update   |                    |
| Select   |                    |
| Execute  | 执行存储过程的权限 |

```sql
# show privileges 查看所有支持的权限

# 给用户授权列 user,host 的查询权限
GRANT select(user,host) on mysql.user to mc_class@'192.168.1.%'

# 给用户授权所有列的查询权限
GRANT select on mysql.user TO mc_class@'192.168.1.%'

# 给用户 mysql 数据库所有表的查询权限
GRANT select on mysql.* TO mc_class@'192.168.1.%'
```

desc user 查看表结构

grant 命令的注意事项

-   使用 grant 授权，必须是已存在的用户，用户是由用户名和 ip 组成的。
-   只能授 自己拥有的 grant options 的权限

3. 访问控制，回收 mysql 系统数据库的操作权限

```
# delete,insert 之间没有空格
REVOKE delete,insert,update ON mysql.*
FROM mc_class@'192.168.1.%'
```

### 创建数据库对象

DDL(Data Definition language)

-   建立/修改/删除数据库：create/alter/drop database
-   建立/修改/删除表：create/alter/drop table
-   建立/删除索引：create/drop index
-   清空表：truncate table，相当于 drop table + create table，会保留表结构，不会记录日志。
-   重命名表：rename table
-   建立/修改/删除视图：create/alter/drop view
