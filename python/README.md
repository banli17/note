# 笔记

## 环境安装

注意：python2.x 和 python3 不完全兼容

1. 下载包安装，https://www.python.org/downloads/mac-osx/
2. 环境变量

官方文档： https://docs.python.org/zh-cn/3/

## Python 基本数据类型

### 数字 Number

-   Number: 数字(包括整数、浮点数)
    -   整数 int
    -   浮点数 float
    -   python 没有，其它语言还有 short int long float double

type(x)：用于检测数据类型

```python
type(1+1)
type(1*1)
<class 'int'>

type(1.0)
type(1+1.0)
type(1*1.0)
<class 'float'>

type(2/2)  // float 注意：两个整数相除是浮点数
type(2//2)  // int  要得到整型

2/2 => 1.0
2//2 => 1
1//2 => 0

/ 会自动转为浮点数
// 整除，向下取整
```

进制：10 2 8 16
2 进制加前缀 0b: 0b10 -> 2 0b11 -> 3
8 进制加前缀 0o: 0b10 -> 8 0b11 -> 8
16 进制加前缀 0x: 0x10 -> 16 0x0F -> 15

进制转换

-   bin(n): 其它进制转为 2 进制
-   int(n): 其它进制转为 10 进制，如果是浮点数会转为整数
-   hex(n): 其它进制转为 16 进制
-   oct(n): 其它进制转为 8 进制

bool 布尔类型 归于 Number 下的一种: 表示真、假
True
False

```
type(True)
<class 'bool'>

int(True) 1
int(False) 0
bool(1) True
bool(0) False
```

python 中一般空值都是 False。

```
>>> bool(0.0)
False
>>> bool('')
False
>>> bool([])
False
>>> bool(0)
False
>>> bool({})
False
>>> bool(None)
False
```

complex ：用后缀 j 表示，如 34j。

### 字符串 str

str 类型 `<class 'str'>`。

有三种方式表示字符串 单引号、双引号、三引号(单双引号都可以)。

为什么单、双引号？因为方便引号内嵌 `'hel"lo'`。

```
# 命令行，回车时会报错
>>> '你
  File "<stdin>", line 1
    '你
      ^
SyntaxError: EOL while scanning string literal

>>> '''
... 你
... 好
... 啊
... '''
'\n你\n好\n啊\n'

>>> print('\n你\n好\n啊\n')

你
好
啊

>>> 'hello \
... world'
'hello world'
```

三引号可以方便换行。单引号也可以通过行末尾加 \ 来换行(不能有空格)。

转义字符
特殊的字符 \ ' "
无法看见的字符 \n \t(横向制表符)
与语言语法有冲突的字符 \'

```
>>> print('c:\north')
c:
orth
>>> print('c:\\north')
c:\north
>>> print(r'c:\north') # 原始字符串
c:\north
>>> R'c:\north'
'c:\\north'
```

print 前面加 r/R 会将字符串里的字符串当作是原始字符串来处理。

\n 换行
\r 回车

字符串拼接 str + str
字符串重复 str \* n

```
>>> "hello" + "world"
'helloworld'
>>> "hello" * 3
'hellohellohello'
>>> "hello" * "world"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: can't multiply sequence by non-int of type 'str'
```

获取单个字符`str[n]`， -n 是从末尾开始数

```
>>> "hello"[2]
'l'

>>> "hello"[-1]
'o'

>>> "hello"[-6]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: string index out of range
```

获取一串字符 `str[start:end]`，`[start, end)`，end 大于字符串长度会截取到末尾。
end > start 会是空字符串 ''
start 省略，默认为 0

```
>>> "hello"[0:3]
'hel'
>>> "hello"[0:30]
'hello'
>>> "hello"[2:]
'llo'
>>> "hello"[0:-1]
'hell'
>>> "hello"[2:0]
''
>>> "hello"[:2]
'he'
```

### 列表 list []

列表中可以放任意类型，二维数组也叫嵌套列表。

