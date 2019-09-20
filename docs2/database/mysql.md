---
title: "mysql学习(1): 基本概念"
date: 2018-12-11 09:01:24
tags:
toc: true
---

## 什么是数据库

数据库Database，是按照数据结构，来组织管理存储数据的仓库。

常见数据库:

- Oracle
- DB2
- SQL Server
- Postage SQL
- MySQL

## 登陆

```
// 登陆
mysql -uroot -p
mysql -uroot -proot
mysql -hlocalhost -uroot -p -P3306   // 带端口地址
mysql -uroot -p -D db_name   // 登陆同时打开数据库

// mac mamp
/Applications/MAMP/Library/bin/mysql -u root -p

// 退出
exit
quit
ctrl+c
\q

mysql -V

select version();
select user();
select database();
// ;  \g 是命令的结束符
```

## 数据库相关操作

```
// 创建数据库
CREATE DATABASE|SCHEMA test1;
CREATE DATABASE|SCHEMA test1 IF NOT EXISTS test1;  // 如果不存在则创建
CREATE DATABASE|SCHEMA test1 DEFAULT CHARACTER SET [=] charset; // 同时指定编码

// 查看全部数据库
SHOW DATABASES|SCHEMAS;

// 查看上一步操作产生的警告信息
SHOW WARNINGS;

// 查看指定数据库的详细信息
SHOW CREATE DATABASE db_name;

// 修改指定数据库编码方式
ALTER DATABASE db_name DEFAULT CHARACTER SET 'UTF8';  

// 打开指定数据库
USE db_name;

// 查看当前打开的数据库
SELECT DATABASE()|SCHEMA();

// 删除数据库
DROP DATABASE test3;
DROP DATABASE IF EXISTS test3;
```

## 数据表相关操作

- 是数据库的最重要组成部分，数据是保存在数据表中。
- 数据表由行和列来组成。
- 每个数据表的列至少有一列，行可以大于等于零行。
- 表名要求唯一，不要包含特殊字符，最好含义明确。

```
CREATE TABLE [IF NOT EXITS] tbl_name(
    字段名称 字段类型 [完整性约束条件],
    字段名称 字段类型 [完整性约束条件],
)ENGINE=存储引擎 CHARSET=编码; 
```

MySQL中的数据类型：
- 数值型：整数型、浮点数、定点数
![](./imgs/mysql_int.png)
![](./imgs/mysql_float.png)
- 字符串类型
![](./imgs/mysql_string.png)
- 日期(可以用整型保存时间戳来代替)
![](./imgs/mysql_date.png)

## php连接mysql的三种方式

php操作Mysql的三种方式。
- MySQL: 非永久连接，性能比较低，php5.5以后废弃。
- MySQLi: 永久连接，减轻服务器压力，只支持MySQL。坏处是浪费内存。
- PDO: 能实现MySQLi的常用功能，支持大部分数据库。

通过php扩展查看函数 phpinfo() 查看是否支持这几种方式，搜索mysqli/pdo等。

如果不支持，可以打开php.ini开启，去掉前面的分号。

```
// 打开php mysql扩展，前面是分号则是注释。
extension=php_mysql.dll;

// 搜索mysqli
extension=php_mysqli.dll;

// pdo
extension=php_pdo_mysqli.dll;
```

然后重启服务。

## MySQL方式

### MySQL连接数据库

php5.5已经废弃了。

```
// 1.连接数据库 mysql -uroot -p123456;
mysql_connect($server, $username, $password)

// 2.选择数据库 use db 
mysql_select_db($db_name)

// 3.设置字符集 set names utf8;
mysql_set_charset($charset)

// 4.执行SQL语句
mysql_query($query) INSERT/UPDATE/DELETE成功返回TRUE，出错返回FALSE

// 命令行
select * from 'user'
```

下面是详细代码：

```
// 1.连接数据库，如果正确，会返回一个资源
$link = mysql_connect('localhost', 'root', '') or die("数据库连接失败！");

// 2.选择数据库，系统默认有个test数据库
mysql_select_db('test'); 

// 3.设置字符集
mysql_set_charset('utf8');

// 关闭连接
mysql_close($link);

// SQL
// 插入数据
$result = mysql_query('INSERT INTO users VALUES(NULL,'李四','20)');
// 修改数据
$result = mysql_query('UPDATE users SET money=25 where name='李四';
// 删除单条数据
$result = mysql_query('DELETE FROM users where name='李四';
// 新建表 create table test(
//       id int,NOT NULL AUTO_INCREMENT, 
                PRIMARY KEY(personID) ,
//       name varchar(200)
//       )
// show databases 
// show tables
// 删除表
$result = mysql_query('DROP TABLE test');
```

