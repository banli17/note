# 简介

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