```
>>> type([1,2,3])
<class 'list'>
>>> type([1, 'hello', True, False])
<class 'list'>
>>> type([[1,2], [True]])
<class 'list'>
```

获取元素和字符串一样

-   `list[index]` 返回当前元素
-   `list[start:end]`返回一个列表

```
>>> [1] + [2] + [True]
[1, 2, True]

>>> [1, 2, True] * 3
[1, 2, True, 1, 2, True, 1, 2, True]
```

### 元组 tuple ()

```
>>> type((1,2))
<class 'tuple'>
>>> (1, 2) + (3, 4)
(1, 2, 3, 4)
>>> (1, 2) * 3
(1, 2, 1, 2, 1, 2)
>>> (1, 2, 3, 4)[2]
3
```

下面括号会被解析为括号(会运算出来)，而不是元组。可以在后面加逗号 ,表示元组。

```
>>> type(('hello'))
<class 'str'>
>>> type((1))
<class 'int'>

>>> (1,2,3)
(1, 2, 3)
>>> (1)
1
>>> (1, )
(1,)
```

str、list、tuple 都是序列，操作基本一样。str 可以看作是字符组成的组。

-   序列里的元素都有一个序号 `[0]`
-   切片，`[0:3]`
-   in 来判断元素是否在序列中，not in 判断是否不在序列中。
-   len(list) 获取元素个数
-   max(list) 获取最大的元素，min(list) 获取最小值, list 数据类型不能混合。

```
>>> 3 in (1, 2, 3, 4)
True
>>> 3 not in (1, 2, 3, 4)
False

>>> min((1, 'h'))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: '<' not supported between instances of 'str' and 'int'
>>> min((1, '2'))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: '<' not supported between instances of 'str' and 'int'
>>> min((1, 2))
1
>>> min(('h','el'))
'el'
>>> min(('h','3'))
'3'
```

字符编码

-   ord(x): ord() 函数是 chr() 函数（对于 8 位的 ASCII 字符串）或 unichr() 函数（对于 Unicode 对象）的配对函数。

```
>>> ord('我')
25105
```

### 集合 set {}

序列是有序的，集合是无序的

集合是无重复元素的。
`-` 求集合差集
`&` 求交集
`|` 求并集

```
>>> type({1,2,3})
<class 'set'>

>>> {1,2,3}[0]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'set' object does not support indexing

>>> {1,1,2,3,4,3}
{1, 2, 3, 4}
>>> len({1,2,3})
3
>>> 1 in {1,2,3}
True
>>> 1 not in {1,2,3}
False

>>> {1,2,3,4} - {1,2}
{3, 4}
>>> {1,2,3,4} & {1,2}
{1, 2}
>>> {1,2,3,4} | {1,2,9,7}
{1, 2, 3, 4, 7, 9}

```

定义空的集合 set()

```
>>> type({})
<class 'dict'>
>>> type(set())
<class 'set'>
>>> len(set())
0
```

### 字典 dict {}

字典是集合类型的。 `{key1:value1, key2:value2}`。
set 只有 value，没有 key，dict 有 key 对应 value。
key 必须是不可变的类型。int, str。

```
>>> {"name": "zs", "age": 12}
{'name': 'zs', 'age': 12}
>>> {"name": "zs", "age": 12}["name"]
'zs'

# 字典里的 key 不能重复，会被覆盖
>>> {"name": "zs", "age": 12, 1:"a", '1': "a",  "name":"lisi"}
{'name': 'lisi', 'age': 12, 1: 'a', '1': 'a'}

# key 必须是不可变的类型。int, str, tuple，不能是 list
>>> { [1,2]: 1}
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unhashable type: 'list'
>>> {(1,2):1}
{(1, 2): 1}

# 空字典
>>> type({})
<class 'dict'>
```

### 总结

数据类型

-   Number
    -   整型 int
    -   浮点数 float
    -   布尔 bool
    -   复数 complex