如果不是致命报错，可以在函数前面加@忽略掉。

**查询**

查询成功后会返回一个资源句柄，传递给`mysql_fetch_array($result)`和其它函数来处理结果表，取出返回的数据。


- `mysql_fetch_array($result)`每次只能取出一条数据。第二个参数控制返回的是索引还是关联数组。 可以是常量`MYSQL_ASSOC`、`MYSQL_ROW`、`MYSQL_BOTH`中的一个。
- `mysql_fetch_row($result)`返回索引数组。
- `mysql_fetch_ASSOC($result)`返回关联数组。

```php
while ($line = mysql_fetch_array($result)){
    $data[] = $line;
}
var_dump($data);
```

### MySQLi面向过程操作数据库

**语法**
```php
// 1. 连接
$connect = mysqli_connect('host', 'username', 'password', 'database');

// 2.执行SQL
$result = mysqli_query($connect, $sql);

// 3. 获取结果集
mysqli_fetch_all($result);
```

**例子**

```php
header('content-type:text/html;charset=utf8');
$conn = mysqli_connect('localhost', 'root', '', 'test');
mysqli_query($conn, 'set names utf8');
$sql = 'SELECT * FROM user';
$result = mysqli_query($conn, $sql);
$data = mysql_fetch_all($result, MYSQL_ASSOC);
mysqli_close($conn);
```


数据库能做什么
存储大量数据方便检索和访问
保持数据信息的一致，完整
共享和安全
通过组合分析，产生新的有用信息

数据库（DB)
数据库就是数据的仓库，可以存放结构化数据

数据库管理系统（DBMS）
是一种软件，提供操作数据库的环境，可以对数据库进行操纵。

SQL
结构化查询语句，用来和数据库交流

SQL规范：
1. 不区分大小写，建议关键字大写，表名和列表小写
2. 命令用分号结尾
3. 命令可以缩进和换行，一种类型的关键字放在一行
4. 可以写单行或多行注释，#和--是单行注释，/***/多行注释

数据表
表是列的集合

MYSQL

MAMP

```
sudo ln -s /Applications/MAMP/Library/bin/mysql /usr/local/bin/mysql
```



---
title: "mysql学习(2): 基本操作"
date: 2019-04-13 15:20:32
tags:
---

win
mysql
xampp
navicat Premium ：连接本地/服务器mysql

mysql/my.ini

类型
数值
- 整数
小数
- 浮点型 float Double
- 定点 decimal

非空约束
默认值
INSERT INTO `<table_name>`(keys) VALUES(values)


主键约束

- 主键一个就行了
- 主键是用来两个表间建立连接的，最好不更新

DDL 数据定义语言 data define language，主要用于定义和改变表的结构

```ddl
CREATE TABLE `student` // 如果是关键字需要加反引号 如 `TABLE`
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age int(11),
    city VARCHAR(50)
);

-- 增加一列
ALTER TABLE student ADD COLUMN idcard VARCHAR(20) NULL AFTER age;
-- 修改一列
ALTER TABLE student MODIFY COLUMN idcard VARCHAR(30);
-- 删除一列
ALTER TABLE student DROP COLUMN idcard;

-- 增加主键约束
ALTER TABLE student ADD PRIMARY KEY(id);
-- 增加唯一索引
ALTER TABLE student ADD UNIQUE INDEX uq_idcard(idcard);
-- 增加默认值
ALTER TABLE student MODIFY COLUMN city VARCHAR(50) DEFAULT 'beijing';
-- 增加外键约束，表score里fk_student_id添加 student 的 id
ALTER TABLE score ADD CONSTRAINT fk_student_id FOREIGN KEY(student_id) REFERENCES student(id);
-- 删除外键约束
ALTER TABLE score ADD FOREIGN KEY fk_student_id;
```

MODIFY 和 CHANGE(可以改列的名字)

DML 数据库操作语言 data manipulation language
SELECT UPDATE INSERT DELETE

ID在分布式有问题，UUID

DCL datacontrol  用来设置和更改数据库用户和角色权限的语句，包括grant，revoke等

SQL 

运算符号 +-*/%
逻辑运算 AND OR NOT
`比较 = > <  ( <>或!=不等于 )   >= <= `

```sql
INSERT INTO student(name,age,idcard,city) VALUES('zs',12,'321321','beijing')
```
 
 注意
 1. 每次插入一行数据，不能只插入一部分数据

 更新，一定要加where条件

