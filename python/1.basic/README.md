# 基础回顾

## 工具
- vscode
    - pylint
    - autopep8
    remote-ssh
- jupyter notebook 数据科学家的最爱

## 如何补基础

- 官方文档
- 新版本的新增功能

## 从一个需求开始

获取豆瓣读书 top 250 书籍名字和评分
https://book.douban.com/top250?start=25

步骤：

1. F12 分析源代码
2. 用 request 爬取网页全部内容
3. 用 beautiful soup (bs4) 解析网页数据
    - 正则
    - xpath
4. 使用 csv 存储

状态码 418 茶壶


## pip 安装加速

国内常见的镜像站:

- 豆瓣:http://pypi.doubanio.com/simple/ 
- 清华:[https://mirrors.tuna.tsinghua.edu.cn/help/pypi/](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)

升级 pip: 

```
# 如果pip默认源网络较差，可以使用清华镜像升级 pip
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U

# 设置清华镜像为默认 (升级pip>=10.0.0后使用)
pip install pip -U
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# 临时使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
```

```
配置文件:
windows: c:\Users\xxx\pip\pip.ini 
Linux: ~/.pip/pip.conf

配置文件格式:
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

## 格式化字符串

三种常用的格式化字符串方式：
1. % 操作符(c++)
2. str.format(*args, **kwargs)，比 % 更灵活
3. f-string: python3.6 引入，性能更好，易读性好

```python
# printf 风格的字符串格式化
import math
print('the value of pi is approximately %5.3f.' % math.pi)
# f表示输出浮点数，
# 5表示最小输出字符宽度为5位数，
# 3表示浮点数输出小数点后为3位数
# 输出: the value of pi is approximately 3.142.


# .format 格式化字符串
print('{1} and {0} and {other}'.format('spam', 'egg', other='orange'))
# 输出：egg and spam and orange

# f-string 格式化字符串
user = 'mike'
print(f'hello {user}') # 输出 hello mike
print(f'{2 * 5}') # 输出10
```

f-string 还可以做其它事情。

```python
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    # 给用户看时会更友好，print()、控制台、str()、str.format() 调用
    # 如果没有，则会调用 __repr__
    def __str__(self):
        return f'hello {self.first_name}'

    # 解释器调用时。
    def __repr__(self):
        return f'hello {self.last_name}'


me = Person('tom', 'jerry')
print(f'{me}') # hello tom
print(str(me)) # hello tom
print(repr(me)) # hello jerry
```

python3.8 海象运算符

基本数据类型
- None 空对象
- Bool: True、False
- 数值：整数 浮点数 复数
- 序列： 字符串、列表、元组
- 集合：字典
- 可调用：函数

循环控制
- 条件语句：if...else
- 循环语句: for...in, while
- 导入库、包、模块 import

```python
alist = [1]
dir(alist)  # 查看内置属性
# ['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']

help(alist) # 查看文档，文档通过 """""" 进行编写后会生成
# 例子
class P:
    """
    a 方法用于生成 hello
    """
    def a(self):
        print('hello')
p = P()
help(p)
```

```
shell > python filename.py
```
python 会将 .py 文件编译成字节码 pyc 格式文件，由 python 虚拟机执行，不是解释执行。

交互模式

```
shell > python (回车)
python> import what
python> run python something
```


## 总结

- 爬豆瓣电影
    - requests
    - bp4
    - 生成翻页列表tuple f-string
    - __name__
- pip 加速
- 格式化字符串
    - %
    - format
    - f-string 
        - `__str__`
        - `__repr__`
- `python filename.py`        