-   组
    -   序列(支持索引、切片)
        -   字符串 str
        -   列表 list
        -   元组 tuple
    -   集合 set
    -   字典 dict

## 变量与运算符

```
# 查看变量的地址
>>> id(a)
4548861104
>>> hex(id(a))
'0x10f221cb0'
```

元组是不可改变的。列表可改变

```
>>> a = [1,2,3]
>>> a.append(2)
>>> a
[1, 2, 3, 2]

>>> (1,2,3) + (3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: can only concatenate tuple (not "int") to tuple
```

### 运算符

算术运算符

-   -   -   / // % \*\*

赋值运算符
= += \*= /= %= \*\*= //=

比较(关系)运算符: 比较的是值
== != > < >= <=

逻辑运算符
and 且
or 或
not 非

成员运算符 in not in

身份运算符：比较的是引用
is is not

位运算符: 把数字当作二进制来运算

```
& 按位与
| 按位或
^ 按位异或
～ 按位取反
<< 左移动
>> 右移动
```

没有 ++ -- 运算符

```
>>> c = 1
>>> c ++
  File "<stdin>", line 1
    c ++
       ^
SyntaxError: invalid syntax
>>>
```

```
>>> [] == []
True
>>> {} == {}
True
>>> [1] == [1]
True
>>> [1] == [1,]
True
```

str/ list/tuple 比较大小也是从左到右边比较。

```
>>> ('a' ,'b') > ('a', 'a')
True
>>> ('a' ,'b') > ('a', 'ac')
True
>>> ('a' ,'b') > ('a', 'cac')
False


>>> not 1
False
>>> not False
True
>>> not 0
True
>>> not not 1
True

>>> 'a' and 'b'
'b'
>>> 'a' or 'b'
'a'
>>> not []
True
>>> not [11]
False


>>> [] in [[]]
True

# 字典的 in 是判断的 key
>>> b = 'hello'
>>> b in {'name':'hello'}
False
>>> b = 'name'
>>> b in {'name':'hello'}
True

# 身份运算，如果是基本类型比较的是值，对象比较的是引用
>>> a = []
>>> b = []
>>> a is b
False
>>> a == b
True

# 有序集合 set 和无序元组 tuple
>>> a = {1, 2, 3}
>>> b = {2, 1, 3}
>>> a == b
True
>>> a is b
False
>>> a = (1,2,3)
>>> b = (2,1,3)
>>> a == b
False
>>> a is b
False
```

引用类型也都是判断的值相等

类型的判断 == 和 isinstance

```
>>> type(a) == int
True
>>> a = 'hello'
>>> type(a) == str
True

>>> isinstance(a, int)
False
>>> isinstance(a, str)
True
# 可以接收一个元组，属于里面一个则 True
>>> isinstance(a, (int, str, bool))
True
```

对象的三个特征： id value type
is == isinstance

位运算符

```
>>> a = 2
>>> b = 3
>>> a & b
2
>>> a | b
3
```

## 分支、循环、条件、枚举

表达式 expression 是运算符 operator 和操作数 operand 所构成的序列。

```
// 表达式
1 + 2 * 3
c = 1 + 2 * 3
c = int(1) + 2
c = 1 and 2


1 or 2 and 3
# 等效于
1 or (2 and 3)
```

运算符优先级

```
**
~ + -
* / % //
+ -
>> <<
&
^ |
<=
< >
=
is is not
in not in
not
and
or
```

运算顺序是左结合，= 是右结合(先计算右边，再赋值)。

```
not a or b + 2 == c
(not a) or (b+2 == c)
```

算术 > 比较 > 逻辑

## 流程控制

不支持 switch

input() 命令行输入

```py
while i < 5:
    i++
else:
    print('end')
```

for in: 用来遍历 序列或集合、字典

print(x, end='e'): end 会加在每个打印后面

```
for x in a:
    print(x)
    for y in b:
        if y:
            break      # 后面的else 还是会执行，break 是中断的是 for y in b 循环，而不是外层的循环
else:   # for 循环之后会结束, 如果当前层的循环中途 break 了，则不会打印 else
    print('end')

```