```sql
UPDATE student SET name='lisi'
UPDATE student SET name='lisi',age=2 WHERE id=2 OR city IS NULL;
```

删除

```sql
DELETE FROM student
DELETE FROM student WHERE id=2
```

截断表

```sql
-- 数据全部清空，表的结构不动，重新开始编号
-- 不会写入日志，数据不能恢复，尽量不要使用
TRUNCATE table <table_name>
```

查询

```sql
SELECT <col_name> as(可加可不加) <alias_name>
FROM  <table_name>
WHERE city='beijing' 
ORDER BY id <ASC|DESC>
```

分页 limit offset, limit
```sql
SELECT *
FROM student
LIMIT 2, 2
```


```
相同记录出现一次
SELECT DISTINCT ..
```

'2'+'1' -> 3
'xx' + '2' + 'ff' -> 2
CONCAT('a', '2', 'b') -> a2b

函数
LENGTH('hello')
CONCAT_WS('z','#','s','@') -> #sz@

UPPER('S') -> 大写
LOWER('s')

SUBSTR('hello' FROM 2 FOR 3 )  -> ell  索引从1开始

首字母大写
SELECT name, CONCAT(UPPER(SUBSTR(name,1,1)), LOWER(SUBSTR(name, 2))) FROM student;

TRIM(' h ')
LTRIM()
RTRIM()

TRIM('@' FROM '@ii@') -> ii

补齐多少位
0088
10000
LPAD('88', 4, '0') 补成4位，左边补0
RPAD

替换字符串
REPLACE('@ii@', '@', '') 
格式化
FORMAT(10000,2) -> 100,00
FORMAT(888.4567,3) -> 888.457

取多少位
LEFT('hello', 1) -> h
RIGHT()

数学函数
CEIL(10.11) -> 11
FLOOR(10.11) -> 10
MOD(10, 3) -> 1  取模
ROUND(10.4) -> 10 四舍五入
TRUNCATE(10.99, 1) -> 10.9

日期函数
NOW() 日期 + 时间
CURDATE()  日期
CURTIME()  时间
DATE_ADD(NOW, INTERVAL 1 DAY); 加一天
DATE_ADD(NOW, INTERVAL 1 MONTH); 加一天
DATE_DIFF('2018-01-09', NOW()) 差多少天
YEAR(NOW())
MONTH(NOW())
DAY()
HOUR()
MINUTE()
SECOND()

字符串转日期
STR_TO_DATE('2018-09-09','%Y%m-%d')
FORMAT(NOW(), '$Y年%m月%d日')

CONNECTION_ID() 取连接id
DATABASE()
VERSION()
USER() 登陆用户
MD5()

SELECT * FROM mysql.user
PASSWORD('xx') 修改当前密码为xx

IF(1>2, 'A', 'B')  -> B

SELECT grade, 
CASE 
WHEN grade >=60 THEN '及格'
WHEN "A" THEN '不及格'
ELSE '未知'
END
FROM score;

update student set email = UPPER(email)

多列排序
查询未知
INSTR(str,substr) 
position
locate

convert('1', signed) 将字符串转数字,用于比较


将level 1-1   按照- 前面数升序，后面降序
select * from student 
order by substr(level,1, 1) asc, xx . desc


可以自定义函数

create function znow() returns varchar(50)
return date_format(now(), '%Y年%m月%d日 %h:%i:%s');

create function zadd(num1 int, num2 int) returns int
return num1 + num2;

create table stu2(id int primary key auto_increment, name varchar(50))
select * from stu2;

-- 声明一个函数，传入一个名称，函数里把这个名字插入到stu2表中，然后返回id
create function addUser(name varchar(50)) returns int
begin
insert into stu2(name) values(name);
return last_insert_id();
end

## like

select * from stu2 where name like '%2%'  
%表示任意长度字符 
_ 表示任意一个字符

查询某一列在指定规范内的记录，包括两个边界。
select * from score where grade between 60 and 100;
select * from score where grade>=60 and grade<=100;

查询某一列的值在内容列表
select * from student where city in ('北京' , '上海')
select * from student where city = '北京'  or city = '上海')

is null
is not null

聚合函数

-- 计算id=1的学生的总分
select sum(grade) from score where student_id = 1;

select max(grade) from score where student_id = 1;
select min(grade) from score where student_id = 1;
select avg(grade) from score where student_id = 1;

select count(grade) from score where student_id = 1;

分组: select只能跟分组的列和列的聚合函数
SELECT student_id, SUM(grade) FROM score
GROUP BY student_id   -- 可以多个字段分组
HAVING SUM(grade) > 550;   

