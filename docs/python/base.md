---
title: "基础知识"
---

# python 基础知识

## 安装

1. 首先安装 brew，这个东西和 npm 一样，是用来装库的。运行下面命令即可：

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. brew 的几个常用命令：

```
# 更新brew
brew update

# 安装软件
brew install {应用名，如git}

# 也是下载安装，与上面的区别，请查看https://www.zhihu.com/question/22624898
brew cask install {应用名，如git}
```

更多用法请 brew help

## 基本数据类型

-   整数：int
-   浮点数：float 没有单双精度之分
-   字符串: "hello"
-   布尔值 True False

`type(x)`：用于检测数据类型

```py
// 特殊
type(2/2)   // float  1.0
type(2//2)  // int    1

1//2  -> 0
```

理解进制，10，2，8，16，60s=1min。就是一种计数方式。

-   2 进制，前面必须加 0b，0b10
-   8 进制，前面必须加 0o
-   16 进制，前面不行加 0x

bin()将其它进制转二进制。
int()将其它进制转十进制。
hex()将其它进制转 16 进制。
oct()将其它进制转 8 进制。
str()转字符串
bool()转布尔值

## 序列

序列：成员是有序的，可以通过下标偏移量访问。

字符串：'abcd'
列表：[]
元组：()，大小比较

```
(4) > (5)  #False 当作 4和5比较
(1,20) > (2,20) #False 当作120和220比较
```

基本操作

-   `in`: 是否在序列中，'狗' in '狗猪牛'
-   `not in`: 是否不在序列中，'狗' not in '狗猪牛'
-   `+`: 序列连接
-   `*`: 序列重复操作
-   `[0:n]`: 切片

## if 语句

```py
x = 'a'
if x == 'a':
    print('a')
elif x == 'b':
    print('b')
else:
    print('c')
```

## 循环语句

-   while 语句

```
while x:
    xxx
```

-   for 语句
    range(x,y) 生成 x - y 的整数，如果不写 x，则是 0-y。

```py
chinese_zodiac = '猴鸡狗猪鼠牛虎兔龙蛇马羊'
for cz in chinese_zodiac:
    print(cz)

for i in range(1, 13):  # [1,13) 即 1-12
    print(i)

# 字符串替换： 如 2017 年的生肖是 鸡
for year in range(2000, 2019):
    print('%s 年的生肖是 %s' % (year, chinese_zodiac[year % 12]))
```

while 语句 break continue

```py
zodiac_name = ('摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天平座', '天蝎座', '射手座')

zodiac_days = (
    (1, 20), (2, 19), (3, 21), (4, 21), (5, 21), (6, 22), (7, 23), (8, 23), (9, 23), (10, 23), (11, 23), (12, 23))

# 利用for循环

int_month = int(input('请输入月'))
int_day = int(input('请输入日'))

# for i in range(len(zodiac_days)):
#     if zodiac_days[i] >= (int_month, int_day):
#         print(zodiac_name[i])
#         break
#     elif int_month >= 12 and int_day > 23:
#         print(zodiac_name[0])
#         break

i = 0
while (int_month, int_day) > zodiac_days[i]:
    if (int_month, int_day) > zodiac_days[len(zodiac_days) - 1]:
        break
    i += 1
print(zodiac_name[i])
```

字典：就是 js 里的对象。

-   `dict.items()`

利用字典统计 生肖。

列表推导式和字典推导式

## 异常处理

```py
try:
    a = read('name.txt')
    raise NameError('custom error')
except Exception as e:
    print(e)
finally:
    a.close()
```

## 函数

*表示多个可选参数的集合，不写*必须传，否则报错。
可以用`参数名=值`传参数，这样顺序可以随意。

```py
def fun(a=1, *b):  # 参数不能再加 *c
    print(a, len(b))  # 3 3
    print(type(b))  # <class 'tuple'>
    print(b)  # (3, 4, 5)

fun(a=3, 3, 4, 5))
```

函数作用域：函数里可以访问外面的变量，里面修改了值，外面不会变。如果用 global 重新定义后，外面的值会改变。