break continue

for 和 range
range(start, end, step)

```
# range [0, 10)
for x in range(0, 10):
    print(x)

for x in range(0, 10, 2):
    print(x, end = ' | ') # 0 | 2 | 4 | 6 | 8


for x in range(10, 0, -2):
    print(x, end = ' | ') # 10 | 8 | 6 | 4 |2
```

```py
a = [1, 3, 4, 5, 6, 7, 8]

for x in range(0, len(a), 2):
    print(a[x], end=' | ')  # 1 | 3 | 5 | 7 |

b = a[0:len(a):2] # [1, 4, 6, 8] 列表切片
print(b)
```

## python 项目的组织结构

包
模块
类
函数、变量

```

```

包名就是文件夹的名字，class 的名字就是文件的名字。
包： 在文件夹下建立一个 `__init__.py` 的文件，解释器就将它当作一个包。

```py
- __init__.py
- moduleA.py
- moduleB.py
- x
    - moduleC.py

# moduleB， 引入同级别
import moduleA
import x.moduleC as c
moduleA.x
```

`import` 只能导入模块。不能只导入某个函数、变量，需要使用 from

```py
from moduleC import a, def
from x import moduleC

# 不建议使用，因为不知道变量从哪里来的，可以在模块中使用 __all__ = ['a', 'c'] 只导出 ac 变量
from moduleC import *
print(a)
print(b)
print(c)

# 建议
from moduleC import a, c
# 或者
# 在 moduleC 文件使用 __all__
__all = ['a', 'c']
a = 1
b = 2
c = 3


# 如果导入太多方法，不建议用 \换行，而是建议用 ()
from moduleC import a,b \
c
from moduleC import (a,b,c)
```

导入包或包里模块内容的时候， `__init__.py` 文件会自动运行，作用有：

-   `__init__.py`里的`__all__` 控制导出的包。

```py
# 包 t 里的 __init__.py
__all__ = ['moduleA']

from t import *
print(moduleA)
print(moduleB) # error
```

-   提取公共要导入的模块

```py
# t 包 __init__.py
import datetime
import sys
import io
...

# moduleA
import t
print(t.sys.path)
```

包和模块是不会被重复导入的
避免循环导入

## 函数

```py
a = 1.12586
print(round(a, 2)) # 1.13
```

help(round)
help(print)

自定义函数

```
def fn(x, y):
    result = x + y
    return result
```

递归最大次数 默认为 1000 次左右(平台有关)

```
import sys
sys.setrecursionlimit(1000000)
```

返回多个值，会当成元组

```py
# 不推荐
def a():
    return a, b
result = a()
# 推荐用解构方式 x, y = a()
print(result [0], result[1]) # 不推荐用序号来访问，推荐序列解包，解构

a,b,c = 1,2,3
a,b,c = 1,1,1
a = b = c = 1

[a, b] = [1, 2]
print(a, b)
```

参数

-   必须参数：形参必须传入
-   关键字参数：可以指定名称进行调用 `**arg` 字典参数
-   `*arg` 默认参数(元组参数): 默认参数要放在最后，否则报错

```py
def add(x=1, y=2, z=3):
    return x + y + z
c = add(y=3, x=2)
c = add(5, z = 2)

def f(*args, **kw):
    print(args)  # (1,2,3)
    print(kw)    # {'name:'zs','age':12}
f(1,2,3, name='zs',age=12)
```

## 面向对象

类

-   变量: 类变量、实例变量
-   方法: 类方法、实例方法(通过 self 调用)、静态方法
-   构造函数
-   成员可见性
    -   public: 默认，可以在外部访问
    -   private： 将方法名前面加双下划线 `__`，但是不能在后面再加`__`，否则会公开，如`__init__`
-   面向对象 3 大特性
    -   封装
    -   继承：支持多继承
    -   多态