WHERE 用来过了分组前的记录
HAVING 用来过滤分组后的记录
count 统计不为NULL的条数，如果要NULL的，可以写个常量 count('xx')

子查询
SELECT * from student where age > (select avg(age) from student)

ANY SOME ALL

-- 查询同学年龄大于 陕西省所有同学的年龄

select * from student where age > all (select age from student where province = '陕西省')
select * from student where age > any (select age from student where province = '陕西省')
select * from student where age > some (select age from student where province = '陕西省')

IN | NOT IN
-- 查询一下有考试成绩的学生信息
select * from student where id not in (select student_id from score)

-- EXIST  NOT EXIST
select * from student where exist (select student_id from score where score.student_id = student.id)

## 连接

连接条件 
ON WHERE

内连接  是两个表交叉相乘
select * from score inner join student;
select * from score,student;

select * from score inner join student on score.student_id = student.id;

left join
right join

full join (mysql没有)

自连接：自己连接自己
菜单里显示父级名称
select c1.id, c1.name, c2.name '父类'
from category c1
inner join category c2
ON c1.parent_id = c2.id;

select c1.id, c1.name, IF(c2.name!='',c2.name, '顶级分类') '父类'
from category c1
left join category c2
ON c1.parent_id = c2.id;

mysql sql 关系型
mongo  nosql 非关系
redis key-value

删除重复数据
查询重复数据的id
select c1.id from category c1
where c1.name in
(select name from category c2 group by name having count(1)> 1)
and c1.id not in
(select MIN(c3.id) from category c2 group by name having count(1)> 1)

多表联合更新
UPDATE student INNER JOIN province on student.province = province.name
SET student.province = province.id

## 设计

良好的：
1. 节省数据存储空间
2. 保证数据完整性
3. 方便数据库系统开发

糟糕
1. 数据冗余，浪费空间
2. 内存空间浪费
3. 数据更新插入异常

- 需求分析阶段
- 概要设计阶段：E-R模型图
- 详细设计阶段：三大范式
- 代码编写
- 软件测试
- 安装部署


搜集信息
标示实体

数据库ER图

RBAC 
基于角色的权限访问控制(Role-based access control)

关联表

事务
转账问题，一个加一个减
事务是一个完整的操作

创建start transaction或begin   ... END
提交commit
回滚撤销rollback

BEGIN;
UPDATE xxx;
COMMIT;  // 其它命令行查询才生效，否则只是缓存

默认每条sql是一个事务
默认是自动提交的，可以通过set autocommit 0|1 关闭和开启

## node

```
npm i mysql 
```

默认是连 取  销毁
连接池: 直接取就行

密码 process.evn.PASSWORD 一般放环境变量中






## 一条SQL查询语句是如何执行的

1. mysql 组成?
MySQL模块组成：

![](./mysql/1.png)

Server层包括：连接器、查询缓存(8.0移除了)、分析器、优化器、执行器，内置函数，存储过程，触发器，视图等。
存储引擎负责数据的存储和提取。架构模式是插件式，支持InnoDB、MyISAM、Memory等存储引擎，5.5.5后默认式InnoDB。如create table时。不同引擎存取方式不同，功能也不同。

2. 连接器

用户客户端和服务端的连接，TCP后验证账户密码，密码不对则报错，通过则到权限表查你的权限。所以连接后，管理员修改了权限，你还是能之前的权限，除非重新连接。

```
mysql -h localhost -u root -p
mysql -h$ip -P$port -u$user -p
mysql -hlocalhost -uroot -p
mysql -h127.0.0.1 -uroot -p
```

连接后，如果没有后续动作，连接处于空闲，可以在show processlist;看到Sleep。
客户端太长时间不动，则连接器断开它，wait_timeout控制，默认8h


## node连接mysql

node连接mysql使用的是npm包`mysql`。

```bash
npm i mysql
```

然后通过下面配置：

```javascript
const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    // 如果是安装的mysql 需要配置socketPath: '/var/run/mysqld/mysqld.sock',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',  // MAMP
    user: 'root',
    password: '',
    database: 'myblog'
})
con.connect(function (err) {
    if(err){
        console.log(err)
        return 
    }
    console.log('数据库连接成功')
})
```


https://dev.mysql.com/doc/refman/5.7/en/


https://blog.sessionstack.com/@zlatkov

https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e
https://medium.com/reloading/javascript-start-up-performance-69200f43b201

https://mathiasbynens.be/notes/javascript-unicode

https://mgechev.github.io/javascript-algorithms/index.html
https://developers.google.com/web/fundamentals/performance/why-performance-matters/
https://wpostats.com/