```py
# 例子1
a = 1
def f():
    a = 4
    print(a)  # 4

f()
print(a)  # 1

# 例子2
a = 1
def f():
    global a   # 函数内，global a前面不能使用a，否则报错
    a = 4
    print(a)  # 4

f()
print(a)  # 4
```

没有返回值的函数，默认返回 None

## 迭代器和生成器

```py
# 迭代器
list = [1, 2, 3]
it = iter(list1)
next(it)  # 1
next(it)  # 2
next(it)  # 3
next(it)  # 抛出异常 except

# 生成器，实现range(10,20,0.5)，[10,20) 这个函数第三个参数是步数，只能是整数
def frange(start, stop, step):
    a = start
    while a < stop:
        yield a
        a += step

for f in frange(10, 20, 0.5):
    print(f)
```

## lambda

lambda 和 js 箭头函数类似。

```py
def add(x, y): return x + y
lambda x,y: x + y
```

## 常用内置函数

-   `filter()`
-   `map()`
-   `reduce()`
-   `zip()`

在命令行使用`help(filter)`可以看函数具体的描述。

## 闭包

和 js 闭包一样。

```py
# 例子1
def counter():
    cnt = [0]  # 这里不能用整数，因为它的作用域在函数add_one外面的cnt不会变
    def add_one():
        cnt[0] += 1
        return cnt[0]
    return add_one

# 例子2 函数柯里化
def a(x):
    # return lamdba y : x+y
    def b(y):
        return x + y
    return b
c = a(3)
c(2) # 5
```

## 装饰器

和 js 一样。

```py
import time

def timmer(func):
    def wrapper(x):
        start_time = time.time() # 1970到现在多少秒
        func(x)
        stop_time = time.time()
    return wrapper

@timmer
def a(x)
    time.sleep(3) # 停多少秒

# 装饰器传递参数，就加一层闭包
def a(argv):
    def b(func):
        def c(z):
            print(func.__name__)
            func(z)
        return c
    return b

@a(3)
def func():
    ..
```

## 上下文管理器

with

```py
fd = open('name.txt')
try:
    for line in fd:
        print(line)
finally:
    fd.close()

# 使用上下文管理器
with open('name.txt') as f:  # 会自动调用 finally
    for line in f:
        print(line)
```

## 模块

模块名就是文件名。

```py
#import 模块名
import time
time.time()

# import 模块名 as 重命名
import time as t
t.time()

# from 模块名 import 方法名(不推荐,名字可能重复)
from time import time
time()
```

**自定义模块**

```
# a.py
def say:
    print('hi')

# 使用
import a
a.say()
```

## PEP8 编码规范

命令行`import this`会打印`python编码风格`。