```py
class Person():
    name = '' # 类变量和实例变量都可以继承
    def __init(self, name, age):
        self.name = name
        self.age = age

    def get_name():
        return self.name

    def get_age():
        return self.age

class Student(Person):
    # 类变量定义
    name = ''
    age = 0
    className = 'c1'

    # 构造函数，实际也是个类方法
    def __init__(self, name, age):
        # 显示调用父类构造函数，需要传递 self，否则会报错
        # Person.__init__ 是类调用实例方法？构造函数支持，但是其它方法要传参数 self，不好理解
        # Person.__init__(self, name, age)

        # 通过 super 调用父类方法
        super(Student, self).__init__(name, age)


        self.name = name # 实例变量定义和赋值，通过 self
        self.age = age
        self.__sex = 'girl' # 私有变量，编译器会自动将名改为`_Student__sex`，外部可以访问，所以不是真正的私有

        name = name # 局部变量

        print(Student.name) # 类变量
        print(self.__class__.name) # 类变量

    # 实例方法
    # 必须要 self 或其它名字，表示 this, 否则调用会报错
    def print_file(self):
        super(Student, self).get_name()
        print('name: ' + self.name)
        print('age: ' + str(self.age))

    # 类方法
    @classmethod
    def plus_sum(cls):
        pass

    # 静态方法， 参数没有 self 或 cls，对象和类都可以调用
    # 静态方法和类方法都不能访问实例变量
    # 可以不使用，当工具方法使用
    @staticmethod
    def add(x, y):
        pass

# 不需要 new
student = Student("zs", 12)

# 所有实例变量的字典
student.__dict__  # {name:"zs", age:12}
# 类变量字典
Student.__dict__

# 实例上没有的属性会到类属性上查找
print(student.className) # 'c1'

# 类和对象都可以调用类方法
student.plus_sum()
Student.plus_sum()

print(student.__sex) # 报错，__sex 是私有的，不能访问
print(student._Student__sex) # 可以访问
student.__sex = 'boy' # 新增了一个 __sex 的属性，和内部的 __sex 不一样
print(student.__sex) # 'boy'
```

显示调用构造函数，只能 return None 或不写 return，不能返回其它值。

## 正则表达式

```py
str = 'yy|substr|hello
print(str.index('substr') > -1) # True
print('substr' in str)
```

re 对象的方法：

-   `re.findall(pattern, string)`: 返回一个列表
-   `re.sub(pattern, repl, string, count=0,flags=0)` 替换
-   `re.match(pattern, string, flags)`: 从字符串首字母开始匹配，匹配一个就返回，没有返回 None
-   `re.search(pattern, string, flags)`: 找到一个结果就返回匹配的结果的对象，没有返回 None

-   `str.replace(pattern, repl)`: 返回一个新字符串，字符串是不可变的

```py
import re

str = 'hello123'
r = re.findall('l', str) # ['l', 'l']
if len(r) > 0:
    print('字符串包含' + len(r) + '个l')
else:
    print('字符串不包含l')

r = re.findall('\d', str)
```

元字符

