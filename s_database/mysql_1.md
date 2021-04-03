---
title: "mysql学习"
---

# mysql 笔记

## 2

mysql 下载地址：https://dev.mysql.com/downloads/mysql/

```sh
yum install wget -y

# 下载
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.18-linux-glibc2.12-x86_64.tar.xz/

# 解压
xz -d mysql-8.0.18-linux-glibc2.12-x86_64.tar.xz
tar xf mysql-8.0.18-linux-glibc2.12-x86_64.tar.xz

# 安装
mv mysql-8.0.18-linux-glibc2.12-x86_64.tar.xz /usr/local/mysql
```

建立专门的用户：mysql

```sh
adduser mysql
```

配置 mysql。

```sh
vim /etc/my.cnf
```

配置用到了一些目录：

```
mkdir data sql_log undo
# 修改属主
chown mysql:mysql -R data/ sql_log/ undo/

# 配置PATH
vim /etc/profile
export PATH=$PATH:/usr/local/mysql/bin

# 初始化
mysql --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
ps -ef

# 启动
cp mysql/support-files/mysql.server /etc/init.d/mysqld

```

mysql 忘记密码后的操作：

1. `/etc/my.cnf` 里打开`skip-grant-tables`。
2. 启动 mysql 服务`service mysqld start`。
3. 链接 mysql，执行下面操作。

```sh
mysql> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select user, host , authentication_string from user;
+------------------+-----------+-------------------------------------------+
| user             | host      | authentication_string                     |
+------------------+-----------+-------------------------------------------+
| root             | %         | *6ED51CE1DD53A7D431A120FD310BB6AF45169480 |
+------------------+-----------+-------------------------------------------+
4 rows in set (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> ALTER USER 'root'@'%' IDENTIFIED BY 'Aa,123456';
Query OK, 0 rows affected (0.04 sec)

mysql> select user, host , authentication_string from user;
+------------------+-----------+-------------------------------------------+
| user             | host      | authentication_string                     |
+------------------+-----------+-------------------------------------------+
| root             | %         | *F3F08A0172C0C11048FDEC357877396C00C50AEE |
+------------------+-----------+-------------------------------------------+
4 rows in set (0.00 sec)
```

## 5

### 5.7 数据库用户授权

GRANT 命令注意事项

-   使用 grant 授权的数据库账户必须存在

```
mysql -uroot -p
select user, host from mysql.user
grant select on mysql.user to mysql@'192.168.2.%'
```