-   [规范说明](https://www.python.org/dev/peps/pep-0008/)

使用 autopep8 工具来规范：

```
pip install autopep8
```

`pycharm -> Tools -> External Tools -> Tool Settings -> program: autopep8`

右键`自定义扩展 -> pep8`。

## 类与实例

```py
class Player():
    # 所有函数的第一个参数必须是self
    # 构造函数,示实例，就是 js 里的this
    def __init__(self, name, hp, occu):
        # 如果属性前加__，则不能被实例以p.__name方式修改，只能通过方法修改
        self.name = name
        self.hp = hp
        self.occu = occu
    def print_role(self):
        print('%s: %s %s' %(self.name, self.hp, self.occu))
    def updateName(self, newName):
        self.name = newName

# 如果现在有些不想实现的类
class Monster():
    '定义怪物类'
    pass

user1 = Player('tom', 100, 'war')
user2 = Player('jerry', 90, 'master')
user1.print_role()
user2.print_role()
```

## 继承

```py
# 如果现在有些不想实现的类
class Monster():
    def __init__(self, hp):
        self.hp = hp
    def run(self):
        print('run')

class Animals(Monster):
    def __init__(self, hp):
        super().__init__(hp) # 继承属性

class Boss(Monster):
    def __init__(self, hp):
        super().__init__(hp) # 继承属性
    # 覆盖方法
    def run(self):
        print('boss run')
```

具体调用方法时，才知道是哪个类的方法，一个方法有多个状态：多态

看对象属于那个类

-   `type()`查看对象的类。`<class '__main__.Monster'>`。
-   `isinstance(a, Monster)`。

python3 里所有类都是继承自 object 类。所有的数据类型都是类`<class xxx>`。

## with

使用 with 执行类时，会自动调用类的钩子函数`__enter__`和`__exit__`。如果执行类发生错误，则在`__exit__`里可以通过参数`exc_tb`捕获错误信息。

```py
class TestWith():
    def __enter__(self):
        print('enter')

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_tb is None:
            print('exit')
        else:
            print('错误是: %s' % exc_tb)

        # 返回True，异常不会终止后续代码的执行
        return True

with TestWith():
    print('test with')
    raise Exception('抛出异常')

# 执行结果是：
# enter
# test with
#     xi
# 错误是: <traceback object at 0x10ea93fc8>
```

## 并发编程

在进程里面引入线程。

## 生产者和消费者问题

队列

```
import queue
q = queue.Queue(10) # 10表示长度
q.put() # 插入
q.get() # 取出
```

## 标准库

### 正则表达式库 re

```py
import re

# 定义正则对象，\w不用转义
p = re.compile('ca{1}t\w')

print(p.match('cagti'))  # 没有匹配到则返回 None
print(p.match('cati'))  # <re.Match object; span=(0, 3), match='cat'>)

# ^s 匹配空行
```

r 让字符串不转义

```py
print('\nx\n') # 有换行
print(r'\nx\n') # 原样输出 \nx\n
```

**match**

match 是完全匹配，是第一个字符开始对应比较，一旦不对就报错，不会后移动。

-   `p.match().group(n)`: 取出分组
-   `p.match().groups()`: 取出所有分组

```py
p1 = re.compile('(\d+)-(\d+)-(\d+)')
groups = p1.match('2018-01-09').groups()  # ('2018', '01', '09')

# 或者 (year, month, day) = groups
year, month, day = groups

print(year, month, day))
```

**search**

和 match 类似，但是是搜索。不是完全匹配。只会搜索第一个。

**re.sub**

sub 是替换。

```
re.sub(r'#.*$', '', '123 #hello')  # 123
```

**re.findAll()**

## 时间库 time datetime

```
import time
time.time()
time.localtime()
time.strftime('%Y%m%d')

import datetime
datetime.datetime.now()
newtime = datetime.timedelta(minutes=10) # 时间10分钟偏移量
print(datetime.datetime.now( + newtime)

one_day = datetime.datetime(2008, 5, 28)
new_date = datetime.timedelta(days=10)
print(one_day + new_date)
```

## math

## random

```
import random

# 生成1-5的整数
random.randint(1, 5)

# 随机抽取一个
random.choice(['aa','bb','cc'])
```

## 文件夹操作 os.path

```
import os
os.path.abspath('.') # 以当前目录. 获得绝对路径
os.path.exists('/a') # 判断目录是否存在
os.path.isfile('/a') # False
os.path.isdir('/a') # True
os.path.join('tmp/a', 'b/c')

from pathlib import Path
p = Path('.')
print(p.resolve(''))

p.is_dir()

# 新建目录
q = Path('/tmp/a/b')
Path.mkdir(q, parents=False) # parents为False没有a会报错，设置True即可
```

## 机器学习的一般流程和 NumPy

```
pip3 install numpy
```

```py
import numpy as np

# 数组
arr1 = np.array([2,3,4])
print(arr1.dtype) # int64

arr2 = np.array([1, 2, 3])
arr1+arr2   # [3, 5, 7]

# 标量
print(arr1 * 10)

# 转矩阵
data = [[1,2,3], [4,5,6]]
np.array(data)

# 生成矩阵
np.zeros((3, 5))
np.one((2, 3))
np.empty((2, 3, 2))

# 切片
# [0 - 9]
arr = np.arange(10)
arr[4:7]        # 获取
arr[4:7]  = 10  # 直接修改
arr[:]  = 10  # 全部修改

arr[4:7].copy()
```

## Pandas

## 爬虫

```
from urllib import request

```