```py
# 字符集 []
a[bd]f
a[b-d]f
a[^bd]f

# 概括字符集
\d 数字, 等价于[0-9]
\D 非数字,等价于[^0-9]
\w 单词字符(下划线、数字和字母)，等价于 [_0-9a-zA-Z]
\W 非单词字符
\s 空白字符(' ' \t \n \r)
\S
. 匹配除换行符 \n 之外其它的字符

# 量词
{m}
{m, n}
{m, }
*  大于等于0次
+
？

# 贪婪、非贪婪
量词?  非贪婪

str = 'pytho123python123pythonn123'
re.findall('python{1,2}?', str)

# 边界匹配
^
$
\b
\B

# 组
()

# 模式
re.I  忽略大小写
re.S  改变. 让. 能匹配\n

lang = 'py\njava
re.findall('py.{1}', re.I | re.S)

lang = 'py java py php py'
re.sub('py', 'go', lang, 1) # count 默认为0表示全部替换，1表示只替换一个

def convert(value):
    print(value)  # value.group() 为替换的原始值，即 py
    pass
re.sub('py', convert, lang)

# result
<re.Match object; span=(0, 2), match='py'>
<re.Match object; span=(8, 10), match='py'>
<re.Match object; span=(15, 17), match='py'>
 java  php  # py 被替换为了空字符串

# re.match
print(re.match('py', lang))
# <re.Match object; span=(0, 2), match='py'>

# re.search
print(re.search('py', lang))
# <re.Match object; span=(0, 2), match='py'>

# 分组
r = re.search('py(.+)py', lang)
print(r.group(0)) # 'py java py php py'
print(r.group(1)) # ' java py php p'
print(r.group(0, 1)) # 返回一个元组 ('py java py php py', ' java py php p')
print(r.groups()) # 返回元组

r = re.findall('py(.+)py', lang)
print(r) #[' java py php ']

```

## JSON

javascript object notation 轻量级数据交换格式

符合 JSON 格式的字符串就是 json 字符串
符合 JSON 格式的对象就是 json 对象

优点：

-   易于阅读
-   易于解析
-   网络传输效率高（轻量）
-   跨语言交换数据（语言基本都有内置的数据结构）

```py
import json

# 序列化
# 字典
json_str = '{"name":"zs","age":12, "flag": false}'
person = json.loads(json_str)

print(type(person)) # <class 'dict'>
print(person)  # {'name': 'zs', 'age': 12, 'flag': False}

# 列表
json_str = '[{"name":"zs","age":12}]'
person = json.loads(json_str)

print(type(person)) # <class 'list'>

# 反序列化
json_str = json.dumps(person)
print(json_str) # <class 'str'>
```

转换关系

```
json     python
object   dict
array    list
string   str
number   int/float
null     None
true     True
false    False
```

## 枚举

python3 新增

枚举的标签和值是对应且唯一的。

```py
from enum import Enum

class VIP(Enum):
    yellow = 1
    green = 1  # 值和 yellow相等，会当作 yellow 的别名
    black = 3
    red = 4
    yellow = 2 # 报错，不能用同一个标签

print(VIP['yellow']) # 也可以[]这样访问
print(VIP.yellow)  # VIP.yellow
print(VIP.green)  # VIP.yellow, 已经定义后，不能被修改，而且值是唯一的
print(type(VIP.yellow))  # <enum 'VIP'>
print(VIP.yellow.value()))  # 1
print(VIP.yellow.name))  # 'yellow' <class 'str'>

# 遍历
for v in VIP:
    print(v)    # 不会打印别名

# VIP.yellow
# VIP.black
# VIP.red

for v in VIP.__members__.items():
    print(v)    # 会打印别名

# ('yellow', <VIP.yellow: 1>)
# ('green', <VIP.yellow: 1>)
# ('black', <VIP.black: 3>)
# ('red', <VIP.red: 4>)

for v in VIP.__members__:
    print(v)    # 会打印别名，只打印 key

# yellow
# green
# black
# red


# 比较
class VIP2(Enum):
    yellow = 1
result = VIP.yellow == VIP.yellow    # True
result = VIP.yellow is VIP.yellow    # True
result = VIP.yellow == VIP2.yellow    # False 不同的枚举比较
result = VIP.yellow == 1    # False
result = VIP.yellow > VIP.black    # 报错
```

和枚举比较， dict 和类实现的缺点：

-   值可以重复
-   值可以修改

```
{'name': 1}
class N():
    name = 1
```

数据库存储枚举类型，一般存数字，因为占用空间更小，更简洁。

```py
# 从数据库获取到的值
a = 1

# 将值转为枚举类型。
VIP(a)  # VIP.yellow

if a == VIP.yellow:
    pass
if a == VIP.black:
    pass
```

枚举的继承

-   IntEnum 枚举必须都是整型

```py
from enum import IntEnum, unique

@unique  # 装饰器，显示枚举如果有别名就报错 duplicate value
class VIP(IntENum):
    yellow = 1
    green = 1 # 报错
```

枚举不能实例化。是单例模式实现。

## 函数 闭包

函数可以返回一个函数，可以当参数传递。

函数和运行时的环境变量 就是闭包

```py
c = 1
z = 10

def a():
    print(z)  # 10

    # print(c) 会报错，因为下面定义了 c，为局部变量
    c = 2  # c 是局部变量， 可以加 global 定义为全局的变量
    def d():
        print(c)

    return d

x = a()
# 如果没有闭包，则返回 None，只有函数有 __closure__
print(x.__closure__)  # (<cell at 0x10db53678: int object at 0x10d8fccd0>,)
print(x.__closure__[0].cell_contents) # 2
y = x()  # 2
print(a.__closure__)  # None  函数的内部函数才有闭包
```

```py
c = 1

def a():
    def d():
        print(c)

    return d

x = a()
print(x.__closure__)  # None
```

```py
c = 1

def a():
    # global c
    num = c  # local variable 'c' referenced before assignment,这里c是局部变量
    c = 2

x = a()
```

```py
c = 1

def a():
    c = 2

a()
print(c)  # 1
```

闭包的应用: 旅行距离计算

```py
origin = 0

def factory(pos):
    def go(step):
        nonlocal pos # 指定 pos 不是局部变量
        new_pos = pos + step
        pos = new_pos
        print(new_pos)
        return new_pos
    return go

g = factory(origin)

g(3)   # 3
g(3)   # 6
g(3)   # 9
```

闭包的问题：容易造成内存泄露

匿名函数, lambda 表达式

```py
def add(x, y):
    return x + y
add(1, 2)

# 匿名函数，冒号后面不能是代码块
# lambda parameter_list: expression
f = lambda x,y: x+y
f(1,2)

# 其它语言三元表达式 x > y ? x : y
# python 三元表达式  条件真的结果 if 条件判断 条件假的结果
f = lambda x,y: x if x > y else y
```

map 函数

`map(fn, *iterator)`

```py
# 将每个元素平方
def square(x):
    return x * x
list_x = [1,2,3]
r = map(square, list_x)

# lambda
r = map(lambda x: x*x, list_x)

# list 2 它会按照列表少的来返回结果长度
list2 = [1,2]
r = map(lambda x, y: x*x + y, list_x, list2)
```

reduce

```py
from functools import reduce
list_x = [1,2,3,4,5]
reduce(lambda x,y:x+y, list_x, initial=10)

(x, y)
(0, 0)
[(1,2), (3, -3), (-2, 3)] 连续计算
```

map/reduce 编程模型 映射 归约 并行计算
函数式编程

filter(function or None, iterable)

```py
# 去掉0元素
list_x = [1, 0, 0, -1, 0, 1]
r = filter(lambda x: x != 0, list_x)
print(list(r))) # [1, -1, 1]
```

注意 list 是个关键字，不能定义为变量。

## 装饰器

-   `time.time()` unix 时间戳，单位是 s

```py
import time

def f1():
    print('f1')


def f2():
    print('f2')


def logger(f):
    print(time.time())
    f()


logger(f1)
logger(f2)

# 1585027328.113216
# f1
# 1585027328.1132538
# f2
```

```py
import time

# 装饰器返回一个函数，来包装新函数
def decorator(fn):
    def wrapper(*args, **kw):
        print(time.time())
        fn(*args, **kw)
    return wrapper

def f1():
    print('f1')

f = decorator(f1)
f()

@decorator
def f2():
    print('f1')

f2()

@decorator('test')
def f3(str):
    print('f3' + str)

f3()

# 多参数、关键字参数
@decorator('test', name='zs')
def f4(str):
    print('f4' + str)

f4()
```

定义复杂可以，但是调用不可以复杂。

装饰器给函数增加功能，不破坏代码实现。
AOP 思想
